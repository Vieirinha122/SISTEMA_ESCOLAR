const Professor = require('../models/professorModel');

// Criar um novo professor (Create)
exports.createProfessor = async (req, res) => {
  try {
    const { nome, email, disciplina } = req.body;
    const novoProfessor = new Professor({
      nome,
      email,
      disciplina
    });

    const professorSalvo = await novoProfessor.save();
    res.status(201).json(professorSalvo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar professor', error });
  }
};

// Listar todos os professores (Read - GET All)
exports.getAllProfessores = async (req, res) => {
  try {
    const professores = await Professor.find();
    res.status(200).json(professores);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar professores', error });
  }
};

// Buscar um professor pelo ID (Read - GET by ID)
exports.getProfessorById = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar professor', error });
  }
};

// Atualizar dados de um professor (Update)
exports.updateProfessor = async (req, res) => {
  try {
    const { nome, email, disciplina } = req.body;
    const professorAtualizado = await Professor.findByIdAndUpdate(
      req.params.id,
      { nome, email, disciplina },
      { new: true } // Retorna o professor atualizado
    );

    if (!professorAtualizado) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.status(200).json(professorAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar professor', error });
  }
};

// Deletar um professor (Delete)
exports.deleteProfessor = async (req, res) => {
  try {
    const professorDeletado = await Professor.findByIdAndDelete(req.params.id);
    if (!professorDeletado) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.status(200).json({ message: 'Professor deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar professor', error });
  }
};
