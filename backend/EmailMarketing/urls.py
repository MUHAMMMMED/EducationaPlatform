 
from django.urls import path
from .views import *

urlpatterns = [
    path('campaign_data/', campaign_data ),
    path('campaigns/', campaign  ),
    path('campaign/<int:pk>/', campaign  ),
    path('Run_Campaign/', send_to_inactive_customers ),
    path('student_Filter/', student_filter)

 ]
