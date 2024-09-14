const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
  nome_completo: {type: String, required: true},
  email: {type: String, required: true},
  senha: {type: String, required: true},
  tipo_usuario: {type: String, enum: ['Aluno','Professor','Coordenador'], required: true}
});
module.exports = mongoose.model('Usuario', UsuariosSchema);

