from django.contrib import admin
from .models import Category, Product, ProductImage # Import the new names

# Register the Category model
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)} # Automatically generates slug from name

# Inline for Product Gallery
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 5

# Register the Product model
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
    list_display = ('name', 'category', 'brand', 'price', 'stock')
    list_filter = ('category', 'brand') # Adds a filter sidebar on the right
    search_fields = ('name', 'brand')