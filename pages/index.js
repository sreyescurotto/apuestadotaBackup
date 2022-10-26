import React from "react";

import Link from "next/link";

import Head from "next/head";

import NavbarFirst from "../components/Navbar/NavbarFirst";

import Footer from "../components/Footer/Footer";

import Script from "next/script";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <Head>
        <title>Apuesta Dota</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content="Apuesta Dota es una plataforma de apuestas de Dota 2, donde puedes apostar por tus propias partidas y ganar dinero real."
        />

        <meta
          name="keywords"
          content="Dota, Dota2, Bets, Ranked, Apuesta, Peru, Dinero, Dinero Facil"
        />

        <meta name="author" content="Apuesta Dota" />

        <meta property="og:title" content="Apuesta Dota" />

        <meta
          property="og:description"
          content="Apuesta Dota es una plataforma de apuestas de Dota 2, donde puedes apostar por tus propias partidas y ganar dinero real."
        />

        <meta property="og:image" content="/logo-morado.jpg" />

        <link rel="shortcut icon" href="/icons/favicon/favicon-32.png" />
      </Head>

      <div className="App">
        <div className="main">
          <NavbarFirst />

          <div className="fixed-button-container">
            {/* CAMBIAR */}

            <Link href="/play/normal">
              <a>
                <button className="fixed-button" id="fixed-button">
                  EMPEZAR
                </button>
              </a>
            </Link>
          </div>

          <section className="first-section">
            <div className="intro">
              <h1 className="title-1">
                Apuesta, juega <br /> y gana
              </h1>

              <p className="subtitle-1">
                ¿Cansado de que te digan que busques un trabajo? <br /> ¡Gana
                dinero jugando Dota 2!
              </p>
            </div>

            <div className="videocontainer">
              <div></div>

              <video autoPlay muted loop id="myVideo" preload="auto">
                <source src="esports_on_demand.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div id="myVideo2">
              <Image src="/vertical-p.jpg" alt="Cover" layout="fill" />
            </div>

            <div></div>

            <h1 className="title-1 cursive center mtop">
              <span className="blue">¿ Listo </span> para comenzar ?
            </h1>
          </section>

          <div className="overlay-gradient"></div>

          <section className="second-section">
            <Image
              src="/aegis-background.png"
              className="aegis-background"
              alt="Aegis"
              layout="fill"
            />

            <div className="section2-text text-01">
              <h3 className="title-2">
                APUESTA A TU PROPIA <br />
                PARTIDA RANKED
              </h3>
            </div>

            <div className="section2-text text-02">
              <h3 className="title-2">
                GANA Y TE PAGAMOS
                <br />
                EL 40% DE TU APUESTA
              </h3>
            </div>

            <div className="section2-text text-03">
              <h3 className="title-2">
                VELOCIDAD Y SEGURIDAD <br />
                EN TODAS TUS TRANSACCIONES
              </h3>
            </div>
          </section>

          <div className="relative">
            <h1 className="title-1 cursive center">
              <span className="blue">¿ Como</span> empezar ?
              <p className="poppins center font-m">
                APUESTA Y APROVECHA AL MAXIMO TUS HABILIDADES DOTERAS.
              </p>
            </h1>

            <div className="spacer-container">
              <Image
                src="/spacer.jpg"
                className="spacer"
                alt="spacer"
                layout="fill"
              />
            </div>
          </div>

          <section className="third-section">
            <div className="third-section-large-header">
              <Image
                src="/swirl_bg.jpg"
                alt="sas"
                className="top-image"
                layout="fill"
              />

              <div className="third-section-intro-content">
                <div className="absolute-social-c">
                  <a
                    href="https://www.instagram.com/apuestadota/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="social-c">
                      <Image
                        src="/social/social_insta.png"
                        alt="Instagram"
                        width={70}
                        height={70}
                      />
                    </div>
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=100086433217956"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="social-c">
                      <Image
                        src="/social/social_fb.png"
                        className="social-c"
                        alt="Facebook"
                        width={70}
                        height={70}
                      />
                    </div>
                  </a>
                </div>

                <div className="intro-content">
                  <div className="info-cont">
                    <div className="info-img">
                      <Image
                        src="/heros/shaman.png"
                        alt="Shaman"
                        width={450}
                        height={540}
                      />
                    </div>
                  </div>

                  <div className="info-cont">
                    <div className="info-img">
                      <Image
                        src="/heros/shops.png"
                        className="info-img"
                        alt="Shops"
                        width={450}
                        height={540}
                      />
                    </div>
                  </div>

                  <div className="info-cont">
                    <div className="info-img">
                      <Image
                        src="/heros/beast.png"
                        className="info-img"
                        alt="Beast"
                        width={450}
                        height={540}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>

      <style jsx>{`
        @font-face {
          font-family: Geometrik Blk;

          src: url("font/geometric.ttf") format("opentype");
        }

        .spacer-container {
          width: 100%;
          height: 240px;
        }

        .aegis-background {
          width: 100%;

          height: 120%;

          object-fit: cover;
        }

        .section2-text {
          position: absolute;

          margin: 1rem 8rem;
        }

        .second-section {
          height: 115vh;
          margin-bottom: 3%;
        }

        .relative {
          position: relative;
        }

        .relative h1 {
          position: absolute;

          left: 30%;

          top: 20%;

          text-shadow: 2px 2px 4px #000000;

          z-index: 2;
        }

        .text-01 {
          top: 27%;
        }

        .text-02 {
          top: 27%;

          right: 0;
        }

        .text-03 {
          bottom: 90px;

          left: 31%;
        }

        .section2-text h3 {
          text-shadow: 5px 5px 6px #000000;

          font-size: 2.2rem;

          font-family: Geometrik Blk, sans-serif;
        }

        .intro-content {
          display: flex;
        }

        .info-cont img {
          width: 100%;

          height: 100%;

          transition: all 0.3s ease;
        }

        .info-cont .info-img:hover {
          background: -webkit-linear-gradient(#cefcff 10%, #2a748b 90%);

          background-clip: text;

          -webkit-background-clip: text;

          -webkit-text-fill-color: transparent;

          filter: drop-shadow(0px 0px 30px #00a2ffaf);
        }

        .absolute-social-c {
          position: absolute;

          top: 0;

          left: 0;

          margin: 1rem 4rem;
        }

        .social-c {
          margin: 1rem 0.5rem;

          width: 70px;

          cursor: pointer;
        }

        .social-c:hover {
          filter: brightness(1.3);
        }

        @media only screen and (max-width: 415px) {
          .absolute-social-c img {
            width: 60px;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
