const mongoose = require('mongoose');

const ConceitosSchema = new mongoose.Schema({
    conceito: { type: Number, required: true },
    aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' } ,
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' } ,
  });
  
  module.exports = mongoose.model('Conceito', ConceitosSchema);