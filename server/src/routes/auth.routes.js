import express from "express"
import { authController } from "../controllers/auth.controller.js"

const { validarToken } = authController

const authRouter = express.Router()

// ------------------------------------------------------------
// Endpoints para validación de Token
// ------------------------------------------------------------

authRouter.route("/token")
    .post(validarToken)

export default authRouter
