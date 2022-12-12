import "colors";
import inquirer from "inquirer";
const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?.",
    choices: [
      {
        value: "1",
        name: `${"1".green}. buscar cuidad.`,
      },
      {
        value: "2",
        name: `${"2".green}. Historial.`,
      },
      {
        value: "0",
        name: `${"0".green}. Salir.`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  const pregunta = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"Enter".green} para continuar`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(pregunta);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "ciudad",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { ciudad } = await inquirer.prompt(question);
  return ciudad;
};

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`,
    };
  });
  choices.unshift({
    value: '0',
    name: "0.".green + " cancelar",
  });

  const pregunta = [
    {
      type: "list",
      name: "id",
      message: "Seleccione lugar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(pregunta);
  return id;
};

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked:(tarea.completadoEn) ? true : false
    };
  });
  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

const confirmar = async (message) => {
  const pregunta = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(pregunta);

  return ok;
};

export { inquirerMenu, pausa, leerInput, listarLugares, confirmar ,mostrarListadoCheckList};