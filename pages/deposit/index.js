import React from "react";
import Dep from '../../components/Dep'
import Layout from '../../components/Layout/Layout';
import withAuth from "../../interceptors/auth";

const Deposit = () => {
  return (
    <>
      <Layout>
        <div className="interface">
          <Dep />
        </div>
      </Layout>

      <style jsx>
        {`
          .interface {
            background-image: url("/heros/cristal.jpg");
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Deposit);
