import prisma from "../../../db.js"
import stripe from "../../config/stripe.js"

// region Obtener todas las cuentas

export const getAllService = async (userId, rol='user') => {
    try {
        const accounts = await prisma.user.findMany({
            where: {
                id: {
                    not: userId
                },
                rol,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                status: true,
                documentsSent: true,
                createdAt: true,
                updatedAt: true
            },
        })

        return accounts.map(record => ({
            id: record.id,
            fullName: `${record.firstName} ${record.lastName}`,
            username: record.username,
            email: record.email,
            status: record.status,
            documents: record.documentsSent,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        }))

    } catch (error) {
        throw new Error(`No se obtuvieron los registros: ${error.message}`)
    }
}


// region Obtener una cuenta

export const getAccountService = async(username) => {
    try {
        // Informacion de la base de datos
        const account = await prisma.user.findFirst({
            where: { username },
            include: {
              _count: true,
            },
            omit: { 
                password: true,
            }
        })

        // Data default
        const data = { account, bank: null, connect: null }
        
        // Para stripe connect & bank
        const stripeBankId = account.stripeBankAccountId
        const stripeAccountId = account.stripeAccountId

        // Informacion de stripe Connect
        const stripeConnect = await stripe.accounts.retrieve(stripeAccountId)
        data.connect = {
            payoutsEnabled : stripeConnect.payouts_enabled,
            chargesEnabled: stripeConnect.charges_enabled,
            businessUrl: stripeConnect?.business_profile?.url,
            businessType: stripeConnect?.business_type,
            company: stripeConnect?.company?.address?.line1 ? {
                city: stripeConnect?.company?.address?.city,
                country: stripeConnect?.company?.address?.country,
                address: stripeConnect?.company?.address?.line1,
                postalCode: stripeConnect?.company?.address?.postal_code,
                state: stripeConnect?.company?.address?.state,
            } : null
        }

        // Información bancaria de stripe
        if(stripeBankId) {
            const stripeBankData = await stripe.accounts.retrieveExternalAccount(stripeAccountId, stripeBankId);
            console.log(stripeBankData)
            data.bank = {
                name: stripeBankData?.bank_name,
                number: `****************${stripeBankData?.last4}`,
                routing: stripeBankData?.routing_number,
                holder_name : stripeBankData?.account_holder_name,
                status: stripeBankData?.status
            }
        }

        return data
    } catch (error) {
        throw new Error(`No se pudo obtener la cuenta: ${error.message}`)
    }
}