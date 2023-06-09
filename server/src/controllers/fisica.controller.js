import { db } from "../index.js"

const fisicaController = {}

const queries = {
    getLaboratorios:    "CALL sp_dameLaboratorios();",
    getEnsayos:         "CALL sp_dameEnsayos(:idLaboratorio);",

    getLaboratorio:     "CALL sp_dameLaboratorio(:idLaboratorio);",
    getEnsayosUsuario:  "CALL sp_dameEnsayosUsuario(:idLaboratorio,:idUsuario);",

    postLaboratorio:    "CALL sp_crearLaboratorio(:nombre,:descripcion);",
    updateLaboratorio:  "CALL sp_modificarLaboratorio(:idLaboratorio,:area,:nombre,:descripcion);",

    deleteLaboratorio:  "CALL sp_borrarLaboratorio(:idLaboratorio);",
    deleteEnsayo:       "CALL sp_borrarEnsayo(:idEnsayo);"
}

// -----------------------------------
// Métodos GET
// -----------------------------------

fisicaController.getLaboratorios = async (req, res) => {
    console.log("--------------------")
    console.log(`--> getLaboratorios - ${JSON.stringify(req.params)}`)

    try {
        const data = await db.query(
            queries.getLaboratorios
        )

        if (!data.length) {
            await res.status(404).send("No existen laboratorios!")
        } else {
            await res.status(200).send(data)
        }
    } catch (error) {
        console.error("-> ERROR getLaboratorios:", error)
        await res.status(500).send('Error en getLaboratorios!')
    }
}

fisicaController.getLaboratorio = async (req, res) => {
    console.log("--------------------")
    console.log(`--> getLaboratorio - ${JSON.stringify(req.params)}`)

    const { idLaboratorio } = req.params

    try {
        const data = await db.query(
            queries.getLaboratorio,
            {
                replacements: {
                    idLaboratorio: idLaboratorio
                }
            }
        )

        if (!data.length) {
            await res.status(404).send("No existe el laboratorio buscado!")
        } else {
            await res.status(200).send(data[0])
        }
    } catch (error) {
        console.error("-> ERROR getLaboratorio:", error)
        await res.status(500).send('Error en getLaboratorio!')
    }
}

fisicaController.getEnsayos = async (req, res) => {
    console.log("--------------------")
    console.log(`--> getEnsayos - ${JSON.stringify(req.params)}`)

    const { idLaboratorio } = req.params

    try {
        const data = await db.query(
            queries.getEnsayos,
            {
                replacements: {
                    idLaboratorio: idLaboratorio
                }
            }
        )

        if (!data.length) {
            await res.status(404).send("No existen ensayos para este laboratorio!")
        } else {
            let dataParsed = []

            if (idLaboratorio == 1) {
                data.map((ensayo, index) => {
                    const newEnsayo = {}
                    newEnsayo.index     = index + 1
                    newEnsayo.Fecha     = ensayo.Fecha
                    newEnsayo.Hora      = ensayo.Hora
                    newEnsayo.distanciaFL = ensayo.datosEntrada.distanciaFL
                    newEnsayo.distanciaLP = ensayo.datosEntrada.distanciaLP
                    newEnsayo.diafragma   = ensayo.datosEntrada.diafragma
                    dataParsed.push(newEnsayo)
                })
            } else if (idLaboratorio == 2) {
                data.map((ensayo, index) => {
                    const newEnsayo = {}
                    newEnsayo.index = index + 1
                    newEnsayo.Fecha = ensayo.Fecha
                    newEnsayo.Hora  = ensayo.Hora
                    newEnsayo.distanciaFL = ensayo.datosEntrada.distanciaFL
                    newEnsayo.distanciaLL = ensayo.datosEntrada.distanciaLL
                    newEnsayo.distanciaLP = ensayo.datosEntrada.distanciaLP
                    dataParsed.push(newEnsayo)
                })
            }

            console.log(dataParsed)

            await res.status(200).json(dataParsed)
        }
    } catch (error) {
        console.error("-> ERROR getEnsayos:", error)
        await res.status(500).send('Error en getEnsayos!')
    }
}

