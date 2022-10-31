import React, { useState, useRef, useEffect } from "react";

import Swal from "sweetalert2";

import AppService from "../../services/app.service";

const With = (props) => {

  const withdraw = props.withdraw;

  const refM = useRef(null);

  const refA = useRef(null);

  const refC = useRef(null);

  const refN = useRef(null);

  const [monto, setMonto] = useState(0);

  const [acc, setAcc] = useState(" ");

  const [cci, setCii] = useState(" ");

  const [name, setName] = useState(" ");


  const [metodo, setMetodo] = useState("Transferencia");

  const [userId, setUserid] = useState();

  const [saldo, setSaldo] = useState("0.00");

  useEffect(() => {
    let s = new AppService();

    let _user = s.getUser();

    if (_user !== null) {
      setUserid(_user.id);

      s.makeGet("saldo", {}, true).then((resp) => {
        setSaldo(resp.data.saldo);
      });
    }
  }, []);

  const handleChangeAcc = (e) => {
    e.preventDefault();

    const a = refA.current.value;

    a.length < 17
      ? setAcc(Number(a))
      : alert("Ingrese un numero de cuenta valido");
  };

  const handleChangeCci = (e) => {
    e.preventDefault();

    const c = refC.current.value;

    c.length < 21
      ? setCii(Number(c))
      : alert("Ingrese un numero de CCI valido");
  };

  const handleChangeName = (e) => {
    e.preventDefault();

    const n = refN.current.value;

    setName(n);
  };

  const handleChange = (e) => {
    const b = e.target.value;
    const amount = refM.current.value;
    b.length > 4 ? setMonto(100) : setMonto(amount);
  };

  const retirar = (e) => {
    e.preventDefault();

    let _saldo = Number(saldo);

    if (monto < 20) {
      Swal.fire({
        text: withdraw.higher20,

        icon: "error",
      });

      return;
    }

    if (monto > _saldo) {
      Swal.fire({
        text: withdraw.notBalance,

        icon: "error",
      });

      return;
    }

    Swal.fire({
      text: `${withdraw.confirmText} ${monto} ${withdraw.for} ${metodo} ?`,

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#3085d6",

      cancelButtonColor: "#d33",

      confirmButtonText: withdraw.confirm,

      cancelButtonText: withdraw.cancel,
    }).then((result) => {
      if (result.isConfirmed) {
        let s = new AppService();

        s.makePost(
          "retiros",
          {
            metodo: metodo,

            monto: monto,

            nombre: name,

            nro_cuenta: acc,

            nro_cuenta_inter: cci,
          },
          true
        )
          .then((resp) => {
            Swal.fire({
              text: withdraw.success,

              icon: "success",
            }).then(() => {
              setTimeout(() => {
                location.reload();
              }, 1000);
            });
          })
          .catch((error) => {
            Swal.fire({
              text:
                error?.response?.data?.error ||
                withdraw.errorWith,

              icon: "error",
            });
          });
      }
    });
  };

  return (
    <>
      <h2 className="intro-title">{withdraw.title}</h2>

      <div className="withdraw-container">
        <h4> {withdraw.hello}</h4>

        <div className="withdraw-flex">
          <div className="withdraw-flex-payment-main">
            <form onSubmit={retirar}>
              <div className="widthdraw-form">
                <div className="withdraw-flex-payment-main-item">
                  <label htmlFor="accNumber"> {withdraw.accNum} </label>

                  <input
                    type="number"
                    id="accNumber"
                    name="accNumber"
                    ref={refA}
                    onChange={handleChangeAcc}
                    required
                  />
                </div>

                <div className="withdraw-flex-payment-main-item">
                  <label htmlFor="cciNumber">{withdraw.accCCI}</label>

                  <input
                    type="number"
                    id="cciNumber"
                    name="cciNumber"
                    ref={refC}
                    onChange={handleChangeCci}
                    required
                  />
                </div>

                <div className="withdraw-flex-payment-main-item">
                  <label htmlFor="name">{withdraw.nameA}</label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                   
                    ref={refN}
                    onChange={handleChangeName}
                    maxLength={30}
                    required
                  />
                </div>

                <div className="withdraw-flex-payment-main-item">
                  <label htmlFor="amount">{withdraw.amount}</label>

                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={monto}
                    ref={refM}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="deposit-btn-submit" type="submit">
                  {withdraw.withdraw}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bottom-text">
          <p className="text-t">{withdraw.text}</p>

          <p className="text-t">
            {withdraw.text2}
          </p>

          <p className="text-t">
            {withdraw.text3}
          </p>
        </div>
      </div>

      <style jsx>
        {`
          .intro-title {
            padding: 2rem;

            font-size: 3.5rem;

            font-family: "Poppins";

            text-shadow: 2px 2px 2px #000;
          }

          .withdraw-container {
            max-width: 800px;

            margin: 0 auto;

            padding: 2rem;

            background-color: #131e2fd9;

            border-radius: 10px;
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

            justify-content: center;
          }

          .withdraw-flex-payment-method {
            display: flex;

            flex-direction: column;

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
          }

          .method-item:hover {
            background-color: #1f2e44;

            border-radius: 8px;
          }

          .method-item img {
            width: 50px;

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
          }

          .w-margin {
            margin-top: 1rem;
          }

          .withdraw-flex-payment-main {
            padding: 1rem;
          }

          .withdraw-flex-payment-main-item {
            margin-bottom: 0.8rem;

            display: flex;

            flex-direction: column;

            gap: 5px;
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

          @media screen and (max-width: 485px) {
            .widthdraw-form {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

export default With;
