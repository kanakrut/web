from django.db import models
from django.contrib.auth.models import User

from apps.product.models import Product


class Cart(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, blank=True, related_name='cart')

    def __str__(self):
        return self.user.username + '\' cart'
