import { db } from "../index.js"
import axios from "axios"

const idLaboratorio = 1
const URL_ARDUINO = "http://192.168.100.75:5032/fisica/convergente"

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
        newEnsayo.Usuario = ensayo.idUsuario
        newEnsayo.Fecha = ensayo.Fecha
        newEnsayo.Hora = ensayo.Hora
        newEnsayo.distanciaFL = ensayo.datosEntrada.distanciaFL
        newEnsayo.distanciaLP = ensayo.datosEntrada.distanciaLP
        newEnsayo.diafragma = ensayo.datosEntrada.diafragma
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
        distanciaFL,
        distanciaLP,
        diafragma
    } = req.body

    if (
        distanciaFL < 0 ||
        distanciaFL > 900
    ) {
        res.status(400)
            .send("La distancia entre el lente y el foco es menor a 0 o mayor a 900")
    } else if (
        distanciaLP < 0 ||
        distanciaLP > 900
    ) {
        res.status(400)
            .send("La distancia entre el lente y la pantalla es menor a 0 o mayor a 900")
    } else if (
        diafragma != "Sin diafragma" &&
        diafragma != "Central" &&
        diafragma != "Periférico" &&
        diafragma != "Filtro rojo"
    ) {
        res.status(400)
            .send("Diafragma inválido")
    } else {
        const datosEntrada = {
            distanciaFL: distanciaFL,
            distanciaLP: distanciaLP,
            diafragma: diafragma
        }

        const datosSalida = {}

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

            res.status(200).json("Parámetros correctos. Guardado en DB")
        } catch (error) {
            console.error("-> ERROR postEnsayoConvergentes:", error)
            res.status(500).json("Falló el ensayo Convergente!")
        }
    }
}

export { convergenteController }
