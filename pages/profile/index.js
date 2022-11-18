import React from "react";

import ProfileSettings from "../../components/ProfileSettings";

import withAuth from "../../interceptors/auth";

import Layout from "../../components/Layout/Layout";

export async function getStaticProps({ locale }) {
  const response = await import(`../../lang/${locale}.json`);
  return {
    props: {
      profile: response.default.profile,
      navbar: response.default.navbar,
      layout: response.default.layout,
      leftbar: response.default.leftbar,
    },
  };
}

const Profile = (props) => {
  const { profile , layout, navbar, leftbar } = props;
  return (
    <>
      <Layout layout={layout} navbar={navbar} leftbar={leftbar}>
        <div className="interface">
          <ProfileSettings profile={profile}/>
        </div>
      </Layout>

      <style jsx>
        {`
          .interface {
            background-color: #2C62FE;
 
          }

          @media (max-width: 375px) {
            .interface {
              width: 375px;
            }
          }
        `}
      </style>
    </>
  );
};

export default withAuth(Profile);
