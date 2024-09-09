from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
  
from .serializers import *
from .models import *

from Courses.models import Course
from Courses.serializers import CourseSerializer

from Quiz.models import Exam 
from Quiz.serializers import ExamSerializer

from LiveCourses.models import LiveCourse 
from LiveCourses.serializers import LiveCourseSerializer

from Query.models import Category
from Query.serializers import CategorySerializer

from tips_and_tricks.models import Tip
from tips_and_tricks.serializers import TipSerializer
 
from Event.models import Event
from Event.serializers import EventSerializer

from accounts.models import User
from accounts.serializers import UserSerializerwithId
 
from Home.models import TeamMembers
from Home.serializers import TeamMembers_Serializer




def check_permissions(request):
    """
    Check if the user is authenticated and has permission to access the data.
    """
    if not request.user.is_authenticated:
        return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED) 

    if request.user.user_type != 'M':  # Assuming 'M' represents the Manager user type
        return Response({'error': 'You do not have permission to access this data.'}, status=status.HTTP_403_FORBIDDEN)
    
    return None  # No error, user is authenticated and has permission
 

 
@api_view(['GET'])
def available_category(request):
    # Retrieve all Category objects from the database
    categories = Category.objects.all()
    
    # Serialize the Category objects into JSON format
    serializer = CategorySerializer(categories, many=True)
    
    # Return the serialized data with a 200 OK status
    return Response(serializer.data, status=status.HTTP_200_OK)
 
 
