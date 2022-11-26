import React from "react";

const PaymentReceived = () => {
  return (
    <>
      <div className="payment-recieved">
        <h4 className="payment-title">Tu recarga ha sido recibida éxito, estamos validando la transaccion, dale click en el boton para culminar con el proceso </h4>

        <img src="icons/ok.svg" className="payment-ok" />
      </div>

      <style jsx>{`
        .payment-recieved {
          display: flex;

          flex-direction: column;

          align-items: center;

          background-color: #3c5376b8;

          justify-content: center;

          height: 100%;

          padding-bottom: 100px;
        }

        .payment-title {
          font-size: 1.5rem;

          color: #fff;

          margin: 2rem;
        }

        .payment-recieved img {
          filter: invert(99%) sepia(62%) saturate(1863%) hue-rotate(23deg)
            brightness(100%) contrast(101%);

          height: 400px;
        }

        .payment-ok {
          -webkit-animation: jello-diagonal-1 2s infinite both;

          animation: jello-diagonal-1 2s infinite both;
        }

        @-webkit-keyframes jello-diagonal-1 {
          0% {
            -webkit-transform: skew(0deg 0deg);

            transform: skew(0deg 0deg);
          }

          30% {
            -webkit-transform: skew(25deg 25deg);

            transform: skew(25deg 25deg);
          }

          40% {
            -webkit-transform: skew(-15deg, -15deg);

            transform: skew(-15deg, -15deg);
          }

          50% {
            -webkit-transform: skew(15deg, 15deg);

            transform: skew(15deg, 15deg);
          }

          65% {
            -webkit-transform: skew(-5deg, -5deg);

            transform: skew(-5deg, -5deg);
          }

          75% {
            -webkit-transform: skew(5deg, 5deg);

            transform: skew(5deg, 5deg);
          }

          100% {
            -webkit-transform: skew(0deg 0deg);

            transform: skew(0deg 0deg);
          }
        }

        @keyframes jello-diagonal-1 {
          0% {
            -webkit-transform: skew(0deg 0deg);

            transform: skew(0deg 0deg);
          }

          30% {
            -webkit-transform: skew(25deg 25deg);

            transform: skew(25deg 25deg);
          }

          40% {
            -webkit-transform: skew(-15deg, -15deg);

            transform: skew(-15deg, -15deg);
          }

          50% {
            -webkit-transform: skew(15deg, 15deg);

            transform: skew(15deg, 15deg);
          }

          65% {
            -webkit-transform: skew(-5deg, -5deg);

            transform: skew(-5deg, -5deg);
          }

          75% {
            -webkit-transform: skew(5deg, 5deg);

            transform: skew(5deg, 5deg);
          }

          100% {
            -webkit-transform: skew(0deg 0deg);

            transform: skew(0deg 0deg);
          }
        }

        @media screen and (max-width: 480px) {
          .paymwnt-ok {
            height: 270px;
          }
        }
      `}</style>
    </>
  );
};

export default PaymentReceived;
