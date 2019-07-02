from rest_framework import serializers

from .models import Flavor


class FlavorRelatedField(serializers.RelatedField):
    def get_queryset(self):
        return Flavor.objects.all()

    def to_internal_value(self, data):
        flavor, created = Flavor.objects.get_or_create(flavor=data)

        return flavor

    def to_representation(self, value):
        return value.flavor