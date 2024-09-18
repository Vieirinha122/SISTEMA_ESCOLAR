const Student = require('../models/alunosModel'); // Caminho para seu modelo Student

// Criar um novo estudante
exports.criarAluno = async (req, res) => {
  try {
    const { nome, email, senha, matricula, turno, turma } = req.body;
    const newStudent = new Student({ nome, email, senha, turno, matricula, turma });
    await newStudent.save();
    res.status(201).json({ message: 'Estudante criado com sucesso', newStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os estudantes
exports.getAlunos = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Buscar estudante por ID
exports.getAlunosById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Estudante não encontrado' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar um estudante
exports.updateAlunos = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Estudante não encontrado' });
    }
    res.status(200).json({ message: 'Estudante atualizado com sucesso', updatedStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar um estudante
exports.deleteAlunos = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Estudante não encontrado' });
    }
    res.status(200).json({ message: 'Estudante deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
