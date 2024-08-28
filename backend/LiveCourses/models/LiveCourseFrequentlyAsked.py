from django.db import models
from LiveCourses.models.LiveCourse import LiveCourse
 
 
class LiveCourseFrequentlyAsked(models.Model):
    course = models.ForeignKey(LiveCourse , null=False, on_delete=models.CASCADE, related_name='live_coupon_Freq_course')
    question = models.TextField(null=True, blank=True)
    answer = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.question

class Question(models.Model):
 
    created = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey(LiveCourse , on_delete=models.CASCADE, related_name='course_question')
    question = models.TextField(null=True, blank=True)
    answer = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.question
    
 