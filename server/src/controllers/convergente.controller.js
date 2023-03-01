import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const idLaboratorio = 1;

const convergenteController = {};
/**
 * -----------------------------------------------------
 * Function - postEnsayoConvergente
 * -----------------------------------------------------
 */
convergenteController.postEnsayoConvergente = (req, res) => {
  const {
    idUsuario,
    distanciaLente,
    distanciaPantalla,
  } = req.body;

  if ( distanciaLente < 0|| distanciaLente > 900 ) {
    res.status(400).json("la distancia entre el lente y el foco es menor a 0 o mayor a 900");
  } else if ( distanciaPantalla < 0 || distanciaPantalla > 900) {
    res.status(400).json("la distancia entre el lente y la pantalla es menor a 0 o mayor a 900");
  } else {
    const datosEntrada = {
      distanciaLente: distanciaLente,
      distanciaPantalla: distanciaPantalla,
    };
    const datosSalida = {
      distanciaPantalla:
        distanciaPantalla,
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
      console.error("-> ERROR postEnsayoConvergente:", error);
    }
  }
};

export { convergenteController };
