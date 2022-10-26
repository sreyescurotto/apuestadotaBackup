import { React, useEffect, useState } from "react";

import AppService from "../../services/app.service";

import dayjs from "dayjs";

import Countdown from "react-countdown";

const ApuestasAll = () => {
  const dotaImageBase = "https://cdn.cloudflare.steamstatic.com";

  const [apuestas, setApuestas] = useState([]);

  const [heroes, setHeroes] = useState({});

  const [searching, setSearching] = useState(false);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state

      return <p> Ya deberías estar jugando </p>;
    } else {
      // Render a countdown

      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const getApuestas = () => {
    let s = new AppService();

    if (s.getUser() !== null) {
      setApuestas([]);

      setSearching((current) => !current);

      s.makeGet("apuestas", {}, true).then((res) => {
        setApuestas(
          res.data.map((item) => {
            item.timestamp = dayjs(item.created_at).format(
              "MM/DD/YYYY HH:mm:ss"
            );

            item.created_at = dayjs(item.created_at).format(
              "DD/MM/YYYY hh:mm a"
            );

            item.match_start_time = dayjs(item.match_start_time * 1000).format(
              "DD/MM/YYYY hh:mm a"
            );

            item.fecha_proceso = dayjs(item.fecha_proceso * 1000).format(
              "DD/MM/YYYY hh:mm a"
            );

            return item;
          })
        );

        setSearching((current) => !current);
      });
    }
  };

  useEffect(() => {
    fetch("/json/heroes.json")
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        setHeroes(json);
      });

    getApuestas();
  }, []);

  const toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);

    return datum;
  };

  return (
    <>
      <div>
        <table className="desktop-table">
          <thead>
            <tr>
              <th>Fecha y hora de la apuesta</th>

              <th>Partida</th>

              <th>Match ID</th>

              <th>Monto apostado</th>

              <th>Estado</th>

              <th>Resultado</th>
            </tr>
          </thead>

          <tbody>
            {searching && (
              <tr>
                <td colSpan="5">Buscando apuestas</td>
              </tr>
            )}

            {!searching && apuestas.length < 1 && (
              <tr>
                <td colSpan="5" className="gc-record-not-found">
                  No has realizado apuestas
                </td>
              </tr>
            )}

            {!searching &&
              apuestas.map((apuesta) => {
                return (
                  <tr key={"partida_" + apuesta.id}>
                    <td className="date-td">{apuesta.created_at}</td>

                    <td>
                      {apuesta.match_id && (
                        <>
                          <div className="d-match">
                            <img
                              src={
                                dotaImageBase +
                                heroes[apuesta.match_hero_id]?.img
                              }
                              className="hero_img"
                            />

                            <div className="d-match-body">
                              <h5>
                                {heroes[apuesta.match_hero_id]?.localized_name}
                              </h5>

                              <div>{apuesta.match_start_time}</div>
                            </div>
                          </div>
                        </>
                      )}

                      {!apuesta.match_id && <span>-</span>}
                    </td>

                    <td>{apuesta.match_id ? apuesta.match_id : "-"}</td>

                    <td>USD {apuesta.monto}</td>

                    <td>
                      {apuesta.estado == "0" && apuesta.match_id == null ? (
                        <Countdown
                          date={Date.parse(apuesta.timestamp) + 1500000}
                          intervalDelay={0}
                          precision={3}
                          renderer={renderer}
                        />
                      ) : apuesta.estado == "0" ? (
                        "En proceso"
                      ) : apuesta.estado > 0 && apuesta.match_id !== null ? (
                        "Terminado"
                      ) : (
                        "Expirado"
                      )}
                    </td>

                    <td className="lastCol">
                      {apuesta.estado == "0" ? (
                        "-"
                      ) : apuesta.estado == "1" ? (
                        <span className="green">
                          + {(apuesta.monto * 1.4).toFixed(2)}
                        </span>
                      ) : apuesta.estado == "2" ? (
                        <span className="red">- {apuesta.monto}</span>
                      ) : (
                        <span className="purple">- {apuesta.monto}</span>
                      )}
                    </td>
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

export default ApuestasAll;
