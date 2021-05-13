const { response } = require("express");
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const { models } = require("mongoose");

const getBusqueda = async( req, res = response) => {

    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda, 'i');
    

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })
};

const getDocumentosColeccion = async( req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i')
    try {
        switch (tabla) {
            case 'medicos':
                BuscarEnTabla(Medico, res, regex);
                break;
        
            case 'usuarios':
                BuscarEnTabla(Usuario, res, regex);
                break;
    
            case 'hospitales':
                BuscarEnTabla(Hospital, res, regex);
                break;
            default:
                return res.status(400).json({
                    ok: false,
                    msj: 'La tabla a consultar no existe.'
                });         
        }
    } catch (error) {
        console.log(error);
        return res.json({
            ok: true,
            msj: 'Error no controlado'
        })
    }
    
};

const BuscarEnTabla = async(tabla = models, res = response, regex = RegExp) => {
    const data = await tabla.find({ nombre: regex }).populate('usuario','nombre img').populate('hospital', 'nombre img');
    res.json({
        ok: true,
        resultado: data
    });
}


module.exports = {
    getBusqueda,
    getDocumentosColeccion
}

