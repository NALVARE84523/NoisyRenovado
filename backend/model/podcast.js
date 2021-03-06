const mongoose = require("mongoose");

const esquemaPodcast = new mongoose.Schema({
    idUsuario: String,
    nombre: String,
    descripcion: String,
    tema: String,
    audio: String,
    fecha:{
        type: Date,
        default: Date.now,
    }
})

const Podcast = mongoose.model("podcast", esquemaPodcast);
module.exports.Podcast = Podcast;