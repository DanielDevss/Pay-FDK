import prisma from "../../db.js"
import { verifyJwt } from "../libs/jwt.js"
import { verifyAdminUser } from "../services/admin/auth.service.js"

// region Autenticación para administrador ( cliente )

export const authenticated = async (req,res,next) => {
    try {
        const token = req.cookies.token
    
        // Verificamos si el token existe
        if(!token) {
            res.status(401).json({
                message: "Usuario no autenticado"
            })
            return
        }
    
        // Verificar token
        const verifyToken = await verifyJwt(token)

        if(!verifyToken) {
            throw new Error("Usuario no autenticado");
        }

        // Agregamos el userId al request
        req.body.userId = verifyToken.id
        
        // Si todo esta bien continuamos
        next()
    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            message: "Usuario no autenticado"
        })        
    }
}

// autenticación para administrador ( admin )

export const authenticatedAdmin = async (req, res, next) => {
    try {
        // Obtener token
        const token = req.cookies.token

        // Verificar el token
        if(!token) return res.status(401).json({
          message: "Usuario no autenticado 1",
        });

        // Verificar token
        const verifyToken = await verifyJwt(token)
        if(!verifyToken || !verifyToken.userId) return res.status(401).json({
            message: "Usuario no autenticado 2",
        })

        // Validar que el usuario sea administrador
        const userIsValid = await verifyAdminUser(verifyToken.userId)
        if(!userIsValid) return res.status(403).json({message: "No tienes permisos para acceder a este panel"})

        // En caso de que todo este bien continuamos
        req.body.userId = verifyToken.userId
        req.body.userEmail = userIsValid.email
        req.body.userFirstName = userIsValid.firstName
        req.body.userLastName = userIsValid.lastName
        req.body.userUsername = userIsValid.username

        next();

    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            message: "Usuario no autenticado 3"
        })
    }
}

// region Autenticación para API

export const authenticatedApi = async(req, res, next) => {
    try {

        // Recuperar la llave de Bearer

        const bearer = req.headers.authorization;
        if(!bearer) return res.status(401).json({ message: "Unauthorized", status: 401 })
            
        // Validar que exista la llave en la DB
            
        const key = bearer.split(" ").pop();

        if (!key || key.length == 0) return res.status(401).json({ message: "Unauthorized", status: 401 })

        // Recuperamos el userKey de la DB
        const userKey = await prisma.userKey.findFirst({ where: { key }, include: { user: true } })
        if(!userKey) return res.status(401).json({ message: "Unauthorized", status: 401 })

        // Agregamos valores al body
        req.body.userKeyId = userKey.id
        req.body.userId = userKey.userId
        req.body.stripeAccountId = userKey.user.stripeAccountId
        req.body.stripeBankId = userKey.user.stripeBankAccountId

        // Damos por completo la autenticación
        next()

    } catch (error) {

        res.status(401).json({ message: "Unauthorized", status: 401, error: error.message })
        
    }
}