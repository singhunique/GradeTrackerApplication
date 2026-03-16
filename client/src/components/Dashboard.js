import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, User, ClipboardList, Send, Trash2, LogOut, 
  LayoutDashboard, Settings, Bell, CheckCircle2 
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Auth Data
  const userEmail = localStorage.getItem('userEmail') || 'Guest';
  const userName = localStorage.getItem('userName') || 'Student';
  const adminEmail = 'your-personal-email@gmail.com'; 
  const [isAdmin, setIsAdmin] = useState(userEmail === adminEmail);

  // State
  const [contributions, setContributions] = useState([
    { id: 1, studentName: 'System', title: 'Tracker.BACK Live', status: 'Active', type: 'system', timestamp: '09:00 AM' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [studentNameInput, setStudentNameInput] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
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
    <div style={containerStyle}>
      {/* --- SIDEBAR --- */}
      <aside style={sidebarStyle}>
        <div style={{ padding: '40px 20px' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '40px' }}>
            Tracker<span style={{ color: '#3b82f6' }}>.</span>B
          </h1>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={navItemActive}><LayoutDashboard size={20} /> Dashboard</div>
            <div style={navItem}><Bell size={20} /> Notifications</div>
            <div style={navItem}><Settings size={20} /> Settings</div>
          </nav>
        </div>
        <button onClick={handleLogout} style={logoutButtonStyle}>
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main style={mainContentStyle}>
        {/* Header */}
        <header style={headerStyle}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>Welcome back, {userName}</h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Here is what's happening with your project.</p>
          </div>
          <button onClick={() => setIsAdmin(!isAdmin)} style={toggleButtonStyle}>
            {isAdmin ? 'ADMIN VIEW' : 'STUDENT VIEW'}
          </button>
        </header>

        {/* Stats Section */}
        <div style={statsGrid}>
          <div style={statCard}>
            <p style={statLabel}>Total Tasks</p>
            <h3 style={statValue}>{contributions.length}</h3>
          </div>
          <div style={statCard}>
            <p style={statLabel}>Role</p>
            <h3 style={{ ...statValue, color: '#3b82f6' }}>{isAdmin ? 'Admin' : 'Member'}</h3>
          </div>
        </div>

        {/* Action Card (Input) */}
        <section style={glassCard}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', marginBottom: '20px' }}>
            <ClipboardList color="#3b82f6" /> {isAdmin ? "Assign New Task" : "Log Contribution"}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {isAdmin && (
              <input 
                value={studentNameInput}
                onChange={(e) => setStudentNameInput(e.target.value)}
                placeholder="Student Name"
                style={inputStyle}
              />
            )}
            <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isAdmin ? "Task details..." : "What did you achieve today?"}
              style={{ ...inputStyle, flex: 2 }}
            />
            <button type="submit" style={sendButtonStyle}><Send size={20} /></button>
          </form>
        </section>

        {/* Feed Section */}
        <h3 style={sectionTitle}>Live Activity Feed</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {contributions.map((item) => (
            <div key={item.id} style={itemCard}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={itemIcon(item.type)}>
                  {item.type === 'assigned' ? <Plus size={18} /> : <CheckCircle2 size={18} />}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px' }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                    <User size={10} style={{ display: 'inline' }} /> {item.studentName} • {item.timestamp}
                  </p>
                </div>
              </div>
              <button onClick={() => setContributions(contributions.filter(c => c.id !== item.id))} style={deleteButtonStyle}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// --- STYLES ---
const containerStyle = { display: 'flex', backgroundColor: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif' };
const sidebarStyle = { width: '260px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#020617' };
const mainContentStyle = { flex: 1, padding: '40px', overflowY: 'auto' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' };
const statsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' };
const glassCard = { background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(59, 130, 246, 0.1)', padding: '30px', borderRadius: '24px', marginBottom: '30px' };
const itemCard = { background: 'rgba(30, 41, 59, 0.3)', padding: '16px 24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const inputStyle = { background: '#020617', border: '1px solid #1e293b', padding: '14px', borderRadius: '12px', color: 'white', outline: 'none' };
const sendButtonStyle = { background: '#3b82f6', color: 'white', border: 'none', padding: '0 20px', borderRadius: '12px', cursor: 'pointer' };
const navItem = { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', color: '#64748b', cursor: 'pointer' };
const navItemActive = { ...navItem, color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px' };
const statCard = { background: 'rgba(15, 23, 42, 0.8)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' };
const statLabel = { color: '#64748b', margin: 0, fontSize: '12px', textTransform: 'uppercase' };
const statValue = { margin: '5px 0 0 0', fontSize: '24px', fontWeight: '800' };
const toggleButtonStyle = { background: '#1e293b', border: 'none', color: '#94a3b8', padding: '8px 16px', borderRadius: '10px', fontSize: '11px', cursor: 'pointer' };
const logoutButtonStyle = { margin: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '20px' };
const sectionTitle = { fontSize: '12px', color: '#475569', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' };
const deleteButtonStyle = { background: 'none', border: 'none', color: '#475569', cursor: 'pointer' };
const itemIcon = (type) => ({ width: '40px', height: '40px', borderRadius: '12px', background: type === 'assigned' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: type === 'assigned' ? '#3b82f6' : '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' });

export default Dashboard;