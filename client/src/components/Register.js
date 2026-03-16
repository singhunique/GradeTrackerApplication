import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, User, Trash2, LogOut, Calendar, ShieldCheck, Lock, CheckCircle2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 1. Get User Info (Anyone who logs in)
  const userName = localStorage.getItem('userName') || 'Guest';
  const userRole = localStorage.getItem('userRole') || 'Student'; 
  const isAdmin = userRole === 'Manager';

  // 2. Tasks State (Saved in Browser Memory)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('group_project_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ title: '', assignedTo: '', deadline: '', category: 'Research' });

  // Save changes automatically
  useEffect(() => {
    localStorage.setItem('group_project_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Manager: Add Task
  const addTask = (e) => {
    e.preventDefault();
    if (!form.title || !form.assignedTo) return toast.error("Please fill in Title and Member");

    const newTask = { 
      id: Date.now(), 
      ...form, 
      status: 'Not Started',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setTasks([newTask, ...tasks]);
    setForm({ title: '', assignedTo: '', deadline: '', category: 'Research' });
    toast.success("Task Assigned!");
  };

  // Anyone: Update Progress
  const toggleStatus = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Not Started' ? 'In Progress' : t.status === 'In Progress' ? 'Completed' : 'Not Started';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* --- HEADER --- */}
        <header style={headerStyle}>
          <div>
            <h1 style={{margin: 0, fontSize: '28px', fontWeight: '900'}}>Project<span style={{color: '#3b82f6'}}>Tracker</span></h1>
            <p style={{color: '#64748b', fontSize: '14px', marginTop: '5px'}}>
              User: <b style={{color: 'white'}}>{userName}</b> | Role: <span style={roleBadge(isAdmin)}>{userRole}</span>
            </p>
          </div>
          <button onClick={() => {localStorage.removeItem('token'); navigate('/')}} style={logoutBtn}>
            <LogOut size={18} /> Logout
          </button>
        </header>

        <div style={dashboardGrid}>
          
          {/* --- LEFT SIDE: MANAGER CONTROLS --- */}
          {isAdmin ? (
            <section style={glassCard}>
              <h3 style={{margin: '0 0 20px 0', fontSize: '18px'}}><Plus size={18} color="#3b82f6"/> Assign Task</h3>
              <form onSubmit={addTask} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <input 
                  placeholder="Task Name (e.g. Write Report)" 
                  value={form.title} 
                  onChange={e => setForm({...form, title: e.target.value})} 
                  style={inputStyle} 
                />
                <input 
                  placeholder="Assign to Member" 
                  value={form.assignedTo} 
                  onChange={e => setForm({...form, assignedTo: e.target.value})} 
                  style={inputStyle} 
                />
                <input 
                  type="date" 
                  value={form.deadline} 
                  onChange={e => setForm({...form, deadline: e.target.value})} 
                  style={inputStyle} 
                />
                <select 
                  value={form.category} 
                  onChange={e => setForm({...form, category: e.target.value})} 
                  style={inputStyle}
                >
                  <option>Research</option>
                  <option>Coding</option>
                  <option>Slides</option>
                  <option>Report</option>
                </select>
                <button type="submit" style={submitBtn}>Assign to Team</button>
              </form>
            </section>
          ) : (
            <div style={studentNotice}>
              <Lock size={24} color="#334155" />
              <p>Only the <b>Manager</b> can create new tasks. You can update your progress on the right.</p>
            </div>
          )}

          {/* --- RIGHT SIDE: TASK FEED --- */}
          <section style={{flex: 1}}>
            <h3 style={sectionLabel}><Clock size={14}/> Active Audit Trail</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              {tasks.length === 0 && <p style={{color: '#475569', textAlign: 'center', marginTop: '40px'}}>No tasks found.</p>}
              
              {tasks.map(task => (
                <div key={task.id} style={taskCard}>
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex', gap: '10px', marginBottom: '8px'}}>
                      <span style={categoryTag}>{task.category}</span>
                      <span style={statusBadge(task.status)} onClick={() => toggleStatus(task.id)}>
                        {task.status}
                      </span>
                    </div>
                    <h4 style={{margin: '0 0 5px 0', fontSize: '18px'}}>{task.title}</h4>
                    <p style={{fontSize: '12px', color: '#64748b', margin: 0}}>
                      <User size={12} style={{verticalAlign: 'middle'}}/> {task.assignedTo} | Due: {task.deadline || 'TBD'}
                    </p>
                  </div>
                  {isAdmin && (
                    <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} style={deleteBtn}>
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const containerStyle = { background: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' };
const dashboardGrid = { display: 'flex', gap: '40px', flexWrap: 'wrap' };
const glassCard = { background: 'rgba(15, 23, 42, 0.6)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(59, 130, 246, 0.2)', width: '320px' };
const studentNotice = { width: '320px', background: 'rgba(15, 23, 42, 0.3)', padding: '40px 20px', borderRadius: '24px', textAlign: 'center', color: '#475569', border: '1px dashed #1e293b' };
const inputStyle = { background: '#020617', border: '1px solid #1e293b', padding: '12px', borderRadius: '12px', color: 'white', outline: 'none', fontSize: '14px' };
const submitBtn = { background: '#3b82f6', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const taskCard = { background: 'rgba(30, 41, 59, 0.3)', padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.05)' };
const sectionLabel = { fontSize: '12px', color: '#475569', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' };
const categoryTag = { fontSize: '10px', background: '#1e293b', padding: '2px 8px', borderRadius: '6px', color: '#94a3b8' };
const logoutBtn = { background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' };
const deleteBtn = { background: 'none', border: 'none', color: '#334155', cursor: 'pointer', padding: '10px' };
const roleBadge = (isAdmin) => ({ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: isAdmin ? '#3b82f6' : '#1e293b', color: 'white', marginLeft: '5px' });

const statusBadge = (status) => ({
  fontSize: '10px', padding: '2px 8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold',
  background: status === 'Completed' ? 'rgba(16, 185, 129, 0.2)' : status === 'In Progress' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(148, 163, 184, 0.2)',
  color: status === 'Completed' ? '#10b981' : status === 'In Progress' ? '#f59e0b' : '#94a3b8'
});

export default Dashboard;