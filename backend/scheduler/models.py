from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_recurring = models.BooleanField(default=False)
    recurrence_rule = models.TextField(blank=True, help_text="e.g. 'FREQ=WEEKLY;BYDAY=MO,WE,FR'")

    def __str__(self):
        return self.title
