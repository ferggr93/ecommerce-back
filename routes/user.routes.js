const express = require('express')

const router = express.Router(); //Funcionalidad de express, nos permite llamar a las rutas directamente en lugar de usando el app

const userController = require('../controllers/user.controller')


//Middleware para chequear token
const jwtVerify = require('../middlewares/isAuth')
/*
    Definir rutas para obtener todos los usuarios get
    agregar usuario post
    borrar un usuario delete
    actualizar usuario PUT
    obtener usuario especifico get(con parametro)
 
 */

    router.get('/users', userController.GetUsers)
   
    router.put('/users/:userId',  userController.UpdateUser)
    
    //Borrar usuario
    router.delete('/users/:userId',  userController.DeleteUser)
    
    router.post('/users', userController.CreateUser)
    
    router.post('/login', userController.login);
module.exports = router; 