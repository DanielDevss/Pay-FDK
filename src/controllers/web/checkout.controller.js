import { cancelPaymentService, getPaymentDataService, registerPaymentMethodService, updatePaymentConfirmService } from "../../services/web/checkout.service.js";

export const getCheckout = async(req, res) => {
    try {
        const paymentId = req.params.id
        const data = await getPaymentDataService(paymentId)

        res.status(200).json({
            message: "Se ha recuperado el checkout de pago",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const registerPaymentMethod = async(req, res) => {
    try {
        const { id } = req.params
        const { paymentMethod } = req.body
        const data = await registerPaymentMethodService(id, paymentMethod)
        res.status(200).json({
            success: true,
            message: "Se ha actualizado el metodo de pago",
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updatePaymentConfirm = async(req,res) => {
    try {
        const { id } = req.params
        const data = await updatePaymentConfirmService(id)
        res.status(200).json({
            message: "Se actualizo el estado en la base de datos",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

export const cancelPayment = async (req, res) => {
    try {
        const { id } = req.params
        cancelPaymentService(id)
        res.status(200).json({
            message: 'Se ha cancelado el pago',
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}