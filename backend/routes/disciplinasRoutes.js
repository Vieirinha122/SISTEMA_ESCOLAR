const express = require('express');
const router = express.Router();
const disciplinasController = require('../controllers/disciplinasController'); // Caminho para seu controlador


router.get('/disciplinas', disciplinasController.getDisciplinas);
router.get('/disciplinas/:id', disciplinasController.getDisciplinasById);
router.post('/disciplinas', disciplinasController.criarDisciplinas);
router.put('/disciplinas/:id', disciplinasController.updateDisciplinas);
router.delete('/disciplinas/:id', disciplinasController.deleteDisciplinas);

module.exports = router;
