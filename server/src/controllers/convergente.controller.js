import { sequelize } from "../index.js";
import { QueryTypes } from "sequelize";

const idLaboratorio = 2;

const convergenteController = {};

/**
 * -----------------------------------------------------
 * Function - getEnsayosConvergente
 * -----------------------------------------------------
 */
convergenteController.getEnsayosConvergente = async (req, res) => {
  console.log(req.params);

  const response = await sequelize.query(
    "SELECT idUsuario, DATE(fechaHora) AS Fecha, TIME(fechaHora) AS Hora, datosEntrada, datosSalida FROM Ensayos WHERE Laboratorios_idLaboratorio = '1';",
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
    newEnsayo.distanciaLente = ensayo.datosEntrada.distanciaLente
    newEnsayo.distanciaPantalla = ensayo.datosEntrada.distanciaPantalla
    dataParsed.push(newEnsayo)
  })
  
  console.log(dataParsed);
  await res.send(dataParsed);
};

/**
 * -----------------------------------------------------
 * Function - postLabConvergente
 * -----------------------------------------------------
 */
convergenteController.postLabConvergente = (req, res) => {
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
        "INSERT INTO Ensayos(idUsuario,datosEntrada,datosSalida,Laboratorios_idLaboratorio) VALUES(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);",
        {
          replacements: {
            idUsuario: idUsuario,
            datosEntrada: JSON.stringify(datosEntrada),
            datosSalida: JSON.stringify(datosSalida),
            idLaboratorio: 1,
          },
          type: QueryTypes.INSERT,
        }
      );
      res.status(200).json("Parámetros correctos");
    } catch (error) {
      console.error("-> ERROR postConvergentes:", error);
    }
  }
};

export { convergenteController };
