const mongoose = require('mongoose');

const AlunoTurmaSchema = new mongoose.Schema({
    aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' } ,
    turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma' } // exemplo pra referenciar a outro schema
  });
  
  module.exports = mongoose.model('AlunosTurmas', AlunoTurmaSchema);
  