"""
------------------------------------------------------------------------------------
Step 1: Install Required Packages

first verify django-admin is installed by this command
django-admin --version

if not install this by this command in cmd
pip install django djangorestframework

then check again

------------------------------------------------------------------------------------
Step 2: Create a New Django Project in that folder
django-admin startproject myproject

------------------------------------------------------------------------------------
Step 3: Create a Django App
python manage.py startapp api

------------------------------------------------------------------------------------
Step 4: Add the App and DRF to settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # Add Django Rest Framework
    'api',  # Add your app
]

------------------------------------------------------------------------------------
Step 5: Define a Simple API Endpoint
Step 5.1:
Create an Item model
In the api/models.py file, define a simple model. For example:
```
from django.db import models
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    def __str__(self):
        return self.name
```

Step 5.2:
Create a migration, this will create the code required to add new database table for Item model:
python manage.py makemigrations

Step 5.3:
Run migrate command to perform database operation
python manage.py migrate

Step 5.4:
Create a Serializer
A serializer in Django Rest Framework (DRF) is a component that handles serialization and deserialization. It converts your database model into JSON format (serialization) or takes JSON data as input, validates it, and translates it into a Django model instance (deserialization).

Create api/serializers.py file with serializer for the Item model:
```
from rest_framework import serializers
from .models import Item
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
```

Step 5.5:
Create a View
Views in Django are responsible for handling the endpoint logic, they take the request, perform some operations eg. load model from database, serialize it into JSON format and return the HTTP Response.
In api/views.py, add a view using DRF’s APIView:
```
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer


class ItemsView(APIView):
    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
```

Step 5.6:
Configure URLs
Create a urls.py file in the api directory and define a route for the API:

```
from django.urls import path
from .views import ItemsView
urlpatterns = [
    path('items/', ItemsView.as_view(), name='items'),
]
```

Then, include the app’s URLs in the main urls.py:

```
from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Add this line
]
```

------------------------------------------------------------------------------------
Step 6: Enable the DRF Browsable API UI
Django Rest Framework provides a user-friendly browsable API UI out of the box. When you use APIView or any other DRF views, the browsable API is automatically enabled for your development environment.

To ensure this feature is available, make sure the REST_FRAMEWORK settings in your settings.py include:

```
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
}
```

------------------------------------------------------------------------------------
Step 7: Test the API
Run the development server:

pipenv shell
python manage.py runserver
------------------------------------------------------------------------------------

pipenv --rm  # removes the current pipenv virtualenv if any
pipenv install django  # creates a clean new environment and installs Django
pip install djangorestframework  
pip install django-cors-headers
pipenv shell  # enters the new environment

pipenv list


python manage.py runserver

"""
