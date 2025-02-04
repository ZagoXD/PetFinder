from rest_framework import generics
from .models import Animal
from .serializers import AnimalSerializer

class AnimalListCreateView(generics.ListCreateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class AnimalDetailView(generics.RetrieveDestroyAPIView):  
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
