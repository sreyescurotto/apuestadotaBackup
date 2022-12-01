import React from 'react';
import Layout from '../../components/Layout/Layout';
import Solo from '../../components/Solo';


export async function getStaticProps({ locale }) {
  const response = await import(`../../lang/${locale}.json`);
  return {
    props: {
      play: response.default.play,
      navbar: response.default.navbar,
      layout: response.default.layout,
      leftbar: response.default.leftbar,
      profile: response.default.profile,
      home: response.default.home
    },
  };
}

const Normal = (props) => {
  const { play , layout, navbar, leftbar, profile, home } = props;
    return (
        <>
            <Layout layout={layout} navbar={navbar} leftbar={leftbar}>
                <div className='interface'>
                    <Solo  play={play} profile={profile} home={home}/>
                </div>
            </Layout>
            <style jsx>
        {`
          .interface {

            background-color: #2c62fe7a;
          }
        `}
      </style>
        </>
    );
}

export default Normal;
