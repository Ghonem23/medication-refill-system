from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import RefillRequest, Medication
from .serializers import RefillRequestSerializer
from django.db.models import Count
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# Protected view for testing
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({"message": "You have accessed a protected view"})

# Static medication list
@api_view(['GET'])
def medication_list(request):
    medications = [
        {"id": 1, "name": "Aspirin", "description": "Pain reliever"},
        {"id": 2, "name": "Ibuprofen", "description": "Anti-inflammatory"},
        {"id": 3, "name": "Paracetamol", "description": "Fever reducer"},
    ]
    return Response(medications)

# Endpoint to submit refill request
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_refill_request(request):
    serializer = RefillRequestSerializer(data=request.data)
    if serializer.is_valid():
        medication_id = serializer.validated_data['medication_id']
        try:
            medication = Medication.objects.get(id=medication_id)
            RefillRequest.objects.create(
                user=request.user,
                medication=medication,
                status='pending'
            )
            return Response({"message": "Refill request submitted successfully"}, status=status.HTTP_201_CREATED)
        except Medication.DoesNotExist:
            return Response({"error": "Medication not found."}, status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Refill request statistics endpoint
@api_view(['GET'])
def refill_stats(request):
    stats = RefillRequest.objects.values('medication__name').annotate(total=Count('medication')).order_by('-total')
    return Response(stats)

# User registration endpoint
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(
        username=username,
        email=email,
        password=make_password(password)  # Hash the password before storing it
    )
    
    return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)