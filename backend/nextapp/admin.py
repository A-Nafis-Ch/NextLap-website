# admin.py
from django.contrib import admin
from .models import Product, ProductImage

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 5  # This shows 5 empty slots by default!

@admin.register(Product)
class LaptopAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]