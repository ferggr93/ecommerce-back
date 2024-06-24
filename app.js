const express = require('express')
const app = express() //Ejecutar express
const cors = require('cors')
//Importamos las rutas de usuario
const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')

//Middleware
app.use(express.json());//Nos permite interpretar el body de nuestras peticiones(Desde el back)
app.use(express.urlencoded({extended:true}))//Nos permite intrepretar el body de las peticiones del front

//Comprartir carpeta public
app.use(express.static('public'));

//Solventamos eror cors
app.use(cors())


//Integramos rutas al server
app.use(userRoutes);
app.use(productRoutes);


module.exports = app;