from django.urls import path
from .views import AnimalListCreateView, AnimalDetailView, check_superuser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("animals/", AnimalListCreateView.as_view(), name="animal-list"),
    path("animals/<int:pk>/", AnimalDetailView.as_view(), name="animal-detail"),
    path('check-superuser/', check_superuser, name='check-superuser'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
