import React, { useState } from 'react';
import { Lock, Mail, ChevronRight, ShieldCheck } from 'lucide-react';

// 1. Accept the onLoginSuccess prop here
const Login = ({ onLoginSuccess }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a professional login delay
    setTimeout(() => {
      // 1. Store the user's email in the browser's memory
      localStorage.setItem('userEmail', email); 
      
      // 2. Extract a "Name" from the email (e.g., "john" from "john@gmail.com")
      const displayName = email.split('@')[0];
      localStorage.setItem('userName', displayName);

      toast.success(`Logged in as ${displayName}`);
      navigate('/dashboard'); 
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div style={{ 
      backgroundColor: '#020617', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundImage: `radial-gradient(circle at center, rgba(59, 130, 246, 0.1), transparent)`,
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      
      <div style={{ 
        width: '100%', 
        maxWidth: '450px', 
        background: 'rgba(15, 23, 42, 0.6)', 
        backdropFilter: 'blur(16px)', 
        border: '1px solid rgba(255, 255, 255, 0.1)', 
        borderRadius: '40px', 
        padding: '50px 40px', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', height: '2px', background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }}></div>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <ShieldCheck size={32} color="#3b82f6" />
          </div>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: 0, letterSpacing: '-1.5px' }}>
            Tracker<span style={{ color: '#3b82f6' }}>.</span>BACK
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>Enter credentials to access the Portal</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative', textAlign: 'left' }}>
            <label style={{ fontSize: '11px', fontWeight: '900', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '16px', marginBottom: '8px', display: 'block' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#475569" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                style={{ width: '100%', padding: '16px 16px 16px 50px', borderRadius: '16px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.05)', color: 'white', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ position: 'relative', textAlign: 'left' }}>
            <label style={{ fontSize: '11px', fontWeight: '900', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '16px', marginBottom: '8px', display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#475569" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '16px 16px 16px 50px', borderRadius: '16px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.05)', color: 'white', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              marginTop: '10px',
              padding: '18px', 
              borderRadius: '18px', 
              border: 'none', 
              background: isLoading ? '#1e293b' : 'linear-gradient(90deg, #3b82f6, #2563eb)', 
              color: 'white', 
              fontWeight: '900', 
              fontSize: '15px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '10px',
              boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)'
            }}>
            {isLoading ? 'AUTHENTICATING...' : 'ACCESS PORTAL'}
            {!isLoading && <ChevronRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;