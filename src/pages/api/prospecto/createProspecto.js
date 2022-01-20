import { PrismaClient } from '@prisma/client';
import fs from "fs";
import bcrypt from 'bcrypt'
import formidable from "formidable";

const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req, res) {
    // BigInt.prototype.toJSON = function () {
    //     return this.toString()
    // }

    const formData = new formidable.IncomingForm();
    formData.parse(req, async function (err, fields, files) {
        const prospecto = JSON.parse(fields.data);
        const newProspecto = await prisma.prospecto.create({
            data: {
                nombre: prospecto.nombre,
                apellido_paterno: prospecto.apellidoPaterno,
                apellido_materno: prospecto.apellidoMaterno,
                calle: prospecto.calle,
                numero_exterior: prospecto.numeroExterior,
                colonia: prospecto.colonia,
                codigo_postal: prospecto.codigoPostal,
                telefono: prospecto.telefono,
                rfc: prospecto.rfc,
                status: 0,
            }
        });
        prisma.$disconnect();

        for (let index = 1; index <= fields.no_files; index++) {
            const element = files[`file_${index}`];
            await saveFile(element, newProspecto.id);
        }

        return res.json({
            data: newProspecto,
            message: "Prospecto creado con éxito"
        })

        // return res.status(200).json({
        //     message: 'Prospecto creado correctamente',
        //     data: newProspecto
        // })
        // await saveFile(files.file);
        // return res.status(201).send("");
    });
    return null;
    // const formData = JSON.parse(data.data);

    // const newProspecto = await prisma.prospecto.create({
    //     data: {
    //         nombre: formData.nombre,
    //         apellido_paterno: formData.apellidoPaterno,
    //         apellido_materno: formData.apellidoMaterno,
    //         calle: formData.calle,
    //         numero_exterior: formData.numeroExterior,
    //         colonia: formData.colonia,
    //         codigo_postal: formData.codigoPostal,
    //         telefono: formData.telefono,
    //         rfc: formData.rfc,
    //         status: 0,
    //     }
    // });
    // prisma.$disconnect();


}

const saveFile = async (file, prospecto_id) => {

    const data = fs.readFileSync(file.filepath);

    var file_name_string = file.originalFilename;
    var file_name_array = file_name_string.split(".");
    let ext = file_name_array[file_name_array.length - 1];

    const file_name = file.newFilename;
    fs.writeFileSync(`./public/docs/${file_name}.${ext}`, data);
    await fs.unlinkSync(file.filepath);
    const newFile = await prisma.prospecto_Docs.create({
        data: {
            prospectoId: prospecto_id,
            documento: `${file_name}.${ext}`,
        }
    });
    prisma.$disconnect();
    return true;
};