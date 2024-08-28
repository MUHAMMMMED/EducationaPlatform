from django.db import models
from LiveCourses.models.LiveCourse import LiveCourse



class LiveCourseCouponCode(models.Model):
    course = models.ForeignKey(LiveCourse , null = False , on_delete=models.CASCADE,related_name='live_coupon_course')
    Code  = models.CharField(max_length = 100 , null = False)
    date = models.DateField( blank=True, null=True)
    Enroll = models.FloatField(default=1)
    discount = models.IntegerField(null=False, default=0)

    def __str__(self):
        return self.Code