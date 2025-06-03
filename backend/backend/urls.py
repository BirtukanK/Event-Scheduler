from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from scheduler.views import RegisterView, event_occurrences

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('scheduler.api.urls')),
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('events/occurrences/', event_occurrences, name='event-occurrences'),   
]
