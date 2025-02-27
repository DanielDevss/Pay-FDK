import { Router } from "express";
import { authenticatedApi } from "../../middlewares/auth.middleware.js";

const router = new Router

router.get("/", authenticatedApi, (req,res) => res.json({"message" : "ok"}))

export default router