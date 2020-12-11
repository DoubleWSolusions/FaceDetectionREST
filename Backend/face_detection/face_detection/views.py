from django.shortcuts import render
from rest_framework import viewsets
from .models import Detection
from .serializers import DetectionSerializer


class DetectionView(viewsets.ModelViewSet):
    queryset = Detection.objects.all()
    serializer_class = DetectionSerializer