from django.db import models
from LiveCourses.models.LiveCourse import LiveCourse
from accounts.models import User


class UserLiveCourse(models.Model):
    status = models.CharField(max_length=1, choices=[('W', 'Waiting'),('L', 'Live'), ('F', 'Finshed'), ('O', 'Out')], default='S')
    student = models.ForeignKey(User,  null = False , on_delete=models.CASCADE, related_name='student_user_live_course')
    course = models.ForeignKey(LiveCourse , null = False , on_delete=models.CASCADE, related_name='course_user_live_course') 
    date = models.DateField(auto_now=True)
    Paid = models.IntegerField(default=0)
    discount = models.IntegerField(null=False, default=0)

    def __str__(self): 
        return f'{self.student} - {self.course} - {self.status}- {self.date}'

