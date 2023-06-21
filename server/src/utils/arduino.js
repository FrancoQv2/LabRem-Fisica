import axios from "axios"
import { delay } from "./delay.js"

// const URL_ARDUINO = 'http://192.168.100.75:3031/api/control/arduino' // Cambiar por ip arduino
const URL_ARDUINO = "http://172.23.12.125:5033" // IP de wsl vista desde dev-teleco

export async function postArduino(diafragma, distanciaLente, distanciaPantalla) {
    let respuestaPost

    const body = {
        // [ Laboratorio (Fisica), Sub Laboratorio (Convergente), Inicio del experimento ]
        "Estado": [3, true, true],
        "Analogico": [diafragma, distanciaLente, distanciaPantalla]
    }

    try {
        respuestaPost = axios.post(`${URL_ARDUINO}/api/fisica`, body)
    } catch (error) {
        console.log(error);
    }
    
    return respuestaPost
}

export async function getArduino() {
    let response
    try {
        response = await axios.get(`${URL_ARDUINO}/api/fisica`)
    } catch (error) {
        console.log(error)
    }

    return response
}

// async function postEnsayoConvergenteTEST (req, res) {
//     console.log(`-\n--> postEnsayoConvergente - ${JSON.stringify(req.body)}\n---`)

//     const {
//         idUsuario,
//         distanciaLente,
//         distanciaPantalla,
//         diafragma
//     } = req.body

//     if (distanciaLente < 0 || distanciaLente > 900) {
//         res.status(400)
//             .send("La distancia entre el lente y el foco es menor a 0 o mayor a 900")
//     } else if (distanciaPantalla < 0 || distanciaPantalla > 900) {
//         res.status(400)
//             .send("La distancia entre el lente y la pantalla es menor a 0 o mayor a 900")
//     } else if (diafragma != "sin diafragma" && diafragma != "diafragma central" && diafragma != "diafragma periferico" && diafragma != "filtro rojo") {
//         res.status(400)
//             .send("Diafragma inválido")
//     } else {
//         let Diafragma = 0
//         switch (diafragma) {
//             case "diafragma central":
//                 Diafragma = 1
//                 break
//             case "diafragma periferico":
//                 Diafragma = 2
//                 break
//             case "filtro rojo":
//                 Diafragma = 3
//                 break
//             default:
//                 break
//         }
        
//         const body = {
//             "Estado": [3, true, true],
//             "Analogico": [Diafragma, distanciaLente, distanciaPantalla]
//         }

//         let respuestaGet
//         let message = ''

//         try {
//             const respuestaPost = axios.post(`${URL_ARDUINO}/1`, body)
//             let i = 0
//             do {
//                 respuestaGet = await axios.get(`${URL_ARDUINO}/${i}`)
//                 await delay(3000)
//                 i = i + 1
//             } while (respuestaGet.data.Estado[2])
//             switch (respuestaGet.data.Error) {
//                 case 0:
//                     message = "laboratorio ok"
//                     break
//                 case 1:
//                     message = "Error en el angulo limite de azimut"
//                     break
//                 case 2:
//                     message = "Error en el angulo limite de elevacion"
//                     break
//                 default:
//                     message = "Error de laboratorio incorrecto"
//                     break
//             }
//             res.status(200).json(message)
//         } catch (error) {
//             console.error("-> ERROR postEnsayoConvergente:", error)
//         }
//     }
// }

// async function postEnsayoDivergenteTEST (req, res) {
//     const {
//         idUsuario,
//         distanciaLente,
//         distanciaLenteLente,
//         distanciaPantalla,
//         diafragma
//     } = req.body

//     if (distanciaLente < 0 || distanciaLente > 700) {
//         res.status(400).json("la distancia entre el lente y el foco es menor a 0 o mayor a 700")
//     } else if (distanciaLenteLente < 0 || distanciaLenteLente > 700) {
//         res.status(400).json("la distancia entre el lente y lente es menor a 0 o mayor a 700")
//     } else if (distanciaPantalla < 0 || distanciaPantalla > 900) {
//         res.status(400).json("la distancia entre el lente y la pantalla es menor a 0 o mayor a 900")
//     } else if (diafragma != "sin diafragma" && diafragma != "diafragma central" && diafragma != "diafragma periferico" && diafragma != "filtro rojo") {
//         res.status(400).json("el diafragma no es valido")
//     } else {
//         let Diafragma = 0
//         switch (diafragma) {
//             case "diafragma central":
//                 Diafragma = 1
//                 break
//             case "diafragma periferico":
//                 Diafragma = 2
//                 break
//             case "filtro rojo":
//                 Diafragma = 3
//                 break
//             default:
//                 break
//         }
//         const url = 'http://192.168.100.75:3031/api/control/arduino'//cambiar por ip arduino
//         const body = {
//             "Estado": [3, false, true],
//             "Analogico": [Diafragma, distanciaLente, distanciaPantalla]
//         }
//         let respuestaGet
//         let Msj = ''
//         try {
//             const respuestaPost = axios.post(`${url}/1`, body)
//             let i = 0
//             do {
//                 respuestaGet = await axios.get(`${url}/${i}`)
//                 await delay(3000)
//                 i = i + 1
//             } while (respuestaGet.data.Estado[2])
//             switch (respuestaGet.data.Error) {
//                 case 0:

//                     Msj = "laboratorio ok"
//                     break
//                 case 1:
//                     Msj = "Error en el angulo limite de azimut"
//                     break
//                 case 2:
//                     Msj = "Error en el angulo limite de elevacion"
//                     break
//                 default:
//                     Msj = "Error de laboratorio incorrecto"
//                     break
//             }
//             res.status(200).json(Msj)
//         } catch (error) {
//             console.error("-> ERROR postEnsayoDivergente:", error)
//         }
//     }
// }
