from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.

class Bear(models.Model):
  name = models.CharField(max_length=200)

  def __str__(self):
      return self.name

class Flavor(models.Model):
  flavor = models.CharField(max_length=255)
  def __str__(self):
      return self.flavor

class Review(models.Model):
  SERVING_TYPE = [
    (1, 'Draft'),
    (2, 'Cask'),
    (3, 'Bottle'),
    (4, 'Can'),
  ]
  beer_image = models.FileField(blank=False, null=False)
  bear = models.ForeignKey(Bear, on_delete=models.PROTECT)
  user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
  bewer_name = models.CharField(max_length=200)
  price = models.FloatField(
    default=0.0,
      validators=[
          MinValueValidator(0)
      ]
  )
  rating = models.IntegerField(
      default=0,
      validators=[
          MaxValueValidator(5),
          MinValueValidator(0)
      ]
  )
  serving = models.IntegerField(default=1, choices=SERVING_TYPE)
  flavors = models.ManyToManyField(Flavor)