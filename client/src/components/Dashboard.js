import React, { useState, useEffect } from 'react';
import { FileText, MonitorPlay, CheckCircle, Clock, AlertCircle, Users, RefreshCcw, MessageSquare, Send, X } from 'lucide-react';

const Dashboard = () => {
  const [groupTasks, setGroupTasks] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from MongoDB
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/contributions/all');
      const data = await response.json();
      if (data.length === 0) {
        // Fallback for visual demo if DB is empty
        setGroupTasks([
          { _id: '1', studentName: "Student 1", projectName: "Report", activity: "Writing Chapters 1-3", status: "In Progress" },
          { _id: '2', studentName: "Student 2", projectName: "Presentation", activity: "Designing PPT Slides", status: "Pending" },
          { _id: '3', studentName: "Student 3", projectName: "Research", activity: "Gathering Case Studies", status: "Done" }
        ]);
      } else {
        setGroupTasks(data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  // 2. Cycle Status (Pending -> In Progress -> Done)
  const updateStatus = async (id, currentStatus) => {
    const statuses = ["Pending", "In Progress", "Done"];
    const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
    
    setGroupTasks(prev => prev.map(t => t._id === id ? { ...t, status: nextStatus } : t));

    await fetch(`/api/contributions/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus })
    });
  };

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-blue-500 font-black animate-pulse">SYNCHRONIZING TEAM...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16 flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-black italic tracking-tighter text-white">TEAM<span className="text-blue-500 font-normal">.</span>HUB</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-2">Active Collaboration: Project Alpha</p>
        </div>
        <button onClick={fetchTasks} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500 transition-all active:scale-90">
          <RefreshCcw size={20} className="text-blue-400" />
        </button>
      </div>

      {/* 3 Student Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {groupTasks.slice(0, 3).map((item, idx) => (
          <div key={item._id} className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-[40px] blur opacity-10 group-hover:opacity-30 transition duration-700"></div>
            <div className="relative bg-slate-900/80 border border-white/5 backdrop-blur-xl rounded-[40px] p-8 flex flex-col h-full shadow-2xl">
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  {idx === 0 ? <FileText size={28} /> : idx === 1 ? <MonitorPlay size={28} /> : <Users size={28} />}
                </div>
                <StatusBadge status={item.status} />
              </div>

              <h3 className="text-3xl font-black text-white mb-1 tracking-tight">{item.studentName}</h3>
              <p className="text-blue-500 font-black text-xs uppercase tracking-widest mb-6">{item.projectName}</p>
              
              <div className="bg-black/40 rounded-3xl p-6 mb-8 border border-white/5 flex-grow">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-3">Target Task</p>
                <p className="text-slate-200 font-semibold leading-relaxed">{item.activity}</p>
              </div>

              <button 
                onClick={() => updateStatus(item._id, item.status)}
                className="w-full py-5 bg-blue-600 rounded-2xl text-white font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-blue-900/40 hover:bg-blue-500 hover:scale-[1.02] transition-all"
              >
                Update Progress
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Footer */}
      <div className="max-w-6xl mx-auto mt-16 p-8 bg-slate-900/50 rounded-[40px] border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-black uppercase text-slate-500">Group Milestones</span>
          <span className="text-2xl font-black text-white">{Math.round((groupTasks.filter(t => t.status === 'Done').length / 3) * 100)}%</span>
        </div>
        <div className="h-4 bg-black/50 rounded-full overflow-hidden p-1">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(37,99,235,0.6)]"
            style={{ width: `${(groupTasks.filter(t => t.status === 'Done').length / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-10 right-10 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-110 active:scale-90 transition-all z-40"
      >
        <MessageSquare size={32} />
      </button>

      {/* The Sidebar Chat */}
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

// --- Sub Components ---

const StatusBadge = ({ status }) => {
  const styles = {
    "Done": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    "In Progress": "text-blue-400 bg-blue-400/10 border-blue-400/20",
    "Pending": "text-rose-400 bg-rose-400/10 border-rose-400/20"
  };
  return (
    <div className={`px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${styles[status]}`}>
      <div className={`w-1.5 h-1.5 rounded-full animate-ping ${status === 'Done' ? 'bg-emerald-400' : status === 'In Progress' ? 'bg-blue-400' : 'bg-rose-400'}`}></div>
      {status}
    </div>
  );
};

const ChatDrawer = ({ isOpen, onClose }) => {
  const [msg, setMsg] = useState("");
  const [chat] = useState([
    { from: "Student 3", text: "Finished the case studies!", time: "12:01" },
    { from: "Student 1", text: "Nice! Send them over.", time: "12:05" }
  ]);

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-slate-900 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-white/5 z-50 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
        <h2 className="text-xl font-black text-white italic">TEAM.CHAT</h2>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl"><X /></button>
      </div>
      <div className="p-6 h-[calc(100%-180px)] overflow-y-auto space-y-6">
        {chat.map((c, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-blue-500 uppercase">{c.from}</span>
            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 text-sm font-medium">
              {c.text}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full p-6 bg-slate-900">
        <div className="relative">
          <input 
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-blue-500 focus:outline-none transition-all"
            placeholder="Type a message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className="absolute right-3 top-3 p-2 bg-blue-600 rounded-xl text-white"><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;