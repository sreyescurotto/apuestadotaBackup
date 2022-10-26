import React from "react";
import Layout from "../components/Layout/Layout";
import PaymentReceived from "../components/paymentReceived/paymentReceived";
import withAuth from "../interceptors/auth";

const PaymentSuccess = () => {
  return (
    <>
      <Layout>
          <div className="interface">
            <PaymentReceived />
          </div>
        </Layout>

      <style jsx>
        {`
          .mode-play {
            height: 100vh;

            overflow-y: hidden;
          }

          .interface {
            background-image: url("/heros/cristal.jpg");
          }

          @media (max-width: 768px) {
            .mode-play {
              overflow-x: hidden;

              overflow-y: scroll;
            }
          }
        `}
      </style>
    </>
  );
};

export default withAuth(PaymentSuccess);
