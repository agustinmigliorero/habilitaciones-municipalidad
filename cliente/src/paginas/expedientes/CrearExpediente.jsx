import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearExpediente({ usuarioLogeado }) {
  const [expediente, setExpediente] = useState({});
  const navigate = useNavigate();

  const fetchCrearExpediente = async () => {
    const respuesta = await fetch("http://localhost:3000/api/expedientes", {
      method: "POST",
      credentials: "include",
    });
    const expediente = await respuesta.json();
    navigate(`/ver-expediente/${expediente.idExpediente}`);
  };

  return (
    <button onClick={fetchCrearExpediente} className="btn btn-primary">
      Crear Expediente
    </button>
  );
}

export default CrearExpediente;
