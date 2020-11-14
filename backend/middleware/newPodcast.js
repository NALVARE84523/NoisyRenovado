//modulos de node
const multer = require("multer");

//directorio donde se va a guardar los archivos que se van a subir
const directorio = "./audios/";
//diskstorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  
    cb(null, directorio);
  },
  //nombre del archivo
  filename: (req, file, cb) => {
    //por medio de la fecha el asigna un codigo unico a cada archivo
    const filename =
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
      //enviamos el archivo como deberia quedar guardado, con fecha, nombre, en minuscula y la extension
      cb(null, filename);
  },
});
//cargar archivo
const cargarPodcast = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    //formatos o extensiones aceptadas se usa sticker porque en rautes/tableros esta sticker
    
    if (
        //va image/jpg y no sticker jpg porque el mimetype trae el imgage
      file.mimetype =="image/png" ||
      file.mimetype ==  "image/jpeg" ||
      file.mimetype ==  "image/jpg" ||
      file.mimetype ==  "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Solo aceptamos imagenes en jpg/jpeg/, png y gif"));
    }
  },
});
//exports
module.exports = cargarPodcast;
