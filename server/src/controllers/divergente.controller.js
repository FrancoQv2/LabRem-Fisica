import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const idLaboratorio = 1;

const divergenteController = {};

/**
 * @return {array} todos los ensayos realizados para el laboratorio de Wifi
 */
divergenteController.getEnsayosDivergente = async (req, res) => {
  console.log(req.params);

  const response = await sequelize.query(
    "SELECT idUsuario, DATE(fechaHora) AS Fecha, TIME(fechaHora) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE Laboratorios_idLaboratorio = 3;",
    {
      replacements: {
        idLaboratorio: idLaboratorio
      },
      type: QueryTypes.SELECT,
    }
  );

  console.log(response);
  
  let dataParsed = [];
  response.map((ensayo)=>{
    const newEnsayo = {}
    newEnsayo.Usuario = ensayo.idUsuario
    newEnsayo.Fecha = ensayo.Fecha
    newEnsayo.Hora = ensayo.Hora
    newEnsayo.distanciaLente1 = ensayo.datosEntrada.distanciaLente1
    newEnsayo.distanciaLenteLente = ensayo.datosEntrada.distanciaLenteLente
    newEnsayo.distanciaPantalla = ensayo.datosEntrada.distanciaPantalla
    dataParsed.push(newEnsayo)
  })
  
  console.log(dataParsed);
  await res.send(dataParsed);
};

/**
 * -----------------------------------------------------
 * Function - postLabWifi
 * -----------------------------------------------------
 */
divergenteController.postLabDivergente = (req, res) => {
  const { 
    distanciaLente1,
    distanciaLenteLente,
    distanciaPantalla 
  } = req.body;

  if (distanciaLente < 0|| distanciaLente > 700) {
    res.status(400).json("la distancia entre el lente y el foco es menor a 0 o mayor a 700");
  } else if (distanciaLenteLente < 0|| distanciaLenteLente > 700) {
    res.status(400).json("la distancia entre el lente y lente es menor a 0 o mayor a 700");
  } else if (distanciaPantalla < 0|| distanciaPantalla > 900) {
    res.status(400).json("la distancia entre el lente y la pantalla es menor a 0 o mayor a 900");
  } else {

    const datosEntrada = {
      distanciaLente1: distanciaLente1,
      distanciaLenteLente: distanciaLenteLente,
      distanciaPantalla: distanciaPantalla,
    };

    const datosSalida = {
      distanciaLenteLente: distanciaLenteLente,
      distanciaDivergentePantalla: distanciaPantalla-distanciaLenteLente-distanciaLente1,//le dudo pero en teoria deberia ser que la suma de distnacia de lente mas distancia foco lente sea inferior a distancia pantalla
    };
    
    try {
      sequelize.query(
        "INSERT INTO Ensayos(idUsuario,datosEntrada,datosSalida,Laboratorios_idLaboratorio) VALUES(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);",
        {
          replacements: {
            idUsuario: idUsuario,
            datosEntrada: JSON.stringify(datosEntrada),
            datosSalida: JSON.stringify(datosSalida),
            idLaboratorio: idLaboratorio,
          },
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).json("Parámetros correctos");
    } catch (error) {
      console.error("-> ERROR postLabWifi:", error);
    }
  }
};

export { divergenteController };
