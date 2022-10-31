import React, { useState } from "react";
import Layout from '../../components/Layout/Layout';

export async function getStaticProps({ locale }) {
  const response = await import(`../../lang/${locale}.json`);
  return {
    props: {
      play: response.default.play,
      navbar: response.default.navbar,
      layout: response.default.layout,
      leftbar: response.default.leftbar,
    },
  };
}

export default function Tutorial(props) {

  const { play , layout, navbar, leftbar } = props;
  
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
              <h4>Preguntas Frecuentes</h4>
            </div>

            <div className="faq-container-box">
              <div className="interface-item-02">
                <div className="tutorial-subtitle">
                  <h4>¿Tienes alguna duda adicional?</h4>
                </div>

                <div className="tutorial-p">
                  <p>
                    Envianos un correo y te ayudaremos:
                    <span className="green">soporte@apuestadota.com </span>
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick2}>
                    ¿Cómo puedo retirar mis ganancias?
                    <img
                      className={active2 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active2 ? "active" : "disable"}>
                    Ir a la sección de Retiro en la parte izquierda de la
                    pantalla, llenar los datos del formulario e indicar el monto
                    a retirar, este retiro solo puede realizarse a las cuentas
                    bancarias del titular registrado en apuestadota.com, no está
                    permitido transferir a cuentas bancarias de terceras
                    personas.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick3}>
                    ¿Puedo tener más de una cuenta?
                    <img
                      className={active3 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active3 ? "active" : "disable"}>
                    No, cada cuenta est registrada con un documento de
                    identidad, solo está permitido usar una cuenta por persona
                    para evitar el abuso de emparejamiento desleal.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick4}>
                    ¿Por qué necesito verificar mi cuenta?
                    <img
                      className={active4 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active4 ? "active" : "disable"}>
                    Para poder retirar el dinero es necesario identificar
                    completamente al receptor, por ello necesitamos que subas al
                    servidor tu documento de identidad correspondiente a tu
                    país, el cual será corroborado al momento en que solicites
                    retirar tus fondos.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick5}>
                    ¿Qué documentos puedo utilizar para verificar mi cuenta?
                    <img
                      className={active5 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active5 ? "active" : "disable"}>
                    Debes subir tu documento de identificación legal exigible
                    según tu país, por ejemplo pero no limitando a: Cédula de
                    identidad, Documento nacional de identidad, Cédula de
                    ciudadanía, Carnet de Identidad, Clave única de registro de
                    población, Documento Personal de Identificación, Documento
                    único de identidad, Identificación, entre otros determinados
                    según su nacionalidad.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick6}>
                    ¿Hay un monto de depósito mínimo para abrir mi cuenta?
                    <img
                      className={active6 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active6 ? "active" : "disable"}>
                    Puedes abrir tu cuenta sin necesidad de depositar pero si
                    necesitarás hacer un depósito para poder apostar.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick7}>
                    ¿Hay un monto mínimo de depósito?
                    <img
                      className={active7 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active7 ? "active" : "disable"}>
                    Puedes depósitar desde 10 USD.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick8}>
                    ¿Hay un monto máximo de depósito?
                    <img
                      className={active8 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active8 ? "active" : "disable"}>
                    Puedes depósitar hasta 1000 USD por vez.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick9}>
                    ¿Cuál es el monto mínimo y máximo para realizar una apuesta?
                    <img
                      className={active9 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active9 ? "active" : "disable"}>
                    El monto mínimo de apuesta es 1 USD y el máximo es de 100
                    USD.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick10}>
                    ¿Qué pasa si dejo de compartir mi información pública de
                    Dota 2 en medio de una partida?
                    <img
                      className={active10 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active10 ? "active" : "disable"}>
                    Se terminará la apuesta dando como resultado la pérdida de
                    fondos, esta acción es considerada como intento de fraude.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick11}>
                    ¿Qué pasa si cometo acciones fraudulentas?
                    <img
                      className={active11 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active11 ? "active" : "disable"}>
                    Tu apuesta en curso será considerada en perdida, el saldo de
                    tu cuenta será reembolsado a tu cuenta bancaria, se
                    bloqueará tu cuenta registrada en apuestadota.com y el
                    documento de identificación registrado. Quedarás betado para
                    siempre del uso de esta plataforma y de las siguientes que
                    formen parte del grupo empresarial.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick12}>
                    ¿Qué se considera acciones fraudulentas?
                    <img
                      className={active12 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active12 ? "active" : "disable"}>
                    Aquellos jugadores expertos dentro del juego que utilicen
                    cuentas secundarias para ingresar a partidas repletas de
                    novatos abusando de jugadores que recién empiezan. <br />
                    Dejar de compartir las estadísticas de partidas durante una
                    apuesta en curso. <br />
                    Aquellos que recurran a terceros para jugar en suplantación
                    suya, ten en cuenta que Steam proporciona una gran cantidad
                    de datos que permiten identificar dónde se está realizando
                    la partida, estos datos van desde el código de la PC hasta
                    la ubicación geográfica exacta. Toda irregularidad será
                    detectada. <br />
                    Cambiar los ajustes de privacidad de Steam de público a
                    privado durante una apuesta en curso.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick13}>
                    ¿Qué pasa si empiezo una apuesta y tarda más de 25 minutos
                    en comenzar la partida?
                    <img
                      className={active13 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active13 ? "active" : "disable"}>
                    Si la partida tarda más de 25 minutos en comenzar de forma
                    automatica se considerará como pérdida, se investigará si en
                    ese tiempo no haz dejado de compartir tus estadísticas o haz
                    intentado realizar alguna acción fraudulenta. Si no ha
                    habido alguna irregularidad y te sucede esto puedes
                    comunicarte a soporte@apuestadota.com y nos pondremos en
                    contacto con usted para solicitarle evidencias de lo
                    ocurrido.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick14}>
                    ¿Qué pasa si cuando estoy esperando a que la partida inicie,
                    algún jugador tiene un error de conexión y la partida no
                    empieza?
                    <img
                      className={active14 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active14 ? "active" : "disable"}>
                    En ese caso tu siguiente partida será la que va a contar, no
                    te preocupes.
                  </p>
                </div>
              </div>

              <div className="faq-container-box-item">
                <div className="faq-container-box-item-title">
                  <h4 onClick={handleClick15}>
                    ¿Existe un monto mínimo y máximo de retiro?
                    <img
                      className={active15 ? "chevron chevron-top" : "chevron"}
                      src="/icons/chevron-down.png"
                      alt="chevron-down"
                    />
                  </h4>

                  <p className={active15 ? "active" : "disable"}>
                    El monto mínimo de retiro es de 20 dólares pero no existe
                    monto máximo de retiro, puedes retirar la totalidad de tu
                    saldo siempre y cuando este sea mayor a 20 dólares.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="container-interface" id="expose-public">
            <div className="int interface-item-01">
              <h4>¿Cómo configurar Apuestadota?</h4>

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
            background-image: url(/warlock2.jpg);
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

            font-family: "Poppins", sans-serif;
          }

          .box-terms {
            position: absolute;

            right: 0;

            top: 0;

            margin: 4rem;

            width: 500px;
          }

          .box-item {
            background-color: #41b6e6;

            color: #fff;

            font-family: "Poppins", sans-serif;

            padding: 1rem 2rem;
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
            color: #b6ff40;

            text-decoration: none;

            font-family: "Roboto Mono", monospace;
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

            font-family: "Poppins", sans-serif;

            font-size: 22px;

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

            font-family: "Roboto Mono", sans-serif;
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
            color: #fff;

            font-size: 37px;

            font-weight: 500;

            font-family: "Poppins", sans-serif;

            margin-bottom: 15px;
          }

          .tutorial-subtitle {
            color: #fff;

            background-color: #41b6e6;

            font-size: 37px;

            font-weight: 500;

            font-family: "Poppins", sans-serif;

            padding: 1rem 2rem;

            border-top-left-radius: 10px;

            border-top-right-radius: 10px;
          }

          .tutorial-p {
            font-size: 20px;

            padding: 2rem 2rem;

            background-color: #101f3c;

            border-bottom-left-radius: 10px;

            border-bottom-right-radius: 10px;
          }

          .tutorial-p p {
            color: rgba(255, 255, 255, 0.8);

            font-family: "Roboto-mono", sans-serif;
          }

          .img-prueba {
            width: 100%;

            object-fit: cover;

            border-radius: 10px;
          }

          .green {
            color: #b6ff40;
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
              font-size: 30px;
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

              bottom: -134vh;

              position: absolute;

              right: 12px;
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
          }
        `}
      </style>
    </>
  );
}
