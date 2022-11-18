import { React, useEffect, useState } from "react";

import AppService from "../../services/app.service";

import dayjs from "dayjs";

import Countdown from "react-countdown";

const Apuestas = (props) => {
  const profile = props.profile;

  const dotaImageBase = "https://cdn.cloudflare.steamstatic.com";

  const [apuestas, setApuestas] = useState([]);

  const [heroes, setHeroes] = useState({});

  const [searching, setSearching] = useState(false);

  const Completionist = () => <span>{profile.shouldplaying}</span>;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state

      return <Completionist />;
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

  return (
    <>
      <div>
        <table className="desktop-table background-gradient-1">
          <thead>
            <tr>
              <th>{profile.bettime}</th>

              <th>{profile.match}</th>

              <th>{profile.matchId}</th>

              <th>{profile.amount}</th>

              <th>{profile.status}</th>

              <th>{profile.result}</th>
            </tr>
          </thead>

          <tbody>
            {searching && (
              <tr>
                <td colSpan="5">{profile.searching}</td>
              </tr>
            )}

            {!searching && apuestas.length < 1 && (
              <tr>
                <td colSpan="5" className="gc-record-not-found">
                  {profile.notbet}
                </td>
              </tr>
            )}

            {!searching &&
              apuestas.slice(0, 10).map((apuesta) => {
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

                    <td>PEN {apuesta.monto}</td>

                    <td>
                      {apuesta.estado == "0" && apuesta.match_id == null ? (
                        <Countdown
                          date={Date.parse(apuesta.timestamp) + 1500000}
                          intervalDelay={0}
                          precision={3}
                          renderer={renderer}
                        />
                      ) : apuesta.estado == "0" ? (
                        profile.process
                      ) : apuesta.estado < 3 && apuesta.match_id !== null ? (
                        profile.finished
                      ) : apuesta.estado == 3 ? (
                        profile.party
                      ) : (
                        profile.failed
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
        `}
      </style>
    </>
  );
};

export default Apuestas;
