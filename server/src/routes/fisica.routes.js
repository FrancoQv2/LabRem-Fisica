import express from "express"
import { fisicaController } from "../controllers/fisica.controller.js"
import { convergenteController } from "../controllers/convergente.controller.js"
import { divergenteController } from "../controllers/divergente.controller.js"

const { getLaboratorios, getLaboratorio, getEnsayosUsuario, deleteEnsayo, postLaboratorio, deleteLaboratorio, getEnsayos, updateLaboratorio } = fisicaController
const { getEnsayosConvergentes, postEnsayoConvergente} = convergenteController
const { getEnsayosDivergentes, postEnsayoDivergente} = divergenteController

const fisicaRouter = express.Router()

// -----------------------------------------------------
// Endpoints - Laboratorios de Física Experimental Básica
// -----------------------------------------------------

fisicaRouter.route("/")
    .get(getLaboratorios)
    .post(postLaboratorio)
    
fisicaRouter.route("/convergente")
    .get(getEnsayosConvergentes)
    .post(postEnsayoConvergente)

fisicaRouter.route("/divergente")
    .get(getEnsayosDivergentes)
    .post(postEnsayoDivergente)

// -----------------------------------------------------
// Endpoints para Gestión
// -----------------------------------------------------

fisicaRouter.route("/laboratorios/:idLaboratorio")
    .get(getLaboratorio)
    .post(updateLaboratorio)
    .delete(deleteLaboratorio)

fisicaRouter.route("/ensayos/:idLaboratorio")
    .get(getEnsayos)

fisicaRouter.route("/ensayos/:idEnsayo")
    .delete(deleteEnsayo)

// -----------------------------------------------------
// Endpoints con pasaje de parametro en la URL
// -----------------------------------------------------

fisicaRouter.route("/:idLaboratorio")
    .get(getLaboratorio)

fisicaRouter.route("/:idLaboratorio/:idUsuario")
    .get(getEnsayosUsuario)

export default fisicaRouter
