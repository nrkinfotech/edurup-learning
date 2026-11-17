const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, default: '1.5 MB' },
  type: { type: String, default: 'pdf' }, // 'pdf', 'docx', etc.
  url: { type: String, default: '#' }
}, { _id: false });

const noteSchema = new mongoose.Schema({
  author: { type: String, default: 'Admin' },
  text: { type: String, required: true },
  date: { type: String, default: 'Today' }
}, { _id: false });

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, default: 'Just now' },
  user: { type: String, default: 'Admin' }
}, { _id: false });

const partnerRequestSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
    index: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  companyLogo: {
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
  fullLocation: {
    type: String,
    default: 'Bengaluru, India',
    trim: true
  },
  requestType: {
    type: String,
    enum: ['Partnership', 'Internship Collaboration', 'Hiring Partner'],
    default: 'Partnership',
    index: true
  },
  domains: [{
    type: String,
    trim: true
  }],
  receivedOn: {
    type: String,
    default: '12 Nov 2026'
  },
  receivedOnTime: {
    type: String,
    default: '12 Nov 2026, 11:20 AM'
  },
  receivedDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  contactPerson: {
    name: { type: String, required: true, trim: true },
    designation: { type: String, default: 'Talent Manager', trim: true },
    email: { type: String, default: 'contact@company.com', trim: true },
    phone: { type: String, default: '+91 98765 43210', trim: true }
  },
  website: {
    type: String,
    default: 'www.company.com',
    trim: true
  },
  status: {
    type: String,
    enum: ['Approved', 'Under Review', 'Awaiting Info', 'Rejected'],
    default: 'Under Review',
    index: true
  },
  message: {
    type: String,
    default: 'We would like to collaborate with Edurup Learning for internship opportunities, student hiring, and joint training initiatives.'
  },
  attachments: [attachmentSchema],
  documentsCount: {
    type: Number,
    default: 3
  },
  notesCount: {
    type: Number,
    default: 2
  },
  notes: [noteSchema],
  activity: [activitySchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('PartnerRequest', partnerRequestSchema);
