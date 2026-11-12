const mongoose = require('mongoose');

const subscriptionStudentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  course: {
    type: String,
    required: true,
    default: 'Data Analytics Internship'
  },
  subscriptionMonth: {
    type: String,
    required: true,
    default: 'October 2026'
  },
  batch: {
    type: String,
    required: true,
    default: 'Oct 2026 - Batch 1'
  },
  subscriptionDate: {
    type: String,
    required: true,
    default: '05 Oct 2026'
  },
  subscriptionDateRaw: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Paused / On Hold', 'Completed'],
    default: 'Active'
  },
  avatarInitials: {
    type: String,
    default: 'ST'
  },
  avatarColor: {
    type: String,
    default: '#2563EB'
  },
  order: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SubscriptionStudent', subscriptionStudentSchema);
