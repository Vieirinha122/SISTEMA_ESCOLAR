const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] // exemplo pra referenciar a outro schema
  });
  
  module.exports = mongoose.model('Student', StudentSchema);
  