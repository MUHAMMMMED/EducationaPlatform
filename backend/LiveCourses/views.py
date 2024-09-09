from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import status   
from django.http import HttpResponse
import csv
from .serializers import *
from .models import *
from Courses.models import Course  
from accounts.models import User
from meetings.models import Meeting


 
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
def AvailableLiveCourse(request):
    # Filter the LiveCourse objects to include only those that are active
    course = LiveCourse.objects.filter(active=True)
    # Serialize the filtered list of active courses
    serializer = LiveCourseSerializer(course, many=True)

    # Return the serialized data with a status of 200 OK
    return Response(serializer.data)

 

@api_view(['GET'])
def LiveCourse_pay(request, id):
    try:
        # Fetch the course object using the provided course ID
        course = LiveCourse.objects.get(id=id)
        
        # Serialize course data
        course_serializer = LiveCourseSerializer(course)
        course_data = course_serializer.data

        # Set is_enrolled to False by default
        is_enrolled = False

        # Check if the user is authenticated
        if request.user.is_authenticated:
            # Fetch the user's live course enrollment
            user_live = UserLiveCourse.objects.filter(
                student=request.user, 
                course_id=id, 
                status__in=['W', 'L']
            ).last()
            if user_live:
                is_enrolled = True
            else:
                pass

        # Return JSON response with both course data and enrollment status
        return Response({
            'course': course_data,
            'is_enrolled': is_enrolled
        })
        
    except LiveCourse.DoesNotExist:
        return Response({'error': 'Course not found'}, status=404)
 
  

@api_view(['GET'])
def LiveCourse_Filter(request):
    # Get the query parameter from the request, default to an empty string if not provided
    query = request.GET.get('query', '')

    # Filter the LiveCourse objects based on whether a query is provided
    if query == '':
        # If no query is provided, return all active courses
        courses = LiveCourse.objects.filter(active=True)
    else:
        # If a query is provided, filter courses to include only those with titles containing the query string
        courses = LiveCourse.objects.filter(active=True, title__icontains=query)

    # Serialize the filtered list of courses
    course_serializer = LiveCourseSerializer(courses, many=True)

    # Return the serialized data with a status of 200 OK
    return Response(course_serializer.data, status=status.HTTP_200_OK)



class LiveCourseDetailView(APIView):
    def get(self, request, id):
     
        try:
            # Fetch the course object using the provided course_uuid
            course = LiveCourse.objects.get(id=id)
            active = course.active
            if active:  # Check if the course is active
                is_login = False
                # Check if the user is authenticated
                if request.user.is_authenticated:
                    is_login = True
 
              # Get the specific course instance
                # Fetch questions related to the course with the provided course_uuid
                questions = LiveCourseFrequentlyAsked.objects.filter(course__id=id)
                # Fetch review images related to the course with the provided course_uuid
                course_review_images = LiveCourseReview.objects.filter(course__id=id)
                course_review = course_review_images.all().order_by('?')
                # Serialize the course, rates, review images, and questions
                course_serializer = LiveCourse_landing_Serializer(course)
                base = Base.objects.filter(course__id=id).first()
             
                # Fetch rates related to the course with the provided course_uuid
                rates = LiveCourseRate.objects.filter(course__id=id)
                rate = rates.all().order_by('?')
                Base_serializer = BaseSerializer(base)
                images_serializer = LiveCourseReviewSerializer(course_review, many=True)
                question_serializer = LiveCourseFrequentlyAskedSerializer(questions, many=True)
                rate_serializer = LiveCourseRate_landing_Serializer(rate, many=True)
                # Combine the serialized data into course_data
                course_data = course_serializer.data
                course_data['Base'] = Base_serializer.data
                course_data['review_images'] = images_serializer.data
                course_data['questions'] = question_serializer.data
                course_data['rates'] = rate_serializer.data
                course_data['is_login'] = is_login
                course.views+= 1
                course.save()

                # Return the combined data as a response
                return Response(course_data, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'The course is not available'}, status=status.HTTP_404_NOT_FOUND)

        except course.DoesNotExist:
            return Response({'message': 'The course is not available'}, status=status.HTTP_404_NOT_FOUND)


 
 



 
