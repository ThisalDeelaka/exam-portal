const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerStudent = async (req, res) => {
    try {
        const { studentID, name, school, password } = req.body;

        // Check if student already exists
        const existingStudent = await Student.findOne({ studentID });
        if (existingStudent) return res.status(400).json({ message: "Student already registered" });

        // Create new student
        const newStudent = new Student({ studentID, name, school, password });
        await newStudent.save();

        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

exports.loginStudent = async (req, res) => {
    try {
        const { studentID, password } = req.body;

        // Find student by ID
        const student = await Student.findOne({ studentID });
        if (!student) return res.status(400).json({ message: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: student._id, studentID: student.studentID }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Return token and student details
        res.json({
            token,
            student: {
                studentID: student.studentID,
                name: student.name,
                school: student.school
            },
            message: "Student logged in successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
