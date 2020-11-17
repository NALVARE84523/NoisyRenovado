const multer = require("multer");

const directorio = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  
    cb(null, directorio);
  },
  //nombre del archivo
  filename: (req, file, cb) => {

    const filename =
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");

      cb(null, filename);
  },
});

const cargarPodcast = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    
    if (
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
