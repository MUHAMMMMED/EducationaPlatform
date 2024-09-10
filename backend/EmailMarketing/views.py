from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import time
from .models import*
from .serializers import *
from accounts.models import User
from accounts.serializers import User_Serializer 
from .tasks import send_message_task
import time
  
 




def check_permissions(request):
    """
    Check if the user is authenticated and has permission to access the data.
    """
    if not request.user.is_authenticated:
        return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

    if request.user.user_type != 'M':  # Assuming 'M' represents the Manager user type
        return Response({'error': 'You do not have permission to access this data.'}, status=status.HTTP_403_FORBIDDEN)
    
    return None  # No error, user is authenticated and has permission
 
 

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def campaign(request, pk=None):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response

    # Handling GET request
    if request.method == 'GET':
        if pk:
            # Retrieve a single campaign if pk is provided
            campaign = Campaign.objects.get(pk=pk)
            serializer = CampaignSerializer(campaign)
            return Response(serializer.data)
        else:
            # List all campaigns if no pk is provided
            campaigns = Campaign.objects.all()
            serializer = CampaignSerializer(campaigns, many=True)
            return Response(serializer.data)
    
    # Handling POST request
    elif request.method == 'POST':
        # Create a new campaign
        serializer = CampaignSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Handling PUT request
    elif request.method == 'PUT':
        if pk:
            # Update an existing campaign if pk is provided
            campaign = Campaign.objects.get(pk=pk)
            serializer = CampaignSerializer(campaign, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # Return error if pk is not provided
        return Response({'detail': 'Method "PUT" not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    # Handling DELETE request
    elif request.method == 'DELETE':
        if pk:
            # Delete a campaign if pk is provided
            campaign = Campaign.objects.get(pk=pk)
            campaign.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        # Return error if pk is not provided
        return Response({'detail': 'Method "DELETE" not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



@api_view(['GET'])
def campaign_data(request):
    """
    Retrieve all campaign data if the user has the required permissions.
    """
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response

    # Fetch all campaigns
    campaigns = Campaign.objects.all()
    campaign_serializer = CampaignSerializer(campaigns, many=True)
    return Response(campaign_serializer.data, status=status.HTTP_200_OK)

 







 
 
 
@api_view(['GET'])
def send_to_inactive_customers(request):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response

    # Retrieve query parameters from the request
    campaignId = request.query_params.get('campaignId')
    status_param = request.query_params.get('status')
    customer_status = request.query_params.get('customer_status')

    # Check if all required parameters are provided
    if not campaignId or not status_param or not customer_status:
        return Response({"error": "Missing parameters"}, status=status.HTTP_400_BAD_REQUEST)

    # Try to retrieve the campaign from the database
    try:
        campaign = Campaign.objects.get(id=campaignId)
    except Campaign.DoesNotExist:
        return Response({"error": "Campaign not found"}, status=status.HTTP_404_NOT_FOUND)

    # Initialize message and count of customers
    message = ''
    customers = campaign.customer.filter(status=customer_status)
    customers_count = customers.count()
    stop_processing = False

    # Process the campaign based on the status parameter
    if status_param == 'run':
        for customer in customers:
            if stop_processing:
                break


            # Try sending a confirmation email, skip if an error occurs
            try:
             # Send a confirmation email to the user

              # Send message to the customer
              
             # Call Celery task to send email
              send_message_task.delay(
 
                customer.email_address,
                customer.name,
                campaign.Language,
                campaign.subject,
                campaign.message,
                campaign.Link,
                campaign.button_action
 

               )
              time.sleep(5)  # Wait for 5 seconds between sending messages


            except Exception as email_error:
            # Log the error or handle it in any way needed, but don't stop the process
              print(f"Email sending failed: {email_error}")
 

            # Toggle customer status between 'active' and 'inactive'
            customer.status = 'inactive' if customer.status == 'active' else 'active'
            customer.save()

            message = 'Send completed'

        data = {'customers_count': customers_count, 'message': message}

    elif status_param == 'stop':
        stop_processing = True
        message = 'Campaign stopped'
        data = {'customers_count': customers_count, 'message': message}

    # Return the response with the data
    return Response(data, status=status.HTTP_200_OK)

 
 
def filter(users, query='', email='', start_date='', end_date=''):
    # Filter users by first name containing the query string
    if query:
        users = users.filter(first_name__icontains=query)

    # Filter users by email containing the email string
    if email:
        users = users.filter(email__icontains=email)

    # Filter users by date joined within the specified date range
    if start_date and end_date:
        users = users.filter(date_joined__range=[start_date, end_date])

    # Serialize the filtered users
    user_serializer = User_Serializer(users, many=True)

    # Get the count of filtered users
    user_count = users.count()

    # Prepare the response data
    data = {
        'users': user_serializer.data,
        'user_count': user_count
    }
    return data

@api_view(['GET'])
def student_filter(request):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response

    try:
        # Retrieve query parameters from the request
        query = request.GET.get('query', '')
        start_date = request.GET.get('start_date', '')
        end_date = request.GET.get('end_date', '')
        email = request.GET.get('email', '')
        campaign_id = request.GET.get('campaign_id')
        save = request.GET.get('save', '')

        # Filter users of type 'S' (students)
        users = User.objects.filter(user_type='S')

        # Apply additional filters using the custom filter function
        data = filter(users, query, email, start_date, end_date)

        message = ''  # Initialize message variable
        if save == 'save' and campaign_id is not None:
            for customer_data in data['users']:
                time.sleep(3)  # Pause for 3 seconds between processing customers
                add_customers(customer_data['user_full_name'], customer_data['email'], campaign_id)
          
            message = 'Save completed'  # Set message to indicate save completion

        # Prepare the final response data
        Data = {'data': data, 'message': message}
        return Response(Data, status=status.HTTP_200_OK)  # Return response with data and status
    except Exception as e:
        # Return error response in case of exceptions
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def add_customers(name, email_address, campaign_id):
    try:
        # Retrieve the campaign by ID
        campaign = Campaign.objects.get(id=campaign_id)

        # Check if the customer already exists
        existing_customer = Customer.objects.filter(name=name, email_address=email_address).first()
        
        if existing_customer:
            # Add existing customer to the campaign
            campaign.customer.add(existing_customer)
        else:
            # Create a new customer if not already existing
            data = {
                'name': name,
                'email_address': email_address
            }
            serializer = Customer_Serializer(data=data)
            if serializer.is_valid():
                customer_serializer = serializer.save()
                campaign.customer.add(customer_serializer)
            else:
               
                pass

        # Save the campaign after adding the customer
        campaign.save()
    except Campaign.DoesNotExist:
        
        pass
    except Exception as e:
        # Raise any other exceptions encountered
        raise e

 