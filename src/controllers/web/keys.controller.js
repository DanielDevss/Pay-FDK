import { createKeyService, getKeysService } from "../../services/web/key.service.js"

 /**
 * Crear nueva credencial
 */
export const createKey = async (req, res) => {
    try {
        console.log(req.body)
        const data = await createKeyService(req.body)
        res.json({ message: "Se ha creado un una nueva llave de acceso.", data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/**
 * Recuperar las llaves
 */

export const getKeys = async(req, res) => {
    try{
	const userId = req.body.userId
	const data = await getKeysService(userId)
	res.json({message: "Llaves de acceso obtenidas correctamente", data})
    }
    catch(error){
	res.status(500).json({message: error.message})	
    }
}
