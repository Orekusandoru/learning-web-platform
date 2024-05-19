from rest_framework import serializers
from courses.models import Course, Video, UserCourse

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class UserCourseSerializer(serializers.ModelSerializer):
    course = CourseSerializer()  # Nested serialization for detailed course information

    class Meta:
        model = UserCourse
        fields = '__all__'
