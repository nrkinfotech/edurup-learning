const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250
  },
  category: {
    type: String,
    enum: ['Marketing', 'Data', 'Development', 'AI / ML', 'Management', 'Finance', 'Design', 'Security', 'Cloud'],
    default: 'Development'
  },
  duration: {
    type: String,
    default: '4 Months'
  },
  fee: {
    type: Number,
    required: true,
    default: 40000
  },
  installments: {
    type: String,
    default: '1 (Full Payment)'
  },
  thumbnail: {
    type: String,
    default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&auto=format&fit=crop&q=80'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  enrolledCount: {
    type: Number,
    default: 120
  },
  modulesCount: {
    type: Number,
    default: 6
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
