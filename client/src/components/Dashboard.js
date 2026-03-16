import React, { useState } from 'react';
import { FileText, MonitorPlay, Users, CheckCircle, Clock, MessageSquare, Send, X, RefreshCcw, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, user: "Student 3", text: "Finished the research charts! 📊", time: "10:15 AM" },
    { id: 2, user: "Student 1", text: "Got it. Adding to Chapter 3 now.", time: "10:20 AM" }
  ]);

  // 1. Live State for 3-Student Team
  const [team, setTeam] = useState([
    { 
      id: 1, 
      name: "Student 1", 
      role: "Documentation Lead", 
      task: "Writing Chapters 1-5 & References", 
      status: "Done", 
      color: "#10b981", 
      icon: <FileText size={28} /> 
    },
    { 
      id: 2, 
      name: "Student 2", 
      role: "Visuals & PPT", 
      task: "Designing 15 Interactive Slides", 
      status: "In Progress", 
      color: "#3b82f6", 
      icon: <MonitorPlay size={28} /> 
    },
    { 
      id: 3, 
      name: "Student 3", 
      role: "Data Researcher", 
      task: "Gathering Case Studies & Stats", 
      status: "Pending", 
      color: "#f43f5e", 
      icon: <Users size={28} /> 
    }
  ]);

  // 2. Logic: Cycle Status & Color on Click
  const cycleStatus = (id) => {
    const statusMap = [
      { status: "Pending", color: "#f43f5e" },
      { status: "In Progress", color: "#3b82f6" },
      { status: "Done", color: "#10b981" }
    ];

    setTeam(team.map(member => {
      if (member.id === id) {
        const currentIndex = statusMap.findIndex(s => s.status === member.status);
        const next = statusMap[(currentIndex + 1) % statusMap.length];
        return { ...member, status: next.status, color: next.color };
      }
      return member;
    }));
  };

  // 3. Logic: Send Message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = { id: Date.now(), user: "You", text: chatInput, time: "Just now" };
    setMessages([...messages, newMsg]);
    setChatInput("");
  };

  // Calculate Progress %
  const totalDone = team.filter(m => m.status === "Done").length;
  const progressPercent = Math.round((totalDone / 3) * 100);

  return (
    <div style={{ 
      backgroundColor: '#020617', 
      minHeight: '100vh', 
      color: '#f8fafc', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundImage: `radial-gradient(circle at top right, rgba(59, 130, 246, 0.08), transparent), url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
      padding: '40px 20px'
    }}>
      
      {/* --- HEADER --- */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '100px', color: '#60a5fa', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '20px' }}>
          <LayoutDashboard size={14} /> GROUP COLLABORATION PORTAL
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '900', margin: 0, letterSpacing: '-3px', lineHeight: 1 }}>
          STUDENT<span style={{ color: '#3b82f6' }}>.</span>FLOW
        </h1>
        <p style={{ color: '#64748b', fontSize: '18px', marginTop: '10px' }}>Real-time synchronization for three-person project teams.</p>
      </div>

      {/* --- 3-STUDENT GRID (CENTERED) --- */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '30px' 
      }}>
        {team.map((member) => (
          <div key={member.id} style={{ 
            background: 'rgba(15, 23, 42, 0.6)', 
            backdropFilter: 'blur(12px)', 
            border: `1px solid ${member.color}30`, 
            borderRadius: '32px', 
            padding: '40px', 
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Status Background Glow */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: member.color, filter: 'blur(60px)', opacity: 0.1 }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: `${member.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: member.color, border: `1px solid ${member.color}20` }}>
                {member.icon}
              </div>
              <div style={{ background: `${member.color}10`, color: member.color, padding: '4px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: '900', border: `1px solid ${member.color}30`, letterSpacing: '1px' }}>
                {member.status.toUpperCase()}
              </div>
            </div>

            <h2 style={{ fontSize: '26px', fontWeight: '900', margin: '0 0 4px 0', letterSpacing: '-1px' }}>{member.name}</h2>
            <p style={{ color: member.color, fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>{member.role}</p>
            
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)', marginBottom: '32px' }}>
              <span style={{ fontSize: '10px', color: '#475569', fontWeight: 'bold', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Current Assignment</span>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#94a3b8' }}>{member.task}</p>
            </div>

            <button 
              onClick={() => cycleStatus(member.id)}
              style={{ 
                width: '100%', 
                padding: '16px', 
                borderRadius: '16px', 
                border: 'none', 
                background: member.color, 
                color: 'white', 
                fontWeight: 'bold', 
                fontSize: '13px',
                cursor: 'pointer', 
                transition: 'transform 0.2s',
                boxShadow: `0 10px 20px ${member.color}20`
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Update Status
            </button>
          </div>
        ))}
      </div>

      {/* --- LIVE PROGRESS BAR --- */}
      <div style={{ maxWidth: '900px', margin: '60px auto 0', padding: '30px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '12px', fontWeight: '900', color: '#475569', letterSpacing: '2px' }}>GLOBAL PROJECT HEALTH</span>
          <span style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6' }}>{progressPercent}%</span>
        </div>
        <div style={{ width: '100%', height: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '100px', overflow: 'hidden', padding: '2px' }}>
          <div style={{ 
            width: `${progressPercent}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, #3b82f6, #10b981)', 
            borderRadius: '100px',
            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
          }}></div>
        </div>
      </div>

      {/* --- FLOATING CHAT BUTTON --- */}
      <button 
        onClick={() => setIsChatOpen(true)}
        style={{ position: 'fixed', bottom: '40px', right: '40px', width: '70px', height: '70px', borderRadius: '50%', background: '#3b82f6', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)', zIndex: 100 }}>
        <MessageSquare size={28} />
      </button>

      {/* --- SIDEBAR CHAT DRAWER --- */}
      <div style={{ 
        position: 'fixed', top: 0, right: 0, height: '100vh', width: '380px', 
        background: '#0b1120', borderLeft: '1px solid rgba(255,255,255,0.1)', 
        zIndex: 200, transform: isChatOpen ? 'translateX(0)' : 'translateX(100%)', 
        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column', boxShadow: '-20px 0 60px rgba(0,0,0,0.5)'
      }}>
        <div style={{ padding: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontWeight: 900, fontSize: '20px', italic: 'italic' }}>TEAM<span style={{ color: '#3b82f6' }}>.</span>CHAT</h3>
          <X onClick={() => setIsChatOpen(false)} style={{ cursor: 'pointer', color: '#475569' }} />
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map(m => (
            <div key={m.id} style={{ alignSelf: m.user === "You" ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              <span style={{ fontSize: '10px', fontWeight: '900', color: '#3b82f6', display: 'block', marginBottom: '4px', textAlign: m.user === "You" ? 'right' : 'left' }}>{m.user}</span>
              <div style={{ background: m.user === "You" ? '#3b82f6' : 'rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '14px', color: m.user === "You" ? 'white' : '#cbd5e1' }}>
                {m.text}
              </div>
              <span style={{ fontSize: '9px', color: '#475569', display: 'block', marginTop: '4px', textAlign: m.user === "You" ? 'right' : 'left' }}>{m.time}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} style={{ padding: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0b1120' }}>
          <div style={{ position: 'relative' }}>
            <input 
              style={{ width: '100%', padding: '16px 50px 16px 20px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', boxSizing: 'border-box' }}
              placeholder="Type a message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}>
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Dashboard;