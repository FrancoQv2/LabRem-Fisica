import { db } from "../index.js"
import { delay } from "../lib/delay.js"
import axios from "axios"

const idLaboratorio = 2

const queries = {
    getEnsayosDivergentes: "CALL sp_dameEnsayosDivergentes();",
    postEnsayoDivergentes: "CALL sp_crearEnsayo(:idUsuario,:datosEntrada,:datosSalida,:idLaboratorio);"
}

const divergenteController = {}

// -----------------------------------
// Métodos GET
// -----------------------------------

divergenteController.getEnsayosDivergentes = async (req, res) => {
    console.log("--------------------")
    console.log(`--> getEnsayosDivergentes - ${JSON.stringify(req.params)}`)

    const data = await db.query(
        queries.getEnsayosDivergentes
    )

    let dataParsed = []
    data.map((ensayo) => {
        const newEnsayo = {}
        newEnsayo.Usuario   = ensayo.idUsuario
        newEnsayo.Fecha     = ensayo.Fecha
        newEnsayo.Hora      = ensayo.Hora
        newEnsayo.distanciaLente        = ensayo.datosEntrada.distanciaLente
        newEnsayo.distanciaLenteLente   = ensayo.datosEntrada.distanciaLenteLente
        newEnsayo.distanciaPantalla     = ensayo.datosEntrada.distanciaPantalla
        dataParsed.push(newEnsayo)
    })

    await res.status(200).send(dataParsed)
}

// -----------------------------------
// Métodos POST
// -----------------------------------

divergenteController.postEnsayoDivergente = async (req, res) => {
    console.log(req.body)
    console.log(`---\n--> postEnsayoDivergente - ${JSON.stringify(req.body)}\n---`)

    const {
        idUsuario,
        distanciaLente,
        distanciaLenteLente,
        distanciaPantalla,
        diafragma
    } = req.body

    if (distanciaLente < 0 || distanciaLente > 700) {
        res.status(400)
            .send("La distancia entre el lente y el foco es menor a 0 o mayor a 700")
    } else if (distanciaLenteLente < 0 || distanciaLenteLente > 700) {
        res.status(400)
            .send("La distancia entre el lente y lente es menor a 0 o mayor a 700")
    } else if (distanciaPantalla < 0 || distanciaPantalla > 900) {
        res.status(400)
            .send("La distancia entre el lente y la pantalla es menor a 0 o mayor a 900")
    } else if (
        diafragma != "sin diafragma" && 
        diafragma != "diafragma central" && 
        diafragma != "diafragma periferico" && 
        diafragma != "filtro rojo"
    ) {
        res.status(400).send("Diafragma inválido")
    } else {

        const datosEntrada = {
            distanciaLente: distanciaLente,
            distanciaLenteLente: distanciaLenteLente,
            distanciaPantalla: distanciaPantalla,
            diafragma: diafragma
        }

        const datosSalida = { }

        try {
            db.query(
                queries.postEnsayoDivergentes,
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
            console.error("-> ERROR postEnsayoDivergentes:", error)
            res.status(500).json({ msg: "Error en postEnsayoDivergentes!" })
        }
    }
}

export { divergenteController }
