# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from courses.models import Course, Video, UserCourse
from courses.serializers import CourseSerializer, VideoSerializer, UserCourseSerializer, SubscribeSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def getAllCourses(request):
    courses = Course.objects.filter(active=True)
    serializer = CourseSerializer(courses, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getCourseDetail(request, pk):
    try:
        course = Course.objects.get(pk=pk)
        serializer = CourseSerializer(course, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserCourses(request):
    try:
        user_courses = UserCourse.objects.filter(user=request.user)
        serializer = UserCourseSerializer(user_courses, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def getVideo(request, course_slug, serial_number):
    try:
        course = Course.objects.get(slug=course_slug)
        video = Video.objects.get(course=course, serial_number=serial_number)
        serializer = VideoSerializer(video)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    except Video.DoesNotExist:
        return Response({'error': 'Video not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def getVideosForCourse(request, course_id):
    try:
     
        videos = Video.objects.filter(course_id=course_id)

        
        serializer = VideoSerializer(videos, many=True)

     
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Video.DoesNotExist:
        return Response({'error': 'No videos found for the specified course id'}, status=status.HTTP_404_NOT_FOUND)


@permission_classes([IsAuthenticated])
class SubscribeView(APIView):
    
    def post(self, request, *args, **kwargs):
        user = request.user
        course_id = request.data.get('course_id')
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        
        subscription, created = UserCourse.objects.get_or_create(user=user, course=course)
        if created:
            return Response({'status': 'subscribed'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'status': 'already subscribed'}, status=status.HTTP_200_OK)
