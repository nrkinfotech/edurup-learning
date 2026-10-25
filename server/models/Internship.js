const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  track: {
    type: String,
    required: true,
    enum: [
      'Data Analytics',
      'Data Science',
      'AI / ML',
      'Digital Marketing',
      'Full Stack',
      'HR',
      'Sales & Marketing',
      'Entrepreneurship'
    ],
    default: 'Data Analytics'
  },
  duration: {
    type: String,
    default: '6 Months'
  },
  startDate: {
    type: String,
    default: '01 Nov 2025'
  },
  enrolled: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Published', 'Upcoming', 'Draft'],
    default: 'Published'
  },
  description: {
    type: String,
    default: ''
  },
  highlights: {
    type: String,
    default: '• Real-world industry projects\n• Mentor guidance\n• Certificates on completion\n• Placement assistance'
  },
  projects: [{
    type: String
  }],
  enrollmentLimit: {
    type: Number,
    default: 50
  },
  showToStudents: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Internship', internshipSchema);
