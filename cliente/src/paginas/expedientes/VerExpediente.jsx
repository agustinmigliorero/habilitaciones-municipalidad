import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function VerExpediente() {
  const [expediente, setExpediente] = useState({});

  const { idExpediente } = useParams();

  const fetchExpediente = async () => {
    const respuesta = await fetch(
      `http://localhost:3000/api/expedientes/${idExpediente}`,
      { credentials: "include" }
    );
    const expediente = await respuesta.json();
    setExpediente(expediente);
  };

  useEffect(() => {
    fetchExpediente();
  }, []);

  const mostrarFormularios = () => {
    let filas;
    if (expediente.formularios !== undefined) {
      filas = expediente.formularios.map((formulario, index) => {
        return (
          <tr key={index}>
            <td>{formulario.idFormulario.nombreFormulario}</td>
            <td>{formulario.estado}</td>
            <td>
              <Link
                to={`/verformulario/${formulario._id}`}
                className="btn btn-info ms-3 me-3"
              >
                <i
                  className="fa-regular fa-file"
                  style={{ fontSize: "1.3rem" }}
                ></i>{" "}
                Ver Formulario
              </Link>
              <Link
                to={`/responderformulario/${formulario._id}`}
                className="btn btn-warning ms-3 me-3"
              >
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ fontSize: "1.3rem" }}
                ></i>{" "}
                Editar Formulario
              </Link>
              <button className="btn btn-danger ms-3 me-3">
                <i
                  className="fa-solid fa-file-pdf"
                  style={{ fontSize: "1.3rem" }}
                ></i>{" "}
                Exportar PDF
              </button>
            </td>
          </tr>
        );
      });
    }

    return filas;
  };

  let fechaCreacion;
  let fechaActualizacion;
  let stringFechaCreacion;
  let stringFechaActualizacion;
  if (expediente._id != undefined) {
    fechaCreacion = new Date(expediente.fechaCreacion);
    fechaActualizacion = new Date(expediente.fechaActualizacion);
    stringFechaCreacion = `${fechaCreacion.getDate()}/${
      fechaCreacion.getMonth() + 1
    }/${fechaCreacion.getFullYear()} ${fechaCreacion.getHours()}:${fechaCreacion.getMinutes()}:${fechaCreacion.getSeconds()}`;
    stringFechaActualizacion = `${fechaActualizacion.getDate()}/${
      fechaActualizacion.getMonth() + 1
    }/${fechaActualizacion.getFullYear()} ${fechaActualizacion.getHours()}:${fechaActualizacion.getMinutes()}:${fechaActualizacion.getSeconds()}`;
  }
  return (
    <>
      <div style={{ width: "50%", margin: "0 auto", textAlign: "justify" }}>
        <h1 className="text-center">Expediente</h1>
        {expediente._id ? (
          <>
            <h2>ID: {expediente._id}</h2>
            <h2>
              Persona: {expediente.usuario.nombre} {expediente.usuario.apellido}
            </h2>
            <h2>Fecha de inicio: {stringFechaCreacion}</h2>
            <h2>Ultima actualizacion: {stringFechaActualizacion}</h2>
          </>
        ) : (
          ""
        )}
      </div>
      <div style={{ width: "60%", margin: "0 auto", textAlign: "justify" }}>
        <h2 className="text-center mt-4 mb-3">Formularios:</h2>
        <table>
          <thead>
            <tr>
              <th>Formulario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{mostrarFormularios()}</tbody>
        </table>
      </div>
    </>
  );
}

export default VerExpediente;
