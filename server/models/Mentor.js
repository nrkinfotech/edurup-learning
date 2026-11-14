const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true,
    default: '+91 98765 43210'
  },
  location: {
    type: String,
    trim: true,
    default: 'Bengaluru, Karnataka'
  },
  role: {
    type: String,
    trim: true,
    default: 'Senior Mentor'
  },
  department: {
    type: String,
    trim: true,
    default: 'Data Analytics'
  },
  designation: {
    type: String,
    default: 'Senior Mentor'
  },
  company: {
    type: String,
    default: 'Amazon'
  },
  expertise: [{
    type: String,
    trim: true
  }],
  domains: [{
    type: String,
    trim: true
  }],
  mentorType: {
    type: String,
    enum: ['Industry', 'External', 'Internal'],
    default: 'Industry'
  },
  assignedToText: {
    type: String,
    default: '1 Batch'
  },
  assignedBatches: [{
    type: String
  }],
  experience: {
    type: String,
    default: '5+ Years'
  },
  linkedin: {
    type: String,
    default: 'linkedin.com/in/mentor'
  },
  isIndustryExpert: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: ''
  },
  avatarInitials: {
    type: String,
    default: ''
  },
  avatarColor: {
    type: String,
    default: '#2563EB'
  },
  skills: [{
    type: String,
    trim: true
  }],
  assignedStudents: {
    type: Number,
    default: 0
  },
  ongoingSessions: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 4.8
  },
  reviewsCount: {
    type: Number,
    default: 50
  },
  sessionCompletion: {
    type: Number,
    default: 92
  },
  status: {
    type: String,
    enum: ['Active', 'On Leave', 'Inactive'],
    default: 'Active'
  },
  currentPrograms: [{
    programName: { type: String, required: true },
    studentsCount: { type: Number, default: 0 }
  }],
  recentSessions: [{
    title: { type: String, required: true },
    date: { type: String, required: true },
    studentsCount: { type: Number, default: 0 }
  }],
  bio: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentor', mentorSchema);
