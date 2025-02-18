import { Router } from "express";
import { createKey, getKeys } from "../../controllers/web/keys.controller.js"
import { authenticated } from '../../middlewares/auth.middleware.js'

const router = Router()

router.get("/", authenticated, getKeys)

router.post("/", authenticated, createKey)

export default router 
