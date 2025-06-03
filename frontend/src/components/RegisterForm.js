import React, { useState } from 'react';
import { register } from '../api/auth';

function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      onSuccess?.(); // optional callback
      alert("Registration successful!");
      setForm({ username: '', email: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.email || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full p-2 mb-2 border" />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 mb-2 border" />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 mb-2 border" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}

export default RegisterForm;
