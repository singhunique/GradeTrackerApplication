import React, { useState, useEffect } from 'react';
import { Layout, Users, CheckCircle, Clock, Plus, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    fetch('/api/contributions/all')
      .then(res => res.json())
      .then(data => setContributions(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 text-slate-900">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Student Project Hub
        </h1>
        <p className="text-slate-500 font-medium mt-2">Track contributions and project milestones</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Stats Cards */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard icon={<Users className="text-blue-500" />} label="Active Students" count="12" color="bg-blue-50" />
            <StatCard icon={<CheckCircle className="text-emerald-500" />} label="Tasks Done" count="48" color="bg-emerald-50" />
            <StatCard icon={<Clock className="text-amber-500" />} label="In Progress" count="15" color="bg-amber-50" />
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <BarChart3 size={20} className="text-indigo-600" /> Recent Activity
              </h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
                <Plus size={18} /> Add Contribution
              </button>
            </div>

            <div className="space-y-4">
              {contributions.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {item.studentName[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{item.studentName}</h4>
                      <p className="text-sm text-slate-500">{item.activity}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    item.status === 'Done' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Project List */}
        <div className="bg-indigo-900 rounded-[32px] p-8 text-white shadow-xl shadow-indigo-200">
          <h3 className="text-xl font-bold mb-6">Live Projects</h3>
          <div className="space-y-6">
            <ProjectItem title="Web Design Final" progress={75} />
            <ProjectItem title="Data Science App" progress={40} />
            <ProjectItem title="AI Research" progress={90} />
          </div>
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ icon, label, count, color }) => (
  <div className={`${color} p-6 rounded-[24px] border border-white shadow-sm`}>
    <div className="mb-4">{icon}</div>
    <div className="text-2xl font-black text-slate-800">{count}</div>
    <div className="text-sm font-bold text-slate-500 uppercase tracking-tight">{label}</div>
  </div>
);

const ProjectItem = ({ title, progress }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-bold">
      <span>{title}</span>
      <span>{progress}%</span>
    </div>
    <div className="w-full bg-indigo-800 rounded-full h-2">
      <div className="bg-indigo-400 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

export default Dashboard;