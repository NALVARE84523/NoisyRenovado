const express = require("express");
const mongoose = require("mongoose");

const usuario = require("./routes/usuario");

const app = express();
app.use(express.json());
app.use("/api/usuario/", usuario);

const port = process.env.PORT || 3005;
app.listen(port, () => console.log("Ejecutando en puerto: " + port));

mongoose.connect("mongodb://localhost/noisy_r", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conecion con mongo: OK"))
.catch((error) => console.log("Conexion con mongo: OFF"));
