import React from "react";

import Head from "next/head";

import Image from "next/image";

import Navbar from "../Navbar/Navbar";

import Leftbar from "../Leftbar/Leftbar";



const Layout = (props) => {
  const layout = props.layout
  const navbar = props.navbar
  const leftbar = props.leftbar
  return (
    <>
      <Head>
        <title>Juega y Gana</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="shortcut icon" href="/icons/favicon/favicon-32.png" />
      </Head>

      <div className="mode-play">
        <Navbar navbar={navbar}/>
        <div className="main--1">
          <Leftbar leftbar={leftbar} />
        
          

          {props.children}
        </div>

        <div className="social-container">
          <a
            href="https://wa.me/923298322?text=Hola%20tengo%20una%20consulta%20acerca%20de%20ApuestaDota.com"
            target={"_blank"}
          >
           <p className="contact">{layout.title}</p>
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

            margin: 3rem;

            bottom: 0;

            cursor: pointer;

            height: 100px;

            width: 80px;

            transition: all 0.3s ease-in-out;
          }
          .contact {
            text-align: center;
            font-family: 'Roboto', sans-serif;
            font-size:1.2rem;
            margin-bottom: .5rem;
            color: #b4ff43; 
            font-weight: 600;
          }

          .social-container:hover {
            transform: scale(1.2);
          }

          @media only screen and (max-width: 1366px) {

          .social-container {
            height: 80px;
            width: 65px;
          }
          .contact  {
            font-size: 1rem;
          }
        }

          @media (max-width: 768px) {
            
            .contact {
              font-size: .8rem;
            }
            .social-container {
              height: 70px;
              width: 56px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Layout;
