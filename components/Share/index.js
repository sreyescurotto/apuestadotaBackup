import React from 'react'
import Image from 'next/image';

export default function Share() {
  return (
    <>
        <section className="share">
            <div className='shareText'>
                <h2>Comparte tus victorias y gana dinero</h2>
                <p>Recibe 1 sol cada vez que compartas en Facebook tu victoria epica</p>


                <div className='runes-effect'>
                
                    <img src='banner/runes.png' alt='runes' className='rune-with'/>
                    <img src='banner/runec.png' alt='runes' className='rune-without'/>
                </div>
                

                <div className="absolute-social-c">
                    <div className='absolute-text'>Etiquetanos!</div>
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
                
                position: relative;
            }

            .shareText {
                padding: 4rem 6rem;
                background-color: #222222;
                border: 10px solid #fff;
                border-radius: 60px;
                width: 1000px;
                height: 600px;
                
                top: 16.5%;
                left: 3.8%;
                position: relative;
            }

            .shareText h2 {
                color: #b6ff40;
                font-family: "Teko", sans-serif;
                width: 760px;
                text-align: center;
                font-size: 4.5rem;
                line-height: 1.1;
            }

            .shareText p {
                font-family: "Roboto Mono", monospace;
                font-size: 1.5rem;
                width: 760px;
                font-weight: 600;
                text-align: center;
                text-transform: uppercase;
            }
            .runes-effect {
                position: absolute;
                bottom: 40%;
                right: 32%;
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
                margin: 2rem;
                bottom: 20px;
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
            font-family: "Roboto Mono", monospace;
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
                padding: 2rem 0;
                width: 100%;
                left: 0;
            }

            .shareText h2 {
                width: 100%;
                font-size: 2.5rem;
            }

            .shareText p {
                margin-top: 1rem;
                width: 100%;
                font-size: 1.2rem;
            }

            .runes-effect {
                bottom: 49%;
                right: 29%;
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
                bottom: 32px;
            }
            .person-img img {
                height: 200px;
            }
          .absolute-social-c img {
            width: 60px;
          }
          
          }


        `}</style>
    </>
  )
}
