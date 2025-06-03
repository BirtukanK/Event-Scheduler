from dateutil.rrule import rrule, WEEKLY, MONTHLY, DAILY, YEARLY
from dateutil.rrule import MO, TU, WE, TH, FR, SA, SU
from datetime import datetime

WEEKDAYS = [MO, TU, WE, TH, FR, SA, SU]

def generate_occurrences(event, start_range, end_range):
    if not event.is_recurring or not event.recurrence_rule:
        return []

    freq_map = {
        "daily": DAILY,
        "weekly": WEEKLY,
        "monthly": MONTHLY,
        "yearly": YEARLY
    }

    rule_data = event.recurrence_rule
    frequency = freq_map.get(rule_data.get("frequency"))
    interval = rule_data.get("interval", 1)
    byweekday = [WEEKDAYS[i] for i in rule_data.get("byweekday", [])]
    bysetpos = rule_data.get("bysetpos")

    rrule_args = {
        "freq": frequency,
        "dtstart": event.start_time,
        "until": end_range,
        "interval": interval,
    }

    if byweekday:
        rrule_args["byweekday"] = byweekday
    if bysetpos:
        rrule_args["bysetpos"] = bysetpos

    occurrences = list(rrule(**rrule_args))

    return [
        {
            "title": event.title,
            "start": occ,
            "end": occ + (event.end_time - event.start_time),
            "event_id": event.id
        }
        for occ in occurrences if start_range <= occ <= end_range
    ]
