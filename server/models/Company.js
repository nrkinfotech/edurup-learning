const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  order: {
    type: Number,
    default: 1
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
    default: 'default'
  },
  industry: {
    type: String,
    default: 'IT Services',
    trim: true
  },
  location: {
    type: String,
    default: 'Bengaluru',
    trim: true
  },
  partnershipType: {
    type: String,
    enum: ['Hiring Partner', 'Placement Partner', 'Training Partner'],
    default: 'Hiring Partner'
  },
  openRoles: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'In Discussion'],
    default: 'Active'
  },
  contactPerson: {
    name: { type: String, default: 'Talent Acquisition Team' },
    title: { type: String, default: 'HR Manager' }
  },
  email: {
    type: String,
    default: 'contact@company.com'
  },
  phone: {
    type: String,
    default: '+91 98765 43210'
  },
  website: {
    type: String,
    default: 'www.company.com'
  },
  since: {
    type: String,
    default: 'Jan 2024'
  },
  about: {
    type: String,
    default: ''
  },
  hiringFocus: [{
    type: String
  }],
  recentActivity: [{
    icon: { type: String, default: 'fa-circle-check' },
    iconColor: { type: String, default: 'green' },
    title: { type: String, required: true },
    date: { type: String, default: 'Oct 2026' }
  }],
  openRolesList: [{
    title: { type: String, required: true },
    domain: { type: String, default: 'Data Analytics' },
    openings: { type: Number, default: 2 },
    stipend: { type: String, default: '₹15,000' },
    deadline: { type: String, default: '15 Nov 2026' }
  }],
  interactionsList: [{
    type: { type: String, default: 'Call' },
    title: { type: String, required: true },
    date: { type: String, default: 'Recent' },
    attendees: { type: String, default: 'TA Manager, Admin' },
    notes: { type: String, default: '' }
  }],
  notes: [{
    author: { type: String, default: 'Admin' },
    text: { type: String, required: true },
    date: { type: String, default: 'Recent' }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Company', companySchema);
