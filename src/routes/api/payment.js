import { Router } from "express";
import { authenticatedApi } from "../../middlewares/auth.middleware.js";
import { getAll, store } from "../../controllers/api/payments.controller.js";

const router = new Router

router.get("/", authenticatedApi, getAll)

router.post("/", authenticatedApi, store)

export default router