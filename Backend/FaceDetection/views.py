from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from Model.find_faces import detect_face


class ImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        images = ImageToDetection.objects.all()
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        image_serializer = ImageSerializer(data=request.data)
        if image_serializer.is_valid():
            image_serializer.save()
            return Response(image_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', image_serializer.errors)
            return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DetectionView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):

        try:
            wich_image = request.query_params["image"]
            image = ImageToDetection.objects.get(pk=wich_image)
            faces = detect_face(image)
            detection = Detection(image=wich_image, image_after_detection=faces)
            serializer = DetectionSerializer(detection, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            print('error')
            return Response(status=status.HTTP_400_BAD_REQUEST)

