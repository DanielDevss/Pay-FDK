import { Router } from "express";
import { getAll } from "../../controllers/web/payment.controller.js";

const routes = Router()

routes.get('/', getAll)

export default routes