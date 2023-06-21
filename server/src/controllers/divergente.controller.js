import { db } from "../index.js"

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
        newEnsayo.distanciaFL = ensayo.datosEntrada.distanciaFL
        newEnsayo.distanciaLL = ensayo.datosEntrada.distanciaLL
        newEnsayo.distanciaLP = ensayo.datosEntrada.distanciaLP
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
        distanciaFL,
        distanciaLL,
        distanciaLP,
        diafragma
    } = req.body

    if (
        distanciaFL < 0 ||
        distanciaFL > 700
    ) {
        res.status(400)
            .send("La distancia entre el lente y el foco es menor a 0 o mayor a 700")
    } else if (
        distanciaLL < 0 ||
        distanciaLL > 700
    ) {
        res.status(400)
            .send("La distancia entre el lente y lente es menor a 0 o mayor a 700")
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
        res.status(400).send("Diafragma inválido")
    } else {

        const datosEntrada = {
            distanciaFL:    distanciaFL,
            distanciaLL:    distanciaLL,
            distanciaLP:    distanciaLP,
            diafragma:      diafragma
        }

        const datosSalida = {}

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

            res.status(200).json("Parámetros correctos. Guardado en DB")
        } catch (error) {
            console.error("-> ERROR postEnsayoDivergentes:", error)
            res.status(500).json("Falló el ensayo Divergente!")
        }
    }
}

export { divergenteController }
