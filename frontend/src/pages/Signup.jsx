import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import api from '../utils/api'
import AuthContext from '../context/AuthContext.jsx'

export default function Signup(){
  const nav = useNavigate()
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email:'', password:'', name:'', username:'', photo: null
  })
  const [preview, setPreview] = useState(null);

  const handle = (k,v)=> setForm({...form, [k]:v})

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (form.photo) {
      formData.append('photo', form.photo);
    }

    try {
      let photoUrl = '';
      if (form.photo) {
        const { data: uploadData } = await api.post('/upload/photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        photoUrl = uploadData.url;
      }

      const signupData = { ...form, photos: [{url: photoUrl}] };
      const { data } = await api.post('/auth/signup', signupData);
      login(data.user, data.token);
      nav('/discover');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  }

  return (
    <div className="page container">
      <div className="card auth-card">
        <h2>Create your lovely account</h2>
        <form onSubmit={handleSubmit} className="col survey">
          <div className="center">
            <label htmlFor="photo-upload" className="avatar-upload">
              {preview ? <img src={preview} alt="Preview" className="avatar-preview" /> : <span>+</span>}
            </label>
            <input id="photo-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          </div>
          <div className="row">
            <input required className="input" placeholder="Full name" value={form.name} onChange={e=>handle('name', e.target.value)} />
            <input required className="input" placeholder="Username" value={form.username} onChange={e=>handle('username', e.target.value)} />
          </div>
          <div className="row">
            <input required className="input" placeholder="Email" value={form.email} onChange={e=>handle('email', e.target.value)} />
            <input required type="password" className="input" placeholder="Password" value={form.password} onChange={e=>handle('password', e.target.value)} />
          </div>

          <div className="row" style={{marginTop:8}}>
            <button type="submit" className="btn primary">Create account</button>
            <button type="button" className="btn ghost" onClick={()=>nav('/login')}>Already have an account</button>
          </div>
        </form>
      </div>
    </div>
  )
}