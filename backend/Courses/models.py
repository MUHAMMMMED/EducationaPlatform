
from django.db import models
from uuid import uuid4
import uuid
from decimal import Decimal
from accounts.models import User
from Query.models import Category
from Quiz.models import Exam, Question

 

class Course(models.Model):
    LEVEL_CHOICES = (
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),  )
  
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    course_uuid = models.UUIDField(default=uuid.uuid4, unique=True)
    active = models.BooleanField(default=False)
    card_image = models.ImageField(upload_to='files/images/Course/card_image/image/%Y/%m/%d/', blank=True)  
    category = models.ForeignKey(Category, blank=True, null=True,   related_name='category_course', on_delete=models.SET_NULL)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='')
    intro_video = models.CharField(max_length=100, blank=True, null=True) 
    intro_image = models.ImageField(upload_to='files/images/course_images/image/%Y/%m/%d/', blank=True) 
    title = models.CharField(max_length=225)
    description = models.TextField(blank=True, null=True)
    Curriculum = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.IntegerField(null=False, default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE ,related_name='author_course' )
    language = models.CharField(max_length=225)
    course_length = models.CharField(max_length=20, default='0')   
    Lectures = models.FloatField(default=0)
    Enroll = models.FloatField(default=0)
    course_sections = models.ManyToManyField('CourseSection', blank=True)  
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='exam_course', blank=True, null=True)   
    pixal_id= models.CharField(max_length=500,blank=True, null=True)
    views  = models.IntegerField(default=0,blank=True, null=True)

    def __str__(self):
        return self.title

 
class EpisodeQuiz(models.Model):
    course = models.ForeignKey(Course , null = False , on_delete=models.CASCADE, related_name='episode_quiz_course')
    title = models.CharField(max_length=255, null = False ,)
    description = models.TextField( blank=True)
    questions = models.ManyToManyField(Question,  blank=True)
    def __str__(self):
        return self.title
 

class Episode(models.Model):
    episode_uuid=models.UUIDField(default=uuid.uuid4,unique=True)
    title=models.CharField(max_length=225,blank=True)
    material_link= models.CharField(max_length = 300 ,blank=True,null=True)
    length=models.DecimalField(max_digits=100,decimal_places=2,blank=True)
    video_link = models.CharField(max_length = 300 ,blank=True,null=True)
    video_id = models.CharField(max_length = 100  ,blank=True,null=True)
    is_preview = models.BooleanField(default = False)
    exam = models.ForeignKey( EpisodeQuiz , on_delete=models.CASCADE,  blank=True, null=True, related_name='episode_exam')
    serial_number = models.IntegerField(null=False)
    Transcript = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title

class CourseSection(models.Model):
    title = models.CharField(max_length=225, blank=True)
    description = models.TextField(blank=True, null=True)  
    section_number = models.IntegerField(blank=True, null=True)
    episodes = models.ManyToManyField(Episode, blank=True)  
    def __str__(self):
        return self.title


class UserCourse(models.Model):
    created = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=1, choices=[('E', 'Enrolled'),  ('O', 'Out')]  )
    student = models.ForeignKey(User, on_delete=models.CASCADE , null=True , related_name='user_course_student')
    course = models.ForeignKey(Course , null = False , on_delete=models.CASCADE, related_name='user_course_course')
    Paid = models.IntegerField(default=0)
    date = models.DateField(auto_now=True)
    def __str__(self):
        return f'{self.student} - {self.course}'


class Instructors(models.Model):
    course = models.ForeignKey(Course , null = False , on_delete=models.CASCADE, related_name='course_instructor')
    teacher = models.ForeignKey(User, on_delete=models.CASCADE,related_name='instructor_teacher', null=True)
    description = models.CharField(max_length=500)

 
class Rate(models.Model):
    message = models.TextField( blank=True, null=True)
    created = models.DateTimeField(auto_now=True)
    rate_number = models.IntegerField(default=0)
    course = models.ForeignKey(Course, on_delete=models.CASCADE , blank=True, null=True, related_name='course_rate')
    student = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='student_rate')

 
class CouponCode(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE , null = False ,related_name='course_coupon_code' )
    Code  = models.CharField(max_length = 100 , null = False)
    date = models.DateField( blank=True, null=True)
    discount = models.IntegerField(null=False, default=0)
    Enroll = models.FloatField(default=1)
    def __str__(self):
        return self.Code
  
class Review(models.Model):
    course = models.ForeignKey(Course , null = False , on_delete=models.CASCADE ,related_name='course_review')
    image = models.ImageField(upload_to='files/images/Review/Review_images/image/%Y/%m/%d/') 

 
class FrequentlyAsked(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='frequently_asked_course')
    question = models.TextField(null=True, blank=True)
    answer = models.TextField(null=True, blank=True)
    def __str__(self):
        return self.question


 

 