from django.db import models

from apps.cart.models import Cart


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, default="")
    description = models.TextField(default="")
    price = models.IntegerField(default=0)
    img = models.CharField(max_length=200, default="")
    carts = models.ManyToManyField(Cart, blank=True, related_name='products')

    def __str__(self):
        return self.title
