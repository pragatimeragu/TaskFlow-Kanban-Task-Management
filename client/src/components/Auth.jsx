import React, { useState } from 'react';
import { login, register } from '../services/api';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      let response;
      if (isLogin) {
        response = await login({ email: formData.email, password: formData.password });
      } else {
        response = await register(formData);
      }
      
      // Save user to local storage and tell App we are logged in
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      onLogin(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel">
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit} className="task-form">
          {!isLogin && (
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>

          <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '10px'}}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up here' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
