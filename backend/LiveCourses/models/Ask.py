 
from django.db import models
from LiveCourses.models.LiveCourse import LiveCourse
from accounts.models import User


 
 
class Ask(models.Model):
    WAITING = 'waiting'
    LIVE ='live'
    CHOICES_STATUS = [ (WAITING,'Waiting'),(LIVE,'live')]
    status = models.CharField(max_length=10, choices=CHOICES_STATUS,null=True, blank=True  )
    course = models.ForeignKey(LiveCourse , on_delete=models.CASCADE,null=True, blank=True, related_name='course_ask' )
    content = models.TextField(null=True, blank=True )
    student = models.ForeignKey(User, on_delete=models.CASCADE ,null=True , related_name='student_ask')
    created = models.DateTimeField(auto_now_add=True )

    def __str__(self):
        return f'{self.student} - {self.created}'
 

class Answr(models.Model):
    content = models.TextField()
    Teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='teacher_answrs')
    parent_comment = models.ForeignKey(Ask, on_delete=models.CASCADE, related_name='parent_comment_answrs')

    def __str__(self):
        return f'{self.Teacher}'
