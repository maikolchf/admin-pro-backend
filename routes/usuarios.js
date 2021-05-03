/*
    Ruta: /api/Usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares//validar-campos')
const { getUsuarios, crearUsuarios, actualizarUsuario } = require('../controllers/usuarios')

const router = Router();


router.get( '/', getUsuarios);

router.post( '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        validarCampos,
    ] 
    ,crearUsuarios);

router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').isEmail(),
    ]
    ,actualizarUsuario);


module.exports = router;