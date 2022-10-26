import React from "react";
import { useState, useEffect } from "react";
import AppService from "../../services/app.service";
import dayjs from "dayjs";
import ApuestasAll from "../Apuestas/ApuestasAll";
import Referrals from "../RefCont";
import ProfileForm from "../ProfileForm";
import Account from "../Account";

const ProfileSettings = () => {
  const [record, setRecord] = useState(false);
  const [security, setSecurity] = useState(false);
  const [profile, setProfile] = useState(true);
  const [extra, setExtra] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [accountTrans, setaccountTrans] = useState(false);
  const [transacciones, setTransacciones] = useState([]);

  const [userProfile, setUserProfile] = useState('spinner.gif');

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

    let s = new AppService();
    s.makeGet("retiros", {}, true).then((res) => {
      setTransacciones(
        res.data.map((i) => {
          i.created_at = dayjs(i.created_at).format("DD/MM/YYYY hh:mm a");

          return i;
        })
      );
    });
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
              <img src="/icons/account-details-outline.png" alt="Informacion" />
              <h3 className="tab-h-active">Informacion Personal</h3>
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
              <h3>Historial de retiros</h3>
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
              <img src="/icons/badge-account.png" alt="Seguridad" />
              <h3>Estado de cuenta</h3>
            </div>
          </a>
          <a href="#" onClick={handleClickExtra}>
            <div
              className={
                extra ? "tabs-container-item tab-active" : "tabs-container-item"
              }
            >
              <img src="/icons/trophy-outline.png" alt="Torneos" />
              <h3>Apuestas totales</h3>
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
              <img src="/icons/security.png" alt="Seguridad" />
              <h3>Referidos</h3>
            </div>
          </a>
        </nav>
        <div id="profile-info-g" className={profile ? "d-block" : "d-none"}>
          <div className="security-flex-b">
            {user.dni_status == 0 || user.dni_status == 3 ? (
              <div className="gc-profile-box">
                <h4 className="gc-profile-title">
                  Hola <span>{user.nickname}</span>, completa tu informacion
                </h4>
                <ProfileForm onSubmit={updateUser} />
              </div>
            ) : (
              <div className="gc-profile-box">
                <h4 className="gc-profile-title">General</h4>
                <ul className="gc-profile-list">
                  <li className="gc-profile-list-item">
                    <h6 className="gc-list-title">Nombre de usuario</h6>
                    <div className="gc-list-text">
                      <p className="gc-list-text">{user.nickname} </p>
                    </div>
                  </li>
                  <li className="gc-profile-list-item">
                    <h6 className="gc-list-title">Nombre</h6>
                    <div className="gc-list-text">
                      <p className="gc-list-text">{user.nombre} </p>
                    </div>
                  </li>

                  <li className="gc-profile-list-item">
                    <h6 className="gc-list-title">Apellido</h6>
                    <div className="gc-list-text">
                      <p className="gc-list-text">{user.apellido} </p>
                    </div>
                  </li>
                  <li className="gc-profile-list-item">
                    <h6 className="gc-list-title">Email</h6>
                    <div className="gc-list-text">
                      <p className="gc-list-text">{user.email} </p>
                    </div>
                  </li>

                  <li className="gc-profile-list-item">
                    <h6 className="gc-list-title">Documento de identidad</h6>

                    <div className="gc-list-text">
                      <p className="gc-list-text">{user.dni} </p>
                    </div>
                  </li>

                  <li className="gc-profile-list-item">
                    <h6 className="gc-list-title">Proceso de verificacin</h6>

                    <div className="gc-list-text">
                      <p className="gc-list-text">
                        {user.dni_status == 0
                          ? "No verificado"
                          : user.dni_status == 1
                          ? "Por verificar"
                          : user.dni_status == 2
                          ? "Verificado"
                          : "Fallo la verificación"}{" "}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            <div className="gc-profile-box">
              <h4 className="gc-profile-title">Extra</h4>

              <ul className="gc-profile-list">
                <li className="gc-profile-list-item">
                  <h6 className="gc-list-title">Fecha de registro</h6>

                  <p className="gc-list-text">{user.date_time_created}</p>
                </li>

                <li className="gc-profile-list-item">
                  <h6 className="gc-list-title">Steam ID</h6>

                  <p className="gc-list-text">{user.steamid}</p>
                </li>

                <li className="gc-profile-list-item">
                  <h6 className="gc-list-title">Steam ID 64</h6>

                  <p className="gc-list-text blue">{user.steamid64}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={record ? "d-block" : "d-none"}>
          <div className="history-flex-c">
            <h4 className="gc-profile-title">
              Solicitud para la retirada de fondos
            </h4>

            {/* TABLA EN DESKTOP */}

            <table className="desktop-table">
              <thead>
                <tr>
                  <th>Fecha</th>

                  <th>Importe</th>

                  <th>Estado</th>

                  <th>Medio</th>
                </tr>
              </thead>

              {
                <tbody>
                  {transacciones.length < 1 && (
                    <tr>
                      <td colpan="5" className="gc-record-not-found">
                        No has realizado solicitudes de retiro
                      </td>
                    </tr>
                  )}

                  {transacciones.length > 0 &&
                    transacciones.map((t) => {
                      return (
                        <tr key={`trans_${t.id}`}>
                          <td>{t.created_at}</td>

                          <td>{t.monto}</td>

                          <td>{t.estado == 1 ? "Completado" : "Pendiente"}</td>

                          <td>{t.metodo}</td>
                        </tr>
                      );
                    })}
                </tbody>
              }
            </table>

            {/* TABLA EN MOBILE */}

            <table className="mobile-table">
              <thead>
                <tr>
                  <th>Fecha</th>

                  <th>Importe</th>

                  <th>Estado</th>
                </tr>
              </thead>

              {
                <tbody>
                  {transacciones.length < 1 && (
                    <tr>
                      <td colpan="5" className="gc-record-not-found">
                        No has realizado solicitudes de retiro
                      </td>
                    </tr>
                  )}

                  {transacciones.length > 0 &&
                    transacciones.map((t) => {
                      return (
                        <tr key={`trans_${t.id}`}>
                          <td className="mobile-table-td">
                            <span>
                              {t.created_at} <br />
                            </span>

                            <span>{t.metodo}</span>
                          </td>

                          <td className="mobile-table-td">
                            <span>
                              {t.monto} <br />
                            </span>

                            <span>__</span>
                          </td>

                          <td className="mobile-table-td">
                            <span className="gc-green-text">
                              {t.estado == 1 ? "Completado" : "Pendiente"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              }
            </table>
          </div>
        </div>

        <div className={accountTrans ? "d-block" : "d-none"}>
          <Account />
        </div>

        <div className={extra ? "d-block" : "d-none"}>
          <div className="mode--solo--c">
            <div className="solo--title">
              <h3>Apuestas realizadas</h3>
            </div>

            <div className="solo--content">
              <ApuestasAll />
            </div>
          </div>
        </div>

        <div className={security ? "d-block" : "d-none"}>
          <Referrals user={user} />
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

          .gc-profile-box {
            padding: 24px;

            margin: 8px;

            background-image: linear-gradient(
              to bottom,
              #161629 32px,
              rgba(22, 22, 41, 0)
            );

            border: 1px solid transparent;

            border-bottom-width: 0;

            border-image: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.1),
                rgba(255, 255, 255, 0)
              )
              1;

            flex-basis: 50%;
          }

          .gc-profile-title {
            margin-bottom: 20px;

            font-size: 20px;

            font-weight: 300;

            font-family: "Poppins", sans-serif;

            text-transform: uppercase;

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

            font-family: "Poppins", sans-serif;

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

            font-size: 10px;

            font-weight: 400;

            text-transform: uppercase;

            letter-spacing: 1px;

            opacity: 0.25;

            color: #fff;

            font-family: "Roboto Mono", monospace;
          }

          .gc-list-text {
            margin: 0;

            padding-right: 8px;

            font-size: 12px;

            font-weight: 400;

            font-family: "Poppins", sans-serif;
          }

          .gc-list-text input {
            width: 100%;

            height: 100%;

            background-color: transparent;

            border: none;

            color: #fff;

            font-family: "Roboto Mono", monospace;

            font-size: 12px;

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

            border-bottom: 2px solid #23272f;

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
            border-bottom: 5px solid #2c62fe;
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
