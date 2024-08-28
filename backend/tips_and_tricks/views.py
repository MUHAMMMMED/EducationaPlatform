 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Tip
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
def tips_filter(request):
    # Retrieve query parameters
    category = request.GET.get('category')
    instructor = request.GET.get('instructor')
    query = request.GET.get('query', '')

    # Start with all active tips
    tips = Tip.objects.filter(active=True)

    # Filter by category if provided
    if category:
        categories = [int(cat_id) for cat_id in category.split(',')]
        tips = tips.filter(category__id__in=categories)
    
    # Filter by instructor if provided
    if instructor:
        instructors = [int(inst_id) for inst_id in instructor.split(',')]
        tips = tips.filter(author__id__in=instructors)
    
    # Filter by query if provided
    if query:
        tips = tips.filter(title__icontains=query)
  
    # Serialize the filtered tips
    serializer = TipSerializer(tips, many=True)
    
    # Return the serialized data with a 200 OK status
    return Response(serializer.data, status=status.HTTP_200_OK)
 
@api_view(['GET'])
def tips_filter_dash(request):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response
    
    # Retrieve query parameters
    category = request.GET.get('category')
    instructor = request.GET.get('instructor')
    query = request.GET.get('query', '')

    # Start with all active tips
    tips = Tip.objects.filter(active=True)

    # Filter by category if provided
    if category:
        categories = [int(cat_id) for cat_id in category.split(',')]
        tips = tips.filter(category__id__in=categories)
    
    # Filter by instructor if provided
    if instructor:
        instructors = [int(inst_id) for inst_id in instructor.split(',')]
        tips = tips.filter(author__id__in=instructors)
    
    # Filter by query if provided
    if query:
        tips = tips.filter(title__icontains=query)
  
    # Serialize the filtered tips
    serializer = TipSerializer(tips, many=True)
    
    # Return the serialized data with a 200 OK status
    return Response(serializer.data, status=status.HTTP_200_OK)
 

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def Tips_api(request, id=None):
    # Check permissions
    error_response = check_permissions(request)
    if error_response:
        return error_response

    if request.method == 'GET':
        if id:
            # Retrieve and serialize a single tip by ID
            try:
                tip = Tip.objects.get(id=id)
                tip_serializer = Tip_Serializer(tip)
                return Response(tip_serializer.data)
            except Tip.DoesNotExist:
                return Response({'error': 'Tip not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Retrieve and serialize all tips
            tips = Tip.objects.all()
            serializer = Tip_Serializer(tips, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        # Create a new tip
        serializer = Tip_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        # Update an existing tip by ID
        try:
            tip = Tip.objects.get(id=id)
            serializer = Tip_Serializer(tip, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Tip.DoesNotExist:
            return Response({'error': 'Tip not found'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        # Delete a tip by ID
        try:
            tip = Tip.objects.get(id=id)
            tip.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Tip.DoesNotExist:
            return Response({'error': 'Tip not found'}, status=status.HTTP_404_NOT_FOUND)