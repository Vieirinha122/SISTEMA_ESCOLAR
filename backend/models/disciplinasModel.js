const mongoose = require('mongoose');

const DisciplinaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true},
    professores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Professor' }]
  });
  
  module.exports = mongoose.model('Disciplina', DisciplinaSchema);