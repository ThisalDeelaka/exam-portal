const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerAdmin = async (req, res) => {
    try {
        const { name, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ name });
        if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

        // Create new admin
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
