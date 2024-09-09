 
from django.urls import path
from .views import *

urlpatterns = [
    path('meeting_Room/<int:course_id>/<uuid:roomId>/', meeting_Room ),
    path('create/', meeting_create, name='meeting_create'),
    path('update/<int:pk>/', meeting_update, name='meeting_update'),
    path('delete/<int:pk>/', meeting_delete, name='meeting_delete'),

]