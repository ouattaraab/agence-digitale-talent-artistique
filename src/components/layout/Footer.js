import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>À propos</h3>
            <p>Agence Digitale de Talent Artistique est une plateforme qui connecte les artistes ivoiriens avec des opportunités professionnelles.</p>
          </div>
          
          <div className="footer-section links">
            <h3>Liens Rapides</h3>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/artistes">Découvrir des artistes</Link></li>
              <li><Link to="/comment-ca-marche">Comment ça marche</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section contact">
            <h3>Contact</h3>
            <p><i className="fas fa-map-marker-alt"></i> Abidjan, Côte d'Ivoire</p>
            <p><i className="fas fa-phone"></i> +225 XX XX XX XX</p>
            <p><i className="fas fa-envelope"></i> contact@adta.ci</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            </div>
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