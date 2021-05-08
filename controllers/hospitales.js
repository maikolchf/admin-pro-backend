const { response } = require("express");
const Hospital = require("../models/hospital");


const getHospitales = async( req, res = response) => {


    const hospitales = await Hospital.find().populate('usuario','nombre img'); 

    res.json({
        ok: true,
        hospitales 
    })
};

const crearHospitales = async( req, res = response) => {

    const uid = req.uid;
    const { nombre } = req.body;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalExiste = await Hospital.findOne({ nombre });

        if(hospitalExiste){
            return res.json({
                ok: false,
                msj: 'Hospital ya se encuentra registrado.'
            }); 
        }
        const hospitalDB = await hospital.save();
        return res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'Error inesperado...'
        });
    }    
};

const actualizarHospitales = ( req, res = response) => {

    res.json({
        ok: true,
        msj: 'ActualizarHospitales'
    })
};

const borrarHospitales = ( req, res = response) => {

    res.json({
        ok: true,
        msj: 'BorrarHospitales'
    })
};

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales,
}

