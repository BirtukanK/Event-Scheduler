import React, { useEffect, useState } from 'react';
import { createEvent, updateEvent } from '../api/events';

const weekdayOptions = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

function EventForm({ onSuccess, editingEvent, setEditingEvent }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    is_recurring: false,
    frequency: '',
    interval: 1,
    weekdays: [],
    bysetpos: '',
  });

  useEffect(() => {
    if (editingEvent) {
      setForm({
        ...editingEvent,
        frequency: '',
        interval: 1,
        weekdays: [],
        bysetpos: '',
      });
    }
  }, [editingEvent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'weekdays') {
      const newDays = checked
        ? [...form.weekdays, value]
        : form.weekdays.filter((day) => day !== value);
      setForm({ ...form, weekdays: newDays });
    } else {
      setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let recurrence_rule = '';
    if (form.is_recurring && form.frequency) {
      const rruleParts = [`FREQ=${form.frequency}`];
      if (form.interval) rruleParts.push(`INTERVAL=${form.interval}`);
      if (form.weekdays.length) rruleParts.push(`BYDAY=${form.weekdays.join(',')}`);
      if (form.bysetpos) rruleParts.push(`BYSETPOS=${form.bysetpos}`);
      recurrence_rule = rruleParts.join(';');
    }

    const payload = {
      ...form,
      recurrence_rule,
    };

    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, payload);
      } else {
        await createEvent(payload);
      }
      onSuccess();
      setEditingEvent(null);
      setForm({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        is_recurring: false,
        frequency: '',
        interval: 1,
        weekdays: [],
        bysetpos: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setForm({
      title: '',
      description: '',
      start_time: '',
      end_time: '',
      is_recurring: false,
      frequency: '',
      interval: 1,
      weekdays: [],
      bysetpos: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">{editingEvent ? 'Edit Event' : 'Create Event'}</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="start_time"
        type="datetime-local"
        value={form.start_time}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="end_time"
        type="datetime-local"
        value={form.end_time}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="is_recurring"
          checked={form.is_recurring}
          onChange={handleChange}
        />
        <span>Recurring Event</span>
      </label>

      {form.is_recurring && (
        <div className="space-y-2 border rounded p-4 bg-gray-50">
          <select
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Frequency</option>
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
          </select>

          <input
            type="number"
            name="interval"
            value={form.interval}
            onChange={handleChange}
            min="1"
            className="w-full border px-3 py-2 rounded"
            placeholder="Interval (e.g. every 2 weeks)"
          />

          <div className="flex flex-wrap gap-2">
            {weekdayOptions.map((day) => (
              <label key={day} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  name="weekdays"
                  value={day}
                  checked={form.weekdays.includes(day)}
                  onChange={handleChange}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>

          
        </div>
      )}

      <div className="flex space-x-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingEvent ? 'Update Event' : 'Add Event'}
        </button>
        {editingEvent && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="text-red-500 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EventForm;
