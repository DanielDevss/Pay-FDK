import { getAllService, getPaymentService } from "../../services/admin/payments.service.js"

// region Obtener todos los pagos

export const getAll = async(req, res) => {
    try {
        const { keyId, userId } = req.query
        const payments = await getAllService({ keyId, userId })
        res.status(200).json({
            success: true,
            message: "Registros recuperados correctamente.",
            data: payments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : "Ocurrio un error interno",
            error: error.message
        })
    }
}

// region Obtener detalles de un pago

export const getOne = async (req,res) => {

    const { id } = req.params

    if(!id) {
        return res.status(404).json({
            success: false,
            message: "No se encontro el pago",
            error: "Payment ID not received"
        })
    }

    try {

        const payment = await getPaymentService(id)

        if(!payment) return res.status(404).json({
            success: false,
            message: "No se encontro el pago",
            error: "Record not found in DB"
        })

        res.status(200).json({
            success: true,
            message: "Detalles del pago encontrados",
            data: payment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Ocurrion un error interno",
            error: error.message
        })
    }
}