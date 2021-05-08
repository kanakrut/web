from django.contrib import admin
from django.contrib.auth.models import User

from apps.user.models import Profile

admin.register(User)
admin.register(Profile)
