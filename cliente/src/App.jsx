import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Inicio from "./paginas/Inicio";
import VerUsuarios from "./paginas/usuario/VerUsuarios";
import VerUsuario from "./paginas/usuario/VerUsuario";
import EditarUsuario from "./paginas/usuario/EditarUsuario";
import Navbar from "./componentes/Navbar";
import IniciarSesion from "./paginas/usuario/IniciarSesion";
import ResponderFormulario from "./paginas/formulario/responder-formulario";
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
        <Route path="/" element={<Inicio usuarioLogeado={usuarioLogeado} />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/ver-usuarios" element={<VerUsuarios />} />
        <Route path="/ver-usuario/:id" element={<VerUsuario />} />
        <Route
          path="/editar-usuario/:id"
          element={<EditarUsuario usuarioLogeado={usuarioLogeado} />}
        />
        <Route path="*" element={<Navigate to="/" />} />

        <Route
          path="/formularios/:idFormulario"
          element={<ResponderFormulario />}
        />
      </Routes>
      {/* <Login /> */}
    </>
  );
}

export default App;
