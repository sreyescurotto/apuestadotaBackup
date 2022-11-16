import React from "react";

import Link from "next/link";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import AppService from "../../services/app.service";

import Image from "next/image";

const Leftbar = (props) => {

  const leftbar = props.leftbar

  const router = useRouter();


  
  const [saldo, setSaldo] = useState(()=> {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saldo');
      const initialValue = JSON.parse(saved);
      return initialValue || leftbar.loading;
    }   
  });

  const [saldoPrueba, setSaldoPrueba] = useState(()=> {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saldoPrueba');
      const initialValue = JSON.parse(saved);
      return initialValue || leftbar.loading;
    }   
  });

  const [charging, setCharging] = useState(false);

  const [test2, setTest2] = useState(false);

  
  const depositarPrueba = () => {
    if (charging) return;

    let s = new AppService();

    setCharging(true);

    s.makePost("deposito/test", {}, true)
      .then((res) => {
        setCharging(false);

        setSaldoPrueba(res.data.saldo.toFixed(2));
      })
      .catch((err) => {
        setCharging(false);

        Swal.fire({
          icon: "error",
          text:
            err?.response?.data?.error ||
            "Has alcanzado el maximo de balance en cuenta de práctica",
        });
      });
  };

  useEffect(() => {
    let s = new AppService();

    if (s.getUser() !== null) {
      s.makeGet("saldo", {}, true).then((res) => {
        setSaldo(res.data.saldo);

        setSaldoPrueba(res.data.saldo_prueba);

        setTest2(res.data.saldo_switch == "balance_prueba");
      });
    } else {
      setSaldo("...");
      setSaldoPrueba("...");
    }
    localStorage.setItem("saldo", saldo);
    localStorage.setItem("saldoPrueba", saldoPrueba);
    
  }, [saldo, saldoPrueba]);




  

const routePractice = () => {
  router.push("/play/practice");
}

