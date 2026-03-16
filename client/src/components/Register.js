import React, { useState } from 'react';
import { User, Lock, Mail, ChevronRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate Registration Delay
    setTimeout(() => {
      console.log("Registering student:", formData.name);
      // Here you would normally send data to your /api/auth/register
      navigate('/'); // Go back to login after success
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
        maxWidth: '480px', 
        background: 'rgba(15, 23, 42, 0.6)', 
        backdropFilter: 'blur(16px)', 
        border: '1px solid rgba(255, 255, 255, 0.1)', 
        borderRadius: '40px', 
        padding: '40px', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        position: 'relative'
      }}>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          style={{ position: 'absolute', top: '30px', left: '30px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px' }}>
          <ArrowLeft size={16} /> BACK
        </button>

        <div style={{ marginBottom: '30px', marginTop: '20px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', margin: '0 auto 15px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <ShieldCheck size={28} color="#3b82f6" />
          </div>
          <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '900', margin: 0, letterSpacing: '-1px' }}>
            JOIN<span style={{ color: '#3b82f6' }}>.</span>TRACKER
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>Create your student profile to track contributions</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '11px', fontWeight: '900', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '12px', marginBottom: '5px', display: 'block' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#475569" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" required
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
                style={{ width: '100%', padding: '14px 14px 14px 50px', borderRadius: '14px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.05)', color: 'white', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '11px', fontWeight: '900', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '12px', marginBottom: '5px', display: 'block' }}>University Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#475569" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="student@university.edu"
                style={{ width: '100%', padding: '14px 14px 14px 50px', borderRadius: '14px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.05)', color: 'white', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '11px', fontWeight: '900', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '12px', marginBottom: '5px', display: 'block' }}>Create Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#475569" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" required
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                style={{ width: '100%', padding: '14px 14px 14px 50px', borderRadius: '14px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.05)', color: 'white', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              marginTop: '10px',
              padding: '16px', 
              borderRadius: '16px', 
              border: 'none', 
              background: isLoading ? '#1e293b' : 'linear-gradient(90deg, #3b82f6, #2563eb)', 
              color: 'white', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
            }}>
            {isLoading ? 'CREATING ACCOUNT...' : 'REGISTER PROFILE'}
            {!isLoading && <ChevronRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;