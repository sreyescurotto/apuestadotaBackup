import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import AppService from "../../services/app.service";
import dayjs from "dayjs";

export default function Banner(props) {
  const home = props.props;

  const dotaImageBase = "https://cdn.cloudflare.steamstatic.com";

  const [apuestas, setApuestas] = useState([]);

  const [user, setUser] = useState([]);

  const [heroes, setHeroes] = useState({});

  const [searching, setSearching] = useState(false);

  const [cont, setCont] = useState(-1700);

  const updateCont = () => {
    if (cont < 0) {
      setCont(cont + 170);
    } else {
      setCont(-1700);
    }
  };

  const findIndex = (identificador) => {
    //find index of user where id = identificador
    const index = user.findIndex((user) => user.id === identificador);
    return index;
  };

  async function getApuestas() {
    // fetching bets from api
    let s = new AppService();

    setSearching(true);

    const res = await s.makeGet("profileAll", {}, true);
    setUser(
      res.data.map((item) => {
        item.timestamp = dayjs(item.created_at).format("MM/DD/YYYY HH:mm:ss");
        return item;
      })
    );

    const betsres = await s.makeGet("apuestasAll", {}, true);
    setApuestas(
      betsres.data.map((item) => {
        item.timestamp = dayjs(item.created_at).format("MM/DD/YYYY HH:mm:ss");

        item.match_start_time = dayjs(item.match_start_time * 1000).format(
          "DD/MM/YYYY hh:mm a"
        );

        item.fecha_proceso = dayjs(item.fecha_proceso * 1000).format(
          "DD/MM/YYYY hh:mm a"
        );

        return item;
      })
    );
    setSearching((current) => !current);
  }

  useEffect(() => {
    getApuestas();
    fetch("/json/heroes.json")
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        setHeroes(json);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateCont();
    }, 2500);
    return () => clearInterval(interval);
  }, [cont]);

  return (
    <>
    <h2 className="mobile-title">Victorias Recientes</h2>
      <div className="banner-container">
        <div className="container-bets">
          <div className="banner-text-c">
            <h2>
              {home.victory} <br /> {home.recent}
            </h2>
          </div>
          <div className="last-bets-c">
            <div
              className="last-bets-complete"
              style={{
                transform: `translateX(${cont}px)`,
              }}
            >
              {!searching &&
                apuestas.map((apuesta) => {
                  return (
                    <div className="item-00" key={"partida_" + apuesta.id}>
                      <div className="item-border-bottom">
                        <div className="hero-c-img">
                          <img
                            src={
                              dotaImageBase + heroes[apuesta.match_hero_id]?.img
                            }
                            className="hero_img"
                          />
                        </div>
                        <div className="hero-description">
                          <p className="win-price ">
                            {user[findIndex(apuesta.usuario_id)].nickname}
                            <br />+ S/ {apuesta.monto}
                          </p>
                          <div className="ad-icon-c">
                            <Image
                              src="/icons/favicon/logo-gris.png"
                              width={80}
                              height={55}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="person-info-content">
                        <img
                          src={user[findIndex(apuesta.usuario_id)].foto}
                          className="profile-img"
                          alt="profile"
                        />
                        <h4 className="profile-nickname white">
                          {user[findIndex(apuesta.usuario_id)].nickname}
                        </h4>
                        <p className="profile-match">
                          Match ID: <br /> {apuesta.match_id}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .banner-container {
          position: relative;
          z-index: 10;
          margin-top: 2.2rem;
        }
        .container-bets {
          display: flex;
          padding: 0 50px;
          justify-content: center;
          align-items: center;
        }
        .banner-text-c {
          width: 300px;
          height: 164px;
          border-width: var(--border-width);
          overflow: hidden;
          position: relative;
          background-color: rgba(128, 0, 128, 0.5);
        }

        .banner-text-c h2 {
          text-shadow: 3px 3px 4px #000;
          font-size: 3rem;
       
          text-align: center;
          color: #fff;
          line-height: 1;
          margin-top: 25px;
        }

        .banner-text-c::after {
          position: absolute;
          content: "";
          top: calc(-1 * var(--border-width));
          left: calc(-1 * var(--border-width));
          z-index: -1;
          width: calc(100% + var(--border-width) * 2);
          height: calc(100% + var(--border-width) * 2);
          background: linear-gradient(
            60deg,
            hsl(224, 85%, 66%),
            hsl(269, 85%, 66%),
            hsl(314, 85%, 66%),
            hsl(359, 85%, 66%),
            hsl(44, 85%, 66%),
            hsl(89, 85%, 66%),
            hsl(134, 85%, 66%),
            hsl(179, 85%, 66%)
          );
          background-size: 300% 300%;
          background-position: 0 50%;
          border-radius: calc(2 * var(--border-width));
          animation: moveGradient 4s alternate infinite;
        }
        .last-bets-c {
          max-width: 1360px;
          overflow: hidden;
          position: relative;
          border-width: var(--border-width);
          border-right: 5px solid #2c62fe;
          background-color: rgba(128, 0, 128, 0.5);
        }
         {
          /* 
             background-color: #1A1A1A; */
        }

        .last-bets-c::after {
          position: absolute;
          content: "";
          top: calc(-1 * var(--border-width));
          left: calc(-1 * var(--border-width));
          z-index: -1;
          width: calc(100% + var(--border-width) * 2);
          height: calc(100% + var(--border-width) * 2);
          background: linear-gradient(
            60deg,
            hsl(224, 85%, 66%),
            hsl(269, 85%, 66%),
            hsl(314, 85%, 66%),
            hsl(359, 85%, 66%),
            hsl(44, 85%, 66%),
            hsl(89, 85%, 66%),
            hsl(134, 85%, 66%),
            hsl(179, 85%, 66%)
          );
          background-size: 300% 300%;
          background-position: 0 50%;
          border-radius: calc(2 * var(--border-width));
          animation: moveGradient 4s alternate infinite;
        }

        @keyframes moveGradient {
          50% {
            background-position: 100% 50%;
          }
        }
        .last-bets-complete {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }

        .item-00 {
          position: relative;
          overflow: hidden;
          min-width: 170px;
          height: 164px;
          border-bottom: 10px solid;
          border-image-slice: 1;
          border-width: 5px;
          border-image-source: linear-gradient(
            to left,
            rgba(116, 58, 213, 0.4),
            rgba(116, 58, 213, 0.4)
          );
        }

         {
          /* rgba(116,58,213,0.4) 
            
            rgba(240,240,240,0.15)*/
        }

        .item-border-bottom {
          position: relative;
          transition: all 0.3s ease;
        }

        .hero-description {
          position: relative;
          width: 100%;
          height: 70px;
          background-image: url("/banner/banner.png");
          background-size: cover;
        }

         {
          /* border-bottom: 5px solid #88ED15; */
        }
        .ad-icon-c {
          position: absolute;

          left: 30%;
          margin: 0 10px 10px;
          opacity: 0.2;
        }
        .win-price {
          font-size: var(--subtitle-size);
          line-height: 26px;
          font-weight: 600;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 8px;
          padding-left: 0px;
         
          text-align: center;
          position: absolute;
          left: 0px;
          text-shadow: 3px 3px 4px #000;
          margin: 2px 20px;
        }

        .green {
          color: #b6ff40;
          font-size: 26px;
          line-height: 20px;
          font-weight: 600;
        }

        .hero-c-img {
          width: 170px;
          height: 90px;
        }

        .hero_img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .person-info-content {
          display: flex;
          top: 0;
          transition: all 0.5s ease;
          position: absolute;
          z-index: 99;
          align-items: center;
          background: rgba(19, 21, 29, 0.88);
          flex-direction: column;
          width: 170px;
          padding-top: 20px;
          height: 100%;
          gap: 1px;
          transform: translateY(-100%);
        }

        .profile-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        .profile-nickname {
          margin-top: 2px;
          font-weight: 600;
        
        }

        .white {
          color: #fff;
        }

        .profile-match {
          text-align: center;
        }

        .item-00:hover .person-info-content {
          transform: translateY(0);
        }
        .mobile-title {
          display:none;
        }

        @media (max-width: 480px) {
          .banner-text-c {
            display: none;
          }
          .container-bets {
            padding: 0px 20px;
          }
          .item-00 {
            min-width: 120px;
          }
          .hero-c-img {
            width: 120px;
            height: 70px;
          }
          .mobile-title {
            display: block;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
