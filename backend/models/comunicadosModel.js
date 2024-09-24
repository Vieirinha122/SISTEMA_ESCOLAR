const mongoose = require('mongoose');

const ComunicadoSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true},
    descricao: { type: String, required: true, trim: true},
    data: { type: Date, required: true, default: Date.now},
  });
  
  module.exports = mongoose.model('Comunicado', ComunicadoSchema);