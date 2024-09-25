const mongoose = require('mongoose');

const ComunicadoSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true},
    id_turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma'},
    id_professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor'},
    descricao: { type: String, required: true, trim: true},
    data: { type: Date, required: true, default: Date.now},
  });
  
  module.exports = mongoose.model('Comunicado', ComunicadoSchema);