const express = require('express');
const router = express.Router();
const studentController = require('../controllers/comunicadosController'); // Caminho para seu controlador

router.get('/comunicados', studentController.getComunicados);
router.get('/comunicados/:id', studentController.getComunicadosById);
router.post('/comunicados', studentController.criarComunicado);
router.put('/comunicados/:id', studentController.updateComunicados);
router.delete('/comunicados/:id', studentController.deleteComunicados);

module.exports = router;
