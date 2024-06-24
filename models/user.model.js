//Modelo creado usando mongoose

const mongoose = require('mongoose');

const Schema = mongoose.Schema; //Receta para crear nuestro modelo

const userSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            minlength:3,
            maxlength:60
        },
        email:{
            type:String,
            trim:true,
            unique:true,
            lowercase:true,
            minlength:4,
            maxlength:80,
            index:true,

            validate:{
                validator : function(value){
                    const regex =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,})?$/ 
                    return regex.test(value);
                }
            }

        },
        age:{
            type:Number,
            required:false,
            min:12,
            max:120

        },
        password:{
            type:String,
            required:true,
            minlength:4,
            maxlength:65,
            trim:true
        },

        image:{
            type:String,
            required:false,
            trim:true
        },
        role:{
            type:String,
            required:false,
            default:'USER_ROLE',
            enum:[
                'USER_ROLE',
                'ADMIN_ROLE'
            ]
        },
        phone:{
            type:Number,
            required:false,
            minlength:8,
            trim:true

        },
        username:{
            type:String,
            required:true,

        },
        Rpassword:{
            type:String,
            required:true,
            minlength:4,
            maxlength:65,
            trim:true

        }

    }
)

module.exports = mongoose.model('User', userSchema);
//User pasa a ser users -> plurarilaza y pasa a lower todo