import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    <img src="/tryst.png" alt="Tryst" />
                    <span className="logo-text">tryst</span>
                </Link>

                <div className="nav-links">
                    <Link to="/login" className="nav-link">Log in</Link>
                    <Link to="/signup" className="btn-nav">Get Started</Link>
                </div>
            </div>
        </nav>
    );
}
