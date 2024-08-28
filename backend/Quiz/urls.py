from django.urls import path
from .views import *

urlpatterns = [
    path('available_exams/', available_exams ),
    path('api/exam_pay/<uuid:exam_id>/',  exam_pay),
    path('api/Exam_Filter/',Exam_Filter ),
    path('api/exam/<uuid:exam_id>/', exam_detail ),
    path('api/exam_quiz/<uuid:exam_id>/', exam_quiz),
    path('api/exam_submissions/', submit_exam ),
    path('api/exam_submission_list/<uuid:exam_id>/',examSubmissionList),
    path('api/exam_submission_delete/<int:id>/',examSubmissionDelete),

    path('api/exams/', exams_list),
    path('api/exam_operations/<uuid:exam_id>/', exam_operations),

    path('api/review_list/', review_list),
    path('api/review_list/<int:id>/', review_list),

    path('api/faq_list/', faq_list),
    path('api/faq_list/<int:id>/', faq_list),

    path('api/delete_questions_from_exam/<uuid:exam_id>/<uuid:question_id>/', delete_questions_from_exam),

    path('api/user_Filter/<uuid:id>/',user_Filter ),
    path('api/download_users_data/<uuid:id>',download_users_data ),
    path('api/UpdateTries/<int:id>',UpdateTries ),

    path('api/exam_coupon_codes/<uuid:id>/',exam_coupon_codes ),
    path('api/exam_coupon_codes_create/<uuid:id>/',exam_coupon_codes_create ),
    path('api/exam_coupon_codes_delete/<int:id>/',exam_coupon_codes_delete ),

    path('api/question_list/',question_list ),
    path('api/question_Update/<uuid:id>/',question_Update ),
    path('api/question_Filter/<int:id>/',question_Filter ),
    
    path('api/add_question_to_exam/',add_question_to_exam ),

 
    path('api/Categories_filter/',Categories_filter ),

    path('api/Category/',Categories ),


    path('api/Category/<int:id>/',Categories ),

 ]
 
  