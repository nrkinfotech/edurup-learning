const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch(e) {}

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const StudentReport = require('../models/StudentReport');

const studentReportsData = [
  {
    order: 1,
    studentName: 'Ananya Kumar',
    email: 'ananya.kumar@gmail.com',
    studentId: 'EDU001234',
    avatarInitials: 'AK',
    avatarColor: '#2563EB',
    course: 'Data Analytics',
    batch: 'Batch A - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 96,
    completion: 100,
    assessment: 94,
    status: 'Excellent',
    studentStatus: 'Active',
    placementStatus: 'Placed',
    internshipStatus: 'Active Internship'
  },
  {
    order: 2,
    studentName: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    studentId: 'EDU001235',
    avatarInitials: 'RS',
    avatarColor: '#8B5CF6',
    course: 'Data Science',
    batch: 'Batch A - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 92,
    completion: 98,
    assessment: 92,
    status: 'Excellent',
    studentStatus: 'Active',
    placementStatus: 'Placed',
    internshipStatus: 'Active Internship'
  },
  {
    order: 3,
    studentName: 'Priya Verma',
    email: 'priya.verma@gmail.com',
    studentId: 'EDU001236',
    avatarInitials: 'PV',
    avatarColor: '#EC4899',
    course: 'Full Stack Dev',
    batch: 'Batch B - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 100,
    completion: 98,
    assessment: 91,
    status: 'Excellent',
    studentStatus: 'Active',
    placementStatus: 'Placed',
    internshipStatus: 'Active Internship'
  },
  {
    order: 4,
    studentName: 'Vikram Kumar',
    email: 'vikram.kumar@gmail.com',
    studentId: 'EDU001237',
    avatarInitials: 'VK',
    avatarColor: '#10B981',
    course: 'Digital Marketing',
    batch: 'Batch A - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 78,
    completion: 86,
    assessment: 84,
    status: 'Good',
    studentStatus: 'Active',
    placementStatus: 'Placed',
    internshipStatus: 'Active Internship'
  },
  {
    order: 5,
    studentName: 'Sneha Murthy',
    email: 'sneha.murthy@gmail.com',
    studentId: 'EDU001238',
    avatarInitials: 'SM',
    avatarColor: '#3B82F6',
    course: 'Python Full Stack',
    batch: 'Batch C - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 94,
    completion: 95,
    assessment: 90,
    status: 'Good',
    studentStatus: 'Active',
    placementStatus: 'Placed',
    internshipStatus: 'Active Internship'
  },
  {
    order: 6,
    studentName: 'Arjun Das',
    email: 'arjun.das@gmail.com',
    studentId: 'EDU001239',
    avatarInitials: 'AD',
    avatarColor: '#06B6D4',
    course: 'Data Analytics',
    batch: 'Batch B - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 98,
    completion: 96,
    assessment: 93,
    status: 'Excellent',
    studentStatus: 'Active',
    placementStatus: 'Placed',
    internshipStatus: 'Active Internship'
  },
  {
    order: 7,
    studentName: 'Neha Kulkarni',
    email: 'neha.kulkarni@gmail.com',
    studentId: 'EDU001240',
    avatarInitials: 'NK',
    avatarColor: '#F59E0B',
    course: 'Data Science',
    batch: 'Batch B - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 82,
    completion: 84,
    assessment: 78,
    status: 'Needs Attention',
    studentStatus: 'Active',
    placementStatus: 'In Process',
    internshipStatus: 'Interviewing'
  },
  {
    order: 8,
    studentName: 'Rohit Singh',
    email: 'rohit.singh@gmail.com',
    studentId: 'EDU001241',
    avatarInitials: 'RS',
    avatarColor: '#6366F1',
    course: 'Full Stack Dev',
    batch: 'Batch A - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 91,
    completion: 92,
    assessment: 88,
    status: 'Good',
    studentStatus: 'Active',
    placementStatus: 'Placed',
    internshipStatus: 'Active Internship'
  },
  {
    order: 9,
    studentName: 'Megha Dutta',
    email: 'megha.dutta@gmail.com',
    studentId: 'EDU001242',
    avatarInitials: 'MD',
    avatarColor: '#10B981',
    course: 'Digital Marketing',
    batch: 'Batch B - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 96,
    completion: 95,
    assessment: 92,
    status: 'Excellent',
    studentStatus: 'Active',
    placementStatus: 'Placed',
    internshipStatus: 'Active Internship'
  },
  {
    order: 10,
    studentName: 'Sanjay Kumar',
    email: 'sanjay.kumar@gmail.com',
    studentId: 'EDU001243',
    avatarInitials: 'SK',
    avatarColor: '#8B5CF6',
    course: 'Data Analytics',
    batch: 'Batch C - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 88,
    completion: 90,
    assessment: 86,
    status: 'Good',
    studentStatus: 'Active',
    placementStatus: 'Placed',
    internshipStatus: 'Active Internship'
  },
  {
    order: 11,
    studentName: 'Aditi Rao',
    email: 'aditi.rao@gmail.com',
    studentId: 'EDU001244',
    avatarInitials: 'AR',
    avatarColor: '#EC4899',
    course: 'AI/ML & Deep Learning',
    batch: 'Batch A - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 95,
    completion: 94,
    assessment: 91,
    status: 'Excellent',
    studentStatus: 'Active',
    placementStatus: 'Placed',
    internshipStatus: 'Active Internship'
  },
  {
    order: 12,
    studentName: 'Kunal Patil',
    email: 'kunal.patil@gmail.com',
    studentId: 'EDU001245',
    avatarInitials: 'KP',
    avatarColor: '#3B82F6',
    course: 'Cloud & DevOps',
    batch: 'Batch A - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 89,
    completion: 88,
    assessment: 85,
    status: 'Good',
    studentStatus: 'Active',
    placementStatus: 'Placed',
    internshipStatus: 'Active Internship'
  },
  {
    order: 13,
    studentName: 'Divya Nambiar',
    email: 'divya.nambiar@gmail.com',
    studentId: 'EDU001246',
    avatarInitials: 'DN',
    avatarColor: '#10B981',
    course: 'Cyber Security',
    batch: 'Batch A - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 86,
    completion: 85,
    assessment: 83,
    status: 'Good',
    studentStatus: 'Active',
    placementStatus: 'In Process',
    internshipStatus: 'Interviewing'
  },
  {
    order: 14,
    studentName: 'Manish Tiwari',
    email: 'manish.tiwari@gmail.com',
    studentId: 'EDU001247',
    avatarInitials: 'MT',
    avatarColor: '#F59E0B',
    course: 'Full Stack Dev',
    batch: 'Batch B - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 74,
    completion: 78,
    assessment: 72,
    status: 'Needs Attention',
    studentStatus: 'On Hold',
    placementStatus: 'Not Ready',
    internshipStatus: 'None'
  },
  {
    order: 15,
    studentName: 'Ritu Menon',
    email: 'ritu.menon@gmail.com',
    studentId: 'EDU001248',
    avatarInitials: 'RM',
    avatarColor: '#6366F1',
    course: 'Data Science',
    batch: 'Batch C - Nov 2026',
    subscriptionMonth: 'Nov 2026',
    attendance: 97,
    completion: 100,
    assessment: 96,
    status: 'Excellent',
    studentStatus: 'Completed',
    placementStatus: 'Placed',
    internshipStatus: 'Completed'
  }
];

async function seedStudentReports() {
  try {
    await connectDB();
    console.log('MongoDB connected for student reports seeding...');

    await StudentReport.deleteMany({});
    console.log('Cleared existing student reports');

    const created = await StudentReport.insertMany(studentReportsData);
    console.log(`Successfully seeded ${created.length} student reports.`);

    created.slice(0, 10).forEach(s => {
      console.log(` - [#${s.order}] ${s.studentName} (${s.studentId}) - ${s.course}: Att ${s.attendance}%, Comp ${s.completion}%, Assess ${s.assessment}%, Status: ${s.status}`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Seeding student reports error:', err);
    process.exit(1);
  }
}

seedStudentReports();
