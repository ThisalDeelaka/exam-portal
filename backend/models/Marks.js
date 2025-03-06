const mongoose = require('mongoose');

const MarksSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  paper1: { type: Number, default: 0 },
  paper2: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Marks', MarksSchema);
