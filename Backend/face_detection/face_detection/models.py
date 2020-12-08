from django.db import models


class Detection(models.Model):
    image = models.ImageField()
