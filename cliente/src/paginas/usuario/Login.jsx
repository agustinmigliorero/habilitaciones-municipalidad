import { useState, useEffect } from "react";

export default function Login() {
  const handleOAuth = () => {
    window.open(`http://localhost:3000/auth/google`, "_self");
  };

  useEffect(() => {
    usuarioLogeado();
  }, []);

  async function usuarioLogeado() {
    const respuesta = await fetch(
      "http://localhost:3000/auth/usuario-logeado",
      {
        credentials: "include",
      }
    );
    const data = await respuesta.json();
    console.log(respuesta);
    console.log(data);
  }

  return (
    <div>
      <button onClick={handleOAuth}>Login with Google</button>
    </div>
  );
}
