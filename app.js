require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const alunosRoutes = require('./backend/routes/alunosRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao banco de dados MongoDB
mongoose.connect(process.env.MONGO_URI,)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));
// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/', alunosRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
