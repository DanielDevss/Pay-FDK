import { getPaymentsService } from "../../services/web/payments.service.js"


export const getAll = async(req,res) => {
    try {
        const data = await getPaymentsService(req.body.userId)
        res.json({
            message: 'Pagos recuperados de forma correcta',
            data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}