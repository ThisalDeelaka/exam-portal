const express = require('express');
const { createExam, getExams, getExamById, deleteExam } = require('../controllers/examController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, admin, createExam); // Admin can create exam
router.get('/', protect, getExams); // Students & Admin can view exams
router.get('/:id', protect, getExamById); // Get a specific exam
router.delete('/:id', protect, admin, deleteExam); // Admin can delete an exam

module.exports = router;
