import { db } from "../index.js"
import { delay } from "../lib/delay.js"
import axios from "axios"

const idLaboratorio = 1

const queries = {
    getEnsayosConvergentes: "CALL sp_dameEnsayosConvergentes();",
    postEnsayoConvergentes: "CALL sp_crearEnsayo(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);"
}

const convergenteController = {}

// -----------------------------------
// Métodos GET
// -----------------------------------

convergenteController.getEnsayosConvergentes = async (req, res) => {
    console.log("--------------------")
    console.log(`--> getEnsayosConvergentes - ${JSON.stringify(req.params)}`)

    const data = await db.query(
        queries.getEnsayosConvergentes
    )

    let dataParsed = []
    data.map((ensayo) => {
        const newEnsayo = {}
        newEnsayo.Usuario       = ensayo.idUsuario
        newEnsayo.Fecha         = ensayo.Fecha
        newEnsayo.Hora          = ensayo.Hora
        newEnsayo.distanciaLente    = ensayo.datosEntrada.distanciaLente
        newEnsayo.distanciaPantalla = ensayo.datosEntrada.distanciaPantalla
        newEnsayo.diafragma         = ensayo.datosEntrada.diafragma
        dataParsed.push(newEnsayo)
    })

    await res.status(200).send(dataParsed)
}

// -----------------------------------
// Métodos POST
// -----------------------------------

convergenteController.postEnsayoConvergente = async (req, res) => {
    console.log(`-\n--> postEnsayoConvergente - ${JSON.stringify(req.body)}\n---`)
    console.log(req.body)

    const {
        idUsuario,
        distanciaLente,
        distanciaPantalla,
        diafragma
    } = req.body

    if (distanciaLente < 0 || distanciaLente > 900) {
        res.status(400)
            .send("La distancia entre el lente y el foco es menor a 0 o mayor a 900")
    } else if (distanciaPantalla < 0 || distanciaPantalla > 900) {
        res.status(400)
            .send("La distancia entre el lente y la pantalla es menor a 0 o mayor a 900")
    } else if (
        diafragma != "sin diafragma" && 
        diafragma != "diafragma central" && 
        diafragma != "diafragma periferico" && 
        diafragma != "filtro rojo"
    ) {
        res.status(400)
            .send("Diafragma inválido")
    } else {
        const datosEntrada = {
            distanciaLente: distanciaLente,
            distanciaPantalla: distanciaPantalla,
            diafragma: diafragma
        }

        const datosSalida = { }

        try {
            db.query(
                queries.postEnsayoConvergentes,
                {
                    replacements: {
                        idUsuario: idUsuario,
                        datosEntrada: JSON.stringify(datosEntrada),
                        datosSalida: JSON.stringify(datosSalida),
                        idLaboratorio: idLaboratorio
                    }
                }
            )

            res.status(200).json({ msg: "Parámetros correctos. Guardado en DB" })
        } catch (error) {
            console.error("-> ERROR postEnsayoConvergentes:", error)
            res.status(500).json({ msg: "Error en postEnsayoConvergentes!" })
        }
    }
}

export { convergenteController }
