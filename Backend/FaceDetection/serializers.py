from rest_framework import serializers
from .models import *


class DetectionSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = Detection
        fields = fields = ('image', 'image_after_detection', 'image_url')

    def get_image_url(self, obj):
        return obj.image_after_detection.url


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageToDetection
        fields = '__all__'
