const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

const login = async(req, res = response) => {

    const {email, password} = req.body;
    try {
          
        const usuarioDB = await Usuario.findOne({ email} );

        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msj: 'El usuario no se encuentra registrado',
            });
        }

        //Verificar ccontraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            res.status(400).json({
                ok: false,
                msj: 'Contraseña o Correo incorrecto',
            });
        }

        //Geneamos token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Error inesperado...',
        });
    }

}

module.exports = {
    login,
}