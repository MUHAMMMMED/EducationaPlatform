 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count
from uuid import UUID
from django.http import HttpResponse
import csv
from .models import *
from .serializers import *
from accounts.serializers import UserSerializerwithId
from Quiz.models import Exam
from Quiz.serializers import ExamSerializer
from Quiz.serializers import Question_categorySerializer
from Quiz.models import Question,Question_category


def check_permissions(request):
    """
    Check if the user is authenticated and has permission to access the data.
    """
    if not request.user.is_authenticated:
        return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

    if request.user.user_type != 'M':  # Assuming 'M' represents the Manager user type
        return Response({'error': 'You do not have permission to access this data.'}, status=status.HTTP_403_FORBIDDEN)
    
    return None  # No error, user is authenticated and has permission
  
 
# Create a view function to filter courses based on a query parameter
@api_view(['GET'])
def Course_Filter(request):
    # Retrieve the 'query' parameter from the GET request. Default to an empty string if not provided.
    query = request.GET.get('query', '')

    # Check if the query parameter is empty
    if query == '':
        # If no query parameter is provided, filter for all active courses
        courses = Course.objects.filter(active=True)
    else:
        # If a query parameter is provided, filter active courses based on case-insensitive title match
        courses = Course.objects.filter(active=True, title__icontains=query)

    # Serialize the filtered course objects into JSON format
    course_serializer = CourseSerializer(courses, many=True)

    # Return the serialized course data with a 200 OK HTTP status
    return Response(course_serializer.data, status=status.HTTP_200_OK)

 
 
@api_view(['GET'])
def  Course_pay(request, course_uuid):
 
    try:
        # Fetch the course object using the provided course ID
        course = Course.objects.get(course_uuid=course_uuid)
        
        # Serialize course data
        course_serializer = Course_Serializer(course)
        course_data = course_serializer.data
        
        # Return JSON response
        return Response({'course': course_data})
        
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=404)
  
@api_view(['GET'])
def CourseDetail(request, course_uuid):
        # Check if the user is authenticated
        if request.user.is_authenticated:
            user = request.user
            user_courses = UserCourse.objects.filter(student=user, course__course_uuid=course_uuid).last()
            # Check if user courses exist for the given course UUID
            if user_courses and user_courses.status == 'E':
             is_enrolled = True
            else:
             is_enrolled = False
        else:
            is_enrolled = 'login'

        try:
            # Fetch the course object using the provided course_uuid
            course = Course.objects.get(course_uuid=course_uuid)
            active = course.active

            if active:  # Check if the course is active
              # Get the specific course instance
                course = Course.objects.get(course_uuid=course_uuid)
                # Annotate each section with the count of episodes
                sections = course.course_sections.annotate(num_episodes=Count('episodes'))
                # Calculate the total number of episodes across all sections
                total_episodes_count = sum(section.num_episodes for section in sections)

                # Fetch rates related to the course with the provided course_uuid
                rates = Rate.objects.filter(course__course_uuid=course_uuid)
                rate = rates.all().order_by('?')
                instructors = Instructors.objects.filter(course__course_uuid=course_uuid)
 
                # Fetch questions related to the course with the provided course_uuid
                questions = FrequentlyAsked.objects.filter(course__course_uuid=course_uuid)

                # Fetch review images related to the course with the provided course_uuid
                course_review_images = Review.objects.filter(course__course_uuid=course_uuid)
                course_review = course_review_images.all().order_by('?')

                # Serialize the course, rates, review images, and questions
                course_serializer = CourseSerializer(course)
                rate_serializer = RateSerializerList(rate, many=True)
                images_serializer = ReviewSerializer(course_review, many=True)
                question_serializer = FrequentlyAskedSerializer(questions, many=True)
                instructors_serializer = InstructorsSerializer(instructors, many=True)
                # Combine the serialized data into course_data
                course_data = course_serializer.data
                course_data['is_enrolled'] = is_enrolled
                course_data['instructors'] = instructors_serializer.data
                course_data['rates'] = rate_serializer.data
                course_data['review_images'] = images_serializer.data
                course_data['questions'] = question_serializer.data
                course_data['TotalEpisodes'] = total_episodes_count
                course.views+= 1
                course.save()
                # Return the combined data as a response
                return Response(course_data, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'The course is not available'}, status=status.HTTP_404_NOT_FOUND)
 
        except Course.DoesNotExist:
           return Response({'message': 'The course is not available'}, status=status.HTTP_404_NOT_FOUND)
 

 

 
