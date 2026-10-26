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
  phone: {
    type: String,
    trim: true,
    default: '+91 98765 43210'
  },
  location: {
    type: String,
    trim: true,
    default: 'Bengaluru, Karnataka'
  },
  currentEducation: {
    type: String,
    trim: true,
    default: 'B.Tech Computer Science'
  },
  graduationYear: {
    type: String,
    trim: true,
    default: '2026'
  },
  domain: {
    type: String,
    trim: true,
    default: 'Data Analytics'
  },
  internshipProgram: {
    type: String,
    required: true,
    trim: true,
    default: 'Data Analytics Internship'
  },
  duration: {
    type: String,
    default: '6 Months'
  },
  batch: {
    type: String,
    default: 'Nov 2025'
  },
  appliedOn: {
    type: String,
    default: '12 Oct 2025'
  },
  appliedOnFull: {
    type: String,
    default: '12 Oct 2025, 10:24 AM'
  },
  status: {
    type: String,
    enum: ['Shortlisted', 'Under Review', 'Rejected', 'Waitlisted', 'New', 'Interview', 'Selected'],
    default: 'Under Review'
  },
  resume: {
    name: {
      type: String,
      default: 'Resume.pdf'
    },
    url: {
      type: String,
      default: '#'
    }
  },
  whyJoin: {
    type: String,
    default: 'I am passionate about this domain and want to gain practical experience through real-world projects and mentorship.'
  },
  skills: [{
    type: String
  }],
  adminNotes: {
    type: String,
    default: ''
  },
  avatarInitials: {
    type: String,
    default: 'RS'
  },
  avatarColor: {
    type: String,
    default: '#2563EB'
  },
  interviewSchedule: {
    scheduled: { type: Boolean, default: false },
    date: { type: String, default: '' },
    time: { type: String, default: '' }
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('InternshipApplication', internshipApplicationSchema);
