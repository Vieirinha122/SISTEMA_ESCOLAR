const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
  nome_completo: {type: String, required: true},
  email: {type: String, required: true},
  senha: {type: String, required: true},
  tipo_usuario: {type: String, enum: ['Aluno','Professor','Coordenador'], required: true},
  data_nascimento: {type: Date},
  telefone: {type: String},
});
module.exports = mongoose.model('Usuario', UsuariosSchema);

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] // exemplo pra referenciar a outro schema
});

module.exports = mongoose.model('Student', StudentSchema);
