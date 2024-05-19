
from django.contrib import admin
from django.urls import path , include
from courses.views import  MyCoursesList,  HomePageView ,coursePage ,checkout
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('', HomePageView.as_view() , name = 'home'),
    path('my-courses', MyCoursesList.as_view() , name = 'my-courses'),
    # path('course/<str:slug>', coursePage , name = 'coursepage'),
    # path('check-out/<str:slug>', checkout , name = 'check-out'),
  
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)