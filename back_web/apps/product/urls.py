from django.urls import path
from apps.product.views import ProductDetails, Products, Comments, CommentDetails

urlpatterns = [
    path('products/', Products.as_view()),
    path('product/<int:pk>/', ProductDetails.as_view()),
    path('comments/', Comments.as_view()),
    path('comment/<int:pk>/', CommentDetails.as_view()),
]
