import React from 'react'
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Banner() {
    const dotaImageBase = "https://cdn.cloudflare.steamstatic.com";

    const [apuestas, setApuestas] = useState([]);

    const [heroes, setHeroes] = useState({});

    const [searching, setSearching] = useState(false);

    const getApuestas = () => {
        // fetching bets from api
        setSearching(true);
        fetch("http://backoffice.apuestadota.com:8070/api/partidas").then((res) => {
            res.json().then((data) => {
                setApuestas(data.json);
                setSearching(false);
            });
        })
        console.log("apuestas", apuestas);
      };
    
      useEffect(() => {
        fetch("/json/heroes.json")
          .then((resp) => {
            return resp.json();
          })
          .then((json) => {
            setHeroes(json);
          });
    
        // getApuestas();
      }, []);
  return (
    <>
        <div className='banner-container'>
            <div className='container-bets'>
                <div className='last-bets-c'>
                
                <div className='item-00'>
                        <div className='item-border-bottom'>
                            <div className='hero-c-img'>
                                    <img
                                    src={
                                        dotaImageBase +
                                        heroes[1]?.img
                                    }
                                    className="hero_img"
                                    />
                            </div>
                            <div className='hero-description'>
                                <p className='win-price '>S/ 99</p>
                            </div>
                        </div>        
                        <div className='person-info-content'>
                            <img src='https://avatars.akamai.steamstatic.com/bbab60b14d06a52a61c41b65ec2fb3e20d9a23f2_full.jpg' className='profile-img' alt='profile' />      
                            <h4 className='profile-nickname'>21</h4>
                            <p>a few seconds ago</p>
                        </div>
                    </div>
                    <div className='item-00'>
                        <div className='item-border-bottom'>
                            <div className='hero-c-img'>
                                    <img
                                    src={
                                        dotaImageBase +
                                        heroes[1]?.img
                                    }
                                    className="hero_img"
                                    />
                            </div>
                            <div className='hero-description'>
                                <p className='win-price '>S/ 25</p>
                            </div>
                        </div>        
                        <div className='person-info-content'>
                            <img src='https://avatars.akamai.steamstatic.com/bbab60b14d06a52a61c41b65ec2fb3e20d9a23f2_full.jpg' className='profile-img' alt='profile' />      
                            <h4 className='profile-nickname'>21</h4>
                            <p>a few seconds ago</p>
                        </div>
                    </div>

                    <div className='item-00'>
                        <div className='item-border-bottom'>
                            <div className='hero-c-img'>
                                    <img
                                    src={
                                        dotaImageBase +
                                        heroes[1]?.img
                                    }
                                    className="hero_img"
                                    />
                            </div>
                            <div className='hero-description'>
                                <p className='win-price '>S/ 25</p>
                            </div>
                        </div>        
                        <div className='person-info-content'>
                            <img src='https://avatars.akamai.steamstatic.com/bbab60b14d06a52a61c41b65ec2fb3e20d9a23f2_full.jpg' className='profile-img' alt='profile' />      
                            <h4 className='profile-nickname'>21</h4>
                            <p>a few seconds ago</p>
                        </div>
                    </div>

                    <div className='item-00'>
                        <div className='item-border-bottom'>
                            <div className='hero-c-img'>
                                    <img
                                    src={
                                        dotaImageBase +
                                        heroes[1]?.img
                                    }
                                    className="hero_img"
                                    />
                            </div>
                            <div className='hero-description'>
                                <p className='win-price '>S/ 27</p>
                            </div>
                        </div>        
                        <div className='person-info-content'>
                            <img src='https://avatars.akamai.steamstatic.com/bbab60b14d06a52a61c41b65ec2fb3e20d9a23f2_full.jpg' className='profile-img' alt='profile' />      
                            <h4 className='profile-nickname'>21</h4>
                            <p>a few seconds ago</p>
                        </div>
                    </div>

                    <div className='item-00'>
                        <div className='item-border-bottom'>
                            <div className='hero-c-img'>
                                    <img
                                    src={
                                        dotaImageBase +
                                        heroes[1]?.img
                                    }
                                    className="hero_img"
                                    />
                            </div>
                            <div className='hero-description'>
                                <p className='win-price '>S/ 26</p>
                            </div>
                        </div>        
                        <div className='person-info-content'>
                            <img src='https://avatars.akamai.steamstatic.com/bbab60b14d06a52a61c41b65ec2fb3e20d9a23f2_full.jpg' className='profile-img' alt='profile' />      
                            <h4 className='profile-nickname'>21</h4>
                            <p>a few seconds ago</p>
                        </div>
                    </div>

                    <div className='item-00'>
                        <div className='item-border-bottom'>
                            <div className='hero-c-img'>
                                    <img
                                    src={
                                        dotaImageBase +
                                        heroes[1]?.img
                                    }
                                    className="hero_img"
                                    />
                            </div>
                            <div className='hero-description'>
                                <p className='win-price '>S/ 25</p>
                            </div>
                        </div>        
                        <div className='person-info-content'>
                            <img src='https://avatars.akamai.steamstatic.com/bbab60b14d06a52a61c41b65ec2fb3e20d9a23f2_full.jpg' className='profile-img' alt='profile' />      
                            <h4 className='profile-nickname'>21</h4>
                            <p>a few seconds ago</p>
                        </div>
                    </div>

                     <div className='item-00'>
                        <div className='item-border-bottom'>
                            <div className='hero-c-img'>
                                    <img
                                    src={
                                        dotaImageBase +
                                        heroes[1]?.img
                                    }
                                    className="hero_img"
                                    />
                            </div>
                            <div className='hero-description'>
                                <p className='win-price '>S/ 25</p>
                            </div>
                        </div>        
                        <div className='person-info-content'>
                            <img src='https://avatars.akamai.steamstatic.com/bbab60b14d06a52a61c41b65ec2fb3e20d9a23f2_full.jpg' className='profile-img' alt='profile' />      
                            <h4 className='profile-nickname'>21</h4>
                            <p>a few seconds ago</p>
                        </div>
                    </div>

                    <div className='item-00'>
                        <div className='item-border-bottom'>
                            <div className='hero-c-img'>
                                    <img
                                    src={
                                        dotaImageBase +
                                        heroes[1]?.img
                                    }
                                    className="hero_img"
                                    />
                            </div>
                            <div className='hero-description'>
                                <p className='win-price '>S/ 25</p>
                            </div>
                        </div>        
                        <div className='person-info-content'>
                            <img src='https://avatars.akamai.steamstatic.com/bbab60b14d06a52a61c41b65ec2fb3e20d9a23f2_full.jpg' className='profile-img' alt='profile' />      
                            <h4 className='profile-nickname'>21</h4>
                            <p>a few seconds ago</p>
                        </div>
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
}
.container-bets {
    display: flex;
    padding: 0 2rem;
}
            .last-bets-c {
                display: flex;
               
                max-width: 1200px;
                overflow:hidden;
            }
            .item-00 {
                position:relative;
                padding: 1rem .5rem;
                overflow:hidden;
                background-color: #000;
                min-width: 200px;
            }
            .item-border-bottom {
                
                transition: all 0.3s ease;
            }

            .item-00:hover .item-border-bottom {
                
            }

            .hero-description {
                position: relative;
                width: 100%;
            }
            {/* .win-price {
                 background: -webkit-linear-gradient(#FFFFFF 10%, #00A3D7 90%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                filter: drop-shadow(0px 0px 5px #0089d8);
                position: absolute;
                left: 40px;
                bottom: 0;
                font-size: 25px; 

                
            } */}
            .win-price {
                font-size: 25px;
                line-height: 20px;
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
                left: 40px;
                bottom: 0;
               
            }

            .hero-c-img {
                width: 210px;
                height: 112px;
                
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
                width: 210px;
                padding-top: 25px;
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
            }

            .item-00:hover .person-info-content {
               
              
                transform: translateY(0);
            }

        `}</style>
    </>
  )
}
