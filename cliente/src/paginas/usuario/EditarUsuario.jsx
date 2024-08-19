import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function EditarUsuario({ usuarioLogeado }) {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    rol: "",
    dni: "",
    verificado: false,
  });

  const handleChange = (event) => {
    console.log(usuario);
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/api/usuarios/editar/${id}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const fetchVerUsuario = async () => {
    const respuesta = await fetch(`http://localhost:3000/api/usuarios/${id}`);
    const usuario = await respuesta.json();
    setUsuario(usuario);
  };

  useEffect(() => {
    fetchVerUsuario();
  }, []);

  function editarSiendoAdmin() {
    if (
      usuarioLogeado.usuario.rol === "administrador" ||
      usuarioLogeado.usuario.rol === "habilitaciones"
    ) {
      return (
        <>
          <div className="form-floating">
            <select
              name="rol"
              id="selectRol"
              value={usuario.rol}
              onChange={handleChange}
              className="form-select"
            >
              <option value="habilitaciones">Habilitaciones</option>
              <option value="administrador">Administrador</option>
              <option value="contribuyente">Contribuyente</option>
            </select>

            <label htmlFor="selectRol">Rol</label>
          </div>
          <div className="form-floating">
            <select
              name="verificado"
              id="selectVerificado"
              className="form-select"
              onChange={handleChange}
              value={usuario.verificado}
            >
              <option value="false">No</option>
              <option value="true">Si</option>
            </select>
            <label htmlFor="inputVerificado">Verificado</label>
          </div>
        </>
      );
    }
  }

  function registroPorPrimeraVez() {}

  function editarUsuario() {}

  return (
    <main className="form-signin w-100 m-auto">
      <h1 className="h3 mb-3 fw-normal">Editar usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            className="form-control"
            id="inputNombre"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
          />
          <label htmlFor="inputNombre">Nombre</label>
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            id="inputApellido"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
          />
          <label htmlFor="inputApellido">Apellido</label>
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            id="inputEmail"
            name="email"
            value={usuario.email}
            onChange={handleChange}
          />
          <label htmlFor="inputEmail">Email</label>
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            id="inputDni"
            name="dni"
            value={usuario.dni}
            onChange={handleChange}
          />
          <label htmlFor="inputDni">DNI</label>
        </div>
        {editarSiendoAdmin()}

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Editar usuario
        </button>
      </form>
    </main>
  );
}

export default EditarUsuario;
