import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, User, Trash2, LogOut, Calendar, ShieldCheck, Lock, CheckCircle2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // --- SAFETY CHECK 1: Protect the Route ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  // --- DATA LOADING ---
  const userName = localStorage.getItem('userName') || 'Guest';
  const userRole = localStorage.getItem('userRole') || 'Student'; // Default to Student if missing
  const isAdmin = userRole === 'Manager' || userRole === 'Admin';

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('group_project_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse tasks", e);
      return [];
    }
  });

  const [form, setForm] = useState({ title: '', assignedTo: '', deadline: '', category: 'Research' });

  useEffect(() => {
    localStorage.setItem('group_project_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Task title required");
    
    const newTask = { 
      id: Date.now(), 
      ...form, 
      status: 'Not Started'
    };
    
    setTasks([newTask, ...tasks]);
    setForm({ title: '', assignedTo: '', deadline: '', category: 'Research' });
    toast.success("Task Added!");
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const next = t.status === 'Not Started' ? 'In Progress' : t.status === 'In Progress' ? 'Completed' : 'Not Started';
        return { ...t, status: next };
      }
      return t;
    }));
  };

  // If page is still loading or redirecting, show a simple background
  if (!localStorage.getItem('token')) return <div style={{background: '#020617', minHeight: '100vh'}}></div>;

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        
        <header style={headerStyle}>
          <div>
            <h1 style={{margin: 0, fontSize: '24px'}}>Project Tracker</h1>
            <p style={{color: '#64748b', fontSize: '13px'}}>User: {userName} | Role: {userRole}</p>
          </div>
          <button onClick={() => {localStorage.clear(); navigate('/')}} style={logoutBtn}>
            <LogOut size={18} /> Logout
          </button>
        </header>

        <div style={dashboardGrid}>
          {isAdmin && (
            <section style={glassCard}>
              <h3 style={{margin: '0 0 15px 0'}}>Assign Task</h3>
              <form onSubmit={addTask} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <input placeholder="Task Name" value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={inputStyle} />
                <input placeholder="Member Name" value={form.assignedTo} onChange={e => setForm({...form, assignedTo: e.target.value})} style={inputStyle} />
                <input type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} style={inputStyle} />
                <button type="submit" style={submitBtn}>Add Task</button>
              </form>
            </section>
          )}

          <section style={{flex: 1}}>
            <h3 style={sectionLabel}>Task Feed</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {tasks.length === 0 && <p style={{color: '#334155'}}>No tasks yet.</p>}
              {tasks.map(task => (
                <div key={task.id} style={taskCard}>
                  <div style={{flex: 1}}>
                    <span style={statusBadge(task.status)} onClick={() => toggleStatus(task.id)}>{task.status}</span>
                    <h4 style={{margin: '10px 0 5px 0'}}>{task.title}</h4>
                    <p style={{fontSize: '12px', color: '#64748b'}}>{task.assignedTo} | Due: {task.deadline}</p>
                  </div>
                  {isAdmin && <Trash2 size={18} onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} style={{cursor: 'pointer', color: '#334155'}} />}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// --- MINIMAL STYLES ---
const containerStyle = { background: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' };
const dashboardGrid = { display: 'flex', gap: '30px', flexWrap: 'wrap' };
const glassCard = { background: '#0f172a', padding: '20px', borderRadius: '15px', border: '1px solid #1e293b', width: '280px' };
const inputStyle = { background: '#020617', border: '1px solid #1e293b', padding: '10px', borderRadius: '8px', color: 'white' };
const submitBtn = { background: '#3b82f6', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const taskCard = { background: '#0f172a', padding: '15px', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center' };
const sectionLabel = { fontSize: '12px', color: '#475569', textTransform: 'uppercase', marginBottom: '15px' };
const logoutBtn = { background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' };
const statusBadge = (s) => ({ fontSize: '9px', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', background: s === 'Completed' ? '#10b981' : '#f59e0b', color: 'white' });

export default Dashboard;