import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./tablas.css";

function VerUsuarios({ usuarioLogeado }) {
  const [usuarios, setUsuarios] = useState([]);

  const fetchVerUsuarios = async () => {
    const respuesta = await fetch("http://localhost:3000/api/usuarios");
    const usuarios = await respuesta.json();
    setUsuarios(usuarios);
  };

  useEffect(() => {
    fetchVerUsuarios();
  }, []);

  const mostrarTabla = () => {
    if (usuarios.length > 0) {
      return usuarios.map((usuario) => {
        return (
          <tr key={usuario._id}>
            <td>{usuario._id}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.apellido}</td>
            <td>{usuario.email}</td>
            <td>{usuario.rol}</td>
            <td>{usuario.dni ? usuario.dni : "Falta completar DNI"}</td>
            <td>{usuario.expedientes ? usuario.expedientes.length : 0}</td>
            <td>
              <Link to={`/ver-usuario/${usuario._id}`}>
                <button className="btn btn-danger">Ver mas</button>
              </Link>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <>
      <h1 className="mb-3 text-center">Usuarios</h1>
      <div className="contenedor-tabla">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>DNI</th>
              <th>Cantidad Expedientes</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{mostrarTabla()}</tbody>
        </table>
      </div>
    </>
  );
}

export default VerUsuarios;
