from django.urls import path
from apps.product.views import ProductDetails, Products


urlpatterns = [
    path('products/', Products.as_view()),
    path('product/<int:pk>/', ProductDetails.as_view()),
]
