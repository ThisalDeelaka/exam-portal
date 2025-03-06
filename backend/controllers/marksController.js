const Marks = require('../models/Marks');
const Exam = require('../models/Exam');
const User = require('../models/User');

// Add or Update Marks for a Student
exports.addMarks = async (req, res) => {
  try {
    const { studentId, examId, paper1, paper2 } = req.body;

    // Calculate total marks
    const total = paper1 + paper2;

    let marks = await Marks.findOne({ studentId, examId });

    if (marks) {
      // Update marks if they already exist
      marks.paper1 = paper1;
      marks.paper2 = paper2;
      marks.total = total;
    } else {
      // Create new marks entry
      marks = new Marks({ studentId, examId, paper1, paper2, total });
    }

    await marks.save();
    res.status(200).json({ message: 'Marks updated successfully', marks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add/update marks' });
  }
};

// Get Marks for a Specific Student & Exam
exports.getStudentMarks = async (req, res) => {
  try {
    const { studentId, examId } = req.params;

    const marks = await Marks.findOne({ studentId, examId });

    if (!marks) return res.status(404).json({ error: 'Marks not found' });

    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student marks' });
  }
};

// Get Leaderboard for an Exam
exports.getLeaderboard = async (req, res) => {
  try {
    const { examId } = req.params;
    const leaderboard = await Marks.find({ examId })
      .sort({ total: -1 }) // Sort in descending order based on total marks
      .limit(20); // Only get the top 20 students

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

// Get Student Rank in Leaderboard
exports.getStudentRank = async (req, res) => {
  try {
    const { studentId, examId } = req.params;

    // Get all marks sorted by total marks (descending)
    const marks = await Marks.find({ examId }).sort({ total: -1 });

    // Find the rank of the student
    const rank = marks.findIndex(m => m.studentId === studentId) + 1;

    if (rank === 0) return res.status(404).json({ error: 'Student not found in leaderboard' });

    res.status(200).json({ rank });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student rank' });
  }
};
