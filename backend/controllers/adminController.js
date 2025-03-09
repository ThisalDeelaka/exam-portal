const Admin = require("../models/Admin");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerAdmin = async (req, res) => {
    try {
        const { name, password } = req.body;

        
        const existingAdmin = await Admin.findOne({ name });
        if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

        
        const newAdmin = new Admin({ name, password });
        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { name, password } = req.body;

        // Find admin by name
        const admin = await Admin.findOne({ name });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, name: admin.name }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, message: "Admin logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

exports.updateUserPassword = async (req, res) => {
    try {
        const { userID, newPassword, role } = req.body; 

        if (!userID || !newPassword || !role) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        let user;
        if (role === "admin") {
            user = await Admin.findOneAndUpdate({ _id: userID }, { password: hashedPassword }, { new: true });
        } else if (role === "student") {
            user = await Student.findOneAndUpdate({ studentID: userID }, { password: hashedPassword }, { new: true });
        } else {
            return res.status(400).json({ message: "Invalid role specified" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: `Password updated successfully for ${role}` });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Server error" });
    }
};