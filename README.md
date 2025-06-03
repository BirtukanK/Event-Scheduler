# Event Scheduler Web Application

A full-stack event scheduler web app built with Django (DRF) and React. Supports user registration, login, and event scheduling with complex recurrence rules (daily, weekly, monthly, etc.). Fully containerized using Docker.

## Features

- User authentication (JWT)
- Create, update, delete events
- Recurring event support using iCal RRULEs
- List view and calendar view
- Fully Dockerized with PostgreSQL backend
- Admin panel for superuser management

---

## Tech Stack

### Backend:
- Django 4.2.21
- Django REST Framework
- PostgreSQL
- Gunicorn
- python-dateutil (for RRULE recurrence)
- Docker

### Frontend:
- React 18
- TailwindCSS
- Axios
- FullCalendar
- Docker + Nginx

---
## Run with Docker

### 1. Build and start containers

```bash
docker-compose up --build
```

Then open the app through
Frontend (React + Nginx): http://localhost:3001

Backend (Django API): http://localhost:8001

Admin Panel: http://localhost:8001/admin

## Author
Built by: Birtukan Kuma

