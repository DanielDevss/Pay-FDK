import prisma from "../../../db.js"
import { verifyPassword } from "../../libs/hash.js"
import { createJwt } from "../../libs/jwt.js"

// region Verificar si el usuario es admin

export const verifyAdminUser = async (userId) => {
    try {
        // En caso de no existir el id
        if(!userId) return false

        // Verificamos si el usuario es admin
        const user = await prisma.user.findFirst({ where: { id: userId, rol: 'admin' } })
        if(!user) return false

        // Si esta todo bien retornamos true
        return user
    } catch (error) {
        // Si hay un error imprimimos el mensaje y retornamos false
        console.log(error.message);
        return false
    }
}

// region Inciar sesion y crear el jwt

export const signInService = async({ email, password }) => {
    try {
        // Verificamos que exista el usuario
        const user = await prisma.user.findFirst({ where: { email, rol: "admin" } })
        if(!user || !await verifyPassword(password, user.password)) return false
        // Creamos el token
        const payload = { userId: user.id }
        const token = await createJwt(payload)

        // Retornamos el token
        return token
    } catch (error) {
        throw new Error(`No se pudo iniciar sesión con el correo ${email} y contraseña.`)	
    }
}