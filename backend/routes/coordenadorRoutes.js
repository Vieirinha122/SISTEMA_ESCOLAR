const express = require('express');
const router = express.Router();
const coordenadorController = require('../controllers/coordenadorController'); // Caminho correto para o controlador

router.post('/coordenadores', coordenadorController.registerCoordenador);
router.get('/coordenadores', coordenadorController.getCoordenador);
router.get('/coordenadores/:id', coordenadorController.getCoordenadorById);
router.put('/coordenadores/:id', coordenadorController.updateCoordenador);
router.delete('/coordenadores/:id', coordenadorController.deleteCoordenador);

module.exports = router;
