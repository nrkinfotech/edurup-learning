const mongoose = require('mongoose');

const recordedClassSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    trim: true,
    default: 'Digital Marketing'
  },
  classNumber: {
    type: Number,
    required: true
  },
  classTitle: {
    type: String,
    required: true,
    trim: true
  },
  moduleNumber: {
    type: Number,
    required: true,
    default: 1
  },
  moduleName: {
    type: String,
    default: 'Module 1'
  },
  lessonNumber: {
    type: Number,
    default: 1
  },
  lessonName: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['Video', 'PDF', 'Link', 'Text/Note'],
    default: 'Video'
  },
  duration: {
    type: String,
    default: '20 min'
  },
  durationMinutes: {
    type: Number,
    default: 20
  },
  uploadDate: {
    type: String,
    default: () => new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
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
    default: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  pdfUrl: {
    type: String,
    default: ''
  },
  fileSizeMB: {
    type: Number,
    default: 28.5
  },
  thumbnail: {
    type: String,
    default: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=160&auto=format&fit=crop&q=80'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RecordedClass', recordedClassSchema);
