# from django.shortcuts import render , redirect
# from courses.models import Course , Video  , UserCourse
# from django.shortcuts import HttpResponse
# # Create your views here.
# from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth.decorators import login_required

# from time import time



# @login_required(login_url='/login')
# def checkout(request , slug):
#     course = Course.objects.get(slug  = slug)
#     user = request.user
#     action = request.GET.get('action') 
#     error = None
#     try:
#         user_course = UserCourse.objects.get(user = user  , course = course)
#         error = "You are Already Enrolled in this Course"
#     except:
#         pass
 

    
#     if amount==0:
#         userCourse = UserCourse(user = user , course = course)
#         userCourse.save()
#         return redirect('my-courses')   
      
  
       


    
#     context = {
#         "course" : course , 
#         "order" : order, 
#         "user" : user , 
#         "error" : error
#     }
#     return  render(request , template_name="courses/check_out.html" , context=context )    

