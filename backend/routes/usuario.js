const express = require("express");
const router = express.Router();

const { Usuario } = require("../model/usuario");

router.post("/", async(req, res)=>{
    let usuario = await Usuario.findOne({ nombreUsuario: req.body.nombreUsuario });

    if(usuario) return res.status(400).send("El usuario ya esta registrado");

    usuario = new Usuario({
        nombre: req.body.nombre,
        nombreUsuario: req.body.nombreUsuario,
        correo: req.body.correo,
        password: req.body.password,
    })

    const result = await usuario.save();
    const jwtToken = usuario.generateJWT();
    res.status(200).send({ jwtToken });
})

module.exports = router;