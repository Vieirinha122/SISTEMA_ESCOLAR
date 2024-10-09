const Disciplina = require('../models/disciplinasModel'); 

// Criar um novo estudante
exports.criarDisciplinas = async (req, res) => {
  try {
    const { nome, descricao, } = req.body;
    const newDisciplina = new Disciplina({ nome, descricao});
    await newDisciplina.save();
    res.status(201).json({ message: 'Disciplina criada com sucesso', newDisciplina });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os estudantes
exports.getDisciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.find({},); // Busca apenas o campo 'nome'
    res.json(disciplinas);
} catch (error) {
    res.status(500).json({ error: 'Erro ao buscar disciplinas' });
}
};

// Buscar estudante por ID
exports.getDisciplinasById = async (req, res) => {
  try {
    const disciplinas = await Disciplina.findById(req.params.id);
    if (!disciplinas) {
      return res.status(404).json({ message: 'Disciplina não encontrado' });
    }
    res.status(200).json(disciplinas);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar um estudante
exports.updateDisciplinas = async (req, res) => {
  try {
    const updatedDisciplinas = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDisciplinas) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }
    res.status(200).json({ message: 'Disciplina atualizado com sucesso', updatedDisciplinas });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar um estudante
exports.deleteDisciplinas = async (req, res) => {
  try {
    const deleteDisciplinas = await Disciplina.findByIdAndDelete(req.params.id);
    if (!deleteDisciplinas) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }
    res.status(200).json({ message: 'Disciplina deletada com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
