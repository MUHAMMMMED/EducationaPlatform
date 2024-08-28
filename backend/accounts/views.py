
from multiprocessing import context
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from accounts.models import OneTimePassword
from accounts.serializers import *
from rest_framework import status
from .utils import send_generated_otp_to_email
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework.permissions import IsAuthenticated
from .models import  *
from rest_framework.views import APIView
from ipware import get_client_ip
import ipapi


def get_location_info(ip_address, user_id):
    try:
        # Retrieve location information based on the IP address
        location_info = ipapi.location(ip_address)

        if location_info:
            # Retrieve or create the user
            user = User.objects.get(id=user_id)
            user.IP_Address = location_info.get('ip')
            user.save()

            # Retrieve or create the dictionary for the country name
            country_name = location_info.get('country_name')
            dictionary, _ = Dictionary.objects.get_or_create(name=country_name)

            # Retrieve or create the country and associate it with the user and dictionary
            country, _ = Country.objects.get_or_create(dictionary=dictionary, user=user)

            # Retrieve or create the dictionary for the region name
            region_name = location_info.get('region')
            if region_name:
                dictionary, _ = Dictionary.objects.get_or_create(name=region_name)

                # Retrieve or create the region and associate it with the country and dictionary
                region, _ = Region.objects.get_or_create(dictionary=dictionary, country=country, user=user)

                # Retrieve or create the dictionary for the city name
                city_name = location_info.get('city')
                if city_name:
                    dictionary, _ = Dictionary.objects.get_or_create(name=city_name)

                    # Retrieve or create the city and associate it with the region and dictionary
                    city, _ = City.objects.get_or_create(dictionary=dictionary, region=region, user=user)

    except Exception as e:
        # Handle any exceptions that occur during the process
         pass
 
 
