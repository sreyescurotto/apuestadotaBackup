import React from 'react'
import Image from 'next/image';

export default function Share() {
  return (
    <>
        <section className="share">
            <div className='shareText'>
                <h2>Comparte tus victorias y gana dinero</h2>
                <p>Recibe 1 sol cada vez que compartas en Facebook tu victoria épica</p>


                <div className='runes-effect'>
                
                    <img src='banner/runes.png' alt='runes' className='rune-with'/>
                    <img src='banner/runec.png' alt='runes' className='rune-without'/>
                </div>
                

                <div className="absolute-social-c">
                    <div className='absolute-text'>Etiquétanos!</div>
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
            </div>

            

            

            <div className='person-img'>
                <img src='banner/person.png' alt='person' />
            </div>
        </section>
        <style jsx>{`
            .share {
                
                height: 100vh;
                margin-bottom: 5rem;
                position: relative;
            }

            .shareText {
                padding: 4rem 6rem;
                background-color: #222222;
                border: 10px solid #fff;
                border-radius: 60px;
                width: 90%;
                height: 800px;  
                top: 10.5%;
                left: 3.8%;
                position: relative;

            }

            .shareText h2 {
                color: #b6ff40;
                
                width: 760px;
                text-align: center;
                font-size: 3.8rem;
                line-height: 1.1;
            }

            .shareText p {
              
                font-size: 1.5rem;
                width: 760px;
                font-weight: 600;
                text-align: center;
                text-transform: uppercase;
                position: relative;
                z-index: 1;
            }
            .runes-effect {
                position: absolute;
                bottom: 55%;
                left: 21%;
                margin: 2rem 2rem 3.5rem;
            }
            .runes-effect img{
                width: 200px;
                transform: rotate(20deg);
            }
            .rune-with {
                position: absolute;
               

            }
            .rune-without {
                position: absolute;
                animation: rune-www 4s infinite;
            }

            .person-img {
                position: absolute;
                right: 0;
                margin: 9rem;
                padding-left: 6rem;
                bottom: 20px;
                border-left: 2px solid rgba(255,255,255,.4);
            }
            .person-img img {
              width: 600px;
            }

            .absolute-social-c {
          position: absolute;
          bottom: 7%;
          left: 20%;
          margin: 2rem 4rem;
          display:flex;
        }

        .absolute-text {
            position: absolute;
            color: #fff;
            font-size: 1.5rem;
            left: -20px;
            top: -20px;
        }
        .social-c {
          margin: 1rem 0.5rem;
          width: 70px;
          cursor: pointer;
        }
        .social-c:hover {
          filter: brightness(1.3);
        }

            @keyframes rune-www {
                0% {
                    opacity: 0;

            } 30% {
                opacity: 1;

            }
            60% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
         }

            
        @media only screen and (max-width: 485px) {

            .shareText {
                padding: 4rem 0;
                width: 100%;
                left: 0;
            }

            .shareText h2 {
                width: 100%;
                font-size: 1.7rem;
                text-align: center;
                padding: 0 20px;
            }

            .shareText p {
                margin-top: 1rem;
                width: 100%;
                font-size: 1rem;
                padding: 0 20px;
            }

            .runes-effect {
                left: 58%;
               bottom: 70%;
            }

            .runes-effect img {
                width: 100px;
            }

            .absolute-social-c {
                left: 15%;
            }

            .person-img {
                right: 59px;
                margin: 0;
                bottom: 250px;
                border:none;
            }
            .person-img img {
                height: 200px;
                width: auto;
            }
          .absolute-social-c img {
            width: 60px;
          }
          .absolute-text {
            font-size: 1.2rem;
            left: 0;
          }
          
          }


        `}</style>
    </>
  )
}
