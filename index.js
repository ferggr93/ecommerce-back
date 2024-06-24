const app = require('./app.js') //Importamos el iniciado de express de app
const PORT = 3000;
//Config necesaria para poder leer el body de las peticiones
//app.use(express.json());
//app.use(express.urlencoded({extended:true}))


const mongoose = require('mongoose')
/*
mongodb+srv://ggrfernando93:<Qbtt9x7PE1EasQ8v>@indiespot.57a0fhd.mongodb.net/


const products = [
    {name:'hollow knight', price:100},
    {name:'hades', price:120}
] 
app.get('/', (req, res)=>{
        console.log('Hola!');
        
        res.send('Hola desde el servidor')
});

app.get('/product', (req,res)=>{
    
    res.send(products)
})

app.post('/product', (req,res) => {
        
    
    const nuevoProducto = req.body;
    console.log(nuevoProducto);

    products.push(nuevoProducto)
    res.send('Producto creado')
})*/


const dbConnect = async ()=>{

    try{
            await mongoose.connect("mongodb+srv://ggrfernando93:Qbtt9x7PE1EasQ8v@indiespot.57a0fhd.mongodb.net/Ecommerce");
            console.log('Conexion a la db correcta')
            
            //Si no se usa la db esto va afuera
            app.listen( PORT, ()=> {
                console.log(`Escuchando en el puerto ${PORT}`)
            })
        }   
    catch(error){
        console.log(error)
    }
}



dbConnect();