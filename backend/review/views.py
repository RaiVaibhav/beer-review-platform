from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from review.models import Review, Flavor, Bear
from review.serializers import ReviewListSerializer, ReviewCeateSerializer, FlavorSerializer, BearSerializer
from rest_framework import status, generics

class ReviewListAPIView(APIView):
  permission_classes = (IsAuthenticated,)

  def get(self, request, format=None):
      reviews = Review.objects.all()
      serializer = ReviewListSerializer(reviews, many=True)
      return Response(serializer.data)

  def post(self, request, format=None):
      serializer = ReviewCeateSerializer(data=request.data)
      if serializer.is_valid():
          serializer.save(user = self.request.user)
          return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReviewDetail(APIView):
  permission_classes = (IsAuthenticated,)

  def get_object(self, pk):
      try:
          return Review.objects.get(pk=pk)
      except Review.DoesNotExist:
          raise Http404

  def get(self, request, pk, format=None):
      review = self.get_object(pk)
      serializer = ReviewListSerializer(review)
      return Response(serializer.data)

  def put(self, request, pk, format=None):
      review = self.get_object(pk)
      serializer = ReviewCeateSerializer(review, data=request.data)
      if serializer.is_valid():
          serializer.save(user = self.request.user)
          return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TagListAPIView(generics.ListAPIView):
    queryset = Flavor.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = FlavorSerializer

    def list(self, request):
        serializer_data = self.get_queryset()
        serializer = self.serializer_class(serializer_data, many=True)

        return Response({
            'tags': serializer.data
        }, status=status.HTTP_200_OK)

class BearListAPIView(APIView):
  permission_classes = (IsAuthenticated,)

  def get(self, request, format=None):
      bears = Bear.objects.all()
      serializer = BearSerializer(bears, many=True)
      return Response(serializer.data)

  def post(self, request, format=None):
      serializer = BearSerializer(data=request.data)
      if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)