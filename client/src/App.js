import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#282c34', color: 'white', textAlign: 'center' }}>
        <h1>Group Project Contribution Tracker</h1>
      </header>
      <main style={{ padding: '20px' }}>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;