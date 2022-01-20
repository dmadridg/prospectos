import { PrismaClient } from '@prisma/client';

import formidable from "formidable";

const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req, res) {
    const formData = new formidable.IncomingForm();
    formData.parse(req, async function (err, fields, files) {
        const prospecto = JSON.parse(fields.data);
        console.log(prospecto);
        const updateProspecto = await prisma.prospecto.update({
            where: {
                id: prospecto.id
            },
            data: {
                observacion: prospecto.observacion,
                status: parseInt(prospecto.status),
            }
        });
        prisma.$disconnect();

        return res.status(200).json({
            message: 'Pedidos obtenidos correctamente'
        });
    });
}