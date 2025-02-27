import {
  STRIPE_APPLICATION_FEE,
  STRIPE_CURRENCY,
} from "../../config/config.js";
import stripe from "../../config/stripe.js";
import prisma from "../../../db.js";

// TODO Recuperar lista de payments

export const getPaymentsService = async (userKeyId) => {
  try {
    return await prisma.payment.findMany({ where: { userKeyId } });
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
      payment_method_type: ["card"],
      application_fee_amount: fee_amount,
      transfer_data: {
        destination: stripeAccountId,
      },
    });

    const { clientSecret, status, id: stripePaymentIntent } = paymentIntent;

    // Crear el registro en DB
    const paymentDB = await prisma.payment.create({
      data: {
        ...data,
        status,
        clientSecret,
        stripePaymentIntent,
      },
    });

    return {
      id: paymentDB.id,
    };
  } catch (error) {
    throw Error(`Error al crear el intento de pago: ${error.message}`);
  }
};
