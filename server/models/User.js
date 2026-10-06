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
  password: {
    type: String
  },
  dob: { type: String, default: '' },
  gender: { type: String, default: '' },
  location: { type: String, default: '' },
  college: { type: String, default: '' },
  currentYear: { type: String, default: '' },
  qualification: { type: String, default: '' },
  graduationYear: { type: String, default: '' },
  branch: { type: String, default: '' },
  city: { type: String, default: '' },
  isStudentOrProfessional: { type: String, default: 'Student' },
  workExperience: { type: String, default: 'Fresher' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  areasOfInterest: {
    type: [String],
    default: []
  },
  howDidYouHear: { type: String, default: '' },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  emailOtp: {
    code: { type: String },
    expiresAt: { type: Date }
  },
  phoneOtp: {
    code: { type: String },
    expiresAt: { type: Date }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
