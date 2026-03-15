from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LaptopViewSet, CartViewSet

router = DefaultRouter()
router.register(r'laptops', LaptopViewSet)
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    path('', include(router.urls)), # Remove 'api/' from here
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
]