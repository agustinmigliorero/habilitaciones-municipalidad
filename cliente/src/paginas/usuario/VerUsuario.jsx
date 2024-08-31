import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function VerUsuario() {
  const [usuario, setUsuario] = useState({});
  const { id } = useParams();

  const fetchVerUsuario = async () => {
    const respuesta = await fetch(`http://localhost:3000/api/usuarios/${id}`);
    const usuario = await respuesta.json();
    setUsuario(usuario);
  };

  useEffect(() => {
    fetchVerUsuario();
  }, []);

  const mostrarUsuario = () => {
    if (Object.keys(usuario).length > 0) {
      return (
        <>
          <h3 className="h3 mb-3 fw-normal">
            {" "}
            Imagen:{" "}
            <img
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              src={usuario.imagen}
              alt=""
            />
          </h3>
          <h3 className="h3 mb-3 fw-normal">
            Nombre: <b>{usuario.nombre}</b>{" "}
          </h3>
          <h3 className="h3 mb-3 fw-normal">
            Apellido: <b>{usuario.apellido}</b>
          </h3>
          <h3 className="h3 mb-3 fw-normal">
            Email: <b>{usuario.email}</b>
          </h3>
          <h3 className="h3 mb-3 fw-normal">
            Rol: <b>{usuario.rol}</b>
          </h3>
          <h3 className="h3 mb-3 fw-normal">
            Verificado: <b>{usuario.verificado ? "Si" : "No"}</b>
          </h3>
          <h3 className="h3 mb-3 fw-normal">
            DNI: <b>{usuario.dni ? usuario.dni : "Falta completar DNI"}</b>
          </h3>

          <button className="btn btn-info me-3  ">Ver expedientes</button>
          <Link to={`/editar-usuario/${id}`}>
            <button className="btn btn-warning">Editar usuario</button>
          </Link>
        </>
      );
    }
  };

  return (
    <div style={{ width: "50%", margin: "0 auto", textAlign: "justify" }}>
      <h1 className="h1 mb-3 fw-normal text-center">
        <b>Ver Usuario</b>
      </h1>
      {mostrarUsuario()}
    </div>
  );
}

export default VerUsuario;
