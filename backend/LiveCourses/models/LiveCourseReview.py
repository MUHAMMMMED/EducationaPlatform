from django.db import models
from LiveCourses.models.LiveCourse import LiveCourse
 
class LiveCourseReview(models.Model):
    course = models.ForeignKey(LiveCourse , null = False , on_delete=models.CASCADE, related_name='course_live_course_review')
    image = models.ImageField(upload_to='files/images/LiveCourseReview/Review_images/image/%Y/%m/%d/') 
 