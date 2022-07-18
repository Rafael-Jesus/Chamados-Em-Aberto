import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../App.css";
import "../css/cardHome.css";

const Home = () => {
  return (
    <div className="container-card-title">
      <div className="container-title-logo">
        <img style={{ width: "50px" }} src={logo} alt="Logo" />
        <h1 style={{ color: "#f26533", fontSize: "40px" }}>
          Relatórios Global Live
        </h1>
      </div>
      <div className="container">
        <div className="card">
          <div className="box">
            <div className="content">
              <h2></h2>
              <h3>Chamados em Aberto</h3>
              <p></p>
              <Link id="buttonHome" to="/chamadosabertos">Acessar</Link>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="box">
            <div className="content">
              <h2></h2>
              <h3>Chamados Fechados</h3>
              <p></p>
              <Link id="buttonHome" to="/chamadosfechados">Acessar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
