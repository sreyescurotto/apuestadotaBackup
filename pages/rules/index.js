import React from "react";

import Layout from "../../components/Layout/Layout";

import Image from "next/image";

export async function getStaticProps({ locale }) {
  const response = await import(`../../lang/${locale}.json`);
  return {
    props: {
      navbar: response.default.navbar,
      layout: response.default.layout,
      leftbar: response.default.leftbar,
      terms: response.default.terms,
    },
  };
}

export default function rules(props) {
  const { layout, navbar, leftbar, terms } = props;
  const date = new Date();

  const b = date.toLocaleDateString("en-GB");

  return (
    <>
      <Layout layout={layout} navbar={navbar} leftbar={leftbar}>
        <div className="interface">
          <div className="rules-container">
            <h2 className="sec-title-h">{terms.title}</h2>
            <p>{terms.date} {b}. </p>
            <div className="terms-link-container">
              <Image src="/pdf-blue.png" className="terms-img" width={50} height={50}/>

              <a
                href="/terms-apuestadota.pdf"
                target={"_blank"}
                className="terms-link"
                
                rel="noreferrer"
              >
                Terminos y condiciones - Apuestadota.com 
              </a>

              <Image src="/icons/spain.png" width={35} height={35} alt='spanish' />
            </div>

            <div className="terms-link-container english-terms">
              <Image src="/pdf-blue.png" className="terms-img" width={50} height={50}/>

              <a
                href="/terms-apuestadota-en.pdf"
                target={"_blank"}
                rel="noreferrer"
                className="terms-link"
              >
                Terms & Conditions - Apuestadota.com 
              </a>

              <Image src="/icons/britain.png" width={35} height={35} alt='english'/>
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

          .rules-container {
            padding: 2rem;
          }

          

          .rules-container p {
            margin-bottom: 4rem;
          }

          .terms-link-container {
            padding: 1rem 2rem;

            background-color: #b6ff40;

            display: flex;

            align-items: center;

            gap: 1rem;

            width: 600px;

            border-radius: 20px;

            transition: all 0.3s ease;
          }

          .english-terms {
            margin-top: 2rem;
          }

          .terms-link-container:hover {
            background-color: #fff;
          }

          .terms-link {
            color: #000;

            font-family: Bebas Neue, cursive;

            font-size: 26px;

            width: 80%;
          }

          @media screen and (max-width: 500px) {
            .terms-link {
              font-size: 20px;
            }

            .terms-link-container {
              width: 100%;

              padding: 1rem;
            }
          }
        `}
      </style>
    </>
  );
}
