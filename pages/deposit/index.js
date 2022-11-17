import React from "react";
import Dep from '../../components/Dep'
import Layout from '../../components/Layout/Layout';
import withAuth from "../../interceptors/auth";
import Script from "next/script";

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
            background-image: linear-gradient(180deg, rgba(101,35,255,1) 0%, rgba(101,35,252,1) 24%, rgba(101,8,255,1) 42%, rgba(101,0,232,1) 56%, rgba(101,1,212,1) 66%, rgba(101,3,201,1) 75%, rgba(101,2,182,1) 81%, rgba(101,2,162,1) 87%, rgba(101,1,144,1) 92%, rgba(101,1,133,1) 100%);
               }
        `}
      </style>
    </>
  );
};

export default withAuth(Deposit);
