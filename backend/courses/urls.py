from django.urls import path
from .views import getAllCourses, getUserCourses, getVideo, SubscribeView, getCourseDetail,getVideosForCourse

urlpatterns = [
    path('courses/', getAllCourses, name='course-list'),
    path('my-courses/', getUserCourses, name='my-courses'),
    path('courses/<slug:course_slug>/lecture/<int:serial_number>/', getVideo, name='lecture-detail'),
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('courses/<int:pk>/', getCourseDetail, name='course-detail'),
    path('courses/<int:course_id>/videos/', getVideosForCourse, name='course-videos'),


]
