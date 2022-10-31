import React from 'react';
import Layout from '../../components/Layout/Layout';
import Image from 'next/image'

const Support = () => {
    return (
        <>
            <Layout>
                <div className="interface">
                    <div className="support">
                      <h2 className="sec-title-h">Contacto Apuesta Dota</h2>
                        <p className="bold">Apuesta Dota LLC</p>

                        <p className='normal'>Registration No. 905 LLC 2022</p>
                        <p className='normal'>Direccion: San Vicente y las Granadinas.</p>

                        <div className='email-flex'> 
                          <Image alt='email'  src='/icons/email.png' width={24} height={24}/>
                          <p>soporte@apuestadota.com</p>
                        </div>

                    </div>
                </div>
            </Layout>

            <style jsx>
        {`
          .interface {
            background-image: linear-gradient(
              0deg,
              hsl(236deg 24% 11%) 0%,

              hsl(233deg 24% 13%) 24%,

              hsl(231deg 23% 15%) 42%,

              hsl(229deg 23% 17%) 56%,

              hsl(228deg 23% 18%) 66%,

              hsl(226deg 23% 20%) 75%,

              hsl(224deg 23% 22%) 81%,

              hsl(223deg 23% 24%) 87%,

              hsl(221deg 24% 25%) 92%,

              hsl(220deg 24% 27%) 100%
            );
          }
          .support {
            margin: 2rem;
          }

          .email-flex {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          p {
            font-family: 'Roboto', sans-serif;
          }

          @media (max-width: 375px) {
            .interface {
              width: 375px;
            }
          }
        `}
      </style>
        </>
    );
}

export default Support;
