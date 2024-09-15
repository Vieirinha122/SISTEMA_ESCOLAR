const mongoose = require('mongoose');

// URL de conexão com o MongoDB (substitua <your_mongodb_url> pela URL do seu banco de dados)
const mongoURI = process.env.MONGO_CONNECTION_STRING;

// Função para conectar ao banco de dados
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado com sucesso');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1); // Encerra o processo se a conexão falhar
  }
};

// Exporta a função de conexão para ser usada em outros arquivos
module.exports = connectDB;
