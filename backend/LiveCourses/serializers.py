
from rest_framework import serializers
from accounts.serializers import UserSerializer,UserSerializerwithId,User_Serializer
from Query.serializers  import *
from .models import *
from Courses.models import *

from meetings.serializers import MeetingSerializer
 

class Course_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [ 'id', 'title']
 

class CourseDefinitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseDefinition
        fields = '__all__'
 

class CourseDefinition_Serializer(serializers.ModelSerializer):
    class Meta:
        model = CourseDefinition
        fields = '__all__'

class Timeline_Serializer(serializers.ModelSerializer):
    meeting = MeetingSerializer( )
    class Meta:
        model = Timeline
        fields = '__all__'

  
 
class Timeline_Serializer(serializers.ModelSerializer):
    meeting =  MeetingSerializer( )
    class Meta:
        model = Timeline
        fields = '__all__'

class TimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = '__all__'



class LiveCourse_landing_Serializer(serializers.ModelSerializer):
    class Meta:
        model = LiveCourse
        fields = ['id','title','card_image','discount','waitingDate','time','category']
 
class PointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Point
 
        fields = '__all__'

class LearningPathPointSerializer(serializers.ModelSerializer):
    point = PointSerializer(many=True, read_only=True)
    class Meta:
        model = LearningPathPoint
 
        fields = '__all__'

class Speaker_Serializer(serializers.ModelSerializer):
 
    class Meta:
        model = Speaker
        fields = '__all__'

class SpeakerSerializer(serializers.ModelSerializer):
    Teacher = UserSerializer( read_only=True)
    class Meta:
        model = Speaker
        fields = '__all__'

class BaseSerializer(serializers.ModelSerializer):
    speaker = SpeakerSerializer(many=True, read_only=True)
    learning_Path=LearningPathPointSerializer(many=True, read_only=True)
    definition=CourseDefinitionSerializer(many=True, read_only=True)
    class Meta:
        model = Base 
        exclude = ['id','course']


class Base_Serializer(serializers.ModelSerializer):
    timeline =Timeline_Serializer()
    class Meta:
        model = Base 
        fields = ['intro_Waiting_video','id','timeline' ]
 

class BasE_Serializer(serializers.ModelSerializer):
    definition=CourseDefinitionSerializer(many=True, read_only=True)
    learning_Path=LearningPathPointSerializer(many=True, read_only=True)
    speaker = SpeakerSerializer(many=True, read_only=True)
    class Meta:
        model = Base 
        fields = '__all__'

    def validate_card_image(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value

 


class LiveCourse_landing_Rate_Serializer(serializers.ModelSerializer):
    category = CategorySerializer( read_only=True)
    class Meta:
        model = LiveCourse
        fields = ['title','category']
 
class LiveCourseRate_landing_Serializer(serializers.ModelSerializer):
    course = LiveCourse_landing_Rate_Serializer( read_only=True)
    student = UserSerializer( read_only=True)
    class Meta:
        model = LiveCourseRate
        fields = '__all__'
 
class LiveCourse_Serializer(serializers.ModelSerializer):
    class Meta:
        model = LiveCourse
        fields = ['id','title','join_telegram','join_whatsapp','waitingDate','time']
  

class LiveCourseSerializer(serializers.ModelSerializer):
    author = UserSerializer( read_only=True)
    category = CategorySerializer( read_only=True)
    class Meta:
        model = LiveCourse
        fields = '__all__'

 
class Live_Course_Serializer(serializers.ModelSerializer):
    class Meta:
        model = LiveCourse
        fields = '__all__'

    def validate_card_image(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value

 
 
class UserLiveCourseSerializer(serializers.ModelSerializer):
    course = LiveCourseSerializer( read_only=True)
    student = User_Serializer( read_only=True)

    class Meta:
        model = UserLiveCourse
        fields = '__all__'


class LiveCourseRateSerializer(serializers.ModelSerializer):
    course = LiveCourseSerializer( read_only=True)
    student = UserSerializerwithId( read_only=True)
    class Meta:
        model = LiveCourseRate
        fields = '__all__'

 
class student_LiveCourseRate_Serializer(serializers.ModelSerializer):
     class Meta:
        model = LiveCourseRate
        fields = '__all__'

 
 
class LiveCourseReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiveCourseReview
        fields = '__all__'

 
class LiveCourseFrequentlyAskedSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiveCourseFrequentlyAsked
        fields = '__all__'

class LiveCourseCouponCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiveCourseCouponCode
        fields = '__all__'

 

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
     

class AnswrUserSerializer(serializers.ModelSerializer):
    Teacher = UserSerializer(read_only=True)
    class Meta:
        model = Answr
        fields = '__all__'
 
class AnswrSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answr
        fields = '__all__'
    

class AskUserSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True) 
    parent_comment_answrs = AnswrUserSerializer(many=True, read_only=True)

    class Meta:
        model = Ask
        fields = '__all__'

class AskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ask
        fields = '__all__'        


