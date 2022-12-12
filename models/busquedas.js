import axios from "axios";
import * as fs from "fs";
class Busquedas {
    dbPath = "./db/database.json";
    historial = {};

    get historialCapitalizado(){

        return this.historial.map(lugar =>{
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ')
        });
    }
    get historialArr(){
        const historial =[];
        Object.keys(this.historial).forEach( key =>{
            const lugar = this.historial[key];
            historial.push(lugar);
        })
        return historial;
    }
    constructor() {
      this.leerDB();
      this.historial;
    }

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: "5",
      languaje: "es",
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPEN_WEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async ciudades(ciudad = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json`,
        params: this.paramsMapBox,
      });

      const resp = await instance.get();
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;
      //   console.log({weather, main});

      return {
        desc: `${weather[0].description}`,
        min: `${main.temp_min}`,
        max: `${main.temp_max}`,
        temp: `${main.temp}`,
      };

      // create axios

      // resp data

      // return desc,min max temp
    } catch (error) {
      return error;
    }
  }

  agregarHistorial(lugar = "") {
    if (this.historial.includes(lugar.toLocaleLowerCase())){
        return;
    }
    this.historial = this.historial.splice(0,5)
      this.historial.unshift(lugar);
      this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }


  leerDB(){
    if (!fs.existsSync(this.dbPath)) return;
      
    
      const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
      const data = JSON.parse(info);
      this.historial = data.historial;
  }
}

export default Busquedas;
