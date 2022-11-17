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
            background-image: linear-gradient(180deg, rgba(101,35,255,1) 0%, rgba(101,35,252,1) 24%, rgba(101,8,255,1) 42%, rgba(101,0,232,1) 56%, rgba(101,1,212,1) 66%, rgba(101,3,201,1) 75%, rgba(101,2,182,1) 81%, rgba(101,2,162,1) 87%, rgba(101,1,144,1) 92%, rgba(101,1,133,1) 100%);
 
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
