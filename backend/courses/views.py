from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from courses.models import Course, Video, UserCourse
from courses.serializers import CourseSerializer, VideoSerializer, UserCourseSerializer

# Get all courses
@api_view(['GET'])
def getAllCourses(request):
    courses = Course.objects.filter(active=True)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Get courses for a specific user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserCourses(request):
    user_courses = UserCourse.objects.filter(user=request.user)
    serializer = UserCourseSerializer(user_courses, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Get video for a specific lecture in a course
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
