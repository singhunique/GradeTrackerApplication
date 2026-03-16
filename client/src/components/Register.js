import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, ChevronLeft } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Simulate saving to "Database" (LocalStorage)
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);
    localStorage.setItem('userName', name);

    toast.success("Account created! Please login.");
    navigate('/');
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <button onClick={() => navigate('/')} style={backButtonStyle}>
          <ChevronLeft size={16} /> Back to Login
        </button>

        <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '900', marginBottom: '10px' }}>
          Join the <span style={{ color: '#3b82f6' }}>Portal</span>
        </h1>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>Create your student account</p>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            onChange={(e) => setName(e.target.value)}
            style={inputStyle} 
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle} 
          />
          <input 
            type="password" 
            placeholder="Create Password" 
            required 
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle} 
          />
          <button type="submit" style={buttonStyle}>REGISTER NOW</button>
        </form>
      </div>
    </div>
  );
};

// Reuse your sleek styles
const containerStyle = { backgroundColor: '#020617', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `radial-gradient(circle at center, rgba(59, 130, 246, 0.1), transparent)` };
const cardStyle = { width: '100%', maxWidth: '400px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '40px', padding: '40px', textAlign: 'center' };
const inputStyle = { width: '100%', padding: '16px', borderRadius: '16px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.05)', color: 'white', outline: 'none', boxSizing: 'border-box' };
const buttonStyle = { padding: '18px', borderRadius: '18px', border: 'none', background: '#3b82f6', color: 'white', fontWeight: '900', cursor: 'pointer', marginTop: '10px' };
const backButtonStyle = { background: 'none', border: 'none', color: '#475569', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px' };

export default Register;