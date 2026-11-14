const mongoose = require('mongoose');

const internshipPostingSchema = new mongoose.Schema({
  title: {
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
  companyIndustry: {
    type: String,
    default: 'IT Services'
  },
  location: {
    type: String,
    default: 'Bengaluru'
  },
  domain: {
    type: String,
    required: true,
    enum: [
      'Data Analytics',
      'Full Stack',
      'Digital Marketing',
      'Data Science',
      'Business Analyst',
      'Python / ML',
      'Design (UI/UX)',
      'Cloud / DevOps',
      'Analytics',
      'AI / ML'
    ],
    default: 'Data Analytics'
  },
  mode: {
    type: String,
    enum: ['Remote', 'Hybrid', 'On-site'],
    default: 'Remote'
  },
  duration: {
    type: String,
    default: '6 Months'
  },
  stipend: {
    type: String,
    default: '₹15,000'
  },
  stipendRaw: {
    type: Number,
    default: 15000
  },
  applicationsCount: {
    type: Number,
    default: 0
  },
  selectedCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'In Review', 'Closed', 'Draft'],
    default: 'Active'
  },
  openings: {
    type: Number,
    default: 5
  },
  deadline: {
    type: String,
    default: '10 Nov 2026'
  },
  description: {
    type: String,
    default: ''
  },
  skills: [{
    type: String
  }],
  eligibility: [{
    type: String
  }],
  order: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('InternshipPosting', internshipPostingSchema);
