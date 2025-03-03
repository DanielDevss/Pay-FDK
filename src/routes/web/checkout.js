import { Router } from "express"
import { authenticatedApi } from "../../middlewares/auth.middleware.js"
import { cancelPayment, getCheckout, registerPaymentMethod, updatePaymentConfirm } from "../../controllers/web/checkout.controller.js"

const router = Router()

router.get('/:id', getCheckout)

router.patch('/:id', registerPaymentMethod)

router.delete('/:id', cancelPayment)

router.patch('/status/:id', updatePaymentConfirm)

export default router