import { ZodError } from "zod";
import { schemeNewPayment } from "../../schemes/api/payments.scheme.js"
import { createPaymentService, getPaymentsService } from "../../services/api/payments.service.js"
import { formatValidationErrors } from "../../libs/formats.js"

/* -------------------------------------------------------------------------- */
/*                          Recuperar todos los pagos                         */
/* -------------------------------------------------------------------------- */

export const getAll = async(req,res) => {
    try {
        const payments = await getPaymentsService(req.userId)
        const isNotFound = payments.length == 0

        res.status(isNotFound ? 404 : 200).json({
            success: true,
            message: isNotFound ? 'Not Results' : 'Get payments success',
            code: isNotFound ? 404 : 200,
            data: payments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Error',
            code: 500,
            error: error.message
        })
    }
}

/* -------------------------------------------------------------------------- */
/*                              Registrar record                              */
/* -------------------------------------------------------------------------- */

export const store = async(req,res) => {
    try {
        schemeNewPayment.parse(req.body)
        const data = await createPaymentService(req.body);
        
        res.status(200).json({
            success: true,
            message: 'Payment created',
            data
        })
    } catch (error) {

        if(error instanceof ZodError) {
            return res.status(422).json({
                success: false,
                message: 'Failed fields',
                code: 422,
                validation: formatValidationErrors(error)
            })
        }

        res.status(500).json({
            success: false,
            message: 'Internal Error',
            code: 500,
            error: error.message
        })
    }
}