from django.urls import path
from .views import *

urlpatterns = [
    path('available_exams/', available_exams ),
    path('exam_pay/<uuid:exam_id>/',  exam_pay),
    path('Exam_Filter/',Exam_Filter ),
    path('exam/<uuid:exam_id>/', exam_detail ),
    path('exam_quiz/<uuid:exam_id>/', exam_quiz),
    path('exam_submissions/', submit_exam ),
    path('exam_submission_list/<uuid:exam_id>/',examSubmissionList),
    path('exam_submission_delete/<int:id>/',examSubmissionDelete),

    path('exams/', exams_list),
    path('exam_operations/<uuid:exam_id>/', exam_operations),

    path('review_list/', review_list),
    path('review_list/<int:id>/', review_list),

    path('faq_list/', faq_list),
    path('faq_list/<int:id>/', faq_list),

    path('delete_questions_from_exam/<uuid:exam_id>/<uuid:question_id>/', delete_questions_from_exam),

    path('user_Filter/<uuid:id>/',user_Filter ),
    path('download_users_data/<uuid:id>',download_users_data ),
    path('UpdateTries/<int:id>',UpdateTries ),

    path('exam_coupon_codes/<uuid:id>/',exam_coupon_codes ),
    path('exam_coupon_codes_create/<uuid:id>/',exam_coupon_codes_create ),
    path('exam_coupon_codes_delete/<int:id>/',exam_coupon_codes_delete ),

    path('question_list/',question_list ),
    path('question_Update/<uuid:id>/',question_Update ),
    path('question_Filter/<int:id>/',question_Filter ),
    
    path('add_question_to_exam/',add_question_to_exam ),

    path('Categories_filter/',Categories_filter ),

    path('Category/',Categories ),
    path('Category/<int:id>/',Categories ),

 ]
 
  