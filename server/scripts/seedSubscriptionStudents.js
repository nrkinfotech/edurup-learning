const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const dns = require('dns');

// Atlas SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const SubscriptionStudent = require('../models/SubscriptionStudent');

// Exact top 10 students from screenshot
const baseOctoberStudents = [
  {
    order: 1,
    studentName: 'Rahul Sharma',
    avatarInitials: 'RS',
    avatarColor: '#2563EB',
    email: 'rahul.sharma@gmail.com',
    batch: 'Oct 2026 - Batch 1',
    subscriptionDate: '05 Oct 2026',
    status: 'Active'
  },
  {
    order: 2,
    studentName: 'Priya Nair',
    avatarInitials: 'PN',
    avatarColor: '#EA580C',
    email: 'priya.nair@gmail.com',
    batch: 'Oct 2026 - Batch 1',
    subscriptionDate: '06 Oct 2026',
    status: 'Active'
  },
  {
    order: 3,
    studentName: 'Amit Kumar',
    avatarInitials: 'AK',
    avatarColor: '#16A34A',
    email: 'amit.kumar@gmail.com',
    batch: 'Oct 2026 - Batch 2',
    subscriptionDate: '07 Oct 2026',
    status: 'Active'
  },
  {
    order: 4,
    studentName: 'Sneha Reddy',
    avatarInitials: 'SR',
    avatarColor: '#9333EA',
    email: 'sneha.reddy@gmail.com',
    batch: 'Oct 2026 - Batch 1',
    subscriptionDate: '08 Oct 2026',
    status: 'Active'
  },
  {
    order: 5,
    studentName: 'Karthik V',
    avatarInitials: 'KV',
    avatarColor: '#D97706',
    email: 'karthikv@gmail.com',
    batch: 'Oct 2026 - Batch 2',
    subscriptionDate: '10 Oct 2026',
    status: 'Active'
  },
  {
    order: 6,
    studentName: 'Meera Joshi',
    avatarInitials: 'MJ',
    avatarColor: '#E11D48',
    email: 'meera.joshi@gmail.com',
    batch: 'Oct 2026 - Batch 2',
    subscriptionDate: '12 Oct 2026',
    status: 'Active'
  },
  {
    order: 7,
    studentName: 'Aditya Patel',
    avatarInitials: 'AP',
    avatarColor: '#7C3AED',
    email: 'aditya.patel@gmail.com',
    batch: 'Oct 2026 - Batch 3',
    subscriptionDate: '14 Oct 2026',
    status: 'Active'
  },
  {
    order: 8,
    studentName: 'Divya Singh',
    avatarInitials: 'DS',
    avatarColor: '#0284C7',
    email: 'divya.singh@gmail.com',
    batch: 'Oct 2026 - Batch 3',
    subscriptionDate: '16 Oct 2026',
    status: 'Active'
  },
  {
    order: 9,
    studentName: 'Manoj Gupta',
    avatarInitials: 'MG',
    avatarColor: '#059669',
    email: 'manoj.gupta@gmail.com',
    batch: 'Oct 2026 - Batch 1',
    subscriptionDate: '18 Oct 2026',
    status: 'Active'
  },
  {
    order: 10,
    studentName: 'Ishita Verma',
    avatarInitials: 'IV',
    avatarColor: '#DC2626',
    email: 'ishita.verma@gmail.com',
    batch: 'Oct 2026 - Batch 3',
    subscriptionDate: '20 Oct 2026',
    status: 'Active'
  }
];

