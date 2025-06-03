import React, { useEffect, useState } from 'react';
import { fetchEvents, deleteEvent } from '../api/events'; // make sure deleteEvent exists

function EventList({ onEdit, refresh }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
    } catch (err) {
      console.error('Failed to delete event:', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4" >Scheduled Events</h2>
      <ul className="space-y-4" >
        {events.map((event) => (
          <li key={event.id}
          className="p-4 border rounded-lg bg-gray-50 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <div>
              <strong className="text-lg" >{event.title}</strong> 
              <div className="text-sm text-gray-600">
                {new Date(event.start_time).toLocaleString()} – {new Date(event.end_time).toLocaleString()}
              </div>
            </div>

            <div className="mt-2 sm:mt-0 flex space-x-2">
              <button
                onClick={() => onEdit(event)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
              >
                ✏️ Edit
              </button>

              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-500 hover:bg-red-600 text-black px-3 py-1 rounded"
              >
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
