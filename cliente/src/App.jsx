import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Inicio from "./paginas/Inicio";
import Login from "./paginas/usuario/Login";
import Navbar from "./componentes/Navbar";
import IniciarSesion from "./paginas/usuario/IniciarSesion";
import { useAuth } from "./UseAuth";

function App() {
  const { usuarioLogeado, setUsuarioLogeado } = useAuth();

  return (
    <>
      <Navbar
        usuarioLogeado={usuarioLogeado}
        setUsuarioLogeado={setUsuarioLogeado}
      />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Login /> */}
    </>
  );
}

export default App;
