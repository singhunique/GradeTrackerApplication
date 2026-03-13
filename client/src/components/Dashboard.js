import React, { useState } from 'react';
import { FileText, MonitorPlay, Users, CheckCircle, Clock, MessageSquare, Send, X, RefreshCcw } from 'lucide-react';

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  // Your Core Team Data
  const teamData = [
    { 
        id: 1, 
        name: "Student 1", 
        role: "Report & Documentation", 
        task: "Compiling Chapters 1-5, References, and Appendix.", 
        status: "Done", 
        color: "#3b82f6", 
        icon: <FileText size={28} /> 
    },
    { 
        id: 2, 
        name: "Student 2", 
        role: "Visual Presentation", 
        task: "Designing 15 Interactive Slides with Animations.", 
        status: "In Progress", 
        color: "#a855f7", 
        icon: <MonitorPlay size={28} /> 
    },
    { 
        id: 3, 
        name: "Student 3", 
        role: "Data & Research", 
        task: "Gathering Case Studies and Market Survey Results.", 
        status: "Pending", 
        color: "#f59e0b", 
        icon: <Users size={28} /> 
    }
  ];

  // Inline styles to guarantee the "Attractive" look regardless of CSS config
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '40px',
  };

  return (
    <div style={{ 
      backgroundColor: '#020617', 
      minHeight: '100vh', 
      color: 'white', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundImage: `radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent), radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.1), transparent), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>

      {/* --- HEADER SECTION --- */}
      <header style={{ width: '100%', maxWidth: '1200px', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '100px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', color: '#60a5fa', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '20px' }}>
          LIVE COLLABORATION HUB
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, margin: 0, letterSpacing: '-2px', lineHeight: 1 }}>
          TEAM<span style={{ color: '#3b82f6' }}>.</span>PORTAL
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', marginTop: '15px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Tracking the contribution of three students in real-time.
        </p>
      </header>

      {/* --- 3-STUDENT TEAM GRID --- */}
      <main style={{ width: '100%', maxWidth: '1200px', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        {teamData.map((student) => (
          <div key={student.id} style={glassStyle} className="card-hover">
            <div style={{ padding: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: `${student.color}15`, border: `1px solid ${student.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: student.color }}>
                  {student.icon}
                </div>
                <div style={{ background: `${student.color}10`, color: student.color, padding: '4px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: '900', border: `1px solid ${student.color}20` }}>
                  {student.status.toUpperCase()}
                </div>
              </div>

              <h2 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 5px 0' }}>{student.name}</h2>
              <p style={{ color: student.color, fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '25px' }}>{student.role}</p>
              
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '30px' }}>
                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Current Milestone</span>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#cbd5e1' }}>{student.task}</p>
              </div>

              <button style={{ width: '100%', padding: '16px', borderRadius: '16px', border: 'none', background: student.color, color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s', boxShadow: `0 10px 20px ${student.color}20` }}>
                Update Progress
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* --- PROGRESS FOOTER --- */}
      <footer style={{ width: '100%', maxWidth: '900px', padding: '60px 20px' }}>
        <div style={{ ...glassStyle, padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '1px' }}>PROJECT COMPLETION</span>
            <span style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6' }}>66%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
            <div style={{ width: '66%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #a855f7)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}></div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING CHAT TRIGGER --- */}
      <button 
        onClick={() => setIsChatOpen(true)}
        style={{ position: 'fixed', bottom: '40px', right: '40px', width: '70px', height: '70px', borderRadius: '50%', background: '#3b82f6', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)', zIndex: 100 }}>
        <MessageSquare size={30} />
      </button>

      {/* --- CHAT SIDEBAR --- */}
      <div style={{ 
        position: 'fixed', top: 0, right: 0, height: '100vh', width: '350px', 
        background: '#0b1120', borderLeft: '1px solid rgba(255,255,255,0.1)', 
        zIndex: 200, transform: isChatOpen ? 'translateX(0)' : 'translateX(100%)', 
        transition: '0.5s cubic-bezier(0.4, 0, 0.2, 1)', padding: '30px',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h3 style={{ margin: 0, fontWeight: 900 }}>TEAM CHAT</h3>
          <X onClick={() => setIsChatOpen(false)} style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px', marginBottom: '15px' }}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#3b82f6' }}>STUDENT 3</span>
                <p style={{ margin: '5px 0 0 0', fontSize: '13px' }}>I've uploaded the research files to the drive.</p>
            </div>
        </div>
        <div style={{ marginTop: '20px', position: 'relative' }}>
          <input style={{ width: '100%', padding: '15px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} placeholder="Type a message..." />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;