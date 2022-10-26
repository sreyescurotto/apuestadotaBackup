import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import Layout from "../components/Layout/Layout";
import withAuth from "../interceptors/auth";

const PaymentSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      Swal.fire({
        icon: "error",
        text: router.query.error,
        backdrop: true,
      }).then(() => {
        router.push("/deposit");
      });
    }
  }, [router.query]);

  return (
    <>
      <Layout>
          <div className="interface"></div>
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
