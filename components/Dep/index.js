import React, { useState, useEffect, useRef } from "react";

import AppService from "../../services/app.service";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import Swal from "sweetalert2";

import { useRouter } from "next/router";

const Dep = () => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const router = useRouter();

  const [usuarioId, setUsuarioId] = useState();

  const [user, setUser] = useState({});

  const [codRef, setCodRef] = useState("");

  const [baseURL, setBaseURL] = useState(null);

  useEffect(() => {
    let s = new AppService();

    setBaseURL(s.getBaseUrl());

    s.makeGet("profile", {}, true).then((res) => {
      setUser(res.data);
    });
  }, []);

  const methods = [
    {
      id: "izipay",
      img_url: "/icons/methods/visa-mastercard.png",
      label: "Pago con tarjeta",
    },
    {
      id: "niubiz",
      img_url: "/icons/methods/pagoefectivo.png",
      label: "Pago Efectivo, Yape, Plin",
    }

    // {id:'paypal', img_url: '/icons/methods/paypal.png', label: 'Paypal'}
  ];

  const [metodo, setMetodo] = useState("izipay");

  const [monto, setMonto] = useState(10);

  const [mouse, setMouse] = useState(true);

  const [dep, setDep] = useState(true);

  const refM = useRef(null);

  const refCR = useRef(null);

  const selectMetodo = (metodo) => {
    setMetodo(metodo);
  };

  const handleChange = (e) => {
    const b = e.target.value;
    const amount = refM.current.value;
    b.length > 5 ? setMonto(100) : setMonto(amount);
  };

  const handleCodRefChange = (e) => {
    e.preventDefault();

    const cod_ref = refCR.current.value.toString().toUpperCase();

    setCodRef(cod_ref);
  };

  const handleMouseEnter = (e) => {
    setMouse(!mouse);
  };

  const handleDeposit = (e) => {
    if (monto >= 10) {
      setDep(false);
    }
  };

  const currency = "USD";

  const style = { layout: "vertical" };

  const amount = monto >= 10 ? monto : 10;

  async function createToken () {
    const credentials = Buffer.from(`${process.env.NIUBIZ_USER}:${process.env.NIUBIZ_PASSWORD}`).toString('base64');
    const response = await fetch("https://apisandbox.vnforappstest.com/api.security/v1/security", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
    }
    })
    const data = await response.json()
    return data
  }

  useEffect(() => {
    //make a fetch to get session id 
    // const a = createToken()
    // console.log(a)
    
  }, []);

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",

        value: {
          ...options,

          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}

        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[monto, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order

              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,

                      value: amount,
                    },
                  },
                ],
              })

              .then((orderId) => {
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            actions.order.capture().then((res) => {
              console.log(res);

              if (res.status == "COMPLETED") {
                let s = new AppService();

                s.makePost(
                  "depositar",
                  {
                    proveedor: "paypal",
                    monto: monto,
                    ref_code: codRef,
                    transaction_id: res.id,
                  },
                  true
                )
                  .then((resp) => {
                    router.push("/paymentSuccess");
                  })
                  .catch((err) => {
                    Swal.fire({
                      type: "error",
                      text:
                        err?.response?.data?.error ||
                        "Hubo un problema al enviar los detalles de pago",
                    });
                  });
              } else {
                Swal.fire({ type: "error", text: "Pago cancelado" });
              }
            });
          }}
        />
      </>
    );
  };

  return (
    <>
      {user.email == null ? (
        <>
          <div className="need-to-container">
            <h2 className="intro-title"> Te hace falta registrar tus datos</h2>

            <a href="/profile">
              <div
                className={mouse ? "return-btn" : "return-btn return-btn-hover"}
              >
                {" "}
                Haz click aquí para terminar tu registro
              </div>
            </a>
          </div>

          <div className="withdraw-container">
            <div
              className="withdraw-container-before"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseEnter}
            ></div>

            <h4>
              Hola <span>{user.nickname}</span>, haz tu depósito:
            </h4>

            <div className="withdraw-flex">
              <div className="withdraw-flex-payment-method">
                {methods.map((item) => {
                  return (
                    <div
                      key={`metodo_${item.id}`}
                      onClick={() => {
                        selectMetodo(item.id);
                      }}
                      className={`method-item ${
                        metodo == item.id
                          ? ""
                          : "withdraw-unacive disable-withdraw"
                      }`}
                    >
                      <img src={item.img_url} alt={item.label} />

                      {item.label}
                    </div>
                  );
                })}
              </div>

             
                <div className="withdraw-flex-payment-main">
                  <form className="widthdraw-form">
                    <div className="withdraw-flex-payment-main-item">
                      <label htmlFor="amount">Monto:</label>

                      <input
                        name="monto"
                        type="number"
                        defaultValue={10}
                        required
                      />
                    </div>
                    <button className="deposit-btn-submit"  type="submit" disabled>
                      Depositar
                    </button>
                  </form>
                </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="withdraw-container">
            <h4>
              {" "}
              Hola <span>{user.nickname}</span>, haz tu depósito:
            </h4>

            <div className="withdraw-flex">
              <div className="withdraw-flex-payment-method">
                {methods.map((item) => {
                  return (
                    <div
                      key={`metodo_${item.id}`}
                      onClick={() => {
                        selectMetodo(item.id);
                      }}
                      className={`method-item ${
                        metodo == item.id ? "" : "withdraw-unacive"
                      }`}
                    >
                      <img src={item.img_url} alt={item.label} />

                      {item.label}
                    </div>
                  );
                })}
              </div>

              {metodo != "izipay" ? (
                <div className="withdraw-flex-payment-main paypal-method">
                  <div className="withdraw-flex-payment-main-item">
                    
                  <form action="paginaRespuesta" method="post">
                    <script type="text/javascript" src="https://static-
                    content-qas.vnforapps.com/v2/js/checkout.js"
                    data-sessiontoken="67cf73735f83590eabf1382ff49e5e
                    08b261976326c6897cb764fd160a15a8ca"
                    data-channel="web"
                    data-merchantid="341198210"
                    data-purchasenumber="2020100901"
                    data-amount="10.5"
                    data-expirationminutes="20"
                    data-timeouturl="about:blank"
                    data-merchantlogo="img/comercio.png"
                    data-formbuttoncolor="#000000"
                    />
                    </form>

                    <p className="warning-text">
                      Recuerda que el monto mínimo para recargar es de 10 $.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="withdraw-flex-payment-main">
                  <form
                    className="widthdraw-form"
                    method="POST"
                    action={baseURL + "/depositar"}
                  >
                    <input
                      type="hidden"
                      name="api_token"
                      value={user.api_token}
                    />

                    <input type="hidden" name="proveedor" value="izipay" />

                    <div className="withdraw-flex-payment-main-item">
                      <label htmlFor="amount">Monto:</label>

                      <input
                        type="number"
                        id="amount"
                        name="monto"
                        value={monto}
                        ref={refM}
                        onChange={handleChange}
                        max="500"
                        min="10"
                        step="1"
                        required
                      />
                    </div>

                    <div className="withdraw-flex-payment-main-item">
                      <label htmlFor="cod_ref">Código de Referido:</label>

                      <input
                        type="text"
                        id="cod_ref"
                        name="ref_code"
                        ref={refCR}
                        onChange={handleCodRefChange}
                        maxLength={20}
                      />
                    </div>

                    <p className="text-t">
                      Acepto que al usar un código de referido recibiré el 10%
                      adicional al valor del primer depósito y me obligo a jugar
                      por lo menos 10 partidas antes de solicitar algún retiro
                      de fondos.
                    </p>

                    <button
                      className="deposit-btn-submit"
                      type="submit"
                      onClick={handleDeposit}
                    >
                      {dep ? "Depositar" : "Cargando Pasarela ..."}
                    </button>
                  </form>

                  <p className="warning-text">
                    Recuerda que el monto mínimo para recargar es de 10 $.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <style jsx>
        {`
          .need-to-container {
            display: flex;

            flex-direction: column;

            justify-content: center;

            align-items: center;
          }

          .return-btn {
            background-color: #b6ff40;

            font-family: "Roboto Mono", monospace;

            font-size: 14px;

            padding: 0.7rem 1rem;

            border-radius: 20px;

            font-weight: 600;

            color: #3c5376;

            cursor: pointer;

            transition: all 0.3s ease;

            box-shadow: 4px 4px 18px 0px rgba(0, 0, 0, 0.75);

            -webkit-box-shadow: 4px 4px 18px 0px rgba(0, 0, 0, 0.75);

            -moz-box-shadow: 4px 4px 18px 0px rgba(0, 0, 0, 0.75);
          }

          .return-btn:hover {
            background-color: #3c5376;

            color: #fff;
          }

          .return-btn-hover {
            animation: myAnim 1.5s ease 0s infinite normal forwards;
          }

          @keyframes myAnim {
            0%,
            50%,
            100% {
              background-color: #3c5376;

              color: #fff;
            }

            25%,
            75% {
              background-color: #b6ff40;

              color: #3c5376;
            }
          }

          .intro-title {
            padding: 2rem;

            font-size: 3.5rem;

            font-family: "Poppins";
          }

          .withdraw-container {
            max-width: 800px;

            position: relative;

            margin: 2rem auto 0;

            padding: 2rem;

            background-color: #131e2fd9;

            border-radius: 10px;

            position: relative;
          }

          .withdraw-container-before {
            content: "";

            position: absolute;

            top: 0;

            left: 0;

            width: 100%;

            height: 100%;

            backdrop-filter: blur(2px);

            border-radius: 10px;

            z-index: 9;
          }

          .withdraw-container h4 {
            color: #fff;

            font-size: 1.3rem;

            font-family: "Roboto Mono", monospace;

            margin-bottom: 1rem;
          }

          .withdraw-flex {
            display: flex;

            width: 100%;
          }

          .withdraw-flex-payment-method {
            display: flex;

            flex-direction: column;

            gap: 20px;

            font-family: "Teko", sans-serif;

            color: #fff;

            width: 33%;
          }

          .method-item {
            display: flex;

            flex-direction: row;

            align-items: center;

            gap: 10px;

            padding: 1rem;

            cursor: pointer;

            background-color: rgba(255, 255, 255, 0.9);

            border-radius: 8px;

            color: #000;
          }

          .disable-withdraw {
            cursor: disabled;
            pointer-events: none;
          }

          .method-item:hover {
            background-color: #fff;

            border-radius: 8px;
          }

          .method-item img {
            width: 85px;

            border-radius: 8px;
          }

          .widthdraw-form {
            width: 400px;

            display: flex;

            flex-direction: column;

            align-items: center;

            padding-top: 0.5rem;
          }

          .text-t {
            color: rgba(255, 255, 255, 0.6);

            font-family: "Teko", sans-serif;

            margin-top: 1rem;
          }

          .withdraw-flex-payment-main {
            padding: 1rem 5rem;

            width: 64%;
          }

          .withdraw-flex-payment-main-item {
            margin-bottom: 0.8rem;

            display: flex;

            flex-direction: column;

            gap: 5px;

            width: 60%;
          }

          .withdraw-flex-payment-main-item label {
            color: rgba(255, 255, 255, 0.5);

            font-family: "Teko", sans-serif;
          }

          .withdraw-flex-payment-main-item input {
            border-radius: 8px;

            background-color: #1f2e44;

            border: none;

            height: 30px;

            color: #fff;

            padding: 0.5rem;

            margin-left: 1rem;
          }

          .wallet-container {
            width: 300px;

            margin-left: 0 !important;
          }

          .withdraw-flex-payment-main-item input:focus {
            font-family: "Roboto Mono", monospace;

            outline: none;

            background-color: #3c5376;
          }

          .warning-text {
            color: #b6ff40;

            font-family: "Roboto Mono", monospace;

            text-shadow: 0 0 30px rgba(255, 255, 255, 0.25);

            -webkit-animation: text-flicker-in-glow 4s infinite linear both;

            animation: text-flicker-in-glow 4s linear infinite both;
          }

          @-webkit-keyframes text-flicker-in-glow {
            0% {
              text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
                0 0 60px rgba(255, 255, 255, 0.25);

              opacity: 1;
            }

            50% {
              text-shadow: 0 0 30px rgba(255, 255, 255, 0.25);

              opacity: 0.1;
            }

            100% {
              text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
                0 0 60px rgba(255, 255, 255, 0.25);

              opacity: 1;
            }
          }

          @keyframes text-flicker-in-glow {
            0% {
              text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
                0 0 60px rgba(255, 255, 255, 0.25);

              opacity: 1;
            }

            50% {
              text-shadow: 0 0 30px rgba(255, 255, 255, 0.25);

              opacity: 0.1;
            }

            100% {
              text-shadow: 0 0 30px rgba(255, 255, 255, 0.45),
                0 0 60px rgba(255, 255, 255, 0.25);

              opacity: 1;
            }
          }

          .text-t {
            color: rgba(255, 255, 255, 0.6);

            font-family: "Teko", sans-serif;
          }

          .withdraw-form {
            width: 340px !important;

            align-items: normal !important;
          }

          @media screen and (max-width: 485px) {
            .intro-title {
              font-size: 2rem;
            }

            .withdraw-container {
              max-width: 480px;
            }

            .withdraw-flex {
              flex-direction: column;
              align-items: center;
            }

            .withdraw-flex-payment-method {
              flex-direction: row;
              width: 100%;
              justify-content: center;
            }

            .method-item img {
              width: 75px;
            }
            .withdraw-flex-payment-main {
              width: 100%;
              padding: 1rem 1.5rem;
            }

            .widthdraw-form {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

export default Dep;
