const mongoose = require('mongoose');

const TurmaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina'}],
    alunos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
  });
  
  module.exports = mongoose.model('Turma', TurmaSchema);
  