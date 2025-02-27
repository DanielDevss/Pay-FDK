import prisma from "../../../db.js";

export const findKey = async(key) => {
    try {
        return await prisma.userKey.findMany({
            where : { key }
        })
    } catch (error) {
        return null
    }
}