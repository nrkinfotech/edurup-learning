const mongoose = require('mongoose');

const courseReportSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
    index: true
  },
  courseName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  code: {
    type: String,
    trim: true,
    default: 'CRS-101'
  },
  category: {
    type: String,
    trim: true,
    default: 'Development'
  },
  icon: {
    type: String,
    default: 'fa-chart-pie'
  },
  iconColor: {
    type: String,
    default: '#2563EB'
  },
  enrollments: {
    type: Number,
    required: true,
    default: 0
  },
  active: {
    type: Number,
    required: true,
    default: 0
  },
  completion: {
    type: Number,
    required: true,
    default: 0 // percentage e.g. 93
  },
  assessment: {
    type: Number,
    required: true,
    default: 0 // percentage e.g. 86
  },
  placement: {
    type: Number,
    required: true,
    default: 0 // percentage e.g. 72
  },
  internships: {
    type: Number,
    required: true,
    default: 0 // count e.g. 118
  },
  status: {
    type: String,
    enum: ['Active', 'Archived', 'Draft'],
    default: 'Active',
    index: true
  },
  mode: {
    type: String,
    enum: ['Online Live', 'Recorded', 'Hybrid', 'All'],
    default: 'Hybrid'
  },
  subscriptionMonth: {
    type: String,
    default: 'Nov 2026',
    index: true
  },
  batchCount: {
    type: Number,
    default: 6
  },
  trainerName: {
    type: String,
    default: 'Senior Instructor'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CourseReport', courseReportSchema);
