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
          {/* {footer.subtitle3} <br /> */}
          {footer.subtitle4}
        </div>
      </footer>

      <style jsx>{`
        .root-footer {
          text-align: center;

          width: 100%;

          z-index: 5;

          padding: 40px 100px;

          background-color: var(--black);

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

          font-size: var(--text);

          color: #777;
          
          line-height: 1.3;
          letter-spacing: 1.2px;
          

          padding: 0 20px;

          width: 500px;

          margin: 0 auto;

        }

        @media only screen and (max-width: 1366px) {
          .root-footer {
            top: 0;
          }
        }

        @media only screen and (max-width: 480px) {
          .root-footer {
            padding: 28px 40px 20px;
            top: 0;
          }
          .footer-text {
            font-size: 12px;
            padding: 0 0 80px;
            width: 270px;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
