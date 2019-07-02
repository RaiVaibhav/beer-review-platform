"""sample URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include
from rest_framework_jwt.views import (obtain_jwt_token,
                                      verify_jwt_token,
                                      refresh_jwt_token,)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('jwt/token/', obtain_jwt_token),
    path('jwt/token-verify/', verify_jwt_token),
    path('jwt/token-refresh/', refresh_jwt_token),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/', include('review.urls')),
    path('', TemplateView.as_view(template_name='home.html')),
]
