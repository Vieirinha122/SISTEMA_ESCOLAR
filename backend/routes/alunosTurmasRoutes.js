const express = require('express');
const router = express.Router();
const alunosTurmasController = require('../controllers/alunosTurmasController');

router.post('/alunos-turmas', alunosTurmasController.registerAlunoTurma);
router.get('/alunos-turmas', alunosTurmasController.getAlunosTurmas);
// router.get('/alunos-turmas/:id', alunosTurmasController.getAlunoTurmaById);
// router.put('/alunos-turmas/:id', alunosTurmasController.updateAlunoTurma);
// router.delete('/alunos-turmas/:id', alunosTurmasController.deleteAlunoTurma);

module.exports = router;
