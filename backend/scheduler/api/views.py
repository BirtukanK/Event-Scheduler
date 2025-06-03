from rest_framework import viewsets
from scheduler.models import Event
from scheduler.serializers.event_serializer import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
