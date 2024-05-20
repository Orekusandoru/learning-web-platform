from rest_framework import serializers
from courses.models import Course, Video, UserCourse

class CourseSerializer(serializers.ModelSerializer):
    is_subscribed = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'

    def get_is_subscribed(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return UserCourse.objects.filter(user=user, course=obj).exists()
        return False

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class UserCourseSerializer(serializers.ModelSerializer):
    course = CourseSerializer()  # Nested serialization for detailed course information

    class Meta:
        model = UserCourse
        fields = '__all__'
        
class SubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCourse
        fields = ['user', 'course']
