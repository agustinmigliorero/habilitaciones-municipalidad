import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ResponderFormulario({ usuarioLogeado }) {
  const { idFormulario } = useParams();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({});
  const [nuevasRespuestas, setNuevasRespuestas] = useState([]);

  const fetchFormulario = async () => {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/api/respuestaformularios/${idFormulario}`
    );
    const formulario = await respuesta.json();
    console.log(`LLEGA ESTO DEL FETCH: `, formulario);
    setFormulario(formulario);
    let respuestas = formulario.respuestas.map((respuesta) => {
      return respuesta;
    });
    console.log(`RESPUESTAS: `, respuestas);
    setNuevasRespuestas([...respuestas]);
  };

  function handleChange(e, index) {
    console.log(nuevasRespuestas);
    const { name, value } = e.target;
    const respuestas = [...nuevasRespuestas];
    respuestas[index].valor = value;
    setNuevasRespuestas(respuestas);
  }

  const valoresAutocompletados = (campo) => {
    if (
      campo.etiqueta === "Nombre y apellido" &&
      usuarioLogeado.usuario.rol === "contribuyente"
    ) {
      let nombre = nuevasRespuestas.filter((respuesta) => {
        return respuesta.etiqueta === "Nombre y apellido";
      });
      nombre[0].valor =
        usuarioLogeado.usuario.nombre + " " + usuarioLogeado.usuario.apellido;
      return (
        usuarioLogeado.usuario.nombre + " " + usuarioLogeado.usuario.apellido
      );
    } else if (
      campo.etiqueta === "DNI" &&
      usuarioLogeado.usuario.rol === "contribuyente"
    ) {
      let nombre = nuevasRespuestas.filter((respuesta) => {
        return respuesta.etiqueta === "DNI";
      });
      nombre[0].valor = usuarioLogeado.usuario.dni;
      return usuarioLogeado.usuario.dni;
    } else {
      return "";
    }
  };

  useEffect(() => {
    fetchFormulario();
  }, []);

  const enviarFormulario = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/respuestaformularios/${
        formulario._id
      }`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          respuestas: nuevasRespuestas,
        }),
      }
    ).then((res) => navigate("/verexpediente/" + formulario.expediente));
  };

  const mostrarFormulario = () => {
    let estructuraFormulario = formulario.idFormulario;
    console.log(`NUEVAS RESPUESTAS: `, nuevasRespuestas);
    return (
      <>
        <h1>{estructuraFormulario.nombreFormulario}</h1>
        {estructuraFormulario.campos.map((campo, index) => {
          if (campo.tipo === "text") {
            return (
              <div className="form-floating mt-3" key={index}>
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder={campo.etiqueta}
                  name={campo.etiqueta}
                  required={campo.requerido}
                  value={
                    nuevasRespuestas[index].valor ||
                    valoresAutocompletados(campo)
                  }
                  onChange={(e) => handleChange(e, index)}
                />
                <label htmlFor="floatingInput">{campo.etiqueta}</label>
              </div>
            );
          } else if (campo.tipo === "select") {
            return (
              <div className="form-floating mt-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>{campo.etiqueta}</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label htmlFor="floatingInput">{campo.etiqueta}</label>
              </div>
            );
          }
        })}
      </>
    );
  };

  return (
    <div className="form-signin w-25 m-auto">
      {formulario.idFormulario !== undefined ? mostrarFormulario() : ""}
      <button
        className="w-100 btn btn-lg btn-primary mt-3"
        onClick={enviarFormulario}
      >
        Enviar
      </button>
    </div>
  );
}

export default ResponderFormulario;
