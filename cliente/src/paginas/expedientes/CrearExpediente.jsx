import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearExpediente({ usuarioLogeado }) {
  const [expediente, setExpediente] = useState({});
  const navigate = useNavigate();

  const fetchCrearExpediente = async () => {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/api/expedientes`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await respuesta.json();
    navigate(`/verexpediente/${data.expediente._id}`);
  };

  return (
    <button onClick={fetchCrearExpediente} className="btn btn-primary">
      Crear Expediente
    </button>
  );
}

export default CrearExpediente;