class LiveCourseWaitingRoom(APIView):
    def get(self, request, id):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return Response({'detail': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Ensure the provided ID is a valid integer
        try:
            course_id = int(id)
        except ValueError:
            return Response({'error': 'Invalid course ID'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the user's live course enrollment
        user_live = UserLiveCourse.objects.filter(student=request.user, course_id=course_id, status='W').first()

        # Set is_enrolled to False by default
        is_enrolled = False
        is_author = False  # Initialize is_author here

        if user_live:
            is_enrolled = True
        else:
            try:
                course = LiveCourse.objects.get(id=course_id)
            except LiveCourse.DoesNotExist:
                return Response({'message': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

            # Check if the user is the author of the course
            is_author = request.user == course.author
            if is_author:
                is_enrolled = True

        # Check if the user is enrolled in the course
        if is_enrolled:
            # Fetch the course object using the provided course ID
            course = LiveCourse.objects.get(id=course_id)

            # Check if the course is active
            if not course.active:
                return Response({'message': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
 
            course_serializer = LiveCourse_Serializer(course)

            base = Base.objects.filter(course__id=id).first()
            base_serializer = Base_Serializer(base)

            timeline = Timeline.objects.filter(course__id=id)
            timeline_serializer = Timeline_Serializer(timeline, many=True)

            if base and base.timeline and base.timeline.meeting:
               timeline_meeting = Meeting.objects.get(id=base.timeline.meeting.id)
               timeline_meeting_serializer = MeetingSerializer(timeline_meeting)
            else:
               timeline_meeting_serializer = None

            ask = Ask.objects.filter(course__id=id, status='waiting').order_by('-created')
            ask_serializer = AskUserSerializer(ask, many=True)                 

            meeting = Meeting.objects.filter(course__id=id)
            meeting_serializer = MeetingSerializer(meeting, many=True)

            course_data = course_serializer.data
            course_data['Base'] = base_serializer.data
            course_data['timeline'] = timeline_serializer.data
            course_data['meeting'] = meeting_serializer.data
            course_data['askRoom'] = ask_serializer.data
            course_data['timeline_meeting'] = timeline_meeting_serializer.data if timeline_meeting_serializer else None
            course_data['is_author'] = is_author

            return Response(course_data, status=status.HTTP_200_OK)
        else:
            return Response({'is_enrolled': False}, status=status.HTTP_200_OK)

 
 
class LiveCourseLiveRoom(APIView):
    def get(self, request, id):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return Response({'message': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Ensure the provided ID is a valid integer
        try:
            course_id = int(id)
        except ValueError:
            return Response({'message': 'Invalid course ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Fetch the user's live course enrollment
        user_live = UserLiveCourse.objects.filter(student=request.user, course_id=course_id, status='L').first()
        is_enrolled = bool(user_live)
        
        try:
            # Fetch the course object using the provided course ID
            course = LiveCourse.objects.get(id=course_id)
            
            is_author = request.user == course.author
            
            # Check if the user is enrolled in the course or is the author
            if is_enrolled or is_author:
                # Check if the course is active
                if not course.active:
                    return Response({'message': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
                
                # Serialize course data
                course_serializer = LiveCourseSerializer(course)
                course_data = course_serializer.data
                
                # Serialize related objects
                base = Base.objects.filter(course_id=course_id).first()
                base_serializer = Base_Serializer(base)
                timeline = Timeline.objects.filter(course_id=course_id)
                timeline_serializer = Timeline_Serializer(timeline, many=True)
                meeting = Meeting.objects.filter(course_id=course_id)
                meeting_serializer = MeetingSerializer(meeting, many=True)
                ask = Ask.objects.filter(course_id=course_id, status='live').order_by('-created')
                ask_serializer = AskUserSerializer(ask, many=True)
                
                # Additional serialization for timeline meeting
                if base and base.timeline and base.timeline.meeting:
                    timeline_meeting = Meeting.objects.get(id=base.timeline.meeting.id)
                    timeline_meeting_serializer = MeetingSerializer(timeline_meeting)
                else:
                    timeline_meeting_serializer = None
                
                # Prepare response data
                course_data['Base'] = base_serializer.data if base_serializer else None
                course_data['timeline'] = timeline_serializer.data
                course_data['meeting'] = meeting_serializer.data
                course_data['askRoom'] = ask_serializer.data
                course_data['timeline_meeting'] = timeline_meeting_serializer.data if timeline_meeting_serializer else None
                course_data['is_author'] = is_author
                
                return Response(course_data, status=status.HTTP_200_OK)
            else:
                return Response({'is_enrolled': False}, status=status.HTTP_404_NOT_FOUND)

 
        except LiveCourse.DoesNotExist:
            return Response({'message': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def create_timeline(request):
    # Check if the user has the necessary permissions to perform this action
    error_response = check_permissions(request)
    if error_response:
        return error_response

    # Create a new Timeline entry using the provided request data
    serializer = TimelineSerializer(data=request.data)
    if serializer.is_valid():
        # Save the new Timeline entry if the data is valid
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    # Return errors if the provided data is not valid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET', 'PUT', 'DELETE'])
def timeline(request, course_id=None, pk=None):
    # Helper function to get the Timeline object based on course_id and pk
    def get_timeline(course_id, pk):
        try:
            return Timeline.objects.get(course__id=course_id, id=pk)
        except Timeline.DoesNotExist:
            return None

    # Handle POST request to create a new Timeline entry
    if request.method == 'POST':
        serializer = TimelineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Handle GET request to retrieve Timeline entries
    if request.method == 'GET':
        if pk is not None:
            # Retrieve a specific Timeline entry by pk
            timeline = get_timeline(course_id, pk)
            if timeline:
                serializer = TimelineSerializer(timeline)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            # Retrieve all Timeline entries for the given course_id
            timelines = Timeline.objects.filter(course__id=course_id)
            serializer = TimelineSerializer(timelines, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Handle PUT request to update an existing Timeline entry
    if request.method == 'PUT':
        try:
            timeline = Timeline.objects.get(id=pk)
        except Timeline.DoesNotExist:
            return Response({'message': 'Timeline does not exist'}, status=status.HTTP_404_NOT_FOUND)

        meeting = request.data.get('meeting')
        serializer = TimelineSerializer(timeline, data=request.data)
        if serializer.is_valid():
            if meeting != '':
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Meeting cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Handle DELETE request to remove a Timeline entry
    if request.method == 'DELETE':
        timeline = get_timeline(course_id, pk)
        if timeline:
            timeline.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def user_Filter(request, id):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response

    try:
        # Retrieve query parameters from the request
        query = request.GET.get('query', '')
        phone = request.GET.get('phone', '')
        start_date = request.GET.get('start_date', '')
        end_date = request.GET.get('end_date', '')
        status = request.GET.get('status', '')

        # Get the LiveCourse instance based on the provided ID
        course = LiveCourse.objects.get(id=id)

        # Filter UserLiveCourse instances based on the course
        users = UserLiveCourse.objects.filter(course__id=course.id)

        # Apply filters based on the query parameters
        if query:
            users = users.filter(student__first_name__icontains=query)
        
        if phone:
            users = users.filter(student__phone__icontains=phone)
        
        if start_date and end_date:
            users = users.filter(date__range=[start_date, end_date])

        if status == '':
            users = users.all()
        elif status:
            users = users.filter(status=status)

        # Serialize the filtered user data
        user_serializer = UserLiveCourseSerializer(users, many=True)

        # Count the number of users
        user_count = users.count()

        # Create a dictionary to hold the serialized user data and user count
        data = {
            'users': user_serializer.data,
            'user_count': user_count
        }

        # Return the data as a response
        return Response(data)
    
    except UserLiveCourse.DoesNotExist:
        # Return an error response if UserLiveCourse instances are not found
        return Response({'error': 'UserLiveCourse not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Return an error response for any other exceptions
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['PUT'])
def UpdateStatus(request, id):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response

    # Get the status value from the request data
    status_value = request.data.get('status')

    try:
        # Retrieve the UserLiveCourse instance based on the provided ID
        user_live_course = UserLiveCourse.objects.get(id=id)
    except UserLiveCourse.DoesNotExist:
        # Return an error response if the UserLiveCourse instance does not exist
        return Response({'error': 'UserLiveCourse instance not found'}, status=status.HTTP_404_NOT_FOUND)

    # Update the status if a status value is provided
    if status_value:
        user_live_course.status = status_value
        user_live_course.save()
        # Return a success response after updating the status
        return Response({'message': 'Status updated successfully'}, status=status.HTTP_200_OK)
    else:
        # Return an error response if the status value is not provided
        return Response({'error': 'Status not provided'}, status=status.HTTP_400_BAD_REQUEST)
 
@api_view(['GET'])
def download_users_data(request, id):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    try:
        # Retrieve the LiveCourse object based on the provided ID
        course = LiveCourse.objects.get(id=id)
        
        # Get the users enrolled in the retrieved live course
        users = UserLiveCourse.objects.filter(course__id=course.id)

        # Create a CSV file response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="enrolled_students.csv"'
        
        # Initialize CSV writer
        writer = csv.writer(response)
        
        # Write the header row of the CSV file
        writer.writerow([
            'Date_joined', 'Last_login', 'Email', 'ID', 
            'Course', 'Date', 'Phone Number', 'First Name', 
            'Last Name', 'Paid', 'Status'
        ])

        # Write each user's data to the CSV file
        for user in users:
            writer.writerow([
                user.student.date_joined, 
                user.student.last_login, 
                user.student.email, 
                user.id, 
                course, 
                user.date, 
                user.student.phone, 
                user.student.first_name, 
                user.student.last_name, 
                user.Paid, 
                user.status
            ])
 
        # Return the CSV file as a response
        return response

    except LiveCourse.DoesNotExist:
        # Return an error response if the LiveCourse does not exist
        return Response({'error': 'Live Course does not exist'}, status=status.HTTP_404_NOT_FOUND)
 

@api_view(['POST', 'GET', 'PUT', 'DELETE'])
def live_course_operations(request, pk=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    if request.method == 'GET':
        if pk:
            try:
                # Retrieve the LiveCourse object
                course = LiveCourse.objects.get(id=pk)
                
                # Retrieve related data
                user = User.objects.filter(user_type='T') 
                student = UserLiveCourse.objects.filter(course__id=pk)     
                courses = Course.objects.all()
                categories = Category.objects.all()
                base = Base.objects.filter(course__id=pk).first()
                meeting = Meeting.objects.filter(course__id=pk)    
                Freq = LiveCourseFrequentlyAsked.objects.filter(course__id=pk)
                rates = LiveCourseRate.objects.filter(course__id=pk)
                review_images = LiveCourseReview.objects.filter(course__id=pk)
                timeline = Timeline.objects.filter(course__id=pk)
                
                # Serialize the retrieved data
                serializer_data = Live_Course_Serializer(course)
                Base_serializer = BasE_Serializer(base)
                instructors_serializer = UserSerializerwithId(user, many=True)
                category_serializer = CategorySerializer(categories, many=True)
                courses_serializer = Course_Serializer(courses, many=True)
                question_serializer = LiveCourseFrequentlyAskedSerializer(Freq, many=True)
                rate_serializer = LiveCourseRate_landing_Serializer(rates, many=True)
                images_serializer = LiveCourseReviewSerializer(review_images, many=True)
                student_serializer = UserLiveCourseSerializer(student, many=True)
                timeline_serializer = Timeline_Serializer(timeline, many=True)
                timeline_meeting_serializer = MeetingSerializer(meeting, many=True) 

                # Combine all serialized data
                data = serializer_data.data
                data['instructors'] = instructors_serializer.data
                data['categories'] = category_serializer.data
                data['courses'] = courses_serializer.data
                data['base'] = Base_serializer.data
                data['questions'] = question_serializer.data
                data['review_images'] = images_serializer.data
                data['rates'] = rate_serializer.data
                data['student'] = student_serializer.data
                data['timeline'] = timeline_serializer.data
                data['meeting'] = timeline_meeting_serializer.data
                
                # Return the combined data as a response
                return Response(data, status=status.HTTP_200_OK)

            except LiveCourse.DoesNotExist:
                return Response({'detail': 'LiveCourse not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'detail': 'LiveCourse not found'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST':
        # Create a new LiveCourse instance
        serializer = Live_Course_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        try:
            # Retrieve the existing LiveCourse object
            course = LiveCourse.objects.get(id=pk)
        except LiveCourse.DoesNotExist:
            return Response({'detail': 'LiveCourse not found'}, status=status.HTTP_404_NOT_FOUND)

        # Update the LiveCourse instance
        serializer = Live_Course_Serializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        try:
            # Retrieve and delete the LiveCourse instance
            course = LiveCourse.objects.get(id=pk)
        except LiveCourse.DoesNotExist:
            return Response({'detail': 'LiveCourse not found'}, status=status.HTTP_404_NOT_FOUND)
        course.delete()
        return Response({'detail': 'LiveCourse deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST', 'PUT', 'DELETE'])
def base_detail(request, pk=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response

    if request.method == 'POST':
        # Create a new Base instance
        serializer = BasE_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Retrieve the existing Base object
        base = Base.objects.get(pk=pk)
    except Base.DoesNotExist:
        return Response({'error': 'Base not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        # Update the existing Base instance
        serializer = BasE_Serializer(base, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        # Delete the Base instance
        base.delete()
        return Response({'message': 'Base deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def create_ask(request):
    # Add the ID of the currently authenticated user (student) to the request data
    request.data['student'] = request.user.id

    # Extract the content of the ask from the request data
    content = request.data.get('content')

    # Check if the content is not empty
    if content != '':
        # Create an instance of the serializer with the modified data
        serializer = AskSerializer(data=request.data)

        # Validate and save the serializer data if it is valid
        if serializer.is_valid():
            serializer.save()
            # Return a 201 Created response with the serialized data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return a 400 Bad Request response if the serializer is not valid
            return Response({'error': 'Failed to create ask'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Return a 400 Bad Request response if the content is empty
        return Response({'error': 'Content cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_ask(request, pk):
    # Get the ID of the currently authenticated user (teacher)
    teacher = request.user.id

    try:
        # Attempt to retrieve the 'Ask' object by its primary key (pk)
        ask = Ask.objects.get(id=pk)
    except Ask.DoesNotExist:
        # Return a 404 Not Found response if the 'Ask' object does not exist
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Check if the currently authenticated user is the student who created the 'Ask'
    if teacher == ask.student.id:
        # If authorized, delete the 'Ask' and return a 204 No Content response
        ask.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        # Return a 403 Forbidden response if the user does not have permission to delete the 'Ask'
        return Response({'error': 'You do not have permission to delete this ask.'}, status=status.HTTP_403_FORBIDDEN)
    

@api_view(['POST'])
def create_reply(request):
    # Add the ID of the currently authenticated user (teacher) to the request data
    request.data['Teacher'] = request.user.id

    # Extract the content of the reply from the request data
    content = request.data.get('content')

    # Check if the content is not empty
    if content != '':
        # Create an instance of the serializer with the modified data
        serializer = AnswrSerializer(data=request.data)

        # Validate and save the serializer data if it is valid
        if serializer.is_valid():
            serializer.save()
            # Return a 201 Created response with the serialized data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return a 400 Bad Request response if the serializer is not valid
            return Response({'error': 'Failed to create reply'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Return a 400 Bad Request response if the content is empty
        return Response({'error': 'Content cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)
 




@api_view(['DELETE'])
def delete_reply(request, pk):
    # Get the ID of the currently authenticated user (teacher)
    Teacher = request.user.id

    try:
        # Attempt to retrieve the answer object by its primary key (pk)
        answr = Answr.objects.get(id=pk)
    except Answr.DoesNotExist:
        # Return a 404 Not Found response if the answer does not exist
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Check if the currently authenticated user is the teacher who authored the answer
    if Teacher == answr.Teacher.id:
        # If authorized, delete the answer and return a 204 No Content response
        answr.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        # Return a 403 Forbidden response if the user does not have permission to delete the answer
        return Response({'error': 'You do not have permission to delete this reply.'}, status=status.HTTP_403_FORBIDDEN)
 
@api_view(['PUT'])
def UpdateLiveCourseRoom(request):
    # Check if the user is authenticated
    if request.user.is_authenticated:
        user = request.user
    else:
        # Return a 200 OK status with no content if the user is not authenticated
        return Response(status=status.HTTP_200_OK)

    data = request.data
    # Validate that all required fields are present in the request data
    if 'course_id' not in data or 'Base_id' not in data or 'meeting_id' not in data or 'join_meeting_link' not in data or 'timeline' not in data:
        return Response({'error': 'Required fields are missing'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Convert fields to appropriate data types
        course_id = int(data['course_id'])
        Base_id = int(data['Base_id'])
        meeting_id = int(data['meeting_id'])
        join_meeting_link = data['join_meeting_link']
        timeline_id = int(data['timeline'])
    except (KeyError, ValueError):
        # Return an error response if the data format is invalid
        return Response({'error': 'Invalid data format'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Retrieve the LiveCourse object
        course = LiveCourse.objects.get(id=course_id)

        # Check if the authenticated user is the author of the course
        if request.user == course.author:
            # Update the Base instance's timeline
            base = Base.objects.get(id=Base_id, course__id=course_id)
            base.timeline = Timeline.objects.get(id=timeline_id)
            base.save()

            # Update the Meeting instance's join_meeting_link
            meeting = Meeting.objects.get(id=meeting_id, course__id=course_id)
            meeting.join_meeting_link = join_meeting_link
            meeting.save()

            # Return a 201 Created status to indicate successful update
            return Response(status=status.HTTP_201_CREATED)
        else:
            # Return a 403 Forbidden status if the user is not authorized to perform the update
            return Response({'error': 'You are not authorized to perform this action'}, status=status.HTTP_403_FORBIDDEN)
    except Exception as e:
        # Return a 500 Internal Server Error status for any other exceptions
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 
 

@api_view(['GET'])
def LiveCourseRateList(request, id):
    # Check if the user is authenticated
    if not request.user.is_authenticated:
        # Return a proper response if the user is not authenticated
        return Response({' not authenticated'} ,status=status.HTTP_404_NOT_FOUND)
    # Check if the user is enrolled in the course
    user_live = UserLiveCourse.objects.filter(student=request.user, course_id=id).first()
    if user_live:
       # Retrieve the LiveCourse object corresponding to the given ID
       course = LiveCourse.objects.get(id=id)
       # Retrieve LiveCourseRate objects associated with the course
       live_course_rates = LiveCourseRate.objects.filter(course=course)
       rate = live_course_rates.all().order_by('?')
       # Serialize the queryset of LiveCourseRate objects
       serializer = LiveCourseRateSerializer(rate, many=True)
       # Retrieve the serialized data
       serialized_data = serializer.data
       data = {'serialized_data': serialized_data, 'Student': True}

    # Return the serialized data in the response with the appropriate status code
       return Response( data, status=status.HTTP_200_OK)
    else:
      return Response({'Rate not fuend' }, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_LiveCourseRate(request):
    if not request.user.is_authenticated:
        # Return a proper response if the user is not authenticated
        return Response({'Student': False}, status=status.HTTP_200_OK)
    # Get the data from the request
    data = request.data
    # Add the authenticated user as the student
    request.data['student'] = request.user.id
    # Get the message from the data
    message = data.get('message', '')
    if message != '':
        # Create an instance of the serializer with the provided data
        serializer = student_LiveCourseRate_Serializer(data=request.data)
        # Check if the serializer is valid
        if serializer.is_valid():
            # Save the serializer instance
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return error response if serializer is not valid
            return Response({'error': 'Failed to create Rate'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Return error response if message is empty
        return Response({'error': 'Content cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)

 
@api_view(['GET'])
def live_course_coupon_codes(request, id):
     # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response
    try:
        # Get all coupon codes related to the specified course ID
        coupon_codes = LiveCourseCouponCode.objects.filter(course_id=id)
        serializer = LiveCourseCouponCodeSerializer(coupon_codes, many=True)
        return Response(serializer.data)
    except LiveCourseCouponCode.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def live_course_coupon_codes_create(request):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    try:
        # Initialize the serializer with the request data
        serializer = LiveCourseCouponCodeSerializer(data=request.data)
        # Validate the serialized data
        if serializer.is_valid():
            # Save the coupon code and associate it with the course
            serializer.save()
            # Return the created coupon code with a 201 Created status
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return validation errors with a 400 Bad Request status
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except LiveCourse.DoesNotExist:
        # Return an error message with a 404 Not Found status if the course does not exist
        return Response({'error': 'Course does not exist'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Return a 500 Internal Server Error status for any other exceptions
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def live_course_coupon_codes_delete(request, id):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    try:
        # Attempt to retrieve the LiveCourseCouponCode object by its ID
        coupon_code = LiveCourseCouponCode.objects.get(id=id)
        # Delete the coupon code object
        coupon_code.delete()
        # Return a 204 No Content status to indicate successful deletion
        return Response(status=status.HTTP_204_NO_CONTENT)
    except LiveCourseCouponCode.DoesNotExist:
        # Return a 404 Not Found status if the coupon code does not exist
        return Response({'error': 'Coupon code does not exist'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Return a 500 Internal Server Error status for any other exceptions
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST', 'PUT', 'DELETE'])
def course_definition_detail(request, pk=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    # Handle POST request to create a new CourseDefinition
    if request.method == 'POST':
        # Extract base ID from request data
        base_id = request.data.get('base')
        if base_id:
            try:
                # Retrieve the Base object using the provided base_id
                base = Base.objects.get(id=base_id)
                # Initialize the serializer with request data
                serializer = CourseDefinitionSerializer(data=request.data)
                if serializer.is_valid():
                    # Save the serialized CourseDefinition object
                    course_definition = serializer.save()
                    # Update the Base instance with the new course_definition
                    base.definition.add(course_definition)
                    base.save()
                    # Return the created object with a 201 Created status
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                # Return errors with a 400 Bad Request status if validation fails
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Base.DoesNotExist:
                # Return an error message with a 404 Not Found status if the Base is not found
                return Response({"error": "Base not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error message with a 400 Bad Request status if no base_id is provided
            return Response({"error": "No base_id provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Handle PUT request to update an existing CourseDefinition
    elif request.method == 'PUT':
        try:
            # Retrieve the CourseDefinition object using the provided pk
            course_definition = CourseDefinition.objects.get(pk=pk)
            # Initialize the serializer with the existing object and request data
            serializer = CourseDefinitionSerializer(course_definition, data=request.data)
            if serializer.is_valid():
                # Save the updated data
                serializer.save()
                # Return the updated object
                return Response(serializer.data)
            # Return errors with a 400 Bad Request status if validation fails
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except CourseDefinition.DoesNotExist:
            # Return an error message with a 404 Not Found status if the CourseDefinition is not found
            return Response({"error": "Course definition not found"}, status=status.HTTP_404_NOT_FOUND)

    # Handle DELETE request to remove an existing CourseDefinition
    elif request.method == 'DELETE':
        try:
            # Retrieve the CourseDefinition object using the provided pk
            course_definition = CourseDefinition.objects.get(pk=pk)
            # Delete the CourseDefinition object
            course_definition.delete()
            # Return no content with a 204 No Content status on successful deletion
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CourseDefinition.DoesNotExist:
            # Return an error message with a 404 Not Found status if the CourseDefinition is not found
            return Response({"error": "Course definition not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST', 'PUT', 'DELETE'])
def point_list(request, pk=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    # Handle POST request to create a new Point
    if request.method == 'POST':
        # Extract Point ID from request data
        Point_id = request.data.get('Point')
        if Point_id:
            try:
                # Retrieve the LearningPathPoint object using the provided Point_id
                learning_Path = LearningPathPoint.objects.get(id=Point_id)
                # Initialize the serializer with request data
                serializer = PointSerializer(data=request.data)
                if serializer.is_valid():
                    # Save the serialized Point object
                    Point_serializer = serializer.save()
                    # Add the new Point to the LearningPathPoint's point set
                    learning_Path.point.add(Point_serializer)
                    learning_Path.save()
                    # Return the created object with a 201 Created status
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                # Return errors with a 400 Bad Request status if validation fails
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except LearningPathPoint.DoesNotExist:
                # Return an error message with a 404 Not Found status if the LearningPathPoint is not found
                return Response({"error": "LearningPathPoint not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error message with a 400 Bad Request status if no Point_id is provided
            return Response({"error": "No Point_id provided"}, status=status.HTTP_400_BAD_REQUEST)
  
    # Handle PUT request to update an existing Point
    elif request.method == 'PUT':
        if pk is not None:
            try:
                # Retrieve the Point object using the provided pk
                point = Point.objects.get(pk=pk)
                # Initialize the serializer with the existing object and request data
                serializer = PointSerializer(point, data=request.data)
                if serializer.is_valid():
                    # Save the updated data
                    serializer.save()
                    # Return the updated object
                    return Response(serializer.data)
                # Return errors with a 400 Bad Request status if validation fails
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Point.DoesNotExist:
                # Return an error message with a 404 Not Found status if the Point is not found
                return Response({"error": "Point not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error message with a 400 Bad Request status if no ID is provided
            return Response({"error": "No Point ID provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Handle DELETE request to remove an existing Point
    elif request.method == 'DELETE':
        if pk is not None:
            try:
                # Retrieve the Point object using the provided pk
                point = Point.objects.get(pk=pk)
                # Delete the Point object
                point.delete()
                # Return no content with a 204 No Content status on successful deletion
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Point.DoesNotExist:
                # Return an error message with a 404 Not Found status if the Point is not found
                return Response({"error": "Point not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error message with a 400 Bad Request status if no ID is provided
            return Response({"error": "No Point ID provided"}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST', 'PUT', 'DELETE'])
def learning_path_point_list(request, pk=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    # Handle POST request to create a new LearningPathPoint
    if request.method == 'POST':
        # Extract base ID from request data
        base_id = request.data.get('base')
        if base_id:
            try:
                # Retrieve the Base object using the provided base_id
                base = Base.objects.get(id=base_id)
                # Initialize the serializer with request data
                serializer = LearningPathPointSerializer(data=request.data)
                if serializer.is_valid():
                    # Save the serialized LearningPathPoint object
                    learning_Path = serializer.save()
                    # Add the new LearningPathPoint to the Base's learning_Path set
                    base.learning_Path.add(learning_Path)
                    base.save()
                    # Return the created object with a 201 Created status
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                # Return errors with a 400 Bad Request status if validation fails
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Base.DoesNotExist:
                # Return an error message with a 404 Not Found status if the Base object is not found
                return Response({"error": "Base not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error message with a 400 Bad Request status if no base_id is provided
            return Response({"error": "No base_id provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Handle PUT request to update an existing LearningPathPoint
    elif request.method == 'PUT':
        if pk:
            try:
                # Retrieve the LearningPathPoint object using the provided pk
                learning_path_point = LearningPathPoint.objects.get(pk=pk)
                # Initialize the serializer with the existing object and request data
                serializer = LearningPathPointSerializer(learning_path_point, data=request.data)
                if serializer.is_valid():
                    # Save the updated data
                    serializer.save()
                    # Return the updated object
                    return Response(serializer.data)
                # Return errors with a 400 Bad Request status if validation fails
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except LearningPathPoint.DoesNotExist:
                # Return an error message with a 404 Not Found status if the object is not found
                return Response({"error": "LearningPathPoint not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error message with a 400 Bad Request status if no ID is provided
            return Response({"error": "No LearningPathPoint ID provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Handle DELETE request to remove an existing LearningPathPoint
    elif request.method == 'DELETE':
        if pk:
            try:
                # Retrieve the LearningPathPoint object using the provided pk
                learning_path_point = LearningPathPoint.objects.get(pk=pk)
                # Delete the LearningPathPoint object
                learning_path_point.delete()
                # Return no content with a 204 No Content status on successful deletion
                return Response(status=status.HTTP_204_NO_CONTENT)
            except LearningPathPoint.DoesNotExist:
                # Return an error message with a 404 Not Found status if the object is not found
                return Response({"error": "LearningPathPoint not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error message with a 400 Bad Request status if no ID is provided
            return Response({"error": "No LearningPathPoint ID provided"}, status=status.HTTP_400_BAD_REQUEST)










@api_view(['POST', 'PUT', 'DELETE'])
def live_course_faq_list(request, pk=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    # Handle POST request to create a new LiveCourseFrequentlyAsked entry
    if request.method == 'POST':
        # Initialize the serializer with request data
        serializer = LiveCourseFrequentlyAskedSerializer(data=request.data)
        if serializer.is_valid():
            # Save the validated data
            serializer.save()
            # Return the created object with a 201 Created status
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Return errors with a 400 Bad Request status if validation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Handle PUT request to update an existing LiveCourseFrequentlyAsked entry
    elif request.method == 'PUT':
        try:
            # Retrieve the LiveCourseFrequentlyAsked object using the provided pk
            live_course_faq = LiveCourseFrequentlyAsked.objects.get(pk=pk)
            # Initialize the serializer with the existing object and request data
            serializer = LiveCourseFrequentlyAskedSerializer(live_course_faq, data=request.data)
            if serializer.is_valid():
                # Save the updated data
                serializer.save()
                # Return the updated object
                return Response(serializer.data)
            # Return errors with a 400 Bad Request status if validation fails
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except LiveCourseFrequentlyAsked.DoesNotExist:
            # Return an error message with a 404 Not Found status if the object is not found
            return Response({"error": "LiveCourseFrequentlyAsked not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # Handle DELETE request to remove an existing LiveCourseFrequentlyAsked entry
    elif request.method == 'DELETE':
        if pk:
            try:
                # Retrieve the LiveCourseFrequentlyAsked object using the provided pk
                live_course_faq = LiveCourseFrequentlyAsked.objects.get(pk=pk)
                # Delete the LiveCourseFrequentlyAsked object
                live_course_faq.delete()
                # Return no content with a 204 No Content status on successful deletion
                return Response(status=status.HTTP_204_NO_CONTENT)
            except LiveCourseFrequentlyAsked.DoesNotExist:
                # Return an error message with a 404 Not Found status if the object is not found
                return Response({"error": "LiveCourseFrequentlyAsked not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error message with a 400 Bad Request status if no ID is provided
            return Response({"error": "No LiveCourseFrequentlyAsked ID provided"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', 'DELETE'])
def live_course_review_list(request, pk=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    # Handle POST request to create a new LiveCourseReview
    if request.method == 'POST':
        # Initialize the serializer with request data
        serializer = LiveCourseReviewSerializer(data=request.data)
        if serializer.is_valid():
            # Save the validated data
            serializer.save()
            # Return the created object with a 201 Created status
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Return errors with a 400 Bad Request status if validation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Handle DELETE request to remove an existing LiveCourseReview
    elif request.method == 'DELETE':
        if pk:
            try:
                # Retrieve the LiveCourseReview object using the provided pk
                live_course_review = LiveCourseReview.objects.get(pk=pk)
                # Delete the LiveCourseReview object
                live_course_review.delete()
                # Return no content with a 204 No Content status on successful deletion
                return Response(status=status.HTTP_204_NO_CONTENT)
            except LiveCourseReview.DoesNotExist:
                # Return an error message with a 404 Not Found status if the object is not found
                return Response({"error": "LiveCourseReview not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error message with a 400 Bad Request status if no ID is provided
            return Response({"error": "No LiveCourseReview ID provided"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', 'DELETE'])
def speaker_list(request, pk=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    # Handle POST request to create a new Speaker
    if request.method == 'POST':
        # Extract base ID from the request data
        base_id = request.data.get('base')
        if base_id:
            try:
                # Retrieve the Base object using the provided base_id
                base = Base.objects.get(id=base_id)
                # Validate and serialize the data for the Speaker
                serializer = Speaker_Serializer(data=request.data)
                if serializer.is_valid():
                    # Save the serialized Speaker object
                    speaker_ser = serializer.save()
                    # Add the new Speaker to the Base's speaker set
                    base.speaker.add(speaker_ser)
                    base.save()
                    # Return the created Speaker data with a 201 Created status
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                # Return serializer errors with a 400 Bad Request status if validation fails
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Base.DoesNotExist:
                # Return an error message with a 404 Not Found status if the Base object is not found
                return Response({"error": "Base not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error message with a 400 Bad Request status if no base_id is provided
            return Response({"error": "No base_id provided"}, status=status.HTTP_400_BAD_REQUEST)
 
    # Handle DELETE request to remove an existing Speaker
    elif request.method == 'DELETE':
        if pk:
            try:
                # Retrieve the Speaker object using the provided pk
                speaker = Speaker.objects.get(pk=pk)
                # Delete the Speaker object
                speaker.delete()
                # Return no content with a 204 No Content status on successful deletion
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Speaker.DoesNotExist:
                # Return an error message with a 404 Not Found status if the Speaker object is not found
                return Response({"error": "Speaker not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error message with a 400 Bad Request status if no Speaker ID is provided
            return Response({"error": "No Speaker ID provided"}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST', 'DELETE'])
def live_course_rate_list(request, pk=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response    
    
    # Handle POST request to create a new LiveCourseRate
    if request.method == 'POST':
        serializer = student_LiveCourseRate_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Return the created object with a 201 Created status
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Return errors with a 400 Bad Request status if the serializer is not valid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Handle DELETE request to remove an existing LiveCourseRate
    elif request.method == 'DELETE':
        if pk:
            try:
                live_course_rate = LiveCourseRate.objects.get(pk=pk)
                live_course_rate.delete()
                # Return no content with a 204 No Content status on successful deletion
                return Response(status=status.HTTP_204_NO_CONTENT)
            except LiveCourseRate.DoesNotExist:
                # Return an error message with a 404 Not Found status if the object does not exist
                return Response({"error": "LiveCourseRate not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return an error message with a 400 Bad Request status if no ID is provided
            return Response({"error": "No LiveCourseRate ID provided"}, status=status.HTTP_400_BAD_REQUEST)