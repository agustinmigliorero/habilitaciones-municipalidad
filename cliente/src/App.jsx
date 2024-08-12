import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Inicio from "./paginas/Inicio";
import Login from "./paginas/usuario/Login";
import Navbar from "./componentes/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
      </Routes>
      <Login />
    </>
  );
}

export default App;
