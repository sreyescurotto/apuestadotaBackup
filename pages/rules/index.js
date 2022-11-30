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
            <div className="rules-container-text">
              <h2 className="sec-title-h">{terms.title}</h2>
              <p>
                {terms.date} {b}.{" "}
              </p>
            </div>
            
            <div className="terms-link-container">
              <Image
                src="/pdf-blue.png"
                className="terms-img"
                width={50}
                height={50}
              />

              <a
                href="/terms-apuestadota.pdf"
                target={"_blank"}
                className="terms-link"
                rel="noreferrer"
              >
                Términos y condiciones - Apuestadota.com
              </a>

              <Image
                src="/icons/spain.png"
                width={35}
                height={35}
                alt="spanish"
              />
            </div>

            <div className="terms-link-container english-terms">
              <Image
                src="/pdf-blue.png"
                className="terms-img"
                width={50}
                height={50}
              />

              <a
                href="/terms-apuestadota-en.pdf"
                target={"_blank"}
                rel="noreferrer"
                className="terms-link"
              >
                Terms & Conditions - Apuestadota.com
              </a>

              <Image
                src="/icons/britain.png"
                width={35}
                height={35}
                alt="english"
              />
            </div>
          </div>
        </div>
      </Layout>

      <style jsx>
        {`
          .interface {
            background-color: #2c62fe;
          }

          .rules-container {
            padding: 4rem;
          }

          .rules-container-text {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .rules-container p {
            margin-bottom: 4rem;

            margin-top: .5rem;

            font-size: 16px;
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

            font-size: 20px;

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

            .rules-container {
              padding: 2rem;
            }

            .rules-container p {
              margin-bottom: 4rem;

              font-size: var(--subtitle-size);
            }
          }
        `}
      </style>
    </>
  );
}
