from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CartViewSet, google_login

# Using a Router for the REST API
router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    # This will result in: /api/products/ and /api/cart/
    path('', include(router.urls)),
    
    # This will result in: /api/google-login/
    path('google-login/', google_login, name='google_login'),
]