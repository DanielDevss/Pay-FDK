import { z } from "zod";

export const authBodyScheme = z.object({
    email: z.string().email(),
    password: z.string(),
})