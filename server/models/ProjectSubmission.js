const mongoose = require('mongoose');

const projectSubmissionSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
    trim: true
  },
  projectSubtitle: {
    type: String,
    default: ''
  },
  projectType: {
    type: String,
    enum: ['Course Project', 'Capstone Project', 'Internship Project'],
    default: 'Course Project'
  },
  batch: {
    type: String,
    required: true,
    default: 'October 2026'
  },
  course: {
    type: String,
    required: true,
    default: 'Data Analytics'
  },
  student: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatarInitials: { type: String, default: 'RS' },
    avatarColor: { type: String, default: '#2563EB' }
  },
  submittedOn: {
    type: String,
    default: ''
  },
  submittedOnRaw: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: String,
    default: '25 Oct 2026'
  },
  status: {
    type: String,
    enum: ['Reviewed', 'Pending', 'Needs Revision', 'Not Submitted'],
    default: 'Pending'
  },
  marks: {
    type: String,
    default: '-'
  },
  score: {
    type: Number,
    default: null
  },
  maxScore: {
    type: Number,
    default: 20
  },
  description: {
    type: String,
    default: ''
  },
  files: [{
    name: String,
    size: String,
    type: { type: String },
    url: String
  }],
  codePreview: {
    fileName: { type: String, default: 'eda_analysis.ipynb' },
    language: { type: String, default: 'python' },
    code: { type: String, default: '' }
  },
  feedback: {
    reviewerName: { type: String, default: 'Admin' },
    reviewerInitials: { type: String, default: 'AD' },
    date: { type: String, default: '' },
    score: { type: String, default: '' },
    comment: { type: String, default: '' }
  },
  history: [{
    action: String,
    by: String,
    date: String,
    notes: String
  }],
  order: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ProjectSubmission', projectSubmissionSchema);
