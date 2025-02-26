import { ZodError } from "zod";
import { schemeAuth } from "../../schemes/web/auth.scheme.js";
import { authService } from "../../services/web/auth.service.js";
import { formatValidationErrors } from "../../libs/formats.js";

/**
 * LINK Inicio de sesion
 */

export const signIn = async (req, res) => {
    try {
        // Validacion
        schemeAuth.parse(req.body);

        // Verificar y crear token
        const token = await authService(req.body);

        // En caso de no existir
        if(!token) return res.status(401).json({ message: "Credenciales incorrectas" });

        // Agregamos a cookies
        res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "strict"
        })

        // Respondemos
        res.status(200).json({ message: "Inicio de sesión correcto" });

    } catch (error) {
        if(error instanceof ZodError){
            const formattedErrors = formatValidationErrors(error);
            return res.status(400).json({ errors: formattedErrors });
        }
        res.status(500).json({ message: error.message });
    }
}


/**
 * LINK Verificar sesion
 */

export const verifyAuth = async(req, res) => {
    res.json({data: {verify: true}})
}