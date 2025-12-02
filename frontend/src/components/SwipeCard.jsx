import React, { useRef, useState, useEffect } from 'react'
import './SwipeCard.css'
import { IoHeart, IoLocationSharp, IoClose } from 'react-icons/io5'

export default function Card({ data, onSwipe, zIndex = 1 }) {
  const ref = useRef()
  const [pos, setPos] = useState({ x: 0, y: 0, rot: 0, scale: 1, isDragging: false, velocity: 0 })
  const startRef = useRef(null)
  const lastPosRef = useRef({ x: 0, time: Date.now() })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onPointerDown = (e) => {
      el.setPointerCapture(e.pointerId)
      startRef.current = { x: e.clientX, y: e.clientY }
      lastPosRef.current = { x: e.clientX, time: Date.now() }
      setPos(p => ({ ...p, isDragging: true, scale: 1.05 }))
    }

    const onPointerMove = (e) => {
      if (!startRef.current) return
      const dx = e.clientX - startRef.current.x
      const dy = e.clientY - startRef.current.y
      const rot = dx / 15 // More responsive rotation

      // Calculate velocity
      const now = Date.now()
      const timeDiff = now - lastPosRef.current.time
      const velocity = timeDiff > 0 ? (e.clientX - lastPosRef.current.x) / timeDiff : 0

      lastPosRef.current = { x: e.clientX, time: now }
      setPos({ x: dx, y: dy, rot, scale: 1.05, isDragging: true, velocity })
    }

    const onPointerUp = (e) => {
      if (!startRef.current) return
      const dx = e.clientX - startRef.current.x
      const velocity = pos.velocity

      // Consider both distance and velocity for swipe detection
      const shouldSwipe = Math.abs(dx) > 100 || Math.abs(velocity) > 0.5

      if (shouldSwipe) {
        const dir = dx > 0 ? 'right' : 'left'
        const sign = dx > 0 ? 1 : -1

        // Enhanced exit animation with velocity
        const exitDistance = 1000 + Math.abs(velocity) * 200
        const exitRotation = sign * (40 + Math.abs(velocity) * 20)

        setPos(p => ({
          ...p,
          x: sign * exitDistance,
          y: dy * 0.5, // Slight vertical movement
          rot: exitRotation,
          scale: 0.8,
          isDragging: false
        }))

        setTimeout(() => onSwipe && onSwipe(dir), 250)
      } else {
        // Bounce back animation
        setPos({ x: 0, y: 0, rot: 0, scale: 1, isDragging: false, velocity: 0 })
      }
      startRef.current = null
    }

    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [onSwipe, pos.velocity])

  const style = {
    transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rot}deg) scale(${pos.scale})`,
    zIndex,
    transition: pos.isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: pos.isDragging ? 'grabbing' : 'grab'
  }

  const imageUrl = data.photos?.[0]?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop';
  const age = data.dob ? new Date().getFullYear() - new Date(data.dob).getFullYear() : '25';

  // Calculate opacity for indicators based on swipe distance
  const likeOpacity = Math.min(Math.max(pos.x / 100, 0), 1)
  const nopeOpacity = Math.min(Math.max(-pos.x / 100, 0), 1)

  return (
    <div ref={ref} className="swipe-card" style={style}>
      {/* Swipe indicators with dynamic opacity */}
      {pos.x > 10 && (
        <div className="swipe-indicator like" style={{ opacity: likeOpacity }}>
          <IoHeart size={48} />
          <span>LIKE</span>
        </div>
      )}
      {pos.x < -10 && (
        <div className="swipe-indicator nope" style={{ opacity: nopeOpacity }}>
          <IoClose size={48} />
          <span>NOPE</span>
        </div>
      )}

      <div className="swipe-media" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="swipe-body">
        <div className="swipe-info">
          <div>
            <h3>{data.name}, <span className="age">{age}</span></h3>
            {data.bio && <p className="bio">{data.bio}</p>}
            {data.location && (
              <div className="location">
                <IoLocationSharp size={16} />
                <span>Nearby</span>
              </div>
            )}
          </div>
          <div className="heart-icon">
            <IoHeart size={24} color="var(--primary)" />
          </div>
        </div>
      </div>
    </div>
  )
}
