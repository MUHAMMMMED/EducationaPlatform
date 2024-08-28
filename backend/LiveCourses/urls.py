from django.urls import path
from .views import * 
 
urlpatterns = [
   
    path('api/',AvailableLiveCourse),

    path('api/<int:id>', LiveCourseDetailView.as_view()),
    path('api/live_room/<int:id>', LiveCourseLiveRoom.as_view()),
    path('api/waiting_room/<int:id>', LiveCourseWaitingRoom.as_view() ),

     path('api/LiveCourse_pay/<int:id>', LiveCourse_pay),

    path('api/UpdateLiveRoom/', UpdateLiveCourseRoom ),
 
    path('api/LiveCourse_Filter/',LiveCourse_Filter ),
    path('api/user_Filter/<int:id>',user_Filter ),
    path('api/download_users_data/<int:id>',download_users_data ),
    path('api/UpdateStatus/<int:id>',UpdateStatus ),
 

    path('api/create_timeline/', create_timeline ),
    path('api/timeline/<int:pk>/<int:course_id>/', timeline ),
 
    path('api/ask/create/', create_ask ),
    path('api/ask/delete/<int:pk>/', delete_ask),

    path('api/reply/create/', create_reply ),
    path('api/reply/delete/<int:pk>/', delete_reply),
    path('api/live-course-rateList/<int:id>/', LiveCourseRateList  ),

    path('api/create_LiveCourseRate/', create_LiveCourseRate),
 
 
    path('api/live-course-coupon-codes/<int:id>/',  live_course_coupon_codes),
    path('api/live-course-coupon-codes-create/',  live_course_coupon_codes_create),
    path('api/live-course-coupon-codes-delete/<int:id>/',live_course_coupon_codes_delete),


    path('api/live-courses/', live_course_operations ),
    path('api/live-courses/<int:pk>/', live_course_operations ),
    path('api/base/', base_detail),
    path('api/base/<int:pk>/', base_detail),
 
    path('api/course-definitions/',  course_definition_detail ),
    path('api/course-definitions/<int:pk>/', course_definition_detail ),
 
    path('api/points/', point_list ),
    path('api/points/<int:pk>/', point_list ),
 
    path('api/learning-path-points/', learning_path_point_list ),
    path('api/learning-path-points/<int:pk>/', learning_path_point_list ),
  
    path('api/live-course-faqs/', live_course_faq_list ),
    path('api/live-course-faqs/<int:pk>/', live_course_faq_list ),
   
 
    path('api/speakers/', speaker_list ),
    path('api/speakers/<int:pk>/', speaker_list ),

    path('api/live-course-rates/',  live_course_rate_list ),
    path('api/live-course-rates/<int:pk>/', live_course_rate_list ),

    path('api/live-course-reviews/', live_course_review_list ),
    path('api/live-course-reviews/<int:pk>/', live_course_review_list  ),
]

 


 

 