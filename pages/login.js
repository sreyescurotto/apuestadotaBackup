import { React, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import AppService from "../services/app.service";
import Loading from "../components/Loading";


const Login = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const callbackSteamLogin = () => {
    let urlParams = new URLSearchParams(router.query);

    let s = new AppService();

    setIsLoading(true);

    s.makePost("login_steam", urlParams)
      .then((res) => {
        let _user = res.data;

        s.setUser(_user);

        router.push("/play/normal");
      })
      .catch(() => {
        alert("Hubo un problema al realizar el Inicio de Sesión");

        setIsLoading(false);
      });
  };

  const loginWithSteam = () => {
    const params = new URLSearchParams({
      "openid.ns": "http://specs.openid.net/auth/2.0",

      "openid.mode": "checkid_setup",

      "openid.return_to": "https://apuestadotabackup.vercel.app/login", // Esto es la url donde va a recibir los get params despues de iniciar sesion

      "openid.realm": "https://apuestadotabackup.vercel.app", // Esto es el origen de la peticion

      "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",

      "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    });

    //console.log(params.toString());

    location.href =
      "https://steamcommunity.com/openid/login?" + params.toString();
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query["openid.ns"]) callbackSteamLogin();
  }, [router.isReady]);

  return (
    <>
      {isLoading && <Loading message="Iniciando sesión con Steam" />}

      <div className="mode-play">
        <div className="background-img">
          <div className="login-box">
            <h2 className="form-title form-title-center"> Ingresar </h2>

            <div className="login-buttons-f">
              <div className="loginAcc steambtn"  onClick={loginWithSteam}>  
                <span className="login-acc-icon steam-icon-p"></span>
              </div>
            </div>
          </div>

          <h2 className="form-title">
            
            Recuerda tener en cuenta estos pasos para que puedas acceder con tu
            cuenta de Steam:
          </h2>

          <div className="videogiftutorial">
            <video
              src="/tutorial/tutorialvid.mp4"
              autoPlay
              loop
              muted
              className="desktopvideo"
            ></video>

            <video
              src="/tutorial/tutorialvid.mp4"
              controls
              muted
              className="mobilevideo"
            ></video>

            <div className="arrowbottom">
                <div className="arrowbutton-b">
                    <Image alt='arrow' src="/icons/arrow-bottom.svg" width={50} height={50}/>
                </div>
              
            </div>
          </div>

          <div className="tutorial-box">
            <div className="login-card-box">
              <div className="login-card-header">
                <div className="logo-container">
                  <Image src="/tutorial/dota.png" alt="logo" height={100} width={100}/>
                </div>

                <div className="login-card-title">
                  <h1>Steam</h1>

                  <p>Conecta tu cuenta</p>
                </div>
              </div>

              <div className="login-card-body">
                <h3>Haz tu perfil de Steam publico.</h3>

                <div className="login-card-body-form">
                  <ol>
                    <li>Abrir Steam</li>

                    <li>Ve a tu página de perfil</li>

                    <li>Haga clic en "Editar perfil"</li>

                    <li>Haga clic en "Mi configuración de privacidad"</li>

                    <li>Establezca "Estado del perfil" en "Público"</li>

                    <li>Guardar cambios</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .mode-play {
            height: 100vh;

            overflow-y: auto;

            background-color: #1f2428;
          }

          .background-img {
            background-image: url("/acct_creation_bg.jpg");

            background-size: cover;

            background-repeat: no-repeat;

            background-position: center;

            height: 100vh;

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: start;

            overflow-x: hidden;
          }

          .login-box {
            background: rgba(237, 232, 232, 0.062);

            box-shadow: -25px 50px 40px rgba(0, 0, 0, 0.25);

            backdrop-filter: blur(50px);

            /* Note: backdrop-filter has minimal browser support */

            padding: 10px;

            width: 450px;

            margin: 1rem 0 0.5rem;
          }

          .form-title-center {
            text-align: center !important;
          }

          .form-title {
            font-family: "Poppins";

            font-style: normal;

            font-weight: 700;

            font-size: 24px;

            line-height: 36px;

            text-align: start;

            margin: 10px 0 10px;
          }

          .login-buttons-f {
            display: flex;

            justify-content: center;
          }

          .loginAcc {
            width: 250px;

            height: 48px;

            border-radius: 4px;

            background-color: #fff;

            padding: 12px 24px;

            margin-bottom: 25px;

            margin-left: 10px;

            margin-right: 10px;

            display: flex;

            align-items: center;

            justify-content: center;
          }

          .login-acc-icon {
            display: inline-block;

            height: 24px;

            width: 24px;
          }

          .steambtn {
            background-color: #b6ff40;

            transition: all 0.3s ease;

            cursor: pointer;
          }

          .steambtn:hover {
            transform: scale(1.1);
          }

          .steam-icon-p {
            background: url(/icons/steam.png);
          }

          .login-box .user-box {
            position: relative;
          }

          .login-box .user-box input {
            width: 100%;

            padding: 10px 0;

            font-size: 16px;

            color: #fff;

            margin-bottom: 30px;

            border: none;

            border-bottom: 1px solid #fff;

            outline: none;

            background: transparent;

            font-family: "Poppins";
          }

          .login-box .user-box label {
            position: absolute;

            top: 0;

            left: 0;

            padding: 10px 0;

            font-size: 16px;

            color: #fff;

            pointer-events: none;

            transition: 0.5s;

            font-family: "Poppins";
          }

          /* #03e9f4 */

          .login-box .user-box input:focus ~ label,
          .login-box .user-box input:valid ~ label {
            top: -20px;

            left: 0;

            color: #b727fe;

            font-size: 12px;
          }

          .login-box form a {
            position: relative;

            display: inline-block;

            padding: 10px 20px;

            color: #b727fe;

            font-size: 16px;

            text-decoration: none;

            text-transform: uppercase;

            overflow: hidden;

            transition: 0.5s;

            margin-top: 40px;

            letter-spacing: 4px;

            font-family: "Poppins";
          }

          .login-box a:hover {
            background: #b727fe;

            color: #fff;

            border-radius: 5px;

            box-shadow: 0 0 5px #b727fe, 0 0 25px #2c62fe, 0 0 50px #2c62fe,
              0 0 100px #2c62fe;
          }

          .login-box a span {
            position: absolute;

            display: block;
          }

          .login-box a span:nth-child(1) {
            top: 0;

            left: -100%;

            width: 100%;

            height: 2px;

            background: linear-gradient(90deg, transparent, #2c62fe);

            animation: btn-anim1 1s linear infinite;
          }

          @keyframes btn-anim1 {
            0% {
              left: -100%;
            }

            50%,
            100% {
              left: 100%;
            }
          }

          .login-box a span:nth-child(2) {
            top: -100%;

            right: 0;

            width: 2px;

            height: 100%;

            background: linear-gradient(180deg, transparent, #2c62fe);

            animation: btn-anim2 1s linear infinite;

            animation-delay: 0.25s;
          }

          @keyframes btn-anim2 {
            0% {
              top: -100%;
            }

            50%,
            100% {
              top: 100%;
            }
          }

          .login-box a span:nth-child(3) {
            bottom: 0;

            right: -100%;

            width: 100%;

            height: 2px;

            background: linear-gradient(270deg, transparent, #2c62fe);

            animation: btn-anim3 1s linear infinite;

            animation-delay: 0.5s;
          }

          @keyframes btn-anim3 {
            0% {
              right: -100%;
            }

            50%,
            100% {
              right: 100%;
            }
          }

          .login-box a span:nth-child(4) {
            bottom: -100%;

            left: 0;

            width: 2px;

            height: 100%;

            background: linear-gradient(360deg, transparent, #03e9f4);

            animation: btn-anim4 1s linear infinite;

            animation-delay: 0.75s;
          }

          @keyframes btn-anim4 {
            0% {
              bottom: -100%;
            }

            50%,
            100% {
              bottom: 100%;
            }
          }

          .flex-col-center {
            display: flex;

            flex-direction: column;

            width: 100%;

            align-items: center;

            padding: 20px;

            gap: 10px;
          }

          .flex-col-center a {
            text-decoration: none;

            color: #fff;

            font-size: 14px;

            font-weight: 700;

            font-family: "Poppins";

            font-style: normal;

            line-height: 24px;

            text-align: center;
          }

          .videogiftutorial {
            width: 100%;

            height: 760px;

            padding: 1rem 3rem 3rem;

            position: relative;
          }

          .videogiftutorial video {
            width: 100%;

            height: 100%;

            object-fit: contain;

            border-radius: 8px;
          }

          .desktopvideo {
            display: block;
          }

          .mobilevideo {
            display: none;
          }

          .arrowbottom {
            width: 100%;

            display: flex;

            align-items: center;

            justify-content: center;

            margin-bottom: 20px;

            position: absolute;

            bottom: 10%;

            left: 0%;
          }

          .arrowbutton-b {
            height: 50px;

            filter: brightness(0%) invert(100%);

            -webkit-filter: brightness(0%) invert(100%);

            -moz-filter: brightness(0%) invert(100%);

            transition: all 0.5s ease;
          }

          .arrowbutton-b:hover {
            transform: scale(1.1);
          }

          .login-card-header {
            display: flex;

            padding: 1rem 2rem;

            border-top-left-radius: 8px;

            background-color: #2e2f30;

            border-top-right-radius: 8px;
          }

          .logo-container {
            width: 100px;
           

            padding: 10px;

            background-color: #fff;

            border-radius: 2px;
          }

        
          .login-card-title {
            padding: 10px;
          }

          .login-card-title h1 {
            font-family: Roboto Mono, monospace;
          }

          .login-card-title p {
            font-family: Poppins, sans-serif;
          }

          .login-card-body {
            background-color: #fff;

            border-bottom-left-radius: 8px;

            border-bottom-right-radius: 8px;

            padding: 0 2rem 1rem;
          }

          .login-card-body h3 {
            color: #000;

            padding: 1rem 0;
          }

          li {
            list-style: auto;

            font-family: Poppins, sans-serif;
          }

          .tutorial-box {
            margin-bottom: 2rem;
          }

          @media screen and (max-width: 485px) {
            .mode-play {
              overflow: hidden;
            }

            .background-img {
              overflow-y: auto;
            }

            .login-box {
              padding-top: 14px;
            }

            .form-title {
              font-size: 16px;

              line-height: 16px;

              text-align: center;
            }

            .tutorial-step-number {
              font-size: 21px;

              height: 45px;

              width: 45px;
            }

            .tutorial-step-text {
              font-size: 0.9rem;
            }

            .videogiftutorial {
              width: 460px;

              height: 500px;

              border: 2px solid #b6ff40;

              border-radius: 8px;
            }

            .desktopvideo {
              display: none;
            }

            .mobilevideo {
              display: block;
            }

            .tutorial-subtitle {
              padding: 1rem 2rem;
            }

            .arrowbottom {
              bottom: -33%;
            }
          }
        `}
      </style>
    </>
  );
};

export default Login;
