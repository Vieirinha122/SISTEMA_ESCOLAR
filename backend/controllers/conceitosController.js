const Conceito = require('../models/conceitosModel'); 

// Criar um novo estudante
exports.criarConceito = async (req, res) => {
  const { conceito, aluno, disciplina } = req.body;
    try {
        const novoConceito = new Conceito({ conceito, aluno, disciplina });
        await novoConceito.save();
        res.status(201).json({ message: 'Conceito cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar conceito' });
    }
};

// Listar todos os estudantes
exports.getConceito = async (req, res) => {
  try {
    const conceitos = await Conceito.find()
        .populate('aluno', 'nome') // Popula o nome do aluno
        .populate('disciplina', 'nome'); // Popula o nome da disciplina
    res.json(conceitos);
} catch (err) {
    res.status(500).json({ message: err.message });
}
};

// Buscar estudante por ID
exports.getConceitoById = async (req, res) => {
  try {
    const conceito = await Conceito.findById(req.params.id)
      .populate('aluno', 'nome')  // Preenche o campo aluno com o nome
      .populate('disciplina', 'nome'); // Preenche o campo disciplina com o nome

    res.json(conceito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um estudante
exports.updateConceito = async (req, res) => {
  try {
    const conceito = await Conceito.findById(req.params.id);
    if (!conceito) return res.status(404).json({ message: 'Conceito não encontrado' });

    conceito.conceito = req.body.conceito || conceito.conceito;
    conceito.aluno = req.body.aluno || conceito.aluno;
    conceito.disciplina = req.body.disciplina || conceito.disciplina;

    const conceitoAtualizado = await conceito.save();
    res.json(conceitoAtualizado);
} catch (err) {
    res.status(500).json({ message: err.message });
}
};

// Deletar um estudante
exports.deleteConceito = async (req, res) => {
  try {
    const conceito = await Conceito.findById(req.params.id);
    if (!conceito) return res.status(404).json({ message: 'Conceito não encontrado' });

    await conceito.remove();
    res.json({ message: 'Conceito excluído com sucesso' });
} catch (err) {
    res.status(500).json({ message: err.message });
}
};
