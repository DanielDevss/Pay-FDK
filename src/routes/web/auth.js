import { Router } from "express";
import { signIn, verifyAuth } from "../../controllers/web/auth.controller.js";
import { authenticated } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", signIn)
router.post("/verify-auth", authenticated, verifyAuth)

export default router;