// 22 additional students for October 2026:
// 18 Active, 3 Paused / On Hold, 1 Completed => Total: 28 Active, 3 Paused, 1 Completed = 32 Total!
const remainingOctober = [
  { name: 'Rohan Deshmukh', initials: 'RD', color: '#2563EB', batch: 'Oct 2026 - Batch 1', date: '21 Oct 2026', status: 'Active' },
  { name: 'Ananya Sharma', initials: 'AS', color: '#7C3AED', batch: 'Oct 2026 - Batch 2', date: '21 Oct 2026', status: 'Active' },
  { name: 'Siddharth Roy', initials: 'SR', color: '#059669', batch: 'Oct 2026 - Batch 3', date: '22 Oct 2026', status: 'Active' },
  { name: 'Neha Kulkarni', initials: 'NK', color: '#DC2626', batch: 'Oct 2026 - Batch 1', date: '22 Oct 2026', status: 'Active' },
  { name: 'Tanmay Kapoor', initials: 'TK', color: '#D97706', batch: 'Oct 2026 - Batch 2', date: '23 Oct 2026', status: 'Active' },
  { name: 'Pooja Hegde', initials: 'PH', color: '#E11D48', batch: 'Oct 2026 - Batch 3', date: '23 Oct 2026', status: 'Active' },
  { name: 'Akash Banerjee', initials: 'AB', color: '#0284C7', batch: 'Oct 2026 - Batch 1', date: '24 Oct 2026', status: 'Active' },
  { name: 'Shreya Sen', initials: 'SS', color: '#9333EA', batch: 'Oct 2026 - Batch 2', date: '24 Oct 2026', status: 'Active' },
  { name: 'Varun Nair', initials: 'VN', color: '#16A34A', batch: 'Oct 2026 - Batch 3', date: '25 Oct 2026', status: 'Active' },
  { name: 'Deepika Rao', initials: 'DR', color: '#EA580C', batch: 'Oct 2026 - Batch 1', date: '25 Oct 2026', status: 'Active' },
  { name: 'Gaurav Bhat', initials: 'GB', color: '#2563EB', batch: 'Oct 2026 - Batch 2', date: '26 Oct 2026', status: 'Active' },
  { name: 'Aishwarya Patil', initials: 'AP', color: '#7C3AED', batch: 'Oct 2026 - Batch 3', date: '26 Oct 2026', status: 'Active' },
  { name: 'Nikhil Jain', initials: 'NJ', color: '#059669', batch: 'Oct 2026 - Batch 1', date: '27 Oct 2026', status: 'Active' },
  { name: 'Kavya Pillai', initials: 'KP', color: '#DC2626', batch: 'Oct 2026 - Batch 2', date: '27 Oct 2026', status: 'Active' },
  { name: 'Manish Pandey', initials: 'MP', color: '#D97706', batch: 'Oct 2026 - Batch 3', date: '28 Oct 2026', status: 'Active' },
  { name: 'Swati Menon', initials: 'SM', color: '#E11D48', batch: 'Oct 2026 - Batch 1', date: '28 Oct 2026', status: 'Active' },
  { name: 'Arvind Swamy', initials: 'AS', color: '#0284C7', batch: 'Oct 2026 - Batch 2', date: '29 Oct 2026', status: 'Active' },
  { name: 'Bhavna Tiwari', initials: 'BT', color: '#9333EA', batch: 'Oct 2026 - Batch 3', date: '29 Oct 2026', status: 'Active' },
  // 3 Paused / On Hold
  { name: 'Harish Chandra', initials: 'HC', color: '#16A34A', batch: 'Oct 2026 - Batch 1', date: '11 Oct 2026', status: 'Paused / On Hold' },
  { name: 'Ritu Saxena', initials: 'RS', color: '#EA580C', batch: 'Oct 2026 - Batch 2', date: '13 Oct 2026', status: 'Paused / On Hold' },
  { name: 'Tarun Sethi', initials: 'TS', color: '#2563EB', batch: 'Oct 2026 - Batch 3', date: '15 Oct 2026', status: 'Paused / On Hold' },
  // 1 Completed
  { name: 'Zoya Khan', initials: 'ZK', color: '#059669', batch: 'Oct 2026 - Batch 1', date: '02 Oct 2026', status: 'Completed' }
];

