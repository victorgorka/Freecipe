import React from 'react';
import './LandingPage.css';
import landingImage from '../assets/Landing.jpg';
import iconImage from '../../../../Design/Web-12.png';
import { Link } from 'react-router-dom';
import facebookImage from '../../../../Design/Web-09.png';
import instagramImage from '../../../../Design/Web-11.png';
import equisImage from '../../../../Design/Web-10.png';



const LandingPage = () => {
  return (
    <div className="landing-page">

      <header className="header">
        <div className="logo">
          <img src={iconImage} alt="Logo" />
        </div>
        <div className="social-links">
  <a href="https://facebook.com"><img src={facebookImage} alt="Facebook"className="Icon"/></a>
  <a href="https://instagram.com"> <img src={instagramImage} alt="Instagram"className="Icon"/></a>
  <a href="https://twitter.com"><img src={equisImage} alt="LogoX" className="Icon"/></a>
        </div>
      </header>

      {/* <main className="main-content">
        <div className="info-box">
          <div className="text-left">
            <h2 className="LigthFont">Pah</h2>
            <h2 className="BoldFont">komé!</h2>
            <p>Dentro de poco Miroslav se va a ahorrar un pastizal en champú</p>
          </div>
          <div className="image-right">
            <img src={landingImage} alt="Illustration" />
          </div>
        </div>
      </main> */}
    <div className="video-container">
      <video controls>
        <source src="../assets/video.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>

      <div className="line"></div>
      <footer className="footer">
        <button className="continue-btn"><Link to="/search">CONTINUAR</Link></button>
      </footer>
    </div>
  );
};

export default LandingPage;
