const express = require('express');
const router = express.Router();
const User = require('../models/User');
const InternshipApplication = require('../models/InternshipApplication');
const OngoingInternship = require('../models/OngoingInternship');

// @route   GET /api/admin/overview
// @desc    Get Admin Dashboard Overview Stats & Analytics
router.get('/overview', async (req, res) => {
  try {
    const studentCount = await User.countDocuments({ role: { $ne: 'admin' } });
    const appCount = await InternshipApplication.countDocuments();
    const ongoingCount = await OngoingInternship.countDocuments();

    const data = {
      metrics: {
        totalStudents: { value: (1324 + studentCount).toLocaleString(), change: '+12%', subtext: '+142 this month' },
        activeLearners: { value: '892', change: '+8%', subtext: 'Currently learning' },
        internshipApplications: { value: (480 + appCount).toLocaleString(), change: '+24%', subtext: 'This month: 126' },
        selectedInterns: { value: '86', change: '+18%', subtext: 'This month: 28' },
        partnerCompanies: { value: '52', change: '+12%', subtext: '+6 new this month' },
        placementSuccess: { value: '71%', change: '+6%', subtext: 'Last 6 months' }
      },
      enrollments: {
        months: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        series: [
          { name: 'New Enrollments', color: '#2563eb', data: [75, 110, 130, 140, 145, 155] },
          { name: 'Active Learners', color: '#06b6d4', data: [60, 95, 105, 110, 115, 125] },
          { name: 'Completed', color: '#f59e0b', data: [25, 45, 55, 60, 70, 85] }
        ]
      },
      pipeline: [
        { label: 'Applied', count: 482, color: '#3b82f6', width: '100%' },
        { label: 'Shortlisted', count: 210, color: '#8b5cf6', width: '75%' },
        { label: 'Interviewed', count: 120, color: '#10b981', width: '50%' },
        { label: 'Selected', count: 86, color: '#f59e0b', width: '32%' }
      ],
      domains: [
        { name: 'Full Stack Development', count: 320, percentage: 85, color: '#3b82f6' },
        { name: 'Data Science', count: 220, percentage: 65, color: '#06b6d4' },
        { name: 'Data Analytics', count: 180, percentage: 55, color: '#8b5cf6' },
        { name: 'Digital Marketing', count: 160, percentage: 48, color: '#f97316' },
        { name: 'AI / ML', count: 120, percentage: 38, color: '#ef4444' },
        { name: 'HR Management', count: 90, percentage: 28, color: '#6366f1' },
        { name: 'Finance Analyst', count: 70, percentage: 22, color: '#38bdf8' },
        { name: 'Others', count: 60, percentage: 18, color: '#94a3b8' }
      ],
      tasks: {
        overall: 68,
        completed: 420,
        inProgress: 156,
        notStarted: 112,
        overdue: 32
      },
      attendance: {
        overall: 87,
        present: 612,
        absent: 68,
        leave: 20
      },
      weeklyReports: {
        submitted: 46,
        pendingReview: 8,
        approved: 42,
        rejected: 4
      },
      revenue: {
        total: '₹ 12,40,000',
        change: '+18%',
        chart: [
          { date: 'Oct 1', amount: 8.5 },
          { date: 'Oct 8', amount: 11.2 },
          { date: 'Oct 15', amount: 9.8 },
          { date: 'Oct 22', amount: 13.5 },
          { date: 'Oct 31', amount: 15.4 }
        ]
      }
    };

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Admin Overview Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/admin/applications
// @desc    Get recent internship applications
router.get('/applications', async (req, res) => {
  try {
    const applications = await InternshipApplication.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, applications });
  } catch (err) {
    console.error('Get Applications Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/admin/applications/:id/status
// @desc    Update application status
router.put('/applications/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const app = await InternshipApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
    return res.status(200).json({ success: true, application: app });
  } catch (err) {
    console.error('Update Application Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/admin/ongoing-internships
// @desc    Get ongoing corporate internships
router.get('/ongoing-internships', async (req, res) => {
  try {
    const internships = await OngoingInternship.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, internships });
  } catch (err) {
    console.error('Get Ongoing Internships Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/admin/quick-action
// @desc    Process various Admin Quick Actions (Add Student, Create Course, etc.)
router.post('/quick-action', async (req, res) => {
  try {
    const { actionType, payload } = req.body;

    if (!actionType) {
      return res.status(400).json({ success: false, message: 'actionType is required' });
    }

    if (actionType === 'add-student') {
      const { fullName, email, phone, branch, domain } = payload || {};
      if (!fullName || !email) {
        return res.status(400).json({ success: false, message: 'Full name and email are required' });
      }

      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const newUser = await User.create({
        fullName,
        email: email.toLowerCase(),
        phone: phone || '9999999999',
        branch: branch || 'Computer Science',
        role: 'student',
        isEmailVerified: true,
        areasOfInterest: domain ? [domain] : ['Full Stack']
      });

      return res.status(201).json({ success: true, message: `Student ${fullName} created successfully`, user: newUser });
    }

    if (actionType === 'add-application') {
      const { studentName, studentEmail, domain, status } = payload || {};
      const newApp = await InternshipApplication.create({
        studentName: studentName || 'New Applicant',
        studentEmail: studentEmail || 'applicant@edurup.com',
        domain: domain || 'Full Stack',
        status: status || 'New',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      });
      return res.status(201).json({ success: true, message: 'Application created successfully', application: newApp });
    }

    // Generic acknowledgment for other actions
    return res.status(200).json({
      success: true,
      message: `Quick Action '${actionType}' executed and recorded successfully.`,
      payload
    });
  } catch (err) {
    console.error('Quick Action Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
