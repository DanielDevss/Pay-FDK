import {
  STRIPE_APPLICATION_FEE,
  STRIPE_CURRENCY,
} from "../../config/config.js";
import stripe from "../../config/stripe.js";
import prisma from "../../../db.js";

// TODO Recuperar lista de payments

export const getPaymentsService = async (userId) => {
  try {
    const payments_raw = await prisma.payment.findMany({
      where: { userId },
      include: {
        userKey: {
          select:{ key: true, id: true }
        }
      }
    })

    const payments = payments_raw.map(payment => {
      return {
        id: payment.id,
        userKeyId: payment?.userKey?.id,
        key: payment?.userKey?.key,
        amount: payment.amount / 100,
        status: payment.status,
        createdAt: payment.createdAt
      }
    })

    return payments

  } catch (error) {
    throw new Error(error.message);
  }
};

// TODO Crear el payment intent y guardar

export const createPaymentService = async (data) => {
  try {
    const { amount, stripeAccountId } = data;
    const fee_amount = (STRIPE_APPLICATION_FEE * amount) / 100;

    // Crear el registro en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: STRIPE_CURRENCY,
      application_fee_amount: fee_amount,
      transfer_data: {
        destination: stripeAccountId,
      },
    });


    const { client_secret, status, id } = paymentIntent;

    // Crear el registro en DB
    const paymentDB = await prisma.payment.create({
      data: {
        userId: data.userId,
        userKeyId: data.userKeyId,
        amount: data.amount,
        cancelUrl: data.cancelUrl,
        successUrl: data.successUrl,
        clientSecret: client_secret,
        stripePaymentIntent: id,
        status: status,
      }
    });

    return {
      id: paymentDB.id,
    };
  } catch (error) {
    throw Error(`Error al crear el intento de pago: ${error.message}`);
  }
};
