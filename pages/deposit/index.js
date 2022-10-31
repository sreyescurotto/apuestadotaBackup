import React from "react";
import Dep from '../../components/Dep'
import Layout from '../../components/Layout/Layout';
import withAuth from "../../interceptors/auth";

export async function getStaticProps({ locale }) {
  const response = await import(`../../lang/${locale}.json`);
  return {
    props: {
      play: response.default.play,
      navbar: response.default.navbar,
      layout: response.default.layout,
      leftbar: response.default.leftbar,
    },
  };
}

const Deposit = (props) => {
  const { play , layout, navbar, leftbar } = props;
  return (
    <>
      <Layout layout={layout} navbar={navbar} leftbar={leftbar}>
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
