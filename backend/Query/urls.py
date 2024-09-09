 
from django.urls import path
from .views import * 

urlpatterns = [
    path('MyLearning/', MyLearning ),
    path('Teacher_Dashboard/', Teacher_Dashboard ),

    path('Item_list/', Item_list ),
 
    path('Filter/',Filter),

    path('Course_Filter/<int:id>/',Category_Filter ),

    path('filter-courses/', filter_courses),
    path('filter_value/', filter_value),

    path('Categories_filter/',Categories_filter ),

    path('Category/',Category_api ),
    path('Category/<int:id>/',Category_api ),

 ]
  