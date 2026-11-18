const mongoose = require('mongoose');

const trainerReportSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
    index: true
  },
  trainerName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  trainerId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  avatarInitials: {
    type: String,
    default: 'TR'
  },
  avatarColor: {
    type: String,
    default: '#2563EB'
  },
  courses: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  classes: {
    type: Number,
    required: true,
    default: 0
  },
  attendance: {
    type: Number,
    required: true,
    default: 90 // percentage e.g. 93
  },
  completion: {
    type: Number,
    required: true,
    default: 88 // percentage e.g. 90
  },
  avgRating: {
    type: Number,
    required: true,
    default: 4.5 // rating e.g. 4.7
  },
  engagement: {
    type: Number,
    required: true,
    default: 85 // percentage e.g. 92
  },
  status: {
    type: String,
    enum: ['Excellent', 'Good', 'Needs Attention'],
    default: 'Good',
    index: true
  },
  trainerStatus: {
    type: String,
    enum: ['Active', 'On Leave', 'Inactive'],
    default: 'Active',
    index: true
  },
  subscriptionMonth: {
    type: String,
    default: 'Nov 2026',
    index: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TrainerReport', trainerReportSchema);
