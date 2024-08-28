 
from uuid import uuid4
from django.db import models
from accounts.models import User
from Query.models import Category
    
class Question_category(models.Model):
  title = models.CharField(max_length=255)
  def __str__(self):
    return self.title

class Question(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid4)
  created = models.DateTimeField(auto_now_add=True)
  creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creator_question')
  category = models.ForeignKey(Question_category,  on_delete=models.SET_NULL, null=True, related_name='category_question') 
  question_content = models.TextField(verbose_name='Question Content', null=True, blank=True, )
  question_image = models.ImageField(upload_to='files/images/Question/question_images/image/%Y/%m/%d/', null=True, blank=True, verbose_name='Question Image')
  question_video_youtube = models.CharField(max_length = 300 ,null=True, blank=True)
  question_video = models.CharField(max_length= 500 ,  null=True, blank=True )
  option_A = models.CharField(max_length=500)
  option_B = models.CharField(max_length=500)
  option_C = models.CharField(max_length=500, blank=True)
  option_D = models.CharField(max_length=500, blank=True)
  correct_option = models.CharField(max_length=1, choices=[('1', 'A'), ('2', 'B'), ('3', 'C'), ('4', 'D')])
  def __str__(self):
     return f'{self.question_content} - {self.correct_option}'
   



class Exam(models.Model):
  creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_exams')
  LEVEL_CHOICES = ( ('Beginner', 'Beginner'),('Intermediate', 'Intermediate'),('Advanced', 'Advanced'),)
  level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='')
  id = models.UUIDField(primary_key=True, default=uuid4)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateField(auto_now=True)
  active= models.BooleanField(default = False)
  card_image = models.ImageField(upload_to='files/images/Exam/card_image/image/%Y/%m/%d/', blank=True)  
  intro_video = models.CharField(max_length = 100 , null=True, blank=True)
  intro_image= models.FileField(upload_to = "files/Exam", null=True, blank=True)
  category = models.ForeignKey(Category,  on_delete=models.SET_NULL,null=True, blank=True, related_name='category_exam') 
  title = models.CharField(max_length=255, verbose_name='Exam Title')
  description = models.TextField(verbose_name='Description')
  price = models.DecimalField(max_digits=10, decimal_places=2)
  discount = models.IntegerField(null=False , default = 0) 
  time_to_answer = models.IntegerField(default=60, verbose_name='Time to Answer ')
  WrongAnswers= models.BooleanField(default = False)
  tries = models.FloatField(default=1, verbose_name='tries')
  Enroll = models.FloatField(default=1 )
  questions = models.ManyToManyField(Question, related_name='questions')
  pixal_id= models.CharField(max_length=500,blank=True, null=True)
  views  = models.IntegerField(default=0,blank=True, null=True)

  def __str__(self):
    return self.title
 
class UserExam(models.Model):
    created = models.DateTimeField(auto_now=True)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrolled_exam')
    exam = models.ForeignKey(Exam , null = False , on_delete=models.CASCADE, related_name='exam_user_exam') 
    date = models.DateTimeField(auto_now_add=True)
    tries = models.FloatField(default=1, verbose_name='tries')
    Paid = models.IntegerField(default=0)
    def __str__(self):
        return f'{self.student} - {self.exam}'
   
class ExamSubmission(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='exam_submissions', blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_submissions', blank=True)
    score = models.FloatField(default=0, verbose_name='Exam Score', null=True, blank=True)
    time_taking = models.IntegerField(default=0, null=True, blank=True)
    wrong_answers = models.ManyToManyField(Question, blank=True)

class Review(models.Model):
    exam = models.ForeignKey(Exam , null = False , on_delete=models.CASCADE , related_name='exam_review')
    image = models.ImageField(upload_to='files/images/Review_images/image/%Y/%m/%d/') 

class  FrequentlyAsked (models.Model):
    exam = models.ForeignKey(Exam , null = False , on_delete=models.CASCADE , related_name='exam_requently')
    question = models.TextField(null=True, blank=True)
    answer = models.TextField(null=True, blank=True)
    def __str__(self):
        return self.question

class ExamCouponCode(models.Model):
    exam = models.ForeignKey(Exam, null = False , on_delete=models.CASCADE , related_name='exam_coupon')
    Code = models.CharField(max_length = 100 , null = False)
    date = models.DateField( blank=True, null=True)
    Enroll = models.FloatField(default=1)
    discount = models.IntegerField(null=False, default=0)
 
    def __str__(self):
        return self.Code

 



 

