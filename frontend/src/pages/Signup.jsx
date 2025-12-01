import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import api from '../utils/api'
import AuthContext from '../context/AuthContext.jsx'
import { IoMail, IoLockClosed, IoPerson, IoCamera } from 'react-icons/io5'

export default function Signup() {
  const nav = useNavigate()
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: '', password: '', name: '', username: '', photo: null
  })
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handle = (k, v) => setForm({ ...form, [k]: v })

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let photoUrl = '';

      // Upload photo first if provided
      if (form.photo) {
        const formData = new FormData();
        formData.append('photo', form.photo);

        const { data: uploadData } = await api.post('/upload/photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        photoUrl = uploadData.url;
      }

      // Create signup data
      const signupData = {
        email: form.email,
        password: form.password,
        name: form.name,
        username: form.username,
        photos: photoUrl ? [{ url: photoUrl }] : []
      };

      const { data } = await api.post('/auth/signup', signupData);
      login(data.user, data.token);
      nav('/discover');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.response?.data?.details || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page container">
      <div className="card auth-card fade-in">
        <div className="auth-header">
          <img src="/tryst.png" alt="Tryst" className="auth-logo" />
          <h2>Create your account</h2>
          <p className="muted">Join and start meeting amazing people</p>
        </div>
        <form onSubmit={handleSubmit} className="col auth-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="center">
            <label htmlFor="photo-upload" className="avatar-upload">
              {preview ? (
                <img src={preview} alt="Preview" className="avatar-preview" />
              ) : (
                <div className="avatar-placeholder">
                  <IoCamera size={32} />
                  <span>Add Photo</span>
                </div>
              )}
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          <div className="row">
            <div className="input-group">
              <IoPerson className="input-icon" />
              <input
                required
                className="input"
                placeholder="Full name"
                value={form.name}
                onChange={e => handle('name', e.target.value)}
              />
            </div>
            <div className="input-group">
              <IoPerson className="input-icon" />
              <input
                required
                className="input"
                placeholder="Username"
                value={form.username}
                onChange={e => handle('username', e.target.value)}
              />
            </div>
          </div>

          <div className="row">
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
          </div>

          <div className="row" style={{ marginTop: 8 }}>
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? <div className="spinner-small"></div> : 'Create account'}
            </button>
            <button type="button" className="btn ghost" onClick={() => nav('/login')}>
              Already have an account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}