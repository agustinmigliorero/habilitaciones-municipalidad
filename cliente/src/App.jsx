import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
/* COMPONENTES */
import Navbar from "./componentes/Navbar";
/* COMPONENTES */

/*PAGINAS*/
import Inicio from "./paginas/Inicio";

/* PAGINAS DE USUARIOS */
import VerUsuarios from "./paginas/usuario/VerUsuarios";
import VerUsuario from "./paginas/usuario/VerUsuario";
import EditarUsuario from "./paginas/usuario/EditarUsuario";
import IniciarSesion from "./paginas/usuario/IniciarSesion";
/* PAGINAS DE USUARIOS */

/* PAGINAS DE EXPEDIENTES */
import VerTodosExpedientes from "./paginas/expedientes/VerTodosExpedientes";
import VerExpedientesUsuario from "./paginas/expedientes/VerExpedientesUsuario";
import VerExpediente from "./paginas/expedientes/VerExpediente";
/* PAGINAS DE EXPEDIENTES */

/* PAGINAS DE FORMULARIOS */
import ResponderFormulario from "./paginas/formulario/ResponderFormulario";
import VerFormulario from "./paginas/formulario/VerFormulario";
/* PAGINAS DE FORMULARIOS */

import PreguntasFrecuentes from "./paginas/PreguntasFrecuentes";
import { useAuth } from "./UseAuth";
/*PAGINAS*/

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

        {/* PAGINAS DE FORMULARIOS */}
        <Route
          path="/responderformulario/:idFormulario"
          element={<ResponderFormulario usuarioLogeado={usuarioLogeado} />}
        />
        <Route
          path="/verformulario/:idFormulario"
          element={<VerFormulario usuarioLogeado={usuarioLogeado} />}
        />
        {/* PAGINAS DE FORMULARIOS */}

        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />

        {/* PAGINAS DE EXPEDIENTES */}
        <Route path="/vertodosexpedientes" element={<VerTodosExpedientes />} />
        <Route
          path="/expedientes/:idUsuario"
          element={<VerExpedientesUsuario usuarioLogeado={usuarioLogeado} />}
        />
        <Route
          path="/verexpediente/:idExpediente"
          element={<VerExpediente />}
        />
        {/* PAGINAS DE EXPEDIENTES */}
      </Routes>
      {/* <Login /> */}
    </>
  );
}

export default App;
