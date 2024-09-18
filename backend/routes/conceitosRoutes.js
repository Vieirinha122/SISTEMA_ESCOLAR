const express = require('express');
const router = express.Router();
const conceitosController = require('../controllers/conceitosController'); // Caminho para seu controlador


router.post('/conceitos', conceitosController.criarConceito);
router.get('/conceitos', conceitosController.getConceito);
router.get('/conceitos/:id', conceitosController.getConceitoById);
router.put('/conceitos/:id', conceitosController.updateConceito);
router.delete('/conceitos/:id', conceitosController.deleteConceito);

module.exports = router;
