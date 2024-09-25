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
    const comunicados = await Comunicado.find()
      .populate('id_turma', 'nome') // Preenche o campo id_turma com o nome da turma
      .populate('id_professor', 'nome'); // Preenche o campo id_professor com o nome do professor
    
    res.json(comunicados);
  } catch (error) {
    console.error('Erro ao buscar comunicados:', error);
    res.status(500).json({ message: 'Erro ao buscar comunicados' });
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
