import prisma from "../../../db.js"

export const getPaymentsService = async(userId) => {
    try {
        const userData = await prisma.user.findFirst({ where: { id: userId } })
        const paymentsRaw = await prisma.payment.findMany({ 
            where: { userId },
            include: { userKey: { select: { name: true, id: true } } },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const payments = paymentsRaw.map(pay => ({
            id: pay.id,
            amount: pay.amount / 100,
            status: pay.status,
            keyName: pay?.userKey?.name,
            keyId: pay?.userKey?.id,
            createdAt: pay.createdAt,
            updatedAt: pay.updatedAt,
        }));

        return payments
    } catch (error) {
        console.log(error.message)
        throw Error("Error al recuperar los pagos")
    }
}