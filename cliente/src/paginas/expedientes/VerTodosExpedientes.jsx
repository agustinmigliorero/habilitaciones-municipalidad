import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function VerTodosExpedientes() {
  const [expedientes, setExpedientes] = useState([]);

  const fetchExpedientes = async () => {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/api/expedientes`,
      {
        credentials: "include",
      }
    );
    const expedientes = await respuesta.json();
    setExpedientes(expedientes);
  };

  useEffect(() => {
    fetchExpedientes();
  }, []);

  const mostrarExpedientes = () => {
    if (expedientes.length > 0) {
      return expedientes.map((expediente, index) => {
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
            <td>
              {expediente.usuario.nombre + " " + expediente.usuario.apellido}
            </td>
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
      <h1 className="mb-3 text-center">Expedientes</h1>
      <div className="contenedor-tabla">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Persona</th>
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

export default VerTodosExpedientes;
