const mongoose = require('mongoose');

// Definindo o esquema ConceitosSchema
const ConceitosSchema = new mongoose.Schema({
    AV1: { type: Number, required: true }, // Nota da AV1
    AV2: { type: Number, required: true }, // Nota da AV2
    MU: { type: Number, required: true },  // Nota de MU
    NOA: { type: Number, required: true }, // Nota de NOA
    MF: { type: Number, required: true },  // Média Final (M.F)
    resultado: { type: String, required: true }, // Resultado final (Aprovado/Reprovado, etc.)
    
    aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' },
});

// Criando e exportando o modelo
module.exports = mongoose.model('Conceito', ConceitosSchema);
