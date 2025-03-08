const express = require("express");
const { createExam, addMarks, getLeaderboard, getStudentMarks, getAllExams, addBulkMarks } = require("../controllers/examController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authenticate, createExam); // Only admins
router.post("/add-marks", authenticate, addMarks); // Only admins
router.get("/:examID/leaderboard", authenticate, getLeaderboard); // Admins and students can view leaderboard
router.get("/:examID/my-marks", authenticate, getStudentMarks); // Only authenticated students can view their own marks
router.get("/all", authenticate, getAllExams);
router.post("/add-marks-bulk", authenticate, addBulkMarks);



module.exports = router;
