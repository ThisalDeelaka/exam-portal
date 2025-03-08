const express = require("express");
const {
    createExam,
    addMarks,
    getLeaderboard,
    getStudentMarks,
    getAllExams,
    addBulkMarks,
    getStudentAllMarks
} = require("../controllers/examController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Place fixed routes before dynamic routes to prevent conflicts!
router.get("/student/my-marks", authenticate, getStudentAllMarks); // FIXED: This must be placed first!

router.post("/create", authenticate, createExam); // Only admins can create exams
router.post("/add-marks", authenticate, addMarks); // Only admins can add marks
router.post("/add-marks-bulk", authenticate, addBulkMarks); // Bulk add marks

router.get("/all", authenticate, getAllExams); // Get all exams

// Dynamic Routes (Must be placed last)
router.get("/:examID/leaderboard", authenticate, getLeaderboard); // Get leaderboard for a specific exam
router.get("/:examID/my-marks", authenticate, getStudentMarks); // Get a student's marks for a specific exam

module.exports = router;
