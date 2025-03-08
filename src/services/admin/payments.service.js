import prisma from "../../../db.js"
import stripe from "../../config/stripe.js"

// region Obtener todos los pagos

export const getAllService = async ({ keyId, userId }) => {
    try {
        const payments = await prisma.payment.findMany({
            where: { userKeyId: keyId, userId },
            select: {
                id: true,
                user: {
                    select: {
                        username: true,
                    }
                },
                userKey: {
                    select: {
                        key: true
                    }
                },
                amount: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return payments.map(record => ({
            id: record.id,
            username: record?.user?.username,
            key: record?.userKey?.key,
            amount: record.amount / 100,
            status: record.status,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt
        }));
    } catch (error) {
        throw Error(`Error al recuperar payments: ${error.message}`)
    }
}

// region Obtener los detalles del pago

export const getPaymentService = async (id) => {
    try {

        // Informacion de la DB
        const payment = await prisma.payment.findFirst(
            { where: { id } , include: { user: true, userKey: true }},
        )

        // Si no existe el registro
        if(!payment) return null

        // Si no existe un stripePaymentIntent
        if(!payment.stripePaymentIntent) return null

        // Informacion de stripe payment
        const stripePayment = await stripe.paymentIntents.retrieve(payment.stripePaymentIntent);
        const feeAmount = stripePayment?.application_fee_amount
        const paymentMethod = stripePayment?.payment_method

        let data = {
            payment: {
                id: payment.id,
                username: payment?.user?.username,
                key: payment?.userKey?.key,
                stripePaymentIntent: payment.stripePaymentIntent,
                amount: payment.amount / 100,
                feeAmount: feeAmount / 100,
                status: payment.status,
                successUrl: payment.successUrl,
                cancelUrl: payment.cancelUrl,
                createdAt: payment.createdAt,
                updatedAt: payment.updatedAt,
            },
            card: null    
        }

        
        if(paymentMethod && data.payment.status === "succeeded") {
            // Informacion de stripe method
            const stripePaymentMethod = await stripe.paymentMethods.retrieve(paymentMethod)
            const cardBrand = stripePaymentMethod?.card?.brand
            const cardFunding = stripePaymentMethod?.card?.funding
            const cardNumber = `**** **** **** ${stripePaymentMethod?.card?.last4}`
            const cardExpMonth = stripePaymentMethod?.card?.exp_month
            const cardExpYear = stripePaymentMethod?.card?.exp_year

            data.card = {
                brand: cardBrand,
                type: cardFunding,
                number: cardNumber,
                month: cardExpMonth,
                year: cardExpYear
            }
        }

        // Retorno de informacion
        return data

    } catch (error) {
        // Creamos un error descriptivo
        throw new Error(`No se pudo obtener el payment: ${error.message}`)
    }
}