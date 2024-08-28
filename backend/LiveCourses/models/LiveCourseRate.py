from django.db import models
from LiveCourses.models.LiveCourse import LiveCourse
from accounts.models import User


class LiveCourseRate(models.Model):
    message = models.TextField(blank=True, null=True)
    created = models.DateTimeField(auto_now=True)
    rate_number = models.IntegerField(default=0)
    course = models.ForeignKey(LiveCourse, on_delete=models.CASCADE )
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_live_course_rates'   )
