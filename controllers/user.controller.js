
const User = require('../models/user.model')

//Libreria que nos permite encriptar la contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Libreria jsonwebtoken para encriptar
const jwt = require('jsonwebtoken');

//Palabra secreta para el encriptado
const secret = 'alfabeta'

const GetUsers = async (req, res) => {

    try {

        const id=req.params.id;
        
        //Vino con id?
        if(id){
            const user  = await User.findById(id); //,{password:0}
            
            //Viene con id pero el id no pertenece a nadie en la coleccion?
            if(!user) return res.send({
                ok:false,
                message:'No se encontro el usuario'
            })
            //Ocultar la password al devolver el producto
            //user.password = undefined;

            return res.send(user); //El return es importante, recordar que solo puede haber una respuesta
            
            
        }
        //Metodo find de mongoose
        const users = await User.find();
        res.send(users)
    } catch (error) {
        console.log(error)
    }
}

const CreateUser = async (req, res) => {

    try{
        const user = req.body;
        
        //Encriptar contraseña
        user.password = bcrypt.hashSync(user.password, saltRounds)
        //Creamos una nueva instancia apartir del req.body, recordar que usuario es un objeto con multiples propiedades
        const newUser = new User(user);
        
        //Guardamos el usuario en la base de datos, para esto usamos la funcionalidad save que viene incluida con mongoose.
        await newUser.save();
        //Evitamos que se vea la contraseña
        newUser.password = undefined;
        
        delete newUser.password;
        res.status(201).send("Producto creado con exito")
    }catch(error){
        console.log(error)
    }
}

const UpdateUser = async (req, res) => {

    try{
        const id = req.params.userId;

        const newValues = req.body;
        
        //Nwe:true opcional, nos permite consolear el user con el body ya actualizado
        const updatedUser = await User.findByIdAndUpdate(id, newValues, {new:true})
        res.send('user editado')
    }catch(error){
        console.log(error)
    }
}

const DeleteUser = async (req, res) => {
    
    try{

        //Comprobar si la persona es admin-role
        // console.log(req.user) //este req user es lo que tomamos del payload al crear el token en isAuth
        // //Si el usuario no es admin, no puede borrar
        // if(req.user.role != 'ADMIN_ROLE'){
        //     return res.status(401).send({
        //         ok:false,
        //         message:'No tienes permisos para realizar esta accion'
        //     })
        // }
        const id = req.params.userId //Obtenemos el id del ususario a borrar
        
        const userDeleted = await User.findByIdAndDelete(id);
        
        if(!userDeleted){
            res.status(404).send({
                ok:false,
                message:'No se encontro'
            })
        }
        res.send('Usuario borrado')
    
    
    }catch(error){
        console.log(error)
    }
}

const login = async (req,res)=>{
    
    try{
        //Destructuro el objeto body para obtener las propiedades que necesito
        const {password, email} = req.body
        
        //Nos vino el mail y password?
        if(!password || !email){
            return res.status(400).send({
                ok:false,
                message:'Faltan datos'
            })
        }
        //Buscmos con findOne, ell cual solo busca 1 valor coincidente, al encontrarla para la busqueda
        const user = await User.findOne( { /*propiedad email*/email : email.toLowerCase() /*email a buscar, lo que obtenemos del body*/  })
        
        //Si no existe el usuario
        if(!user){
            return res.status(404).send(
                {
                    ok:false,
                    message:"No existe usuario"
                }
            )
        }

        //Si existe el usuario, comprobamos la contraseña
        const verifiedUser = await bcrypt.compare(password, user?.password) //El user?.password es el chaining operator, chequea que primero esta el usuario y no venga null. Analogo a user && user.password
        
        console.log(verifiedUser)

        //delete user.password;
        user.password=undefined;

        //Generar token para evitar la manipulacion de datos de usuario
        const token = jwt.sign({user}, secret, {expiresIn:'30m'});//Lo que vamos a encriptar y en base a que 
        res.send({
            ok:true,
            message:"Login correcto",
            user,
            token
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            ok:false,
            message:'No se pudo hacer e login'
            

        })
    }
}
module.exports = {
    GetUsers,
    CreateUser,
    UpdateUser,
    DeleteUser,
    login
}

