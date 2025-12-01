import React, { useState, useEffect } from 'react'
import './Discover.css'
import Card from '../components/SwipeCard'
import api from '../utils/api'
import { IoClose, IoHeart } from 'react-icons/io5'

export default function Discover() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setCards(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="page container center" style={{ minHeight: '80vh' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="page container">
      <div className="discover-header">
        <h2>Discover</h2>
        <p className="muted">Swipe right to like, left to pass</p>
      </div>
      <div className="card deck card-large">
        <div className="deck-area">
          {cards.length === 0 && (
            <div className="empty-state">
              <IoHeart size={64} color="var(--primary)" />
              <h3>No more profiles</h3>
              <p className="muted">Check back later for new matches</p>
            </div>
          )}
          {cards.map((c, idx) => (
            <Card key={c._id} data={c} zIndex={cards.length - idx} onSwipe={(dir) => handleSwipe(c._id, dir)} />
          )).reverse()}
        </div>

        {cards.length > 0 && (
          <div className="controls">
            <button
              className="btn icon ghost swipe-btn"
              onClick={() => handleSwipe(cards[0]._id, 'left')}
            >
              <IoClose size={28} />
            </button>
            <button
              className="btn icon primary swipe-btn"
              onClick={() => handleSwipe(cards[0]._id, 'right')}
            >
              <IoHeart size={28} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}