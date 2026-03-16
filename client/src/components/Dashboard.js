import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, User, ClipboardList, Send, Trash2, LogOut, 
  LayoutDashboard, Bell, Settings, CheckCircle2, 
  Activity, Zap, Shield
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // --- AUTH LOGIC ---
  const userEmail = localStorage.getItem('userEmail') || 'Guest';
  const userName = localStorage.getItem('userName') || 'Student';
  const adminEmail = 'your-personal-email@gmail.com'; // Change this to your email
  const [isAdmin, setIsAdmin] = useState(userEmail === adminEmail);

  // --- STATE ---
  const [contributions, setContributions] = useState([
    { id: 1, studentName: 'System', title: 'Portal Security Active', status: 'Active', type: 'system', timestamp: '09:00 AM' },
    { id: 2, studentName: 'Admin', title: 'Welcome to Tracker.BACK', status: 'Active', type: 'assigned', timestamp: '09:05 AM' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [studentNameInput, setStudentNameInput] = useState('');

  // --- ACTIONS ---
  const handleLogout = () => {
    localStorage.clear();
    toast.success('Securely logged out');
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newEntry = {
      id: Date.now(),
      studentName: isAdmin ? (studentNameInput || "Team Member") : userName,
      title: inputValue,
      type: isAdmin ? 'assigned' : 'self',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setContributions([newEntry, ...contributions]);
    setInputValue('');
    setStudentNameInput('');
    toast.success(isAdmin ? 'Task Assigned Successfully!' : 'Contribution Logged!');
  };

  const deleteContribution = (id) => {
    setContributions(contributions.filter(c => c.id !== id));
    toast.error('Entry removed');
  };

  return (
    <div style={containerStyle}>
      {/* --- SIDEBAR --- */}
      <aside style={sidebarStyle}>
        <div style={{ padding: '40px 24px' }}>
          <div style={logoStyle}>
            <Shield size={24} color="#3b82f6" />
            <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-1px' }}>
              Tracker<span style={{ color: '#3b82f6' }}>.</span>B
            </span>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={navItemActive}><LayoutDashboard size={18} /> Overview</div>
            <div style={navItem}><Activity size={18} /> Analytics</div>
            <div style={navItem}><Bell size={18} /> Updates</div>
            <div style={navItem}><Settings size={18} /> Settings</div>
          </nav>
        </div>

        <button onClick={handleLogout} style={logoutButtonStyle}>
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main style={mainContentStyle}>
        {/* Header Section */}
        <header style={headerStyle}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: '800', margin: 0, letterSpacing: '-1px' }}>
              Dashboard
            </h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
              Welcome back, <span style={{ color: 'white', fontWeight: '600' }}>{userName}</span>
            </p>
          </div>
          <button onClick={() => setIsAdmin(!isAdmin)} style={roleToggleStyle}>
            VIEWING AS: {isAdmin ? 'ADMIN' : 'STUDENT'}
          </button>
        </header>

        {/* Stats Grid */}
        <div style={statsGrid}>
          <div style={statCard}>
            <div style={statIconBox}><Zap size={20} color="#3b82f6" /></div>
            <div>
              <p style={statLabel}>Current Tasks</p>
              <h3 style={statValue}>{contributions.length}</h3>
            </div>
          </div>
          <div style={statCard}>
            <div style={statIconBox}><User size={20} color="#10b981" /></div>
            <div>
              <p style={statLabel}>Active Role</p>
              <h3 style={statValue}>{isAdmin ? 'Manager' : 'Contributor'}</h3>
            </div>
          </div>
        </div>

        {/* Action Section (Glassmorphism Input) */}
        <section style={glassCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px' }}>
              <Plus size={20} color="#3b82f6" />
            </div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>
              {isAdmin ? "Assign New Objective" : "Log New Achievement"}
            </h3>
          </div>

          <form onSubmit={handleSubmit} style={formStyle}>
            {isAdmin && (
              <input 
                value={studentNameInput}
                onChange={(e) => setStudentNameInput(e.target.value)}
                placeholder="Student Name..."
                style={inputStyle}
              />
            )}
            <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isAdmin ? "Describe the task..." : "What did you work on today?"}
              style={{ ...inputStyle, flex: 2 }}
            />
            <button type="submit" style={submitButtonStyle}>
              <Send size={18} />
            </button>
          </form>
        </section>

        {/* Activity Feed */}
        <h3 style={sectionLabelStyle}>Live Activity Stream</h3>
        <div style={feedContainer}>
          {contributions.length === 0 ? (
            <p style={{ color: '#475569', textAlign: 'center', padding: '40px' }}>No activity yet.</p>
          ) : (
            contributions.map((item) => (
              <div key={item.id} style={itemCardStyle}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={itemIconCircle(item.type)}>
                    {item.type === 'assigned' ? <Plus size={16} /> : <CheckCircle2 size={16} />}
                  </div>
                  <div>
                    <h4 style={itemTitleStyle}>{item.title}</h4>
                    <p style={itemMetaStyle}>
                      <User size={12} /> {item.studentName} • {item.timestamp}
                    </p>
                  </div>
                </div>
                <button onClick={() => deleteContribution(item.id)} style={deleteBtnStyle}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

// --- STYLES OBJECT ---
const containerStyle = { display: 'flex', backgroundColor: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'Inter, system-ui, sans-serif' };

const sidebarStyle = { width: '280px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#020617', position: 'sticky', top: 0, height: '100vh' };

const logoStyle = { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' };

const mainContentStyle = { flex: 1, padding: '40px 60px', maxWidth: '1200px', margin: '0 auto' };

const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' };

const statsGrid = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '48px' };

const statCard = { background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '16px' };

const statIconBox = { width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' };

const glassCard = { background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '32px', borderRadius: '32px', marginBottom: '48px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' };

const formStyle = { display: 'flex', gap: '12px' };

const inputStyle = { background: '#020617', border: '1px solid #1e293b', padding: '16px 20px', borderRadius: '16px', color: 'white', outline: 'none', fontSize: '14px', transition: 'border 0.2s' };

const submitButtonStyle = { background: '#3b82f6', color: 'white', border: 'none', width: '56px', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' };

const navItem = { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', color: '#64748b', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'all 0.2s' };

const navItemActive = { ...navItem, color: '#3b82f6', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '14px' };

const itemCardStyle = { background: 'rgba(15, 23, 42, 0.3)', padding: '20px 24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' };

const itemTitleStyle = { margin: 0, fontSize: '16px', fontWeight: '600', color: '#f1f5f9' };

const itemMetaStyle = { margin: '4px 0 0 0', fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' };

const logoutButtonStyle = { margin: '32px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '16px', cursor: 'pointer', fontWeight: '700' };

const roleToggleStyle = { background: '#0f172a', border: '1px solid #1e293b', color: '#94a3b8', padding: '10px 20px', borderRadius: '12px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', letterSpacing: '0.5px' };

const deleteBtnStyle = { background: 'none', border: 'none', color: '#334155', cursor: 'pointer', transition: 'color 0.2s' };

const itemIconCircle = (type) => ({ width: '36px', height: '36px', borderRadius: '10px', background: type === 'assigned' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: type === 'assigned' ? '#3b82f6' : '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' });

const statLabel = { color: '#64748b', margin: 0, fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' };

const statValue = { margin: '4px 0 0 0', fontSize: '22px', fontWeight: '800' };

const sectionLabelStyle = { fontSize: '12px', color: '#475569', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px', fontWeight: '700' };

const feedContainer = { display: 'flex', flexDirection: 'column' };

export default Dashboard;