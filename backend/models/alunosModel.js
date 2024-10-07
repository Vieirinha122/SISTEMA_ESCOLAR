const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    turno: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    matricula: { type: String, required: true, unique: true },
    senha: { type: String, required: true }, // exemplo pra referenciar a outro schema
    turma: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Turma'}],
    professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor'},
  });
  
  module.exports = mongoose.model('Student', StudentSchema);
  