const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rota para adicionar usuário
router.post('/usuarios', usuariosController.registerUser);
// Rota para receber dados de todos os usuários
router.get('/usuarios', usuariosController.getUsers);
// Rota para receber um usuário específico
router.get('/usuarios/:id', usuariosController.getUserById);
// Rota para atualizar um usuário específico
router.put('/usuarios/:id', usuariosController.updateUser);
// Rota para deletar um usuário específico
router.delete('/usuarios/:id', usuariosController.deleteUser);

module.exports = router;
