import React, { useContext } from 'react'
import './Profile.css'
import AuthContext from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';

export default function Profile(){
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page container">
      <div className="card profile-card">
        <div className="profile-top">
          <img src={user.photos?.[0]?.url || "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop&ixlib-rb-4.0.3&s=placeholder"} alt="avatar" />
          <div>
            <h2>{user.name}</h2>
            <p className="muted">{user.bio || 'Loves long walks and warm coffee'}</p>
            <div className="row" style={{marginTop:8}}>
              <button className="btn primary">Edit profile</button>
              <button className="btn ghost" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>

        <div style={{padding:16, borderTop:'1px solid rgba(155,64,98,0.04)'}}>
          <h3>About</h3>
          <p>{user.bio || 'Passionate about art and tech. Looking for someone to share sunsets and playlists.'}</p>
        </div>
      </div>
    </div>
  )
}