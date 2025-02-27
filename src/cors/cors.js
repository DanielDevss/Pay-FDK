import { ORIGIN_ALLOW_CORS_URL } from "../config/config.js"

export const corsConfigApi = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}

export const corsConfigWeb = {
    credentials: true,
    origin: ORIGIN_ALLOW_CORS_URL,
    httpOnly: false
}