 
from django.urls import path
from .views import * 

urlpatterns = [
    path('api/MyLearning/', MyLearning ),
    path('api/Teacher_Dashboard/', Teacher_Dashboard ),

    path('api/Item_list/', Item_list ),
 
    path('api/Filter/',Filter),

    path('api/Course_Filter/<int:id>/',Category_Filter ),

    path('api/filter-courses/', filter_courses),
    path('api/filter_value/', filter_value),

    path('api/Categories_filter/',Categories_filter ),

    path('api/Category/',Category_api ),
    path('api/Category/<int:id>/',Category_api ),

 ]
  