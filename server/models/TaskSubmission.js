const mongoose = require('mongoose');

const taskSubmissionSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true,
    trim: true
  },
  taskSubtitle: {
    type: String,
    default: ''
  },
  student: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatarInitials: { type: String, default: 'ST' },
    avatarColor: { type: String, default: '#2563EB' }
  },
  course: {
    type: String,
    required: true,
    default: 'Data Analytics'
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
    default: '20 Oct 2026'
  },
  status: {
    type: String,
    enum: ['Reviewed', 'Pending', 'Needs Revision', 'Not Submitted', 'In Progress'],
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
    default: 10
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
    fileName: { type: String, default: 'data_cleaning.ipynb' },
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
  order: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TaskSubmission', taskSubmissionSchema);
