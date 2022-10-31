import React from "react";
import With from "../../components/With";
import Layout from '../../components/Layout/Layout';
import withAuth from "../../interceptors/auth";

export async function getStaticProps({ locale }) {
  const response = await import(`../../lang/${locale}.json`);
  return {
    props: {
      navbar: response.default.navbar,
      layout: response.default.layout,
      leftbar: response.default.leftbar,
      withdraw: response.default.withdraw
    },
  };
}

const Withdraw = (props) => {
  const { layout, navbar, leftbar, withdraw } = props;
  return (
    <>
      <Layout layout={layout} navbar={navbar} leftbar={leftbar}>
        <div className="interface">
          <With withdraw={withdraw}/>
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
