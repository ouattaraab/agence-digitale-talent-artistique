import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <h1>ADTA</h1>
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link to="/browse-artists" className="nav-link">Découvrir des Artistes</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">À Propos</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
          </ul>

          <div className="auth-buttons">
            <Link to="/login" className="btn btn-secondary">Connexion</Link>
            <Link to="/register" className="btn btn-primary">Inscription</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
