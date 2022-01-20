import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query

    const selectedProspecto = await prisma.prospecto.findUnique({
        where: {
            id: id
        }
    });

    const docs = await prisma.prospecto_Docs.findMany({
        where: {
            prospectoId: selectedProspecto.id
        }
    })

    prisma.$disconnect();

    return res.status(200).json({
        selectedProspecto,
        docs: docs,
        message: 'Pedidos obtenidos correctamente'
    })
}  