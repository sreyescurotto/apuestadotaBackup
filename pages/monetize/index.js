import React from "react";

import Layout from "../../components/Layout/Layout";

import Image from 'next/image'

export async function getStaticProps({ locale }) {
  const response = await import(`../../lang/${locale}.json`);
  return {
    props: {
      play: response.default.play,
      navbar: response.default.navbar,
      layout: response.default.layout,
      leftbar: response.default.leftbar,
      monetize: response.default.monetize,
    },
  };
}

const Profile = (props) => {
  const { play , layout, navbar, leftbar, monetize } = props;
  return (
    <>
      <Layout layout={layout} navbar={navbar} leftbar={leftbar}>
        <div className="interface">
          <div className="monetize-title">
            <h2 className="sec-title-h center">{monetize.title}</h2>
          </div>
          <div className="monetize-subtitle">
            <p className="subtitle-1">
                {monetize.subtitle}
            </p>
          </div>
          <div>
           
            <div className="monetize-offer">
              <div className="monetize-offer-item">
                <div className="monetize-offer-item-img">
                  <img src="/monetize.png" alt="monetiza tu stream"/>
                </div>
              </div>
              <div className="monetize-offer-item">
                <div className="benefits-container">
                  <div className="benefits-item">
                    <div className="benefits-item-img">
                    1
                    </div>
                    <p> {monetize.text1}</p>
                  </div>
                  <div className="benefits-item">
                    <div className="benefits-item-img">
                    2
                      </div>
                      <p> {monetize.text2}</p>
                    </div>
                  <div className="benefits-item">
                    <div className="benefits-item-img">
                    3
                      </div>
                      <p> {monetize.text3}</p>
                    </div>
                  <div className="benefits-item">
                    <div className="benefits-item-img">
                    4
                      </div>
                      <p> {monetize.text4}</p>
                    </div>
                </div>
              </div>



              <div className="monetize-offer-item  last-item-monetize">
               <p className="subtitle-1">{monetize.purple}  <span className="email-c">{monetize.email} </span>
                {monetize.purple2}</p>
               <div className="arrow-container">
                <Image src="/checkout2.png" width={100} height={100} alt='whatsapp'/>
               </div>
               
              </div>
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

          .monetize-title {
            margin-top: 2rem;
           
          }

          .monetize-subtitle {
            width: 1000px;
            margin: 0 auto 2rem;
          }
          .monetize-offer {
            display:flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }

          .benefits-container {
            min-width: 500px;
          }

          .benefits-item {
            display: flex;
            align-items: center;
            gap: 20px;
            margin: 1.5rem 0;
          }

          .benefits-item p {
            font-family: "Roboto Mono", monospace;
            font-weight: 600;
          }

          .benefits-item-img {
            width: 60px;
            line-height: 60px;
            border-radius: 50%;
            text-align: center;
            font-size: 22px;
            border: 3px solid #b28afd;
            color: #b28afd;
          }

          .last-item-monetize {
            max-width: 500px;
            background-color: #b28afd;
            padding: 2rem;
            border-radius: 20px;
            position: relative;
          }

          

          .email-c {
            font-weight: 800;
          }

          .arrow-container {
            position: absolute;
            bottom: -30%;
            left: 30%;
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
};

export default Profile;
