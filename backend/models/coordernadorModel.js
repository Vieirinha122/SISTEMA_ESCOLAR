const mongoose = require('mongoose');

const CoordenadorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    id_coordenador: { type: String, required: true, unique: true },
    senha: { type: String, required: true } // exemplo pra referenciar a outro schema
  });
  
  module.exports = mongoose.model('Coordenador', CoordenadorSchema);