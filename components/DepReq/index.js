import React, { useState, useEffect } from 'react';
import AppService from "../../services/app.service";
import dayjs from "dayjs";

const DepReq = (props) => {
    const profileProps = props.profile;
    const [transacciones, setTransacciones] = useState([]);

    useEffect(() => {
        let s = new AppService();
        s.makeGet("retiros", {}, true).then((res) => {
          setTransacciones(
            res.data.map((i) => {
              i.created_at = dayjs(i.created_at).format("DD/MM/YYYY hh:mm a");
    
              return i;
            })
          );
        });
    }, []);

    return (
     
        <div className="history-flex-c">
            <h4 className="gc-profile-title">
              {profileProps.withDes}
            </h4>

            {/* TABLA EN DESKTOP */}

            <table className="desktop-table">
              <thead>
                <tr>
                  <th>{profileProps.date}</th>

                  <th>{profileProps.amount}</th>

                  <th>{profileProps.status}</th>

                  <th>{profileProps.method}</th>
                </tr>
              </thead>

              {
                <tbody>
                  {transacciones.length < 1 && (
                    <tr>
                      <td colpan="5" className="gc-record-not-found">
                        {profileProps.notwith}
                      </td>
                    </tr>
                  )}

                  {transacciones.length > 0 &&
                    transacciones.map((t) => {
                      return (
                        <tr key={`trans_${t.id}`}>
                          <td>{t.created_at}</td>

                          <td>{t.monto}</td>

                          <td>{t.estado == 1 ? profileProps.completed : profileProps.pending}</td>

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
                  <th>{profileProps.date}</th>

                  <th>{profileProps.amount}</th>

                  <th>{profileProps.status}</th>
                </tr>
              </thead>

              {
                <tbody>
                  {transacciones.length < 1 && (
                    <tr>
                      <td colpan="5" className="gc-record-not-found">
                        {profileProps.notwith}
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
                              {t.estado == 1 ? profileProps.completed : profileProps.pending}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              }
            </table>

            <style jsx>
        {`
        .gc-profile-title {
            margin-top: 2rem;
            text-align: center;
            text-shadow: 3px 3px 3px #000;
        }
          .desktop-table {
            padding: 20px;

            margin-top: 20px;

            width: 100%;
          }

          table {
            border: 1px solid transparent;

            border-radius: 8px;

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

          th {
            color: #fff;

            opacity: 0.48;
          }

          td {
            color: #fff;

            text-align: center;

            padding: 10px 20px;
          }

          .lastCol {
            padding: 10px !important;
          }

          th,
          td {
            font-family: "Roboto Mono", monospace;
          }

          .hero_img {
            width: 70px;

            height: 50px;

            border-radius: 8px;
          }

          .d-match {
            display: flex;

            flex-direction: row;
          }

          .d-match-body {
            text-align: left;

            padding-left: 10px;
          }

          .d-match-body h5 {
            font-weight: bold;

            margin-bottom: 5px;
          }

          .d-match-body div {
            font-size: 12px;
          }

          .date-td {
            font-size: 14px;
          }

          .green {
            color: #00ff00;

            font-size: 14px;
          }

          .red {
            color: #ff0000;

            font-size: 14px;
          }
          .mobile-table {
            max-width: 500px;

            display: none;

            opacity: 0;
          }

          @media only screen and (max-width: 485px) {
            th {
              font-size: 10px;
            }

            td {
              font-size: 12px;
            }
            .mobile-table {
              display: block;

              opacity: 1;
            }

            .desktop-table {
              display: none;
            }
          }
        `}
      </style>
          </div>
    
    );
}

export default DepReq;
