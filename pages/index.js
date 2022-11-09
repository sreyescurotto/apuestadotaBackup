import React from "react";
import Link from "next/link";
import Head from "next/head";
import NavbarFirst from "../components/Navbar/NavbarFirst";
import Footer from "../components/Footer/Footer";
import Script from "next/script";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Banner from "../components/Banner";



export async function getStaticProps({ locale }) {
  const response = await import(`../lang/${locale}.json`);
  return {
    props: {
      home: response.default.home,
      navbar: response.default.navbar,
      footer: response.default.footer,
    },
  };
}

const Home = (props) => {
  const { home, navbar, footer } = props;
  const router = useRouter();

  const particlesInit = useCallback(async engine => {
  
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async container => {
   // set the container size
   
}, []);
  
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

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-K63L1CV95V"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-K63L1CV95V');
        `}
      </Script>

      <div className="App">
        <div className="main">
          <NavbarFirst  props={navbar}/>



          <div className="fixed-button-container">

          <Particles
            id="tsparticles"
            className="particles"
            canvasClassName="particles-canvas"
            init={particlesInit}
            loaded={particlesLoaded}
            style={ {
              position: "fixed",
              zIndex: "-1",
              transform: "translate(75%, 75%)",

            }}
            options={{
    "fullScreen": {
        "enable": true,
    },
    "fpsLimit": 120,
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#b6ff40"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 3,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 10,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 20,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#b6ff40",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab",
                "parallax": {
                    "enable": true,
                    "smooth": 10,
                    "force": 60
                }
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 0.8,
                "speed": 3
            },
            "repulse": {
                "distance": 200
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true,
    "background": {
        "color": "transparent",
        "image": "",
        "position": "50% 50%",
        "repeat": "no-repeat",
        "size": "cover"
    }
}}
        />

            <Link href="/play/normal" locale={router.locale}>
              <a>
                <button className="fixed-button" id="fixed-button">
                  {
                    home.section3title2
                  }
                </button>
              </a>
            </Link>
          </div>

          <section className="first-section">
            <div className="intro">
              <h1 className="title-1">
                {
                  home.title
                } <br /> 
                {
                  home.title2
                }
              </h1>

              <p className="subtitle-1">
                { home.subtitle} <br />
                { home.subtitle2}
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

            <div>

              <Banner />
            </div>

            {/* <h1 className="title-1 cursive center mtop">
              <span className="blue">{ home.subtitle3 } </span> {
                home.subtitle4 }
            </h1> */}
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
                {home.section2title1} <br />
                {home.section2title12}
              </h3>
            </div>

            <div className="section2-text text-02">
              <h3 className="title-2">
                {home.section2title2}
                <br />
                {home.section2title22}
              </h3>
            </div>

            <div className="section2-text text-03">
              <h3 className="title-2">
                {home.section2title3} <br />
                {home.section2title32}
              </h3>
            </div>
          </section>

          <div className="relative">
            <h1 className="title-1 cursive center">
              <span className="blue">{home.section3title1}</span> {home.section3title3}
              <p className="poppins center font-m">
               {home.section3subtitle}
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
                      <p className="info-text-cont first-text-c">
                          
                          {home.info1}
                        </p>
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
                      <p className="info-text-cont mid-text-c">
                        
                        {home.info2}
                      </p>
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
                      <p className="info-text-cont last-text-c">
                        
                        {home.info3}
                      </p>
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
          <Footer  props={footer}/>   
        </div>
      </div>
     

      <style jsx>{`
        @font-face {
          font-family: Geometrik Blk;
          src: url("font/geometric.ttf") format("opentype");
        }
        .App {
          height: 1080px;
          overflow-y: scroll;
        }
        .main {
          position: relative;
        }
        .spacer-container {
          width: 100%;
          height: 240px;
          position: relative;
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
          filter: drop-shadow(0px 0px 30px #00a2ffaf);
        }
        .info-cont .info-img:hover .info-text-cont {
          color: #00a2ffaf;
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
        .info-img {
          position: relative;
        }
        .info-text-cont {
          position: absolute;
        z-index: 2;
        color: #000;
        font-family: "Bebas Neue", cursive;
        font-size: 2.5rem;
        pointer-events: none;
        text-align: center;
        font-weight: 600;
        top: 11%;
        }
        .first-text-c {
          left: 45%;
        }
        .mid-text-c {
          left: 51%;
          width: 180px;
        }
        .last-text-c {
          left: 33%;
        }
        @media only screen and (max-width: 1366px) {
          .App {
            height: 768px;
          }
            .overlay-gradient {
              top: 18%;
            }
            .title-1 {
              font-size: 2.8em;
              line-height: 46px;
            }
            .subtitle-1 {
              font-size: 1em;
            }
            .videocontainer {
              height: 80vh;
            }
            .section-text h3 {
              font-size: 1.8rem;
            }
            .text-03 {
              bottom: 175px;
              left: 25%;
            }
            .relative h1 {
              top: 30%;
              left: 30%;
            }
            .info-cont {
              width: 300px;
            }
            .mid-text-c {
              left:48%;
              width: 140px;
            }
            .info-text-cont {
              font-size: 2rem;
            }     
        }
        
        @media only screen and (max-width: 485px) {
          .absolute-social-c img {
            width: 60px;
          }
          .info-text-cont{ 
            font-size: 1.2rem;
          }
          .first-text-c {
          left: 42%;
          }
          .mid-text-c {
            left: 44%;
            width: auto;
          }
        }
      `}</style>
    </>
  );
};

export default Home;