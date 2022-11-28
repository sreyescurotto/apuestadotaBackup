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

    b.length > 4 ? setMonto(100) : b > 0 ? setMonto(b) : setMonto(0);
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

        <div className="withdraw-container background-gradient-1">
          <div className="withdraw-flex-first">
            <div className="text-w-intro">
              <h3 className="subtitle-w">
                Hola {nickname}, tu saldo actual es:
              </h3>
              <h5 className="balance-w">S/ {saldo}</h5>
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
          .intro-title {
            padding: 2rem;

            text-align: center;

            font-size: 3.5rem;

            text-shadow: 2px 2px 2px #000;
          }

          .text-w-intro {
            margin-bottom: 0.6rem;
          }

          .balance-w {
            color: var(--verde);
            font-size: var(--title-size);
            text-align: center;
          }

          .withdraw-container h4 {
            color: #fff;

            font-size: 1.3rem;

            margin-bottom: 1rem;
          }

          .widthdraw-form {
            width: 400px;

            display: flex;

            flex-direction: column;

            padding-top: 0.5rem;
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
            border-bottom: 2px solid var(--verde);
            font-size: var(--subtitle-size);
            font-weight: lighter;
            height: 30px;
            color: white;
            padding: 0.5rem;
            margin-left: 1rem;
            width: 90%;
          }

          

          .withdraw-flex-payment-main-item input::placeholder {
            color: white;
          }

          .wallet-container {
            width: 300px;

            margin-left: 0 !important;
          }

          .withdraw-flex-payment-main-item input:focus {
            outline: none;
          }

          @media screen and (max-width: 485px) {
            .widthdraw-form {
              width: 100%;
            }

            .input-amount-withdraw {
              width: 100%;
              font-size: 2.2rem;
            }
            .bottom-text {
              margin-bottom: 1.5rem;
            }
            .withdraw-flex-payment-main {
              padding: 0.5rem 0;
            }
            .withdraw-flex-payment-main-item input {
              width: 100%;
              padding-left: 0;
            }

            .balance-w {
              margin: 0;
              font-size: 2rem;
            }
            .intro-title {
              font-size: 2.2rem;
            }

            .mode-bets-a {
              padding: 2rem 1rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default With;
