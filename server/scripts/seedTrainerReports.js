const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch(e) {}

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const TrainerReport = require('../models/TrainerReport');

const trainerReportsData = [
  {
    order: 1,
    trainerName: 'Soundarya G',
    trainerId: 'TRN001',
    email: 'soundarya.g@edurup.in',
    avatarInitials: 'SG',
    avatarColor: '#8B5CF6',
    courses: 'Data Analytics',
    classes: 34,
    attendance: 93,
    completion: 90,
    avgRating: 4.7,
    engagement: 92,
    status: 'Excellent',
    trainerStatus: 'Active',
    subscriptionMonth: 'Nov 2026'
  },
  {
    order: 2,
    trainerName: 'Rohit Kumar',
    trainerId: 'TRN002',
    email: 'rohit.kumar@edurup.in',
    avatarInitials: 'RK',
    avatarColor: '#2563EB',
    courses: 'Data Science',
    classes: 28,
    attendance: 91,
    completion: 88,
    avgRating: 4.6,
    engagement: 89,
    status: 'Excellent',
    trainerStatus: 'Active',
    subscriptionMonth: 'Nov 2026'
  },
  {
    order: 3,
    trainerName: 'Vivek Prasad',
    trainerId: 'TRN003',
    email: 'vivek.prasad@edurup.in',
    avatarInitials: 'VP',
    avatarColor: '#EC4899',
    courses: 'Full Stack Dev',
    classes: 30,
    attendance: 89,
    completion: 86,
    avgRating: 4.5,
    engagement: 87,
    status: 'Good',
    trainerStatus: 'Active',
    subscriptionMonth: 'Nov 2026'
  },
  {
    order: 4,
    trainerName: 'Neha Kulkarni',
    trainerId: 'TRN004',
    email: 'neha.kulkarni@edurup.in',
    avatarInitials: 'NK',
    avatarColor: '#F59E0B',
    courses: 'Digital Marketing',
    classes: 26,
    attendance: 95,
    completion: 92,
    avgRating: 4.8,
    engagement: 93,
    status: 'Excellent',
    trainerStatus: 'Active',
    subscriptionMonth: 'Nov 2026'
  },
  {
    order: 5,
    trainerName: 'Anjali Shenoy',
    trainerId: 'TRN005',
    email: 'anjali.shenoy@edurup.in',
    avatarInitials: 'AS',
    avatarColor: '#3B82F6',
    courses: 'Python Full Stack',
    classes: 20,
    attendance: 88,
    completion: 85,
    avgRating: 4.4,
    engagement: 86,
    status: 'Good',
    trainerStatus: 'Active',
    subscriptionMonth: 'Nov 2026'
  },
  {
    order: 6,
    trainerName: 'Manoj Das',
    trainerId: 'TRN006',
    email: 'manoj.das@edurup.in',
    avatarInitials: 'MD',
    avatarColor: '#10B981',
    courses: 'Data Analytics',
    classes: 18,
    attendance: 90,
    completion: 87,
    avgRating: 4.5,
    engagement: 85,
    status: 'Good',
    trainerStatus: 'Active',
    subscriptionMonth: 'Nov 2026'
  },
  {
    order: 7,
    trainerName: 'Pavan K',
    trainerId: 'TRN007',
    email: 'pavan.k@edurup.in',
    avatarInitials: 'PK',
    avatarColor: '#6366F1',
    courses: 'Data Science',
    classes: 16,
    attendance: 87,
    completion: 84,
    avgRating: 4.3,
    engagement: 83,
    status: 'Needs Attention',
    trainerStatus: 'Active',
    subscriptionMonth: 'Nov 2026'
  },
  {
    order: 8,
    trainerName: 'Sravya R',
    trainerId: 'TRN008',
    email: 'sravya.r@edurup.in',
    avatarInitials: 'SR',
    avatarColor: '#06B6D4',
    courses: 'Full Stack Dev',
    classes: 14,
    attendance: 86,
    completion: 82,
    avgRating: 4.2,
    engagement: 81,
    status: 'Needs Attention',
    trainerStatus: 'Active',
    subscriptionMonth: 'Nov 2026'
  },
  {
    order: 9,
    trainerName: 'Amit Kulkarni',
    trainerId: 'TRN009',
    email: 'amit.kulkarni@edurup.in',
    avatarInitials: 'AK',
    avatarColor: '#8B5CF6',
    courses: 'AI/ML & Deep Learning',
    classes: 0,
    attendance: 92,
    completion: 91,
    avgRating: 4.6,
    engagement: 90,
    status: 'Excellent',
    trainerStatus: 'Active',
    subscriptionMonth: 'Nov 2026'
  },
  {
    order: 10,
    trainerName: 'Tanvi Chawla',
    trainerId: 'TRN010',
    email: 'tanvi.chawla@edurup.in',
    avatarInitials: 'TC',
    avatarColor: '#EC4899',
    courses: 'Cloud & DevOps',
    classes: 0,
    attendance: 90,
    completion: 88,
    avgRating: 4.5,
    engagement: 88,
    status: 'Good',
    trainerStatus: 'Active',
    subscriptionMonth: 'Nov 2026'
  },
  {
    order: 11,
    trainerName: 'Vikram Joshi',
    trainerId: 'TRN011',
    email: 'vikram.joshi@edurup.in',
    avatarInitials: 'VJ',
    avatarColor: '#2563EB',
    courses: 'Cyber Security',
    classes: 0,
    attendance: 91,
    completion: 89,
    avgRating: 4.6,
    engagement: 89,
    status: 'Good',
    trainerStatus: 'Active',
    subscriptionMonth: 'Nov 2026'
  },
  {
    order: 12,
    trainerName: 'Pooja Sengupta',
    trainerId: 'TRN012',
    email: 'pooja.sengupta@edurup.in',
    avatarInitials: 'PS',
    avatarColor: '#10B981',
    courses: 'Digital Marketing',
    classes: 0,
    attendance: 88,
    completion: 86,
    avgRating: 4.4,
    engagement: 85,
    status: 'Good',
    trainerStatus: 'Active',
    subscriptionMonth: 'Nov 2026'
  }
];

async function seedTrainerReports() {
  try {
    await connectDB();
    console.log('MongoDB connected for trainer reports seeding...');

    await TrainerReport.deleteMany({});
    console.log('Cleared existing trainer reports');

    const created = await TrainerReport.insertMany(trainerReportsData);
    console.log(`Successfully seeded ${created.length} trainer reports:`);

    let totalClasses = 0;
    created.forEach(t => {
      totalClasses += t.classes;
      console.log(` - [#${t.order}] ${t.trainerName} - ${t.courses}: ${t.classes} classes, Att ${t.attendance}%, Comp ${t.completion}%, Rating ${t.avgRating}, Eng ${t.engagement}%, Status: ${t.status}`);
    });

    console.log(`\nTotals: Trainers: ${created.length}, Classes Conducted: ${totalClasses}`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding trainer reports error:', err);
    process.exit(1);
  }
}

seedTrainerReports();
