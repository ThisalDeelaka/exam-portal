const Exam = require("../models/Exam");
const Marks = require("../models/Marks");
const Student = require("../models/Student");

// Create an Exam
exports.createExam = async (req, res) => {
    try {
        const { examID, examName } = req.body;

        // Check if exam already exists
        const existingExam = await Exam.findOne({ examID });
        if (existingExam) return res.status(400).json({ message: "Exam ID already exists" });

        // Create new exam
        const newExam = new Exam({ examID, examName });
        await newExam.save();

        res.status(201).json({ message: "Exam created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Add or Update Marks
exports.addMarks = async (req, res) => {
    try {
        const { examID, studentID, paper1Marks, paper2Marks } = req.body;

        // Validate student and exam
        const student = await Student.findOne({ studentID });
        if (!student) return res.status(404).json({ message: "Student not found" });

        const exam = await Exam.findOne({ examID });
        if (!exam) return res.status(404).json({ message: "Exam not found" });

        // Check if marks already exist
        let marksEntry = await Marks.findOne({ examID: exam._id, studentID: student._id });

        if (marksEntry) {
            // Update existing marks
            marksEntry.paper1Marks = paper1Marks;
            marksEntry.paper2Marks = paper2Marks;
            marksEntry.totalMarks = paper1Marks + paper2Marks;
            await marksEntry.save();
        } else {
            // Create new marks entry
            marksEntry = new Marks({
                examID: exam._id,
                studentID: student._id,
                paper1Marks,
                paper2Marks,
                totalMarks: paper1Marks + paper2Marks,
            });
            await marksEntry.save();
        }

        res.status(201).json({ message: "Marks added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get Leaderboard for an Exam
exports.getLeaderboard = async (req, res) => {
    try {
        const { examID } = req.params;

        const exam = await Exam.findOne({ examID });
        if (!exam) return res.status(404).json({ message: "Exam not found" });

        const leaderboard = await Marks.find({ examID: exam._id })
            .populate("studentID", "studentID name school")
            .sort({ totalMarks: -1 });

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get Student's Marks for a Specific Exam
exports.getStudentMarks = async (req, res) => {
    try {
        const { examID } = req.params;

        // Ensure the user is authenticated as a student
        if (!req.user || !req.user.studentID) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        // Find the student in the database
        const student = await Student.findOne({ studentID: req.user.studentID });
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Find the exam in the database
        const exam = await Exam.findOne({ examID });
        if (!exam) return res.status(404).json({ message: "Exam not found" });

        // Find the marks entry for this student and exam
        const marks = await Marks.findOne({ examID: exam._id, studentID: student._id });

        if (!marks) return res.status(404).json({ message: "No marks found for this exam" });

        res.json({
            examID: exam.examID,
            examName: exam.examName,
            studentID: student.studentID,
            studentName: student.name,
            school: student.school,
            paper1Marks: marks.paper1Marks,
            paper2Marks: marks.paper2Marks,
            totalMarks: marks.totalMarks,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

exports.getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find({});
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

exports.addBulkMarks = async (req, res) => {
    try {
        const { examID, students } = req.body;
        const exam = await Exam.findOne({ examID });
        if (!exam) return res.status(404).json({ message: "Exam not found" });

        for (let studentData of students) {
            const student = await Student.findOne({ studentID: studentData.studentID });
            if (!student) continue;

            let marksEntry = await Marks.findOne({ examID: exam._id, studentID: student._id });

            if (marksEntry) {
                if (studentData.paper1Marks !== undefined) {
                    marksEntry.paper1Marks = studentData.paper1Marks;
                }
                if (studentData.paper2Marks !== undefined) {
                    marksEntry.paper2Marks = studentData.paper2Marks;
                }
                marksEntry.totalMarks = (marksEntry.paper1Marks || 0) + (marksEntry.paper2Marks || 0);
                await marksEntry.save();
            } else {
                marksEntry = new Marks({
                    examID: exam._id,
                    studentID: student._id,
                    paper1Marks: studentData.paper1Marks || 0,
                    paper2Marks: studentData.paper2Marks || 0,
                    totalMarks: (studentData.paper1Marks || 0) + (studentData.paper2Marks || 0),
                });
                await marksEntry.save();
            }
        }

        res.json({ message: "Bulk marks added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
