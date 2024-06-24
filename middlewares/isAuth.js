//Middleware que nos permitira chequear que el usuario este autenticado con el token

const jwt = require('jsonwebtoken');
const secret = 'alfabeta'

function jwtVerify(req,res,next){

    //El token generado al hacer el login
    const token = req.headers.authorization;
    //Viene el token? podriamos no estar mandando la cabezera
    if(!token){
        return res.status(400).send({
            ok:false,
            message:'no se creo el token'
        })
    }
    //Funcion para verificar que la info del token este correcta. token,secret y funcion. El payload contiene toda la informacion del objeto encriptado
    jwt.verify(token, secret, (error, payload)=>{
            //dos caminos, token incorrecto(error) y en el cual el token es correcto
            
            if(error){
               return  res.status(401).send(
                    {
                        ok:false,
                        message:"No tienes autorizacion"
                    }
                )
            }

            //token correcto, continuamos la ejecucion de la peticion
            //req.user es una propiedad creada por mi y agregandola al objeto request
            req.user = payload.user //Lo igualo a la info del user que esta en el payload
            
            //Si todo esta bien, controllamos hacia el controlador(funcion) correspondiente
            next();
    
        })

}

module.exports = jwtVerify;