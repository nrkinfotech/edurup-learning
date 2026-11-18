const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch(e) {}

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const CourseReport = require('../models/CourseReport');

const courseReportsData = [
  {
    order: 1,
    courseName: 'Data Analytics',
    code: 'DA-101',
    category: 'Data Analytics',
    icon: 'fa-chart-pie',
    iconColor: '#2563EB',
    enrollments: 322,
    active: 268,
    completion: 93,
    assessment: 86,
    placement: 72,
    internships: 118,
    status: 'Active',
    mode: 'Hybrid',
    subscriptionMonth: 'Nov 2026',
    batchCount: 12,
    trainerName: 'Dr. Amit Trivedi'
  },
  {
    order: 2,
    courseName: 'Data Science',
    code: 'DS-201',
    category: 'Data Science',
    icon: 'fa-brain',
    iconColor: '#8B5CF6',
    enrollments: 186,
    active: 155,
    completion: 91,
    assessment: 88,
    placement: 74,
    internships: 72,
    status: 'Active',
    mode: 'Hybrid',
    subscriptionMonth: 'Nov 2026',
    batchCount: 8,
    trainerName: 'Dr. Sanya Kapoor'
  },
  {
    order: 3,
    courseName: 'Full Stack Developer',
    code: 'FSD-301',
    category: 'Full Stack Development',
    icon: 'fa-laptop-code',
    iconColor: '#10B981',
    enrollments: 178,
    active: 149,
    completion: 87,
    assessment: 85,
    placement: 68,
    internships: 60,
    status: 'Active',
    mode: 'Online Live',
    subscriptionMonth: 'Nov 2026',
    batchCount: 8,
    trainerName: 'Vikram Sen'
  },
  {
    order: 4,
    courseName: 'Digital Marketing',
    code: 'DM-401',
    category: 'Digital Marketing',
    icon: 'fa-bullhorn',
    iconColor: '#F59E0B',
    enrollments: 165,
    active: 138,
    completion: 94,
    assessment: 90,
    placement: 76,
    internships: 66,
    status: 'Active',
    mode: 'Recorded',
    subscriptionMonth: 'Nov 2026',
    batchCount: 7,
    trainerName: 'Rohit Mehra'
  },
  {
    order: 5,
    courseName: 'Python Full Stack',
    code: 'PFS-501',
    category: 'Development',
    icon: 'fa-brands fa-python',
    iconColor: '#3B82F6',
    enrollments: 128,
    active: 104,
    completion: 88,
    assessment: 84,
    placement: 69,
    internships: 48,
    status: 'Active',
    mode: 'Hybrid',
    subscriptionMonth: 'Nov 2026',
    batchCount: 5,
    trainerName: 'Neha Sharma'
  },
  {
    order: 6,
    courseName: 'AI/ML & Deep Learning',
    code: 'AIML-601',
    category: 'AI / ML',
    icon: 'fa-robot',
    iconColor: '#6366F1',
    enrollments: 110,
    active: 90,
    completion: 85,
    assessment: 87,
    placement: 71,
    internships: 42,
    status: 'Active',
    mode: 'Online Live',
    subscriptionMonth: 'Nov 2026',
    batchCount: 4,
    trainerName: 'Arjun Rao'
  },
  {
    order: 7,
    courseName: 'Cloud & DevOps',
    code: 'CDO-701',
    category: 'Cloud & DevOps',
    icon: 'fa-cloud',
    iconColor: '#06B6D4',
    enrollments: 95,
    active: 75,
    completion: 83,
    assessment: 83,
    placement: 65,
    internships: 34,
    status: 'Active',
    mode: 'Online Live',
    subscriptionMonth: 'Nov 2026',
    batchCount: 4,
    trainerName: 'Pooja Nair'
  },
  {
    order: 8,
    courseName: 'Cyber Security',
    code: 'CS-801',
    category: 'Cyber Security',
    icon: 'fa-shield-halved',
    iconColor: '#EF4444',
    enrollments: 64,
    active: 44,
    completion: 82,
    assessment: 82,
    placement: 63,
    internships: 22,
    status: 'Active',
    mode: 'Recorded',
    subscriptionMonth: 'Nov 2026',
    batchCount: 3,
    trainerName: 'Karan Varma'
  }
];

async function seedCourseReports() {
  try {
    await connectDB();
    console.log('MongoDB connected for course reports seeding...');

    await CourseReport.deleteMany({});
    console.log('Cleared existing course reports');

    const created = await CourseReport.insertMany(courseReportsData);
    console.log(`Successfully seeded ${created.length} course reports:`);

    let totalEnrollments = 0;
    let totalActive = 0;
    let totalInternships = 0;

    created.forEach(c => {
      totalEnrollments += c.enrollments;
      totalActive += c.active;
      totalInternships += c.internships;
      console.log(` - [${c.order}] ${c.courseName}: ${c.enrollments} enrollments, ${c.active} active, ${c.completion}% completion, ${c.assessment}% assessment, ${c.placement}% placement, ${c.internships} internships`);
    });

    console.log(`\nTotals: Courses: ${created.length}, Enrollments: ${totalEnrollments}, Active: ${totalActive} (${((totalActive/totalEnrollments)*100).toFixed(1)}%), Internships: ${totalInternships}`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding course reports error:', err);
    process.exit(1);
  }
}

seedCourseReports();
