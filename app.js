require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./backend/config/database')
// Chamada das rotas do projeto
const usuariosRoutes = require('./backend/routes/usuariosRoutes');
const alunosRoutes = require('./backend/routes/alunosRoutes');

const app = express();
const port = process.env.PORT || 3000;
connectDB();

// Middleware
app.use(bodyParser.json());

// Rotas de usuários
app.use('/api', usuariosRoutes);
app.use('/api', alunosRoutes);


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
