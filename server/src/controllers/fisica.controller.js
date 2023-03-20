import { sequelize } from "../index.js";


const fisicaController = {};

/**
 * -----------------------------------------------------
 * Function - getLaboratorios
 * -----------------------------------------------------
 */
fisicaController.getLaboratorios = async (req, res) => {
  const response = await sequelize.query("CALL sp_dameLaboratorios();");
  console.log(typeof response);
  console.log(response);

  await res.send(response);
};

/**
 * -----------------------------------------------------
 * Function - getLaboratorioById
 * -----------------------------------------------------
 */
fisicaController.getLaboratorioById = async (req, res) => {
  const { idLaboratorio } = req.params;

  const response = await sequelize.query(
    "CALL sp_dameLaboratorio(:idLaboratorio);",
    {
      replacements: {
          idLaboratorio: idLaboratorio
      } 
    }
  );
  
  await res.send(response[0]);
};


/**
 * -----------------------------------------------------
 * Function - getEnsayosUsuario
 * -----------------------------------------------------
 */
fisicaController.getEnsayosUsuario = async (req, res) => {
  console.log(req.params);
    
  const { idLaboratorio, idUsuario } = req.params;

  const response = await sequelize.query(
    "CALL sp_dameEnsayo(:idUsuario,:idLaboratorio);",
    {
      replacements: {
        idLaboratorio: idLaboratorio,
        idUsuario: idUsuario,
      }
    }
  );

  let dataParsed = [];
  
  if (idLaboratorio == 1) {
    response.map((ensayo)=>{
      const newEnsayo = {}
      newEnsayo.Fecha = ensayo.Fecha
      newEnsayo.Hora = ensayo.Hora
      newEnsayo.distanciaLente = ensayo.datosEntrada.distanciaLente
      newEnsayo.distanciaPantalla = ensayo.datosEntrada.distanciaPantalla
      newEnsayo.diafragma = ensayo.datosEntrada.diafragma
      dataParsed.push(newEnsayo)
    })
  } else if (idLaboratorio == 2) {
    response.map((ensayo)=>{
      const newEnsayo = {}
      newEnsayo.Fecha = ensayo.Fecha
      newEnsayo.Hora = ensayo.Hora
      newEnsayo.distanciaLente = ensayo.datosEntrada.distanciaLente
      newEnsayo.distanciaLenteLente = ensayo.datosEntrada.distanciaLenteLente
      newEnsayo.distanciaPantalla = ensayo.datosEntrada.distanciaPantalla
      dataParsed.push(newEnsayo)
    })
  }
  console.log("--------------------------------");
  console.log(response);
  console.log("--------------------------------");
  
  await res.send(JSON.stringify(dataParsed));
};

/**
 * @param {number} idEnsayo
 * @return {object} informacion de un ensayo en particular
 */
fisicaController.getDeleteEnsayo = async (req, res) => {
  const { idEnsayo } = req.params;

  const response = await sequelize.query(
    "CALL sp_borrarEnsayo(:idEnsayo);",
    {
      replacements: {
        idEnsayo: idEnsayo
      } 
    }
  );
  
  await res.send(response[0]);
};

/**
 * @param {number} idLaboratorio
 * @return {object} informacion de un laboratorio en particular
 */
fisicaController.getDeleteLaboratorio = async (req, res) => {
  const { idLaboratorio } = req.params;

  const response = await sequelize.query(
    "CALL sp_borrarLaboratorio(:idLaboratorio);",
    {
      replacements: {
        idLaboratorio: idLaboratorio
      } 
    }
  );
  
  await res.send(response[0]);
};

/**
 * @param {number} idLaboratorio
 * @return {object} informacion de un laboratorio en particular
 */
fisicaController.getEnsayos = async (req, res) => {
  const { idLaboratorio } = req.params;

  const response = await sequelize.query(
    "CALL sp_dameEnsayos(:idLaboratorio);",
    {
      replacements: {
        idLaboratorio: idLaboratorio,
      } 
    }
  );
  
  let dataParsed = [];
  
  if (idLaboratorio == 1) {
    response.map((ensayo)=>{
      const newEnsayo = {}
      newEnsayo.Fecha = ensayo.Fecha
      newEnsayo.Hora = ensayo.Hora
      newEnsayo.distanciaLente = ensayo.datosEntrada.distanciaLente
      newEnsayo.distanciaPantalla = ensayo.datosEntrada.distanciaPantalla
      dataParsed.push(newEnsayo)
    })
  } else if (idLaboratorio == 2) {
    response.map((ensayo)=>{
      const newEnsayo = {}
      newEnsayo.Fecha = ensayo.Fecha
      newEnsayo.Hora = ensayo.Hora
      newEnsayo.distanciaLente = ensayo.datosEntrada.distanciaLente
      newEnsayo.distanciaLenteLente = ensayo.datosEntrada.distanciaLenteLente
      newEnsayo.distanciaPantalla = ensayo.datosEntrada.distanciaPantalla
      dataParsed.push(newEnsayo)
    })
  }
  console.log("--------------------------------");
  console.log(response);
  console.log("--------------------------------");
  
  await res.send(JSON.stringify(dataParsed));
};

/**
 * -----------------------------------------------------
 * Function - postModLab
 * -----------------------------------------------------
 */
fisicaController.postModLab = async (req, res) => {
  const {codLaboratorio, area, nombre, imagen, descripcion} = req.body;
  const respuesta = await sequelize.query(
    "CALL sp_dameLaboratorio(:codLaboratorio)",
    {
      replacements: {
        codLaboratorio: codLaboratorio
      }
    }
  );
  if (respuesta[0]==null){
    res.status(400).json("codigo no asociado a ningun laboratorio existente");
  } else if (area == null) {
    res.status(400).json("Area nula");
  } else if (nombre == null) {
    res.status(400).json("nombre nulo");
  }  else if (descripcion == null) {
    res.status(400).json("Descripcion nula");
  }else { 

    try {
      sequelize.query(
        "CALL sp_modificarLaboratorio (:codLaboratorio,:area,:nombre,:imagen,:descripcion);",
        {
          replacements: {
            codLaboratorio: codLaboratorio,
            area: area,
            nombre: nombre,
            imagen: imagen,
            descripcion: descripcion,
          }
        }
      );
      res.status(200).json("modificado correctamente");
    } catch (error) {
      console.error("-> ERROR postLab:", error);
    }
  }
};

export { fisicaController };
