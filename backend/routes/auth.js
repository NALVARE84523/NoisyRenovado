const express = require("express");
const router = express.Router();

const { Usuario } = require("../model/usuario");

router.post("/", async(req, res) =>{

    const usuario = await Usuario.findOne({ nombreUsuario: req.body.nombreUsuario });

    if(!usuario) return res.status(400).send("Correo o contraseña no son validos");

    if(usuario.password !== req.body.password)
    return res.status(400).send("Correo o contraseña no son validos");

    const jwtToken = usuario.generateJWT();
    res.status(200).send({ jwtToken });
});

module.exports = router;