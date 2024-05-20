from django.shortcuts import render
from django.http import JsonResponse
from api.models import User

from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer




@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

from .models import Profile

@api_view(['GET'])
def get_user_profile(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        profile = Profile.objects.get(user=user)
        return Response({
            'user': {
                'username': user.username,
                'email': user.email,
            },
            'profile': {
                'full_name': profile.full_name,
                'bio': profile.bio,
                'image': profile.image.url,
                
            }
        })
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=404)