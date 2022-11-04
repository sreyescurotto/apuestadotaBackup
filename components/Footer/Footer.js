import React from "react";
import Image from "next/image";

const Footer = (props) => {
  const footer = props.props
  return (
    <>
      <footer className="root-footer">
        <div className="footer-cont footer-logo">
          <Image src="/apuesta-logo.png" className="logo"  alt="Logo" height={30} width={210}/>
        </div>

        <div className="footer-cont footer-text">
          {footer.subtitle} <br />
          {footer.subtitle2} <br />
          {footer.subtitle3} <br />
          {footer.subtitle4}
        </div>
      </footer>

      <style jsx>{`
        .root-footer {
          text-align: center;

          width: 100%;

          z-index: 5;

          padding: 25px 100px;

          background-color: #000;

          position: relative; 

          top: -115px;
        }

        .footer-cont {
          display: flex;

          align-items: center;

          justify-content: center;
        }

        .footer-logo {
          width: 100%;

          margin-bottom: 1.5rem;
        }

        .footer-text {
          text-align: center;

          font-size: 15px;

          color: #777;

          padding: 0 20px;

          width: 500px;

          margin: 0 auto;

          font-family: "Geometrik Blk";
        }

        @media only screen and (max-width: 1366px) {
          .root-footer {
            top: 0;
          }
        }

        @media only screen and (max-width: 480px) {
          .root-footer {
            padding: 30px 60px 100px;
            top: -160px;
          }
          .footer-text {
            font-size: 12px;
            padding: 0 0 90px;
            width: 240px;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
