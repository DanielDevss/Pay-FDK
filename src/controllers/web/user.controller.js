import { ZodError } from "zod"
import { formatValidationErrors, generarUsername } from "../../libs/formats.js"
import { schemeNewUser } from "../../schemes/web/user.scheme.js"
import { createUserService } from "../../services/web/user.service.js";
import { passwordHash } from "../../libs/hash.js";

/**
 * Crear usuario
 */
export const createUser = async (req, res) => {
    try {
        // Validar datos
        schemeNewUser.parse(req.body);
        const hash = await passwordHash(req.body.password);
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            rfc: req.body.rfc,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
            username: generarUsername(req.body.firstName)
        }

        // Crear usuario
        const account = await createUserService(data);

        // Enviar correo de confirmación
        res.status(201).json({ message: "Usuario creado", data: account });
    } catch (error) {

        if (error instanceof ZodError) {
            const formattedErrors = formatValidationErrors(error);
            return res.status(400).json({ errors: formattedErrors });
        }

        // Si el error no es de Zod, devolver un mensaje genérico
        res.status(500).json({ message: error.message });
    }
};

/**
 * Recuperar usuario
 */
export const readUser = async (req, res) => {
    res.send("Recuperar usuario")
}

/**
 * Actualizar usuario 
 */
export const updateUser = async (req, res) => {
    res.send("Actualizar usuario")
}

/**
 * Eliminar cuenta 
 */
export const deleteUser = async (req, res) => {
    res.send("Eliminar cuenta")
}