# Create a view function to retrieve episode details based on course and episode UUIDs
@api_view(['GET'])
def episode_detail(request, course_uuid, episode_uuid):
    # Check if the user is authenticated
    if request.user.is_authenticated:
        user = request.user
        # Get the last enrollment for the user in the specified course
        user_courses = UserCourse.objects.filter(student=user, course__course_uuid=course_uuid).last()
        # Check if the user is enrolled in the course and the enrollment status is 'E' (enrolled)
        if user_courses and user_courses.status == 'E':
            is_enrolled = True
        else:
            is_enrolled = False
    else:
        # If the user is not authenticated, set enrollment status to 'login'
        is_enrolled = 'login'

    # Retrieve the episode object based on the provided episode UUID
    episode = Episode.objects.get(episode_uuid=episode_uuid)
    # Retrieve the course object based on the provided course UUID
    course = Course.objects.get(course_uuid=course_uuid)
    # Get the serial number of the current episode
    current_serial_number = episode.serial_number

    # Fetch rates related to the course with the provided course UUID, ordered by most recent
    rates = Rate.objects.filter(course__course_uuid=course_uuid).order_by('-created')
    # Serialize the fetched rates data
    rate_serializer = RateSerializerList(rates, many=True)

    # Retrieve all sections of the course
    sections = course.course_sections.all()
    # Initialize an empty list to store sorted episodes
    sorted_episodes = []
    # Loop through each section and add its episodes to the sorted_episodes list, ordered by serial number
    for section in sections:
        sorted_episodes.extend(section.episodes.all().order_by('serial_number'))

    # Create a list of episode UUIDs for easy navigation
    episode_uuids = [ep.episode_uuid for ep in sorted_episodes]
    # Get the previous episode UUID, if available
    previous_uuid = episode_uuids[current_serial_number - 2] if current_serial_number > 1 else None
    # Get the next episode UUID, if available
    next_uuid = episode_uuids[current_serial_number] if current_serial_number < len(episode_uuids) else None

    # Retrieve the previous episode object, if it exists
    previous_serial = Episode.objects.filter(episode_uuid=previous_uuid).first()
    # Retrieve the next episode object, if it exists
    next_serial = Episode.objects.filter(episode_uuid=next_uuid).first()

    # Create a list to store the previous and next episode UUIDs for navigation
    serial_numbers = [
        {'previous_serial': previous_serial.episode_uuid if previous_serial else episode.episode_uuid},
        {'next_serial': next_serial.episode_uuid if next_serial else episode.episode_uuid}
    ]
    # Get the total count of episodes in the course
    episodes_count = len(episode_uuids)

    # Check if the user is enrolled in the course
    if user_courses and user_courses.status == 'E':
        # User is enrolled in the course
        is_enrolled = True
        # Serialize course and episode data
        course_serializer = CourseEpisodeSerializer(course)
        serializer = EpisodeSerializer(episode)
        # Add additional data to the serialized episode data
        data = serializer.data
        data['is_enrolled'] = is_enrolled
        data['Course'] = course_serializer.data
        data['Serial'] = serial_numbers
        data['episodes_count'] = episodes_count
        data['rates'] = rate_serializer.data

        # Return the response with the episode details and a 200 OK status
        return Response(data, status=status.HTTP_200_OK)

    # If the episode is marked as a preview
    elif episode.is_preview:
        # Episode is a preview, so the user is not enrolled
        is_enrolled = False
        # Serialize episode data
        serializer = EpisodeSerializer(episode)
        data = serializer.data
        data['Course'] = CourseEpisodeSerializer(course).data
        data['is_enrolled'] = is_enrolled
        data['Serial'] = None  # No serial data for preview
        data['episodes_count'] = episodes_count

        # Return the response with the preview episode details and a 200 OK status
        return Response(data, status=status.HTTP_200_OK)

    # If the episode is not a preview and the user is not enrolled
    elif episode.is_preview == False:
        # Return a response indicating the episode is unavailable or requires course purchase
        return Response({'message':'The lesson is currently unavailable, or it requires purchasing the course to access all the content.'}, status=status.HTTP_404_NOT_FOUND)
                

 
# Define an API view to fetch the next episode based on the current episode's UUID
@api_view(['GET'])
def NextEpisode(request, episode_uuid):
    try:
        # Get the current episode using the provided episode UUID
        current_episode = Episode.objects.get(episode_uuid=episode_uuid)
        # Retrieve the serial number of the current episode
        serial_number = current_episode.serial_number
        # Fetch the next episode by finding the one with the serial number greater than the current episode's
        next_episode = Episode.objects.filter(serial_number__gt=serial_number).order_by('serial_number').first()
        
        if next_episode:
            # If a next episode is found, prepare the response data with the next episode's UUID
            data = {'episode_uuid': next_episode.episode_uuid}
            # Return a response with the next episode data and a 200 OK status
            return Response(data, status=status.HTTP_200_OK)
        else:
            # If no next episode is found, return a message indicating the lesson is unavailable or requires purchase
            return Response({'message': 'The lesson is currently unavailable, or it requires purchasing the course to access all the content.'}, status=status.HTTP_404_NOT_FOUND)
    except Episode.DoesNotExist:
        # If the current episode does not exist, return a message indicating the lesson is unavailable or requires purchase
        return Response({'message': 'The lesson is currently unavailable, or it requires purchasing the course to access all the content.'}, status=status.HTTP_404_NOT_FOUND)
    
 
# Define an API view to handle the submission of ratings for a course
@api_view(['POST'])
def submit_rating(request):
    # Check if the user is authenticated
    if request.user.is_authenticated:
        user = request.user  # Get the authenticated user
        course_id = request.data.get('course')  # Get the course ID from the request data
        
        try:
            # Retrieve the course object based on the provided course UUID
            course = Course.objects.get(course_uuid=course_id)
        except Course.DoesNotExist:
            # Return a 404 response if the course does not exist
            return Response({'message': 'The lesson is currently unavailable, or it requires purchasing the course to access all the content.'}, status=status.HTTP_404_NOT_FOUND)
        
        data = request.data  # Get the data from the request
        data['student'] = user.id  # Add the user's ID to the data
        data['course'] = course.id  # Add the course's ID to the data
        
        # Initialize the serializer with the request data
        serializer = RateSerializer(data=data)
        
        # Check if the serializer data is valid
        if serializer.is_valid():
            serializer.save()  # Save the valid data to create a new rating
            # Return a response with the serialized data and a 201 Created status
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return a response with the serializer errors and a 400 Bad Request status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Return a response indicating that the user is not authenticated
        return Response({'message': 'User is not authenticated'}, status=status.HTTP_400_BAD_REQUEST)




 
 
# Define an API view to handle GET and POST requests for course listing and creation
@api_view(['GET', 'POST'])
def course_list(request):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response    

    # Handle GET request: Retrieve and return all courses
    if request.method == 'GET':
        courses = Course.objects.all()  # Get all course objects from the database
        serializer = Course_Serializer(courses, many=True)  # Serialize the course objects
        return Response(serializer.data)  # Return the serialized data

    # Handle POST request: Create a new course
    elif request.method == 'POST':
        serializer = Course_Serializer(data=request.data)  # Initialize the serializer with request data
        if serializer.is_valid():
            serializer.save()  # Save the valid data to create a new course
            # Return a response with the serialized data and a 201 Created status
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Return a response with the serializer errors and a 400 Bad Request status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

 
# Define an API view to handle GET, PUT, and DELETE requests for course detail operations
@api_view(['GET', 'PUT', 'DELETE'])
def course_detail_update(request, id):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response

    try:
        # Attempt to retrieve the course object based on the provided course ID
        course = Course.objects.get(id=id)
    except Course.DoesNotExist:
        # Return a 404 response if the course does not exist
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Handle GET request: Retrieve and return detailed information about the course
    if request.method == 'GET':
        # Retrieve related data for the course
        user = User.objects.filter(user_type='T')  # Teachers
        categories = Category.objects.all()
        exam = Exam.objects.all()
        quiz = EpisodeQuiz.objects.filter(course__id=id)
        freq = FrequentlyAsked.objects.filter(course__id=id)
        freq_count = freq.count()
        review = Review.objects.filter(course__id=id)
        review_count = review.count()
        rates = Rate.objects.filter(course__id=id)
        rates_count = rates.count()
        user_courses = UserCourse.objects.filter(course__id=id)
        instructors = Instructors.objects.filter(course__id=id)
        instructors_count = instructors.count()

        # Serialize the related data
        course_serializer = CourseSerializer_all(course)
        user_serializer = UserSerializerwithId(user, many=True)
        rate_serializer = RateSerializerList(rates, many=True)
        review_serializer = ReviewSerializer(review, many=True)
        freq_serializer = FrequentlyAskedSerializer(freq, many=True)
        instructors_serializer = InstructorsSerializer(instructors, many=True)
        category_serializer = CategorySerializer(categories, many=True)
        exam_serializer = ExamSerializer(exam, many=True)
        student_serializer = UserCourse_Serializer(user_courses, many=True)
        quiz_serializer = EpisodeQuizSerializer(quiz, many=True)

        # Prepare the response data with serialized information
        data = course_serializer.data
        data['instructors'] = instructors_serializer.data
        data['categories'] = category_serializer.data
        data['review'] = review_serializer.data
        data['freq'] = freq_serializer.data
        data['rate'] = rate_serializer.data
        data['user'] = user_serializer.data
        data['Exam'] = exam_serializer.data
        data['student'] = student_serializer.data
        data['EpisodeQuiz'] = quiz_serializer.data
        data['freq_count'] = freq_count
        data['rates_count'] = rates_count
        data['review_count'] = review_count
        data['instructors_count'] = instructors_count

        # Return the response with a 200 OK status
        return Response(data, status=status.HTTP_200_OK)

    # Handle PUT request: Update the course details
    elif request.method == 'PUT':
        # Retrieve the existing course_sections
        existing_course_sections = list(course.course_sections.all())

        # Exclude the 'course_sections' field from the request data
        request_data = request.data.copy()
        request_data.pop('course_sections', None)

        # Initialize the serializer with the course instance and the updated data
        serializer = Course_Serializer(course, data=request_data, partial=True)
        if serializer.is_valid():
            # Save the updated course data
            serializer.save()

            # Reassign the existing 'course_sections' back to the course
            course.course_sections.set(existing_course_sections)

            # Return the updated serialized data
            return Response(serializer.data)

        # Return a response with the serializer errors and a 400 Bad Request status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Handle DELETE request: Delete the course
    elif request.method == 'DELETE':
        course.delete()  # Delete the course instance
        return Response(status=status.HTTP_204_NO_CONTENT)  # Return a 204 No Content status
    
 
