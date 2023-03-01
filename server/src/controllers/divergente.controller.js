import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const idLaboratorio = 2;

const divergenteController = {};

/**
 * -----------------------------------------------------
 * Function - postEnsayoDivergente
 * -----------------------------------------------------
 */
divergenteController.postEnsayoDivergente = (req, res) => {
  const { 
    idUsuario,
    distanciaLente,
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
      distanciaLente: distanciaLente,
      distanciaLenteLente: distanciaLenteLente,
      distanciaPantalla: distanciaPantalla,
    };

    const datosSalida = {
      distanciaLenteLente: distanciaLenteLente,
      distanciaDivergentePantalla: distanciaPantalla-distanciaLenteLente-distanciaLente,//le dudo pero en teoria deberia ser que la suma de distnacia de lente mas distancia foco lente sea inferior a distancia pantalla
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
      res.status(200).json("Parámetros correctos");
    } catch (error) {
      console.error("-> ERROR postEnsayoDivergente:", error);
    }
  }
};

export { divergenteController };
