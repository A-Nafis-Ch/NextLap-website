# admin.py
from django.contrib import admin
from .models import Laptop, LaptopImage

class LaptopImageInline(admin.TabularInline):
    model = LaptopImage
    extra = 5  # This shows 5 empty slots by default!

@admin.register(Laptop)
class LaptopAdmin(admin.ModelAdmin):
    inlines = [LaptopImageInline]