from django.urls import path
from .views import * 
 
urlpatterns = [
   
    path('',AvailableLiveCourse),

    path('<int:id>', LiveCourseDetailView.as_view()),
    path('live_room/<int:id>', LiveCourseLiveRoom.as_view()),
    path('waiting_room/<int:id>', LiveCourseWaitingRoom.as_view() ),

    path('LiveCourse_pay/<int:id>', LiveCourse_pay),

    path('UpdateLiveRoom/', UpdateLiveCourseRoom ),
 
    path('LiveCourse_Filter/',LiveCourse_Filter ),
    path('user_Filter/<int:id>',user_Filter ),
    path('download_users_data/<int:id>',download_users_data ),
    path('UpdateStatus/<int:id>',UpdateStatus ),
 

    path('create_timeline/', create_timeline ),
    path('timeline/<int:pk>/<int:course_id>/', timeline ),
 
    path('ask/create/', create_ask ),
    path('ask/delete/<int:pk>/', delete_ask),

    path('reply/create/', create_reply ),
    path('reply/delete/<int:pk>/', delete_reply),
    path('live-course-rateList/<int:id>/', LiveCourseRateList  ),

    path('create_LiveCourseRate/', create_LiveCourseRate),
 
 
    path('live-course-coupon-codes/<int:id>/',  live_course_coupon_codes),
    path('live-course-coupon-codes-create/',  live_course_coupon_codes_create),
    path('live-course-coupon-codes-delete/<int:id>/',live_course_coupon_codes_delete),


    path('live-courses/', live_course_operations ),
    path('live-courses/<int:pk>/', live_course_operations ),
    path('base/', base_detail),
    path('base/<int:pk>/', base_detail),
 
    path('course-definitions/',  course_definition_detail ),
    path('course-definitions/<int:pk>/', course_definition_detail ),
 
    path('points/', point_list ),
    path('points/<int:pk>/', point_list ),
 
    path('learning-path-points/', learning_path_point_list ),
    path('learning-path-points/<int:pk>/', learning_path_point_list ),
  
    path('live-course-faqs/', live_course_faq_list ),
    path('live-course-faqs/<int:pk>/', live_course_faq_list ),
   
 
    path('speakers/', speaker_list ),
    path('speakers/<int:pk>/', speaker_list ),

    path('live-course-rates/',  live_course_rate_list ),
    path('live-course-rates/<int:pk>/', live_course_rate_list ),

    path('live-course-reviews/', live_course_review_list ),
    path('live-course-reviews/<int:pk>/', live_course_review_list  ),
]

 


 

 