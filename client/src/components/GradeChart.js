import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', gpa: 3.0 },
  { name: 'Week 2', gpa: 3.4 },
  { name: 'Week 3', gpa: 3.2 },
  { name: 'Week 4', gpa: 3.9 },
];

const GradeChart = () => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-80">
    <h3 className="text-lg font-bold text-slate-800 mb-4">Performance Trend</h3>
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" hide />
        <YAxis hide domain={[0, 4]} />
        <Tooltip />
        <Area type="monotone" dataKey="gpa" stroke="#6366f1" strokeWidth={3} fill="url(#colorGpa)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default GradeChart;