from django.shortcuts import render

from backend.models import Profile,User
from backend.serializer import MyTokenObtainPairSerializer, UserSerializer

from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer