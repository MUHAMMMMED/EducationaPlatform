from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status  
from datetime import datetime
from .models import Meeting
from .serializers import MeetingSerializer
from LiveCourses.models import UserLiveCourse
from accounts.serializers import UserSerializerwithId
from accounts.models import User




@api_view(['GET'])
def meeting_Room(request, course_id, roomId):
    try:
        # Retrieve the Meeting object based on roomId
        meetings = Meeting.objects.get(roomId=roomId)

        # Check if the user is authenticated
        if request.user.is_authenticated:
            user = request.user
            user = User.objects.get(id=user.id)
        else:
            # Return an error if the user is not authenticated
            return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        # Check if the user is enrolled in the course with 'L' status
        user_live = UserLiveCourse.objects.filter(student=user, course_id=course_id, status='L').first()

        if user_live:
            today = datetime.now().date()
            current_time = datetime.now().time()

            # Determine if the meeting is active based on date and time
            if today == meetings.date and meetings.start_time <= current_time <= meetings.end_time:
                meetings.active = True
            else:
                meetings.active = False

            is_enrolled = True

            # Serialize user data
            user_serializer = UserSerializerwithId(user)
            data = user_serializer.data
            data['is_enrolled'] = is_enrolled
            data['active'] = meetings.active
            data['maxUsers'] = meetings.student

            # Return the data with a status of 200 OK
            return Response(data, status=status.HTTP_200_OK)
        else:
            # Return an error if the user is not enrolled
            return Response({'error': 'User is not enrolled'}, status=status.HTTP_403_FORBIDDEN)
    except Meeting.DoesNotExist:
        # Return an error if the meeting is not found
        return Response({'error': 'Meeting not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def meeting_create(request):
    # Create a serializer instance with the provided request data
    serializer = MeetingSerializer(data=request.data)
    
    # Check if the serializer data is valid
    if serializer.is_valid():
        # If valid, save the data to create a new Meeting object
        serializer.save()
        # Return a success response with the serialized data and HTTP status 201 Created
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        # If the serializer data is not valid, return an error response
        # The error details from the serializer are included in the response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def meeting_update(request, pk):
    try:
        # Attempt to retrieve the Meeting object by its primary key (id)
        meeting = Meeting.objects.get(id=pk)
        
        # Create a serializer instance with the existing meeting data and the new request data
        serializer = MeetingSerializer(meeting, data=request.data)
        
        # Check if the serializer data is valid
        if serializer.is_valid():
            # If valid, save the updated meeting data
            serializer.save()
            # Return the updated meeting data in the response
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    except Meeting.DoesNotExist:
        # Return a 404 Not Found response if the meeting does not exist
        return Response({'error': 'Meeting not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Return a 400 Bad Request response for any other exceptions
        # Include the exception message in the response
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
 


@api_view(['DELETE'])
def meeting_delete(request, pk):
    try:
        # Attempt to retrieve the Meeting object by its primary key (id)
        meeting = Meeting.objects.get(id=pk)
    except Meeting.DoesNotExist:
        # Return a 404 Not Found response if the meeting does not exist
        return Response({'error': 'Meeting not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Delete the retrieved meeting object
    meeting.delete()
    
    # Return a 204 No Content response to indicate successful deletion
    return Response(status=status.HTTP_204_NO_CONTENT)




 