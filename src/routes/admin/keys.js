import { Router } from "express";
import { authenticatedAdmin } from "../../middlewares/auth.middleware.js"
import { getAll } from "../../controllers/admin/keys.controller.js";

const router = Router()

router.get("/", authenticatedAdmin, getAll)

export default router