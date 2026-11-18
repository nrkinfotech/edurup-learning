const mongoose = require('mongoose');

const studentReportSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
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
  batch: {
    type: String,
    default: 'Batch A - Nov 2026',
    index: true
  },
  subscriptionMonth: {
    type: String,
    default: 'Nov 2026',
    index: true
  },
  attendance: {
    type: Number,
    required: true,
    default: 90 // percentage e.g. 96
  },
  completion: {
    type: Number,
    required: true,
    default: 88 // percentage e.g. 100
  },
  assessment: {
    type: Number,
    required: true,
    default: 86 // percentage e.g. 94
  },
  status: {
    type: String,
    enum: ['Excellent', 'Good', 'Needs Attention', 'At Risk'],
    default: 'Good',
    index: true
  },
  studentStatus: {
    type: String,
    enum: ['Active', 'On Hold', 'Completed', 'Dropped'],
    default: 'Active',
    index: true
  },
  placementStatus: {
    type: String,
    enum: ['Placed', 'In Process', 'Not Ready'],
    default: 'Placed'
  },
  internshipStatus: {
    type: String,
    enum: ['Active Internship', 'Completed', 'Interviewing', 'None'],
    default: 'Active Internship'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StudentReport', studentReportSchema);
