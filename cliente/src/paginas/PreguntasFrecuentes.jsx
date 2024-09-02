import Acordeon from "../componentes/Acordeon";

function PreguntasFrecuentes() {
  const items = [
    {
      titulo:
        "¿Qué documentacion necesito para empezar una habilitación? ¿Debo llevar alguna documentación en fisico a las oficinas?",
      texto:
        "Puedes saber que documentación necesitas para empezar una habilitación accediendo al enlace del instructivo <link del instructivo>. Alli se detalla que documentación necesitas y donde presentarlas.",
    },
    {
      titulo: "¿Donde puedo ver el estado de mi solicitud?",
      texto:
        'Puedes ver el estado de tu solicitud a través de la pestaña "Expedientes" que podrás ver cuando te conectes a tu cuenta de usuario.',
    },
    {
      titulo:
        "Una vez que ya tengo la validación de prefactibilidad ¿Cuál es el siguiente paso a seguir?",
      texto:
        "El siguiente paso luego de prefactibilidad es presentar prefactibilidad y documentos en habilitaciones donde se dara el inicio del tramite.",
    },
    {
      titulo: "¿Puedo completar varios formularios a la vez?",
      texto:
        "Al expandirlo salta esto, dejo un lorem para rellenar \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quibusdam placeat ipsum voluptatum mollitia at? Non earum exercitationem deserunt a sunt vitae labore, nam id, quaerat quas saepe tempora temporibus.",
    },
    {
      titulo:
        "¿Qué formularios puedo llenar como solicitante de una habilitación?",
      texto:
        "Al expandirlo salta esto, dejo un lorem para rellenar \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quibusdam placeat ipsum voluptatum mollitia at? Non earum exercitationem deserunt a sunt vitae labore, nam id, quaerat quas saepe tempora temporibus.",
    },
    {
      titulo: "Para realizar el tramite ¿Hay que abonar alguna suma de dinero?",
      texto:
        "Al expandirlo salta esto, dejo un lorem para rellenar \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quibusdam placeat ipsum voluptatum mollitia at? Non earum exercitationem deserunt a sunt vitae labore, nam id, quaerat quas saepe tempora temporibus.",
    },
    {
      titulo: "¿Puedo solicitar mas de una habilitacion al mismo tiempo?",
      texto:
        "Al expandirlo salta esto, dejo un lorem para rellenar \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quibusdam placeat ipsum voluptatum mollitia at? Non earum exercitationem deserunt a sunt vitae labore, nam id, quaerat quas saepe tempora temporibus.",
    },
    {
      titulo: "¿Cuanto tiempo demora el proceso?",
      texto:
        "Al expandirlo salta esto, dejo un lorem para rellenar \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quibusdam placeat ipsum voluptatum mollitia at? Non earum exercitationem deserunt a sunt vitae labore, nam id, quaerat quas saepe tempora temporibus.",
    },
  ];

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Preguntas Frecuentes</h1>
      <div className="w-50" style={{ margin: "0 auto", marginTop: "3%" }}>
        <Acordeon items={items} />
      </div>
    </>
  );
}

export default PreguntasFrecuentes;
