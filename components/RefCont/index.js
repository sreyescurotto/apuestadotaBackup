import React, { useEffect, useRef, useState } from "react";

import ReferidosAll from "../Referidos";

export default function Referrals({ user, ...props }) {
  const [copySuccess, setCopySuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const textRef = useRef(null);

  const copyToClippboard = (e) => {
    textRef.current.select();

    document.execCommand("copy");

    e.target.focus();

    setCopySuccess("Copiado!");
  };

  useEffect(() => {
    setLoading(user?.id > 0 ? false : true);
  }, [user]);

  return (
    <>
      {loading && "cargando"}

      {!loading && (
        <>
          <h4 className="profile-sub-title">
            Recomienda ApuestaDota a un amigo y gana dinero extra.
          </h4>

          <div className="referrals-section">
            <div className="referrals-section-c">
              <div className="referrals-step step-01">
                <div className="referrals-step-number">1</div>

                <h4>Invita a tus amigos a unirse a ApuestaDota</h4>
              </div>

              <div className="referrals-step step-02">
                <div className="referrals-step-number">2</div>

                <p>
                  Cuando tu amigo utilice tu código deberá realizar su primera
                  apuesta. Después de completar con los requisitos, tu recibirás
                  1 USD <span>por cada referido!</span>
                </p>
              </div>
            </div>

            <div className="referrals-code-sec">
              <p className="referrals-code-p">Tú código de referido es:</p>

              <div className="referral-code-c">
                <img
                  src="/icons/content-copy.png"
                  alt="clipboard"
                  onClick={copyToClippboard}
                />

                <input
                  className="input-referral"
                  ref={textRef}
                  value={user.ref_code || ""}
                  readOnly
                />
              </div>

              <p className="copy-success"> {copySuccess}</p>
            </div>
          </div>

          <br />

          <br />

          <div className="d-block">
            <ReferidosAll />
          </div>
        </>
      )}

      <style jsx>{`
        .profile-sub-title {
          padding: 1.5rem 4rem 1.5rem;

          color: #fff;

          font-family: "Poppins", sans-serif;

          font-size: 25px;

          text-align: center;
        }

        .referrals-section {
          display: flex;

          max-width: 1000px;

          margin: 0 auto;
        }

        .referrals-step {
          display: flex;

          gap: 20px;

          align-items: center;
        }

        .referrals-step-number {
          border: 3px solid #000;

          background-color: #b6ff40;

          border-radius: 12px;

          padding: 0.5rem 0.7rem;

          font-size: 20px;

          cursor: none;
        }

        .referrals-step h4 {
          color: #fff;

          font-family: "Poppins", sans-serif;

          font-size: 20px;

          cursor: none;
        }

        .step-02 p {
          color: rgba(255, 255, 255, 0.7);

          font-family: "Roboto Mono", monospace;
        }

        .step-02 p span {
          color: #fff;
        }

        .referrals-code-sec {
          width: 500px;

          margin-left: 20px;
        }

        .referrals-code-p {
          margin-bottom: 16px;
        }

        .referrals-code-sec p {
          font-family: "Roboto Mono", monospace;
        }

        .copy-success {
          position: absolute;

          margin-top: 10px;
        }

        .referral-code-c {
          background-color: #b6ff40;

          display: flex;

          align-items: center;

          width: 200px;

          justify-content: center;

          position: relative;

          padding: 1.2rem;

          border-radius: 8px;
        }

        .referral-code-c img {
          position: absolute;

          right: 0;

          margin: 5px;

          top: 0;
        }

        .input-referral {
          background: transparent;

          border: none;

          width: 100%;

          text-align: center;
        }

        .input-referral:focus {
          outline: none !important;
        }

        @media (max-width: 485px) {
          .profile-sub-title {
            font-size: 18px;
          }

          .referrals-section {
            flex-direction: column;

            padding: 0 0.6rem;
          }

          .referrals-step-number {
            font-size: 14px;
          }

          .referrals-step h4 {
            font-size: 16px;
          }

          .referrals-step p {
            font-size: 14px;
          }

          .referrals-code-sec {
            width: 340px;
          }
        }
      `}</style>
    </>
  );
}
