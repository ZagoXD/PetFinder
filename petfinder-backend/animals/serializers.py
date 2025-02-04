from rest_framework import serializers
from .models import Animal

class AnimalSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(required=True) 

    class Meta:
        model = Animal
        fields = "__all__"
