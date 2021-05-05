
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//crear servidor express
const app = express();

//cors
app.use(cors());

//lectura del body
app.use(express.json());

//DB
dbConnection();


//Rutas
app.use('/api/Usuarios', require('./routes/usuarios'));
app.use('/api/Login', require('./routes/auth'));




app.listen( process.env.PORT, () => {
    console.log('SERIDOR CORRIENDO EN PUERTO ' + process.env.PORT );
});