import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import Loading from "../components/Loading";


import { useEffect, useState } from "react";

import _ from "lodash";
import axios from "axios";

import "../App.css";
import "../css/cardHome.css";

const ChamadosFechados = () => {
  const [dados, setDados] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setInterval(() => {
        setRemoveLoading(true);
        const fetchData = async () => {
          try {
            const data = await axios(
              "https://apichamados.globallive.com.br/chamados"
            );

            const values = _.groupBy(data.data.registros, (value) => {
              //mudando o formato da data
              let data_americana = value.data_abertura.substring(0, 10);
              let data_brasileira = data_americana
                .split("-")
                .reverse()
                .join("/");
              return data_brasileira;
            });

            function generateColor() {
              const letters = "0123456789ABCDEF";
              let color = "#";

              for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
              }

              return color;
            }

            const valuesV = Object.entries(values);
            valuesV.unshift([
              "Element",
              "Chamados",
              { role: "style" },
              {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
              },
            ]);
            const dataChamados = valuesV.map((v, k) =>
              k != 0
                ? [v[0], v[1].length, generateColor(), v[1].length]
                : [
                    "Datas de Abertura dos Chamados",
                    "Chamados",
                    { role: "style" },
                    {
                      sourceColumn: 0,
                      role: "annotation",
                      type: "string",
                      calc: "stringify",
                    },
                  ]
            );
            console.log(dataChamados);
            setDados(dataChamados);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, 5000);
    }, 50);
  }, []);

  return (
    <div class="container-card-title">
      {removeLoading == false ? (
        <Loading />
      ) : (
        <div class="container-card-title">
          <Link id="buttonCA" to="/">
            Voltar
          </Link>
          <div class="container-title-logo">
            <img style={{ width: "50px" }} src={logo} alt="Logo" />
            <h1 style={{ color: "#f26533", fontSize: "40px" }}>
              Chamados em Aberto
            </h1>
          </div>
          <div class="container">
            {dados.map((value, index) =>
              index != 0 ? (
                index === 1 ? (
                  <div class="card">
                    <div class="box">
                      <div class="content">
                        <h2 style={{ color: "#f26533" }}>{value[1]}</h2>
                        <h3>{value[0]}</h3>
                        <p></p>
                        {/* <a href="#">Acessar</a> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div class="card">
                    <div class="box">
                      <div class="content">
                        <h2>{value[1]}</h2>
                        <h3>{value[0]}</h3>
                        <p></p>
                        {/* <a href="#">Acessar</a> */}
                      </div>
                    </div>
                  </div>
                )
              ) : (
                ""
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChamadosFechados;
