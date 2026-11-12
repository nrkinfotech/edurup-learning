const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['Assignment', 'Project', 'Assessment', 'Homework', 'Case Study'],
    default: 'Assignment'
  },
  course: {
    type: String,
    required: true,
    default: 'Data Analytics'
  },
  batch: {
    type: String,
    default: 'DA-OCT-2026'
  },
  assignedTo: {
    name: { type: String, required: true },
    email: { type: String, default: '' },
    avatarInitials: { type: String, default: 'ST' },
    avatarColor: { type: String, default: '#2563EB' }
  },
  dueDate: {
    type: String,
    required: true,
    default: '25 Oct 2026'
  },
  dueDateRaw: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Completed', 'In Progress', 'Overdue', 'Not Started'],
    default: 'In Progress'
  },
  submissionsCount: {
    type: Number,
    default: 0
  },
  submissionsTotal: {
    type: Number,
    default: 1
  },
  points: {
    type: Number,
    default: 10
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  description: {
    type: String,
    default: ''
  },
  attachments: [{
    name: String,
    size: String,
    type: { type: String },
    url: String
  }],
  submission: {
    fileName: String,
    fileSize: String,
    submittedAt: String,
    fileUrl: String
  },
  feedback: {
    mentorName: String,
    mentorInitials: String,
    date: String,
    score: String,
    comment: String
  },
  order: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
