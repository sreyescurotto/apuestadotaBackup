import React from "react";
import Link from "next/link";
import Head from "next/head";
import NavbarFirst from "../components/Navbar/NavbarFirst";
import Footer from "../components/Footer/Footer";
import Script from "next/script";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import Banner from "../components/Banner";
import Share from "../components/Share";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";
import Steam from "../lb/steam";


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
  const [yAxi, setyAxi] = useState(33);
  const [xAxi, setxAxi] = useState(40);
  const [firstLoader, setFirstLoader] = useState(true);
  const ref1 = useRef();


  // Attach the scroll listener to the div
  useEffect(() => {
    const handleScroll = () => {
      const hand1 = ref1.current;
      const { y, x } = hand1.getBoundingClientRect();
      const minusY = yAxi + y;
      const minusX = xAxi + y * 0.14;

      if (minusY > 0) {
        setyAxi(minusY);
      } else {
        setyAxi(0);
      }
      if (minusX > 0) {
        setxAxi(minusX);
      } else {
        setxAxi(0);
      }
    };

    setTimeout(() => {
      setFirstLoader(false);
    }, 5000);

    window.addEventListener("scroll", handleScroll, true);

    return () => window.removeEventListener("scroll", handleScroll, true);
    //execute after 5 seconds
   
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

        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />

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

      { 
        firstLoader ? 
        <Spinner/>
        :
        <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>
      <div className="App">
        <div className="main">
          <NavbarFirst props={navbar} />
          <div
            className="fixed-button-container"
            style={{
              bottom: `${yAxi}%`,
              right: `${xAxi}%`,
            }}
          >
            <Link href="/play/normal" locale={router.locale}>
              <a>
                <button className="fixed-button" id="fixed-button">
                  {home.section3title2}
                </button>
              </a>
            </Link>
          </div>

          <section className="first-section" ref={ref1}>
            <div className="intro">

              <h1 className="title-1">
                {home.title} <br />
                {home.title2}
              </h1>

              <p className="subtitle-1">
                {home.subtitle} <br />
                {home.subtitle2}
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
              <Banner props={home} />
            </div>
          </section>

          <div className="overlay-gradient"></div>

          <section className="second-section">
            <Image
              src="/aegis-background.jpg"
              className="aegis-background"
              alt="Aegis"
              layout="fill"
              priority={true}
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
          <Share />
          <div className="relative">
            <h1 className="title-1 cursive center">
              <span className="blue">{home.section3title1}</span>{" "}
              {home.section3title3}
              <p className="poppins center font-m">{home.section3subtitle}</p>
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
                      <p className="info-text-cont mid-text-c">{home.info2}</p>
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
                      <p className="info-text-cont last-text-c">{home.info3}</p>
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
          <Steam />
          <Footer props={footer} />
        </div>
        </div>
      </motion.div>
      }

      

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

        .info-img {
          position: relative;
        }
        .info-text-cont {
          position: absolute;
          z-index: 2;
          color: var(--black);
      
          font-size: 2.3rem;
          pointer-events: none;
          text-align: center;
          font-weight: 600;
          top: 11%;
        }
        .first-text-c {
          left: 45%;
        }
        .mid-text-c {
          left: 47%;
          width: 220px;
        }
        .last-text-c {
          left: 33%;
        }
        @media only screen and (max-width: 1366px) {
          .App {
            height: 768px;
          }
          .subtitle-1 {
            font-size: 1em;
          }
          .videocontainer {
            height: 70vh;
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
            left: 48%;
            width: 140px;
          }
          .info-text-cont {
            font-size: 1.5rem;
          }
        }

        @media only screen and (max-width: 485px) {
          .info-text-cont {
            font-size: 1rem;
            width: 110px;
          }
          .first-text-c {
            left: 46%;
          }
          .mid-text-c {
            left: 47%;
            width: 99px;
          }
          .last-text-c {
            left: 42%;
          }
          .info-img {
            display: flex;
            justify-content: center;
            
          }
        }
      `}</style>
    </>
  );
};

export default Home;
