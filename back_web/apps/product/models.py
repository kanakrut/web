from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, default="")
    description = models.TextField(default="")
    price = models.IntegerField(default=0)
    img = models.CharField(max_length=200, default="")

    def __str__(self):
        return self.title


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    message = models.CharField(max_length=100, default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.message
