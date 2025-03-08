import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";


export const createJwt = async (payload) => {
    return await jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

export const verifyJwt = async (token) => {
    return await jwt.verify(token, JWT_SECRET)
}