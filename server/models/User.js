const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email Address is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone Number is required'],
    unique: true,
    trim: true
  },
  dob: { type: String, default: '20 Oct 1990' },
  gender: { type: String, default: 'Male' },
  location: { type: String, default: 'Bangalore, Karnataka' },
  college: { type: String, default: 'RV College of Engineering' },
  currentYear: { type: String, default: 'Final Year' },
  qualification: { type: String, default: 'B.Tech' },
  graduationYear: { type: String, default: '2026' },
  branch: { type: String, default: 'Computer Science' },
  city: { type: String, default: 'Bangalore, Karnataka' },
  isStudentOrProfessional: { type: String, default: 'Student' },
  workExperience: { type: String, default: 'Fresher' },
  linkedin: { type: String, default: 'https://linkedin.com/in/rahulkumar' },
  github: { type: String, default: 'https://github.com/rahulkumar' },
  areasOfInterest: {
    type: [String],
    default: ['Data Analytics', 'Data Science', 'AI & ML', 'Digital Marketing']
  },
  howDidYouHear: { type: String, default: 'Instagram' },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  otp: {
    code: { type: String },
    expiresAt: { type: Date }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
