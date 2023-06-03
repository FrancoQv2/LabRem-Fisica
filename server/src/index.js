import * as dotenv from "dotenv"
// Toma las variables configuradas por ENV dentro del docker-compose / dockerfile
// dotenv.config({ path: './.env'})
dotenv.config()

import expressServer from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import cors from "cors"

import { dbConnection } from "./db/dbconfig.js"

import fisicaRouter from "./routes/fisica.routes.js"
import { validacionController } from "./controllers/validacion.controller.js"
const {verificar} = validacionController

const app = expressServer()
const PORT = process.env.SERVER_PORT || 3000

//Necesitamos body-parser para formatear los post en express
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/',verificar)
app.use("/api/fisica", fisicaRouter)

// app.use("/public-key", "id_rsa.pub") // formato x.509

// ---------------------------------------------------------------

// Levantamos el servidor para que escuche peticiones
app.listen(PORT, () => {
    console.log(`LabRem Fisica - Server on ${process.env.LOCALHOST_PORT}:${PORT}`)
})

export const db = dbConnection
