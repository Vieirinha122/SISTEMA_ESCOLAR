const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    id_professor: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina'}],
  });
  
  module.exports = mongoose.model('Professor', ProfessorSchema);