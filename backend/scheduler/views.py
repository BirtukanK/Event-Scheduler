from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializers.registerserializers import RegisterSerializer

# Existing Register view
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

# ⬇️ Add this below for recurring event occurrences endpoint
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Event
from .utils.recurrence import generate_occurrences  # make sure this file exists
from datetime import datetime

@api_view(['GET'])
def event_occurrences(request):
    start_str = request.GET.get("from")
    end_str = request.GET.get("to")

    if not start_str or not end_str:
        return Response({"error": "Missing 'from' or 'to' query parameters."}, status=400)

    try:
        start = datetime.fromisoformat(start_str)
        end = datetime.fromisoformat(end_str)
    except ValueError:
        return Response({"error": "Invalid date format. Use ISO format."}, status=400)

    all_events = Event.objects.all()
    occurrences = generate_occurrences(all_events, start, end)
    return Response(occurrences)
