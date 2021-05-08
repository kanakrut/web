from django.urls import path

from apps.user.views import UserList, user_info_by_token, log_in, log_out

urlpatterns = [
    path('users/', UserList.as_view()),
    path('userInfo/', user_info_by_token),
    path('logIn/', log_in),
    path('logOut/', log_out),
]