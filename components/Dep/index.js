import React, { useState, useEffect, useRef } from "react";

import AppService from "../../services/app.service";

import Swal from "sweetalert2";

import { useRouter } from "next/router";

import axios from "axios";

import Script from "next/script";

const Dep = () => {
  const router = useRouter();

  const [user, setUser] = useState({});

  const [codRef, setCodRef] = useState("");

  const [baseURL, setBaseURL] = useState(null);

  const merchandid = "650221602";

  const methods = [
    {
      id: "izipay",
      img_url: "/methods/visa.png",
      label: "Pago con tarjeta",
    },
    {
      id: "niubiz",
      img_url: "/methods/mastercard.png",
      label: "Pago Efectivo",
    },
    {
      id: "niubiz2",
      img_url: "/methods/yape.png",
      label: "Pago con Yape o Plin",
    },
    {
      id: "izipay1",
      img_url: "/methods/plin.png",
      label: "Pago con Plin",
    },
    {
      id: "izipay2",
      img_url: "/methods/dinners.png",
      label: "Pago con Dinners",
    },
    {
      id: "izipay3",
      img_url: "/methods/americna.png",
      label: "Pago con American Express",
    },
  ];

  const [metodo, setMetodo] = useState("izipay");

  const [monto, setMonto] = useState(10);

  const refM = useRef(null);

  const refCR = useRef(null);

  const handleChange = (e) => {
    const b = e.target.value;

    b.length > 5 ? setMonto(100) : b > 0 ? setMonto(b) : setMonto(0);
  };

  const handleCodRefChange = (e) => {
    e.preventDefault();

    const cod_ref = refCR.current.value.toString().toUpperCase();

    setCodRef(cod_ref);
  };

  const [token, setToken] = useState("");

  const [session, setSession] = useState("");

  const [loading, setLoading] = useState(false);

  const [buttonD, setButtonD] = useState(true);

  const [nickname, setNickname] = useState("...");

  const key = process.env.MYSQL_HOST;

  function createToken() {
    const options = {
      method: "GET",
      url: "https://apiprod.vnforapps.com/api.security/v1/security",
      headers: {
        accept: "text/plain",
        authorization: `Basic YXhlbF8yNzEyQGhvdG1haWwuY29tOjBpIXZLMFk/`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setToken(response.data);
        setLoading(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function createOrder() {
    if (loading) {
      const options = {
        method: "POST",
        url: `https://apiprod.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/${merchandid}`,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: token,
        },
        data: {
          antifraud: {
            merchantDefineData: {
              MDD4: "example@gmail.com",
              MDD21: 0,
              MDD32: "12345678",
              MDD75: "Registrado",
              MDD77: 12345,
            },
          },
          channel: "web",
          amount: `${monto}.00`,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setSession(response.data.sessionKey);
          openForm(response.data.sessionKey);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }
  //generate a random purchase order number
  const generateOrderNumber = () => {
    return Math.floor(Math.random() * 1000000000);
  };
  const [orderID, setOrderId] = useState(generateOrderNumber());

  const openForm = (sessionKey) => {
    if (monto > 500 || monto < 10) {
      Swal.fire({
        title: "Error al depositar",
        text: "El monto m??ximo es de 500 soles y el m??nimo es de 10 soles",
      }).then((result) => {
        if (result.isConfirmed) {
          router.reload();
        }
      });
    } else {
      VisanetCheckout.configure({
        sessiontoken: sessionKey,
        channel: "web",
        merchantid: merchandid,
        purchasenumber: orderID,
        amount: `${monto}.00`,
        expirationminutes: "20",
        timeouturl: "https://apuestadota.com/paymentError",
        merchantlogo: "https://apuestadota.com/apuesta-logo-b.png",
        formbuttoncolor: "#000000",
        buttoncolor: "navy",
        method: "POST",
        action: `/api/ad/depositarNiubiz?token=${token}&amount=${monto}&orderid=${orderID}&ref_code=${codRef}`,
        cardholdername: user.name,
        cardholderlastname: user.lastname,
        cardholderemail: user.email,

        complete: function (params) {
          <h1>LOADING</h1>;
        },
      });
      setButtonD(false);
      VisanetCheckout.open();
    }
  };

  useEffect(() => {
    let s = new AppService();
    createToken();
    setBaseURL(s.getBaseUrl());
    let _user = s.getUser();
    setNickname(_user.nickname);

    s.makeGet("profile", {}, true).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <>
      <Script
        type="text/javascript"
        src="https://static-content.vnforapps.com/v2/js/checkout.js"
      />
      <div className="withdraw-main-container">
        <h2 className="solo--title center">Realiza tu deposito</h2>
        <div className="withdraw-container background-gradient-1">
          <div className="withdraw-flex-first">
            <div className="text-w-intro">
              <h3 className="subtitle-w">
                Hola {nickname}, ingresa el monto a depositar
              </h3>
            </div>
            <input
              className="input-amount-withdraw"
              ref={refM}
              onChange={handleChange}
              value={monto}
              type="number"
              autoFocus
            />

            <p className="text-t">
              El monto m??nimo de deposito es S/ 10 y el m??ximo es S/ 500.
            </p>

            <input
              className="input-amount-withdraw"
              ref={refCR}
              onChange={handleCodRefChange}
              maxLength={20}
              placeholder="C??digo de referido"
              type="text"
              id="cod_ref"
              name="ref_code"
            />
            <p className="text-t">
              Acepto que al usar un c??digo de referido recibir?? el 10% adicional
              al valor del primer deposito y me obligo a jugar por lo menos 10
              partidas antes de solicitar alg??n retiro de fondos.
            </p>
          </div>
          <div className="withdraw-flex">
            <h3 className="subtitle-w">Aceptamos todos los medios de pago</h3>
            <button
              className={
                buttonD ? "deposit-btn-submit" : "deposit-btn-submit disable"
              }
              onClick={createOrder}
            >
              {buttonD ? "IR A PAGAR" : "CARGANDO..."}
            </button>

            <div className="deposit-grid-container">
              {methods.map((method) => {
                return (
                  <div
                    key={`metodo_${method.id}`}
                    className={`deposit-item ${
                      metodo == method.id
                        ? ""
                        : "deposit-unactive disable-deposit"
                    }`}
                  >
                    <img src={method.img_url} alt={method.label} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .withdraw-main-container h2 {
            margin-bottom: 1.8rem;
          }
          .deposit-grid-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            grid-column-gap: 0px;
            grid-row-gap: 0px;
          }
          .deposit-item {
            height: 80px;
            width: 100px;
          }
          .deposit-item img {
            height: 100%;
            width: 100%;
            object-fit: contain;
          }
          .text-t {
            max-width: 433px;
          }

          .disable {
            pointer-events: none;
          }
        `}
      </style>
    </>
  );
};

export default Dep;
