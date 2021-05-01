from django.urls import path, include
from apps.cart.views import Carts, CartDetails

urlpatterns = [
    path('carts/', Carts.as_view()),
    path('cart/<int:pk>/', CartDetails.as_view()),
]
