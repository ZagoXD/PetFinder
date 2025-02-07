from rest_framework import generics
from .models import Animal
from .serializers import AnimalSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class AnimalListCreateView(generics.ListCreateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class AnimalDetailView(generics.RetrieveDestroyAPIView):  
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_superuser(request):
    return Response({"is_superuser": request.user.is_superuser})
