from django.urls import path
from .views import * 

urlpatterns = [
    path('api/dashboard', dashboard ),
    path('api/Country/', Country_List ),
    path('api/Region/', Region_List ),
 
    path('api/filter_courses/', dashboard_filter_courses ),
    path('api/course_detail/<int:id>', dashboard_course_detail ),
    path('api/Region_counts_Course/<int:id>', Region_counts_Course ),
    path('api/City_counts_Course/<int:id>', City_counts_Course ),

    path('api/filter_LiveCourse/', dashboard_filter_LiveCourse ),
    path('api/LiveCourse_detail/<int:id>', dashboard_LiveCourse_detail ),
    path('api/Region_counts_LiveCourse/<int:id>', Region_counts_LiveCourse ),
    path('api/City_counts_LiveCourse/<int:id>', City_counts_LiveCourse ),

    path('api/filter_quiz/', dashboard_filter_quiz ),
    path('api/quiz_detail/<uuid:exam_id>', dashboard_quiz_detail ),
    path('api/Region_counts_quiz/<uuid:id>', Region_counts_quiz ),
    path('api/City_counts_quiz/<uuid:id>', City_counts_quiz ), 

    path('api/student_Filter/', student_filter),
    path('api/teacher_filter/', teacher_filter),
    path('api/manager_filter/', manager_filter),

    path('api/update_type/<int:id>/', UpdateType),
    path('api/users/update/<int:id>/', User_Update ),
    path('api/Update_phone/', UpdatePhone),
    path('api/download_users/', download_users),

]
 
 