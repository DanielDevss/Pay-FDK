import { verifyJwt } from "../libs/jwt.js"

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
        console.log(error)
        res.status(401).json({
            message: "Usuario no autenticado"
        })        
    }
}