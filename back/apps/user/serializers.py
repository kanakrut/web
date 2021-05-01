from rest_framework import serializers
from django.contrib.auth import get_user_model

from apps.cart.serializers import CartSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    cart = CartSerializer(read_only=True)

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )

        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'cart', 'password', 'email')
        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

