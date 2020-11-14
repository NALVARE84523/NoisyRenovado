const express = require("express");
const router = express.Router();
const {
    Usuario
} = require("../model/usuario");

const Podcast = require("../model/podcast");

//CRUD

//Create
router.post(
    "/cargarPodcast",
    cargarPodcast.single("audio"),
    auth,
    async (req, res) => {
        const url = req.protocol + "://" + req.get("host");
        const usuario = await Usuario.findById(req.usuario._id);
        //si no existe
        if (!usuario) return res.status(400).send("No existe el usuario en BD");
        //definimos la ruta del audio
        let rutaAudio = null;
        if (req.file.filename) {
            rutaAudio = url + "/audios/" + req.file.filename;

        } else {
            rutaAudio = null;
        }
        const podcast = new Podcast({
            idUsuario: usuario._id,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            tema: req.body.tema,
            audio: rutaAudio,
        });
        // enviamos el resultado
        const result = await podcast.save();
        res.status(200).send(result);
    });




//Read
router.get("/podcasts", auth, async (req, res) => {  
    const usuario = await Usuario.findById(req.usuario._id);   
    if (!usuario) return res.status(400).send("usuario no existe en BD");   
    const podcast = await Podcast.find({ idUsuario: req.usuario._id });
    //enviar lo que encontre
    res.send(podcast);
  });

//Update
router.put("/", auth, async (req, res) => {
    
    const usuario = await Usuario.findById(req.usuario._id);
    if (!usuario) return res.status(400).send("El usuario no existe en BD");
    //si el usuario existe
    const podcast = await Podcast.findByIdAndUpdate(
      req.body._id,
      {
        idUsuario: usuario._id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        tema: req.body.tema,        
      },
      {
        new: true,
      }
    );
    //si no hay podcast para el usuario
    if (!podcast) return res.status(400).send("Este podcast no existe, revisa los datos o es posible que haya sido eliminado");  
    res.status(200).send(podcast);
  });

router.delete("/:_id", auth, async (req, res) => {
    
    const usuario = await Usuario.findById(req.usuario._id); 
    if (!usuario) return res.status(401).send("No existe el usuario en BD");   
    const podcast = await Podcast.findByIdAndDelete(req.params._id); 
    //si no existe el podcast
    if (!podcast) return res.status(400).send("Este podcast no existe, revisa los datos o es posible que haya sido eliminado");
    //si se encuentra el podcast
    res.status(200).send({
        message: "Podcast eliminado"
    });
});
// exports
module.exports = router;