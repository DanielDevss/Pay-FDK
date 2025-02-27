import prisma from "../../../db.js";

export const findKey = async(key) => {
    try {
        return await prisma.userKey.findMany({
            where : { key },
            include : {
                user: true
            }
        })
    } catch (error) {
        return null
    }
}