import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import './Profile.css';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/users/${id}`);
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };
    fetchUser();
  }, [id]);

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
          </div>
        </div>
        <div style={{padding:16, borderTop:'1px solid rgba(155,64,98,0.04)'}}>
          <h3>About</h3>
          <p>{user.bio || 'Passionate about art and tech. Looking for someone to share sunsets and playlists.'}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;