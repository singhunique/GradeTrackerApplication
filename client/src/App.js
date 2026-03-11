import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App min-h-screen bg-slate-50">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Modern Header */}
      <header className="bg-white border-b border-slate-100 py-6 px-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            G
          </div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
            Contribution Tracker
          </h1>
        </div>
        {isLoggedIn && (
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
          >
            Logout
          </button>
        )}
      </header>

      <main className="max-w-7xl mx-auto">
        {/* If not logged in, show Login. If logged in, show Dashboard. */}
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