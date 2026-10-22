const mongoose = require('mongoose');

const ongoingInternshipSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  companyLogo: {
    type: String,
    default: ''
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Terminated'],
    default: 'Active'
  },
  avatar: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('OngoingInternship', ongoingInternshipSchema);
