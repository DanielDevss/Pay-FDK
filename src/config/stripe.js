import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "./config.js";

let stripe;
try {
    stripe = new Stripe(STRIPE_SECRET_KEY)
} catch (error) {
    console.log('Error al inicializar stripe: ', error.message);
}
export default stripe;
