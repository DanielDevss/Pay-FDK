import { getKeysService } from "../../services/admin/keys.service.js";

export const getAll = async(req,res) => {
    try {
        const { userId } = req.query
        const data = await getKeysService(userId)
        res.status(200).json({
            success: true,
            message: "Se obtenido las llaves de forma correcta",
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Ocurrio un error interno",
            error: error.message
        })
    }    
}