import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for logout
import { Plus, CheckCircle2, User, ClipboardList, Send, Trash2, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 1. Get info from localStorage
  const userEmail = localStorage.getItem('userEmail') || 'Guest';
  const userName = localStorage.getItem('userName') || 'Student';

  // 2. State for Admin Toggle (Fixing the crash)
  const adminEmail = 'your-personal-email@gmail.com'; 
  const [isAdmin, setIsAdmin] = useState(userEmail === adminEmail);

  const [contributions, setContributions] = useState([
    { id: 1, studentName: 'System', title: 'Contribution Tracker Live', status: 'Active', type: 'system' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [studentNameInput, setStudentNameInput] = useState('');

  const handleLogout = () => {
    localStorage.clear(); // Clears token, email, and name
    toast.success('Logged out');
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newEntry = {
      id: Date.now(),
      studentName: isAdmin ? (studentNameInput || "Team Member") : userName,
      title: inputValue,
      status: 'Pending',
      type: isAdmin ? 'assigned' : 'self',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setContributions([newEntry, ...contributions]);
    setInputValue('');
    setStudentNameInput('');
    toast.success(isAdmin ? 'Task Assigned!' : 'Contribution Tracked!');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
      
      {/* --- HEADER & LOGOUT --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '24px', margin: 0 }}>Project Hub</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Welcome, {userName}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            style={{ background: '#334155', color: '#94a3b8', border: 'none', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontSize: '11px' }}>
            {isAdmin ? 'ADMIN VIEW' : 'STUDENT VIEW'} (Toggle)
          </button>
          <button 
            onClick={handleLogout}
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* --- INPUT SECTION --- */}
      <div style={{ 
        background: 'rgba(15, 23, 42, 0.8)', 
        padding: '30px', 
        borderRadius: '30px', 
        border: '1px solid rgba(59, 130, 246, 0.2)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        marginBottom: '40px'
      }}>
        <h2 style={{ fontSize: '22px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ClipboardList color="#3b82f6" /> 
          {isAdmin ? "Assign Project Task" : "Add Your Contribution"}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {isAdmin && (
            <input 
              value={studentNameInput}
              onChange={(e) => setStudentNameInput(e.target.value)}
              placeholder="Enter Student Name (e.g. Sarah Smith)"
              style={{ padding: '15px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: 'white' }}
            />
          )}
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isAdmin ? "Task Title (e.g. Final Presentation Slides)" : "What did you work on? (e.g. Fixed Header CSS)"}
              style={{ flex: 1, padding: '15px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: 'white' }}
            />
            <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0 25px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* --- FEED SECTION --- */}
      <h3 style={{ fontSize: '14px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>
        Live Contribution Feed
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {contributions.map((item) => (
          <div key={item.id} style={{ 
            background: 'rgba(30, 41, 59, 0.4)', 
            padding: '20px', 
            borderRadius: '20px', 
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                <span style={{ 
                  fontSize: '10px', 
                  padding: '2px 8px', 
                  borderRadius: '10px', 
                  background: item.type === 'assigned' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                  color: item.type === 'assigned' ? '#3b82f6' : '#10b981',
                  fontWeight: 'bold'
                }}>
                  {item.type === 'assigned' ? 'ADMIN ASSIGNED' : item.type === 'system' ? 'SYSTEM' : 'STUDENT ADDED'}
                </span>
              </div>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{item.title}</h4>
              <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <User size={12} /> {item.studentName}
              </div>
            </div>
            
            {/* Only Admin or the System should probably delete, but here is your trash icon */}
            <button 
              onClick={() => setContributions(contributions.filter(c => c.id !== item.id))}
              style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;