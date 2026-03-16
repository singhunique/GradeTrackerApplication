import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#020617', 
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Catch-all: Redirect to Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;