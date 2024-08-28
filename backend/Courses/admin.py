 

from django.contrib import admin
from .models import * 
 

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    pass

@admin.register(Rate)
class RateAdmin(admin.ModelAdmin):
    pass
@admin.register(Instructors)
class InstructorsAdmin(admin.ModelAdmin):
    pass

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    pass

@admin.register(CourseSection)
class CourseSectionAdmin(admin.ModelAdmin):
    pass

@admin.register(EpisodeQuiz)
class ExamVideoAdmin(admin.ModelAdmin):
    pass

@admin.register(Episode)
class EpisodeAdmin(admin.ModelAdmin):
    pass
 
@admin.register(CouponCode)
class CouponCodeAdmin(admin.ModelAdmin):
    pass

@admin.register(UserCourse)
class UserCourseAdmin(admin.ModelAdmin):
    pass

 