const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');

const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find( { }, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    })
}

const crearUsuarios =  async(req, res = response) => {

    const { email, password, nombre } = req.body    
    try {
        const existeEmail =  await Usuario.findOne({ email });
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msj: 'El correo ya se encuentra regitrado',
            });
        }

        const usuario = new Usuario(req.body)

        //Encriptar contra
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password);

        //Se guarda la contraseña
        await usuario.save();

        res.json({
            ok: true,
            usuario
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Error inesperado...'
        })
    }
}

const actualizarUsuario = async(req, res) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        
        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msj: 'No existe el usuario por ese id'
            });
        }

        //Actualizar
        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email)
        {
           const existeEmail = await Usuario.findOne( { email }); 

           if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msj: 'Ya existe este email registrado'
                });
           }
        }   
             
        campos.email = email;
        const usuarioAct = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioAct,
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
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
}