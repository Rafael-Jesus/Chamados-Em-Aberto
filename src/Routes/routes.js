import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import ChamadosAbertos from "../pages/ChamadosAbertos";
import ChamadosFechados from "../pages/ChamadosFechados";
// import Sobre from "./Sobre";
// import Usuario from "./Usuario";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path="/" exact />
        <Route element={<ChamadosAbertos/>} path="/chamadosabertos" />
        <Route element={<ChamadosFechados/>} path="/chamadosfechados" />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
