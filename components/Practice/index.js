import React, { useRef } from "react";

import { useState, useEffect } from "react";

import AppService from "../../services/app.service";

import Swal from "sweetalert2";

import { useRouter } from "next/router";

import Apuestas from "../Apuestas/Apuestas";

const ModePractice = () => {
    const router = useRouter();

    const [user, setUser] = useState(null);
  
    const [active, setActive] = useState(false);
  
    const [terms, setTerms] = useState(false);
  
    const [rules, setRules] = useState(false);
  
    const [searching, setSearching] = useState(false);
  
    const [saldo, setSaldo] = useState("0.00");
  
    const [saldoPrueba, setSaldoPrueba] = useState("0.00");
  
    const [bet, setBet] = useState(10);
  
  
  
    const [loadApuestas, setLoadApuestas] = useState(false);
  
    const videoRef = useRef();
  
    const [isPlaying, setIsPlaying] = useState(false);
  
    const [test2, setTest2] = useState();
  
    useEffect(() => {
      let s = new AppService();
  
      let _user = s.getUser();
  
      setUser(_user);
  
      if (s.getUser() !== null) {
        s.makeGet("saldo", {}, true).then((res) => {
          setTest2(res.data.saldo_switch == "balance_prueba");
  
          setSaldo(res.data.saldo);
  
          setSaldoPrueba(res.data.saldo_prueba);
        });
        s.makePut("saldo/switch", { switch: 1 }, true)
      }
    }, []);
  
    const checkboxChange = (e) => {
      const checked = e.target.checked;
  
      setTerms(checked);
    };
  
    const checkboxRule = (e) => {
      const checked = e.target.checked;
  
      setRules(checked);
    };
  
    const handleClick = (event) => {
      user !== null ? setActive((current) => !current) : router.push("/login");
    };
  
    const handleInputMonto = (event) => {
      const n = parseInt(event.target.value);
  
      setBet(n);
    };
  
    const decreaseBet = () => {
      setBet((current) => current - 1);
    };
  
    const increaseBet = () => {
      setBet((current) => current + 1);
    };
  
    const handlePlay = () => {
      const video = videoRef.current;
  
      isPlaying ? video.pause() : video.play();
  
      setIsPlaying(!isPlaying);
  
      video.expanded = true;
    };
  
    function openFullscreen() {
      const video = videoRef.current;
  
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        /* Safari */
  
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        /* IE11 */
  
        video.msRequestFullscreen();
      }
    }
  
    const apostar = () => {
      let _saldo = Number(saldo);
  
      if (searching) {
      } else {
        // validar si cuenta con saldo
  
        if ((test2 == false && bet > saldo) || (test2 && bet > saldoPrueba)) {
          Swal.fire({
            icon: "error",
  
            text: "No cuentas con saldo suficiente para realizar la apuesta",
          });
  
          return;
        } else if (bet > 100) {
          Swal.fire({
            icon: "error",
  
            text: "No puedes apostar mas de 100 USD",
          });
  
          return;
        } else if (terms !== true) {
          Swal.fire({
            icon: "error",
  
            text: "Debes aceptar los trminos y condiciones para realizar una apuesta",
          });
  
          return;
        } else if (rules !== true) {
          Swal.fire({
            icon: "error",
  
            text: "Debes aceptar las reglas para realizar una apuesta",
          });
  
          return;
        } else {
          setSearching((current) => !current);
  
          let s = new AppService();
  
          s.makePost("bet", { monto: bet }, true)
            .then((res) => {
              if (res.data.match) {
                Swal.fire({
                  text: "Apuesta registrada exitosamente, tienes 25 minutos para iniciar tu partida. Si no lo haces, perderas tu apuesta",
  
                  icon: "success",
                }).then(() => {
                  setSearching((current) => !current);
  
                  router.reload();
                });
              }
            })
            .catch((error) => {
              Swal.fire({
                text: error.response.data.error,
  
                icon: "error",
              }).then(() => {
                setSearching((current) => !current);
  
                if (
                  error.response.data.error ==
                  "No se pudo realizar la apuesta porque debes compartir tus estadísticas en Dota2. En el siguiente video te enseñamos a hacerlo."
                ) {
                  setTimeout(() => {
                    router.push("/exposeData#video");
                  }, 1000);
                } else {
                  router.reload();
                }
              });
            });
        }
      }
    };
  
    const obtenerSaldo = () => {
      let s = new AppService();
  
      if (s.getUser() !== null) {
        s.makeGet("saldo", {}, true).then((resp) => {
          setSaldo(resp.data.saldo);
        });
      }
    };
  
    useEffect(() => {
      obtenerSaldo();
    }, []);
  
    const closeBetW = (e) => {
      e.preventDefault();
  
      setActive(false);
    };
  
  
    const handleClick2 = (e) => {
  
      location.replace("/practice");
    };
  
    const handleClick3 = (e) => {
  
      location.replace("/start");
    };
  
    useEffect(() => {
      setLoadApuestas(false);
  
      setTimeout(() => {
        setLoadApuestas(true);
      }, 1000);
    }, []);
  
    return (
      <>
        <div
          className={
            active ? "scaleuptr visible menu-bet" : "scaledowntop menu-bet"
          }
        >
          <div className="sss" onClick={closeBetW}></div>
  
          <div className="mode-create-lobby practice-lobby">
            <img
              src="/icons/close-w.png"
              alt="close"
              id="closebutton"
              onClick={handleClick}
            />
  
            <div className="mode-test-active">Modo práctica activado</div>
  
            <h4 className="mb-sm subtitle-modes">Elige el monto de tu apuesta</h4>
  
            <div className="mode-solo-amount">
              <div className="mode-solo-amount-inp">
                <h3>Importe:</h3>
  
                <span className="dollarsign">$</span>
  
                <input
                  className="inputBetAmount"
                  type="number"
                  onChange={handleInputMonto}
                  value={bet}
                />
              </div>
  
              <div className="mode-solo-amount-btn">
                <button
                  className="large-btn"
                  onClick={increaseBet}
                  disabled={bet >= 100}
                >
                  +
                </button>
  
                <button
                  className="large-btn"
                  onClick={decreaseBet}
                  disabled={bet <= 1}
                >
                  -
                </button>
              </div>
  
              <div className="terms-container">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  onChange={checkboxChange}
                />
  
                <label className="checkbox-terms" htmlFor="terms">
                  Declaro haber leído y estar de acuerdo con los
                  <a href="/rules">Términos y Condiciones</a>
                </label>
              </div>
  
              <div className="terms-container">
                <input
                  type="checkbox"
                  id="rules"
                  name="rules"
                  onChange={checkboxRule}
                />
  
                <label className="checkbox-terms" htmlFor="terms">
                  Acepto que una vez registrada mi apuesta, tendré 25 minutos para
                  iniciar mi partida de Dota 2, caso contrario se invalidará mi
                  apuesta y se considerará perdida.
                </label>
              </div>
            </div>
  
            <div className="start-game-btn-container">
              <button className="start-game-btn" onClick={apostar}>
                {searching ? "Procesando apuesta..." : "Apostar"}
              </button>
            </div>
  
            <div>
              <h4 className="mb-sm subtitle-modes lighterr">
                Detalles de la apuesta:
              </h4>
  
              <div className="profit-container">
                <h4 className="subtitle-modes lighterr">
                  Beneficio %: <span className="bold">+ 40%</span>
                </h4>
  
                <h4 className="subtitle-modes lighterr">
                  Beneficio Q:{" "}
                  <span className="bold">+ $ {(bet * 0.4).toFixed(2)}</span>
                </h4>
  
                <h4 className="subtitle-modes lighterr">
                  Cálculo de ganancia:{" "}
                  <span className="bold">$ {(bet * 1.4).toFixed(2)}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
  
        <div className="mode--solo">
          <div className="mode--solo--c">
            <div className="solo--title">
              <h3>JUEGA RANKED Y GANA DINERO</h3>
            </div>
  
            <div className="balance-container">
              {user !== null && (
                <button className="btn btn-md welcomebtn">
                  Bienvenido {user?.nickname}
                </button>
              )}
  
              <h3>Tu Saldo</h3>
  
              <div className="pad--s" onClick={handleClick3}>
                <div className="pad--int">
                  <h3 className="left-container-h3 real-acc">Cuenta real:</h3>
  
                  <h3 className="left-container-h3 left-flex-container-h real-acc">
                    {" "}
                    <img
                      src="/icons/currency-usd-g.png"
                      className="dollar--svg"
                    ></img>
                    <span className="fontw-l"> {saldo}</span>
                  </h3>
                </div>
              </div>
  
              <div className="pad--s" onClick={handleClick2}>
                <div className="pad--int active-mode">
                  <h3 className="left-container-h3 orange">
                    Cuenta de practica:
                  </h3>
  
                  <h3 className="left-container-h3 left-flex-container-h">
                  
                    <img
                      src="/icons/currency-o.png"
                      className="dollar--svg"
                    ></img>
                    <span className="fontw-l orange"> {saldoPrueba}</span>
                  </h3>
                </div>
              </div>
            </div>
  
            <div className="solo--item">
              <div className="solo--item--i">
                <div className="solo--item--video">
                  <video
                    preload="auto"
                    className="solo--item--vv"
                    ref={videoRef}
                    onClick={handlePlay}
                  >
                    <source src="../tutorial/pruebavideo.mp4" type="video/mp4" />
                  </video>
  
                  <div onClick={handlePlay} className="controls-abs">
                    {isPlaying ? (
                      <img
                        src="../icons/controls/stop.png"
                        className="controls-play"
                      />
                    ) : (
                      <img
                        src="../icons/controls/play.png"
                        className="controls-pause"
                      />
                    )}
                  </div>
                </div>
  
                <img
                  src="../icons/controls/arrow-expand.png"
                  onClick={openFullscreen}
                  className="expand-button"
                />
              </div>
  
              <div className="solo--item-content">
                <div className="solo--item-content-head">
                  <span>Apuesta en tu propia partida</span>
  
                  <h2>Modo Individual</h2>
                </div>
  
                <div className="solo--item-content-desc">
                  <p>
                    
                    Te pagamos el 40% de tu apuesta por cada partida ganada.
                    <br></br>
                    ¿Cansado de que te digan que busques un trabajo? Gana dinero
                    jugando Dota2.
                  </p>
                </div>
  
                <div className="solo--item-content-button">
                  <a
                    href="#"
                    className="solo--btn-c"
                    id="openbutton"
                    onClick={handleClick}
                  >
                    Iniciar
                  </a>
                </div>
              </div>
            </div>
          </div>
  
          <br />
          <br />
          <br />
  
          <div className="mode--solo--c">
            <div className="solo--title">
              <h3>Apuestas realizadas en modo Práctica</h3>
            </div>
  
            <div className="solo--content">{loadApuestas && <Apuestas />}</div>
          </div>
        </div>
  
        <style jsx>
          {`
          
          #terms {
              
              min-width:13px;
          }
          #rules {
              
              min-width:13px;
          }
            .mode-unactive a h4 {
              color: #999;
            }
  
            /* crear apuesta - MODO SOLO */
  
            .sss {
              position: absolute;
  
              width: 100%;
  
              height: 106%;
  
              background-color: rgba(55, 55, 55, 0.631);
  
              top: -5%;
  
              z-index: 5;
            }
  
            .menu-bet {
              display: flex;
  
              justify-content: center;
  
              align-items: flex-start;
  
              width: 100%;
  
              height: 100%;
  
              visibility: hidden;
  
              position: absolute;
  
              z-index: 5;
            }
  
            .subtitle-modes {
              color: #fff;
  
              /* text-align: center; */
  
              font-size: 25px;
  
              font-family: "Roboto Mono", monospace;
            }
  
            .mb-sm {
              margin-bottom: 20px;
            }
  
            .mode-solo-amount {
              margin-top: 10px;
  
              margin-bottom: 10px;
  
              display: flex;
  
              flex-direction: column;
  
              align-items: center;
  
              width: 100%;
            }
  
            .mode-solo-amount-inp {
              background-color: #0e1018;
  
              width: 320px;
  
              border-radius: 10px;
  
              margin-bottom: 10px;
  
              padding-top: 10px;
  
              padding-bottom: 10px;
  
              position: relative;
            }
  
            .mode-test-active {
              color: rgb(255 255 255 / 60%);
  
              position: absolute;
  
              top: 0;
  
              margin: 14px 0;
  
              font-size: 20px;
  
              font-family: "Roboto Mono", monospace;
            }
  
            .mode-solo-amount div h3 {
              font-size: 22px;
  
              font-weight: lighter;
  
              text-align: center;
            }
  
            .mode-solo-amount-btn {
              width: 320px;
  
              border-radius: 10px;
  
              display: flex;
  
              gap: 5px;
            }
  
            .balance-container {
              display: none;
  
              margin-top: 2rem;
            }
  
            .welcomebtn {
              margin: 0px 0px 20px 0;
  
              width: 100%;
            }
  
            .left-container-h3 {
              font-size: 1.5rem;
  
              font-family: "Teko", sans-serif;
            }
  
            .large-btn {
              padding-left: 25px;
  
              padding-right: 25px;
  
              border-radius: 20px;
  
              font-size: 20px;
  
              background-color: #0e1018;
  
              border: none;
  
              color: #fff;
  
              width: 50%;
            }
  
            .dollarsign {
              color: white;
  
              font-size: 22px;
  
              position: absolute;
  
              left: 35%;
  
              font-family: "Roboto Mono", monospace;
            }
  
            .start-game-btn-container {
              width: 100%;
  
              display: flex;
  
              justify-content: center;
  
              margin-top: 2rem;
  
              margin-bottom: 2rem;
            }
  
            .start-game-btn {
              background-color: #b6ff40;
  
              color: #081325;
  
              border: none;
  
              border-radius: 20px;
  
              font-size: 22px;
  
              line-height: 28px;
  
              width: 370px;
  
              padding-left: 1rem;
  
              padding-right: 1rem;
  
              padding-top: 0.4rem;
  
              padding-bottom: 0.4rem;
  
              font-family: "Roboto Mono", monospace;
  
              text-transform: uppercase;
            }
  
            .lighterr {
              font-weight: 300;
            }
  
            .visible {
              visibility: visible !important;
            }
  
            .scaleuptr {
              -webkit-animation: scale-up-tr 0.4s ease-in-out both;
  
              animation: scale-up-tr 0.4s ease-in-out both;
            }
  
            .scaledowntop {
              -webkit-animation: scale-down-top 0.4s
                cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  
              animation: scale-down-top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
                both;
            }
  
            .mode-create-lobby {
              padding: 68px 40px;
  
              margin-top: 6%;
  
              position: relative;
  
              z-index: 10;
            }
  
            .normal-lobby {
              background-color: #25273d;
            }
  
            .practice-lobby {
              background-color: #f55b01;
            }
  
            .mode-create-lobby img {
              position: absolute;
  
              right: 0;
  
              top: 0;
  
              padding: 10px;
  
              cursor: pointer;
            }
  
            .inputBetAmount {
              background: transparent;
  
              color: #fff;
  
              border: none;
  
              text-align: center;
  
              width: 100%;
  
              font-size: 22px;
  
              font-weight: lighter;
  
              font-family: "Roboto Mono", monospace;
            }
  
            .gc-profile-title {
              margin-bottom: 40px;
  
              font-size: 20px;
  
              font-weight: 300;
  
              font-family: "Poppins", sans-serif;
  
              text-transform: uppercase;
  
              color: #fff;
            }
  
            .terms-container label {
              color: rgba(255, 255, 255, 0.6);
  
              font-size: 14px;
            }
  
            .terms-container label a {
              color: #fff;
            }
  
            .terms-container {
              margin-top: 20px;
  
              display: flex;
  
              flex-direction: row;
  
              gap: 10px;
  
              width: 480px;
            }
  
            /* cerrar */
  
            @-webkit-keyframes scale-down-top {
              0% {
                -webkit-transform: scale(1);
  
                transform: scale(1);
  
                -webkit-transform-origin: 50% 0%;
  
                transform-origin: 50% 0%;
              }
  
              100% {
                -webkit-transform: scale(0.3);
  
                transform: scale(0.3);
  
                -webkit-transform-origin: 0% 0%;
  
                transform-origin: 0% 0%;
  
                opacity: 0;
  
                visibility: hidden;
              }
            }
  
            @keyframes scale-down-top {
              0% {
                -webkit-transform: scale(1);
  
                transform: scale(1);
  
                -webkit-transform-origin: 100% 0%;
  
                transform-origin: 100% 0%;
              }
  
              100% {
                -webkit-transform: scale(0.3);
  
                transform: scale(0.3);
  
                -webkit-transform-origin: 100% 0%;
  
                transform-origin: 100% 0%;
  
                opacity: 0;
  
                visibility: hidden;
              }
            }
  
            /* abrir */
  
            @-webkit-keyframes scale-up-tr {
              0% {
                -webkit-transform: scale(0.3);
  
                transform: scale(0.3);
  
                -webkit-transform-origin: 100% 0%;
  
                transform-origin: 100% 0%;
  
                opacity: 0;
              }
  
              100% {
                -webkit-transform: scale(1);
  
                transform: scale(1);
  
                -webkit-transform-origin: 100% 0%;
  
                transform-origin: 100% 0%;
              }
            }
  
            @keyframes scale-up-tr {
              0% {
                -webkit-transform: scale(0.3);
  
                transform: scale(0.3);
  
                -webkit-transform-origin: 100% 0%;
  
                transform-origin: 100% 0%;
  
                opacity: 0;
              }
  
              100% {
                -webkit-transform: scale(1);
  
                transform: scale(1);
  
                -webkit-transform-origin: 100% 0%;
  
                transform-origin: 100% 0%;
              }
            }
  
            .solo--item--vv {
              width: 100%;
  
              height: 100%;
            }
  
            .controls-abs {
              position: absolute;
  
              top: 160px;
  
              left: 332px;
  
              cursor: pointer;
            }
  
            .controls-play {
              -webkit-animation: fade-out 1s ease-out both;
  
              animation: fade-out 1s ease-out both;
            }
  
            .expand-button {
              position: absolute;
  
              bottom: 0;
  
              right: 0;
  
              height: 40px;
  
              margin: 1rem;
  
              width: 40px;
  
              z-index: 4;
  
              cursor: pointer;
            }
  
             {
              /* .controls-abs:hover {
  
  
  
      -webkit-animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  
  
  
              animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  
  
  
  } */
            }
  
            .solo-item-video {
              width: 100%;
  
              height: 100%;
            }
  
            @-webkit-keyframes fade-out {
              0% {
                opacity: 1;
              }
  
              100% {
                opacity: 0;
              }
            }
  
            @keyframes fade-out {
              0% {
                opacity: 1;
              }
  
              100% {
                opacity: 0;
              }
            }
  
            @-webkit-keyframes fade-in {
              0% {
                opacity: 0;
              }
  
              100% {
                opacity: 1;
              }
            }
  
            @keyframes fade-in {
              0% {
                opacity: 0;
              }
  
              100% {
                opacity: 1;
              }
            }
  
            @media screen and (max-width: 500px) {
              .expand-button {
                display: none;
              }
  
              .controls-abs {
                top: 60px;
  
                left: 129px;
              }
  
              .solo--item-content-button {
                margin-left: 15px;
              }
            }
  
            @media (max-width: 768px) {
              .mode-create-lobby {
                margin-top: 20%;
              }
            }
  
            @media (max-width: 485px) {
              .mode-create-lobby {
                margin-top: 70%;
  
                padding: 50px 40px;
  
                overflow: auto;
              }
  
              .mode-solo.amount h3 {
                font-size: 18px;
              }
  
              .subtitle-modes {
                font-size: 16px;
              }
  
              .start-game-btn {
                font-size: 20px;
  
                width: 310px;
              }
  
              .mode--solo--c {
                overflow-x: auto;
              }
  
              .terms-container {
                width: 300px;
              }
  
              .mode-test-active {
                font-size: 16px;
              }
  
              .balance-container {
                display: block;
              }
            }
          `}
        </style>
      </>
    );
  };

export default ModePractice;




