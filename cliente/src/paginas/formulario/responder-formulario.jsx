import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ResponderFormulario() {
  const { idFormulario } = useParams();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({});

  const fetchFormulario = async () => {
    const respuesta = await fetch(
      `http://localhost:3000/api/formularios/${idFormulario}`
    );
    const formulario = await respuesta.json();
    setFormulario(formulario);
  };

  useEffect(() => {
    fetchFormulario();
  }, []);

  const mostrarFormulario = () => {
    return (
      <>
        <h1>{formulario.nombreFormulario}</h1>
        {formulario.campos.map((campo) => {
          if (campo.tipo === "text") {
            return (
              <div class="form-floating mt-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder={campo.etiqueta}
                  name="ciudad-comercio"
                  required={campo.requerido}
                />
                <label for="floatingInput">{campo.etiqueta}</label>
              </div>
            );
          } else if (campo.tipo === "select") {
            return (
              <div class="form-floating mt-3">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label for="floatingInput">{campo.etiqueta}</label>
              </div>
            );
          }
        })}
      </>
    );
  };

  return (
    <div className="form-signin w-25 m-auto">
      {formulario.campos ? mostrarFormulario() : ""}
      <button
        className="w-100 btn btn-lg btn-primary mt-3"
        onClick={() => navigate(-1)}
      >
        Enviar
      </button>
    </div>
  );
}

export default ResponderFormulario;
