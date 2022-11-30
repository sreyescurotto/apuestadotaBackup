import React, { useEffect, useRef, useState } from "react";

import ReferidosAll from "../Referidos";

export default function Referrals({ user, ...props }) {

  const profile = props.profile 

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
          <h4 className="solo--title">
           {profile.refTitle}
          </h4>

          <div className="referrals-section">
            <div className="referrals-section-c">
              <div className="referrals-step step-01">
                <div className="referrals-step-number">1</div>

                <p>{profile.refSubtitle}</p>
              </div>

              <div className="referrals-step step-02">
                <div className="referrals-step-number">2</div>

                <p>
                  {profile.refSubtitle2} <span className="white-span">{profile.each}</span>
                </p>
              </div>
            </div>

            <div className="referrals-code-sec">
              <p className="referrals-code-p">{profile.refSubtitle3}</p>

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

          font-size: 25px;

          text-align: center;
        }

        .referrals-section {
          display: flex;

          max-width: 1000px;

          margin: 0 auto;
        }
        .referrals-section-c {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .referrals-step {
          display: flex;

          gap: 20px;

          align-items: center;
        }

        .referrals-step-number {
          border: 3px solid var(--black);

          background-color: var(--verde);

          border-radius: 12px;

          padding: 0.5rem 0.7rem;

          font-size: 20px;

          cursor: none;
        }

        .referrals-step h4 {
          color: #fff;

          font-size: 20px;

          cursor: none;
        }

        .step-02 p {
          color: rgba(255, 255, 255, 1);
        }

        .white-span {
          color: #fff;
          font-weight: 600;
        }

        .referrals-code-sec {
          width: 500px;

          margin-left: 20px;
        }

        .referrals-code-p {
          margin-bottom: 16px;
        }

        .copy-success {
          position: absolute;

          margin-top: 10px;
        }

        .referral-code-c {
          background-color: var(--verde);

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

          font-size: var(--text);
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
            margin-top: 2rem;
          }
          .referrals-code-p {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
