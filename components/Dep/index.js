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

  const merchandid = "456879856"

  const methods = [
    {
      id: "izipay",
      img_url: "/icons/methods/visa-mastercard.png",
      label: "Pago con tarjeta",
    },
    {
      id: "niubiz",
      img_url: "/icons/methods/pagoefectivo.png",
      label: "Pago Efectivo",
    },
    {
      id: "niubiz2",
      img_url: "/icons/methods/yapeplin.png",
      label: "Pago con Yape o Plin",
    },
    {
      id: "izipay1",
      img_url: "/icons/methods/visa-mastercard.png",
      label: "Pago con tarjeta",
    },
    {
      id: "izipay2",
      img_url: "/icons/methods/visa-mastercard.png",
      label: "Pago con tarjeta",
    }
  ];

  // {id:'paypal', img_url: '/icons/methods/paypal.png', label: 'Paypal'}
  const [metodo, setMetodo] = useState("izipay");

  const [monto, setMonto] = useState(10);

  const [mouse, setMouse] = useState(true);

  const [dep, setDep] = useState(true);

  const refM = useRef(null);

  const refCR = useRef(null);

  const testapiUrl = "https://apisandbox.vnforappstest.com/api.security/v1/security"

  const selectMetodo = (metodo) => {
    setMetodo(metodo);
  };

  const handleChange = (e) => {
    const b = e.target.value;
  
    b.length > 5 ? setMonto(100) : b > 0 ? setMonto(b) : setMonto(0);
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


  const [token, setToken] = useState("");

  const [session, setSession] = useState("");
  
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(false);

  const [nickname, setNickname] = useState("...");

  function createToken () {
    const options = {
      method: 'GET',
      url: 'https://apisandbox.vnforappstest.com/api.security/v1/security',
      headers: {
        accept: 'text/plain',
        authorization: 'Basic aW50ZWdyYWNpb25lc0BuaXViaXouY29tLnBlOl83ejNAOGZG'
      }
    };
    
    axios
      .request(options)
      .then(function (response) {
        setToken(response.data);
        console.log(response.data);
        
      })
      .catch(function (error) {
        console.error(error);
      });
  }


  function createOrder() {
    if (loading) {
    const options = {
      method: 'POST',
      url: `https://apisandbox.vnforappstest.com/api.ecommerce/v2/ecommerce/token/session/${merchandid}`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: token
      },
      data: {
        antifraud: {
          merchantDefineData: {MDD15: 'Valor MDD 15', MDD20: 'Valor MDD 20', MDD33: 'Valor MDD 33'}
        },
        channel: 'web',
        amount: `${monto}.00`
      }
    };
    
    axios
      .request(options)
      .then(function (response) {
        setSession(response.data.sessionKey);
   
        openForm();
        setForm(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }}

  function pagoEfectivo() {
  const options = {
    method: 'POST',
    url: 'https://apisandbox.vnforappstest.com/api.pagoefectivo/v1/create/456879852',
    headers: {accept: 'application/json', 'content-type': 'application/json', Authorization: token},
    data: {
      channel: 'web',
      email: user.email,
      amount: `${monto}.00`,
      externalTransactionId: '218f9cff-9131-1154-2919-d0b319912351'
    }
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      router.push(response.data.cipUrl)
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  //generate a random purchase order number
  const generateOrderNumber = () => {
    return Math.floor(Math.random() * 1000000000);
  }

  const openForm = () => { 
    // Este formulario funciona y levanta correctamente pero redirecciona directamente a lo que esta en el action del form
    // la function complete no recibe el resultado del form. 
      VisanetCheckout.configure({
        sessiontoken: session, //lo tengo que retornar del back
        channel: 'web',
        merchantid: merchandid, //numero de comercio
        purchasenumber: generateOrderNumber,//'16673216591', //numero de compra
        amount: `${monto}.00`, //monto de la compra
        expirationminutes: '20',
        timeouturl: 'about:blank',
        merchantlogo: 'https://apuestadota.com/_next/image?url=%2Fapuesta-logo.png&w=256&q=75',
        formbuttoncolor: '#000000',
        buttoncolor: 'navy',
        method: 'post',
        cardholdername: user.name,
        cardholderlastname: user.lastname,
        cardholderemail:user.email,
        action: `${baseURL}/depositar`,
        complete: function (params) {
            console.log('print key complete: ',params);
        }
    });
    VisanetCheckout.open();
}

  const generQr = () => {
    if (loading) {
      const options = {
        method: 'POST',
        url: 'https://apitestenv.vnforapps.com/api.qr.manager/v1/qr/ascii',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: token
        },
        data: {tagType: 'STATIC', validityDate: '30122022'}
      };
      
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      }
  }

  useEffect(() => {
    let s = new AppService();
    createToken()
    setBaseURL(s.getBaseUrl());
    let _user = s.getUser();
    setNickname(_user.nickname);

    s.makeGet("profile", {}, true).then((res) => {
      setUser(res.data);
    });
  }, []);

  // useEffect(() => {
    
  //   createOrder()
  // }, [loading]);

  return (
    <>
    <Script type="text/javascript" src="https://static-content-qas.vnforapps.com/v2/js/checkout.js" />
      <div className="withdraw-main-container">
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

            <p className="text-t">El monto mínimo de deposito es S/ 10 y el máximo es S/ 500.</p>
     
            <input
              className="input-amount-withdraw"
              ref={refCR}
              onChange={handleCodRefChange}
              maxLength={20}
              placeholder="Código de referido"
              type="text"
              id="cod_ref"
              name="ref_code"
            />
          <p className="text-t">Acepto que al usar un código de referido recibiré el 10% adicional al valor 
          del primer deposito y me obligo a jugar por lo menos 10 partidas antes de solicitar algún retiro de fondos.</p>
     
  
          </div>
          <div className="withdraw-flex">
            <h3 className="subtitle-w">Aceptamos todos los medios de pago</h3>
            <button className="deposit-btn-submit" onClick={createOrder}>
                    IR A PAGAR
            </button>

            <div className="deposit-grid-container">
              {methods.map((method) => {
                return (
                  <div key={`metodo_${method.id}`} className={`deposit-item ${metodo == method.id 
                  ? "" : "deposit-unactive disable-deposit"}`}>
                  <img src={method.img_url} alt={method.label} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`

        .withdraw-main-container {
          padding-top: 4rem;
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
      .deposit-item  img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
      .text-t {
        max-width: 433px;
      }
      .input-amount-withdraw {
        font-size: 16px!important;
      }
        `}
      </style>
    </>
  );
};

export default Dep;