async function seedSubscriptionStudents() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGO_URI is missing');

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to Atlas.');

    console.log('Clearing old subscription students...');
    await SubscriptionStudent.deleteMany({});

    const docs = [];

    // October 2026 for Data Analytics Internship
    baseOctoberStudents.forEach(s => {
      docs.push({
        order: s.order,
        studentName: s.studentName,
        email: s.email,
        course: 'Data Analytics Internship',
        subscriptionMonth: 'October 2026',
        batch: s.batch,
        subscriptionDate: s.subscriptionDate,
        status: s.status,
        avatarInitials: s.avatarInitials,
        avatarColor: s.avatarColor
      });
    });

    remainingOctober.forEach((s, idx) => {
      docs.push({
        order: 11 + idx,
        studentName: s.name,
        email: `${s.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
        course: 'Data Analytics Internship',
        subscriptionMonth: 'October 2026',
        batch: s.batch,
        subscriptionDate: s.date,
        status: s.status,
        avatarInitials: s.initials,
        avatarColor: s.color
      });
    });

    // September 2026 for Data Analytics Internship (28 students)
    for (let i = 1; i <= 28; i++) {
      const status = i <= 24 ? 'Active' : (i <= 26 ? 'Paused / On Hold' : 'Completed');
      docs.push({
        order: 100 + i,
        studentName: `Sep Learner ${i}`,
        email: `sep.learner${i}@gmail.com`,
        course: 'Data Analytics Internship',
        subscriptionMonth: 'September 2026',
        batch: `Sep 2026 - Batch ${(i % 2) + 1}`,
        subscriptionDate: `${String(i).padStart(2, '0')} Sep 2026`,
        status,
        avatarInitials: `SL`,
        avatarColor: '#2563EB'
      });
    }

    // November 2026 for Data Analytics Internship (24 students)
    for (let i = 1; i <= 24; i++) {
      const status = i <= 22 ? 'Active' : 'Paused / On Hold';
      docs.push({
        order: 200 + i,
        studentName: `Nov Learner ${i}`,
        email: `nov.learner${i}@gmail.com`,
        course: 'Data Analytics Internship',
        subscriptionMonth: 'November 2026',
        batch: `Nov 2026 - Batch ${(i % 2) + 1}`,
        subscriptionDate: `${String(i).padStart(2, '0')} Nov 2026`,
        status,
        avatarInitials: `NL`,
        avatarColor: '#7C3AED'
      });
    }

    // Digital Marketing Internship - October 2026 (20 students)
    for (let i = 1; i <= 20; i++) {
      docs.push({
        order: 300 + i,
        studentName: `DM Student ${i}`,
        email: `dm.student${i}@gmail.com`,
        course: 'Digital Marketing Internship',
        subscriptionMonth: 'October 2026',
        batch: `DM-Oct 2026 - Batch 1`,
        subscriptionDate: `${String(i + 2).padStart(2, '0')} Oct 2026`,
        status: 'Active',
        avatarInitials: `DM`,
        avatarColor: '#9333EA'
      });
    }

    console.log(`Inserting ${docs.length} subscription students...`);
    await SubscriptionStudent.insertMany(docs);

    // Verify October Data Analytics counts
    const octTotal = await SubscriptionStudent.countDocuments({
      course: 'Data Analytics Internship',
      subscriptionMonth: 'October 2026'
    });
    const octActive = await SubscriptionStudent.countDocuments({
      course: 'Data Analytics Internship',
      subscriptionMonth: 'October 2026',
      status: 'Active'
    });
    const octPaused = await SubscriptionStudent.countDocuments({
      course: 'Data Analytics Internship',
      subscriptionMonth: 'October 2026',
      status: 'Paused / On Hold'
    });
    const octCompleted = await SubscriptionStudent.countDocuments({
      course: 'Data Analytics Internship',
      subscriptionMonth: 'October 2026',
      status: 'Completed'
    });

    console.log('=== VERIFICATION SUMMARY ===');
    console.log(`October Data Analytics: Total = ${octTotal} (Target: 32)`);
    console.log(`Active = ${octActive} (${Math.round((octActive/octTotal)*100)}%) (Target: 28 - 87%)`);
    console.log(`Paused = ${octPaused} (${Math.round((octPaused/octTotal)*100)}%) (Target: 3 - 9%)`);
    console.log(`Completed = ${octCompleted} (${Math.round((octCompleted/octTotal)*100)}%) (Target: 1 - 3%)`);

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedSubscriptionStudents();
