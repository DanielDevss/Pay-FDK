import { ZodError } from "zod"
import { formatValidationErrors, generarUsername } from "../../libs/formats.js"
import { schemeNewUser, schemeUserStripeComplete } from "../../schemes/web/user.scheme.js"
import { accountAddFilesService, addBankAccountService, completeUserConnect, createUserService, getBankAccountService, getUserService, uploadFileAccountService } from "../../services/web/user.service.js";
import { passwordHash } from "../../libs/hash.js";
import { schemeNewBankAccount } from "../../schemes/web/bank.scheme.js";

/**
 * LINK Crear usuario
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
 * LINK Completar cuenta de Stripe Connect
 */

export const completeDataConnect = async (req, res) => {
    // Preparamos la información
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userId = req.body.userId;
    const { dob, address, business } = req.body;

    try {
        schemeUserStripeComplete.parse(req.body)
        // Completamos la informacion de Stripe
        const data = await completeUserConnect(userId, dob, address, userIp, business);

        // Retornar una respuesta
        res.json({ message: "Información actualizada", data });

    } catch (error) {
        // Verificamos si el error es de Zod
        if (error instanceof ZodError) {
            const formattedErrors = formatValidationErrors(error);
            return res.status(400).json({ errors: formattedErrors });
        }
        // Si no es un error de Zod devolver un mensaje genérico
        res.status(500).json({ message: error.message });
    }
}

/** 
 * LINK Agregar cuenta de banco
 */

export const addBankAccount = async (req, res) => {
    try {
        // Recuperar datos para guardar
        const userId = req.body.userId
        const bankAccount = req.body

        // Validar información del formulario
        schemeNewBankAccount.parse(bankAccount)

        // Registrar banco
        const data = await addBankAccountService(bankAccount, userId)

        // Retornar una respuesta
        res.json({
            message: 'Se ha agregado una cuenta bancaria',
            data,
        })
    } catch (error) {

        // Verificar si es una instancia de zod
        if (error instanceof ZodError) {
            const formattedErrors = formatValidationErrors(error)
            return res.status(400).json({ errors: formattedErrors })
        }

        // Retornar el error
        res.status(500).json({
            message: error.message
        })
    }
}

export const getBankAccount = async (req, res) => {
    try {
        // Recuperar información del banco
        const data = await getBankAccountService(req.body.userId)

        // Retornar una respuesta
        res.json({
            message: "Se ha recuperado la cuenta bancaria",
            data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Recuperar usuario
 */
export const readUser = async (req, res) => {
    try {

        const data = await getUserService(req.body.userId)

        res.json({
            message: "Información de la cuenta recuperada exitosamente",
            data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Upload files requireds
 */

export const uploadIdentityFiles = async(req, res) => {
    const files = req.files;
    const userId = req.body.userId

    // En caso de no recibir las imagenes
    if (!files) return res.status(400).json({
        message: "No se recibieron las imagenes"
    })

    // En caso de que si
    const front = files.front;
    const back = files.back;

    // Subimos los archivos a stripe
    const stripeFileFront = await uploadFileAccountService( front )
    const stripeFileBack = await uploadFileAccountService( back )

    console.log(userId)

    // Adjuntar documentos a cuenta de connect
    const connectUpdated = await accountAddFilesService(userId, stripeFileFront.id, stripeFileBack.id)
    
    console.log(connectUpdated)

    
    res.json({
        message: "Archivos subidos",
        data: connectUpdated
    })
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