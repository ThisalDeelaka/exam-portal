const Exam = require('../models/Exam');

// Create an exam
exports.createExam = async (req, res) => {
  try {
    const { title, date } = req.body;
    const newExam = new Exam({ title, date });
    await newExam.save();
    res.status(201).json({ message: 'Exam created successfully', exam: newExam });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create exam' });
  }
};

// Get all exams
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
};

// Get a specific exam by ID
exports.getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ error: 'Exam not found' });

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exam' });
  }
};

// Delete an exam
exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ error: 'Exam not found' });

    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete exam' });
  }
};
