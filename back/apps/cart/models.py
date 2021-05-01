from django.db import models
from django.contrib.auth.models import User


class Cart(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username + '\' cart'
