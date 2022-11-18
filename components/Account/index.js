import dayjs from "dayjs";

import React, { useEffect, useState } from "react";

import AppService from "../../services/app.service";

const Account = (props) => {
  const [loading, setLoading] = useState(false);

  const [resumen, setResumen] = useState([]);

  const profile = props.profile;

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
        <table className="desktop-table background-gradient-1">
          <thead>
            <tr>
              <th>{profile.datetime} </th>

              <th>{profile.amount}</th>

              <th>{profile.source}</th>
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

       
        `}
      </style>
    </>
  );
};

export default Account;
