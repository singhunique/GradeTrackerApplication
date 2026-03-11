import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus, GraduationCap, CheckCircle, Trophy } from 'lucide-react';
import GradeChart from './GradeChart';

const Dashboard = () => {
  const handleAddClick = () => {
    toast.success('Successfully opened entry form!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#f8fafc] p-6 lg:p-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 font-medium">Tracking your success this semester.</p>
          </div>
          <button 
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl shadow-indigo-200"
          >
            <Plus size={20} /> Add Grade
          </button>
        </div>

        {/* Top Section: Stats & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <GradeChart />
          </div>
          <div className="space-y-6">
            <StatMiniCard icon={<Trophy className="text-amber-500"/>} label="Current GPA" val="3.85" />
            <StatMiniCard icon={<GraduationCap className="text-indigo-500"/>} label="Credits" val="112" />
            <StatMiniCard icon={<CheckCircle className="text-emerald-500"/>} label="Attendance" val="94%" />
          </div>
        </div>

        {/* Activity Table Placeholder */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Recent Assignments</h2>
          <div className="border-t border-slate-50 pt-6 text-center text-slate-400 italic">
            Your recent data will appear here once connected to the API.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatMiniCard = ({ icon, label, val }) => (
  <div className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center gap-4 shadow-sm hover:border-indigo-100 transition-colors">
    <div className="bg-slate-50 p-3 rounded-xl">{icon}</div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-slate-900">{val}</p>
    </div>
  </div>
);

export default Dashboard;