const Conceito = require('../models/conceitosModel'); 

// Criar um novo estudante
exports.criarConceito = async (req, res) => {
  try {
    const { conceito, aluno, disciplina } = req.body;
    const newConceito = new Conceito({ conceito, aluno, disciplina });
    await newConceito.save();
    res.status(201).json({ message: 'Conceito criado com sucesso', newConceito });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os estudantes
exports.getConceito = async (req, res) => {
  try {
    const conceitos = await Conceito.find();
    res.status(200).json(conceitos);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    const updatedConceito = await Conceito.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedConceito) {
      return res.status(404).json({ message: 'Conceito não encontrado' });
    }
    res.status(200).json({ message: 'Conceito atualizado com sucesso', updatedConceito });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar um estudante
exports.deleteConceito = async (req, res) => {
  try {
    const deletedConceito = await Turma.findByIdAndDelete(req.params.id);
    if (!deletedConceito) {
      return res.status(404).json({ message: 'Conceito não encontrado' });
    }
    res.status(200).json({ message: 'Conceito deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
