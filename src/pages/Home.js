import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Découvrez Les Meilleurs Talents Artistiques Ivoiriens</h1>
            <p className="hero-subtitle">
              Plateforme de mise en relation entre artistes et clients pour des prestations exceptionnelles
            </p>
            <div className="hero-buttons">
              <Link to="/browse-artists" className="btn btn-primary btn-lg">
                Découvrir des Artistes
              </Link>
              <Link to="/artist-registration" className="btn btn-secondary btn-lg">
                Devenir Artiste
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Comment ça marche</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="feature-title">Recherchez</h3>
              <p className="feature-text">
                Trouvez l'artiste parfait pour votre événement parmi une sélection diversifiée de talents.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3 className="feature-title">Réservez</h3>
              <p className="feature-text">
                Effectuez votre réservation en quelques clics et recevez une confirmation immédiate.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <h3 className="feature-title">Payez en toute sécurité</h3>
              <p className="feature-text">
                Utilisez notre système de paiement sécurisé avec versement d'acompte et solde après prestation.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3 className="feature-title">Profitez et évaluez</h3>
              <p className="feature-text">
                Savourez votre événement et partagez votre expérience pour aider la communauté.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Categories Section */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Explorez par Catégorie</h2>
          <div className="categories-grid">
            <Link to="/browse-artists?category=musicien" className="category-card">
              <div className="category-overlay"></div>
              <h3 className="category-title">Musiciens</h3>
            </Link>

            <Link to="/browse-artists?category=dj" className="category-card">
              <div className="category-overlay"></div>
              <h3 className="category-title">DJs</h3>
            </Link>

            <Link to="/browse-artists?category=danseur" className="category-card">
              <div className="category-overlay"></div>
              <h3 className="category-title">Danseurs</h3>
            </Link>

            <Link to="/browse-artists?category=humoriste" className="category-card">
              <div className="category-overlay"></div>
              <h3 className="category-title">Humoristes</h3>
            </Link>

            <Link to="/browse-artists?category=peintre" className="category-card">
              <div className="category-overlay"></div>
              <h3 className="category-title">Peintres</h3>
            </Link>

            <Link to="/browse-artists?category=performeur" className="category-card">
              <div className="category-overlay"></div>
              <h3 className="category-title">Performeurs</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Prêt à transformer votre événement?</h2>
            <p className="cta-text">
              Rejoignez notre plateforme aujourd'hui et accédez aux meilleurs talents artistiques de Côte d'Ivoire
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary btn-lg">
                S'inscrire maintenant
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
