/*
    Path: 'api/upload/tabla/id'
*/
const { Router } = require('express');
const expressfileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload } = require('../controllers/uploads');
const { route } = require('./usuarios');

const router = Router();

router.use( expressfileUpload() );


router.put('/:tipo/:id', validarJWT,fileUpload );


module.exports = router;