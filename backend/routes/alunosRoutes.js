const express = require('express');
const router = express.Router();
const studentController = require('../controllers/alunosController');

// Rota para adicionar aluno
router.post('/students', studentController.createStudent);
// Rota para receber dados de todos os alunos
router.get('/students', studentController.getAllStudents);
// Rota para receber um aluno específico
router.get('/students/:id', studentController.getStudentById);
// Rota para atualizar um aluno específico
router.put('/students/:id', studentController.updateStudent);
// Rota para deletar um aluno específico
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
