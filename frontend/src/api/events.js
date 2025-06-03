import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const fetchEvents = () => API.get('events/');
export const createEvent = (eventData) => API.post('events/', eventData);
export const updateEvent = (id, data) => API.put(`events/${id}/`, data);
export const deleteEvent = (id) => API.delete(`events/${id}/`);
