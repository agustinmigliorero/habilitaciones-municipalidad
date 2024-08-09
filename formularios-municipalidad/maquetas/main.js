const { jsPDF } = jspdf;
const boton = document.querySelector("button");

const formulario = document.querySelector("form");

const div = document.querySelector("#canva-pdf");

boton.addEventListener("click", (evt) => {
  evt.preventDefault();

  let datosFormulario = new FormData(formulario);

  let datos = {
    nombre: datosFormulario.get("nombre"),
    apellido: datosFormulario.get("apellido"),
    domicilioSolicitante: datosFormulario.get("domicilio-solicitante"),
    ciudadSolicitante: datosFormulario.get("ciudad-solicitante"),
    domicilioComercio: datosFormulario.get("domicilio-comercio"),
    ciudadComercio: datosFormulario.get("ciudad-comercio"),
    actividadComercial: datosFormulario.get("actividad-comercial"),
  };

  // Crear instancia de jsPDF
  const pdf = new jsPDF();

  let textoPDF = `
        <h1 class="h3 mb-3 fw-normal">Formulario F3 Solicitud de Habilitacion</h1>
        <p>Declaro bajo juramento que tengo la legitima ocupacion del inmueble para el destino y actividad cuya habilitacion se solicita</p>

        <p>Nombre: <b>${datos.nombre}</b></p>
        <p>Apellido: <b>${datos.apellido}</b></p>
        <p>Domicilio del solicitante: <b>${datos.domicilioSolicitante}</b></p>
        <p>Ciudad del solicitante: <b>${datos.ciudadSolicitante}</b></p>
        <p>Domicilio del comercio: <b>${datos.domicilioComercio}</b></p>
        <p>Ciudad del comercio: <b>${datos.ciudadComercio}</b></p>
        <p>Actividad comercial a realizar: <b>${datos.actividadComercial}</b></p>
        <br>
        <p style="text-align: right;">Firma: _______________ </p>
        `;

  div.innerHTML = textoPDF;

  div.style.width = "680px";
  div.style.margin = "0 auto";
  div.style.textAlign = "justify";

  html2canvas(div).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 10, 10);

    pdf.save("Formulario F3 Solicitud Habilitaciones.pdf");
  });

  div.innerHTML = "";

  // pdf.text(textoPDF, 10, 10);
  // pdf.save("Formulario F3 Solicitud Habilitaciones.pdf");
});
