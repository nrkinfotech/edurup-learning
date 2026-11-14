const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const RecurringTask = require('../models/RecurringTask');

const recurringTasksData = [
  // 1. Weekly Practice – Power BI
  {
    order: 1,
    title: 'Weekly Practice – Power BI',
    subtitle: 'Hands-on practice every week',
    description: 'Weekly hands-on practice with Power BI datasets and visualizations.',
    course: 'Data Analytics',
    taskType: 'Assignment',
    pattern: 'Weekly',
    repeatEvery: 1,
    daysOfWeek: ['Mon'],
    time: '10:00 AM',
    startDate: '17 Nov 2026',
    endDate: 'No end date',
    recurrenceText: 'Every Week (Mon, 10:00 AM)',
    nextRun: '17 Nov 2026',
    nextRunRaw: new Date('2026-11-17T10:00:00Z'),
    assignedType: 'batch',
    assignedTarget: 'Oct 2026 (32)',
    autoAssignNewStudents: true,
    status: 'Active'
  },
  // 2. Weekly SQL Assignment
  {
    order: 2,
    title: 'Weekly SQL Assignment',
    subtitle: 'SQL practice and queries',
    description: 'Practice complex queries, joins, and window functions on sample e-commerce data.',
    course: 'Data Analytics',
    taskType: 'Assignment',
    pattern: 'Weekly',
    repeatEvery: 1,
    daysOfWeek: ['Fri'],
    time: '04:00 PM',
    startDate: '21 Nov 2026',
    endDate: 'No end date',
    recurrenceText: 'Every Week (Fri, 04:00 PM)',
    nextRun: '21 Nov 2026',
    nextRunRaw: new Date('2026-11-21T16:00:00Z'),
    assignedType: 'all_active',
    assignedTarget: 'All Active (128)',
    autoAssignNewStudents: true,
    status: 'Active'
  },
  // 3. Bi-Weekly Project Check-in
  {
    order: 3,
    title: 'Bi-Weekly Project Check-in',
    subtitle: 'Project progress update',
    description: 'Submit sprint progress, code repositories, and blockers for mentor review.',
    course: 'Data Science',
    taskType: 'Project Milestone',
    pattern: 'Bi-Weekly',
    repeatEvery: 2,
    daysOfWeek: ['Mon'],
    time: '11:00 AM',
    startDate: '24 Nov 2026',
    endDate: 'No end date',
    recurrenceText: 'Every 2 Weeks (Mon, 11:00 AM)',
    nextRun: '24 Nov 2026',
    nextRunRaw: new Date('2026-11-24T11:00:00Z'),
    assignedType: 'batch',
    assignedTarget: 'Oct 2026 (18)',
    autoAssignNewStudents: true,
    status: 'Active'
  },
  // 4. Monthly Capstone Task
  {
    order: 4,
    title: 'Monthly Capstone Task',
    subtitle: 'End of month mini project',
    description: 'End of month mini-project milestone submission and architecture review.',
    course: 'Full Stack',
    taskType: 'Project Milestone',
    pattern: 'Monthly',
    repeatEvery: 1,
    daysOfWeek: ['Mon'],
    time: '10:00 AM',
    startDate: '01 Dec 2026',
    endDate: 'No end date',
    recurrenceText: 'Every Month (1st, 10:00 AM)',
    nextRun: '01 Dec 2026',
    nextRunRaw: new Date('2026-12-01T10:00:00Z'),
    assignedType: 'batch',
    assignedTarget: 'All Batches',
    autoAssignNewStudents: true,
    status: 'Active'
  },
  // 5. Weekly Coding Challenge
  {
    order: 5,
    title: 'Weekly Coding Challenge',
    subtitle: 'DSA / Logic building',
    description: 'Solve data structures and algorithmic challenges in JavaScript/Python.',
    course: 'Full Stack',
    taskType: 'Assignment',
    pattern: 'Weekly',
    repeatEvery: 1,
    daysOfWeek: ['Wed'],
    time: '06:00 PM',
    startDate: '18 Nov 2026',
    endDate: 'No end date',
    recurrenceText: 'Every Week (Wed, 06:00 PM)',
    nextRun: '18 Nov 2026',
    nextRunRaw: new Date('2026-11-18T18:00:00Z'),
    assignedType: 'batch',
    assignedTarget: 'Oct 2026 (26)',
    autoAssignNewStudents: true,
    status: 'Paused'
  },
  // 6. Monthly Marketing Campaign
  {
    order: 6,
    title: 'Monthly Marketing Campaign',
    subtitle: 'Real-world campaign task',
    description: 'Create and execute mock ad campaigns with target audience segmentation and analytics.',
    course: 'Digital Marketing',
    taskType: 'Assignment',
    pattern: 'Monthly',
    repeatEvery: 1,
    daysOfWeek: ['Fri'],
    time: '11:00 AM',
    startDate: '05 Dec 2026',
    endDate: 'No end date',
    recurrenceText: 'Every Month (5th, 11:00 AM)',
    nextRun: '05 Dec 2026',
    nextRunRaw: new Date('2026-12-05T11:00:00Z'),
    assignedType: 'batch',
    assignedTarget: 'Sep 2026 (20)',
    autoAssignNewStudents: true,
    status: 'Active'
  },
  // 7. Weekly Data Cleaning Task
  {
    order: 7,
    title: 'Weekly Data Cleaning Task',
    subtitle: 'Data preparation & cleaning',
    description: 'Handle missing values, anomalies, and clean messy raw datasets with pandas.',
    course: 'Data Analytics',
    taskType: 'Assignment',
    pattern: 'Weekly',
    repeatEvery: 1,
    daysOfWeek: ['Tue'],
    time: '10:00 AM',
    startDate: '18 Nov 2026',
    endDate: 'No end date',
    recurrenceText: 'Every Week (Tue, 10:00 AM)',
    nextRun: '18 Nov 2026',
    nextRunRaw: new Date('2026-11-18T10:00:00Z'),
    assignedType: 'all_active',
    assignedTarget: 'All Active (128)',
    autoAssignNewStudents: true,
    status: 'Active'
  },
  // 8. Monthly Analytics Report
  {
    order: 8,
    title: 'Monthly Analytics Report',
    subtitle: 'Create and submit analysis',
    description: 'Compile monthly analytical summaries, cohort analyses, and trend forecasts.',
    course: 'Data Science',
    taskType: 'Report',
    pattern: 'Monthly',
    repeatEvery: 1,
    daysOfWeek: ['Sun'],
    time: '05:00 PM',
    startDate: '30 Nov 2026',
    endDate: 'No end date',
    recurrenceText: 'Every Month (Last Day, 05:00 PM)',
    nextRun: '30 Nov 2026',
    nextRunRaw: new Date('2026-11-30T17:00:00Z'),
    assignedType: 'batch',
    assignedTarget: 'Oct 2026 (18)',
    autoAssignNewStudents: false,
    status: 'Inactive'
  },
  // 9. Weekly Frontend Task
  {
    order: 9,
    title: 'Weekly Frontend Task',
    subtitle: 'UI component or feature',
    description: 'Implement accessible React/HTML responsive layout component based on Figma specs.',
    course: 'Full Stack',
    taskType: 'Assignment',
    pattern: 'Weekly',
    repeatEvery: 1,
    daysOfWeek: ['Thu'],
    time: '04:00 PM',
    startDate: '19 Nov 2026',
    endDate: 'No end date',
    recurrenceText: 'Every Week (Thu, 04:00 PM)',
    nextRun: '19 Nov 2026',
    nextRunRaw: new Date('2026-11-19T16:00:00Z'),
    assignedType: 'batch',
    assignedTarget: 'Nov 2026 (24)',
    autoAssignNewStudents: true,
    status: 'Active'
  },
  // 10. Monthly Internship Report
  {
    order: 10,
    title: 'Monthly Internship Report',
    subtitle: 'Internship progress update',
    description: 'Detailed internship progress report covering weekly deliverables and mentor notes.',
    course: 'Internship',
    taskType: 'Report',
    pattern: 'Monthly',
    repeatEvery: 1,
    daysOfWeek: ['Thu'],
    time: '11:00 AM',
    startDate: '10 Dec 2026',
    endDate: 'No end date',
    recurrenceText: 'Every Month (10th, 11:00 AM)',
    nextRun: '10 Dec 2026',
    nextRunRaw: new Date('2026-12-10T11:00:00Z'),
    assignedType: 'batch',
    assignedTarget: 'Interns (14)',
    autoAssignNewStudents: true,
    status: 'Active'
  },
  // 11. Weekly Quiz Review
  {
    order: 11,
    title: 'Weekly Quiz Review',
    subtitle: 'Assessment review & doubts',
    description: 'Review quiz assessment answers and clarify conceptual doubts with mentors.',
    course: 'Data Analytics',
    taskType: 'Quiz',
    pattern: 'Weekly',
    repeatEvery: 1,
    daysOfWeek: ['Sat'],
    time: '11:00 AM',
    startDate: '22 Nov 2026',
    endDate: 'No end date',
    recurrenceText: 'Every Week (Sat, 11:00 AM)',
    nextRun: '22 Nov 2026',
    nextRunRaw: new Date('2026-11-22T11:00:00Z'),
    assignedType: 'batch',
    assignedTarget: 'Oct 2026 (32)',
    autoAssignNewStudents: true,
    status: 'Paused'
  },
  // 12. Bi-Weekly Case Study
  {
    order: 12,
    title: 'Bi-Weekly Case Study',
    subtitle: 'Business case study review',
    description: 'Analyze market expansion strategies and customer acquisition case studies.',
    course: 'Digital Marketing',
    taskType: 'Assignment',
    pattern: 'Bi-Weekly',
    repeatEvery: 2,
    daysOfWeek: ['Wed'],
    time: '03:00 PM',
    startDate: '25 Nov 2026',
    endDate: 'No end date',
    recurrenceText: 'Every 2 Weeks (Wed, 03:00 PM)',
    nextRun: '25 Nov 2026',
    nextRunRaw: new Date('2026-11-25T15:00:00Z'),
    assignedType: 'batch',
    assignedTarget: 'Sep 2026 (20)',
    autoAssignNewStudents: true,
    status: 'Active'
  }
];

async function seedRecurringTasks() {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGO_URI is missing');

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected.');

    console.log('Clearing old recurring tasks...');
    await RecurringTask.deleteMany({});

    console.log(`Inserting ${recurringTasksData.length} recurring tasks...`);
    await RecurringTask.insertMany(recurringTasksData);

    const total = await RecurringTask.countDocuments();
    const active = await RecurringTask.countDocuments({ status: 'Active' });
    const paused = await RecurringTask.countDocuments({ status: 'Paused' });
    const inactive = await RecurringTask.countDocuments({ status: 'Inactive' });

    console.log('=== VERIFICATION SUMMARY ===');
    console.log(`Total Recurring Tasks: ${total} (Target: 12)`);
    console.log(`Active: ${active} (${Math.round((active/total)*100)}%) (Target: 9 - 75%)`);
    console.log(`Paused: ${paused} (${Math.round((paused/total)*100)}%) (Target: 2 - 17%)`);
    console.log(`Inactive: ${inactive} (${Math.round((inactive/total)*100)}%) (Target: 1 - 8%)`);

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedRecurringTasks();
