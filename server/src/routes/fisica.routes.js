import express from "express";
import { fisicaController } from "../controllers/fisica.controller.js";
import { convergenteController } from "../controllers/convergente.controller.js";
import { divergenteController } from "../controllers/divergente.controller.js";

const { getLaboratorios, getLaboratorioById, getEnsayosUsuario } = fisicaController;
const { postLabConvergente, getEnsayosConvergente } = convergenteController;
const { postLabDivergente, getEnsayosDivergente } = divergenteController;

const fisicaRouter = express.Router();

/**
 * -----------------------------------------------------
 * Rutas - Laboratorios de Fisica
 * -----------------------------------------------------
 */
fisicaRouter.route("/").get(getLaboratorios);

fisicaRouter.route("/divergente").get(getEnsayosDivergente).post(postLabDivergente);

fisicaRouter.route("/convergente").get(getEnsayosConvergente).post(postLabConvergente);

/**
 * -----------------------------------------------------
 * Rutas con pasaje de parametro en la URL
 * -----------------------------------------------------
 */
fisicaRouter.route("/:idLaboratorio").get(getLaboratorioById);

fisicaRouter.route("/divergente/:idUsuario").get(getEnsayosUsuario);

fisicaRouter.route("/convergente/:idUsuario").get(getEnsayosUsuario);

fisicaRouter.route("/:idLaboratorio/:idUsuario").get(getEnsayosUsuario);


export default fisicaRouter;
