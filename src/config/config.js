import 'dotenv/config';

export const PORT = process.env.PORT || 4000

export const JWT_SECRET = process.env.JWT_SECRET

export const STRIPE_CURRENCY = process.env.STRIPE_CURRENCY || 'mxn'

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

export const STRIPE_APPLICATION_FEE = parseInt(process.env.STRIPE_APPLICATION_FEE || 3)

export const ORIGIN_ALLOW_CORS_URL = process.env.ORIGIN_ALLOW_CORS_URL;