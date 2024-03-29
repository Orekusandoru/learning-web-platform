from django.http import JsonResponse

def send_message(request):
    message = "Hello, world!"
    return JsonResponse({'message': message})