# Define an API view to handle POST, PUT, and DELETE requests for frequently asked questions (FAQs)
@api_view(['POST', 'PUT', 'DELETE'])
def faq_list(request, id=None):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response

    # Handle POST request: Create a new FAQ
    if request.method == 'POST':
        # Initialize the serializer with the request data
        serializer = FrequentlyAskedSerializer(data=request.data)
        if serializer.is_valid():
            # Save the new FAQ and return the serialized data with a 201 Created status
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Return a response with the serializer errors and a 400 Bad Request status if validation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Handle PUT request: Update an existing FAQ
    elif request.method == 'PUT':
        if id:
            try:
                # Retrieve the FAQ object based on the provided ID
                faq = FrequentlyAsked.objects.get(id=id)

                # Initialize the serializer with the existing FAQ and the updated data
                serializer = FrequentlyAskedSerializer(faq, data=request.data)
                if serializer.is_valid():
                    # Save the updated FAQ and return the serialized data
                    serializer.save()
                    return Response(serializer.data)
                # Return a response with the serializer errors and a 400 Bad Request status if validation fails
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except FrequentlyAsked.DoesNotExist:
                # Return a 404 Not Found response if the FAQ does not exist
                return Response({"message": "FrequentlyAsked not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request response if no FAQ ID was provided
            return Response({"message": "No FrequentlyAsked ID provided"}, status=status.HTTP_400_BAD_REQUEST)
   
    # Handle DELETE request: Delete an existing FAQ
    elif request.method == 'DELETE':
        if id:
            try:
                # Retrieve the FAQ object based on the provided ID
                faq = FrequentlyAsked.objects.get(id=id)
                # Delete the FAQ and return a 204 No Content status
                faq.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except FrequentlyAsked.DoesNotExist:
                # Return a 404 Not Found response if the FAQ does not exist
                return Response({"message": "FrequentlyAsked not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request response if no FAQ ID was provided
            return Response({"message": "No FrequentlyAsked ID provided"}, status=status.HTTP_400_BAD_REQUEST)

 
 

# Define an API view to handle POST and DELETE requests for reviews
@api_view(['POST', 'DELETE'])
def review_list(request, id=None):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response

    # Handle POST request: Create a new review
    if request.method == 'POST':
        # Initialize the serializer with the request data
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            # Save the new review and return the serialized data with a 201 Created status
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Return a response with the serializer errors and a 400 Bad Request status if validation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Handle DELETE request: Delete an existing review
    elif request.method == 'DELETE':
        if id:
            try:
                # Retrieve the review object based on the provided ID
                live_course_review = Review.objects.get(id=id)
                # Delete the review and return a 204 No Content status
                live_course_review.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Review.DoesNotExist:
                # Return a 404 Not Found response if the review does not exist
                return Response({"error": "Review not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request response if no review ID was provided
            return Response({"error": "No Review ID provided"}, status=status.HTTP_400_BAD_REQUEST)
 
 
# Define an API view to handle POST and DELETE requests for instructors (speakers)
@api_view(['POST', 'DELETE'])
def speaker_list(request, id=None):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response

    # Handle POST request: Create a new instructor
    if request.method == 'POST':
        # Initialize the serializer with the request data
        serializer = Instructors_Serializer(data=request.data)
        if serializer.is_valid():
            # Save the new instructor and return the serialized data with a 201 Created status
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return a response with the serializer errors and a 400 Bad Request status if validation fails
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
    # Handle DELETE request: Delete an existing instructor
    elif request.method == 'DELETE':
        if id:
            try:
                # Retrieve the instructor object based on the provided ID
                speaker = Instructors.objects.get(id=id)
                # Delete the instructor and return a 204 No Content status
                speaker.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Instructors.DoesNotExist:
                # Return a 404 Not Found response if the instructor does not exist
                return Response({"message": "Speaker not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request response if no instructor ID was provided
            return Response({"message": "No Speaker ID provided"}, status=status.HTTP_400_BAD_REQUEST)

 
# Define an API view to handle POST and DELETE requests for rates
@api_view(['POST', 'DELETE'])
def rate_list(request, id=None):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response    

    # Handle POST request: Create a new rate
    if request.method == 'POST':
        # Initialize the serializer with the request data
        serializer = Rate_SerializerList(data=request.data)
        if serializer.is_valid():
            # Save the new rate and return the serialized data with a 201 Created status
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return a response with the serializer errors and a 400 Bad Request status if validation fails
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Handle DELETE request: Delete an existing rate
    elif request.method == 'DELETE':
        if id:
            try:
                # Retrieve the rate object based on the provided ID
                live_course_rate = Rate.objects.get(id=id)
                # Delete the rate and return a 204 No Content status
                live_course_rate.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Rate.DoesNotExist:
                # Return a 404 Not Found response if the rate does not exist
                return Response({"message": "Rate not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request response if no rate ID was provided
            return Response({"message": "No Rate ID provided"}, status=status.HTTP_400_BAD_REQUEST)
 
 
# Define an API view to handle POST, PUT, and DELETE requests for course sections
@api_view(['POST', 'PUT', 'DELETE'])
def Section(request, id=None):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response

    # Handle POST request: Create a new course section
    if request.method == 'POST':
        # Extract the course ID from the request data
        courseId = request.data.get('courseId')
        if courseId:
            try:
                # Retrieve the course object based on the provided course ID
                course = Course.objects.get(id=courseId)
                # Initialize the serializer with the request data
                serializer = Section_Serializer(data=request.data)
                if serializer.is_valid():
                    # Save the new section and add it to the course
                    section_ser = serializer.save()
                    course.course_sections.add(section_ser)
                    course.save()
                    # Return the serialized data of the newly created section with a 201 Created status
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                # Return a response with the serializer errors and a 400 Bad Request status if validation fails
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Course.DoesNotExist:
                # Return a 404 Not Found response if the course does not exist
                return Response({"message": "Course not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request response if no course ID was provided
            return Response({"message": "No courseId provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Handle PUT request: Update an existing course section
    elif request.method == 'PUT':
        if id:
            try:
                # Retrieve the section object based on the provided ID
                section = CourseSection.objects.get(id=id)
                # Initialize the serializer with the section data and request data
                serializer = Section_Serializer(section, data=request.data)
                if serializer.is_valid():
                    # Save the updated section and return the serialized data
                    serializer.save()
                    return Response(serializer.data)
                # Return a response with the serializer errors and a 400 Bad Request status if validation fails
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except CourseSection.DoesNotExist:
                # Return a 404 Not Found response if the section does not exist
                return Response({"error": "Section not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request response if no section ID was provided
            return Response({"error": "No Section ID provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Handle DELETE request: Delete an existing course section
    elif request.method == 'DELETE':
        if id:
            try:
                # Retrieve the section object based on the provided ID
                section = CourseSection.objects.get(id=id)
                # Delete the section and return a 204 No Content status
                section.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except CourseSection.DoesNotExist:
                # Return a 404 Not Found response if the section does not exist
                return Response({"error": "Section not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request response if no section ID was provided
            return Response({"error": "No Section ID provided"}, status=status.HTTP_400_BAD_REQUEST)
 
 
# Define an API view to handle POST, PUT, and DELETE requests for course episodes
@api_view(['POST', 'PUT', 'DELETE'])
def manage_episode(request, id=None):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response

    # Handle POST request: Create a new episode
    if request.method == 'POST':
        # Extract the section ID from the request data
        SectionsId = request.data.get('SectionsId')
        if SectionsId:
            try:
                # Retrieve the section object based on the provided section ID
                section = CourseSection.objects.get(id=SectionsId)
                # Initialize the serializer with the request data
                serializer = CourseEpisode_Serializer(data=request.data)
                if serializer.is_valid():
                    # Save the new episode and add it to the section
                    episode_ser = serializer.save()
                    section.episodes.add(episode_ser)
                    section.save()
                    # Return the serialized data of the newly created episode with a 201 Created status
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                # Return a response with the serializer errors and a 400 Bad Request status if validation fails
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except CourseSection.DoesNotExist:
                # Return a 404 Not Found response if the section does not exist
                return Response({"error": "Course section not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Return a 400 Bad Request response if no section ID was provided
        return Response({"error": "SectionsId not provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Handle PUT request: Update an existing episode
    elif request.method == 'PUT':
        if id:
            try:
                # Retrieve the episode object based on the provided ID
                episode = Episode.objects.get(id=id)
                # Initialize the serializer with the episode data and request data
                serializer = CourseEpisode_Serializer(episode, data=request.data)
                if serializer.is_valid():
                    # Save the updated episode and return the serialized data
                    serializer.save()
                    return Response(serializer.data)
                # Return a response with the serializer errors and a 400 Bad Request status if validation fails
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Episode.DoesNotExist:
                # Return a 404 Not Found response if the episode does not exist
                return Response({"error": "Episode not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request response if no episode ID was provided
            return Response({"error": "No Episode ID provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Handle DELETE request: Delete an existing episode
    elif request.method == 'DELETE':
        if id:
            try:
                # Retrieve the episode object based on the provided ID
                episode = Episode.objects.get(id=id)
                # Delete the episode and return a 204 No Content status
                episode.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except Episode.DoesNotExist:
                # Return a 404 Not Found response if the episode does not exist
                return Response({"error": "Episode not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Return a 400 Bad Request response if no episode ID was provided
            return Response({"error": "No Episode ID provided"}, status=status.HTTP_400_BAD_REQUEST)
 

# Define an API view to handle POST, PUT, and DELETE requests for episode quizzes
@api_view(['POST', 'PUT', 'DELETE'])
def manage_episode_quiz(request, id=None):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response

    # Handle POST request: Create a new episode quiz
    if request.method == 'POST':
        # Initialize the serializer with the request data
        serializer = EpisodeQuiz_Serializer(data=request.data)
        if serializer.is_valid():
            # Save the new episode quiz and return the serialized data with a 201 Created status
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Return a response with the serializer errors and a 400 Bad Request status if validation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Handle PUT request: Update an existing episode quiz
    elif request.method == 'PUT':
        try:
            # Retrieve the episode quiz object based on the provided ID
            episode_quiz = EpisodeQuiz.objects.get(id=id)
        except EpisodeQuiz.DoesNotExist:
            # Return a 404 Not Found response if the episode quiz does not exist
            return Response({"error": "EpisodeQuiz not found"}, status=status.HTTP_404_NOT_FOUND)

        # Initialize the serializer with the episode quiz data and request data
        serializer = EpisodeQuiz_Serializer(episode_quiz, data=request.data)
        if serializer.is_valid():
            # Save the updated episode quiz and return the serialized data
            serializer.save()
            return Response(serializer.data)
        # Return a response with the serializer errors and a 400 Bad Request status if validation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Handle DELETE request: Delete an existing episode quiz
    elif request.method == 'DELETE':
        try:
            # Retrieve the episode quiz object based on the provided ID
            episode_quiz = EpisodeQuiz.objects.get(id=id)
        except EpisodeQuiz.DoesNotExist:
            # Return a 404 Not Found response if the episode quiz does not exist
            return Response({"error": "EpisodeQuiz not found"}, status=status.HTTP_404_NOT_FOUND)

        # Delete the episode quiz and return a 204 No Content status
        episode_quiz.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from uuid import UUID
from .models import EpisodeQuiz, Question
from .permissions import check_permissions

@api_view(['DELETE'])
def delete_question(request, exam_id, question_id):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response

    try:
        # Retrieve the exam instance based on the provided exam_id
        exam = EpisodeQuiz.objects.get(id=exam_id)
    except EpisodeQuiz.DoesNotExist:
        # Return a 404 Not Found response if the exam does not exist
        return Response({"error": "EpisodeQuiz not found"}, status=status.HTTP_404_NOT_FOUND)

    # Ensure question_id is a list; if it's a single ID, convert it to a list
    if not isinstance(question_id, list):
        question_id = [question_id]

    # Iterate over the question IDs and attempt to delete each one from the exam
    for q_id in question_id:
        try:
            # Convert question_id to UUID if it's not already
            if not isinstance(q_id, UUID):
                q_id = UUID(q_id)
            # Retrieve the question instance based on the provided q_id
            question = Question.objects.get(id=q_id)
            # Remove the question from the exam
            exam.questions.remove(question)
        except (Question.DoesNotExist, ValueError):
            # Catch exceptions if the question does not exist or UUID conversion fails
            pass

    # Return a 204 No Content status after successfully removing the questions
    return Response(status=status.HTTP_204_NO_CONTENT)

 
@api_view(['POST'])
def add_question_to_episode_quiz(request):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response
    
    try:
        # Extract data from the request
        exam_id = request.data.get('exam_id')
        question_id = request.data.get('question_id')
        
        # Retrieve the exam instance based on the provided exam_id
        try:
            exam = EpisodeQuiz.objects.get(id=exam_id)
        except EpisodeQuiz.DoesNotExist:
            # Return a 404 Not Found response if the exam does not exist
            return Response({'error': 'Exam not found'}, status=status.HTTP_404_NOT_FOUND)

        # Retrieve the question instance based on the provided question_id
        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            # Return a 404 Not Found response if the question does not exist
            return Response({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)

        # Associate the question with the exam
        exam.questions.add(question)
        
        # Return a 201 Created status after successfully adding the question
        return Response(status=status.HTTP_201_CREATED)

    except Exception as e:
        # Catch and handle any unexpected errors, returning a 500 Internal Server Error status
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


 
@api_view(['DELETE'])
def delete_questions_from_episode_quiz(request, exam_id, question_id):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response
    
    try:
        # Retrieve the exam instance based on the provided exam_id
        exam = EpisodeQuiz.objects.get(id=exam_id)
    except EpisodeQuiz.DoesNotExist:
        # Return a 404 Not Found response if the exam does not exist
        return Response({'error': 'Exam not found'}, status=status.HTTP_404_NOT_FOUND)

    # Ensure question_id is a list for processing
    if not isinstance(question_id, list):
        question_id = [question_id]

    # Iterate over the question IDs and remove them from the exam
    for q_id in question_id:
        try:
            # Convert question_id to UUID if it's not already
            if not isinstance(q_id, UUID):
                q_id = UUID(q_id)
            
            # Retrieve the question instance based on the converted q_id
            question = Question.objects.get(id=q_id)
            
            # Remove the question from the exam's questions
            exam.questions.remove(question)
        
        except Question.DoesNotExist:
            # Handle the case where a question does not exist
            pass
        except Exception as e:
            # Handle any other unexpected errors during the removal process
           pass
    # Return a 204 No Content status after successfully removing the questions
    return Response(status=status.HTTP_204_NO_CONTENT)

 
@api_view(['GET'])
def question_Filter(request, id):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response
    
    try:
        # Retrieve the user instance based on the provided id
        user = User.objects.get(id=id)
        
        # Get the list of questions created by the user, ordered by creation date (most recent first)
        questions = Question.objects.filter(creator=user).order_by('-created')

        # Get the category ID from the query parameters
        categoryId = request.GET.get('categoryId')

        # Filter questions based on the category ID if provided
        if categoryId:
            questions = questions.filter(category__id=categoryId)

        # Get the search query from the query parameters
        query = request.GET.get('search', '')

        # Filter questions based on the search query if provided
        if query:
            filtered_questions = questions.filter(question_content__icontains=query)
        else:
            filtered_questions = questions

        # Prepare the response data
        data = []
        for question in filtered_questions:
            question_data = {
                'creator': question.creator.id,
                'id': question.id,
                'category': {
                    'id': question.category.id if question.category else None,
                    'title': question.category.title if question.category else None
                },
                'question_content': question.question_content,
                'question_video_youtube': question.question_video_youtube,
                'option_A': question.option_A,
                'option_B': question.option_B,
                'option_C': question.option_C,
                'option_D': question.option_D,
                'correct_option': question.correct_option,
                'exams': []
            }

            # Add question image URL if it exists
            question_data['question_image'] = question.question_image.url if question.question_image else None

            # Get all exams associated with the question
            exams = EpisodeQuiz.objects.filter(questions=question)
            for exam in exams:
                question_data['exams'].append({
                    'exam_id': exam.id,
                    'exam_title': exam.title,
                })
            
            # Add the question data to the response data list
            data.append(question_data)

        # Serialize all episode quizzes and question categories
        exams = EpisodeQuiz.objects.all()
        question_cat = Question_category.objects.all()

        category_serializer = Question_categorySerializer(question_cat, many=True)
        exam_serializer = EpisodeQuiz_Serializer(exams, many=True)

        # Combine the serialized data into a single response dictionary
        data_with_exams = {
            'questions': data,
            'exams': exam_serializer.data,
            'category': category_serializer.data
        }

        # Return the combined response data with a 200 OK status
        return Response(data_with_exams, status=status.HTTP_200_OK)
    
    except User.DoesNotExist:
        # Return a 404 Not Found response if the user does not exist
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Return a 500 Internal Server Error response for any other exceptions
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 

@api_view(['GET'])
def course_coupon_codes(request, id):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response
    
    try:
        # Retrieve all coupon codes associated with the specified course ID
        coupon_codes = CouponCode.objects.filter(course_id=id)
        
        # Serialize the retrieved coupon codes
        serializer = CouponCodeSerializer(coupon_codes, many=True)
        
        # Return the serialized data with a 200 OK status
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except CouponCode.DoesNotExist:
        # Return a 404 Not Found response if no coupon codes are found for the course ID
        return Response({'error': 'Coupon codes not found for the specified course ID'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Return a 500 Internal Server Error response for any other exceptions
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

 
@api_view(['POST'])
def course_coupon_codes_create(request):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response
    
    try:
        # Initialize the serializer with the data from the request
        serializer = CouponCodeSerializer(data=request.data)
        
        # Validate the data provided
        if serializer.is_valid():
            # Save the coupon code if data is valid
            serializer.save()
            # Return the serialized data with a 201 Created status
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return a 400 Bad Request response with validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Course.DoesNotExist:
        # Return a 404 Not Found response if the associated course does not exist
        return Response({'error': 'Course does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Return a 500 Internal Server Error response for any other exceptions
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 

 
@api_view(['DELETE'])
def course_coupon_codes_delete(request, id):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response
    
    try:
        # Attempt to retrieve the coupon code using the provided ID
        coupon_code = CouponCode.objects.get(id=id)
        # Delete the retrieved coupon code
        coupon_code.delete()
        # Return a 204 No Content status indicating successful deletion
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    except CouponCode.DoesNotExist:
        # Return a 404 Not Found response if the coupon code does not exist
        return Response({'error': 'Coupon code does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Return a 500 Internal Server Error response for any other exceptions
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

 
@api_view(['GET'])
def user_Filter(request, id):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response
    
    try:
        # Extract query parameters from the request
        query = request.GET.get('query', '')
        start_date = request.GET.get('start_date', '')
        end_date = request.GET.get('end_date', '')
        status = request.GET.get('status', '')

        # Retrieve the course using the provided ID
        course = Course.objects.get(id=id)
  
        # Filter UserCourse instances related to the specified course
        users = UserCourse.objects.filter(course__id=course.id)   
        
        # Apply filters based on the query parameters
        if query:
            # Filter users by student's first name if the query parameter is provided
            users = users.filter(student__first_name__icontains=query)
        
        if start_date and end_date:
            # Filter users based on the date range if both start_date and end_date are provided
            users = users.filter(date__range=[start_date, end_date])

        if status == '':
            # If status is an empty string, get all users (no status filtering)
            users = users.all()
        elif status:
            # Filter users by status if the status parameter is provided
            users = users.filter(status=status)

        # Serialize the filtered user data
        user_serializer = UserCourse_Serializer(users, many=True)

        # Count the number of filtered users
        user_count = users.count()

        # Create a dictionary to hold serialized user data and user count
        data = {
            'users': user_serializer.data,
            'user_count': user_count
        }

        # Return the response with serialized data and user count
        return Response(data)

    except UserCourse.DoesNotExist:
        # Return a 404 Not Found response if the UserCourse does not exist
        return Response({'error': 'User Course not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Return a 500 Internal Server Error response for any unexpected exceptions
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

 

@api_view(['PUT'])
def UpdateStatus(request, id):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response

    # Extract the status value from the request data
    status_value = request.data.get('status')
    
    try:
        # Retrieve the UserCourse instance with the specified ID
        user_course = UserCourse.objects.get(id=id)
        
        # Update the status of the UserCourse instance if a status value is provided
        if status_value:
            user_course.status = status_value
            user_course.save()
            return Response({'message': 'Status updated successfully'}, status=status.HTTP_200_OK)
        else:
            # Return a 400 Bad Request response if no status value is provided
            return Response({'error': 'Status not provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    except UserCourse.DoesNotExist:
        # Return a 404 Not Found response if the UserCourse instance does not exist
        return Response({'error': 'User Course not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Return a 500 Internal Server Error response for any unexpected exceptions
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

 

@api_view(['GET'])
def download_users_data(request, id):
    # Check permissions by calling the custom check_permissions function
    error_response = check_permissions(request)
    if error_response:
        # If the check_permissions function returns an error response, return it
        return error_response

    try:
        # Retrieve the Course instance with the specified ID
        course = Course.objects.get(id=id)
        
        # Retrieve the users enrolled in the specified course
        users = UserCourse.objects.filter(course__id=course.id)

        # Create an HTTP response with CSV content type
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="enrolled_students.csv"'
        
        # Create a CSV writer object
        writer = csv.writer(response)
        # Write the header row to the CSV
        writer.writerow(['Date_joined', 'Last_login', 'Email', 'ID', 'Course', 'Date', 'First Name', 'Last Name', 'Paid', 'Status'])

        # Write each user's data as a row in the CSV
        for user in users:
            writer.writerow([
                user.student.date_joined,
                user.student.last_login,
                user.student.email,
                user.id,
                course.title,  # Assuming you want to display the course title instead of the course object
                user.date,
                user.student.first_name,
                user.student.last_name,
                user.Paid,
                user.status
            ])
 
        return response

    except Course.DoesNotExist:
        # Return a 404 Not Found response if the Course instance does not exist
        return Response({'error': 'Course does not exist'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        # Return a 500 Internal Server Error response for any unexpected exceptions
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)