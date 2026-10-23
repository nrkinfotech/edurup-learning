const mongoose = require('mongoose');

const studentRecordSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  batch: {
    type: String,
    required: true,
    trim: true
  },
  learningStatus: {
    type: String,
    enum: ['In Progress', 'Completed', 'Dropped'],
    default: 'In Progress'
  },
  internshipStatus: {
    type: String,
    enum: ['Selected', 'On Internship', 'Interview', 'Applied', 'Not Applied', 'Completed'],
    default: 'Applied'
  },
  placementStatus: {
    type: String,
    enum: ['Not Placed', 'Placed'],
    default: 'Not Placed'
  },
  joinDate: {
    type: String,
    default: () => {
      const d = new Date();
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${d.getFullYear()}`;
    }
  },
  city: {
    type: String,
    default: 'Bengaluru'
  },
  state: {
    type: String,
    default: 'Karnataka'
  },
  dob: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: 'Male'
  },
  college: {
    type: String,
    default: ''
  },
  degree: {
    type: String,
    default: 'B.Tech'
  },
  yearOfStudy: {
    type: String,
    default: '3rd Year'
  },
  stream: {
    type: String,
    default: 'Computer Science'
  },
  passingYear: {
    type: String,
    default: '2026'
  },
  studentId: {
    type: String,
    default: ''
  },
  enrollmentType: {
    type: String,
    default: 'Paid'
  },
  parentName: {
    type: String,
    default: ''
  },
  parentPhone: {
    type: String,
    default: ''
  },
  alternateEmail: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  overallProgress: {
    type: Number,
    default: 85
  },
  modulesCompleted: {
    type: Number,
    default: 12
  },
  totalModules: {
    type: Number,
    default: 14
  },
  assessmentsCompleted: {
    type: Number,
    default: 8
  },
  totalAssessments: {
    type: Number,
    default: 10
  },
  projectsCompleted: {
    type: Number,
    default: 3
  },
  totalProjects: {
    type: Number,
    default: 4
  },
  classesAttended: {
    type: Number,
    default: 18
  },
  totalClasses: {
    type: Number,
    default: 20
  },
  progressStatus: {
    type: String,
    enum: ['On Track', 'Completed', 'In Progress', 'At Risk'],
    default: 'On Track'
  },
  modules: {
    type: Array,
    default: []
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  attendance: {
    type: Number,
    default: 90
  },
  status: {
    type: String,
    enum: ['Active', 'Dropped', 'Completed'],
    default: 'Active'
  },
  dropoutReason: {
    type: String,
    default: ''
  },
  droppedDate: {
    type: String,
    default: ''
  },
  rejoined: {
    type: Boolean,
    default: false
  },
  rejoinedDate: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StudentRecord', studentRecordSchema);
