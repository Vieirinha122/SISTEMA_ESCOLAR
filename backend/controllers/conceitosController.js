const Conceito = require('../models/conceitosModel');

// Criar um novo conceito
exports.createConceito = async (req, res) => {
  try {
    const conceito = new Conceito(req.body);
    const conceitoSalvo = await conceito.save();
    res.status(201).json(conceitoSalvo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar conceito', error: error.message });
  }
};

// Listar todos os conceitos
exports.getAllConceitos = async (req, res) => {
  try {
    const conceitos = await Conceito.find()
      .populate('aluno', 'nome matricula') // Inclui os dados do aluno (nome, matrícula)
      .populate('disciplina', 'nome codigo'); // Inclui os dados da disciplina (nome, código)
    res.status(200).json(conceitos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar conceitos', error: error.message });
  }
};

// Obter um conceito específico por ID
exports.getConceitoById = async (req, res) => {
  try {
    const conceito = await Conceito.findById(req.params.id)
      .populate('aluno', 'nome matricula')
      .populate('disciplina', 'nome codigo');
    if (!conceito) {
      return res.status(404).json({ message: 'Conceito não encontrado' });
    }
    res.status(200).json(conceito);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar conceito', error: error.message });
  }
};

// Atualizar um conceito por ID
exports.updateConceito = async (req, res) => {
  try {
    const conceitoAtualizado = await Conceito.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retorna o documento atualizado
    })
      .populate('aluno', 'nome matricula')
      .populate('disciplina', 'nome codigo');
    if (!conceitoAtualizado) {
      return res.status(404).json({ message: 'Conceito não encontrado' });
    }
    res.status(200).json(conceitoAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar conceito', error: error.message });
  }
};

// Deletar um conceito por ID
exports.deleteConceito = async (req, res) => {
  try {
    const conceitoDeletado = await Conceito.findByIdAndDelete(req.params.id);
    if (!conceitoDeletado) {
      return res.status(404).json({ message: 'Conceito não encontrado' });
    }
    res.status(200).json({ message: 'Conceito deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar conceito', error: error.message });
  }
};
