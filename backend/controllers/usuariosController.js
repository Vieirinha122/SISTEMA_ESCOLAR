const User = require('../models/usuariosModel');

// Criar um novo usuário
exports.registerUsuario = async (req, res) => {
  try {
    const { nome_completo, email, senha, tipo_usuario} = req.body;
    const newUser = new User({ nome_completo, email, senha, tipo_usuario});
    await newUser.save();
    res.status(201).json({ message: 'Usuário criado com sucesso', newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os usuários
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
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
