from rest_framework import viewsets, permissions
# 1. Updated Imports: Changed Laptop to Product
from .models import Product, CartItem 
from .serializers import ProductSerializer, CartItemSerializer 

from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

@api_view(["POST"])
def google_login(request):
    token = request.data.get("access_token")

    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )

        email = idinfo["email"]
        name = idinfo.get("name", "")

        # Use email as username for consistency
        user, created = User.objects.get_or_create(
            username=email,
            defaults={"email": email, "first_name": name}
        )

        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "key": token.key,
            "email": email,
            "name": name,
            "picture": idinfo.get("picture", "") # Added this to help with your profile pic issue
        })

    except ValueError:
        return Response({"error": "Invalid Google token"}, status=400)

# 2. Updated ViewSet: Changed name to ProductViewSet
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """Anyone can view products (laptops, accessories, etc.), but only admins edit."""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CartViewSet(viewsets.ModelViewSet):
    """Users can only see and manage their own cart items"""
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)