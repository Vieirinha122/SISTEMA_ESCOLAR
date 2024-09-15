const mongoose = require('mongoose');

const TurmaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    ano: { type: Number, required: true, unique: false },
    semestre: { type: Number, required: true, unique: false }
  });
  
  module.exports = mongoose.model('Turma', TurmaSchema);
  