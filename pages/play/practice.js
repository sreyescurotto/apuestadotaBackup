import React from 'react';
import Layout from '../../components/Layout/Layout';
import ModePractice from '../../components/Practice';


export async function getStaticProps({ locale }) {
  const response = await import(`../../lang/${locale}.json`);
  return {
    props: {
      play: response.default.play,
      navbar: response.default.navbar,
      layout: response.default.layout,
      leftbar: response.default.leftbar,
      profile: response.default.profile
    },
  };
}
const Practice = (props) => {
    const { play , layout, navbar, leftbar, profile } = props;
    return (
        <>
            <Layout layout={layout} navbar={navbar} leftbar={leftbar}>
                <div className='interface'>
                    <ModePractice play={play} profile={profile}/>
                </div>
            </Layout>
            <style jsx>
            {`
            .interface {
                background-image: linear-gradient(180deg, rgba(247,108,27,1) 0%, rgba(251,99,11,1) 24%, rgba(238,88,0,1) 42%, rgba(221,82,0,1) 56%, rgba(198,73,0,1) 66%, rgba(189,70,0,1) 75%, rgba(172,63,0,1) 81%, rgba(164,61,0,1) 87%, rgba(148,54,0,1) 92%, rgba(139,51,0,1) 100%);
            }
            `}
        </style>
      </>
    );
}

export default Practice;
