import { Router } from "express";
import { getAll, getOne } from "../../controllers/admin/payments.controller.js";
import { authenticatedAdmin } from "../../middlewares/auth.middleware.js";

const router = new Router()

router.get("/", authenticatedAdmin, getAll)

router.get("/:id", authenticatedAdmin, getOne)

export default router