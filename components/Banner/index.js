import React from 'react'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import AppService from '../../services/app.service';
import dayjs from "dayjs";

export default function Banner() {
    const dotaImageBase = "https://cdn.cloudflare.steamstatic.com";

    const [apuestas, setApuestas] = useState([]);

    const [user, setUser] = useState(null);

    const [heroes, setHeroes] = useState({});

    const [searching, setSearching] = useState(false);

    const [cont, setCont] = useState(0);

    const updateCont = () => {
        if(cont > -1700){
            setCont(cont -170)
        } else {
            setCont(0)
        }
    }

    const getCurrentRestTime = (date) => {
        const now = dayjs();
        const matchStart = dayjs(date);
        const diff = matchStart.diff(now);
        return diff;
    }

    const getApuestas = () => {
        // fetching bets from api
        let s = new AppService()

        let _user = s.getUser();
        setUser(_user);

        setApuestas([])
        setSearching(true)
     
        s.makeGet("apuestasAll", {}, true).then((res) => {
            setApuestas(
              res.data.map((item) => {
                item.timestamp = dayjs(item.created_at).format(
                  "MM/DD/YYYY HH:mm:ss"
                )
    
                item.match_start_time = dayjs(item.match_start_time * 1000).format(
                  "DD/MM/YYYY hh:mm a"
                )
    
                item.fecha_proceso = dayjs(item.fecha_proceso * 1000).format(
                  "DD/MM/YYYY hh:mm a"
                )
    
                return item
              })
            )
            setSearching((current) => !current)
        
          })
      };
    
      useEffect(() => {
        fetch("/json/heroes.json")
          .then((resp) => {
            return resp.json();
          })
          .then((json) => {
            setHeroes(json);
          });
    
        getApuestas();
      }, []);

      useEffect(() => {
        const interval = setInterval(() => {

          updateCont()
        }, 6000);
        return () => clearInterval(interval);
      }, [cont]);
  return (
    <>
        <div className='banner-container'>
            <div className='container-bets'>
                <div className='last-bets-c'>
                <div className='last-bets-complete' style={
                    {
                        transform: `translateX(${cont}px)`
                    }
                }>
                {!searching &&
                    apuestas.map((apuesta) => { 
                        return(
                        <div className='item-00' key={"partida_" + apuesta.id}>
                            <div className='item-border-bottom'>
                                <div className='hero-c-img'>
                                        <img
                                        src={
                                            dotaImageBase +
                                            heroes[apuesta.match_hero_id]?.img
                                        }
                                        className="hero_img"
                                        />
                                </div>
                                <div className='hero-description'>
                                    <p className='win-price '>+ S/ {apuesta.monto}</p>
                                    <div className='ad-icon-c'>
                                        <Image src='/icons/favicon/favicon-32.png' width={50} height={50} />
                                    </div>
                                </div>
                            </div>        
                            <div className='person-info-content'>
                                <img src='https://avatars.akamai.steamstatic.com/bbab60b14d06a52a61c41b65ec2fb3e20d9a23f2_full.jpg' className='profile-img' alt='profile' />      
                                <h4 className='profile-nickname'>21</h4>
                                <p className='profile-match'>Match ID: <br /> {apuesta.match_id}</p>
                            </div>
                        </div>)
                    
                    })
                }     
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
}
            .last-bets-c {            
                max-width: 1360px;
                overflow:hidden;
            }   
            .last-bets-complete {
                display: flex;     
                transition: transform 0.5s ease-in-out;
            }

            .item-00 {
                position:relative;
               
                overflow:hidden;
               
                min-width: 170px;
                height: 160px;
            }
            .item-border-bottom {
                position:relative;
                transition: all 0.3s ease;
              
            }

            .item-00:hover .item-border-bottom {
                
            }

            .hero-description {
                position: relative;
                width: 100%;
                height: 67px;
                background-image: url('/banner/banner.png');
                background-size: cover;
                border-bottom: 5px solid #6810E3;
            }
            .ad-icon-c {
                position: absolute;
                right: 0;
                left:35%;
                margin: 10px;
                opacity: .2;
                
            }
            .win-price {
                font-size: 26px;
                line-height:20px;
                font-weight: 600;
                color: #b6ff40;
                text-transform: uppercase;
                letter-spacing: 1px;
                padding: 8px;
                padding-left: 0px;
   
 
                position: absolute;
                left: 0px;
                
                margin: 12px 10px;
               
            }

            {/* background: -webkit-linear-gradient(#FFFFFF 10%, #00A3D7 90%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                filter: drop-shadow(0px 0px 5px #0089d8); 
                
                   background: -webkit-linear-gradient(#FFFFFF 10%, #b6ff40 90%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                filter: drop-shadow(0px 0px 5px #b6ff40);*/}

            .hero-c-img {
                width: 170px;
                height: 90px;
                
            }

            .hero_img {
                width:100%;
                height: 100%;
                object-fit: cover;    
                   
            }

          

            .person-info-content {
               
                display: flex;
                top:0;
                transition: all 0.5s ease;
                position: absolute;
                z-index:99;
                align-items: center;
                background: rgba(19,21,29,.88);
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
                color: #fff;
                margin-top: 2px;
                font-weight: 600;
                font-family: 'Roboto', sans-serif;
            }

            .profile-match {
                text-align: center;
            }

            .item-00:hover .person-info-content {
               
              
                transform: translateY(0);
            }

            @media (max-width: 480px) {
                .container-bets {
                    padding: 0px 20px;
                }
                .item-00 {
                    min-width: 94px;
                }
                .hero-c-img {
                    width: 120px;
                    height: 70px;
                }
            }

        `}</style>
    </>
  )
}
