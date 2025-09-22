import React, { useState, useEffect, useContext } from 'react'
import './SimplePage.css'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import AuthContext from '../context/AuthContext.jsx'

export default function Matches(){
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
      <h2>Matches</h2>
      <div className="card" style={{padding:16}}>
        {matches.map(m=>{
          const otherUser = m.users.find(u => u._id !== user._id);
          return (
            <Link to={'/chat/'+m._id} key={m._id} className="row" style={{padding:12, borderBottom:'1px solid rgba(155,64,98,0.03)', alignItems:'center'}}>
              <img src={otherUser.photos?.[0]?.url} className="avatar" />
              <div style={{flex:1, marginLeft:12}}>
                <div style={{fontWeight:700}}>{otherUser.name}</div>
                <div className="muted">You matched — start a conversation</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}