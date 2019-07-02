from review.models import Review, Bear, Flavor
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from rest_auth.serializers import UserDetailsSerializer
from .relations import FlavorRelatedField

class BearSerializer(ModelSerializer):
  class Meta:
    model = Bear
    fields = ('id', 'name')

class ReviewListSerializer(ModelSerializer):
  bear = BearSerializer(read_only=True)
  flavorList = FlavorRelatedField(many=True, source='flavors')
  class Meta:
    model = Review
    fields = ('id', 'bear', 'flavorList', 'bewer_name', 'price', 'rating', 'serving')

class ReviewCeateSerializer(ModelSerializer):
  flavorList = FlavorRelatedField(many=True, source='flavors')
  class Meta:
    model = Review
    fields = ('id', 'bear','flavorList', 'bewer_name', 'price', 'rating', 'serving')
    def create(self, validated_data):
      user = self.context.get('user', None)

      flavors = validated_data.pop('flavors', [])

      review = Review.objects.create(user=user, **validated_data)

      for flavor in flavors:
          Review.flavors.add(flavor)

      return review
class FlavorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flavor
        fields = ('tag',)

    def to_representation(self, obj):
        return obj.flavor