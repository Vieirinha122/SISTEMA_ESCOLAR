const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Aluno', AlunosSchema);

// Modelo de Aluno
const AlunosSchema = new mongoose.Schema({
  enrollmentNumber: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
});
AlunosSchema.add(UsuariosSchema);

// Adicionar modelo para professores, coordenadores, podendo ter outros 