from django.urls import path

from .views import * 

urlpatterns = [

path('api/home/',home ),
path('api/info/',info ),
 
path('api/category/',available_category  ),
path('api/category/<int:category_id>/', category_detail ),

path('api/Setting/',Setting  ),

path('api/slide/',slide ),
path('api/slide/<int:id>/',slide ),

path('api/supporters/',supporters ),
path('api/supporters/<int:id>/',supporters ),

path('api/info/', create_or_update_info ),
path('api/info/<int:pk>/', create_or_update_info ),
 
path('api/rate/',rate_list ),
path('api/rate/<int:id>/',rate_list ),

path('api/team/',team_member ),
path('api/team/<int:id>/',team_member ),


]
 