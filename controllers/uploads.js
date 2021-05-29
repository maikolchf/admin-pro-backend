const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const { actualizarImagen } = require('../helpers/actualizar-imagen');



const fileUpload =  async(req, res = response) => {


    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msj:'El tipo no es valido.'
        });
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            msj: 'No hay ningun archivo'
        });
    }

    const file = req.files.imagen;
    const nombreSplit = file.name.split('.');
    const extencion = nombreSplit[nombreSplit.length - 1].toLowerCase();
    const extenccionesValidas = ['jpg','png','jpeg','gif'];
    

    if(!extenccionesValidas.includes(extencion)){
        return res.status(400).json({
            ok: false,
            msj:'La extencion del archivo no es valida.'
        });
    }

    const nombreArchivo = `${ uuidv4() }.${ extencion }`; 

    const path = `./uploads/${ tipo }/${nombreArchivo}`;

    file.mv(path, async(error) => {
        if(error){
            console.log(error);
            return res.status(500).json({
                ok:false,
                msj: 'Error al subir la imagen'
            });
        }
    })

    const respuesta = actualizarImagen(tipo, id, nombreArchivo);

    if(!respuesta){
        return res.status(500).json({
            ok:false,
            msj: 'Error al subir la imagen'
        });
    }

    return res.json({
        ok:true,
        msj: 'Archivo subido',
        nombreArchivo
    });
}

module.exports = {
    fileUpload,
}