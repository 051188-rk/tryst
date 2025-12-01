import React, { useState, useEffect, useContext, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ChatRoom.css'
import api from '../utils/api'
import { socket, connectSocket, disconnectSocket } from '../utils/socket'
import AuthContext from '../context/AuthContext.jsx'
import { IoSend, IoArrowBack } from 'react-icons/io5'

export default function ChatRoom() {
  const { id: matchId } = useParams()
  const nav = useNavigate()
  const [msgs, setMsgs] = useState([])
  const [text, setText] = useState('')
  const [otherUser, setOtherUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [msgs])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch messages
        const { data: messages } = await api.get(`/matches/${matchId}/messages`);
        setMsgs(messages);

        // Fetch match to get other user info
        const { data: matches } = await api.get('/matches');
        const match = matches.find(m => m._id === matchId);
        if (match) {
          const other = match.users.find(u => u._id !== user._id);
          setOtherUser(other);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    // Connect socket
    connectSocket();
    socket.emit('join_match', { matchId });

    const onNewMessage = (msg) => {
      setMsgs(prev => [...prev, msg]);
    }

    socket.on('new_message', onNewMessage);

    return () => {
      socket.off('new_message', onNewMessage);
      disconnectSocket();
    }
  }, [matchId, user._id]);

  const send = (e) => {
    e.preventDefault()
    if (!text.trim()) return

    socket.emit('send_message', { matchId, text: text.trim() });
    setText('')
  }

  if (loading) {
    return (
      <div className="page container center" style={{ minHeight: '80vh' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="page chat-page">
      <div className="chat-header">
        <button className="btn icon ghost" onClick={() => nav('/chats')}>
          <IoArrowBack />
        </button>
        <div className="chat-header-info">
          {otherUser?.photos?.[0]?.url && (
            <img src={otherUser.photos[0].url} alt={otherUser.name} className="avatar" />
          )}
          <div>
            <h3>{otherUser?.name || 'Chat'}</h3>
            <p className="muted">Active now</p>
          </div>
        </div>
        <div style={{ width: 48 }}></div>
      </div>

      <div className="card chat-area">
        <div className="messages">
          {msgs.length === 0 && (
            <div className="empty-chat">
              <p className="muted">No messages yet. Say hi!</p>
            </div>
          )}
          {msgs.map(m => (
            <div key={m._id} className={'bubble ' + (m.sender === user._id ? 'me' : 'them')}>
              <div className="bubble-content">{m.text}</div>
              <div className="bubble-time">
                {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="composer" onSubmit={send}>
          <input
            className="input"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type a message..."
          />
          <button className="btn icon primary" type="submit" disabled={!text.trim()}>
            <IoSend />
          </button>
        </form>
      </div>
    </div>
  )
}