from rest_framework import serializers
from .models import Category, Product, ProductImage, CartItem

# 1. Serializer for Categories (New)
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

# 2. Serializer for the extra gallery images
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

# 3. Updated Product Serializer (Replaces LaptopSerializer)
class ProductSerializer(serializers.ModelSerializer):
    # This includes the category name in the response
    category = CategorySerializer(read_only=True)
    # 'images' matches the related_name='images' in ProductImage model
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'category', 'name', 'brand', 'price', 
            'description', 'image', 'stock', 'images', 'specifications'
        ]

# 4. Updated CartItem Serializer
class CartItemSerializer(serializers.ModelSerializer):
    # Now shows full Product details in the cart
    product = ProductSerializer(read_only=True)
    
    # Keeps the ability to add to cart via product ID
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), 
        source='product'
    )

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']