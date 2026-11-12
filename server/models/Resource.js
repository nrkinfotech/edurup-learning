const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    default: 'Digital Marketing'
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  moduleName: {
    type: String,
    required: true,
    default: 'Module 1: Introduction'
  },
  lessonName: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['PDF Document', 'Document (Word/Excel)', 'External Link', 'Template', 'Dataset', 'Other File'],
    required: true,
    default: 'PDF Document'
  },
  fileSize: {
    type: String,
    default: '-'
  },
  fileUrl: {
    type: String,
    default: ''
  },
  externalUrl: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Published', 'Draft'],
    default: 'Published'
  },
  order: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resource', resourceSchema);
