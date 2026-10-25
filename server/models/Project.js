const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    default: '',
    trim: true
  },
  course: {
    type: String,
    default: '',
    trim: true
  },
  track: {
    type: String,
    required: true,
    enum: [
      'Data Analytics',
      'Data Science',
      'Digital Marketing',
      'Full Stack',
      'HR Management',
      'Cloud / DevOps',
      'AI/ML',
      'Sales & Marketing',
      'Business & Innovation'
    ],
    default: 'Data Analytics'
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  projectType: {
    type: String,
    default: 'Analytics',
    trim: true
  },
  status: {
    type: String,
    enum: ['Published', 'Draft', 'Archived'],
    default: 'Published'
  },
  description: {
    type: String,
    default: ''
  },
  objectives: {
    type: String,
    default: '• Understand requirements\n• Clean and process data\n• Build interactive dashboard\n• Deliver insights'
  },
  resources: [{
    title: { type: String, default: '' },
    type: { type: String, enum: ['pdf', 'excel', 'link', 'doc'], default: 'pdf' },
    url: { type: String, default: '#' }
  }],
  instructions: {
    type: String,
    default: ''
  },
  usedInInternship: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
