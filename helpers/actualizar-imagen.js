const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');
const { models } = require('mongoose');

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'medicos':
                const medico = await Medico.findById(id);
                return guardarImagen(medico, nombreArchivo,'medicos');

        case 'hospitales':
                const hospital = await Hospital.findById(id);
                return guardarImagen(hospital, nombreArchivo,'hospitales');

        case 'usuarios':
                const usuario = await Usuario.findById(id);
                return guardarImagen(usuario, nombreArchivo,'usuarios');

    }
}

const guardarImagen = async(modelo = models, nombreArchivo, carpeta) => {
    if(!modelo){
        return false;
    }
    const pathViejo = `./uploads/${carpeta}/${ modelo.img }`;               
    borrarArchivo(pathViejo);

    modelo.img = nombreArchivo;
    await modelo.save()
    return true;
}

const borrarArchivo = (path) => {
    if(fs.existsSync(path)){

        fs.unlinkSync(path);
    }
}


module.exports = {
    actualizarImagen,
}