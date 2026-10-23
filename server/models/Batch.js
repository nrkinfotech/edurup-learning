const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true,
    trim: true
  },
  batchCode: {
    type: String,
    default: ''
  },
  badgeText: {
    type: String,
    default: 'BT'
  },
  badgeColor: {
    type: String,
    default: '#8b5cf6'
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  capacity: {
    type: Number,
    default: 35
  },
  status: {
    type: String,
    enum: ['Active', 'Upcoming', 'Completed'],
    default: 'Active'
  },
  createdBy: {
    name: { type: String, default: 'Super Admin' },
    date: { type: String, default: 'Aug 01, 2026' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Batch', batchSchema);
