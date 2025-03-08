const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
    examID: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    paper1Marks: { type: Number, required: true },
    paper2Marks: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
});

// Auto-calculate total marks
marksSchema.pre("save", function (next) {
    this.totalMarks = this.paper1Marks + this.paper2Marks;
    next();
});

module.exports = mongoose.model("Marks", marksSchema);
