from rest_framework import viewsets
from rest_framework.views import APIView  
from .models import Item, OrderItem, Order,Top5Items
from .serializers import ItemSerializer, OrderItemSerializer, OrderSerializer
from django.db import connection
from rest_framework import serializers, status
from rest_framework.response import Response



class Top5APIView(APIView):
    def get(self, request, *args, **kw):
        result = Top5Items.getTop5items()
        response = Response(result, status=status.HTTP_200_OK)
        return response


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class OrderItemViewSet(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    queryset = OrderItem.objects.all()


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
