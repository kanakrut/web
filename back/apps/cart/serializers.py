from rest_framework import serializers
from apps.cart.models import Cart
from apps.product.serializers import ProductSerializer


class CartSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'
