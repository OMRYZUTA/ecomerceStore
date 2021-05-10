
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers, urls
from backend import views

router = routers.DefaultRouter()
router.register(r'items', views.ItemViewSet)
router.register(r'orderitems', views.OrderItemViewSet)
router.register(r'orders', views.OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/', include(urls, namespace='rest_framework')),
]
