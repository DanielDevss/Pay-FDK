import prisma from "../../../prisma.js";

export const createKeyService = async (data) => { 
    try {
        return await prisma.userKey.create({
            data
        })
    } catch (error) {
        throw new Error(`Error al crear una llave: ${error.message}`)
    }
}

export const getKeysService = async (userId) => {
    try {
        return await prisma.userKey.find({ where: { userId } })
    } catch (error) {
        throw new Error(`Error al crear obtener los keys: ${error.message}`)
    }
} 
