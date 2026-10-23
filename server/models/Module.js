const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  lessonNumber: {
    type: Number,
    required: true
  },
  lessonTitle: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Video', 'PDF', 'Quiz', 'Link', 'Text/Note'],
    default: 'Video'
  },
  duration: {
    type: String,
    default: '15 min'
  },
  durationMinutes: {
    type: Number,
    default: 15
  },
  status: {
    type: String,
    enum: ['Published', 'Draft'],
    default: 'Published'
  },
  description: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFreePreview: {
    type: Boolean,
    default: false
  },
  resources: {
    type: Array,
    default: []
  }
}, { _id: true });

const moduleSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    trim: true
  },
  moduleNumber: {
    type: Number,
    required: true
  },
  moduleTitle: {
    type: String,
    required: true,
    trim: true
  },
  lessonsCount: {
    type: Number,
    default: 5
  },
  totalDuration: {
    type: String,
    default: '2h 30m'
  },
  status: {
    type: String,
    enum: ['Published', 'Draft'],
    default: 'Published'
  },
  lessons: [lessonSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Module', moduleSchema);
