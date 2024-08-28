from django.urls import path
from .views import * 

urlpatterns = [
 
    path('api/Course_Filter/',Course_Filter ),
    path('api/Course_pay/<uuid:course_uuid>/',  Course_pay),

    path('api/<uuid:course_uuid>/', CourseDetail),
    path('api/episode/<uuid:course_uuid>/<uuid:episode_uuid>/', episode_detail),
    path('api/next-episode/<uuid:episode_uuid>/', NextEpisode),
    path('api/submit-rating/',submit_rating),
  
    path('api/courses/', course_list),
    path('api/course_detail/<int:id>/',course_detail_update),

    path('api/course-faqs/', faq_list ),
    path('api/course-faqs/<int:id>/',  faq_list ),

    path('api/review_list/', review_list ),
    path('api/review_list/<int:id>/',  review_list ),

    path('api/rate_list/', rate_list ),
    path('api/rate_list/<int:id>/',  rate_list ),

    path('api/speaker/', speaker_list ),
    path('api/speaker/<int:id>/',  speaker_list ),

    path('api/Section/', Section ),
    path('api/Section/<int:id>/',  Section ),

    path('api/episodes/', manage_episode  ),
    path('api/episodes/<int:id>/', manage_episode ),
 
    path('api/episode_quiz/', manage_episode_quiz  ),
    path('api/episode_quiz/<int:id>/', manage_episode_quiz ),
 
    path('api/delete_questions/<int:exam_id>/<uuid:question_id>/', delete_question),
  
    path('api/add_question_to_episode_quiz/', add_question_to_episode_quiz  ),
    path('api/delete_questions_from_episode_quiz/<int:exam_id>/<uuid:question_id>/', delete_questions_from_episode_quiz  ),

    path('api/question_Filter/<int:id>/',question_Filter ),
 
    path('api/course-coupon-codes/<int:id>/',  course_coupon_codes),
    path('api/course-coupon-codes-create/', course_coupon_codes_create),
    path('api/course-coupon-codes-delete/<int:id>/',course_coupon_codes_delete),

    path('api/user_Filter/<int:id>',user_Filter ),
    path('api/download_users_data/<int:id>',download_users_data ),
    path('api/UpdateStatus/<int:id>',UpdateStatus ),
 


 ]
 








 