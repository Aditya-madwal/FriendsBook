# for JWT token auth :
from django.contrib import admin
from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register', views.RegistrationView.as_view(), name="register"),
    path('login', views.LoginView.as_view(), name="login"),
    path('sample', views.SampleEndpoint.as_view(), name="sample")
]

urlpatterns += [
    path('userapi/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('userapi/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]