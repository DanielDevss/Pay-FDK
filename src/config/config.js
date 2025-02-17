import 'dotenv/config';

export const PORT = process.env.PORT || 4000

export const JWT_SECRET = process.env.JWT_SECRET

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

export const MULTER_UPLOAD_DEST = process.env.MULTER_UPLOAD_DEST || "uploads/"