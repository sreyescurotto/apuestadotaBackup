import { React } from 'react';



const Loading = (props) => {

    return (

        <>

            <div className="d-loading">

                <a>

                    <span></span>

                    <span></span>

                    <span></span>

                    <span></span>

                    { props.message }

                </a>

            </div>

            <style jsx>

                {`

                    .d-loading {

                        position: absolute;

                        top: 0;

                        left: 0;

                        background-color: rgba(0,0,0,.9);

                        width: 100%;

                        height: 100vh;

                        color: white;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        z-index: 3;

                    }



                    .d-loading a {

                        position: relative;

                        display: inline-block;

                        padding: 10px 20px;

                        color: #b727fe;

                        font-size: 16px;

                        text-decoration: none;

                        text-transform: uppercase;

                        overflow: hidden;

                        transition: .5s;

                        margin-top: 40px;

                        letter-spacing: 4px;

                    }



                    .d-loading a span {

                        position: absolute;

                        display: block;

                    }

                      

                    .d-loading a span:nth-child(1) {

                        top: 0;

                        left: -100%;

                        width: 100%;

                        height: 2px;

                        background: linear-gradient(90deg, transparent, #2c62fe);

                        animation: btn-anim1 1s linear infinite;

                    }

                      

                    @keyframes btn-anim1 {

                        0% {

                            left: -100%;

                        }

                        50%,100% {

                            left: 100%;

                        }

                    }

                      

                    .d-loading a span:nth-child(2) {

                        top: -100%;

                        right: 0;

                        width: 2px;

                        height: 100%;

                        background: linear-gradient(180deg, transparent, #2c62fe);

                        animation: btn-anim2 1s linear infinite;

                        animation-delay: .25s

                    }

                      

                    @keyframes btn-anim2 {

                        0% {

                          top: -100%;

                        }

                        50%,100% {

                          top: 100%;

                        }

                    }

                      

                    .d-loading a span:nth-child(3) {

                        bottom: 0;

                        right: -100%;

                        width: 100%;

                        height: 2px;

                        background: linear-gradient(270deg, transparent, #2c62fe);

                        animation: btn-anim3 1s linear infinite;

                        animation-delay: .5s

                    }

                      

                    @keyframes btn-anim3 {

                        0% {

                          right: -100%;

                        }

                        50%,100% {

                          right: 100%;

                        }

                    }

                      

                    .d-loading a span:nth-child(4) {

                        bottom: -100%;

                        left: 0;

                        width: 2px;

                        height: 100%;

                        background: linear-gradient(360deg, transparent, #03e9f4);

                        animation: btn-anim4 1s linear infinite;

                        animation-delay: .75s

                    }

                      

                    @keyframes btn-anim4 {

                        0% {

                          bottom: -100%;

                        }

                        50%,100% {

                          bottom: 100%;

                        }

                    }
                    `}
            </style>
        </>
    );
}



export default Loading;