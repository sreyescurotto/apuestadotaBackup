import React from "react";
import { ProgressBar } from "react-loader-spinner";

const Spinner = () => {
  return (
    <>
      <div className="spinner-container slide-out-fwd-center">
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#2c62fe"
          barColor="#b6ff40"
        />
      </div>
      <style jsx>{`
      .slide-out-fwd-center {
	-webkit-animation: slide-out-fwd-center 4.8s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: slide-out-fwd-center 4.8s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}
@-webkit-keyframes slide-out-fwd-center {
  0% {
    -webkit-transform: translateZ(1);
            transform: translateZ(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateZ(600px);
            transform: translateZ(600px);
    opacity: 0;
  }
}
@keyframes slide-out-fwd-center {
  0% {
    -webkit-transform: translateZ(1);
            transform: translateZ(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateZ(600px);
            transform: translateZ(600px);
    opacity: 0;
  }
}


      .spinner-container {
        position: absolute;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;

      }`}</style>
    </>
  );
};

export default Spinner;
