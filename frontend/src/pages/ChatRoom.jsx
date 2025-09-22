import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import './ChatRoom.css'
import api from '../utils/api'
import { socket } from '../utils/socket'
import AuthContext from '../context/AuthContext.jsx'

export default function ChatRoom(){
  const {id: matchId} = useParams()
  const [msgs, setMsgs] = useState([])
  const [text, setText] = useState('')
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.get(`/matches/${matchId}/messages`);
        setMsgs(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMessages();

    socket.connect();
    socket.emit('join_match', { matchId });

    const onNewMessage = (msg) => {
      setMsgs(prev => [...prev, msg]);
    }

    socket.on('new_message', onNewMessage);

    return () => {
      socket.off('new_message', onNewMessage);
      socket.disconnect();
    }
  }, [matchId]);

  const send = (e) => {
    e.preventDefault()
    if(!text) return
    socket.emit('send_message', { matchId, text });
    setText('')
  }

  return (
    <div className="page container">
      <h2>Chat</h2>
      <div className="card chat-area">
        <div className="messages">
          {msgs.map(m=>(
            <div key={m._id} className={'bubble ' + (m.sender === user._id ? 'me' : 'them')}>{m.text}</div>
          ))}
        </div>
        <form className="composer" onSubmit={send}>
          <input className="input" value={text} onChange={e=>setText(e.target.value)} placeholder="Write a sweet message..." />
          <button className="btn primary">Send</button>
        </form>
      </div>
    </div>
  )
}