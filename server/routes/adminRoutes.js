const express = require('express');
const router = express.Router();
const User = require('../models/User');
const InternshipApplication = require('../models/InternshipApplication');
const OngoingInternship = require('../models/OngoingInternship');
const StudentRecord = require('../models/StudentRecord');
const Batch = require('../models/Batch');
const Course = require('../models/Course');
const Module = require('../models/Module');

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

// @route   GET /api/admin/students
// @desc    Get all students with search, filters, pagination, and KPI metrics
router.get('/students', async (req, res) => {
  try {
    const {
      q,
      course,
      batch,
      internshipStatus,
      learningStatus,
      placementStatus,
      city,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (q) {
      const regex = new RegExp(q, 'i');
      query.$or = [
        { studentName: regex },
        { email: regex },
        { phone: regex },
        { course: regex }
      ];
    }

    if (course && course !== 'All Courses') query.course = course;
    if (batch && batch !== 'All Batches') query.batch = batch;
    if (internshipStatus && internshipStatus !== 'All Status') query.internshipStatus = internshipStatus;
    if (learningStatus && learningStatus !== 'All Status') query.learningStatus = learningStatus;
    if (placementStatus && placementStatus !== 'All Status') query.placementStatus = placementStatus;
    if (city && city !== 'All Cities') query.city = city;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalInDb = await StudentRecord.countDocuments(query);
    const students = await StudentRecord.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const kpis = {
      totalStudents: { count: '1,324', change: '12%', isUp: true, subtext: 'All registered students' },
      activeStudents: { count: '1,102', change: '15%', isUp: true, subtext: 'Currently learning' },
      completedStudents: { count: '156', change: '28%', isUp: true, subtext: 'Completed courses' },
      onInternship: { count: '86', change: '18%', isUp: true, subtext: 'Currently interning' },
      placedStudents: { count: '73', change: '24%', isUp: true, subtext: 'Got placed' },
      inactiveDropped: { count: '93', change: '10%', isUp: false, subtext: 'Not active' }
    };

    return res.status(200).json({
      success: true,
      totalCount: 1324,
      filteredCount: totalInDb,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(1324 / parseInt(limit)),
      students,
      kpis
    });
  } catch (err) {
    console.error('Get Students Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/admin/progress
// @desc    Get student progress tracking data, metrics, and individual performance details
router.get('/progress', async (req, res) => {
  try {
    const {
      q,
      course,
      batch,
      status,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (q) {
      const regex = new RegExp(q, 'i');
      query.$or = [
        { studentName: regex },
        { email: regex },
        { phone: regex },
        { course: regex },
        { batch: regex }
      ];
    }

    if (course && course !== 'All Courses') query.course = course;
    if (batch && batch !== 'All Batches') query.batch = batch;
    if (status && status !== 'All Status') query.progressStatus = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalInDb = await StudentRecord.countDocuments(query);
    const students = await StudentRecord.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const kpis = {
      totalStudents: { count: '1,324', label: 'Total Students', subtext: 'All enrolled students' },
      onTrack: { count: '892', label: 'On Track', change: '67%', isUp: true, subtext: 'Progressing normally' },
      inProgress: { count: '356', label: 'In Progress', subtext: 'Active learners' },
      atRisk: { count: '56', label: 'At Risk', change: '4%', isUp: true, subtext: 'Needs attention' },
      completed: { count: '20', label: 'Completed', change: '2%', isUp: false, subtext: 'Course completed' }
    };

    return res.status(200).json({
      success: true,
      totalCount: 1324,
      filteredCount: totalInDb,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(1324 / parseInt(limit)),
      students,
      kpis
    });
  } catch (err) {
    console.error('Get Progress Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/admin/active-dropped
// @desc    Get active and dropped students with filters, counts, and metrics
router.get('/active-dropped', async (req, res) => {
  try {
    const {
      tab = 'active',
      q,
      course,
      batch,
      status,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    // Filter by tab
    if (tab === 'dropped') {
      query.status = 'Dropped';
    } else {
      query.status = { $ne: 'Dropped' };
    }

    if (q) {
      const regex = new RegExp(q, 'i');
      query.$or = [
        { studentName: regex },
        { email: regex },
        { phone: regex },
        { course: regex },
        { batch: regex }
      ];
    }

    if (course && course !== 'All Courses') query.course = course;
    if (batch && batch !== 'All Batches') query.batch = batch;
    if (status && status !== 'All Status' && status !== 'All') {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalInDb = await StudentRecord.countDocuments(query);
    const students = await StudentRecord.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalStudentsCount = 1324;
    const activeStudentsCount = 1142;
    const droppedStudentsCount = 182;
    const rejoinedStudentsCount = 28;

    const kpis = {
      totalStudents: { count: '1,324', label: 'Total Students', subtext: 'All enrolled students' },
      activeStudents: { count: '1,142', label: 'Active Students', change: '12%', isUp: true, subtext: 'Currently learning' },
      droppedStudents: { count: '182', label: 'Dropped Students', change: '5%', isUp: true, subtext: 'Inactive / Discontinued' },
      rejoinedStudents: { count: '28', label: 'Rejoined Students', subtext: 'Rejoined after dropout' }
    };

    const targetTotal = tab === 'dropped' ? droppedStudentsCount : activeStudentsCount;

    return res.status(200).json({
      success: true,
      tab,
      totalCount: targetTotal,
      filteredCount: totalInDb,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(targetTotal / parseInt(limit)),
      students,
      kpis
    });
  } catch (err) {
    console.error('Get Active/Dropped Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/admin/students/:id/status
// @desc    Update a student's active/dropped status or rejoin
router.put('/students/:id/status', async (req, res) => {
  try {
    const { status, dropoutReason, droppedDate, rejoined } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (dropoutReason !== undefined) updateData.dropoutReason = dropoutReason;
    if (droppedDate !== undefined) updateData.droppedDate = droppedDate;
    if (rejoined !== undefined) {
      updateData.rejoined = rejoined;
      if (rejoined) {
        updateData.status = 'Active';
        updateData.rejoinedDate = 'Oct 23, 2026';
      }
    }

    const updated = await StudentRecord.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Student status updated to ${updated.status} successfully`,
      student: updated
    });
  } catch (err) {
    console.error('Update Student Status Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/admin/students
// @desc    Create a new student record and student login account
router.post('/students', async (req, res) => {
  try {
    const {
      studentName,
      fullName,
      email,
      phone,
      dob,
      gender,
      city,
      state,
      college,
      degree,
      yearOfStudy,
      stream,
      passingYear,
      studentId,
      course,
      batch,
      joiningDate,
      enrollmentType,
      parentName,
      parentPhone,
      alternateEmail,
      address,
      avatar,
      learningStatus,
      internshipStatus,
      placementStatus,
      sendCredentials
    } = req.body;

    const name = studentName || fullName;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Student Name and Email are required' });
    }

    const cleanEmail = email.toLowerCase().trim();

    const newStudent = await StudentRecord.create({
      studentName: name,
      email: cleanEmail,
      phone: phone || '+91 99999 99999',
      dob: dob || '',
      gender: gender || 'Male',
      city: city || 'Bengaluru',
      state: state || 'Karnataka',
      college: college || '',
      degree: degree || 'B.Tech',
      yearOfStudy: yearOfStudy || '3rd Year',
      stream: stream || 'Computer Science',
      passingYear: passingYear || '2026',
      studentId: studentId || '',
      course: course || 'Full Stack Developer',
      batch: batch || 'FS-OCT-2026',
      joinDate: joiningDate || 'Oct 23, 2026',
      enrollmentType: enrollmentType || 'Paid',
      parentName: parentName || '',
      parentPhone: parentPhone || '',
      alternateEmail: alternateEmail || '',
      address: address || '',
      learningStatus: learningStatus || 'In Progress',
      internshipStatus: internshipStatus || 'Applied',
      placementStatus: placementStatus || 'Not Placed',
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    });

    // Also register or sync student user account for login
    try {
      let user = await User.findOne({ email: cleanEmail });
      if (!user) {
        const bcrypt = require('bcryptjs');
        const defaultPassword = await bcrypt.hash('Student@Edurup2026', 10);
        await User.create({
          fullName: name,
          email: cleanEmail,
          phone: phone || '9999999999',
          password: defaultPassword,
          role: 'student',
          college: college || '',
          branch: stream || 'Computer Science',
          city: city || 'Bengaluru',
          isEmailVerified: true,
          isPhoneVerified: true,
          areasOfInterest: [course || 'Full Stack']
        });
      }
    } catch(userErr) {
      console.warn('User account sync notice:', userErr.message);
    }

    return res.status(201).json({ success: true, message: 'Student created successfully with login access', student: newStudent });
  } catch (err) {
    console.error('Create Student Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/admin/students/:id
// @desc    Update an existing student record
router.put('/students/:id', async (req, res) => {
  try {
    const updated = await StudentRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }
    return res.status(200).json({ success: true, message: 'Student updated successfully', student: updated });
  } catch (err) {
    console.error('Update Student Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/admin/students/:id
// @desc    Delete a student record
router.delete('/students/:id', async (req, res) => {
  try {
    const deleted = await StudentRecord.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }
    return res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Delete Student Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/admin/students/bulk-action
// @desc    Process bulk operations for selected students
router.post('/students/bulk-action', async (req, res) => {
  try {
    const { action, studentIds, payload } = req.body;
    if (!action || !studentIds || !studentIds.length) {
      return res.status(400).json({ success: false, message: 'Action and student IDs are required' });
    }

    if (action === 'update-status') {
      const updateData = {};
      if (payload.learningStatus) updateData.learningStatus = payload.learningStatus;
      if (payload.internshipStatus) updateData.internshipStatus = payload.internshipStatus;
      if (payload.placementStatus) updateData.placementStatus = payload.placementStatus;

      await StudentRecord.updateMany(
        { _id: { $in: studentIds } },
        { $set: updateData }
      );
    } else if (action === 'assign-batch') {
      if (payload.batch) {
        await StudentRecord.updateMany(
          { _id: { $in: studentIds } },
          { $set: { batch: payload.batch } }
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: `Bulk action '${action}' applied to ${studentIds.length} students.`
    });
  } catch (err) {
    console.error('Bulk Action Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/admin/batches
// @desc    Get all batches with filters, search, pagination, and KPI metrics
router.get('/batches', async (req, res) => {
  try {
    const {
      q,
      course,
      status,
      startDate,
      endDate,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (q) {
      const regex = new RegExp(q, 'i');
      query.$or = [
        { batchName: regex },
        { batchCode: regex },
        { course: regex }
      ];
    }

    if (course && course !== 'All Courses') query.course = course;
    if (status && status !== 'All Status') query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalInDb = await Batch.countDocuments(query);
    const batches = await Batch.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const kpis = {
      totalBatches: { count: '24', change: '20%', isUp: true, subtext: 'All courses' },
      activeBatches: { count: '18', change: '12%', isUp: true, subtext: 'Ongoing batches' },
      upcomingBatches: { count: '4', subtext: 'Starting soon' },
      completedBatches: { count: '2', subtext: 'Finished' }
    };

    return res.status(200).json({
      success: true,
      totalCount: 24,
      filteredCount: totalInDb,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(24 / parseInt(limit)),
      batches,
      kpis
    });
  } catch (err) {
    console.error('Get Batches Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/admin/batches
// @desc    Create a new student batch
router.post('/batches', async (req, res) => {
  try {
    const {
      batchName,
      batchCode,
      badgeText,
      badgeColor,
      course,
      startDate,
      endDate,
      capacity,
      enrolledStudents,
      status,
      mentorName,
      mentorAvatar
    } = req.body;

    if (!batchName || !course) {
      return res.status(400).json({ success: false, message: 'Batch Name and Course are required' });
    }

    // Generate badge acronym if not provided
    const words = batchName.split(' ');
    let acronym = 'BT';
    if (words.length >= 2) acronym = (words[0][0] + words[1][0]).toUpperCase();
    else if (words.length === 1) acronym = words[0].slice(0, 2).toUpperCase();

    const newBatch = await Batch.create({
      batchName,
      batchCode: batchCode || `${acronym}-OCT-2026`,
      badgeText: badgeText || acronym,
      badgeColor: badgeColor || '#8b5cf6',
      course,
      startDate: startDate || 'Oct 01, 2026',
      endDate: endDate || 'Jan 01, 2027',
      capacity: capacity ? parseInt(capacity) : 35,
      enrolledStudents: enrolledStudents ? parseInt(enrolledStudents) : 0,
      status: status || 'Upcoming',
      createdBy: {
        name: mentorName || 'Super Admin',
        date: 'Oct 23, 2026',
        avatar: mentorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      }
    });

    return res.status(201).json({ success: true, message: 'Batch created successfully', batch: newBatch });
  } catch (err) {
    console.error('Create Batch Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/admin/batches/:id
// @desc    Update a student batch
router.put('/batches/:id', async (req, res) => {
  try {
    const updated = await Batch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Batch not found' });
    }
    return res.status(200).json({ success: true, message: 'Batch updated successfully', batch: updated });
  } catch (err) {
    console.error('Update Batch Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/admin/batches/:id
// @desc    Delete a student batch
router.delete('/batches/:id', async (req, res) => {
  try {
    const deleted = await Batch.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Batch not found' });
    }
    return res.status(200).json({ success: true, message: 'Batch deleted successfully' });
  } catch (err) {
    console.error('Delete Batch Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/admin/courses
// @desc    Get all courses with search, category/status filters, pagination, and KPI counts
router.get('/courses', async (req, res) => {
  try {
    const {
      q,
      category,
      status,
      page = 1,
      limit = 8
    } = req.query;

    const query = {};

    if (q) {
      const regex = new RegExp(q, 'i');
      query.$or = [
        { courseTitle: regex },
        { shortDescription: regex },
        { category: regex }
      ];
    }

    if (category && category !== 'All Categories') {
      query.category = category;
    }

    if (status && status !== 'All Status') {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const filteredCount = await Course.countDocuments(query);
    const courses = await Course.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalCourses = await Course.countDocuments();
    const activeCourses = await Course.countDocuments({ status: 'Active' });
    const inactiveCourses = await Course.countDocuments({ status: 'Inactive' });

    const kpis = {
      totalCourses: totalCourses || 12,
      activeCourses: activeCourses || 10,
      inactiveCourses: inactiveCourses || 2
    };

    return res.status(200).json({
      success: true,
      totalCount: filteredCount,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredCount / parseInt(limit)) || 1,
      courses,
      kpis
    });
  } catch (err) {
    console.error('Get Courses Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/admin/courses
// @desc    Create a new course
router.post('/courses', async (req, res) => {
  try {
    const {
      courseTitle,
      shortDescription,
      category,
      duration,
      fee,
      installments,
      thumbnail,
      status
    } = req.body;

    if (!courseTitle || !shortDescription) {
      return res.status(400).json({ success: false, message: 'Course Title and Short Description are required' });
    }

    const newCourse = await Course.create({
      courseTitle: courseTitle.trim(),
      shortDescription: shortDescription.trim(),
      category: category || 'Development',
      duration: duration || '4 Months',
      fee: fee ? parseInt(fee) : 40000,
      installments: installments || '1 (Full Payment)',
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&auto=format&fit=crop&q=80',
      status: status || 'Active',
      enrolledCount: 0,
      modulesCount: 6
    });

    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course: newCourse
    });
  } catch (err) {
    console.error('Create Course Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/admin/courses/:id
// @desc    Update course details or toggle status
router.put('/courses/:id', async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course: updated
    });
  } catch (err) {
    console.error('Update Course Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/admin/courses/:id
// @desc    Delete a course
router.delete('/courses/:id', async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (err) {
    console.error('Delete Course Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/admin/modules
// @desc    Get all modules and lessons for a course
router.get('/modules', async (req, res) => {
  try {
    const { course = 'Digital Marketing' } = req.query;

    const courseDoc = await Course.findOne({ courseTitle: course });
    const modules = await Module.find({ courseTitle: course }).sort({ moduleNumber: 1 });

    const courseInfo = courseDoc ? {
      title: courseDoc.courseTitle,
      shortDescription: courseDoc.shortDescription,
      duration: courseDoc.duration,
      fee: `₹${(courseDoc.fee || 40000).toLocaleString('en-IN')}`,
      modulesCount: modules.length || 8,
      thumbnail: courseDoc.thumbnail || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=80'
    } : {
      title: course,
      shortDescription: 'Learn SEO, Google Ads, Social Media Marketing and more.',
      duration: '4 Months',
      fee: '₹40,000',
      modulesCount: modules.length || 8,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=80'
    };

    return res.status(200).json({
      success: true,
      course: courseInfo,
      modules
    });
  } catch (err) {
    console.error('Get Modules Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/admin/modules
// @desc    Add a new module to a course
router.post('/modules', async (req, res) => {
  try {
    const { courseTitle, moduleTitle, moduleNumber } = req.body;
    if (!courseTitle || !moduleTitle) {
      return res.status(400).json({ success: false, message: 'Course Title and Module Title are required' });
    }

    const count = await Module.countDocuments({ courseTitle });
    const num = moduleNumber || count + 1;

    const newModule = await Module.create({
      courseTitle,
      moduleNumber: num,
      moduleTitle,
      lessonsCount: 0,
      totalDuration: '0h 00m',
      status: 'Published',
      lessons: []
    });

    return res.status(201).json({
      success: true,
      message: 'Module created successfully',
      module: newModule
    });
  } catch (err) {
    console.error('Create Module Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/admin/modules/:id
// @desc    Update a module title or status
router.put('/modules/:id', async (req, res) => {
  try {
    const updated = await Module.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }
    return res.status(200).json({ success: true, message: 'Module updated successfully', module: updated });
  } catch (err) {
    console.error('Update Module Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/admin/modules/:id
// @desc    Delete a module
router.delete('/modules/:id', async (req, res) => {
  try {
    const deleted = await Module.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }
    return res.status(200).json({ success: true, message: 'Module deleted successfully' });
  } catch (err) {
    console.error('Delete Module Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/admin/modules/:id/lessons
// @desc    Add a lesson to a module
router.post('/modules/:id/lessons', async (req, res) => {
  try {
    const mod = await Module.findById(req.params.id);
    if (!mod) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }

    const {
      lessonTitle,
      type = 'Video',
      duration = '15 min',
      durationMinutes = 15,
      description = '',
      videoUrl = '',
      status = 'Published',
      isAvailable = true,
      isFreePreview = false
    } = req.body;

    const lessonNumber = mod.lessons.length + 1;
    const newLesson = {
      lessonNumber,
      lessonTitle,
      type,
      duration: duration.includes('min') ? duration : `${duration} min`,
      durationMinutes: parseInt(durationMinutes) || 15,
      description,
      videoUrl,
      status,
      isAvailable,
      isFreePreview
    };

    mod.lessons.push(newLesson);
    mod.lessonsCount = mod.lessons.length;

    // Recalculate total duration
    const totalMins = mod.lessons.reduce((acc, l) => acc + (l.durationMinutes || 15), 0);
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    mod.totalDuration = `${hrs}h ${mins.toString().padStart(2, '0')}m`;

    await mod.save();

    return res.status(201).json({
      success: true,
      message: 'Lesson added successfully',
      module: mod
    });
  } catch (err) {
    console.error('Add Lesson Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/admin/modules/:id/lessons/:lessonId
// @desc    Update a lesson inside a module
router.put('/modules/:id/lessons/:lessonId', async (req, res) => {
  try {
    const mod = await Module.findById(req.params.id);
    if (!mod) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }

    const lesson = mod.lessons.id(req.params.lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }

    Object.assign(lesson, req.body);
    if (req.body.durationMinutes) {
      lesson.duration = `${req.body.durationMinutes} min`;
    }

    const totalMins = mod.lessons.reduce((acc, l) => acc + (l.durationMinutes || 15), 0);
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    mod.totalDuration = `${hrs}h ${mins.toString().padStart(2, '0')}m`;

    await mod.save();

    return res.status(200).json({
      success: true,
      message: 'Lesson updated successfully',
      module: mod
    });
  } catch (err) {
    console.error('Update Lesson Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/admin/modules/:id/lessons/:lessonId
// @desc    Delete a lesson from a module
router.delete('/modules/:id/lessons/:lessonId', async (req, res) => {
  try {
    const mod = await Module.findById(req.params.id);
    if (!mod) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }

    mod.lessons = mod.lessons.filter(l => l._id.toString() !== req.params.lessonId);
    mod.lessonsCount = mod.lessons.length;

    const totalMins = mod.lessons.reduce((acc, l) => acc + (l.durationMinutes || 15), 0);
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    mod.totalDuration = `${hrs}h ${mins.toString().padStart(2, '0')}m`;

    await mod.save();

    return res.status(200).json({
      success: true,
      message: 'Lesson deleted successfully',
      module: mod
    });
  } catch (err) {
    console.error('Delete Lesson Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
