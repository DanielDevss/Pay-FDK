import { Router } from "express";
import { getAll, getOne } from "../../controllers/admin/accounts.controller.js"
import { authenticatedAdmin } from "../../middlewares/auth.middleware.js"

const router = Router();

router.get("/" , authenticatedAdmin, getAll)

router.get("/:username" , authenticatedAdmin, getOne)

export default router;