const routeReal = () => {
  router.push("/play/normal");
}

  return (
    <>
      <div className="left-container">
        <div className="left-container-header">
          <h3 className="left-container-title">{leftbar.title} </h3>

          <div
            className="pad--s"
            onClick={routeReal}
          >
          {/* onClick={() => {
              switchSaldo(0);
            }} */}
            <div className={router.pathname == '/play/normal' ?   "pad--int active-mode" : "pad--int"}>
              <h3 className="left-container-h3 real-acc">{leftbar.realAcc}</h3>

              <h3 className="left-container-h3 left-flex-container-h real-acc">
                S/.
                <span className="fontw-l"> {saldo}</span>
              </h3>
            </div>
          </div>

          <div
            className={"pad--s"}
            onClick={routePractice}
          >
            <div className={router.pathname == '/play/practice' ?   "pad--int active-mode" : "pad--int"}>
              <h3 className="left-container-h3 orange">{leftbar.practiceAcc}</h3>

              <h3 className="left-container-h3 left-flex-container-h">
           
                <div className="dollar--svg orange"> 
                  S/.
                </div>
                <span className="fontw-l orange"> {saldoPrueba}</span>
              </h3>
            </div>
          </div>

          {/* <div className="reloadpng" onClick={depositarPrueba}>
            <Image
              src="/icons/reload.png"   
              width={24}
              height={24}
            />
          </div> */}

        </div>

        <div className="left-container-body">
          <div className="left-container-body-item">
            
            <Link href='/profile'>
              <a className={router.pathname == '/profile' ? "left-body-anchor-active" : "left-container-body-anchor"}>
              <div className="left-container-img left-img-active">
                <Image
                    src="/icons/account-l.png"
                    alt="profile"
                    width={24}
                    height={24}
                  />
              </div>
                <h3 className="left-container-h3  left-h3-active">{leftbar.profile}</h3>
              </a>
            </Link>
          </div>

          <div className="left-container-body-item">
           
           <Link href="/deposit">
              <a  className={router.pathname == '/deposit' ? "left-body-anchor-active" : "left-container-body-anchor"}>
              <div className="left-container-img left-img-active">
                <Image 
                    src="/icons/cash-fast-l.png"
                    alt="deposit"
                    width={24}
                    height={24}
                  />
              </div>
                <h3 className="left-container-h3 left-h3-active">{leftbar.deposit}</h3>
              </a>
           </Link>
              
           
          </div>

          <div className="left-container-body-item">
            
            <Link href="/withdraw">
              <a className={router.pathname == '/withdraw' ? "left-body-anchor-active" : "left-container-body-anchor"}>
              <div className="left-container-img left-img-active">
                <Image
                  src="/icons/currency-usd-l.png"
                  alt="withdraw"
                  width={24}
                  height={24}
                />
              </div>
                <h3 className="left-container-h3 left-h3-active">{leftbar.withdraw}</h3>
              </a>
            </Link>
          </div>

          <div className="left-container-body-item">
            
            <Link href='/tutorial'>
              <a className={router.pathname == '/tutorial' ? "left-body-anchor-active" : "left-container-body-anchor"}>
              <div className="left-container-img left-img-active">
                <Image
                  src="/icons/help-box-l.png"
                  alt="tutorial"
                  width={24}
                  height={24}
                />
              </div>
                <h3 className="left-container-h3 left-h3-active">{leftbar.tutorial}</h3>
              </a>
              </Link>
          </div>

          <div className="left-container-body-item">  
            <Link href="/rules">
              <a  className={router.pathname == '/rules' ? "left-body-anchor-active" : "left-container-body-anchor"}>
              <div className="left-container-img left-img-active">
                <Image
                    src="/icons/book-o.png"
                    alt="rules"
                    width={24}
                    height={24}
                  />
              </div>
                <h3 className="left-container-h3 left-h3-active">
                  {leftbar.terms}
                </h3>
              </a>
            </Link>
          </div>

          <div className="left-container-body-item">  
            <Link href="/monetize">
              <a  className={router.pathname == '/monetize' ? "left-body-anchor-active" : "left-container-body-anchor"}>
              <div className="left-container-img left-img-active">
                <Image
                    src="/icons/cash-1.png"
                    alt="monetize"
                    width={24}
                    height={24}
                  />
              </div>
                <h3 className="left-container-h3 left-h3-active">
                  {leftbar.monetize}
                </h3>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .dollar--svg {
            height: 25px;
          }

          .orange {
            color: rgba(242,92,4,1);
          }

          .right-arrow--svg {
            height: 18px;

            filter: invert(100%) sepia(19%) saturate(6900%) hue-rotate(23deg)
              brightness(98%) contrast(108%);

            padding-right: 10px;

            align-self: center;

            cursor: pointer;
          }

          .left-flex-container-h {
            display: flex;

            align-items: center;

            gap: 10px;
          }

          .disable {
            pointer-events: none;
          }

          .left-container {
            background-color: #081325;

            border-right: 1px solid #3c5376 !important;

            box-shadow: inset 0 -1px hsl(0deg 0% 100% / 10%),
              8px 0 16px -4px rgb(0 0 0 / 75%);

            -webkit-box-shadow: inset 0 -1px hsl(0deg 0% 100% / 10%),
              8px 0 16px -4px rgb(0 0 0 / 75%);

            position: relative;

            z-index: 4;
          }

          .left-container-header {
            background: #171f30;

            border-bottom: 1px solid #3c5376;

            padding-top: 15px;

            padding-bottom: 15px;

            display: flex;

            justify-content: space-between;

            flex-direction: column;

            position: relative;
          }

          .disable-test {
            display: none;
          }

          .left-container-title {
            padding: 0 0 0 2rem;
            font-family: "Teko", sans-serif;
          }

          .fontw-l {
            font-weight: lighter;
          }

          .left-container-body {
            position: relative;
            height: 100%;
          }

          .left-container-body-item {
            padding-left: 0.7rem;

            padding-right: 1rem;

            padding-top: 0.8rem;

            padding-bottom: 0.8rem;
          }

          .left-container-body-item a {
            padding: 0.7rem 1rem .5rem;

            border-radius: 20px;
          }

          .left-container-body-item:hover .left-container-body-anchor {
            background-color: #3c5376;
          }

          .left-container-body-item:hover .left-container-h3 {
            color: #fff;
          }

          .left-body-anchor-active {
            background-color: #3c5376;
          }

          .left-body-anchor-active .left-h3-active {
            color: #fff !important;
          }

          .left-body-anchor-active .left-img-active {
            filter: brightness(0%) invert(100%);

            -webkit-filter: brightness(0%) invert(100%);

            -moz-filter: brightness(0%) invert(100%);
          }

          .left-container-body-item:hover .left-container-img {
            filter: brightness(0%) invert(100%);

            -webkit-filter: brightness(0%) invert(100%);

            -moz-filter: brightness(0%) invert(100%);
          }

          .left-container-h3 {
            

            font-weight: 400;

            color: rgb(146, 162, 190);

            margin-top: 2px;
          }

          .left-container-body-item a {
            display: flex;

            gap: 10px;
          }

          .reloadpng {
            width: 24px;

            height: 24px;

            position: absolute;

            bottom: 0;

            right: 0;

            margin: 2rem;

            cursor: pointer;

            z-index: 999;

            transition: all 0.3s ease-in-out;
          }

          .reloadpng:hover {
            transform:  scale(1.4) rotate(270deg);
          }

          .disable-test {
            display: none;
          }

          @media only screen and (max-width: 1366px) { 
            .reloadpng {
              margin: 1.5rem;
              width: 20px;
              height: 20px;
            }
            .left-container-body-item {
              padding-top: .4rem;
              padding-bottom: .4rem;
            }
            .left-container-h3 {
              font-size: 1rem;
            }
            .pad--s {
              padding: .5rem 1rem .5rem 1.5rem;
            }
          }

          @media screen and (max-width: 767px) {
            .left-container {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default Leftbar;
