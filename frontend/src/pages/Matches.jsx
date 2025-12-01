import React, { useState, useEffect, useContext } from 'react'
import './SimplePage.css'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import AuthContext from '../context/AuthContext.jsx'
import { IoPeople, IoChatbubble } from 'react-icons/io5'

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data } = await api.get('/matches');
        setMatches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

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
        <h2>Matches</h2>
        <p className="muted">{matches.length} match{matches.length !== 1 ? 'es' : ''}</p>
      </div>

      {matches.length === 0 ? (
        <div className="card empty-state">
          <IoPeople size={64} color="var(--primary)" />
          <h3>No matches yet</h3>
          <p className="muted">Keep swiping to find your perfect match</p>
        </div>
      ) : (
        <div className="card list-card">
          {matches.map(m => {
            const otherUser = m.users.find(u => u._id !== user._id);
            if (!otherUser) return null;

            return (
              <Link to={'/chat/' + m._id} key={m._id} className="list-row">
                <img
                  src={otherUser.photos?.[0]?.url || 'https://via.placeholder.com/56'}
                  className="avatar"
                  alt={otherUser.name}
                />
                <div className="list-info">
                  <div className="list-name">{otherUser.name}</div>
                  <div className="muted">You matched — start a conversation</div>
                </div>
                <IoChatbubble size={20} color="var(--primary)" />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}