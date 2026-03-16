import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import { LogOut, ShieldCheck } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simple conditional rendering - no react-router-dom needed
  return (
    <div style={{ 
      backgroundColor: '#020617', 
      minHeight: '100vh', 
      color: 'white', 
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- CYBER HEADER --- */}
      <header style={{ 
        background: 'rgba(15, 23, 42, 0.8)', 
        backdropFilter: 'blur(12px)', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
        padding: '15px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '35px', height: '35px', background: '#3b82f6', 
            borderRadius: '10px', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)' 
          }}>
            <ShieldCheck size={20} color="white" />
          </div>
          <h1 style={{ fontSize: '18px', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' }}>
            MASTER<span style={{ color: '#3b82f6' }}>.</span>FLOW
          </h1>
        </div>

        {isLoggedIn && (
          <button 
            onClick={() => setIsLoggedIn(false)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', 
              color: '#ef4444', padding: '8px 16px', borderRadius: '12px', 
              fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' 
            }}>
            <LogOut size={14} /> LOGOUT
          </button>
        )}
      </header>

      <main style={{ width: '100%' }}>
        {!isLoggedIn ? (
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
}

export default App;