import * as dotenv from 'dotenv';
import { leerInput, inquirerMenu, pausa , listarLugares } from "./helpers/inquirer.js";
import { default as Busquedas } from "./models/busquedas.js";
dotenv.config();

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    const opt = await inquirerMenu();
    // console.log(opt);
    switch (opt) {
      case "1":
        // mostrar mensaje
        const ciudad = await leerInput("Ciudad:");
        //buscar lugares
        const lugares = await busquedas.ciudades(ciudad);
        // Seleccionar lugar
        const idSelect = await listarLugares(lugares);
        if ( idSelect === '0') continue;
        
        const lugarSelect = lugares.find( l => l.id === idSelect);
        busquedas.agregarHistorial(lugarSelect.nombre);
        // console.log(lugarSelect.lng , lugarSelect.lat);

        const climaCiudad = await busquedas.climaLugar(lugarSelect.lat,lugarSelect.lng);

        // console.log(climaCiudad);
        
        console.log(`\nInformacion de la ciudad\n`.green);
        console.log(`Ciudad : ${lugarSelect.nombre}`);
        console.log(`Lat : ${lugarSelect.lat}`);
        console.log(`Lng : ${lugarSelect.lon}`);
        console.log(`desc : ${climaCiudad.desc}`);
        console.log(`min : ${climaCiudad.min}`);
        console.log(`max : ${climaCiudad.max}`);
        console.log(`temp : ${climaCiudad.temp}`);



        break;
      case "2":
        
      busquedas.historialCapitalizado.forEach( (lugar, i) =>{
            const idx = `${ i +1}.`.green;
            console.log(`${idx} ${lugar}`);
      })

        break;
      case "3":
        break;

      default:
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
