const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API com Node.js',
    description: 'API para sistema escolar'
  },
  host: 'localhost:3000'
  // host: 'sistema-escolar-two.vercel.app',
};

const outputFile = './swagger-output.json';
const routes = ['./backend/routes/usuariosRoutes', './backend/routes/alunosRoutes', './backend/routes/turmasRoutes', './backend/routes/alunosTurmasRoutes', './backend/routes/disciplinasRoutes', './backend/routes/professorRoutes', './backend/routes/conceitosRoutes'];

swaggerAutogen(outputFile, routes, doc);

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./app.js'); 
  });