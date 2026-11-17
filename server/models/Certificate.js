const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
    index: true
  },
  studentName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  studentEmail: {
    type: String,
    trim: true
  },
  avatarInitials: {
    type: String,
    default: 'ST'
  },
  avatarColor: {
    type: String,
    default: '#2563EB'
  },
  course: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  certificateType: {
    type: String,
    enum: ['Course Certificate', 'Internship Certificate', 'Experience Letter', 'LOR'],
    default: 'Course Certificate',
    index: true
  },
  certificateId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  issueDate: {
    type: String,
    default: 'Nov 14, 2026'
  },
  issueDateTime: {
    type: Date,
    default: Date.now,
    index: true
  },
  duration: {
    type: String,
    default: '4 Months'
  },
  grade: {
    type: String,
    default: 'A+'
  },
  status: {
    type: String,
    enum: ['Issued', 'Pending', 'Draft'],
    default: 'Issued',
    index: true
  },
  template: {
    type: String,
    default: 'Classic Gold'
  },
  directorName: {
    type: String,
    default: 'Rupesh Kumar'
  },
  signatoryName: {
    type: String,
    default: 'Sirija Devi'
  },
  verificationUrl: {
    type: String,
    default: '#'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Certificate', certificateSchema);
