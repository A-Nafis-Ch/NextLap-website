from rest_framework import serializers
from .models import Laptop, LaptopImage, CartItem

# 1. Serializer for the extra gallery images
class LaptopImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LaptopImage
        fields = ['id', 'image']

# 2. Updated Laptop Serializer to include the gallery
class LaptopSerializer(serializers.ModelSerializer):
    # 'images' must match the related_name in your models.py
    images = LaptopImageSerializer(many=True, read_only=True)

    class Meta:
        model = Laptop
        # List all fields explicitly to ensure 'images' is included
        fields = ['id', 'name', 'brand', 'price', 'description', 'image', 'stock', 'images']

# 3. Your CartItem Serializer (restored and updated)
class CartItemSerializer(serializers.ModelSerializer):
    # Shows full laptop details (including gallery) in the cart
    product = LaptopSerializer(read_only=True)
    
    # Allows adding to cart using just the ID
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Laptop.objects.all(), 
        source='product'
    )

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']