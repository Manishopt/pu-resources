import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div className="container-fluid">
          <div className="navbar-brand fw-bold" style={{
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: '800',
            letterSpacing: '-1px'
          }}>
            📚 PU Resources
          </div>

          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              border: 'none',
              padding: '0.5rem',
              borderRadius: '8px',
              background: 'transparent'
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  href="https://www.instagram.com/harsh._.naruka/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link fw-semibold position-relative"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    color: '#E1306C',
                    transition: 'all 0.3s ease',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    marginLeft: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#C13584';
                    e.target.style.backgroundColor = 'rgba(225, 48, 108, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#E1306C';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  � Follow us on Instagram
                </a>
              </li>
              <li className="nav-item">
                <Link 
                  to="/" 
                  className="nav-link fw-semibold position-relative"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    color: '#667eea',
                    transition: 'all 0.3s ease',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    marginLeft: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#764ba2';
                    e.target.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  🏠 Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
