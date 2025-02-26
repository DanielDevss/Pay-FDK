import fs from "fs"

import prisma from "../../../prisma.js";
import stripe from "../../config/stripe.js";
import { addBankAccount, createAccount, getAccountConnect, getBankAccount, setUserDataStripeAccount } from "../../libs/stripeConnect.js";

// ✅ Obtener información de la cuenta

export const getUserService = async (userId) => {
    try {

        // Obtener información de la base de datos
        const user = await prisma.user.findFirst({
            where: { id: userId }, omit: {
                password: true,
                rol: true,
                stripeBankAccountId: true,
                id: true,
            }
        })

        // Obtener información de stripe connect
        const account = await getAccountConnect(user.stripeAccountId)

        return {
            ...user,
            charges_enabled: account.charges_enabled,
            payouts_enabled: account.payouts_enabled
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

// ✅ Servicio para crear usuario

export const createUserService = async (data) => {
    try {
        // Verificamos si el correo ya existe
        const user = await prisma.user.findFirst({
            where: { email: data.email }
        });
        if (user) throw new Error('El correo electrónico ya existe');

        // Crear la cuenta de stripe
        const stripeAccount = await createAccount(data)

        // Creamos en caso de que no exista
        return prisma.user.create({
            data: {
                stripeAccountId: stripeAccount.id,
                ...data
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

// ✅ Completar los datos para stripe connect

export const completeUserConnect = async (userId, dob, address, ip, business) => {
    try {

        const user = await prisma.user.findFirst({
            where: { id: userId }
        });

        // Actualizar información de stripe
        await setUserDataStripeAccount({ user, dob, address, stripeAccountId: user.stripeAccountId, ipAddress: ip, business })

        return {
            updated: true
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

// ✅ Añadir cuenta bancaria

export const addBankAccountService = async (bankAccount, userId) => {
    try {
        // Obtener el usuario
        const user = await prisma.user.findFirst({ where: { id: userId } })
        const stripeAccountId = await user.stripeAccountId

        // Crear la cuenta de banco en stripe
        const newBankAccount = await addBankAccount(stripeAccountId, bankAccount)

        // Registrar en la DB y retornar datos
        return await prisma.user.update({
            where: { id: userId },
            data: { stripeBankAccountId: newBankAccount.id }
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

// ✅  Obtener cuenta de banco

export const getBankAccountService = async (userId) => {
    try {
        // Recuperamos y validamos al usuario
        const user = await prisma.user.findFirst({ where: { id: userId } })
        if (!user) {
            throw new Error("No existe el usuario")
        }
        // Recuperamos el BankId de Stripe
        const { stripeAccountId, stripeBankAccountId } = user

        // Recuperar la información bancaria
        return await getBankAccount(stripeBankAccountId, stripeAccountId)

    } catch (error) {

        throw new Error(error.message)
    }
}

// ✅ Subir archivos restantes

export const uploadFileAccountService = async (file) => {

    try {
        const stripeFile = await stripe.files.create({
            purpose: "identity_document",
            file: {
                data: fs.createReadStream(file.tempFilePath),
                name: file.name,
                type: "application/octet-stream"
            }
        })

        fs.unlinkSync(file.tempFilePath)
        return stripeFile
    } catch (error) {
        throw new Error(error.message)
    }

}

// ✅ Agregar archivos a account

export const accountAddFilesService = async (userId, frontId, backId) => {

    try {
        const user = await prisma.user.findFirst({ where: { id: userId } })
        return await stripe.accounts.update(user.stripeAccountId, {
            individual: {
                verification: {
                    document: {
                        front: frontId,
                        back: backId
                    },
                },
            },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}


// ✅ Actualizar identidad enviada

export const accountDocumentsSentsService = async (userId) => {
    try {
        return await prisma.user.update({
            where: { id: userId },
            data: { documentsSent: true }
        })
    } catch (error) {
        console.log("No se pudo actualzar el estado")
        throw new Error("No se pudo actualizar el estado en la base de datos")
    }
}