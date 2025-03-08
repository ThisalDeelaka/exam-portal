const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
    studentID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    school: { type: String, required: true },
    password: { type: String, required: true },
});

// Hash password before saving
studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("Student", studentSchema);
