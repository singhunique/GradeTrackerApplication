import React, { useState, useEffect } from 'react';
import { 
  FileText, MonitorPlay, Users, MessageSquare, 
  X, LayoutDashboard, CheckCircle2, Clock, 
  RefreshCcw, Activity, BarChart3, ShieldAlert 
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([{ id: 1, user: "System", text: "Master Terminal Online", time: "Live" }]);
  
  // Master State
  const [team, setTeam] = useState([
    { studentId: 1, name: "Student 1", role: "Documentation Lead", task: "Chapters 1-5", status: "Pending", color: "#f43f5e", icon: <FileText size={20} /> },
    { studentId: 2, name: "Student 2", role: "Visuals & PPT", task: "15 Slides", status: "Pending", color: "#3b82f6", icon: <MonitorPlay size={20} /> },
    { studentId: 3, name: "Student 3", role: "Researcher", task: "Case Studies", status: "Pending", color: "#8b5cf6", icon: <Users size={20} /> }
  ]);

  // Sync with MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/contributions/all');
        const data = await response.json();
        if (data && data.length > 0) {
          setTeam(prevTeam => prevTeam.map(member => {
            const dbMatch = data.find(d => d.studentId === member.studentId);
            return dbMatch ? { ...member, status: dbMatch.status, color: dbMatch.color } : member;
          }));
        }
      } catch (error) { console.error("Master Sync Error:", error); }
    };
    fetchData();
    // Poll every 10 seconds for real-time team updates
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const cycleStatus = async (id) => {
    const statusMap = [
      { status: "Pending", color: "#f43f5e" }, 
      { status: "In Progress", color: "#3b82f6" }, 
      { status: "Done", color: "#10b981" }
    ];
    const member = team.find(m => m.studentId === id);
    const next = statusMap[(statusMap.findIndex(s => s.status === member.status) + 1) % statusMap.length];

    setTeam(team.map(m => m.studentId === id ? { ...m, status: next.status, color: next.color } : m));

    try {
      await fetch(`/api/contributions/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next.status, color: next.color })
      });
      toast.success(`${member.name} Status Synced`);
    } catch (error) { toast.error("Sync Failure"); }
  };

  const handleReset = async () => {
    if (window.confirm("CRITICAL: Wipe all team data and reset project to 0%?")) {
      try {
        await fetch('/api/contributions/reset', { method: 'POST' });
        setTeam(team.map(m => ({ ...m, status: "Pending", color: "#f43f5e" })));
        toast.success("System Purged & Reset");
      } catch (error) { toast.error("Reset Error"); }
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, { id: Date.now(), user: "Admin", text: chatInput, time: "Now" }]);
    setChatInput("");
  };

  const totalDone = team.filter(m => m.status === "Done").length;
  const progressPercent = Math.round((totalDone / 3) * 100);

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      
      {/* --- TOP METRICS BAR --- */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div style={metricCardStyle}><Activity size={18} color="#3b82f6" /> Team Health: <span style={{color: '#10b981', marginLeft: '5px'}}>OPTIMAL</span></div>
        <div style={metricCardStyle}><BarChart3 size={18} color="#8b5cf6" /> Completion: <span style={{marginLeft: '5px'}}>{progressPercent}%</span></div>
        <div style={metricCardStyle}><ShieldAlert size={18} color="#f43f5e" /> Active Conflicts: <span style={{marginLeft: '5px'}}>0</span></div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', margin: 0, letterSpacing: '-2px' }}>
          MASTER<span style={{ color: '#3b82f6' }}>.</span>DASHBOARD
        </h1>
        <p style={{ color: '#64748b', fontWeight: 'bold', marginTop: '10px' }}>PROJECT COMMAND & CONTROL</p>
      </div>

      {/* --- MASTER GRID --- */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        {team.map((member) => (
          <div key={member.studentId} style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(10px)', border: `1px solid ${member.color}20`, borderRadius: '24px', padding: '30px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ color: member.color, background: `${member.color}10`, padding: '10px', borderRadius: '12px' }}>{member.icon}</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{member.name}</h3>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>{member.role.toUpperCase()}</span>
              </div>
              <div style={{ marginLeft: 'auto', background: `${member.color}20`, color: member.color, padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: '900' }}>
                {member.status}
              </div>
            </div>
            
            <div style={{ background: '#0f172a', padding: '15px', borderRadius: '15px', marginBottom: '20px', border: '1px solid #1e293b' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{member.task}</p>
            </div>

            <button onClick={() => cycleStatus(member.studentId)} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #1e293b', background: 'transparent', color: member.color, fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
              OVERRIDE STATUS
            </button>
          </div>
        ))}
      </div>

      {/* --- GLOBAL PROGRESS --- */}
      <div style={{ maxWidth: '1200px', margin: '50px auto', background: 'rgba(15, 23, 42, 0.6)', padding: '40px', borderRadius: '32px', border: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'flex-end' }}>
            <div>
                <h4 style={{ margin: 0, fontSize: '12px', color: '#475569', letterSpacing: '1px' }}>GLOBAL MILESTONES</h4>
                <div style={{ fontSize: '32px', fontWeight: '900' }}>{progressPercent}% <span style={{ fontSize: '14px', color: '#64748b' }}>Complete</span></div>
            </div>
            <button onClick={handleReset} style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', border: '1px solid #f43f5e30', padding: '10px 20px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RefreshCcw size={14} /> SYSTEM RESET
            </button>
        </div>
        <div style={{ width: '100%', height: '10px', background: '#0f172a', borderRadius: '100px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #10b981)', transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
        </div>
      </div>

      {/* --- FAB CHAT --- */}
      <button onClick={() => setIsChatOpen(true)} style={{ position: 'fixed', bottom: '30px', right: '30px', width: '60px', height: '60px', borderRadius: '20px', background: '#3b82f6', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}><MessageSquare size={24} /></button>

      {/* --- CHAT DRAWER --- */}
      {isChatOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: '400px', background: '#0b1120', borderLeft: '1px solid #1e293b', zIndex: 1000, display: 'flex', flexDirection: 'column', animation: 'slideIn 0.3s ease' }}>
          <div style={{ padding: '25px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900' }}>COMMAND LOG</h3>
            <X onClick={() => setIsChatOpen(false)} style={{ cursor: 'pointer', color: '#475569' }} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {messages.map(m => (
              <div key={m.id} style={{ alignSelf: m.user === "Admin" ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                <div style={{ background: m.user === "Admin" ? '#3b82f6' : '#1e293b', padding: '12px 16px', borderRadius: '15px', fontSize: '13px' }}>{m.text}</div>
                <span style={{ fontSize: '9px', color: '#475569', marginTop: '5px', display: 'block' }}>{m.user} • {m.time}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} style={{ padding: '25px', background: '#0f172a' }}>
            <input style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#020617', border: '1px solid #1e293b', color: 'white', boxSizing: 'border-box' }} placeholder="Broadcast to team..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
          </form>
        </div>
      )}
    </div>
  );
};

const metricCardStyle = {
  background: '#0f172a',
  padding: '15px 20px',
  borderRadius: '16px',
  border: '1px solid #1e293b',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '13px',
  fontWeight: '600'
};

export default Dashboard;