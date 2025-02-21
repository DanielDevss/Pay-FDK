import { z } from "zod";

export const schemeNewKey = z.object({
    production: z
        .boolean({ message: "No se recibio el tipo" }),
    name: z
        .string({ message: "No se recibio la nombre de la llaves" })
        .max(25, "Máximo 10 caracteres para el key"),
});