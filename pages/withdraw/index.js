import React from "react";
import With from "../../components/With";
import Layout from '../../components/Layout/Layout';
import withAuth from "../../interceptors/auth";

const Withdraw = () => {
  return (
    <>
      <Layout>
        <div className="interface">
          <With />
        </div>
      </Layout>

      <style jsx>
        {`
          .interface {
            background-image: url("/heros/storm.jpg");
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Withdraw);
