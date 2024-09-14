require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const usuariosRoutes = require('./backend/routes/usuariosRoutes');
const connectDB = require('./backend/config/database')

const app = express();
const port = process.env.PORT || 3000;
connectDB();

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/', usuariosRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
