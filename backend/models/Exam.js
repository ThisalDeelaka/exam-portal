const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    examID: { type: String, required: true, unique: true },
    examName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Exam", examSchema);
