import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './Chats.css'
import api from '../utils/api'
import AuthContext from '../context/AuthContext.jsx'
import { IoChatbubbles } from 'react-icons/io5'

export default function Chats() {
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

  const totalUnread = matches.reduce((sum, m) => sum + (m.unreadCount || 0), 0);

  return (
    <div className="page container">
      <div className="chats-header">
        <h2>Messages</h2>
        <p className="muted">
          {matches.length} conversation{matches.length !== 1 ? 's' : ''}
          {totalUnread > 0 && ` · ${totalUnread} unread`}
        </p>
      </div>

      {matches.length === 0 ? (
        <div className="card empty-state">
          <IoChatbubbles size={64} color="var(--primary)" />
          <h3>No messages yet</h3>
          <p className="muted">Start swiping to make matches and chat</p>
        </div>
      ) : (
        <div className="card chats-list">
          {matches.map(m => {
            const otherUser = m.users.find(u => u._id !== user._id);
            if (!otherUser) return null;

            return (
              <Link to={'/chat/' + m._id} key={m._id} className="chat-row">
                <div className="avatar-wrapper">
                  <img
                    src={otherUser.photos?.[0]?.url || 'https://via.placeholder.com/56'}
                    className="avatar"
                    alt={otherUser.name}
                  />
                  {m.unreadCount > 0 && (
                    <div className="unread-badge">{m.unreadCount}</div>
                  )}
                </div>
                <div className="chat-info">
                  <div className="chat-name">{otherUser.name}</div>
                  <div className={`chat-preview ${m.unreadCount > 0 ? 'unread' : ''}`}>
                    {m.lastMessage?.text || "Start a conversation"}
                  </div>
                </div>
                <div className="chat-meta">
                  {m.lastMessage?.createdAt && (
                    <div className="muted chat-time">
                      {new Date(m.lastMessage.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}