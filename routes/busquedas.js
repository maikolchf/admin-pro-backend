/*
    ruta: /api/Todo/:busqueda
*/

const { Router } = require('express');
//const { check } = require('express-validator');
//const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const  { getBusqueda } = require('../controllers/busquedas');

const router = Router();


router.get( '/:busqueda', validarJWT , getBusqueda);


module.exports = router;