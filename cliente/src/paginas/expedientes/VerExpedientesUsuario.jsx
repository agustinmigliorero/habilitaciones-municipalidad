import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CrearExpediente from "./CrearExpediente";

function VerExpedientesUsuario({ usuarioLogeado }) {
  const [respuesta, setRespuesta] = useState([]);
  const navigate = useNavigate();
  const { idUsuario } = useParams();

  const fetchExpedientes = async () => {
    const respuestaFetch = await fetch(
      `http://localhost:3000/api/expedientes/usuario/${idUsuario}`,
      { credentials: "include" }
    );
    const data = await respuestaFetch.json();
    setRespuesta(data);
  };

  useEffect(() => {
    fetchExpedientes();
  }, []);

  const mostrarExpedientes = () => {
    if (respuesta.expedientes !== undefined) {
      return respuesta.expedientes.map((expediente, index) => {
        let fechaCreacion = new Date(expediente.fechaCreacion);
        let fechaActualizacion = new Date(expediente.fechaActualizacion);
        let stringFechaCreacion = `${fechaCreacion.getDate()}/${
          fechaCreacion.getMonth() + 1
        }/${fechaCreacion.getFullYear()} ${fechaCreacion.getHours()}:${fechaCreacion.getMinutes()}:${fechaCreacion.getSeconds()}`;
        let stringFechaActualizacion = `${fechaActualizacion.getDate()}/${
          fechaActualizacion.getMonth() + 1
        }/${fechaActualizacion.getFullYear()} ${fechaActualizacion.getHours()}:${fechaActualizacion.getMinutes()}:${fechaActualizacion.getSeconds()}`;
        return (
          <tr key={index}>
            <td>{expediente._id}</td>
            <td>{expediente.estado}</td>
            <td>{stringFechaCreacion}</td>
            <td>{stringFechaActualizacion}</td>
            <td>
              <Link
                to={`/verexpediente/${expediente._id}`}
                className="btn btn-primary"
              >
                Ver mas
              </Link>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <>
      <div className="text-center">
        {usuarioLogeado.logeado.rol === "contribuyente" ? (
          <h1 className="mb-3">Mis Expedientes</h1>
        ) : (
          <h1 className="mb-3">
            Expedientes de {respuesta.usuario ? respuesta.usuario.nombre : ""}
          </h1>
        )}
        <CrearExpediente />
      </div>
      <div className="contenedor-tabla">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Estado</th>
              <th>Fecha de creacion</th>
              <th>Ultima actualizacion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{mostrarExpedientes()}</tbody>
        </table>
      </div>
    </>
  );
}

export default VerExpedientesUsuario;
