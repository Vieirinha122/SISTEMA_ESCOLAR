const express = require('express');
const router = express.Router();
// Importando o modelo Aluno
const Aluno = require('../models/alunosModel');

// Rota de login
router.post('/login', async (req, res) => {
  const { matricula, senha } = req.body;

  try {
    // Procurar o aluno no banco de dados usando a matrícula
    const aluno = await Aluno.findOne({ matricula });

    if (!aluno) {
      // Se o aluno não for encontrado
      return res.status(400).json({
        success: false,
        message: 'Matrícula ou senha incorretos',
      });
    }

    // Verificar se a senha está correta
    if (aluno.senha !== senha) {
      return res.status(400).json({
        success: false,
        message: 'Matrícula ou senha incorretos',
      });
    }

    // Se a matrícula e senha forem corretos, retornar os dados do aluno
    res.status(200).json({
      success: true,
      aluno: {
        nome: aluno.nome,
        matricula: aluno.matricula,
        turno: aluno.turno,
        turma: aluno.turma,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
});

module.exports = router;
