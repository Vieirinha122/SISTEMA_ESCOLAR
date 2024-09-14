const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }] // exemplo pra referenciar a outro schema
});

module.exports = mongoose.model('Student', StudentSchema);
