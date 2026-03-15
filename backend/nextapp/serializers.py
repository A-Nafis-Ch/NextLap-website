from rest_framework import serializers
from .models import Laptop, CartItem

class LaptopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laptop
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    # This nested serializer shows laptop details inside the cart
    product = LaptopSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Laptop.objects.all(), source='product'
    )

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']