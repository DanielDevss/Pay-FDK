import prisma from "../../../db.js"

export const getKeysService = async (userId) => {
    try {
        const keys = await prisma.userKey.findMany({
            where: { userId },
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })

        return keys.map(record => ({
            id: record.id,
            key: record.key,
            name: record.name,
            production: record.production,
            username: record?.user?.username,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt
        }))

    } catch (error) {
        // Crear un error legible
        throw Error(`Error al obtener las llaves: ${error.message}`)
    }
}