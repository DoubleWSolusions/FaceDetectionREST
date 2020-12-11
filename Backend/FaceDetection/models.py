from django.db import models


class ImageToDetection(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images')


class Detection(models.Model):
    image = models.ForeignKey(ImageToDetection, on_delete=models.CASCADE)
    image_after_detection = models.ImageField()
