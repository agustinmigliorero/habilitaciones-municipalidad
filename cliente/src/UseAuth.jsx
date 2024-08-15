import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const useAuth = () => {
  const [usuarioLogeado, setUsuarioLogeado] = useState({
    usuario: { id: "", nombre: "", esAdmin: false },
    logeado: false,
  });
  const [cargando, setCargando] = useState(true);

  async function fetchUsuarioLogeado() {
    const respuesta = await fetch(
      `http://localhost:3000/api/usuarios/usuario-logeado`,
      {
        credentials: "include",
      }
    );
    const usuario = await respuesta.json();
    setUsuarioLogeado(usuario);
    setCargando(false);
  }

  useEffect(() => {
    fetchUsuarioLogeado();
  }, []);

  return {
    usuarioLogeado,
    setUsuarioLogeado,
    cargando,
  };
};

const AuthProvider = ({ children }) => {
  const { usuarioLogeado, setUsuarioLogeado, cargando } = useAuth();

  if (cargando) {
    return <h1>Cargando...</h1>;
  }

  return (
    <AuthContext.Provider value={{ usuarioLogeado, setUsuarioLogeado }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
