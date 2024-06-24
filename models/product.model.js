const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            minlength:4,
            maxlength:60,
            trim:true

        },
        price:{
            type:Number,
            required:true,
            minlength:1000,
            maxlength:10000000,
            trim:true

        },
        image:{
            type:String,
            required:false,
            trim:true
        },
        description:{
            type:String,
            required:true,
            minlength:10,
            maxlength:600
        },
        category:{
            type:String,
            required:false,
            minlength:3,
            maxlength:30
        }
        
    }
)

module.exports = mongoose.model('Product', productSchema)