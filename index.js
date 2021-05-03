
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//crear servidor express
const app = express();

//cors
app.use(cors());

//DB
dbConnection();


//rutas
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        msj: 'Hola mundo'
    })
} );




app.listen( process.env.PORT, () => {
    console.log('SERIDOR CORRIENDO EN PUERTO ' + process.env.PORT );
});