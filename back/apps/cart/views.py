from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from apps.cart.models import Cart
from apps.cart.serializers import CartSerializer


class Carts(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class CartDetails(generics.RetrieveDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated, ]
