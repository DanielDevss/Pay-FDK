import { Router } from "express";
import { createKey, deleteKey, getKeys, updateKey } from "../../controllers/web/keys.controller.js"
import { authenticated } from '../../middlewares/auth.middleware.js'

const router = Router()

router.get("/", authenticated, getKeys)

router.post("/", authenticated, createKey)

router.put("/:id", authenticated, updateKey)

router.delete("/:id", authenticated, deleteKey)

export default router 
