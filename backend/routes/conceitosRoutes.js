const express = require('express');
const router = express.Router();
const conceitoController = require('../controllers/conceitosController');

// Criar um novo conceito
router.post('/conceitos', conceitoController.createConceito);

// Listar todos os conceitos
router.get('/conceitos', conceitoController.getAllConceitos);

// Obter um conceito específico por ID
router.get('/conceitos:id', conceitoController.getConceitoById);

// Atualizar um conceito por ID
router.put('/conceitos:id', conceitoController.updateConceito);

// Deletar um conceito por ID
router.delete('/conceitos:id', conceitoController.deleteConceito);

module.exports = router;
