import { getAllService } from "../../services/admin/accounts.service.js"

// region Recuperar las cuentas

export const getAll = async (req, res) => {
    try {

        const accounts = await getAllService(req.userId)

        res.json({
            success: true,
            message: `Usuarios recuperados correctamente`,
            data: accounts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al recuperar usuarios',
            error: error.message
        })
    }
}