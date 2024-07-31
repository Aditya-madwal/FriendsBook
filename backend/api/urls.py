# for JWT token auth :
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('details', views.showdetails.as_view(), name="details"),
]