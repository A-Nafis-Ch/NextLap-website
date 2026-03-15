from django.contrib import admin
from .models import Laptop, CartItem


@admin.register(Laptop)
class LaptopAdmin(admin.ModelAdmin):
    # This makes the list view look professional
    list_display = ('name', 'brand', 'price', 'stock')
    search_fields = ('name', 'brand')
    list_filter = ('brand',)