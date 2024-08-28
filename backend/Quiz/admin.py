from django.contrib import admin
from .models import *

@admin.register(ExamCouponCode)
class ExamCouponCodeAdmin(admin.ModelAdmin):
     pass

 


@admin.register(Question_category)
class ExamAdmin(admin.ModelAdmin):
     pass






@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    # list_display = ('title', 'description', 'creator')
    # Add any other fields you want to display in the list
    pass
@admin.register(UserExam)
class UserExamAdmin(admin.ModelAdmin):
    # list_display = ('exam', 'date',)
    # filter_horizontal = ('student',)
    pass

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    # list_display = ('question_content', 'category', 'correct_option',)
    # filter_horizontal = ('exams','correct_option', )
    pass

@admin.register(ExamSubmission)
class ExamSubmissionAdmin(admin.ModelAdmin):
    list_display = ('exam', 'user', 'score', 'time_taking',)
    filter_horizontal = ('wrong_answers',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
     pass
@admin.register(FrequentlyAsked)
class FrequentlyAskedAdmin(admin.ModelAdmin):
     pass
 
 

 