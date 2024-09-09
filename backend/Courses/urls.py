from django.urls import path
from .views import * 

urlpatterns = [
 
    path('Course_Filter/',Course_Filter ),
    path('Course_pay/<uuid:course_uuid>/',  Course_pay),

    path('<uuid:course_uuid>/', CourseDetail),
    path('episode/<uuid:course_uuid>/<uuid:episode_uuid>/', episode_detail),
    path('next-episode/<uuid:episode_uuid>/', NextEpisode),
    path('submit-rating/',submit_rating),
  
    path('courses/', course_list),
    path('course_detail/<int:id>/',course_detail_update),

    path('course-faqs/', faq_list ),
    path('course-faqs/<int:id>/',  faq_list ),

    path('review_list/', review_list ),
    path('review_list/<int:id>/',  review_list ),

    path('rate_list/', rate_list ),
    path('rate_list/<int:id>/',  rate_list ),

    path('speaker/', speaker_list ),
    path('speaker/<int:id>/',  speaker_list ),

    path('Section/', Section ),
    path('Section/<int:id>/',  Section ),

    path('episodes/', manage_episode  ),
    path('episodes/<int:id>/', manage_episode ),
 
    path('episode_quiz/', manage_episode_quiz  ),
    path('episode_quiz/<int:id>/', manage_episode_quiz ),
 
    path('delete_questions/<int:exam_id>/<uuid:question_id>/', delete_question),
  
    path('add_question_to_episode_quiz/', add_question_to_episode_quiz  ),
    path('delete_questions_from_episode_quiz/<int:exam_id>/<uuid:question_id>/', delete_questions_from_episode_quiz  ),

    path('question_Filter/<int:id>/',question_Filter ),
 
    path('course-coupon-codes/<int:id>/',  course_coupon_codes),
    path('course-coupon-codes-create/', course_coupon_codes_create),
    path('course-coupon-codes-delete/<int:id>/',course_coupon_codes_delete),

    path('user_Filter/<int:id>',user_Filter ),
    path('download_users_data/<int:id>',download_users_data ),
    path('UpdateStatus/<int:id>',UpdateStatus ),
  

 ]
 








 