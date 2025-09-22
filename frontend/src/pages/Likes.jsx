import React, { useState, useEffect } from 'react'
import './SimplePage.css'
import api from '../utils/api'
import { Link } from 'react-router-dom'

export default function Likes(){
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { data } = await api.get('/swipes/likes'); // Assumes you have this endpoint
        setLikes(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLikes();
  }, [])

  return (
    <div className="page container">
      <h2>Likes</h2>
      <div className="card" style={{padding:16}}>
        {likes.map(like => (
          <div key={like._id} className="row" style={{padding:12, borderBottom:'1px solid rgba(155,64,98,0.03)'}}>
            <img src={like.to.photos?.[0]?.url} className="avatar" />
            <div style={{flex:1, marginLeft:12}}>
              <Link to={`/user/${like.to._id}`}><div style={{fontWeight:700}}>{like.to.name}</div></Link>
              <div className="muted">You liked them</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}