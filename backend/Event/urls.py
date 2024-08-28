from django.urls import path
from .views import *

urlpatterns = [
 
    path('api/',active_events),
    path('api/event_details/<int:id>/',event_details),
    path('api/event_room/<uuid:roomId>/', event_room), 
    path('api/event_filter/', event_filter), 

    path('api/events/', event_api),
    path('api/events/<int:id>/', event_api),

    path('api/learn/', learn_api),
    path('api/learn/<int:id>/', learn_api),
    
    path('api/speaker/', speaker_api),
    path('api/speaker/<int:id>/', speaker_api),

    path('api/speaker_list/<int:id>/', speaker_list),

    # path('api/Events_session/', Events_session),
    # path('api/Events_session/<int:id>/', Events_session),

    #  path('api/session_Filter/', session_Filter),
    # path('api/UpdateStatus/<int:id>', UpdateStatus_session),



     

    
]
 