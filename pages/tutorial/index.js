import React, { useState } from "react";
import Layout from '../../components/Layout/Layout';

export async function getStaticProps({ locale }) {
  const response = await import(`../../lang/${locale}.json`);
  return {
    props: {
      navbar: response.default.navbar,
      layout: response.default.layout,
      leftbar: response.default.leftbar,
      tutorial : response.default.tutorial,
    },
  };
}

export default function Tutorial(props) {

  const { layout, navbar, leftbar, tutorial } = props;
  
  const [active2, setActive2] = useState(false);

  const [active3, setActive3] = useState(false);

  const [active4, setActive4] = useState(false);

  const [active5, setActive5] = useState(false);

  const [active6, setActive6] = useState(false);

  const [active7, setActive7] = useState(false);

  const [active8, setActive8] = useState(false);

  const [active9, setActive9] = useState(false);

  const [active10, setActive10] = useState(false);

  const [active11, setActive11] = useState(false);

  const [active12, setActive12] = useState(false);

  const [active13, setActive13] = useState(false);

  const [active14, setActive14] = useState(false);

  const [active15, setActive15] = useState(false);

  const handleClick2 = () => {
    setActive2(!active2);
  };

  const handleClick3 = () => {
    setActive3(!active3);
  };

  const handleClick4 = () => {
    setActive4(!active4);
  };

  const handleClick5 = () => {
    setActive5(!active5);
  };

  const handleClick6 = () => {
    setActive6(!active6);
  };

  const handleClick7 = () => {
    setActive7(!active7);
  };

  const handleClick8 = () => {
    setActive8(!active8);
  };

  const handleClick9 = () => {
    setActive9(!active9);
  };

  const handleClick10 = () => {
    setActive10(!active10);
  };

  const handleClick11 = () => {
    setActive11(!active11);
  };

  const handleClick12 = () => {
    setActive12(!active12);
  };

  const handleClick13 = () => {
    setActive13(!active13);
  };

  const handleClick14 = () => {
    setActive14(!active14);
  };

  const handleClick15 = () => {
    setActive15(!active15);
  };

  return (
    <>
      <Layout layout={layout} navbar={navbar} leftbar={leftbar}>
        <div className="interface">
          <div className="faq-container">
            <div className="faq-container-title">
              <h4 className="center">{tutorial.title}</h4>
            </div>

            <div className="faq-container-box">
              <div className="interface-item-02">
                <div className="tutorial-subtitle">
                  <h4>{tutorial.subtitle}</h4>
                </div>

                <div className="tutorial-p">
                  <p>
                  {tutorial.subtitle2}
                    <span className="green-b">{tutorial.email}</span>
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick2}>
                  {tutorial.q1}
                    <img
                      className={active2 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active2 ? "active" : "disable"}>
                  {tutorial.a1}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick3}>
                  {tutorial.q2}
                    <img
                      className={active3 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active3 ? "active" : "disable"}>
                  {tutorial.a2}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick4}>
                  {tutorial.q3}
                    <img
                      className={active4 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active4 ? "active" : "disable"}>
                  {tutorial.a3}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick5}>
                  {tutorial.q4}
                    <img
                      className={active5 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active5 ? "active" : "disable"}>
                  {tutorial.a4}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick6}>
                  {tutorial.q5}
                    <img
                      className={active6 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active6 ? "active" : "disable"}>
                  {tutorial.a5}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick7}>
                  {tutorial.q6}
                    <img
                      className={active7 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active7 ? "active" : "disable"}>
                  {tutorial.a6}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick8}>
                  {tutorial.q7}
                    <img
                      className={active8 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active8 ? "active" : "disable"}>
                  {tutorial.a7}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick9}>
                  {tutorial.q8}
                    <img
                      className={active9 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active9 ? "active" : "disable"}>
                  {tutorial.a8}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick10}>
                  {tutorial.q9}
                    <img
                      className={active10 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active10 ? "active" : "disable"}>
                  {tutorial.a9}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick11}>
                  {tutorial.q10}
                    <img
                      className={active11 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active11 ? "active" : "disable"}>
                    {tutorial.a10}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick12}>
                  {tutorial.q11}
                    <img
                      className={active12 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active12 ? "active" : "disable"}>
                  {tutorial.a11a} <br />
                  {tutorial.a11b} <br />
                  {tutorial.a11c} <br />
                  {tutorial.a11d}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick13}>
                  {tutorial.q12}
                    <img
                      className={active13 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active13 ? "active" : "disable"}>
                  {tutorial.a12}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick14}>
                  {tutorial.q13}
                    <img
                      className={active14 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active14 ? "active" : "disable"}>
                  {tutorial.a13}
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick15}>
                  {tutorial.q14}
                    <img
                      className={active15 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active15 ? "active" : "disable"}>
                  {tutorial.a14}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="container-interface" id="expose-public">
            <div className="int interface-item-01">
              <h4 className="solo--title">{tutorial.videotutorial}</h4>

              <div className="multimedia-container">
                <video
                  className="video-prueba img-prueba"
                  preload="auto"
                  controls
                >
                  <source
                    src="/tutorial/tutorialvideo01.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </section>
        </div>
      </Layout>

      <style jsx>
        {`
          .mode-play {
            height: 100vh;

            overflow-y: auto;
          }

          .interface {
            background-color: #2C62FE;
          }

          .help-c {
            height: 50px;

            position: absolute;

            right: 0;

            bottom: 15%;

            margin-right: 40px;

            margin-top: -20px;

            filter: invert(89%) sepia(77%) saturate(549%) hue-rotate(26deg)
              brightness(105%) contrast(103%);
          }

          .faq-container {
            padding: 4rem;

            position: relative;
          }

          .faq-container-title h4 {
            color: #fff;

            text-shadow: 2px 2px 2px #000;

            font-size: 37px;

            font-weight: 500;

          }

          .box-terms {
            position: absolute;

            right: 0;

            top: 0;

            margin: 4rem;

            width: 500px;
          }

     

          .box-item-title {
            font-size: 30px;

            cursor: pointer;

            display: flex;

            align-items: center;

            gap: 30px;

            justify-content: space-between;
          }

          .active {
            display: block;

            opacity: 1;
          }

          .disable {
            display: none;

            opacity: 0;
          }

          .box-item-anchor {
            transition: all 0.5s ease;
          }

          .box-item-anchor a {
            color: var(--verde);

            text-decoration: none;

          }

          .box-item-a {
            border-top-left-radius: 10px;

            border-top-right-radius: 10px;
          }

          .box-item-b {
            border-bottom-left-radius: 10px;

            border-bottom-right-radius: 10px;
          }

          .chevron-top {
            transform: rotate(180deg);
          }

          .chevron {
            height: 24px;

            width: 24px;
          }

          .faq-container-box {
            width: 55%;
          }

          .faq-container-box-item-title h4 {
            color: #fff;

            font-size: 20px;

            display: flex;

            justify-content: space-between;

            align-items: center;
          }

          .faq-container-box-item-title {
            background-color: rgba(60, 83, 118, 1);

            border-radius: 10px;

            padding: 1rem 2rem;

            cursor: pointer;
          }

          .faq-container-box-item-title p {
            margin-top: 1rem;

            font-size: 16px;

            color: rgba(255, 255, 255, 0.8);
          }

          .faq-container-box-item-title {
            margin-top: 2rem;
          }

          .container-interface {
            display: grid;

            grid-template-columns: repeat(3, 1fr);

            grid-template-rows: repeat(6, 1fr);

            padding: 4rem;

            grid-row-gap: 30px;
          }

          .interface-item-01 {
            grid-area: 1 / 1 / 3 / 3;
          }

          .interface-item-02 {
            position: fixed;

            right: 40px;

            width: 500px;
          }

          .interface-item-03 {
            grid-area: 3 / 1 / 5 / 3;
          }

          .interface-item-04 {
            grid-area: 5 / 1 / 9 / 3;
          }

          .multimedia-container {
            width: 90%;
          }

          .int h4 {
         

            margin-bottom: 15px;
          }

          .tutorial-subtitle {
            color: #fff;

            background-color: #6d41a2;

            font-size: 37px;

            font-weight: 500;

            padding: 1rem 2rem;

            border-top-left-radius: 10px;

            border-top-right-radius: 10px;
          }

          .tutorial-subtitle h4 {
            font-size: 2.25rem;
          }

          .tutorial-p {
            font-size: 20px;

            padding: 2rem 2rem;

            background-color: #101f3c;

            border-bottom-left-radius: 10px;

            border-bottom-right-radius: 10px;
          }

          .tutorial-p p {
            font-size: 16px;
          }

          .img-prueba {
            width: 100%;

            object-fit: cover;

            border-radius: 10px;
          }

     

          @media only screen and (max-width: 1366px) { 
            .interface-item-02 {
              width: 460px;
            }
            .tutorial-subtitle {
              font-size : 32px;
              padding: 1rem 2rem;
            }
            .tutorial-p {
              font-size : 18px;
            }
            .multimedia-container {
              width: 100%;
            }
          }

          @media (max-width: 768px) {
            .mode-play {
              overflow-x: hidden;

              overflow-y: scroll;
            }

            .help-c {
              margin-top: -60px;
            }
          }

          @media (max-width: 485px) {
            .box-terms {
              width: 356px;

              margin: 1rem 0.5rem;

              position: relative;
            }

            .box-item-title h4 {
              font-size: 16px;
            }

            .faq-container-title h4 {
              font-size: 24px;
            }

            .faq-container {
              padding: 0.5rem;
            }

            .faq-container-box {
              width: 98%;
            }

            .faq-container-box-item-title {
              padding: 1rem 1rem;
            }

            .faq-container-box-item-title h4 {
              font-size: 16px;
            }

            .faq-container-box-item-title p {
              font-size: 14px;
            }

            .container-interface {
              grid-template-columns: repeat(2, 1fr);

              grid-template-rows: repeat(8, 1fr);

              padding: 0.5rem;
            }

            .interface-item-01 {
              grid-area: 1 / 1 / 3 / 3;
            }

            .interface-item-02 {
              width: 360px;

              bottom: -60vh;

              position: absolute;

              right: 10px;
            }
            
            .tutorial-subtitle h4 {
              font-size: 24px;
            }

            .interface-item-03 {
              grid-area: 3 / 1 / 5 / 3;
            }

            .interface-item-04 {
              grid-area: 5 / 1 / 7 / 3;
            }

            .tutorial-subtitle {
              font-size: 26px;

              padding: 1rem;
            }

            .tutorial-p {
              font-size: 16px;

              padding: 1rem;
            }

            .int h4 {
              font-size: 24px;
            }
          }
        `}
      </style>
    </>
  );
}