@api_view(['GET'])
def home(request):
    # Retrieve the first Info object from the database
    info = Info.objects.all().first()

    # Check if info is None
    if info is not None:
        # Increment the view count for the Info object
        info.views += 1
        info.save()

        # Serialize the Info object
        info_data = InfoSerializer(info)
    else:
        # If no Info object exists, handle the case accordingly
        info_data = None

    # Retrieve and serialize all Slide objects
    slide = Slide.objects.all()
    slide_data = SlideSerializer(slide, many=True)

    # Retrieve and serialize all Category objects
    categories = Category.objects.all()
    category_data = CategorySerializer(categories, many=True)

    # Retrieve and serialize a random selection of 5 Rate objects
    rate = Rate.objects.all().order_by('?')[:5]
    rate_data = RateSerializer(rate, many=True)

    # Retrieve and serialize all TeamMembers objects
    Team = TeamMembers.objects.all()
    Team_data = TeamMembersSerializer(Team, many=True)

    # Retrieve and serialize all Supporters objects
    supporters = Supporters.objects.all()
    supporters_data = SupportersSerializer(supporters, many=True)

    # Retrieve and serialize a random selection of 3 Tip objects
    tip = Tip.objects.all().order_by('?')[:3]
    tip_data = TipSerializer(tip, many=True)

    # Retrieve and serialize all active Event objects
    events = Event.objects.filter(active=True).order_by('?')
    Event_data = EventSerializer(events, many=True)

    # Compile all serialized data into a dictionary
    data = {
        'info': info_data.data if info_data else None,
        'slide': slide_data.data,
        'categories': category_data.data,
        'rate': rate_data.data,
        'supporters': supporters_data.data,
        'tip': tip_data.data,
        'events': Event_data.data,
        'team': Team_data.data
    }

    # Return the compiled data with a 200 OK status
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def info(request):
    # Retrieve the first Info object from the database
    info = Info.objects.all().first()
    # Serialize the Info object
    info_data = InfoSerializer(info)
    # Return the serialized data with a 200 OK status
    return Response(info_data.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def category_detail(request, category_id):
    try:
        # Retrieve the Category object with the provided category_id
        category = Category.objects.get(pk=category_id)
    except Category.DoesNotExist:
        # Return a 404 error if the Category does not exist
        return Response({'error': 'Category not found'}, status=404)

    # Filter active courses, live courses, and exams by the retrieved category
    courses = Course.objects.filter(active=True, category_id=category.id)
    live_courses = LiveCourse.objects.filter(active=True, category_id=category_id)
    exams = Exam.objects.filter(active=True, category_id=category_id)

    # Serialize the filtered results
    course_serializer = CourseSerializer(courses, many=True)
    live_course_serializer = LiveCourseSerializer(live_courses, many=True)
    exam_serializer = ExamSerializer(exams, many=True)

    # Compile the serialized data into a dictionary
    data = {
        'courses': course_serializer.data,
        'live_courses': live_course_serializer.data,
        'exams': exam_serializer.data
    }

    # Return the compiled data with a 200 OK status
    return Response({'results': data}, status=status.HTTP_200_OK)

 
@api_view(['GET'])
def Filter(request):
    # Retrieve the query parameter from the request
    query = request.GET.get('query', '')

    # Filter results based on the presence of a query parameter
    if query == '':
        # If no query parameter is provided, get all active courses, live courses, and exams
        courses = Course.objects.filter(active=True)
        live_courses = LiveCourse.objects.filter(active=True)
        exams = Exam.objects.filter(active=True)
    else:
        # If a query parameter is provided, filter by title containing the query string
        courses = Course.objects.filter(active=True, title__icontains=query)
        live_courses = LiveCourse.objects.filter(active=True, title__icontains=query)
        exams = Exam.objects.filter(active=True, title__icontains=query)

    # Serialize the filtered results
    course_serializer = CourseSerializer(courses, many=True)
    live_course_serializer = LiveCourseSerializer(live_courses, many=True)
    exam_serializer = ExamSerializer(exams, many=True)

    # Compile the serialized data into a dictionary
    data = {
        'courses': course_serializer.data,
        'live_courses': live_course_serializer.data,
        'exams': exam_serializer.data
    }

    # Return the compiled data with a 200 OK status
    return Response({'results': data}, status=status.HTTP_200_OK)
 



@api_view(['GET'])
def Setting(request):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response

    # Retrieve the first Info instance
    info = Info.objects.all().first()
    info_data = InfoSerializer(info)

    # Retrieve all Users with 'S' (student) user_type
    user = User.objects.filter(user_type='S')

    # Retrieve all Users with 'T' (teacher) user_type
    teacher = User.objects.filter(user_type='T')

    # Retrieve all Slide instances
    slide = Slide.objects.all()
    slide_data = SlideSerializer(slide, many=True)

    # Retrieve the first 5 random Rate instances
    rate = Rate.objects.all().order_by('?')[:5]
    rate_data = RateSerializer(rate, many=True)

    # Retrieve all TeamMembers instances
    Team = TeamMembers.objects.all()
    Team_data = TeamMembersSerializer(Team, many=True)

    # Retrieve all Supporters instances
    supporters = Supporters.objects.all()
    supporters_data = SupportersSerializer(supporters, many=True)

    # Serialize the User and Teacher data
    user_serializer = UserSerializerwithId(user, many=True)
    teacher_serializer = UserSerializerwithId(teacher, many=True)

    # Compile all serialized data into a dictionary
    data = {
        'info': info_data.data,
        'slide': slide_data.data,
        'rate': rate_data.data,
        'supporters': supporters_data.data,
        'user': user_serializer.data,
        'teacher': teacher_serializer.data,
        'team': Team_data.data
    }

    # Return the compiled data with a 200 OK status
    return Response(data, status=status.HTTP_200_OK)

  
@api_view(['POST', 'PUT', 'DELETE'])
def slide(request, id=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response

    if request.method == 'POST':
        # Handle POST request to create a new Slide
        serializer = SlideSerializer(data=request.data)
        
        # Validate and save the new Slide
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return validation errors if any
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        if id:
            try:
                # Attempt to retrieve the Slide instance by ID
                slide = Slide.objects.get(id=id)
                serializer = SlideSerializer(slide, data=request.data)
                
                # Validate and save the updated Slide
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                
                # Return validation errors if any
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Slide.DoesNotExist:
                # Return an error if the Slide does not exist
                return Response({"error": "Slide not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error if no ID is provided
            return Response({"error": "No slide ID provided"}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if id:
            try:
                # Attempt to retrieve and delete the Slide instance by ID
                slide = Slide.objects.get(id=id)
                slide.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Slide.DoesNotExist:
                # Return an error if the Slide does not exist
                return Response({"error": "Slide not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error if no ID is provided
            return Response({"error": "No slide ID provided"}, status=status.HTTP_400_BAD_REQUEST)

 

@api_view(['POST', 'DELETE'])
def supporters(request, id=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    if request.method == 'POST':
        # Handle POST request to create a new Supporter
        serializer = SupportersSerializer(data=request.data)
        
        # Validate and save the new Supporter
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return validation errors if any
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if id:
            try:
                # Attempt to retrieve and delete the specified Supporter
                supporter = Supporters.objects.get(id=id)
                supporter.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Supporters.DoesNotExist:
                # Return an error if the Supporter does not exist
                return Response({"error": "Supporter not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error if no ID is provided
            return Response({"error": "No Supporter ID provided"}, status=status.HTTP_400_BAD_REQUEST)
 
     
 

@api_view(['POST', 'PUT'])
def create_or_update_info(request, pk=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    if request.method == 'POST':
        # Handle POST request to create a new Info instance
        serializer = InfoSerializer(data=request.data)
    
    elif request.method == 'PUT':
        # Handle PUT request to update an existing Info instance
        try:
            # Attempt to retrieve the Info instance by primary key
            info_instance = Info.objects.get(pk=pk)
        except Info.DoesNotExist:
            # Return an error if the Info instance does not exist
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Initialize the serializer with the existing instance and new data
        serializer = InfoSerializer(info_instance, data=request.data)
    
    else:
        # Return method not allowed if the request method is neither POST nor PUT
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    # Validate and save the data if the serializer is valid
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    # Return validation errors if the data is not valid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST', 'DELETE'])
def rate_list(request, id=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    if request.method == 'POST':
        # Handle POST request to create a new Rate
        serializer = Rate_Serializer(data=request.data)
        
        # Validate and save the new Rate
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return validation errors if any
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if id:
            try:
                # Attempt to retrieve and delete the specified Rate
                rate = Rate.objects.get(id=id)
                rate.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Rate.DoesNotExist:
                # Return an error if the Rate does not exist
                return Response({"error": "Rate not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error if no ID is provided
            return Response({"error": "No Rate ID provided"}, status=status.HTTP_400_BAD_REQUEST)
 

@api_view(['POST', 'DELETE'])
def team_member(request, id=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    if request.method == 'POST':
        # Handle POST request to create a new Team Member
        serializer = TeamMembers_Serializer(data=request.data)
        
        # Validate and save the new Team Member
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return validation errors if any
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if id:
            try:
                # Attempt to retrieve and delete the specified Team Member
                team_member = TeamMembers.objects.get(id=id)
                team_member.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except TeamMembers.DoesNotExist:
                # Return an error if the Team Member does not exist
                return Response({"error": "Team Member not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error if no ID is provided
            return Response({"error": "No Team Member ID provided"}, status=status.HTTP_400_BAD_REQUEST)