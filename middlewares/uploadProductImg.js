const multer = require('multer');

/*Esto es un molde, de base va todo asi
lo que cambiaria seria luego si queremos añadir mas cosas
en destination ponemos la direccion donde se guardaran las imagenes
cb es la funcion callback, el null representa algun error que pueda haber
filename es donde nombramos los archivos
*/
const storage = multer.diskStorage({
    destination: (req,file, cb)=>{
        cb(null, 'public/images/products')
    },
    filename:(req,file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


const uploadMulter = multer(
    {
        storage:storage,
        
    }
)

const upload = uploadMulter.single('image'); //Este valor toma el image(el name -> nombre de propiedad, el campo donde espero la imagen)

module.exports = upload;