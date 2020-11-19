const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usuario = require("./routes/usuario");
const auth = require('./routes/auth');
const podcast = require('./routes/podcast');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/usuario/", usuario);
app.use("/api/auth", auth);
app.use("/api/podcast/", podcast);
app.use('/public', express.static('public'));

const port = process.env.PORT || 3005;
app.listen(port, () => console.log("Ejecutando en puerto: " + port));

mongoose.connect("mongodb://localhost/noisy_r", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conexion con mongo: OK"))
.catch((error) => console.log("Conexion con mongo: OFF"));
