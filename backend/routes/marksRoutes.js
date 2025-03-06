const express = require('express');
const { addMarks, getStudentMarks, getLeaderboard, getStudentRank } = require('../controllers/marksController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, admin, addMarks); // Admin can add/update marks
router.get('/:studentId/:examId', protect, getStudentMarks); // Student can view their marks
router.get('/leaderboard/:examId', protect, getLeaderboard); // Get leaderboard for an exam
router.get('/rank/:studentId/:examId', protect, getStudentRank); // Get student's rank in leaderboard

module.exports = router;
