const Professor = require('../models/professorModel'); // Importação do modelo Professor
const Disciplina = require('../models/disciplinasModel'); // Importação do modelo Professor


exports.registerProfessor = async (req, res) => {
  try {
    const { nome, email, senha, id_professor, disciplinas } = req.body;
    const newProfessor = new Professor({ nome, email, senha, id_professor, disciplinas });
    await newProfessor.save();
    res.status(201).json({ message: 'Professor(a) criado com sucesso', newProfessor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os usuários
exports.getProfessor = async (req, res) => {
  try {
    // Popula a disciplina associada
    const professores = await Professor.find().populate('disciplina'); 
    const resultado = professores.map(professor => ({
        nome: professor.nome,
        email: professor.email,
        disciplina: professor.disciplinas ? professor.disciplinas.nome : 'Sem Disciplina', // Verifica se disciplina existe
        id: professor.id_professor
    }));
    res.json(resultado);
} catch (error) {
    res.status(500).json({ message: 'Erro ao buscar professores', error });
}
};

// Buscar usuário por ID
exports.getProfessorById = async (req, res) => {
  const professorId = req.params.id; // Pega o ID do professor da requisição

    try {
        // Busca o professor no banco de dados e popula as disciplinas e turmas
        const professor = await Professor.findById(professorId)
            .populate('disciplinas') // Preenche as informações das disciplinas
            .populate({
                path: 'turmas',
                populate: { path: 'alunos' } // Preenche as informações dos alunos
            });

        // Verifica se o professor foi encontrado
        if (!professor) {
            return res.status(404).json({ error: 'Professor não encontrado.' });
        }

        // Retorna os dados do professor
        res.json(professor);
    } catch (error) {
        console.error('Erro ao buscar professor:', error);
        res.status(500).json({ error: 'Erro ao buscar professor.' });
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
