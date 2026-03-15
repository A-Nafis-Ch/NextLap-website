from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings # <--- Added this missing import
from django.conf.urls.static import static
from nextapp.views import google_login

# 1. Google Login View
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:5173" 
    client_class = OAuth2Client

# 2. URL Patterns
urlpatterns = [
     path("api/auth/google/", google_login),
    path('admin/', admin.site.urls),
    
    # Laptop API - Make sure this points to your app's urls
    path('api/', include('nextapp.urls')), 
] 

# 3. Media/Static serving
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)