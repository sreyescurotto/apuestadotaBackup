import dayjs from "dayjs";

import React, { useEffect, useState } from "react";

import AppService from "../../services/app.service";

const Account = () => {
  const [loading, setLoading] = useState(false);

  const [resumen, setResumen] = useState([]);

  const getConsumos = () => {
    setLoading(true);

    let s = new AppService();

    s.makeGet("balance/resumen", {}, true).then((res) => {
      setResumen(
        res.data.map((i) => {
          i.fecha = dayjs(i.fecha * 1000).format("DD/MM/YYYY hh:mm a");

          return i;
        })
      );

      setLoading(false);
    });
  };

  useEffect(() => {
    getConsumos();
  }, []);

  return (
    <>
      <div>
        <table className="desktop-table">
          <thead>
            <tr>
              <th>Fecha y hora </th>

              <th>Monto</th>

              <th>Origen</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={3}>Cargando</td>
              </tr>
            )}

            {!loading && resumen.length < 1 && (
              <tr>
                <td colSpan={3}>Sin registros</td>
              </tr>
            )}

            {!loading &&
              resumen.length > 0 &&
              resumen.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className="date-td">{row.fecha}</td>

                    <td className={row.monto > 0 ? "green" : "red"}>
                      {row.monto > 0
                        ? `+ ${Number(row.monto).toFixed(2)}`
                        : Number(row.monto).toFixed(2)}
                    </td>

                    <td>{row.concepto}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <style jsx>
        {`
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

          @media only screen and (max-width: 485px) {
            th {
              font-size: 10px;
            }

            td {
              font-size: 12px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Account;
