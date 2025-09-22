import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import api from '../utils/api';
import AuthContext from '../context/AuthContext.jsx';

export default function Login(){
  const nav = useNavigate()
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });

  const handle = (k,v) => setForm({...form, [k]:v});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.user, data.token);
      nav('/discover');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  }

  return (
    <div className="page container">
      <div className="card auth-card">
        <h2>Welcome back</h2>
        <p className="muted">Log in to continue swiping and chatting</p>
        <form onSubmit={handleSubmit} className="col">
          <input required className="input" placeholder="Email" value={form.email} onChange={e => handle('email', e.target.value)} />
          <input required type="password" className="input" placeholder="Password" value={form.password} onChange={e => handle('password', e.target.value)} />
          <button className="btn primary">Log in</button>
        </form>
        <div style={{marginTop:8}}>Don't have an account? <Link to="/signup">Sign up</Link></div>
      </div>
    </div>
  )
}