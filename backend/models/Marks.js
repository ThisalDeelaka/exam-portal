const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
    examID: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    paper1Marks: { type: Number, required: true },
    paper2Marks: { type: Number, required: true },
    totalMarks: { type: Number, required: true }, // This will now store the **average** instead of the sum
});

// Auto-calculate total marks as the average of Paper I and Paper II
marksSchema.pre("save", function (next) {
    this.totalMarks = (this.paper1Marks + this.paper2Marks) / 2;
    next();
});

module.exports = mongoose.model("Marks", marksSchema);