fisicaController.getEnsayosUsuario = async (req, res) => {
    console.log("--------------------")
    console.log(`--> getEnsayosUsuario - ${JSON.stringify(req.params)}`)

    const { idLaboratorio, idUsuario } = req.params

    try {
        const data = await db.query(
            queries.getEnsayosUsuario,
            {
                replacements: {
                    idLaboratorio: idLaboratorio,
                    idUsuario: idUsuario,
                }
            }
        )

        console.log(data);

        if (!data.length) {
            await res.status(404).send("No existen ensayos realizados por este alumno para este laboratorio!")
        } else {
            let dataParsed = []

            if (idLaboratorio == 1) {
                data.map((ensayo, index) => {
                    const newEnsayo = {}
                    newEnsayo.index     = index + 1
                    newEnsayo.Fecha     = ensayo.Fecha
                    newEnsayo.Hora      = ensayo.Hora
                    newEnsayo.distanciaFL = ensayo.datosEntrada.distanciaFL
                    newEnsayo.distanciaLP = ensayo.datosEntrada.distanciaLP
                    newEnsayo.diafragma   = ensayo.datosEntrada.diafragma
                    dataParsed.push(newEnsayo)
                })
            } else if (idLaboratorio == 2) {
                data.map((ensayo, index) => {
                    const newEnsayo = {}
                    newEnsayo.index = index + 1
                    newEnsayo.Fecha = ensayo.Fecha
                    newEnsayo.Hora  = ensayo.Hora
                    newEnsayo.distanciaFL = ensayo.datosEntrada.distanciaFL
                    newEnsayo.distanciaLL = ensayo.datosEntrada.distanciaLL
                    newEnsayo.distanciaLP = ensayo.datosEntrada.distanciaLP
                    dataParsed.push(newEnsayo)
                })
            }

            console.log(dataParsed)

            await res.status(200).json(dataParsed)
        }
    } catch (error) {
        console.error("-> ERROR getEnsayosUsuario:", error)
        await res.status(500).send('Error en getEnsayosUsuario!')
    }
}

// -----------------------------------
// Métodos POST
// -----------------------------------

fisicaController.postLaboratorio = async (req, res) => {
    console.log("--------------------")
    console.log(`--> postLaboratorio - ${JSON.stringify(req.body)}`)

    const { nombre, descripcion } = req.body
  
    if (nombre == null || nombre == "") {
        res.status(400).json("El nombre no puede estar vacío!")
    } else if (descripcion == null || descripcion == "") {
        res.status(400).json("La descripción no puede estar vacía!")
    } else {
        try {
            db.query(
                queries.postLaboratorio,
                {
                    replacements: {
                        nombre: nombre,
                        descripcion: descripcion,
                    }
                }
            )

            res.status(200).json(`Laboratorio '${nombre}' creado exitosamente!`)
        
        } catch (error) {
            console.error("-> ERROR postLaboratorio:", error)
            res.status(500).send('Error en postLaboratorio!')
        }
    }
}

fisicaController.updateLaboratorio = async (req, res) => {
    console.log("--------------------")
    console.log(`--> updateLaboratorio - ${JSON.stringify(req.body)}`)

    const { idLaboratorio, area, nombre, descripcion } = req.body
    
    const response = await db.query(
        queries.getLaboratorio,
        {
            replacements: {
                idLaboratorio: idLaboratorio
            }
        }
    )

    if (response[0] == null) {
        res.status(400).json("Código no asociado a ningun laboratorio existente")
    } else if (area == null || area == "") {
        res.status(400).json("El área no puede estar vacía!")
    } else if (nombre == null || nombre == "") {
        res.status(400).json("El nombre no puede estar vacío!")
    } else if (descripcion == null || descripcion == "") {
        res.status(400).json("La descripción no puede estar vacía!")
    } else {

        try {
            db.query(
                queries.updateLaboratorio,
                {
                    replacements: {
                        idLaboratorio: idLaboratorio,
                        area: area,
                        nombre: nombre,
                        descripcion: descripcion,
                    }
                }
            )
            res.status(200).json("Laboratorio modificado correctamente!")
        } catch (error) {
            console.error("-> ERROR updateLaboratorio:", error)
            res.status(400).json("Error en updateLaboratorio!")
        }
    }
}

// -----------------------------------
// Métodos DELETE
// -----------------------------------

fisicaController.deleteLaboratorio = async (req, res) => {
    console.log("--------------------")
    console.log(`--> deleteLaboratorio - ${JSON.stringify(req.params)}`)

    const { idLaboratorio } = req.params

    try {
        const response = await db.query(
            queries.deleteLaboratorio,
            {
                replacements: {
                    idLaboratorio: idLaboratorio
                }
            }
        )
    
        if (!response.length) {
            await res.status(404).send(response)
        } else {
            await res.status(200).send(response)
        }
    } catch (error) {
        console.error("-> ERROR deleteLaboratorio:", error)
        await res.status(500).send('Error en deleteLaboratorio!')
    }
}

fisicaController.deleteEnsayo = async (req, res) => {
    const { idEnsayo } = req.params

    try {
        const response = await db.query(
            queries.deleteEnsayo,
            {
                replacements: {
                    idEnsayo: idEnsayo
                }
            }
        )
    
        if (!response.length) {
            await res.status(404).send(response[0])
        } else {
            await res.status(200).send(response[0])
        }
    } catch (error) {
        console.error("-> ERROR deleteEnsayo:", error)
        await res.status(500).send('Error en deleteEnsayo!')
    }
}

export { fisicaController }
