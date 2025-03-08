import { Router } from "express";
import { getAll } from "../../controllers/admin/accounts.controller.js"
import { authenticatedAdmin } from "../../middlewares/auth.middleware.js"

const router = Router();

router.get("/" , authenticatedAdmin, getAll)

export default router;