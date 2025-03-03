import prisma from "../../../db.js"
import stripe from "../../config/stripe.js"
import { numberToAmount } from "../../libs/formats.js"

export const getPaymentDataService = async (paymentId) => {
    try {

        const payment = await prisma.payment.findFirst({ where: { id: paymentId } })

        return {
            clientSecret: payment.clientSecret,
            amount: numberToAmount(payment.amount / 100),
            status: payment.status,
            successUrl: payment.successUrl,
            cancelUrl: payment.cancelUrl,
        }
    } catch (error) {
        throw Error('No se pudo obtener la información de pago')
    }
}


export const registerPaymentMethodService = async (paymentId, paymentMethod) => {
    try {

        const paymentIntentDb = await prisma.payment.findFirst({ where: { id: paymentId } })
        const stripePaymentIntentId = paymentIntentDb.stripePaymentIntent
        const paymentIntent = await stripe.paymentIntents.update(stripePaymentIntentId, {
            payment_method: paymentMethod
        })

        return {
            clientSecret: paymentIntent.client_secret
        }

    } catch (error) {
        console.log(error.message)
        throw Error("No se pudo actualizar el metodo de pago")
    }
}

export const updatePaymentConfirmService = async (id) => {
    try {
        const paymentDb = await prisma.payment.findFirst({ where: { id } })
        const paymentIntentId = paymentDb.stripePaymentIntent
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
        const newStatus = paymentIntent.status

        return await prisma.payment.updateMany({ where: { id }, data: { status: newStatus } })
    } catch (error) {
        console.log(error.message)
        throw new Error('No se pudo actualizar el registro en la Base de datos')
    }
}

export const cancelPaymentService = async(id) => {
    try {
        return await prisma.payment.updateMany({ where: { id }, data: { status: 'canceled' } })
    } catch (error) {
        console.log(error)
        throw new Error('No se pudo cancelar el pago')
    }
}