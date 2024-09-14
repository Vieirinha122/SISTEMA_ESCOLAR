const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');

router.post('/usuarios', usuarioController.registerUsuario);
router.get('/', usuarioController.getUsuarios);
router.get('/usuarios/:id', usuarioController.getUsuarioById);
router.put('/usuarios/:id', usuarioController.updateUsuario);
router.delete('/usuarios/:id', usuarioController.deleteUsuario);

module.exports = router;
