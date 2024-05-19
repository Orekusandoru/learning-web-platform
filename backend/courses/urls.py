

from django.urls import path, include

from courses.views import home

                        
urlpatterns = [
    path('', home, name = 'home'),
 
   
]