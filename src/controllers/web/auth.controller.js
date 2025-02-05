import { ZodError } from "zod";
import { schemeAuth } from "../../schemes/web/auth.scheme.js";

export const signIn = async (req, res) => {
    try {
        schemeAuth.parse(req.body);
        res.json({ message: "User signed in successfully" });
    } catch (error) {
        if(error instanceof ZodError){
            formattedErrors = formatValidationErrors(error);
            return res.status(400).json({ errors: formattedErrors });
        }

        res.status(500).json({ message: error.message });
    }
}