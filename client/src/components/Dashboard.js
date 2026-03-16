import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
iimport { 
  Plus, User, Trash2, LogOut, Calendar, 
  ShieldCheck, Lock, CheckCircle2, Clock, Activity // <-- ADD 'Activity' HERE
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Student';

  // --- STEP 1 & 2: STATE & PERSISTENCE ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('group_project_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ title: '', assignedTo: '', deadline: '', category: 'Research' });

  useEffect(() => {
    localStorage.setItem('group_project_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // --- STEP 2: TASK ASSIGNMENT LOGIC ---
  const addTask = (e) => {
    e.preventDefault();
    if (!form.title || !form.assignedTo) return toast.error("Fill in Title and Member");

    const newTask = {
      ...form,
      id: Date.now(),
      status: 'Not Started', // Step 3 Initial State
      createdAt: new Date().toLocaleDateString()
    };

    setTasks([newTask, ...tasks]);
    setForm({ title: '', assignedTo: '', deadline: '', category: 'Research' });
    toast.success(`Task assigned to ${form.assignedTo}`);
  };

  // --- STEP 3: PROGRESS TRACKING LOGIC ---
  const toggleStatus = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const statuses = ['Not Started', 'In Progress', 'Completed'];
        const nextIndex = (statuses.indexOf(task.status) + 1) % statuses.length;
        return { ...task, status: statuses[nextIndex] };
      }
      return task;
    }));
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Header */}
        <header style={headerStyle}>
          <h1>Project Tracker<span style={{color: '#3b82f6'}}>.</span></h1>
          <button onClick={() => {localStorage.clear(); navigate('/')}} style={logoutBtn}>
            <LogOut size={16} /> Logout
          </button>
        </header>

        <div style={dashboardGrid}>
          
          {/* LEFT: STEP 1 & 2 (Creation & Assignment) */}
          <section style={glassCard}>
            <h3 style={cardTitle}><Plus size={18} /> Assign New Task</h3>
            <form onSubmit={addTask} style={formStyle}>
              <input 
                placeholder="Task Title (e.g., Design Slides)" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
                style={inputStyle} 
              />
              <input 
                placeholder="Assign to Member Name" 
                value={form.assignedTo} 
                onChange={e => setForm({...form, assignedTo: e.target.value})} 
                style={inputStyle} 
              />
              <div style={{display: 'flex', gap: '10px'}}>
                <input 
                  type="date" 
                  value={form.deadline} 
                  onChange={e => setForm({...form, deadline: e.target.value})} 
                  style={{...inputStyle, flex: 1}} 
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
              </div>
              <button type="submit" style={submitBtn}>Confirm Assignment</button>
            </form>
          </section>

          {/* RIGHT: STEP 3 (Progress Tracking Feed) */}
          <section style={{flex: 1}}>
            <h3 style={sectionLabel}><Activity size={16} /> Live Project Status</h3>
            {tasks.length === 0 && <p style={{color: '#475569', textAlign: 'center'}}>No tasks assigned yet.</p>}
            
            <div style={taskFeed}>
              {tasks.map(task => (
                <div key={task.id} style={taskCard}>
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px'}}>
                      <span style={categoryTag}>{task.category}</span>
                      <span style={statusBadge(task.status)} onClick={() => toggleStatus(task.id)}>
                        {task.status}
                      </span>
                    </div>
                    <h4 style={{margin: '0 0 8px 0', fontSize: '18px'}}>{task.title}</h4>
                    <div style={metaRow}>
                      <User size={12} /> <span>{task.assignedTo}</span>
                      <Calendar size={12} style={{marginLeft: '10px'}} /> <span>Due: {task.deadline || 'No date'}</span>
                    </div>
                  </div>
                  <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} style={deleteBtn}>
                    <Trash2 size={18} />
                  </button>
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
const containerStyle = { background: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' };
const dashboardGrid = { display: 'flex', gap: '40px', alignItems: 'flex-start' };
const glassCard = { background: 'rgba(15, 23, 42, 0.6)', padding: '30px', borderRadius: '32px', border: '1px solid rgba(59, 130, 246, 0.2)', width: '350px', position: 'sticky', top: '20px' };
const cardTitle = { display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 20px 0', fontSize: '18px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { background: '#020617', border: '1px solid #1e293b', padding: '12px', borderRadius: '12px', color: 'white', outline: 'none', fontSize: '14px' };
const submitBtn = { background: '#3b82f6', color: 'white', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const sectionLabel = { fontSize: '12px', color: '#475569', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' };
const taskFeed = { display: 'flex', flexDirection: 'column', gap: '15px' };
const taskCard = { background: 'rgba(30, 41, 59, 0.4)', padding: '20px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const categoryTag = { fontSize: '10px', background: '#1e293b', padding: '2px 8px', borderRadius: '6px', color: '#94a3b8' };
const metaRow = { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#64748b' };
const deleteBtn = { background: 'none', border: 'none', color: '#334155', cursor: 'pointer' };
const logoutBtn = { background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' };

const statusBadge = (status) => ({
  fontSize: '10px',
  padding: '2px 8px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  background: status === 'Completed' ? 'rgba(16, 185, 129, 0.2)' : status === 'In Progress' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(148, 163, 184, 0.2)',
  color: status === 'Completed' ? '#10b981' : status === 'In Progress' ? '#f59e0b' : '#94a3b8'
});

export default Dashboard;