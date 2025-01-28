import React from "react";
import "./LandingPage.css";
import landingImage from "../../assets/Landing.jpg";
import iconImage from "../../../../Design/Web-12.png";
import { Link } from "react-router-dom";
import facebookImage from "../../../../Design/Web-09.png";
import instagramImage from "../../../../Design/Web-11.png";
import equisImage from "../../../../Design/Web-10.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">
          <img src={iconImage} alt="Logo" />
        </div>
        <div className="social-links">
          <a href="https://facebook.com">
            <img src={facebookImage} alt="Facebook" className="Icon" />
          </a>
          <a href="https://instagram.com">
            {" "}
            <img src={instagramImage} alt="Instagram" className="Icon" />
          </a>
          <a href="https://twitter.com">
            <img src={equisImage} alt="LogoX" className="Icon" />
          </a>
        </div>
      </header>

      <section className="video-container">
        <video
          muted
          autoPlay
          loop
          onPlay={() => console.log("Reproduciendo")}
          onPause={() => console.log("Pausado")}
          onError={() => console.log("Error")}
        >
          <source src="/video.mp4" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
        <div className="hero__text">
          {/*
          <div className="T3a">¿</div>
          <p>QUÉ TIENES HOY...</p>
          <div className="T1a">PAH</div>
          <div className="T2a">KOMÉ!</div>
          <div className="T3b">?</div>
          */}
          <span className="animate-hero hero__text--question hero__text--question-l delay-35">
            ¿
          </span>
          <div className="hero__text--top">
            <span className="animate-hero delay-5">qué</span>&nbsp;
            <span className="animate-hero delay-10">tienes</span>&nbsp;
            <span className="animate-hero delay-15">hoy</span>&nbsp;
            <span className="animate-hero delay-20">...</span>&nbsp;
          </div>
          <div className="hero__text--bottom">
            <span className="hero__text--pah animate-hero delay-25">pah</span>
            &nbsp;
            <span className="hero__text--kome animate-hero delay-30">komé</span>
            &nbsp;
          </div>
          <span className="animate-hero hero__text--question hero__text--question-r delay-35">
            ?
          </span>

          <button className="continue-btn1">
            <Link to="/search">YO TE LO MUESTRO</Link>
          </button>
        </div>
      </section>

      <section className="explication1">
        <div className="divImage">
          <img src={landingImage} alt="Imagen" className="image" />
          <div className="overlay"></div>
        </div>

        <div className="divText">
          <div className="Title">
            <div className="T1">PAH</div>
            <div className="T2">KOMÉ!</div>
          </div>

          <p>
            SOLO TE PEDIMOS QUE INTROUZCAS LOS INGREDIENTES DE TU NEVERA, EL
            TIEMPO QUE TIENES PARA COCINAR, SI TENEMOS QUE TENER ALGO EXTRA EN
            CUENTA Y DEJAR QUE PAHKOMÉ! HAGA SU MAGIA
          </p>
        </div>
      </section>

      <section className="explication2">
        <ul>
          <li>AHORRAMOS TIEMPO</li>
          <li>OPTIMIZA TU COMPRA DIARIA</li>
          <li>SIN DOLORES DE CABEZA</li>
          <li>PLATOS ELABORADOS CON INGREDIENTES SENCILLOS</li>
        </ul>
      </section>

      <div className="line"></div>
      <footer className="footer">
        <button className="continue-btn">
          <Link to="/search">CONTINUAR</Link>
        </button>
      </footer>
    </div>
  );
};

export default LandingPage;
