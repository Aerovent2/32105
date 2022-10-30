import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: false },
  dni: { type: String, required: true, unique: true },
});

const Usuario = mongoose.model("usuarios", usuarioSchema);

export default Usuario;