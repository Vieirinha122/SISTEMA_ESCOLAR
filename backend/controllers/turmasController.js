const Turma = require('../models/turmasModel'); 
// Criar um novo estudante
exports.criarTurma = async (req, res) => {
  try {
    const { nome, disciplinas, alunos } = req.body;
    const newTurma = new Turma({ nome, disciplinas, alunos });
    await newTurma.save();
    res.status(201).json({ message: 'Turma criada com sucesso', newTurma });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os estudantes
exports.getTurmas = async (req, res) => {
  try {
    const students = await Turma.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Buscar estudante por ID
exports.getTurmasById = async (req, res) => {
  try {
    const student = await Turma.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Estudante não encontrado' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar um estudante
exports.updateTurmas = async (req, res) => {
  try {
    const updatedStudent = await Turma.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Estudante não encontrado' });
    }
    res.status(200).json({ message: 'Estudante atualizado com sucesso', updatedStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar um estudante
exports.deleteTurmas = async (req, res) => {
  try {
    const deletedStudent = await Turma.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Estudante não encontrado' });
    }
    res.status(200).json({ message: 'Estudante deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
