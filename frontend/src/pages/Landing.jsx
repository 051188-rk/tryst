import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Landing.css';
import { IoHeart, IoChatbubbles, IoSparkles, IoShieldCheckmark, IoInfinite, IoArrowForward } from 'react-icons/io5';

const ScrollReveal = ({ children, className = '' }) => {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
};

export default function Landing() {
    return (
        <div className="landing-root">
            <Navbar />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Find your <span className="serif-italic">forever</span>
                            <br /> in a moment.
                        </h1>
                        <p className="hero-sub">
                            The dating app for those who appreciate the finer details of connection.
                            Swipe, match, and fall in love with style.
                        </p>
                        <div className="hero-actions">
                            <Link to="/signup" className="btn-primary">
                                Start Matching <IoArrowForward />
                            </Link>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="floating-hearts">
                            <IoHeart className="heart h1" />
                            <IoHeart className="heart h2" />
                            <IoHeart className="heart h3" />
                        </div>
                        <div className="hero-card-stack">
                            <div className="card-mockup c1"></div>
                            <div className="card-mockup c2"></div>
                            <div className="card-mockup c3"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid Section */}
            <section className="bento-section">
                <div className="container">
                    <ScrollReveal>
                        <h2 className="section-title text-center">Designed for <span className="serif-italic">Connection</span></h2>
                    </ScrollReveal>

                    <div className="bento-grid">
                        <ScrollReveal className="bento-item large span-2">
                            <div className="bento-content">
                                <IoSparkles className="bento-icon" />
                                <h3>Smart Matching</h3>
                                <p>Our algorithm understands your type better than you do.</p>
                                <div className="bento-visual match-visual"></div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal className="bento-item">
                            <div className="bento-content">
                                <IoShieldCheckmark className="bento-icon" />
                                <h3>Safe & Secure</h3>
                                <p>Verified profiles only.</p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal className="bento-item">
                            <div className="bento-content">
                                <IoInfinite className="bento-icon" />
                                <h3>Unlimited Likes</h3>
                                <p>For premium members.</p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal className="bento-item span-2">
                            <div className="bento-content horizontal">
                                <div className="text">
                                    <IoChatbubbles className="bento-icon" />
                                    <h3>Real Conversations</h3>
                                    <p>Skip the small talk with our icebreakers.</p>
                                </div>
                                <div className="chat-visual">
                                    <div className="msg me">Hey! 👋</div>
                                    <div className="msg them">Love your bio!</div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Love Animation Section */}
            <section className="love-section">
                <div className="container center-col">
                    <ScrollReveal>
                        <div className="love-circle">
                            <div className="pulse-ring"></div>
                            <IoHeart className="love-icon" />
                        </div>
                        <h2 className="section-title">Ready to find <span className="highlight">Love?</span></h2>
                        <p className="section-sub">Join thousands of happy couples who found their match on Tryst.</p>
                        <Link to="/signup" className="btn-primary large">
                            Join Now
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <img src="/tryst.png" alt="Tryst" className="footer-logo" />
                            <span className="logo-text">tryst</span>
                            <p>Made with ❤️ for real connections.</p>
                        </div>
                        <div className="footer-links">
                            <div className="col">
                                <h4>Company</h4>
                                <a href="#">About</a>
                                <a href="#">Careers</a>
                                <a href="#">Press</a>
                            </div>
                            <div className="col">
                                <h4>Legal</h4>
                                <a href="#">Privacy</a>
                                <a href="#">Terms</a>
                                <a href="#">Safety</a>
                            </div>
                            <div className="col">
                                <h4>Social</h4>
                                <a href="#">Instagram</a>
                                <a href="#">Twitter</a>
                                <a href="#">TikTok</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2025 Tryst Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
