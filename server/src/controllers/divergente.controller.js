import { sequelize, delay } from "../index.js";
import axios from "axios";

const idLaboratorio = 2;

const divergenteController = {};

/**
 * -----------------------------------------------------
 * Function - postEnsayoDivergente
 * -----------------------------------------------------
 */
divergenteController.postEnsayoDivergente = async (req, res) => {
  const { 
    idUsuario,
    distanciaLente,
    distanciaLenteLente,
    distanciaPantalla,
    diafragma 
  } = req.body;

  if (distanciaLente < 0|| distanciaLente > 700) {
    res.status(400).json("la distancia entre el lente y el foco es menor a 0 o mayor a 700");
  } else if (distanciaLenteLente < 0|| distanciaLenteLente > 700) {
    res.status(400).json("la distancia entre el lente y lente es menor a 0 o mayor a 700");
  } else if (distanciaPantalla < 0|| distanciaPantalla > 900) {
    res.status(400).json("la distancia entre el lente y la pantalla es menor a 0 o mayor a 900");
  } else if ( diafragma != "sin diafragma" && diafragma != "diafragma central" && diafragma != "diafragma periferico" && diafragma != "filtro rojo") {
    res.status(400).json("el diafragma no es valido");
  } else { 
    let Diafragma = 0;
    switch (diafragma) {
      case "diafragma central":
        Diafragma = 1;
        break;
      case "diafragma periferico":
        Diafragma = 2;
        break;
      case "filtro rojo":
        Diafragma = 3;
        break;
      default:
        break;
    }
     const url='http://192.168.100.75:3031/api/control/arduino';//cambiar por ip arduino
     const body={
       "Estado" : [3,false,true],
       "Analogico" : [Diafragma,distanciaLente,distanciaPantalla]
     };
     let respuestaGet;
     let Msj='';
    try {
      const respuestaPost = axios.post(`${url}/1`,body);
      let i=0;
      do {
        respuestaGet = await axios.get(`${url}/${i}`);
        await delay(3000);
        i = i+1;
      } while (respuestaGet.data.Estado[2]);
      switch (respuestaGet.data.Error) {
        case 0:
          
          Msj="laboratorio ok";
          break;
        case 1:
          Msj="Error en el angulo limite de azimut";
          break;
        case 2:
          Msj="Error en el angulo limite de elevacion";
          break;
        default:
          Msj="Error de laboratorio incorrecto";
          break;
      }
      res.status(200).json(Msj);
    } catch (error) {
      console.error("-> ERROR postEnsayoDivergente:", error);
    }
  }
};

divergenteController.postEnsayoDivergenteSave = async (req, res) => {
  const { 
    idUsuario,
    distanciaLente,
    distanciaLenteLente,
    distanciaPantalla,
    diafragma 
  } = req.body;

  if (distanciaLente < 0|| distanciaLente > 700) {
    res.status(400).json("la distancia entre el lente y el foco es menor a 0 o mayor a 700");
  } else if (distanciaLenteLente < 0|| distanciaLenteLente > 700) {
    res.status(400).json("la distancia entre el lente y lente es menor a 0 o mayor a 700");
  } else if (distanciaPantalla < 0|| distanciaPantalla > 900) {
    res.status(400).json("la distancia entre el lente y la pantalla es menor a 0 o mayor a 900");
  } else if ( diafragma != "sin diafragma" && diafragma != "diafragma central" && diafragma != "diafragma periferico" && diafragma != "filtro rojo") {
    res.status(400).json("el diafragma no es valido");
  } else {

    const datosEntrada = {
      distanciaLente: distanciaLente,
      distanciaLenteLente: distanciaLenteLente,
      distanciaPantalla: distanciaPantalla,
      diafragma: diafragma,
    };

    const datosSalida = {
      distanciaLente: distanciaLente,
      distanciaLenteLente: distanciaLenteLente,
      distanciaPantalla: distanciaPantalla,
      diafragma: diafragma,
    };
    
    try {
          sequelize.query(
            "CALL sp_crearEnsayo (:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);",
            {
              replacements: {
                idUsuario: idUsuario,
                datosEntrada: JSON.stringify(datosEntrada),
                datosSalida: JSON.stringify(datosSalida),
                idLaboratorio: idLaboratorio,
              }
            }
          );
      res.status(200).json("guardado en base de datos");
    } catch (error) {
      console.error("-> ERROR postEnsayoDivergente:", error);
    }
  }
};

export { divergenteController };
