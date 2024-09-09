from django.urls import path
from .views import *

urlpatterns = [
 
    path('',active_events),
    path('event_details/<int:id>/',event_details),
    path('event_room/<uuid:roomId>/', event_room), 
    path('event_filter/', event_filter), 

    path('events/', event_api),
    path('events/<int:id>/', event_api),

    path('learn/', learn_api),
    path('learn/<int:id>/', learn_api),
    
    path('speaker/', speaker_api),
    path('speaker/<int:id>/', speaker_api),

    path('speaker_list/<int:id>/', speaker_list),

    # path('Events_session/', Events_session),
    # path('Events_session/<int:id>/', Events_session),

    #  path('session_Filter/', session_Filter),
    # path('UpdateStatus/<int:id>', UpdateStatus_session),



     

    
]
 