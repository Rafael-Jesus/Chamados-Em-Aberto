import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import Loading from "../components/Loading";
import SyncIcon from "@mui/icons-material/Sync";
import AccordionClient from "../components/AccordionClient";
import orange from "@material-ui/core/colors/orange";

import { useEffect, useLayoutEffect, useState } from "react";

import _ from "lodash";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import "../App.css";
import "../css/cardHome.css";

import Modal from "react-bootstrap/Modal";

const ChamadosAbertos = () => {
  const [dados, setDados] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [today, setToday] = useState(-1);
  const [chamadosToday, setChamadosToday] = useState([]);

  const showModal = (dataHoje, chamadosHoje) => {
    setModalShow(true);
    setChamadosToday(chamadosHoje);
    setToday(dataHoje);
  };

  const syncDados = () => {
    
    const fetchData = async () => {
      try {
        const data = await axios(
          "https://apichamados.globallive.com.br/chamadosfechados"
        );

        const values = _.groupBy(data.data.registros, (value) => {
          //mudando o formato da data
          let data_americana = value.data_abertura.substring(0, 10);
          let data_brasileira = data_americana.split("-").reverse().join("/");
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
          k != 0 ? [v[0], v[1].length, generateColor(), v[1].length, v[1]] : ""
        );
        setDados(dataChamados);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        sty
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#f26533" }}
          >
            Chamados abertos no dia {today}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="modalBody">
          
            {chamadosToday.map((value, index) => (
              <AccordionClient idChamado={index} dadosChamado={value} />
            ))}
          
        </Modal.Body>
        <Modal.Footer>
          <a href="#" id="closeModal" onClick={props.onHide}>
            Close
          </a>
        </Modal.Footer>
      </Modal>
    );
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      setRemoveLoading(true);
    }, 25000);

    const fetchData = async () => {
      try {
        const data = await axios(
          "https://apichamados.globallive.com.br/chamadosfechados"
        );

        const values = _.groupBy(data.data.registros, (value) => {
          //mudando o formato da data
          let data_americana = value.data_abertura.substring(0, 10);
          let data_brasileira = data_americana.split("-").reverse().join("/");
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
          k != 0 ? [v[0], v[1].length, generateColor(), v[1].length, v[1]] : ""
        );
        setDados(dataChamados);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-card-title">
      {removeLoading == false ? (
        <Loading />
      ) : (
        <div className="container-card-title">
          <Link id="buttonCA" to="/">
            Voltar
          </Link>
          <div className="container-title-logo">
            <img style={{ width: "50px" }} src={logo} alt="Logo" />
            <h1 style={{ color: "#f26533", fontSize: "40px" }}>
              Chamados em Aberto
            </h1>
          </div>
          <a id="syncData" onClick={() => syncDados()}>
            <SyncIcon style={{color: "orange", fontSize: 50}}/>
          </a>
          <div className="container">
            {dados.map((value, index) =>
              index != 0 ? (
                index === 1 ? (
                  <div className="card">
                    <div className="box">
                      <div className="content">
                        <h2 style={{ color: "#f26533" }}>{value[1]}</h2>
                        <h3>{value[0]}</h3>
                        <p></p>
                        <a
                          id="id_relatorios"
                          href="#"
                          onClick={() => showModal(value[0], value[4])}
                        >
                          Ver Relatórios
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card">
                    <div className="box">
                      <div className="content">
                        <h2>{value[1]}</h2>
                        <h3>{value[0]}</h3>
                        <p></p>
                        <a
                          id="id_relatorios2"
                          href="#"
                          onClick={() => showModal(value[0], value[4])}
                        >
                          Ver Relatórios
                        </a>
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default ChamadosAbertos;
