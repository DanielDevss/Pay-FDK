import { getAccountService, getAllService } from "../../services/admin/accounts.service.js"

// region Recuperar las cuentas

export const getAll = async (req, res) => {
    const { rol } = await req.query
    try {
        const accounts = await getAllService(req.body.userId, rol)

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

export const getOne = async (req, res) => {

    const { username } = req.params

    // En caso de no mandar el username
    if (!username) return res.status(404).json({ 
        success: false, 
        message: "Usuario no encontrado", 
        error: "Username not retrieve" 
    })

    try {
        const account = await getAccountService(username)

        if(!account) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
                error: "User record not fount in database"
            })
        }

        res.status(200).json({
            success:true,
            message: "Usuario encontrado",
            data: account
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Ocurrio un error interno",
            error: error.message
        })
    }
}