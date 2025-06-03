import React, { useState, useEffect } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import CalendarView from './components/CalendarView';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // toggle between login/register

  const reload = () => setRefresh((prev) => !prev);
  const handleEdit = (event) => setEditingEvent(event);

  // Check localStorage for token
  useEffect(() => {
    const token = localStorage.getItem('access');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
          {showLogin ? (
            <>
              <LoginForm onLogin={() => setIsAuthenticated(true)} />
              <p className="mt-4 text-sm text-center">
                Don't have an account?{' '}
                <button
                  className="text-blue-600 underline"
                  onClick={() => setShowLogin(false)}
                >
                  Register
                </button>
              </p>
            </>
          ) : (
            <>
              <RegisterForm onSuccess={() => setShowLogin(true)} />
              <p className="mt-4 text-sm text-center">
                Already have an account?{' '}
                <button
                  className="text-blue-600 underline"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">Event Scheduler</h1>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        <button
          onClick={() => setShowCalendar((prev) => !prev)}
          className="text-sm bg-blue-100 px-3 py-1 rounded"
        >
          {showCalendar ? '📋 Show List View' : '📅 Show Calendar View'}
        </button>

        <EventForm
          onSuccess={reload}
          editingEvent={editingEvent}
          setEditingEvent={setEditingEvent}
        />

        <hr className="border-t border-gray-300" />

        {!showCalendar ? (
          <EventList key={refresh} onEdit={handleEdit} />
        ) : (
          <CalendarView onSelectEvent={handleEdit} />
        )}
      </div>
    </div>
  );
}

export default App;
