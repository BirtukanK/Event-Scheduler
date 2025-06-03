import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { fetchEvents } from '../api/events';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarView({ onSelectEvent }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then((res) => {
        const formattedEvents = res.data.map((event) => ({
          ...event, // Keep all fields for editing
          title: event.title,
          start: new Date(event.start_time),
          end: new Date(event.end_time),
          allDay: false,
        }));
        setEvents(formattedEvents);
      })
      .catch((err) => console.error('Failed to fetch events:', err));
  }, []);

  return (
    <div className="mt-10">
    <h2 className="text-xl font-semibold mb-4">Calendar View</h2>
    <div className="h-[600px] border rounded shadow bg-white p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={onSelectEvent} 
      />
    </div>
  </div>
  );
}

export default CalendarView;
