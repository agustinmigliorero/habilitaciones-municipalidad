import { useNavigate, Link } from "react-router-dom";

function Inicio({ usuarioLogeado }) {
  const navigate = useNavigate();

  //Si el usuario esta logeado y le falta rellenar informacion como por ejemplo el DNI, se lo redirige a la pantalla de editar usuario
  //para que complete la informacion faltante.
  if (
    usuarioLogeado.logeado &&
    (!usuarioLogeado.usuario.dni || usuarioLogeado.usuario.dni === "")
  ) {
    navigate(`/editar-usuario/${usuarioLogeado.usuario._id}`);
  }
  console.log(usuarioLogeado);
  return (
    <div style={{ textAlign: "center" }}>
      {usuarioLogeado.logeado && (
        <div className="alert alert-success w-75 m-auto mt-3" role="alert">
          Bienvenido!{" "}
          <b>
            {usuarioLogeado.usuario.nombre}, {usuarioLogeado.usuario.apellido}
          </b>
        </div>
      )}
      <h1>Inicio</h1>
      {usuarioLogeado.logeado ? (
        <Link to={`/expedientes/${usuarioLogeado.usuario._id}`}>
          <button className="btn btn-primary">Ver mis expedientes</button>
        </Link>
      ) : (
        <>
          <h3>
            Bienvenido a el sistema de habilitaciones de la Municipalidad de
            Azul!
          </h3>
          <h3>Por favor inicia sesion o crea una cuenta para continuar</h3>
          <Link to="/iniciar-sesion">
            <button className="btn btn-primary">Iniciar sesion</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Inicio;
