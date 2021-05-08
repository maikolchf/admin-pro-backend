
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const mongoose = require('mongoose');

//crear servidor express
const app = express();

//cors
app.use(cors());

//lectura del body
app.use(express.json());

//DB
dbConnection();

mongoose.set('useCreateIndex', true)


//Rutas
app.use('/api/Usuarios', require('./routes/usuarios'));
app.use('/api/Hospitales', require('./routes/hospitales'));
app.use('/api/Medicos', require('./routes/medicos'));
app.use('/api/Login', require('./routes/auth'));
app.use('/api/Todo', require('./routes/busquedas'));




app.listen( process.env.PORT, () => {
    console.log('SERIDOR CORRIENDO EN PUERTO ' + process.env.PORT );
});