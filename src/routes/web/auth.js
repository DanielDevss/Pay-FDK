import { Router } from "express";
import { signIn } from "../../controllers/web/auth.controller.js";

const router = Router();

router.post("/", signIn)

export default router;