const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

router.post('/professor', professorController.registerProfessor);
router.get('/professor', professorController.getProfessor);
router.get('/professor/:id', professorController.getProfessorById);
router.put('/professor/:id', professorController.updateProfessor);
router.delete('/professor/:id', professorController.deleteProfessor);

module.exports = router;
