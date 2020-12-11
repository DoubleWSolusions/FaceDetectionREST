from rest_framework import serializers
from .models import *


class DetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detection
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageToDetection
        fields = '__all__'
