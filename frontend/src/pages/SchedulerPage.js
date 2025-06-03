import React, { useState } from 'react';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import CalendarView from '../components/CalendarView';

function SchedulerPage() {
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [refresh, setRefresh] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const toggleView = () => {
    setView(view === 'list' ? 'calendar' : 'list');
  };

  const handleSuccess = () => {
    setRefresh(!refresh);
    setEditingEvent(null); // Reset form
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  return (
    <div>
      <h1>Event Scheduler</h1>
      <button onClick={toggleView}>
        Switch to {view === 'list' ? 'Calendar View' : 'List View'}
      </button>

      <EventForm onSuccess={handleSuccess} eventToEdit={editingEvent} />

      {view === 'list' ? (
        <EventList onEdit={handleEdit} refresh={refresh} />
      ) : (
        <CalendarView />
      )}
    </div>
  );
}

export default SchedulerPage;
