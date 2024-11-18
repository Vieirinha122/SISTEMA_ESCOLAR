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

// Lógica para calcular a Média Final (MF) e o resultado
ConceitosSchema.pre('save', function(next) {
    const mediaFinal = (this.AV1 + this.AV2 + this.MU + this.NOA) / 4; // Exemplo de cálculo de média
    this.MF = mediaFinal; // Atribui a média final

    // Lógica para definir o resultado com base na média
    if (mediaFinal >= 6) {
        this.resultado = 'Aprovado';
    } else {
        this.resultado = 'Reprovado';
    }

    next(); // Continua com o processo de salvamento
});

// Criando e exportando o modelo
module.exports = mongoose.model('Conceito', ConceitosSchema);
