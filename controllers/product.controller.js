const Products = require('../models/product.model')

const GetProducts = async(req,res) => {
        
    try{
        const limit = parseInt(req.query.limit) || 20;
        const page = parseInt(req.query.page) || 0;
        
        //Busqqueda de productos en la base de datos
        const products = await Products.find().limit(limit).skip(page * limit)
        .sort({name:1}).collation({
            locale: 'es'
        })
        
        if(!products){
            return res.status(404).send({
                ok:false,
                message:"No se encontraron productos"
            })
        }
        
        res.status(200).send({
            ok:true,
            products
        })
        
    }catch(error){
        console.log(error)
    }
}

const CreateProduct = async (req,res) => {

    try{
        
        
        const productBody = req.body;
        
        const newProduct = new Products(productBody);
        
        if(req.file?.filename){
            newProduct.image=req.file.filename;
        }
        
        console.log(newProduct.image)
        await newProduct.save();

        res.status(200).send(
            {
                ok:true,
                message:`${newProduct.name} fue creado con exito`
            }
        )

    }catch(error){
        console.log(error)
        res.send({
            ok:false,
            message:'El producto no pudo ser creado'
        })
    }
}

const UpdateProduct = async (req,res) => {

    try{
        const id = req.params.id;
        const newValues = req.body;

        const newProduct = await Products.findByIdAndUpdate(id, newValues );

        res.status(200).send({
            ok:false,
            message:'Producto actualizado con exito'
        })

        
    }catch(error){
        console.log(error)
    }
}

const DeleteProduct = async (req,res) => {

    try{
        console.log(req.role)
        if(req.user.role != 'ADMIN_ROLE'){
            return res.status(403).send('No tienes permiso para borrar elementos')
        }
        const id = req.params.id;
        
        if(!id){
            return res.status(404).send({
                ok:false,
                message:'No se encuentra el elemento a borrar'
            })
        }
        const deletedProduct = await Products.findByIdAndDelete(id);

        res.send({
            ok:true,
            message:`${deletedProduct.name} Eliminado con exito`
        })


    }catch(error){
        res.status(401).send({
            ok:false,
            message:'No estas logueado'
        })
        
    }
}




module.exports = {
    GetProducts,
    DeleteProduct,
    CreateProduct,
    UpdateProduct
}