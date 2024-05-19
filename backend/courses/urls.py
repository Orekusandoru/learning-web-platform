
from django.urls import path
from courses import views

urlpatterns = [
    path('courses/', views.getAllCourses, name='all_courses'),
    path('my-courses/', views.getUserCourses, name='user_courses'),
    path('courses/<slug:course_slug>/lecture/<int:serial_number>/', views.getVideo, name='course_video'),
]
