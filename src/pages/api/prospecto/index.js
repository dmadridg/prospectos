import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    BigInt.prototype.toJSON = function () {
        return this.toString()
    }

    const { page, limit, q } = req.query

    if (q !== undefined) {
        const prospectos = await prisma.prospecto.findMany({
            where: {
                OR: [
                    {
                        id: {
                            contains: q
                        }
                    },
                    {
                        nombre: {
                            contains: q
                        }
                    },
                    {
                        apellido_paterno: {
                            contains: q
                        }
                    },
                    {
                        apellido_materno: {
                            contains: q
                        }
                    }
                ]
            },
            take: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
        });

        const countProspectos = await prisma.prospecto.findMany({
            where: {
                OR: [
                    {
                        id: {
                            contains: q
                        }
                    },
                    {
                        nombre: {
                            contains: q
                        }
                    },
                    {
                        apellido_paterno: {
                            contains: q
                        }
                    },
                    {
                        apellido_materno: {
                            contains: q
                        }
                    }
                ]
            }
        });

        prisma.$disconnect();

        return res.json({
            prospectos,
            totalResults: countProspectos.length,
            message: 'Pedidos obtenidos correctamente'
        });
    }

    const countProspectos = await prisma.prospecto.count();
    const prospectos = await prisma.prospecto.findMany({
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
    });

    prisma.$disconnect();

    return res.status(200).json({
        prospectos,
        totalResults: countProspectos,
        message: 'Pedidos obtenidos correctamente'
    })
}  