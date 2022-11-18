import React from "react";
import { useState, useEffect } from "react";
import AppService from "../../services/app.service";
import dayjs from "dayjs";
import ApuestasAll from "../Apuestas/ApuestasAll";
import Referrals from "../RefCont";
import ProfileForm from "../ProfileForm";
import Account from "../Account";
import DepReq from "../DepReq";

const ProfileSettings = (props) => {

  const profileProps = props.profile;
  const [record, setRecord] = useState(false);
  const [security, setSecurity] = useState(false);
  const [profile, setProfile] = useState(true);
  const [extra, setExtra] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [accountTrans, setaccountTrans] = useState(false);

  const [userProfile, setUserProfile] = useState('/spinner.gif');

  const handleClickSecurity = (event) => {
    setSecurity(true);
    setProfile(false);
    setRecord(false);
    setExtra(false);
    setaccountTrans(false);
  };

  const handleClickRecord = (event) => {
    setSecurity(false);
    setProfile(false);
    setRecord(true);
    setExtra(false);
    setaccountTrans(false);

  };

  const handleClickProfile = (event) => {
    setProfile(true);
    setSecurity(false);
    setRecord(false);
    setExtra(false);
    setaccountTrans(false);
  };

  const handleClickExtra = (event) => {
    setProfile(false);
    setSecurity(false);
    setRecord(false);
    setExtra(true);
    setaccountTrans(false);
  };

  const handleClickAccountTrans = (event) => {
    setProfile(false);
    setSecurity(false);
    setRecord(false);
    setExtra(false);
    setaccountTrans(true);
  };
  const updateUser = (data) => {
    let _user = { ...user, ...data };
    setUser(_user);
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    let s = new AppService();
    s.makeGet("profile", {}, true).then((resp) => {
      let _user = resp.data;
      _user.date_time_created = dayjs(_user.steam_time_created * 1000).format(
        "DD/MM/YYYY"
      );
      _user.ref_code = _user.ref_code || "";
      setUser(_user);
      setUserProfile(_user.foto);
      setSaldo(_user.saldo);
    });
  }, []);

  return (
    <>
      <div className="profile-container">
        <div className="profile-intro-i">
          <div className="profile-intro-img">
            <img src={userProfile} alt="new user" />

            <div className="verified-container">
              {user != undefined && user.dni_status == 2 && (
                <img src="/social/check-b.png" alt="verified" />
              )}
            </div>
          </div>
          <h3>{user.nickname}</h3>
        </div>
      </div>
      <div className="profile-main">
        <nav className="tabs-container">
          <a href="#" onClick={handleClickProfile}>
            <div
              className={
                profile
                  ? "tabs-container-item tab-active"
                  : "tabs-container-item"
              }
              id="info-button-g"
            >
              <img src="/icons/account-details-outline.png" alt={profileProps.personalinfo} />
              <h3 className="tab-h-active">{profileProps.personalinfo}</h3>
            </div>
          </a>
          <a href="#" onClick={handleClickRecord}>
            <div
              className={
                record
                  ? "tabs-container-item tab-active"
                  : "tabs-container-item"
              }
            >
              <img src="/icons/cash-multiple.png" alt="Record" />
              <h3>{profileProps.withdrawal}</h3>
            </div>
          </a>
          <a href="#" onClick={handleClickAccountTrans}>
            <div
              className={
                accountTrans
                  ? "tabs-container-item tab-active"
                  : "tabs-container-item"
              }
              id="info-security-g"
            >
              <img src="/icons/badge-account.png" alt={profileProps.account} />
              <h3>{profileProps.account}</h3>
            </div>
          </a>
          <a href="#" onClick={handleClickExtra}>
            <div
              className={
                extra ? "tabs-container-item tab-active" : "tabs-container-item"
              }
            >
              <img src="/icons/trophy-outline.png" alt={profileProps.bets} />
              <h3>{profileProps.bets}</h3>
            </div>
          </a>

          <a href="#" onClick={handleClickSecurity}>
            <div
              className={
                security
                  ? "tabs-container-item tab-active"
                  : "tabs-container-item"
              }
              id="info-security-g"
            >
              <img src="/icons/security.png" alt={profileProps.referrals} />
              <h3>{profileProps.referrals}</h3>
            </div>
          </a>
        </nav>
        <div id="profile-info-g" className={profile ? "d-block" : "d-none"}>
          <div className="security-flex-b">
            {user.dni_status == 0 || user.dni_status == 3 ? (
              <div className="gc-profile-box">
                <h4 className="gc-profile-title">
                  {profileProps.hello} <span>{user.nickname}</span>
                  {profileProps.completeinfo}
                </h4>
                <ProfileForm onSubmit={updateUser}  profileProps={profileProps}/>
              </div>
            ) : (
              <div className="background-gradient-1 flex-basis">
                <h4 className="gc-profile-title">{profileProps.general}</h4>
                <ul className="gc-profile-list">
                  <li className="gc-profile-list-item">
                    <h6 className="gc-list-title">{profileProps.username}</h6>
                    <div className="gc-list-text">
                      <p className="gc-list-text">{user.nickname} </p>
                    </div>
                  </li>
                  <li className="gc-profile-list-item">
                    <h6 className="gc-list-title">{profileProps.name}</h6>
                    <div className="gc-list-text">
                      <p className="gc-list-text">{user.nombre} </p>
                    </div>
                  </li>

                  <li className="gc-profile-list-item">
                    <h6 className="gc-list-title">{profileProps.lastname}</h6>
                    <div className="gc-list-text">
                      <p className="gc-list-text">{user.apellido} </p>
                    </div>
                  </li>
                  <li className="gc-profile-list-item">
                    <h6 className="gc-list-title">{profileProps.email}</h6>
                    <div className="gc-list-text">
                      <p className="gc-list-text">{user.email} </p>
                    </div>
                  </li>

                  <li className="gc-profile-list-item">
                    <h6 className="gc-list-title">{profileProps.id}</h6>

                    <div className="gc-list-text">
                      <p className="gc-list-text">{user.dni} </p>
                    </div>
                  </li>

                  <li className="gc-profile-list-item">
                    <h6 className="gc-list-title">{profileProps.verify}</h6>

                    <div className="gc-list-text">
                      <p className="gc-list-text">
                        {user.dni_status == 0
                          ? 
                          profileProps.notVerify
                          : user.dni_status == 1
                          ? profileProps.verify1
                          : user.dni_status == 2
                          ? profileProps.verified
                          : profileProps.verify2}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            <div className="background-gradient-1 flex-basis">
              <h4 className="gc-profile-title">{profileProps.extra}</h4>

              <ul className="gc-profile-list">
                <li className="gc-profile-list-item">
                  <h6 className="gc-list-title">{profileProps.registrationdate}</h6>

                  <p className="gc-list-text">{user.date_time_created}</p>
                </li>

                <li className="gc-profile-list-item">
                  <h6 className="gc-list-title">{profileProps.steamid}</h6>

                  <p className="gc-list-text">{user.steamid}</p>
                </li>

                <li className="gc-profile-list-item">
                  <h6 className="gc-list-title">{profileProps.steamid64}</h6>

                  <p className="gc-list-text blue">{user.steamid64}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={record ? "d-block" : "d-none"}>
          <div className="mode-bets-a">
              <h3 className="solo--title">{profileProps.withDes}</h3>
          <DepReq profile={profileProps} />
          </div>
        </div>

        <div className={accountTrans ? "d-block" : "d-none"}>
          <div className="mode-bets-a">
              <h3 className="solo--title">Estado de cuenta</h3>
          <Account profile={profileProps}/>
          </div>
        </div>

        <div className={extra ? "d-block" : "d-none"}>
          <div className="mode-bets-a">
              <h3 className="solo--title">{profileProps.betsmade}</h3>
              <ApuestasAll profile={profileProps}/>
          </div>
        </div>

        <div className={security ? "d-block" : "d-none"}>
          <Referrals user={user} profile={profileProps}/>
        </div>
      </div>

      <style jsx>
        {`
           {
            /* Verificado */
          }

          .verified-container {
            position: absolute;

            bottom: 0;

            right: 0;
          }

          .security-flex-b {
            display: flex;

            padding: 1.5rem 3rem;
          }

         

          .flex-basis {
            flex-basis: 50%;
          }

          .gc-profile-title {
            margin-bottom: 20px;

            font-size: 20px;

            font-weight: 300;

            color: #fff;
          }

          .gc-profile-title span {
            font-weight: 600;
          }

          .gc-profile-list-item {
            display: flex;

            flex-flow: row-reverse nowrap;

            align-items: center;

            justify-content: space-between;

            min-height: 48px;

            margin: 0;

            padding: 8px 16px;

            list-style: none;

            color: #fff;

            background-color: rgba(0, 0, 0, 0.05);

            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          .gc-list:not(:first-child) {
            margin-top: 20px;
          }

          .gc-list-item:first-child {
            border-radius: 8px 8px 0 0;
          }

          .gc-list-title {
            margin: 0;

            margin-bottom: 4px;

            font-size: var(--text);

            font-weight: 600;

            letter-spacing: 1px;

            opacity: 0.75;

            color: #fff;


          }

          .gc-list-text {
            margin: 0;

            padding-right: 8px;

            font-size: var(--text);

            font-weight: 400;


          }

          .gc-list-text input {
            width: 100%;

            height: 100%;

            background-color: transparent;

            border: none;

            color: #fff;

            font-size: var(--text);

            font-weight: 600;
          }

          .record-dflex {
            width: 100%;

            height: 500px;

            display: flex;

            justify-content: center;

            align-items: center;
          }

          .d-none {
            display: none;
          }

          .d-block {
            display: block;
          }

          .profile-container {
            display: flex;

            justify-content: space-between;

            padding: 2rem 4rem;

            align-items: center;
          }

          .profile-intro-img {
            position: relative;

            width: 150px;

            height: 150px;

            border-radius: 50%;
          }

          .profile-intro-i {
            display: flex;

            flex-direction: column;

            justify-content: center;

            align-items: center;

            gap: 5px;
          }

          .profile-intro-i img {
            width: 100%;

            height: 100%;

            border-radius: 50%;

            object-fit: cover;
          }

          .profile-intro-i h3 {
            color: #fff;

            text-transform: none;

            font-size: 15px;

            margin-top: 10px;
          }

          .profile-green-q {
            background-color: transparent;

            padding: 0.5rem 1rem;

            border: 2px solid #b6ff40;
          }

          .profile-green-q h4 {
            color: #b6ff40;

            font-family: "Poppins", sans-serif;

            font-weight: 500;
          }

          .bold-d {
            font-weight: 900;
          }

          .tabs-container {
            display: flex;

            flex-wrap: wrap;

            list-style: none;

            border-bottom: 2px solid #fff;

            justify-content: space-around;
          }

          .tabs-container-item {
            display: flex;

            gap: 15px;

            padding: 1rem 1.5rem;
          }

          .tabs-container-item h3 {
            font-size: 16px;
          }

          .tab-active {
            border-bottom: 5px solid #fff;
          }

          .profile-sub-title {
            padding: 1.5rem 4rem 1.5rem;

            color: #fff;

            font-family: "Poppins", sans-serif;

            font-size: 25px;
          }

          .profile-info-grid {
            display: grid;

            grid-template-columns: repeat(2, 1fr);

            grid-template-rows: repeat(5, 1fr);

            position: relative;
          }

          .profile-info-item {
            padding: 0.6rem 4rem;
          }

          .profile-info-item label {
            margin-bottom: 0;

            padding: 0 5px;

            height: auto;

            min-height: 20px;

            color: #313c60;

            font-size: 16px;

            position: relative;

            top: 0;

            left: 0;

            background-color: transparent;

            z-index: 1;

            font-family: "Roboto Mono", monospace;
          }

          .profile-info-output {
            color: #fff;

            background-color: #191e2e;

            border-width: 2px;

            border-color: #313c60;

            width: 100%;

            display: block;

            height: 56px;

            padding: 0.375rem 0.75rem;

            font-weight: 400;

            line-height: 1.5;

            color: #495057;

            background-clip: padding-box;

            border-radius: 0.25rem;

            font-size: 20px;
          }

          .profile-info-submit {
            position: relative;

            left: 50%;

            margin-top: 20px;

            background-color: transparent;

            border: 2px solid #313c60;

            color: #313c60;

            display: flex;

            align-items: center;

            justify-content: center;

            gap: 10px;

            font-family: "Roboto Mono", monospace;

            font-size: 16px;
          }

          .profile-info-submit:hover {
            background-color: #313c60;

            color: rgb(0, 0, 0);
          }

          .profile-info-output:focus {
            border-width: 5px;
          }

          .profile-register-button {
            padding: 1rem 2rem;

            border-radius: 8px;

            float: right;

            margin-top: 1rem;

            font-size: 16px;
          }

          .mode--solo--c {
            padding: 1rem 2rem;
          }

          .history-flex-c {
            display: flex;

            justify-content: center;

            flex-direction: column;
          }

          .history-flex-c h4 {
            margin-top: 20px;

            text-align: center;
          }

          table {
            border: 1px solid transparent;

            background-image: linear-gradient(
              to bottom,
              #161629 32px,
              rgba(22, 22, 41, 0)
            );

            border-image: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.1),
                rgba(255, 255, 255, 0)
              )
              1;
          }

          .desktop-table {
            padding: 20px;

            margin: 1rem 2rem;
          }

          th {
            color: #fff;

            opacity: 0.48;
          }

          td {
            color: #fff;

            text-align: center;

            padding: 10px 20px;
          }

          th,
          td {
            font-family: "Roboto Mono", monospace;
          }

           {
            /* MOBILE TABLE */
          }

          .mobile-table {
            max-width: 500px;

            display: none;

            opacity: 0;
          }

       

           {
            /* MEDIA QUERYS */
          }

          @media (max-width: 480px) {
            .mode--solo--c {
              overflow-x: auto;

              width: 480px;
            }

            .history-flow-c {
              overflow-x: auto;

              width: 480px;

              padding: 1rem 2rem;
            }

            .profile-container {
              padding: 1rem 0.5rem;

              width: 90%;

              justify-content: space-around;
            }

            .profile-intro-i {
              gap: 0px;
            }

            .profile-intro-img {
              width: 100px;

              height: 100px;
            }

            .profile-intro-i h3 {
              margin-top: 7px;

              font-size: 13px;
            }

            .profile-green-q {
              padding: 0.25rem 0.5rem;
            }

            .profile-green-q h4 {
              font-size: 10px;
            }

            .tabs-container a {
              flex-basis: 40%;
            }

            .tabs-container-item h3 {
              font-size: 12px;
            }

            .tabs-container-item img {
              display: none;
            }

            .profile-sub-title {
              padding: 1rem 2rem 1rem;

              font-size: 18px;
            }

            .gc-profile-list-item {
              flex-flow: column nowrap;

              align-items: flex-start;

              justify-content: flex-start;
            }

            .gc-record-not-found {
              color: white;

              font-family: "Roboto Mono";

              padding: 20px 0;

              text-align: center;
            }

             {
              /* NEW SECURITY */
            }

            .security-flex-b {
              padding: 1rem 1rem;

              flex-direction: column;
            }

            .gc-profile-title {
              font-size: 15px;
            }

            .mobile-table {
              display: block;

              opacity: 1;
            }

            .desktop-table {
              display: none;
            }
          }

          @media screen and (max-width: 415px) {
            .mode--solo--c {
              width: 415px;
            }
          }

          @media screen and (max-width: 390px) {
            .mode--solo--c {
              width: 390px;
            }
          }
        `}
      </style>
    </>
  );
};

export default ProfileSettings;
