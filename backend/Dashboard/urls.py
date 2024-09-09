from django.urls import path
from .views import * 

urlpatterns = [
    path('dashboard', dashboard ),
    path('Country/', Country_List ),
    path('Region/', Region_List ),
 
    path('filter_courses/', dashboard_filter_courses ),
    path('course_detail/<int:id>', dashboard_course_detail ),
    path('Region_counts_Course/<int:id>', Region_counts_Course ),
    path('City_counts_Course/<int:id>', City_counts_Course ),

    path('filter_LiveCourse/', dashboard_filter_LiveCourse ),
    path('LiveCourse_detail/<int:id>', dashboard_LiveCourse_detail ),
    path('Region_counts_LiveCourse/<int:id>', Region_counts_LiveCourse ),
    path('City_counts_LiveCourse/<int:id>', City_counts_LiveCourse ),

    path('filter_quiz/', dashboard_filter_quiz ),
    path('quiz_detail/<uuid:exam_id>', dashboard_quiz_detail ),
    path('Region_counts_quiz/<uuid:id>', Region_counts_quiz ),
    path('City_counts_quiz/<uuid:id>', City_counts_quiz ), 

    path('student_Filter/', student_filter),
    path('teacher_filter/', teacher_filter),
    path('manager_filter/', manager_filter),

    path('update_type/<int:id>/', UpdateType),
    path('users/update/<int:id>/', User_Update ),
    path('Update_phone/', UpdatePhone),
    path('download_users/', download_users),

]
 
 