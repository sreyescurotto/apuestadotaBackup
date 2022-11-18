import React, { useState, useEffect } from "react";
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
      <h4 className="gc-profile-title"></h4>

      {/* TABLA EN DESKTOP */}

      <table className="desktop-table background-gradient-1">
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

                    <td>
                      {t.estado == 1
                        ? profileProps.completed
                        : profileProps.pending}
                    </td>

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
                        {t.estado == 1
                          ? profileProps.completed
                          : profileProps.pending}
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
          .mobile-table {
            display: none;
          }

          @media only screen and (max-width: 485px) {

            .desktop-table {
              display: none;
            }
            .mobile-table {
              display: block;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DepReq;
