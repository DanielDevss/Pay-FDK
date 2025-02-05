import prisma from "../../../prisma.js";

export const createUserService = async (data) => {
    try {
        return prisma.user.create({ data })
    } catch (error) {
        throw new Error(error.message);
    }
}