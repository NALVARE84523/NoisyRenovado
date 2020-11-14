const jwt = require("jsonwebtoken");

function auth(req, res, next){
    let jwtToken = req.header("Authorization");
    jwtToken = jwtToken.split(" ")[1];

    if(!jwtToken) return res.status(400).send("No hay token para validar");

    try {
        const payload = jwt.verify(jwtToken, "clave");
        req.usuario = payload;
        next();
    } catch (error) {
        res.status(400).send("Token no valido, no tiene autorizacion");
    }
}

module.exports = auth;