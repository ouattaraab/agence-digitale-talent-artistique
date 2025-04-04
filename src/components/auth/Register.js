import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'client' // Default to client
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const { firstName, lastName, email, password, confirmPassword, userType } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { confirmPassword, ...submitData } = formData;
      
      const res = await axios.post('/api/auth/register', submitData);
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // Redirect based on user type
      if (userType === 'artist') {
        navigate('/artist/onboarding');
      } else {
        navigate('/client/onboarding');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur d\'inscription');
    }
    
    setIsLoading(false);
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Inscription</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Je m'inscris en tant que</label>
            <div className="user-type-selector">
              <label className={`user-type-option ${userType === 'client' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="client"
                  checked={userType === 'client'}
                  onChange={onChange}
                />
                <span>Client</span>
                <p>Je souhaite engager des artistes</p>
              </label>
              <label className={`user-type-option ${userType === 'artist' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="artist"
                  checked={userType === 'artist'}
                  onChange={onChange}
                />
                <span>Artiste</span>
                <p>Je suis un talent à découvrir</p>
              </label>
            </div>
          </div>
          <div className="name-fields">
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={onChange}
                required
                className="form-control"
                placeholder="Votre prénom"
              />
            </div>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={onChange}
                required
                className="form-control"
                placeholder="Votre nom"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="form-control"
              placeholder="Votre email"
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="form-control"
              placeholder="Créez un mot de passe"
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label>Confirmez le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
              className="form-control"
              placeholder="Confirmez votre mot de passe"
              minLength="6"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Vous avez déjà un compte ?{' '}
            <Link to="/connexion">Connectez-vous</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;