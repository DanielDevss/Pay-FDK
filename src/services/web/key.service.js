import prisma from "../../../db.js";

/**
 * Generar el key en la DB
 */
export const createKeyService = async (data) => { 
    try {
        return await prisma.userKey.create({
            data
        })
    } catch (error) {
        throw new Error(`Error al crear una llave: ${error.message}`)
    }
}

/**
 * Editar una key
 */

export const updateKeyService = async (data, id) => {
    try {
        return await prisma.userKey.update({
            where: { id },
            data
        })
    } catch (error) {
        throw new Error(`Error al actualizar la llave: ${error.message}`)
    }
}

/**
 * Obtener keys de la DB
 */
export const getKeysService = async (userId) => {
    try {
        return await prisma.userKey.findMany({
            where: { userId }
        })
    } catch (error) {
        throw new Error(`Error al crear obtener las llaves: ${error.message}`)
    }
} 

/**
 * Eliminar registro
 */

export const deleteKeyService = async(id) =>{
    try {
        return await prisma.userKey.delete({
            where: { id }
        })
    } catch (error) {
        throw new Error(`Error al eliminar la llave: ${error.message}`)
    }
}