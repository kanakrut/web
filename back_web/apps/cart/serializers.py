from rest_framework import serializers
from apps.cart.models import Cart


class CartSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'
