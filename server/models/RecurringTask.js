const mongoose = require('mongoose');

const recurringTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  course: {
    type: String,
    required: true,
    default: 'Data Analytics'
  },
  taskType: {
    type: String,
    enum: ['Assignment', 'Project Milestone', 'Quiz', 'Assessment', 'Report'],
    default: 'Assignment'
  },
  pattern: {
    type: String,
    enum: ['Weekly', 'Bi-Weekly', 'Monthly'],
    default: 'Weekly'
  },
  repeatEvery: {
    type: Number,
    default: 1
  },
  daysOfWeek: {
    type: [String],
    default: ['Mon']
  },
  time: {
    type: String,
    default: '10:00 AM'
  },
  startDate: {
    type: String,
    default: '17 Nov 2026'
  },
  endDate: {
    type: String,
    default: 'No end date'
  },
  recurrenceText: {
    type: String,
    default: 'Every Week (Mon, 10:00 AM)'
  },
  nextRun: {
    type: String,
    default: '17 Nov 2026'
  },
  nextRunRaw: {
    type: Date,
    default: Date.now
  },
  assignedType: {
    type: String,
    enum: ['batch', 'all_active', 'specific'],
    default: 'batch'
  },
  assignedTarget: {
    type: String,
    default: 'Oct 2026 (32)'
  },
  autoAssignNewStudents: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['Active', 'Paused', 'Inactive'],
    default: 'Active'
  },
  order: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RecurringTask', recurringTaskSchema);
