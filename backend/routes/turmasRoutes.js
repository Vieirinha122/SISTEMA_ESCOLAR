const express = require('express');
const router = express.Router();
const turmasController = require('../controllers/turmasController'); // Caminho para seu controlador


router.post('/turmas', turmasController.criarTurma);
router.get('/turmas', turmasController.getTurmas);
router.get('/turmas/:id', turmasController.getTurmasById);
router.put('/turmas/:id', turmasController.updateTurmas);
router.delete('/turmas/:id', turmasController.deleteTurmas);

module.exports = router;
