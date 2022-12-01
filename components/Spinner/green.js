import React from 'react';
import { InfinitySpin  } from "react-loader-spinner";

const Green = () => {
    return (
        <div className='spinner-container-green'>
            <InfinitySpin 
            width='200'
            color="#b6ff40"
            />
            <style jsx>{`
                .spinner-container-green {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }
            `}</style>
      </div>
    );
}

export default Green;
