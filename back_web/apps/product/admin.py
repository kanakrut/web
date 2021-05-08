from django.contrib import admin

from apps.product.models import Product, Comment

admin.site.register(Product)
admin.site.register(Comment)
