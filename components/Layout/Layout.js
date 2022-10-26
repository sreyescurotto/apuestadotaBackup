import React from "react";

import Head from "next/head";

import Image from "next/image";

import Navbar from "../Navbar/Navbar";

import Leftbar from "../Leftbar/Leftbar";




const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Juega y Gana</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="shortcut icon" href="/icons/favicon/favicon-32.png" />
      </Head>

      <div className="mode-play">
        <Navbar />
        <div className="main--1">
          <Leftbar />
        
          

          {props.children}
        </div>

        <div className="social-container">
          <a
            href="https://wa.me/923298322?text=Hola%20tengo%20una%20consulta%20acerca%20de%20ApuestaDota.com"
            target={"_blank"}
          >
            <Image
              src="/social/whatsapp-call.png"
              alt="normalMode"
              width={80}
              height={80}
            />
          </a>
        </div>
      </div>

      <style jsx>
        {`
          .mode-play {
            height: 100vh;
          }

          .social-container {
            position: fixed;

            right: 0;

            margin: 2rem;

            bottom: 0;

            cursor: pointer;

            height: 80px;

            width: 80px;

            transition: all 0.3s ease-in-out;
          }

          .social-container:hover {
            transform: scale(1.2);
          }

          @media (max-width: 768px) {
            .mode-play {
              overflow-y: scroll;
            }
          }
        `}
      </style>
    </>
  );
};

export default Layout;
