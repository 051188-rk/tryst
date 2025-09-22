import React, {useState, useEffect} from 'react'
import './Discover.css'
import Card from '../components/SwipeCard'
import api from '../utils/api'

export default function Discover(){
  const [cards, setCards] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users'); // This endpoint needs to be created in your backend
        setCards(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, [])

  const handleSwipe = async (id, dir) => {
    try {
      await api.post('/swipes', { to: id, type: dir === 'right' ? 'like' : 'dislike' });
      setCards(prev => prev.filter(c => c._id !== id))
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="page container">
      <h2>Discover</h2>
      <div className="card deck card-large">
        <div className="deck-area">
          {cards.length===0 && <div className="center" style={{padding:40}}>No more profiles for now 💕</div>}
          {cards.map((c, idx)=>(
            <Card key={c._id} data={c} zIndex={cards.length - idx} onSwipe={(dir)=>handleSwipe(c._id, dir)} />
          )).reverse()}
        </div>

        <div className="controls row center" style={{padding:16, justifyContent:'center'}}>
          <button className="btn ghost" onClick={()=>{ if(cards[0]) handleSwipe(cards[0]._id, 'left') }}>✖</button>
          <button className="btn primary" onClick={()=>{ if(cards[0]) handleSwipe(cards[0]._id, 'right') }}>♥</button>
        </div>
      </div>
    </div>
  )
}