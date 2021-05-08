const { response } = require("express");

const Medico = require("../models/medico");
const Hospital = require("../models/hospital");


const getMedicos = async( req, res = response) => {

    const medicos = await Medico.find().populate('usuario','nombre img')
                                       .populate('hospital','nombre img');

    res.json({
        ok: true,
        medicos
    })
};

const crearMedicos = async( req, res = response) => {

    try {
        const uid = req.uid;
        const medico = new Medico({
            usuario: uid,
            ... req.body
        });

        const medicoDB = await medico.save();

        return res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'Error inesperado...'
        })
    }
    
};

const actualizarMedicos = ( req, res = response) => {

    res.json({
        ok: true,
        msj: 'actualizarMedicos'
    })
};

const borrarMedicos = ( req, res = response) => {

    res.json({
        ok: true,
        msj: 'borrarMedicos'
    })
};

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos,
}

