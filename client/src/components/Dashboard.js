import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const Dashboard = () => {
  const [stats, setStats] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/tasks/stats');
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <TaskForm onTaskAdded={fetchStats} />
      <h2>Live Contribution Analytics</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {stats.length > 0 ? stats.map(user => (
          <div key={user.userId} style={{ border: '1px solid blue', padding: '10px', borderRadius: '8px' }}>
            <h4>Student: {user.userId}</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>
              {user.percentage}%
            </p>
          </div>
        )) : <p>No contributions logged yet.</p>}
      </div>
    </div>
  );
};

export default Dashboard;