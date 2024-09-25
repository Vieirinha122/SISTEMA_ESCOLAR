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
const alunosRoutes = require('./backend/routes/alunosRoutes');
const disciplinasRoutes = require('./backend/routes/disciplinasRoutes');
const professorRoutes = require('./backend/routes/professorRoutes');
const coordenadorRoutes = require('./backend/routes/coordenadorRoutes');
const conceitosRoutes = require('./backend/routes/conceitosRoutes');
const comunicadosRoutes = require('./backend/routes/comunicadoRoutes');
const turmasRoutes = require('./backend/routes/turmasRoutes');
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
app.use('/api', alunosRoutes);
app.use('/api', professorRoutes);
app.use('/api', disciplinasRoutes);
app.use('/api', coordenadorRoutes);
app.use('/api', conceitosRoutes);
app.use('/api', comunicadosRoutes);
app.use('/api', turmasRoutes);

// Caso queira rodar o banco no local host
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
// Iniciar o servidor
module.exports = app;