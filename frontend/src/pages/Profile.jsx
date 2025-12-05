import React, { useContext } from 'react'
import './Profile.css'
import AuthContext from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';
import { IoLogOut, IoSettings, IoPerson, IoSparkles } from 'react-icons/io5'

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  if (!user) {
    return (
      <div className="page container center" style={{ minHeight: '80vh' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  const profileImage = user.photos?.[0]?.url || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop';

  return (
    <div className="page container">
      <div className="profile-header">
        <h2>Profile</h2>
      </div>

      <div className="card profile-card">
        <div className="profile-cover">
          <img src={profileImage} alt="cover" className="cover-image" />
          <div className="profile-avatar-wrapper">
            <img src={profileImage} alt="avatar" className="profile-avatar" />
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="username">@{user.username}</p>
            {user.bio && <p className="bio">{user.bio}</p>}
          </div>

          <div className="profile-actions">
            <button className="btn primary profile-btn" onClick={() => nav('/premium')}>
              <IoSparkles size={20} />
              Go Premium
            </button>
            <button className="btn ghost profile-btn">
              <IoSettings size={20} />
              Edit profile
            </button>
            <button className="btn ghost profile-btn" onClick={handleLogout}>
              <IoLogOut size={20} />
              Logout
            </button>
          </div>

          <div className="profile-details">
            <h3>About</h3>
            <div className="detail-row">
              <IoPerson size={20} color="var(--primary)" />
              <div>
                <div className="detail-label">Name</div>
                <div className="detail-value">{user.name}</div>
              </div>
            </div>
            {user.email && (
              <div className="detail-row">
                <IoPerson size={20} color="var(--primary)" />
                <div>
                  <div className="detail-label">Email</div>
                  <div className="detail-value">{user.email}</div>
                </div>
              </div>
            )}
            {user.gender && (
              <div className="detail-row">
                <IoPerson size={20} color="var(--primary)" />
                <div>
                  <div className="detail-label">Gender</div>
                  <div className="detail-value">{user.gender}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}