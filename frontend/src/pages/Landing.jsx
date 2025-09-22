import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

export default function Landing(){
  return (
    <div className="page">
      <header className="landing-hero card">
        <div className="container center" style={{flexDirection:'column', gap:20, padding:40}}>
          <h1 className="hero-title">Lovely — Find your spark</h1>
          <p className="hero-sub">Swipe, match and chat — made with hearts and code. A pink and white romantic UI to get you started.</p>
          <div className="row" style={{marginTop:8}}>
            <Link to="/signup" className="btn primary">Get started</Link>
            <Link to="/login" className="btn ghost">Already have an account?</Link>
          </div>
        </div>
      </header>

      <section className="container" style={{marginTop:24}}>
        <div className="card features">
          <div style={{padding:20}}>
            <h3>Why Lovely?</h3>
            <p>Simple UX, charming colors, and features you expect: swipe, match, chat, and go premium for more visibility.</p>
            <div className="row" style={{marginTop:12}}>
              <div className="feature">
                <div className="icon">💗</div>
                <div><strong>Swipe</strong><div className="muted">Intuitive card-based discovery</div></div>
              </div>
              <div className="feature">
                <div className="icon">💬</div>
                <div><strong>Chat</strong><div className="muted">Real-time conversations</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
