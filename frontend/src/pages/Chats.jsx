import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './Chats.css'
import api from '../utils/api'
import AuthContext from '../context/AuthContext.jsx'

export default function Chats(){
  const [matches, setMatches] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data } = await api.get('/matches');
        setMatches(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMatches();
  }, []);

  return (
    <div className="page container">
      <h2>Chats</h2>
      <div className="card" style={{padding:8}}>
        {matches.map(m=>{
          const otherUser = m.users.find(u => u._id !== user._id);
          return (
            <Link to={'/chat/'+m._id} key={m._id} className="chat-row">
              <img src={otherUser.photos?.[0]?.url} className="avatar" />
              <div style={{flex:1}}>
                <div style={{fontWeight:700}}>{otherUser.name}</div>
                <div className="muted">{m.lastMessage?.text || "No messages yet"}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}