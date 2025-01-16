import React from 'react';
import './LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import landingImage from '../assets/Landing.jpg';
import iconImage from '../assets/Web-02.png';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">
          <img src={iconImage} alt="Logo" />
        </div>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faFacebookF} size="2x" /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faTwitter} size="2x" /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
        </div>
      </header>

      <main className="main-content">
        <div className="info-box">
          <div className="text-left">
            <h2>Welcome to Our Platform!</h2>
            <p>We offer amazing features to help you connect and grow. Join us today!</p>
          </div>
          <div className="image-right">
            <img src={landingImage} alt="Illustration" />
          </div>
        </div>
      </main>

      <footer className="footer">
        <button className="continue-btn">CONTINUAR</button>
      </footer>
    </div>
  );
};

export default LandingPage;
