from django.urls import path

from .views import * 

urlpatterns = [
 
path('home/',home ),
path('info_list/',info ),
 
path('category/',available_category  ),
path('category/<int:category_id>/', category_detail ),

path('Setting/',Setting  ),

path('slide/',slide ),
path('slide/<int:id>/',slide ),

path('supporters/',supporters ),
path('supporters/<int:id>/',supporters ),

path('info/', create_or_update_info ),
path('info/<int:pk>/', create_or_update_info ),
 
path('rate/',rate_list ),
path('rate/<int:id>/',rate_list ),

path('team/',team_member ),
path('team/<int:id>/',team_member ),


]
 