import { ZodError } from "zod";
import { schemeNewKey } from "../../schemes/web/keys.scheme.js";
import { createKeyService, deleteKeyService, getKeysService, updateKeyService } from "../../services/web/key.service.js"
import { formatValidationErrors } from "../../libs/formats.js";

/**
* Crear nueva credencial
*/
export const createKey = async (req, res) => {
    try {
        // Recuperar el body
        const body = req.body;

        // Validar body
        schemeNewKey.parse(body)

        // Crear el key
        const data = await createKeyService(body)

        // Retornar una respuesta
        res.json({ message: "Se ha creado un una nueva llave de acceso.", data })
    } catch (error) {
        // Verificamos que sea instancia de Zod
        if (error instanceof ZodError) {
            return res.status(400).json({
                errors: formatValidationErrors(error)
            })
        }
        // En caso de que no instancia de Zod
        res.status(500).json({ message: error.message })
    }
}

/**
 * Actualizar la llave
 */

export const updateKey = async (req, res) => {
    try {
        // Recuperar datos necesarios
        const id = req.params.id
        const body = req.body
        
        // Validar datos
        schemeNewKey.parse(body)

        // Actualizar registro
        const data = await updateKeyService(body, id)

        // Retornar respuesta
        res.json({
            message: "La llave ha sido actualizada de forma correcta.",
            data
        })
    } catch (error) {
        // Verificamos si el error es instancia de Zod
        if(error instanceof ZodError) {
            return res.status(400).json({
                errors: formatValidationErrors(error)
            })
        }
        // Si no retornamos un error normal
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Recuperar las llaves
 */

export const getKeys = async (req, res) => {
    try {
        const userId = req.body.userId;
        const data = await getKeysService(userId)
        res.json({ message: "Llaves de acceso obtenidas correctamente", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


/**
 * Eliminar un registro
 */

export const deleteKey = async(req,res) => {
    try {
        const id = req.params.id
        const keyDeleted = await deleteKeyService(id)
        res.json({
            message:"Se ha eliminado la llave de forma correcta",
            data: keyDeleted
        }) 
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}