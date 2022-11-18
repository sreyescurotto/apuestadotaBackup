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
      withdraw: response.default.withdraw,
      profile: response.default.profile,
    },
  };
}

const Withdraw = (props) => {
  const { layout, navbar, leftbar, withdraw, profile } = props;
  return (
    <>
      <Layout layout={layout} navbar={navbar} leftbar={leftbar}>
        <div className="interface">
          <With withdraw={withdraw} profile={profile}/>
        </div>
      </Layout>

      <style jsx>
        {`
          .interface {
            background-color: #2C62FE;
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Withdraw);
