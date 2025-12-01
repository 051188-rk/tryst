import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'
import { IoHeart, IoChatbubbles, IoSparkles } from 'react-icons/io5'

export default function Landing() {
  return (
    <div className="page landing-page">
      <div className="landing-content">
        <div className="hero-section fade-in">
          <div className="hero-logo-wrapper">
            <img src="/tryst.png" alt="Tryst" className="hero-logo" />
          </div>
          <h1 className="hero-title">
            Find your <span className="gradient-text">spark</span>
          </h1>
          <p className="hero-sub">
            The modern dating app designed for meaningful connections.
            Swipe, match, and chat in a beautiful, safe space.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="btn primary large">
              Get Started
            </Link>
            <Link to="/login" className="btn ghost large">
              I have an account
            </Link>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <IoHeart />
            </div>
            <h3>Swipe</h3>
            <p>Intuitive card-based discovery to find people you'll love.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <IoChatbubbles />
            </div>
            <h3>Chat</h3>
            <p>Real-time conversations to get to know your matches better.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <IoSparkles />
            </div>
            <h3>Connect</h3>
            <p>Designed to help you move from online to real-life connections.</p>
          </div>
        </div>
      </div>

      <div className="landing-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
    </div>
  )
}
