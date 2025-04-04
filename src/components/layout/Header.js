import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">Agence Digitale de Talent Artistique</Link>
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/artistes">Artistes</Link></li>
            <li><Link to="/evenements">Événements</Link></li>
            <li><Link to="/connexion">Connexion</Link></li>
            <li><Link to="/inscription" className="btn-register">Inscription</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;