import { z } from "zod";

export const schemeNewPayment = z.object({
    amount: z
        .string(),
    successUrl: z
        .string()
        .url(),
    cancelUrl: z
        .string()
        .url()

})