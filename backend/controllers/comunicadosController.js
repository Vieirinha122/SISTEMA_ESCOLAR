const Comunicado = require('../models/comunicadosModel'); // Caminho para seu modelo Comunicado

// Criar um novo Comunicado
exports.criarComunicado = async (req, res) => {
  try {
    const { titulo, descricao, data} = req.body;
    const newComunicado = new Comunicado({ titulo, descricao, data});
    await newComunicado.save();
    res.status(201).json({ message: 'Comunicado criado com sucesso', newComunicado });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os Comunicados
exports.getComunicados = async (req, res) => {
  try {
    const Comunicados = await Comunicado.find();
    res.status(200).json(Comunicados);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Buscar Comunicado por ID
exports.getComunicadosById = async (req, res) => {
  try {
    const Comunicado = await Comunicado .findById(req.params.id);
    if (!Comunicado) {
      return res.status(404).json({ message: 'Comunicado não encontrado' });
    }
    res.status(200).json(Comunicado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar um Comunicado
exports.updateComunicados = async (req, res) => {
  try {
    const updatedComunicado = await Comunicado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComunicado) {
      return res.status(404).json({ message: 'Comunicado não encontrado' });
    }
    res.status(200).json({ message: 'Comunicado atualizado com sucesso', updatedComunicado });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar um Comunicado
exports.deleteComunicados = async (req, res) => {
  try {
    const deletedComunicado = await Comunicado.findByIdAndDelete(req.params.id);
    if (!deletedComunicado) {
      return res.status(404).json({ message: 'Comunicado não encontrado' });
    }
    res.status(200).json({ message: 'Comunicado deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
