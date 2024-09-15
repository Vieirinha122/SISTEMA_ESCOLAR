//Variáveis de ambiente
require('dotenv').config();
// Requisitando Express e CORS
const express = require('express');
const cors = require('cors'); 
// Requisitando documentação da API
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
// Requisitando o Middleware
const bodyParser = require('body-parser');
// Requisição do banco de dados
const connectDB = require('./backend/config/database')
// Chamada das rotas do projeto
const usuariosRoutes = require('./backend/routes/usuariosRoutes');
const alunosRoutes = require('./backend/routes/alunosRoutes');
const turmasRoutes = require('./backend/routes/turmasRoutes')
const alunosTurmasRoutes = require('./backend/routes/alunosTurmasRoutes')
// Instanciando framework express e a porta
const app = express();
const port = process.env.PORT || 3000;
// Chamando função para conectar ao banco
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
//Rota da documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Rotas de usuários
app.use('/api', usuariosRoutes);
app.use('/api', alunosRoutes);
app.use('/api', turmasRoutes);
app.use('/api', alunosTurmasRoutes);

// Caso queira rodar o banco no local host
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Iniciar o servidor
module.exports = app;