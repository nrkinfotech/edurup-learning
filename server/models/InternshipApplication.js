const mongoose = require('mongoose');

const internshipApplicationSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  studentEmail: {
    type: String,
    trim: true,
    lowercase: true,
    default: ''
  },
  domain: {
    type: String,
    required: true,
    trim: true
  },
  appliedOn: {
    type: String,
    default: () => {
      const d = new Date();
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${d.getFullYear()}`;
    }
  },
  status: {
    type: String,
    enum: ['New', 'Shortlisted', 'Interview', 'Selected', 'Rejected'],
    default: 'New'
  },
  avatar: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('InternshipApplication', internshipApplicationSchema);
