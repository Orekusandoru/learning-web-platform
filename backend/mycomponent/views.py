# mycomponent/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Item
import json

@csrf_exempt
def create_item(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name', '')
        description = data.get('description', '')
        try:
            item = Item.objects.create(name=name, description=description)
            return JsonResponse({'message': 'Item created successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
