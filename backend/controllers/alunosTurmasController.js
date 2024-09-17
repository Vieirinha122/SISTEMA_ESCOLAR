const AlunosTurmas = require('../models/alunosTurmasModel');

// Criar um novo usuário
exports.registerAlunoTurma = async (req, res) => {
  try {
    const { aluno, turma} = req.body;
    const newAlunoTurma = new AlunosTurmas({ aluno, turma});
    await newAlunoTurma.save();
    res.status(201).json({ message: 'Aluno adicionado à turma com sucesso', newAlunoTurma });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os usuários
exports.getAlunosTurmas = async (req, res) => {
  try {
    const aluTur = await AlunosTurmas.find();
    // console.log(`nome do aluno: ${aluTur.aluno.nome}`);
    console.log(JSON.stringify(aluTur));
    res.status(200).json(aluTur);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Buscar usuário por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar um usuário
exports.updateUsuario = async (req, res) => {
  try {
    const updateUsuario = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateUsuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário atualizado com sucesso', updateUsuario });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar um usuário
exports.deleteUsuario = async (req, res) => {
  try {
    const deleteUsuario = await User.findByIdAndDelete(req.params.id);
    if (!deleteUsuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
