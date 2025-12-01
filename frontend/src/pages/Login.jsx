import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import api from '../utils/api';
import AuthContext from '../context/AuthContext.jsx';
import { IoMail, IoLockClosed, IoLogIn } from 'react-icons/io5';

export default function Login() {
  const nav = useNavigate()
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handle = (k, v) => setForm({ ...form, [k]: v });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.user, data.token);
      nav('/discover');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page container">
      <div className="card auth-card fade-in">
        <div className="auth-header">
          <img src="/tryst.png" alt="Tryst" className="auth-logo" />
          <h2>Welcome back</h2>
          <p className="muted">Log in to continue swiping and chatting</p>
        </div>
        <form onSubmit={handleSubmit} className="col auth-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className="input-group">
            <IoMail className="input-icon" />
            <input
              required
              className="input"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => handle('email', e.target.value)}
            />
          </div>
          <div className="input-group">
            <IoLockClosed className="input-icon" />
            <input
              required
              type="password"
              className="input"
              placeholder="Password"
              value={form.password}
              onChange={e => handle('password', e.target.value)}
            />
          </div>
          <button className="btn primary" disabled={loading}>
            {loading ? (
              <div className="spinner-small"></div>
            ) : (
              <>
                <IoLogIn /> Log in
              </>
            )}
          </button>
        </form>
        <div className="auth-footer">
          Don't have an account? <Link to="/signup" className="link">Sign up</Link>
        </div>
      </div>
    </div>
  )
}