import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Profile.css'
import api from '../utils/api'
import { IoArrowBack, IoHeart, IoLocationSharp } from 'react-icons/io5'

export default function UserProfile() {
  const { id } = useParams()
  const nav = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/users/${id}`)
        setUser(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  const handleLike = async () => {
    try {
      await api.post('/swipes', { to: id, type: 'like' })
      nav('/discover')
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="page container center" style={{ minHeight: '80vh' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="page container center" style={{ minHeight: '80vh' }}>
        <p className="muted">User not found</p>
      </div>
    )
  }

  const profileImage = user.photos?.[0]?.url || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop'
  const age = user.dob ? new Date().getFullYear() - new Date(user.dob).getFullYear() : null

  return (
    <div className="page container">
      <div className="profile-header">
        <button className="btn icon ghost" onClick={() => nav(-1)}>
          <IoArrowBack />
        </button>
        <h2>{user.name}</h2>
        <div style={{ width: 48 }}></div>
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
            <h2>{user.name}{age && `, ${age}`}</h2>
            <p className="username">@{user.username}</p>
            {user.bio && <p className="bio">{user.bio}</p>}
            {user.location && (
              <div className="location-tag">
                <IoLocationSharp size={16} />
                <span>Nearby</span>
              </div>
            )}
          </div>

          <div className="profile-actions">
            <button className="btn primary profile-btn" onClick={handleLike}>
              <IoHeart size={20} />
              Like
            </button>
          </div>

          {user.bio && (
            <div className="profile-details">
              <h3>About</h3>
              <p>{user.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}