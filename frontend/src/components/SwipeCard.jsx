import React, {useRef, useState, useEffect} from 'react'
import './SwipeCard.css'

export default function Card({data, onSwipe, zIndex=1}){
  const ref = useRef()
  const [pos, setPos] = useState({x:0,y:0,rot:0,scale:1,isDragging:false})
  const startRef = useRef(null)

  useEffect(()=> {
    const el = ref.current
    if(!el) return
    const onPointerDown = (e) => {
      el.setPointerCapture(e.pointerId)
      startRef.current = {x:e.clientX, y:e.clientY}
      setPos(p => ({...p, isDragging:true}))
    }
    const onPointerMove = (e) => {
      if(!startRef.current) return
      const dx = e.clientX - startRef.current.x
      const dy = e.clientY - startRef.current.y
      const rot = dx / 20
      const scale = 1.0
      setPos({x:dx, y:dy, rot, scale, isDragging:true})
    }
    const onPointerUp = (e) => {
      if(!startRef.current) return
      const dx = e.clientX - startRef.current.x
      if (Math.abs(dx) > 120){
        const dir = dx > 0 ? 'right' : 'left'
        // animate off-screen
        const sign = dx > 0 ? 1 : -1
        setPos(p => ({...p, x: sign*800, rot: sign*30, isDragging:false}))
        setTimeout(()=> onSwipe && onSwipe(dir), 220)
      } else {
        // reset
        setPos({x:0,y:0,rot:0,scale:1,isDragging:false})
      }
      startRef.current = null
    }

    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return ()=> {
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [onSwipe])

  const style = {
    transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rot}deg)`,
    zIndex,
    transition: pos.isDragging ? 'none' : 'transform 300ms ease'
  }

  return (
    <div ref={ref} className="swipe-card" style={style}>
      <div className="swipe-media" style={{backgroundImage:`url(${data.img})`}} />
      <div className="swipe-body">
        <div className="row" style={{justifyContent:'space-between'}}>
          <div>
            <h3>{data.name}, <span className="muted">{data.age}</span></h3>
            <p className="muted">{data.bio}</p>
          </div>
          <div className="small-heart">💗</div>
        </div>
      </div>
    </div>
  )
}
