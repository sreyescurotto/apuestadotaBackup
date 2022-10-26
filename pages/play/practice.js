import React from 'react';
import Layout from '../../components/Layout/Layout';
import ModePractice from '../../components/Practice';

const Practice = () => {
    return (
        <>
            <Layout>
                <div className='interface'>
                    <ModePractice />
                </div>
            </Layout>
            <style jsx>
            {`
            .interface {
                overflow: hidden;

                background-image: linear-gradient(
                0deg,
                hsl(236deg 24% 11%) 0%,

                hsl(233deg 24% 13%) 24%,

                hsl(231deg 23% 15%) 42%,

                hsl(229deg 23% 17%) 56%,

                hsl(228deg 23% 18%) 66%,

                hsl(226deg 23% 20%) 75%,

                hsl(224deg 23% 22%) 81%,

                hsl(223deg 23% 24%) 87%,

                hsl(221deg 24% 25%) 92%,

                hsl(220deg 24% 27%) 100%
                );
            }
            `}
        </style>
      </>
    );
}

export default Practice;
