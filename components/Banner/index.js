import React from 'react'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import AppService from '../../services/app.service';
import dayjs from "dayjs";

export default function Banner() {
    const dotaImageBase = "https://cdn.cloudflare.steamstatic.com";

    const [apuestas, setApuestas] = useState([]);

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
                                        <Image src='/icons/favicon/favicon-32.png' width={32} height={32} />
                                    </div>
                                </div>
                            </div>        
                            <div className='person-info-content'>
                                <img src='https://avatars.akamai.steamstatic.com/bbab60b14d06a52a61c41b65ec2fb3e20d9a23f2_full.jpg' className='profile-img' alt='profile' />      
                                <h4 className='profile-nickname'>21</h4>
                                <p>{apuesta.match_id}</p>
                            </div>
                        </div>)
                    
                    })
                }     
                </div>
                </div>
                <div>
                    <Image src="/heros/alchemist.png" alt="Gana dinero" width={200} height={125} />
                </div>
            </div>
        </div>

        <style jsx>{`

.banner-container {
    position: relative;
    z-index: 10;
    margin-top: -1rem;
}
.container-bets {
    display: flex;
    padding: 0 2rem;
}
            .last-bets-c {            
                max-width: 1190px;
                overflow:hidden;
            }   
            .last-bets-complete {
                display: flex;     
                transition: transform 0.5s ease-in-out;
            }

            .item-00 {
                position:relative;
                border: 2px solid #8847ff;
                overflow:hidden;
                background-color: #121232;
                min-width: 170px;
                height: 150px;
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
        
            }
            .ad-icon-c {
                position: absolute;
                right: 0;
                margin: 10px;
                opacity: .3;
            }
            .win-price {
                font-size: 24px;
                line-height:20px;
                font-weight: 600;
                color: #fff;
                text-transform: uppercase;
                letter-spacing: 1px;
                padding: 8px;
                padding-left: 0px;
   
    background: -webkit-linear-gradient(#FFFFFF 10%, #00A3D7 90%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                filter: drop-shadow(0px 0px 5px #0089d8);
                position: absolute;
                left: 0px;
                
                margin: 10px;
               
            }

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
                margin-top: 1px;
            }

            .item-00:hover .person-info-content {
               
              
                transform: translateY(0);
            }

        `}</style>
    </>
  )
}
