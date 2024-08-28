 
from django.urls import path
from .views import *

urlpatterns = [
    path('api/meeting_Room/<int:course_id>/<uuid:roomId>/', meeting_Room ),
    path('api/create/', meeting_create, name='meeting_create'),
    path('api/update/<int:pk>/', meeting_update, name='meeting_update'),
    path('api/delete/<int:pk>/', meeting_delete, name='meeting_delete'),

]