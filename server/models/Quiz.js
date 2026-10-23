const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionNumber: {
    type: Number,
    required: true
  },
  questionType: {
    type: String,
    enum: [
      'Multiple Choice',
      'Multiple Select',
      'True / False',
      'Fill in the Blank',
      'Matching',
      'Ordering',
      'Short Answer',
      'Essay'
    ],
    default: 'Multiple Choice'
  },
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  options: [{
    id: { type: String },
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false }
  }],
  correctAnswer: {
    type: String,
    default: ''
  },
  marks: {
    type: Number,
    default: 1
  },
  explanation: {
    type: String,
    default: ''
  }
}, { _id: true });

const quizSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    trim: true,
    default: 'Digital Marketing'
  },
  moduleNumber: {
    type: Number,
    default: 1
  },
  moduleName: {
    type: String,
    default: 'Module 1: Introduction to Digital Marketing'
  },
  title: {
    type: String,
    required: true,
    trim: true,
    default: 'Digital Marketing Foundations Quiz'
  },
  description: {
    type: String,
    default: 'Add quiz details and create questions for this quiz.'
  },
  durationMinutes: {
    type: Number,
    default: 30
  },
  totalMarks: {
    type: Number,
    default: 7
  },
  passingPercentage: {
    type: Number,
    default: 70
  },
  status: {
    type: String,
    enum: ['Published', 'Draft'],
    default: 'Published'
  },
  attemptsAllowed: {
    type: Number,
    default: 2
  },
  questions: [questionSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);
