 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
# from ipware import get_client_ip

from .models import  *
from .serializers import *

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
def active_events(request):
   
    # Filter events to get only those that are active and order them by creation date in descending order
    events = Event.objects.filter(active=True).order_by('-created')
    
    # Serialize the events queryset into JSON-compatible format
    serializer = EventSerializer(events, many=True)
    
    # Return the serialized data with a 200 OK status
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def event_details(request, id):
    try:
        # Retrieve the Event instance with the specified ID, ensuring it is active
        event = Event.objects.get(id=id, active=True)
        views = event.views

        # Retrieve related speakers and learnings for the event
        speakers = Speaker.objects.filter(event_id=id)
        learnings = Learn.objects.filter(event_id=id)
 
        # Serialize the event, speakers, and learnings
        event_serializer = EventSerializer(event)
        learn_serializer = LearnSerializer(learnings, many=True)
        speaker_serializer = SpeakerSerializer(speakers, many=True)
 
        today = datetime.now().date()
        current_time = datetime.now().time()

        # Determine if the event has completed or is ongoing
        if today == event.date and event.start_time <= current_time <= event.end_time:
            event.completed = False
        elif event.date == today and current_time <= event.end_time:
            event.completed = False
        elif event.date < today:
            event.completed = True
        elif event.date > today:
            event.completed = False
        else:
            event.completed = True
    
        # Save the modified event instance
        event.save()

        # Prepare response data
        data = event_serializer.data
        data['views'] = views
        data['speaker'] = speaker_serializer.data
        data['learn'] = learn_serializer.data 

        # Increment the view count and save
        event.views += 1
        event.save()

        return Response(data, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        # Return a 404 Not Found response if the Event does not exist
        return Response({"message": "The Event is not available"}, status=status.HTTP_404_NOT_FOUND)



# @api_view(['GET'])
# def event_room(request, roomId):
  
#     try:
#         event = Event.objects.get(roomId=roomId)
 

 
#         if event:
#             today = datetime.now().date()
#             current_time = datetime.now().time()

#             if today == event.date and event.start_time <= current_time <= event.end_time:
#                 event.active = True
#             else:
#                 event.active = False
 
#             data = {'active': event.active}
 
#             return Response(data, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'The Event is not available'}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             return Response({'error': 'The Event is not available'}, status=status.HTTP_404_NOT_FOUND)
    
#     except Event.DoesNotExist:
#         return Response({'error': 'The Event is not available'}, status=status.HTTP_404_NOT_FOUND)

 
@api_view(['GET'])
def event_room(request, roomId):
 
    try:
        # Retrieve the event object by its roomId
        event = Event.objects.get(roomId=roomId)
        
        # Get the current date and time
        today = datetime.now().date()
        current_time = datetime.now().time()

        # Determine if the event is active based on the current date and time
        if today == event.date and event.start_time <= current_time <= event.end_time:
            event.active = True
        else:
            event.active = False

        # Prepare the data to be returned in the response
        data = {'active': event.active}
        
        # Return the active status of the event with a 200 OK status
        return Response(data, status=status.HTTP_200_OK)

    except Event.DoesNotExist:
        # Return an error message if the event is not found
        return Response({'error': 'The Event is not available'}, status=status.HTTP_404_NOT_FOUND)

 

# @api_view(['GET'])
# def event_room(request, roomId):
#     try:
#         # Fetch the event based on roomId
#         event = Event.objects.get(roomId=roomId)
#         if event:
#             # Create a session if it doesn't exist
#             if not request.session.session_key:
#                 request.session.create()
#             session_id = request.session.session_key

#             # Capture the client's IP address
#             ip_address = get_client_ip(request)

#             # Get or create an EventsSession object with the session_id and IP address
#             event_session, created = EventsSession.objects.get_or_create(session_id=session_id, IP=ip_address)

#             # Check if the event session is active
#             if event_session.status == 'L':
#                 today = datetime.now().date()
#                 current_time = datetime.now().time()

#                 # Check if the event is within the active date and time range
#                 if today == event.date and event.start_time <= current_time <= event.end_time:
#                     event.active = True
#                 else:
#                     event.active = False

#                 # Return the event status
#                 data = {'active': event.active}
#                 return Response(data, status=status.HTTP_200_OK)
#             else:
#                 # Return an error if the event session is not active
#                 return Response({'error': 'The Event is not available'}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             # Return an error if the event is not found
#             return Response({'error': 'The Event is not available'}, status=status.HTTP_404_NOT_FOUND)
#     except Event.DoesNotExist:
#         # Handle the case where the event does not exist
#         return Response({'error': 'The Event is not available'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def event_filter(request):
    
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response

    # Get the query parameter from the request
    query = request.GET.get('query', '')

    # Filter events based on the presence of a query parameter
    if query == '':
        # If no query parameter is provided, return all events ordered by creation date
        events = Event.objects.all().order_by('-created')
    else:
        # If a query parameter is provided, filter events that are active and match the query in the title
        events = Event.objects.filter(active=True, title__icontains=query).order_by('-created')

    # Serialize the filtered events
    serializer = EventSerializer(events, many=True)

    # Return the serialized data in the response
    return Response(serializer.data)

 
 
 
 

 
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def event_api(request, id=None):
  
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response

    if request.method == 'GET':
        if id:
            # Retrieve a single event by ID, along with related learns and speakers
            try:
                event = Event.objects.get(id=id)
                learns = Learn.objects.filter(event__id=id)
                speakers = Speaker.objects.filter(event__id=id)
                
                event_serializer = EventSerializer(event)
                learn_serializer = LearnSerializer(learns, many=True)
                speaker_serializer = SpeakerSerializer(speakers, many=True)

                data = event_serializer.data
                data['learn'] = learn_serializer.data
                data['speaker'] = speaker_serializer.data
                return Response(data)
            except Event.DoesNotExist:
                return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        else:
            # Retrieve all events
            events = Event.objects.all()
            serializer = EventSerializer(events, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        # Create a new event
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        # Update an existing event
        try:
            event = Event.objects.get(id=id)
            serializer = EventSerializer(event, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        # Delete an event by ID
        try:
            event = Event.objects.get(id=id)
            event.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
 
 
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def learn_api(request, id=None):
 
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response

    if request.method == 'GET':
        if id:
            # Retrieve a single Learn instance related to an Event by ID
            try:
                learn = Learn.objects.get(event__id=id)
                learn_serializer = LearnSerializer(learn)
                return Response(learn_serializer.data)
            except Learn.DoesNotExist:
                return Response({'error': 'Learn instance not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Retrieve all Learn instances
            learns = Learn.objects.all()
            serializer = LearnSerializer(learns, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        # Create a new Learn instance
        serializer = LearnSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        # Update an existing Learn instance by ID
        try:
            learn = Learn.objects.get(id=id)
            serializer = LearnSerializer(learn, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Learn.DoesNotExist:
            return Response({'error': 'Learn instance not found'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        # Delete a Learn instance by ID
        try:
            learn = Learn.objects.get(id=id)
            learn.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Learn.DoesNotExist:
            return Response({'error': 'Learn instance not found'}, status=status.HTTP_404_NOT_FOUND)
 
 
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def speaker_api(request, id=None):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response

    # Handle GET requests
    if request.method == 'GET':
        if id:
            # Retrieve a specific speaker by ID
            try:
                speaker = Speaker.objects.get(id=id)
                speaker_serializer = SpeakerSerializer(speaker)
                return Response(speaker_serializer.data)
            except Speaker.DoesNotExist:
                return Response({"error": "Speaker not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Retrieve all speakers
            speakers = Speaker.objects.all()
            serializer = SpeakerSerializer(speakers, many=True)
            return Response(serializer.data)

    # Handle POST requests
    elif request.method == 'POST':
        serializer = SpeakerSerializer(data=request.data)
        if serializer.is_valid():
            # Save new speaker
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Handle PUT requests
    elif request.method == 'PUT':
        try:
            # Retrieve the specific speaker to update
            speaker = Speaker.objects.get(id=id)
        except Speaker.DoesNotExist:
            return Response({"error": "Speaker not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = SpeakerSerializer(speaker, data=request.data)
        if serializer.is_valid():
            # Update existing speaker
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Handle DELETE requests
    elif request.method == 'DELETE':
        try:
            # Retrieve and delete the specific speaker
            speaker = Speaker.objects.get(id=id)
            speaker.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Speaker.DoesNotExist:
            return Response({"error": "Speaker not found"}, status=status.HTTP_404_NOT_FOUND)

 
 
@api_view(['GET'])
def speaker_list(request, id):
    # Check permissions for the request
    error_response = check_permissions(request)
    if error_response:
        return error_response

    try:
        # Retrieve all speakers related to the event with the given ID
        speakers = Speaker.objects.filter(event__id=id)
        # Serialize the list of speakers
        serializer = SpeakerSerializer(speakers, many=True)
        # Return the serialized data in the response
        return Response(serializer.data)
    except Speaker.DoesNotExist:
        # Handle the case where no speakers are found for the given event ID
        return Response({"error": "Speakers not found"}, status=status.HTTP_404_NOT_FOUND)

 


 
# @api_view(['GET', 'POST', 'PUT', 'DELETE'])
# def Events_session(request, id=None):
#     # Check permissions for the request
#     error_response = check_permissions(request)
#     if error_response:
#         return error_response

#     # Handle GET requests
#     if request.method == 'GET':
#         if id:
#             # Retrieve a specific EventsSession by ID
#             try:
#                 eventSession = EventsSession.objects.get(id=id)
#                 serializer = EventsSessionSerializer(eventSession)
#                 return Response(serializer.data)
#             except EventsSession.DoesNotExist:
#                 return Response({'error': 'EventSession not found'}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             # Retrieve all EventsSession instances
#             eventSession = EventsSession.objects.all()
#             serializer = EventsSessionSerializer(eventSession, many=True)
#             return Response(serializer.data)

#     # Handle POST requests
#     elif request.method == 'POST':
#         # Serialize the incoming data to create a new EventsSession
#         serializer = EventsSessionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # Handle PUT requests
#     elif request.method == 'PUT':
#         try:
#             # Retrieve the specific EventsSession by ID to update
#             eventSession = EventsSession.objects.get(id=id)
#         except EventsSession.DoesNotExist:
#             return Response({'error': 'EventSession not found'}, status=status.HTTP_404_NOT_FOUND)
        
#         # Serialize the updated data
#         serializer = EventsSessionSerializer(eventSession, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # Handle DELETE requests
#     elif request.method == 'DELETE':
#         try:
#             # Retrieve the specific EventsSession by ID to delete
#             eventSession = EventsSession.objects.get(id=id)
#             eventSession.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except EventsSession.DoesNotExist:
#             return Response({'error': 'EventSession not found'}, status=status.HTTP_404_NOT_FOUND)
 
 

# @api_view(['GET'])
# def session_Filter(request):
#     # Check permissions for the request
#     error_response = check_permissions(request)
#     if error_response:
#         return error_response

#     try:
#         # Retrieve query parameters from the request
#         name = request.GET.get('name', '')
#         start_date = request.GET.get('start_date', '')
#         end_date = request.GET.get('end_date', '')
#         status_param = request.GET.get('status', '')

#         # Start with all events sessions
#         session = EventsSession.objects.all()

#         # Filter by name if provided
#         if name:
#             session = session.filter(name__icontains=name)

#         # Filter by date range if both start_date and end_date are provided
#         if start_date and end_date:
#             session = session.filter(date__range=[start_date, end_date])

#         # Filter by status if provided, otherwise return all
#         if status_param:
#             session = session.filter(status=status_param)

#         # Serialize the filtered session data
#         serializer = EventsSessionSerializer(session, many=True)

#         # Count the number of sessions
#         session_count = session.count()

#         # Create a dictionary to hold the response data
#         data = {
#             'session': serializer.data,
#             'session_count': session_count
#         }
#         return Response(data)

#     except EventsSession.DoesNotExist:
#         # Return an error if no sessions are found (shouldn't be reached with filter operations)
#         return Response({'error': 'EventsSession not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         # Return an error for any other exceptions
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 
# @api_view(['PUT'])
# def UpdateStatus_session(request, id):
#     # Check permissions for the request
#     error_response = check_permissions(request)
#     if error_response:
#         return error_response
    
#     try:
#         # Get the 'status' value from the request data
#         status_value = request.data.get('status')

#         # Retrieve the specific EventsSession instance by ID
#         session = EventsSession.objects.get(id=id)

#         # Update the session status if 'status' is provided
#         if status_value:
#             session.status = status_value
#             session.save()
#             return Response({'message': 'Status updated successfully'}, status=status.HTTP_200_OK)
#         else:
#             # Return an error response if 'status' is not provided
#             return Response({'error': 'Status not provided'}, status=status.HTTP_400_BAD_REQUEST)
    
#     except EventsSession.DoesNotExist:
#         # Handle the case where the EventsSession does not exist
#         return Response({'error': 'EventSession not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         # Handle any other exceptions
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)