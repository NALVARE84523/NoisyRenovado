const multer = require("multer");

var directorio = "./public/";

function nombreArchivo(nombre){
  console.log(nombre);
  if(nombre.endsWith(".jpg") || nombre.endsWith(".jpeg") || nombre.endsWith(".png") || nombre.endsWith(".gif")){
      directorio += "images/";
}
if(nombre.endsWith(".mp3")){
  directorio += "audio/";
}
console.log('Funcion' + directorio);
}

const storage = multer.diskStorage({
  filename: (req, file, cb) => {

    const filename =
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");

      cb(null, filename);
  },
  destination: (req, file, cb) => {
  console.log('Destino: ' + directorio);
    cb(null, directorio);
  },
  //nombre del archivo

});

const cargarPodcast = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    nombreArchivo(file.originalname);
    if (
      file.mimetype =="audio/mpeg" ||
      file.mimetype == "audio/wav" ||
      file.mimetype == "audio/aac" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png"
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
