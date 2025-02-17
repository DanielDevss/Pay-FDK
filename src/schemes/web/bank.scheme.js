import { z } from "zod";

export const schemeNewBankAccount = z.object({
    holder_name : z
        .string({ message: "El nombre del propietario es obligatorio" }),
    holder_type : z
        .enum(["individual", "company"]),
    account_number: z
        .string({ message: "El número de cuenta es obligatorio" })
        .length(18, "El número de cuenta deberá tener 18 carácteres.")
        .regex(/[0-9]/, "El número de cuenta solo permite números")
})