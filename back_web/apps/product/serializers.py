from django.contrib.auth import get_user_model
from rest_framework import serializers
from apps.product.models import Product, Comment
from apps.user.serializers import UserSerializer

User = get_user_model()


class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=200)
    description = serializers.CharField(max_length=300)
    price = serializers.IntegerField()
    img = serializers.CharField(max_length=300)

    def create(self, validated_data):
        print(validated_data)
        return Comment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.img = validated_data.get('img', instance.img)

        instance.save()
        return instance


class CommentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    message = serializers.CharField(max_length=300)
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True, required=False)
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True, required=False)

    def create(self, validated_data):
        validated_data['user'] = User.objects.get(id=validated_data['user_id'])
        validated_data['product'] = Product.objects.get(id=validated_data['product_id'])
        return Comment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.message = validated_data.get('message', instance.message)
        instance.save()
        return instance


