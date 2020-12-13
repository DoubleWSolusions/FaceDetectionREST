from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.http import HttpResponse

from .models import *
from PIL import Image
from .serializers import *
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, renderers
from Model.find_faces import detect_face, to_bytes
from django.core.files import File
import io
import base64

from Backend import settings


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
            im_io = io.BytesIO()
            wich_image = request.query_params["image"]
            image = ImageToDetection.objects.get(name=wich_image)
            im_dir = '.' + image.image.url
            im = Image.open(im_dir)

            faces = detect_face(im)
            faces.save(im_io, 'png')
            im_io.seek(0)
            im_io_png = base64.b64encode(im_io.getvalue())
            context = im_io_png.decode('UTF-8')
            # res = to_bytes(faces)
            #img_byte_arr = io.BytesIO()
            #faces.save(img_byte_arr, format='PNG')

            detection = Detection(image=image, image_after_detection=context)
            serializer = DetectionSerializer(detection)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            print('error')
            return Response(status=status.HTTP_400_BAD_REQUEST)


class DetectionView2(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):

        try:
            wich_image = request.query_params["image"]
            image = ImageToDetection.objects.get(name=wich_image)
            im_dir = '.' + image.image.url
            im = Image.open(im_dir)
            faces = detect_face(im)

            return HttpResponse(faces, content_type="image/png")
        except Exception as e:
            print(e)
            print('error')
            return Response(status=status.HTTP_400_BAD_REQUEST)


class DetectionView3(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):

        try:
            im_io = io.BytesIO()
            wich_image = request.query_params["image"]
            image = ImageToDetection.objects.get(name=wich_image)
            im_dir = '.' + image.image.url
            im = Image.open(im_dir)

            faces = detect_face(im)
            faces.save(im_io, 'JPEG')
            img_after_detect = File(im_io)

            detection = Detection(image=image)
            detection.image_after_detection.save('a.jpeg', img_after_detect)
            print(detection.image_after_detection.url)
            serializer = DetectionSerializer(detection)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            print('error')
            return Response(status=status.HTTP_400_BAD_REQUEST)
