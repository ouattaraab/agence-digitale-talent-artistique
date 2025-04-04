import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-heading">Agence Digitale de Talent Artistique</h3>
            <p className="footer-text">
              Connecter les talents artistiques ivoiriens avec des opportunités de prestations.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Liens Rapides</h3>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/browse-artists">Découvrir des Artistes</Link></li>
              <li><Link to="/about">À Propos</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Compte</h3>
            <ul className="footer-links">
              <li><Link to="/login">Connexion</Link></li>
              <li><Link to="/register">Inscription</Link></li>
              <li><Link to="/artist-registration">Devenir Artiste</Link></li>
              <li><Link to="/client-registration">Devenir Client</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-contact">
              <li><i className="fas fa-map-marker-alt"></i> Abidjan, Côte d'Ivoire</li>
              <li><i className="fas fa-phone"></i> +225 XX XX XX XX</li>
              <li><i className="fas fa-envelope"></i> contact@adta.ci</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Agence Digitale de Talent Artistique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
