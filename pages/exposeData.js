import React from "react";
import Layout from "../components/Layout/Layout";

export async function getStaticProps({ locale }) {
  const response = await import(`../lang/${locale}.json`);
  return {
    props: {
      navbar: response.default.navbar,
      layout: response.default.layout,
      leftbar: response.default.leftbar,
    },
  };
}

const ExposeData = (props) => {
  const { layout, navbar, leftbar } = props;
  return (
    <>
      <Layout layout={layout} navbar={navbar} leftbar={leftbar}>
          <div className="interface">
            <div id="video">
              <video muted autoPlay loop className="video-bf">
                <source src="/tutorial/tutorialvideo02.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </Layout>

      <style jsx>
        {`
          .mode-play {
            height: 100vh;

            overflow-y: hidden;
          }

          .interface {
            background-image: url("/heros/cristal.jpg");
          }

          .video-bf {
            width: 100%;
          }

          @media (max-width: 768px) {
            .mode-play {
              overflow-x: hidden;

              overflow-y: scroll;
            }
          }
        `}
      </style>
    </>
  );
};

export default ExposeData;