class RegisterView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        user_data = request.data

        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            user_instance = serializer.save()

            # Get the user's IP address from the request
            ip_address, _ = get_client_ip(request)
 
            if ip_address:
                # Pass the obtained IP address to the get_location_info function
                get_location_info(ip_address, user_instance.id)
 
            user_data = serializer.data
            # send_generated_otp_to_email(user_data['email'], request)

            return Response({
                'data': user_data,
                # 'message': 'Thanks for signing up. A passcode has been sent to verify your email.'
                'message': 'Thanks for signing up. '
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


  

class VerifyUserEmail(GenericAPIView):
    serializer_class = VerifyUserEmailSerializer  # تعيين serializer_class هنا

    def post(self, request):
        try:
            passcode = self.get_serializer(data=request.data).initial_data['otp']
            user_pass_obj = OneTimePassword.objects.get(otp=passcode)
 
            user = user_pass_obj.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({
                    'message': 'account email verified successfully'
                }, status=status.HTTP_200_OK)
            return Response({'message': 'passcode is invalid user is already verified'}, status=status.HTTP_204_NO_CONTENT)
        except OneTimePassword.DoesNotExist as identifier:
            return Response({'message': 'passcode not provided'}, status=status.HTTP_400_BAD_REQUEST)

 

 

# Create a view class for user login
class LoginUserView(GenericAPIView):
    # Specify the serializer class that will be used for validating and deserializing the input data
    serializer_class = LoginSerializer

    # Define the HTTP POST method handler for this view
    def post(self, request):
        # Instantiate the serializer with the input data (from the request) and the request object for additional context
        serializer = self.serializer_class(data=request.data, context={'request': request})

        # Validate the serializer's data; if invalid, it will raise an exception and return a 400 Bad Request response
        serializer.is_valid(raise_exception=True)

        # If validation is successful, return a 200 OK response with the serializer's data
        return Response(serializer.data, status=status.HTTP_200_OK)




 
# Create a view class for handling password reset requests
class PasswordResetRequestView(GenericAPIView):
    # Specify the serializer class that will be used for validating and deserializing the input data
    serializer_class = PasswordResetRequestSerializer

    # Define the HTTP POST method handler for this view
    def post(self, request):
        # Instantiate the serializer with the input data (from the request) and the request object for additional context
        serializer = self.serializer_class(data=request.data, context={'request': request})

        # Validate the serializer's data; if invalid, it will raise an exception and return a 400 Bad Request response
        serializer.is_valid(raise_exception=True)

        # If validation is successful, return a 200 OK response with a success message
        return Response({'message': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)




from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.models import User
from django.utils.encoding import DjangoUnicodeDecodeError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView

# Create a view class for confirming password reset tokens
class PasswordResetConfirm(GenericAPIView):
    # Define the HTTP GET method handler for this view
    def get(self, request, uidb64, token):
        try:
            # Decode the base64-encoded user ID from the URL to get the actual user ID
            user_id = smart_str(urlsafe_base64_decode(uidb64))

            # Fetch the user object from the database using the decoded user ID
            user = User.objects.get(id=user_id)

            # Check if the provided password reset token is valid for the user
            if not PasswordResetTokenGenerator().check_token(user, token):
                # If the token is invalid or expired, return a 401 Unauthorized response with an error message
                return Response({'message': 'Token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)

            # If the token is valid, return a 200 OK response with success message and token details
            return Response({'success': True, 'message': 'Credentials are valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            # If decoding the user ID fails, return a 401 Unauthorized response with an error message
            return Response({'message': 'Token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)


 
# Create a view class for setting a new password after a password reset request
class SetNewPasswordView(GenericAPIView):
    # Specify the serializer class that will be used for validating and deserializing the input data
    serializer_class = SetNewPasswordSerializer

    # Define the HTTP PATCH method handler for this view
    def patch(self, request):
        # Instantiate the serializer with the input data (from the request)
        serializer = self.serializer_class(data=request.data)

        # Validate the serializer's data; if invalid, it will raise an exception and return a 400 Bad Request response
        serializer.is_valid(raise_exception=True)

        # If validation is successful, return a 200 OK response with a success message
        return Response({'success': True, 'message': "Password reset is successful"}, status=status.HTTP_200_OK)
 
 
 
# Create a view class for handling user logout
class LogoutApiView(GenericAPIView):
    # Specify the serializer class that will be used for validating the input data
    serializer_class = LogoutUserSerializer

    # Set the permission classes to restrict access to authenticated users only
    permission_classes = [IsAuthenticated]

    # Define the HTTP POST method handler for this view
    def post(self, request):
        # Instantiate the serializer with the input data (from the request)
        serializer = self.serializer_class(data=request.data)

        # Validate the serializer's data; if invalid, it will raise an exception and return a 400 Bad Request response
        serializer.is_valid(raise_exception=True)

        # Save the serializer data; typically this would perform the logout operation, such as invalidating tokens
        serializer.save()

        # Return a 204 No Content response indicating the logout was successful
        return Response(status=status.HTTP_204_NO_CONTENT)




 from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Create a view class for testing authenticated requests
class TestingAuthenticatedReq(APIView):
    # Set the permission classes to restrict access to authenticated users only
    permission_classes = [IsAuthenticated]

    # Define the HTTP GET method handler for this view
    def get(self, request):
        # Check if the request user is not authenticated
        if not request.user.is_authenticated:
            # If the user is not authenticated, prepare a response with the relevant information
            data = {
                'msg': 'It not works',           # Message indicating the user is not authenticated
                'user_id': None,                 # No user ID as the user is not authenticated
                'full_name': None,               # No full name as the user is not authenticated
                'user_type': None,               # No user type as the user is not authenticated
                'IsAuthenticated': False,        # Boolean flag indicating the user is not authenticated
            }
            # Return a 200 OK response with the above data
            return Response(data, status=status.HTTP_200_OK)

        # If the user is authenticated, retrieve the user information
        user = request.user
        data = {
            'msg': 'It works',                  # Message indicating the user is authenticated
            'user_id': user.id,                 # User ID of the authenticated user
            'full_name': user.get_full_name(),  # Full name of the authenticated user (using the method call for function)
            'user_type': user.user_type,        # User type of the authenticated user
            'IsAuthenticated': True,            # Boolean flag indicating the user is authenticated
        }
        # Return a 200 OK response with the authenticated user's information
        return Response(data, status=status.HTTP_200_OK)