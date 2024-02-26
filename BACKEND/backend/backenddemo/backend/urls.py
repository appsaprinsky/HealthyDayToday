from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import CreateUserAPIView, LogoutUserAPIView, HelloView, ProfileView, CaloriesView, PredictionView, ModelView, DashboardView

urlpatterns = [
    path('hello/', HelloView.as_view(), name='hello'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('calories/', CaloriesView.as_view(), name='calories'),
    path('calories/<int:pk>/delete', CaloriesView.as_view(), name='calories-delete'),

    path('predictions/', PredictionView.as_view(), name='predictions'),
    path('model/', ModelView.as_view(), name='model'),

    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('auth/login/', obtain_auth_token, name='auth_user_login'),
    path('auth/register/', CreateUserAPIView.as_view(), name='auth_user_create'),
    path('auth/logout/', LogoutUserAPIView.as_view(),name='auth_user_logout'),
]
