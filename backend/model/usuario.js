const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const esquemaUsuario = new mongoose.Schema({
  nombre: String,
  nombreUsuario: String,
  correo: String,
  password: String,
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

esquemaUsuario.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      nombre: this.nombre,
      nombreUsuario: this.nombreUsuario,
    },
    "clave"
  );
};

const Usuario = mongoose.model("usuario", esquemaUsuario);
module.exports.Usuario = Usuario;
module.exports.esquemaUsuario = esquemaUsuario;
