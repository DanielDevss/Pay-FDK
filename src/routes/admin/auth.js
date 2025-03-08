import { Router } from "express";
import { signIn } from "../../controllers/admin/auth.controller.js";

const router = Router();

router.post("/", signIn)

export default router;