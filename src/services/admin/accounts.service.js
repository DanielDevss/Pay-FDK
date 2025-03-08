import prisma from "../../../db.js"

export const getAllService = async (userId) => {
    try {
        return await prisma.user.findMany()
    } catch (error) {
        throw new Error(`No se obtuvieron los registros: ${error.message}`)
    }
}