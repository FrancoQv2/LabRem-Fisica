import express from "express";
import { fisicaController } from "../controllers/fisica.controller.js";
import { convergenteController } from "../controllers/convergente.controller.js";
import { divergenteController } from "../controllers/divergente.controller.js";

const { getLaboratorios, getLaboratorioById, getEnsayosUsuario, getDeleteEnsayo, getDeleteLaboratorio, getEnsayos, postModLab } = fisicaController;
const { postEnsayoConvergente, postEnsayoConvergenteSave} = convergenteController;
const { postEnsayoDivergente, postEnsayoDivergenteSave} = divergenteController;

const fisicaRouter = express.Router();

/**
 * -----------------------------------------------------
 * Rutas - Laboratorios de Fisica
 * -----------------------------------------------------
 */
fisicaRouter.route("/").get(getLaboratorios);

fisicaRouter.route("/divergente").post(postEnsayoDivergente);

fisicaRouter.route("/divergentesave").post(postEnsayoDivergenteSave);

fisicaRouter.route("/convergente").post(postEnsayoConvergente);

fisicaRouter.route("/convergentesave").post(postEnsayoConvergenteSave);

fisicaRouter.route("/modificarLab").post(postModLab); //para el grupo de gestion

/**
 * -----------------------------------------------------
 * Rutas con pasaje de parametro en la URL
 * -----------------------------------------------------
 */
fisicaRouter.route("/:idLaboratorio").get(getLaboratorioById);

fisicaRouter.route("/delete/ensayo/:idEnsayo").get(getDeleteEnsayo); //para el grupo de gestion

fisicaRouter.route("/delete/laboratorio/:idLaboratorio").get(getDeleteLaboratorio); //para el grupo de gestion

fisicaRouter.route("/ensayos/:idLaboratorio").get(getEnsayos); //para el grupo de gestion

fisicaRouter.route("/:idLaboratorio/:idUsuario").get(getEnsayosUsuario);


export default fisicaRouter;
