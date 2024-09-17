const Professor = require('../models/professorModel');

// Criar um novo usuário
exports.registerProfessor = async (req, res) => {
  try {
    const { nome, email, senha, id_professor} = req.body;
    const newProfessor = new Professor({ nome, email, senha, id_professor});
    await newProfessor.save();
    res.status(201).json({ message: 'Professor(a) criado com sucesso', newProfessor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os usuários
exports.getProfessor = async (req, res) => {
  try {
    const Professor = await Professor.find();
    res.status(200).json(Professor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Buscar usuário por ID
exports.getProfessorById = async (req, res) => {
  try {
    const Professor = await Professor.findById(req.params.id);
    if (!Professor) {
      return res.status(404).json({ message: 'Professor(a) não encontrado' });
    }
    res.status(200).json(Professor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar um usuário
exports.updateProfessor = async (req, res) => {
  try {
    const updateProfessor = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateProfessor) {
      return res.status(404).json({ message: 'Professor(a) não encontrado' });
    }
    res.status(200).json({ message: 'Professor(a) atualizado com sucesso', updateProfessor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar um usuário
exports.deleteProfessor = async (req, res) => {
  try {
    const deleteProfessor = await Professor.findByIdAndDelete(req.params.id);
    if (!deleteProfessor) {
      return res.status(404).json({ message: 'Professor(a) não encontrado' });
    }
    res.status(200).json({ message: 'Professor(a) deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
