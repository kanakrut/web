from rest_framework import serializers
from apps.product.models import Product


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
