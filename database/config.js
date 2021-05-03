const mongoose = require('mongoose');
const dbConnection = async () => {

    try
    {
        //pass: iOK0qYN00gu9wdTc
        //user: maikolcchf
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }); 
        console.log('DB online');
    }
    catch(error) 
    {
        throw new Error('Error al levantar la DB');
    }
   
}

module.exports = {
    dbConnection
}