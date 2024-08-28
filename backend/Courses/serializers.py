from rest_framework import serializers
from .models import *
from Quiz.serializers  import  QuestionSerializer,ExamToCourseDetailSerializer
from accounts.serializers import UserSerializer,User_Serializer
from Query.serializers  import *
  
class EpisodeQuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = EpisodeQuiz
        fields = '__all__'

class EpisodeQuiz_Serializer(serializers.ModelSerializer):
    class Meta:
        model = EpisodeQuiz
        fields = '__all__'
 
 
class EpisodeSerializer(serializers.ModelSerializer):
    exam = EpisodeQuizSerializer()
    class Meta:
        model = Episode
        fields = [ 'episode_uuid','title', 'material_link','video_link','video_id','is_preview','Transcript' ,'exam'  ]
 
class CourseEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = [ 'title','length', 'is_preview','episode_uuid'  ]
 
class CourseSectionSerializer(serializers.ModelSerializer):
    episodes = CourseEpisodeSerializer(many=True, read_only=True)
    class Meta:
        model = CourseSection
        fields = '__all__'

class InstructorsSerializer(serializers.ModelSerializer):
    teacher = UserSerializer( read_only=True)
    class Meta:
        model = Instructors
        fields = '__all__'
 
class Instructors_Serializer(serializers.ModelSerializer):
 
    class Meta:
        model = Instructors
        fields = '__all__'

 
class RateSerializer(serializers.ModelSerializer):
    student = UserSerializer( read_only=True)

    class Meta:
        model = Rate
        fields = '__all__'
 
class CourseSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    course_sections = CourseSectionSerializer(many=True, read_only=True)
    author = UserSerializer()
    exam = ExamToCourseDetailSerializer()
     
    class Meta:
        model = Course
        fields = '__all__'

class CourseEpisodeSerializer(serializers.ModelSerializer):
    course_sections = CourseSectionSerializer(many=True, read_only=True)
    exam = ExamToCourseDetailSerializer()

    class Meta:
        model = Course
        fields = [ 'course_uuid','course_sections' ,'exam' ]
 

class UserCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCourse
        fields = '__all__'
       

class UserCourse_Serializer(serializers.ModelSerializer):
    student = User_Serializer( read_only=True)

    class Meta:
        model = UserCourse
        fields = '__all__'

 

class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields = '__all__'

class RateSerializerList(serializers.ModelSerializer):
    user_full_name = serializers.CharField(source='student.get_full_name', read_only=True)
    class Meta:
        model = Rate
        fields = [ 'id', 'message', 'rate_number',   'user_full_name']

class Rate_SerializerList(serializers.ModelSerializer):
 
    class Meta:
        model = Rate
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

        def validate_image(self, value):
           """
           Custom validation to check if uploaded file is an image.
           """
           if not value.content_type.startswith('image/'):
              raise serializers.ValidationError('Uploaded file must be an image.')
           return value


class FrequentlyAskedSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrequentlyAsked
        fields = '__all__'

 
class CouponCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CouponCode
        fields = '__all__'

 

class Course_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
    
    def validate_card_image(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value

  

class CourseEpisode_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = '__all__'
  

class CourseSection_Serializer(serializers.ModelSerializer):
    episodes = CourseEpisode_Serializer(many=True, read_only=True)
    class Meta:
        model = CourseSection
        fields = '__all__'

   

class CourseSerializer_all(serializers.ModelSerializer):
    category = CategorySerializer()
    course_sections = CourseSection_Serializer(many=True, read_only=True)
    exam = ExamToCourseDetailSerializer()

    # course_rate = RateSerializerList(many=True, read_only=True)
    # course_review = ReviewSerializer(many=True, read_only=True)
    # frequently_asked_course = FrequentlyAskedSerializer(many=True, read_only=True)
    # course_instructor = InstructorsSerializer(many=True, read_only=True)
    class Meta:
        model = Course
        fields = '__all__'
 
class  Section_Serializer(serializers.ModelSerializer):
     class Meta:
        model = CourseSection
        fields = '__all__'

 
 
