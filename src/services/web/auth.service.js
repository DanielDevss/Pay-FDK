import prisma from "../../../db.js";
import { verifyPassword } from "../../libs/hash.js";
import { createJwt } from "../../libs/jwt.js";

export const authService = async ({ email, password }) => {
    try {
        const user = await prisma.user.findFirst({
            where : {email}
        });

        // En caso de no existir
        if(!user) return false

        // Verificar la contraseña
        if(!verifyPassword(password, user.password)) return false

        // Creamos el token
        const token = createJwt({ id: user.id });

        // Devolvemos un token
        return token

    } catch (error) {
        throw new Error(error.message);
    }
}