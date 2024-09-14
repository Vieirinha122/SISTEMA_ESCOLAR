const Student = require('../models/alunosModel');

// Criar um novo aluno
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todos os alunos
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um aluno por ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um aluno
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Excluir um aluno
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.status(200).json({ message: 'Aluno excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
