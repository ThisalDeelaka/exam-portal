const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, unique: true, sparse: true }, 
  school: { type: String },
  role: { type: String, enum: ['admin', 'student'], required: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
