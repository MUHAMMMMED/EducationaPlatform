from rest_framework import serializers
from Courses.models import *
from accounts.serializers import UserSerializer,UserSerializerwithId
from Query.serializers  import *
from Courses.models import Course,UserCourse
from Quiz.models import Exam   
from LiveCourses.models import LiveCourse,UserLiveCourse

  

class CourseSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    class Meta:
        model = Course
        fields = [ 'id','title','price','author'  ]
 

class UserCourseSerializer(serializers.ModelSerializer):
    student = UserSerializer( read_only=True)
    class Meta:
        model = UserCourse
        fields = '__all__'


class LiveCourseSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    class Meta:
        model = LiveCourse
        fields = [ 'id','title','price','author'  ]
 
class UserLiveCourseSerializer(serializers.ModelSerializer):
    student = UserSerializer( read_only=True)
    class Meta:
        model = UserLiveCourse
        fields = '__all__'
 

class ExamSerializer(serializers.ModelSerializer):
    creator = UserSerializerwithId()
    
    class Meta:
        model = Exam
        fields = [ 'id','title','price','creator'  ]
