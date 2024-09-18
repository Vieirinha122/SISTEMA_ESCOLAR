const Coordenador = require('../models/coordernadorModel'); // Importação do modelo Professor

exports.registerCoordenador = async (req, res) => {
  try {
    const { nome, email, senha, id_coordenador } = req.body;
    const newCoordenador = new Coordenador({ nome, email, senha, id_coordenador });
    await newCoordenador.save();
    res.status(201).json({ message: 'Coordenador(a) criado com sucesso', newCoordenador });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os usuários
exports.getCoordenador = async (req, res) => {
  try {
    const Coordenadores = await Coordenador.find();
    res.status(200).json(Coordenadores);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Buscar usuário por ID
exports.getCoordenadorById = async (req, res) => {
  try {
    const Coordenadores = await Coordenador.findById(req.params.id);
    if (!Coordenadores) {
      return res.status(404).json({ message: 'Coordenador(a) não encontrado' });
    }
    res.status(200).json(Coordenadores);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar um usuário
exports.updateCoordenador = async (req, res) => {
  try {
    const updateCoordenador = await Coordenador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateCoordenador) {
      return res.status(404).json({ message: 'Coordenador(a) não encontrado' });
    }
    res.status(200).json({ message: 'Coordenador(a) atualizado com sucesso', updateCoordenador });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar um usuário
exports.deleteCoordenador = async (req, res) => {
  try {
    const deleteCoordenador = await Coordenador.findByIdAndDelete(req.params.id);
    if (!deleteCoordenador) {
      return res.status(404).json({ message: 'Coordenador(a) não encontrado' });
    }
    res.status(200).json({ message: 'Coordenador(a) deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
