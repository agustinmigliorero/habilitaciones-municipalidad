import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function VerFormulario({ usuarioLogeado }) {
  const { idFormulario } = useParams();
  const [formulario, setFormulario] = useState({});

  const fetchFormulario = async () => {
    const respuesta = await fetch(
      `http://localhost:3000/api/respuestaformularios/${idFormulario}`,
      { credentials: "include" }
    );
    const formulario = await respuesta.json();
    setFormulario(formulario);
    console.log(formulario);
  };

  useEffect(() => {
    fetchFormulario();
  }, []);

  const mostrarRespuestas = () => {
    if (formulario.respuestas !== undefined) {
      let componentes = formulario.respuestas.map((respuesta, index) => {
        return (
          <h3 key={index}>
            {respuesta.etiqueta}: {respuesta.valor}
          </h3>
        );
      });

      return componentes;
    }
  };

  return (
    <>
      <div className="w-50 mx-auto">
        <h1 className="mb-3 text-center">
          Formulario:{" "}
          {formulario.idFormulario !== undefined
            ? formulario.idFormulario.nombreFormulario
            : ""}
        </h1>
        {mostrarRespuestas()}
      </div>
    </>
  );
}

export default VerFormulario;
