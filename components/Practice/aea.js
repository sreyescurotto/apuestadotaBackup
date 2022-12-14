import React, { useRef } from "react";

import { useState, useEffect } from "react";

import AppService from "../../services/app.service";

import Swal from "sweetalert2";

import { useRouter } from "next/router";

import Apuestas from "../Apuestas/Apuestas";

import Image from "next/image";

const ModePractice = (props) => {

    const play = props.play;

    const profile = props.profile;

    const router = useRouter();

    const [user, setUser] = useState(null);
  
    const [active, setActive] = useState(false);
  
    const [terms, setTerms] = useState(false);
  
    const [rules, setRules] = useState(false);
  
    const [searching, setSearching] = useState(false);
  
    const [saldo, setSaldo] = useState("Cargando ...");
  
    const [saldoPrueba, setSaldoPrueba] = useState("Cargando ...");
  
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
      const b = event.target.value;
      b.length > 4 ? setBet(100): setBet(n);
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
  
        if (bet > saldoPrueba) {
          Swal.fire({
            icon: "error",
  
            text: "No cuentas con saldo suficiente para realizar la apuesta",
          });
  
          return;
        } else if (bet > 500) {
          Swal.fire({
            icon: "error",
  
            text: "No puedes apostar mas de 500 PEN",
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
                  "No se pudo realizar la apuesta porque debes compartir tus estad??sticas en Dota2. En el siguiente video te ense??amos a hacerlo."
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
  
    
  
    const closeBetW = (e) => {
      e.preventDefault();
  
      setActive(false);
    };
  
  
    const handleClick2 = (e) => {
      router.push("/play/practice");
    };
  
    const handleClick3 = (e) => {
      router.push("/play/normal");
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
  
            <div className="mode-test-active">{play.modeTest}</div>
  
            <h4 className="mb-sm subtitle-modes">{play.modesubtitle}</h4>
  
            <div className="mode-solo-amount">
              <div className="mode-solo-amount-inp">
                <h3>{play.modeAmount}:</h3>
  
                <span className="dollarsign">S/</span>
  
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
                  disabled={bet >= 500}
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
                {play.modeTerms}
                  <a href="/rules">{play.modeTerms1}</a>
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
                {play.modeTerms2}
                </label>
              </div>
            </div>
  
            <div className="start-game-btn-container">
              <button className="start-game-btn" onClick={apostar}>
                {searching ? "Procesando apuesta..." : play.bet}
              </button>
            </div>
  
            <div>
              <h4 className="mb-sm subtitle-modes lighterr">
              {play.betdetails}
              </h4>
  
              <div className="profit-container">
                <h4 className="subtitle-modes lighterr">
                {play.betdetails2} <span className="bold">+ 40%</span>
                </h4>
  
                <h4 className="subtitle-modes lighterr">
                {play.betdetails3}
                  <span className="bold">+ S/ {(bet * 0.4).toFixed(2)}</span>
                </h4>
  
                <h4 className="subtitle-modes lighterr">
                {play.betdetails4}
                  <span className="bold">S/ {(bet * 1.4).toFixed(2)}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
  
        <div className="mode--solo">
          <div className="mode--solo--c">
            <div className="solo--title">
              <h3>{play.title}</h3>
            </div>
  
            <div className="balance-container">
              {user !== null && (
                <button className="btn btn-md welcomebtn">
                {play.welcome} {user?.nickname}
                </button>
              )}
  
              <h3>{play.balance}</h3>
  
              <div className="pad--s" onClick={handleClick3}>
                <div className="pad--int">
                  <h3 className="left-container-h3 real-acc">{play.realacc}</h3>
  
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
                  {play.practiceacc}
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
                    <source src="/tutorial/pruebavideo.mp4" type="video/mp4" />
                  </video>
  
                  <div onClick={handlePlay} className="controls-abs">
                  {isPlaying ? (
                    <div className="controls-play"> 
                    <Image
                      src="/icons/controls/stop.png"
                      height={50}
                        width={50}
                        alt="stop"
                    />
                    </div>
                  ) : (
                    <div className="controls-pause">
                    <Image
                      src="/icons/controls/play.png"
                      
                      height={50}
                        width={50}
                        alt="play"
                    />
                    </div>
                  )}
                  </div>
                </div>
  
                <div onClick={openFullscreen}
                    className="expand-button">
                    <Image
                    src="/icons/controls/arrow-expand.png"
                    
                    height={50}
                    width={50}
                />
                </div>
              </div>
  
              <div className="solo--item-content">
                <div className="solo--item-content-head">
                <span>{play.subtitle}</span>

                <h2>{play.subtitle2}</h2>
                </div>
  
                <div className="solo--item-content-desc">
                <p>
                  {play.subtitle3}
                  <br></br>
                  {play.subtitle4}
                </p>
                </div>
  
                <div className="solo--item-content-button">
                <a
                  href="#"
                  className="solo--btn-c"
                  id="openbutton"
                  onClick={handleClick}
                >
                  {play.start}
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
            <h3>{play.betsmade}</h3>
            </div>
  
            <div className="solo--content">{loadApuestas && <Apuestas profile={profile}/>}</div>
          </div>
        </div>
      </>
    );
  };

export default ModePractice;




