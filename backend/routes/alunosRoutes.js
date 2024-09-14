const express = require('express');
const router = express.Router();
const studentController = require('../controllers/alunosController'); // Caminho para seu controlador

router.post('/alunos', studentController.criarAluno);
router.get('/alunos', studentController.getAlunos);
router.get('/alunos/:id', studentController.getAlunosById);
router.put('/alunos/:id', studentController.updateAlunos);
router.delete('/alunos/:id', studentController.deleteAlunos);

module.exports = router;
