import { ZodError } from "zod"
import { formatValidationErrors } from "../../libs/formats.js"
import { authBodyScheme } from "../../schemes/admin/auth.scheme.js"
import { signInService } from "../../services/admin/auth.service.js"

export const signIn = async (req, res) => {
    try {
        // Validar las credenciales
        authBodyScheme.parse(req.body)

        const { email, password } = req.body

        const token = await signInService({email, password})

        if(!token) return res.status(401).json({ message: 'Credenciales incorrectas' })

        // Asignar el token a cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        })

        // Enviar respuesta
        res.json({ message: 'Sesión iniciada correctamente' })

    } catch (error) {

        if(error instanceof ZodError) {
            return res.status(400).json({ errors: formatValidationErrors(error) })
        }

        res.status(500).json({ message: error.message })
    }
}