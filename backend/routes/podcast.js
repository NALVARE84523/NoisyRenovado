const express = require("express");
const router = express.Router();
const { Podcast } = require("../model/podcast");
const { Usuario } = require("../model/usuario");

const auth = require("../middleware/auth");
const cargarPodcast = require("../middleware/file");

//CRUD

//Read
router.get("/lista_podcast", auth, async (req, res) => {  
    const usuario = await Usuario.findById(req.usuario._id);   
    if (!usuario) return res.status(400).send("El usuario no existe");   
    const podcast = await Podcast.find({ idUsuario: req.usuario._id });
    res.send(podcast);
});


//Create
router.post("/", auth, async (req, res) => {
        const usuario = await Usuario.findById(req.usuario._id);

        if (!usuario) return res.status(400).send("El usuario no existe");

        const podcast = new Podcast({
            idUsuario: usuario._id,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            tema: req.body.tema,
        });
        // enviamos el resultado
        const result = await podcast.save();
        res.status(200).send(result);
    });

router.post("/cargarPodcast", cargarPodcast.single("audio") , auth, async(req, res) =>{
  const url = req.protocol + "://" + req.get("host");
  const usuario = await Usuario.findById(req.usuario._id);

  if(!usuario) return res.status(400).send("El usuario no existe");

  let rutaAudio = null;
  if(req.file.filename){
    rutaAudio = url + "/public/" + req.file.filename;
  }else{
    rutaAudio = null;
  }
  const podcast = new Podcast({
    idUsuario: usuario._id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    tema: req.body.tema,
    audio: rutaAudio,
  })
  const result = await podcast.save();
  res.status(200).send(result);
})


//Update
router.put("/", auth, async (req, res) => {
    const usuario = await Usuario.findById(req.usuario._id);
    if (!usuario) return res.status(400).send("El usuario no existe");

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
    
    if (!podcast) return res.status(400).send("Este podcast no existe, revisa los datos o es posible que haya sido eliminado");  
    res.status(200).send(podcast);
  });

//delete
router.delete("/:_id", auth, async (req, res) => {
    
    const usuario = await Usuario.findById(req.usuario._id); 
    if (!usuario) return res.status(401).send("El usuario no existe");   
    const podcast = await Podcast.findByIdAndDelete(req.params._id); 

    if (!podcast) return res.status(400).send("Este podcast no existe, revisa los datos o es posible que haya sido eliminado");

    res.status(200).send({ message: "Podcast eliminado" });
});

module.exports = router;