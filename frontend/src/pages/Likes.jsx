import React, { useState, useEffect } from 'react'
import './SimplePage.css'
import api from '../utils/api'
import { Link } from 'react-router-dom'
import { IoHeart } from 'react-icons/io5'

export default function Likes() {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { data } = await api.get('/swipes/likes');
        setLikes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLikes();
  }, [])

  if (loading) {
    return (
      <div className="page container center" style={{ minHeight: '80vh' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="page container">
      <div className="page-header">
        <h2>Likes</h2>
        <p className="muted">{likes.length} people liked you</p>
      </div>

      {likes.length === 0 ? (
        <div className="card empty-state">
          <IoHeart size={64} color="var(--primary)" />
          <h3>No likes yet</h3>
          <p className="muted">Keep your profile updated and keep swiping</p>
        </div>
      ) : (
        <div className="card list-card">
          {likes.map(like => {
            const fromUser = like.from;
            if (!fromUser) return null;

            return (
              <div key={like._id} className="list-row">
                <img
                  src={fromUser.photos?.[0]?.url || 'https://via.placeholder.com/56'}
                  className="avatar"
                  alt={fromUser.name}
                />
                <div className="list-info">
                  <Link to={`/user/${fromUser._id}`} className="list-name">
                    {fromUser.name}
                  </Link>
                  <div className="muted">Liked you</div>
                </div>
                <IoHeart size={20} color="var(--primary)" />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}