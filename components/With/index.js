import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import AppService from "../../services/app.service";
import DepReq from "../DepReq";

const With = (props) => {
  const withdraw = props.withdraw;
  const profileProps = props.profile;

  const refM = useRef(null);

  const refA = useRef(null);

  const refC = useRef(null);

  const refN = useRef(null);

  const [monto, setMonto] = useState(0);

  const [nickname, setNickname] = useState("...");

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
      setNickname(_user.nickname);
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
              text: error?.response?.data?.error || withdraw.errorWith,

              icon: "error",
            });
          });
      }
    });
  };

  return (
    <>
      <div className="withdraw-main-container">
        <h2 className="intro-title">{withdraw.title}</h2>

        <div className="withdraw-container">
          <div className="withdraw-flex-first">
            <div className="text-w-intro">
              <h3 className="subtitle-w">
                Hola {nickname}, tu saldo actual es:
              </h3>
              <span className="balance-w">S/ {saldo}</span>
            </div>
            <h4> {withdraw.hello}</h4>
            <input
              className="input-amount-withdraw"
              ref={refM}
              onChange={handleChange}
              value={monto}
              type="number"
              autoFocus
            />
            <div className="bottom-text">
              <p className="text-t">{withdraw.text}</p>

              <p className="text-t">{withdraw.text2}</p>

              <p className="text-t">{withdraw.text3}</p>
            </div>
          </div>

          <div className="withdraw-flex">
            <h4>Ingresa los siguientes datos</h4>
            <div className="withdraw-flex-payment-main">
              <form onSubmit={retirar}>
                <div className="widthdraw-form">
                  <div className="withdraw-flex-payment-main-item">
                    <input
                      type="number"
                      id="accNumber"
                      name="accNumber"
                      ref={refA}
                      onChange={handleChangeAcc}
                      placeholder={withdraw.accNum}
                      required
                    />
                  </div>

                  <div className="withdraw-flex-payment-main-item">
                    <input
                      type="number"
                      id="cciNumber"
                      name="cciNumber"
                      ref={refC}
                      onChange={handleChangeCci}
                      placeholder={withdraw.accCCI}
                      required
                    />
                  </div>

                  <div className="withdraw-flex-payment-main-item">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder={withdraw.nameA}
                      ref={refN}
                      onChange={handleChangeName}
                      maxLength={30}
                      required
                    />
                  </div>

                  <div className="withdraw-flex-payment-main-item">
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={monto}
                      readOnly
                      hidden
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
        </div>

        <div className="mode-bets-a ">

        <DepReq profile={profileProps} />
        </div>
      </div>

      <style jsx>
        {`
          .withdraw-main-container {
            margin-bottom: 4rem;
          }
          .intro-title {
            padding: 2rem;

            text-align: center;

            font-size: 3.5rem;

            font-family: "Poppins";

            text-shadow: 2px 2px 2px #000;
          }

          .withdraw-container {
            max-width: 1200px;

            margin: 0 auto;

            padding: 2rem;

            background-color: #131e2fd9;

            border-radius: 10px;
          }

          .text-w-intro {
            margin-bottom: 2rem;
          }

          .subtitle-w {
            font-size: 2.2rem;
            letter-spacing: 0px;
            line-height: 1.1;
          }

          .balance-w {
            color: #b6ff40;
            font-size: 2.5rem;
            font-family: "Poppins";
            margin: 0 0 0 7rem;
          }

          .withdraw-container {
            display: flex;
          }

          .withdraw-flex-first {
            width: 50%;
          }

          .withdraw-container h4 {
            color: #fff;

            font-size: 1.3rem;

            font-family: "Roboto Mono", monospace;

            margin-bottom: 1rem;
          }

          .withdraw-flex {
            display: flex;

            width: 50%;

            flex-direction: column;

            justify-content: center;
          }

          .widthdraw-form {
            width: 400px;

            display: flex;

            flex-direction: column;

            padding-top: 0.5rem;
          }

           {
            /* color: rgba(255, 255, 255, 0.6); */
          }

          .w-margin {
            margin-top: 1rem;
          }

          .withdraw-flex-payment-main {
            padding: 1rem;
          }

          .withdraw-flex-payment-main-item {
            margin-bottom: 1.4rem;
          }

          .withdraw-flex-payment-main-item input {
            background-color: transparent;
            border: none;
            border-bottom: 2px solid #b6ff40;
            font-size: 1.2rem;
            height: 30px;
            color: white;
            padding: 0.5rem;
            margin-left: 1rem;
            width: 90%;
            font-family: "Roboto Mono", monospace;
          }

          .input-amount-withdraw {
            background-color: transparent;
            border: none;
            border-bottom: 2px solid #b6ff40;
            width: 80%;
            text-align: center;
            color: white;
            font-family: "Roboto Mono", monospace;
            font-size: 2.5rem;
          }
          .input-amount-withdraw:focus {
            outline: none;
          }

          .withdraw-flex-payment-main-item input::placeholder {
            color: white;
          }

          .wallet-container {
            width: 300px;

            margin-left: 0 !important;
          }

          .withdraw-flex-payment-main-item input:focus {
            font-family: "Roboto Mono", monospace;
            outline: none;
          }

          @media screen and (max-width: 485px) {
            .withdraw-container {
              padding: 2rem 2rem 6.5rem;
              flex-direction:column;
            }
            .withdraw-flex-first {
              width: 100%;
            }
            .withdraw-flex {
              width: 100%;
            }
            .widthdraw-form {
              width: 100%;
            }

            .subtitle-w {
              font-size: 2rem;
              margin-bottom: 10px;
            }
            .input-amount-withdraw {
              width: 100%;
              font-size: 2.2rem;
            }
            .bottom-text {
              margin-bottom: 1.5rem;
            }
            .withdraw-flex-payment-main {
              padding: .5rem 0;
            }
            .withdraw-flex-payment-main-item input {
              width: 100%;
              padding-left: 0;
            }

            .balance-w {
              margin: 0 0 0 5rem;
              font-size: 2.2rem;
            }
            .intro-title {
              font-size: 2.2rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default With;
