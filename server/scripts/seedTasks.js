const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const dns = require('dns');

// Atlas SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const Task = require('../models/Task');

const baseTasks = [
  // 1. Data Cleaning Assignment
  {
    order: 1,
    title: 'Data Cleaning Assignment',
    subtitle: 'Clean and preprocess dataset',
    type: 'Assignment',
    course: 'Data Analytics',
    batch: 'DA-OCT-2026',
    assignedTo: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@gmail.com',
      avatarInitials: 'RS',
      avatarColor: '#2563EB'
    },
    dueDate: '25 Oct 2026',
    dueDateRaw: new Date('2026-10-25T23:59:59'),
    status: 'Completed',
    submissionsCount: 1,
    submissionsTotal: 1,
    points: 10,
    priority: 'Medium',
    description: 'Clean and preprocess the given dataset. Handle missing values, outliers and prepare final dataset for analysis.',
    attachments: [
      { name: 'dataset.csv', size: '2.4 MB', type: 'csv', url: '#' },
      { name: 'instructions.pdf', size: '520 KB', type: 'pdf', url: '#' }
    ],
    submission: {
      fileName: 'rahul_solution.ipynb',
      fileSize: '1.8 MB',
      submittedAt: '24 Oct 2026, 04:30 PM',
      fileUrl: '#'
    },
    feedback: {
      mentorName: 'Priya Verma',
      mentorInitials: 'PV',
      date: '24 Oct 2026',
      score: '10 / 10',
      comment: 'Good work! Dataset is cleaned properly. Visualizations are clear.'
    }
  },
  // 2. EDA Project
  {
    order: 2,
    title: 'EDA Project',
    subtitle: 'Perform exploratory analysis',
    type: 'Project',
    course: 'Data Science',
    batch: 'DS-OCT-2026',
    assignedTo: {
      name: 'Priya Nair',
      email: 'priya.nair@gmail.com',
      avatarInitials: 'PN',
      avatarColor: '#EA580C'
    },
    dueDate: '28 Oct 2026',
    dueDateRaw: new Date('2026-10-28T23:59:59'),
    status: 'In Progress',
    submissionsCount: 0,
    submissionsTotal: 1,
    points: 20,
    priority: 'High',
    description: 'Perform in-depth exploratory data analysis on the customer churn dataset. Identify patterns, correlations, and key predictive features.',
    attachments: [
      { name: 'churn_data.csv', size: '4.1 MB', type: 'csv', url: '#' },
      { name: 'eda_guidelines.pdf', size: '890 KB', type: 'pdf', url: '#' }
    ],
    submission: null,
    feedback: null
  },
  // 3. SQL Queries Assignment
  {
    order: 3,
    title: 'SQL Queries Assignment',
    subtitle: 'Solve 20 SQL queries',
    type: 'Assignment',
    course: 'Data Analytics',
    batch: 'DA-OCT-2026',
    assignedTo: {
      name: 'Amit Kumar',
      email: 'amit.kumar@gmail.com',
      avatarInitials: 'AK',
      avatarColor: '#16A34A'
    },
    dueDate: '22 Oct 2026',
    dueDateRaw: new Date('2026-10-22T23:59:59'),
    status: 'Overdue',
    submissionsCount: 0,
    submissionsTotal: 1,
    points: 10,
    priority: 'Medium',
    description: 'Execute complex multi-table joins, subqueries, and window functions to answer 20 business intelligence queries on an eCommerce database.',
    attachments: [
      { name: 'ecommerce_schema.sql', size: '1.2 MB', type: 'sql', url: '#' },
      { name: 'assignment_questions.pdf', size: '640 KB', type: 'pdf', url: '#' }
    ],
    submission: null,
    feedback: null
  },
  // 4. Marketing Campaign Plan
  {
    order: 4,
    title: 'Marketing Campaign Plan',
    subtitle: 'Create a digital marketing plan',
    type: 'Project',
    course: 'Digital Marketing',
    batch: 'DM-OCT-2026',
    assignedTo: {
      name: 'Sneha Reddy',
      email: 'sneha.reddy@gmail.com',
      avatarInitials: 'SR',
      avatarColor: '#9333EA'
    },
    dueDate: '30 Oct 2026',
    dueDateRaw: new Date('2026-10-30T23:59:59'),
    status: 'Not Started',
    submissionsCount: 0,
    submissionsTotal: 1,
    points: 20,
    priority: 'Medium',
    description: 'Formulate an end-to-end multi-channel marketing campaign strategy for a direct-to-consumer sustainable apparel brand with budget allocation.',
    attachments: [
      { name: 'brief_and_persona.pdf', size: '1.5 MB', type: 'pdf', url: '#' },
      { name: 'budget_template.xlsx', size: '320 KB', type: 'excel', url: '#' }
    ],
    submission: null,
    feedback: null
  },
  // 5. React Component Task
  {
    order: 5,
    title: 'React Component Task',
    subtitle: 'Build a reusable component',
    type: 'Assignment',
    course: 'Full Stack',
    batch: 'FS-OCT-2026',
    assignedTo: {
      name: 'Karthik V',
      email: 'karthik.v@gmail.com',
      avatarInitials: 'KV',
      avatarColor: '#D97706'
    },
    dueDate: '24 Oct 2026',
    dueDateRaw: new Date('2026-10-24T23:59:59'),
    status: 'Completed',
    submissionsCount: 1,
    submissionsTotal: 1,
    points: 10,
    priority: 'Low',
    description: 'Build an accessible, responsive data table component in React with client-side sorting, pagination, and search filter props.',
    attachments: [
      { name: 'component_spec.pdf', size: '420 KB', type: 'pdf', url: '#' }
    ],
    submission: {
      fileName: 'react_datatable_karthik.zip',
      fileSize: '3.4 MB',
      submittedAt: '23 Oct 2026, 08:15 PM',
      fileUrl: '#'
    },
    feedback: {
      mentorName: 'Arjun Mehta',
      mentorInitials: 'AM',
      date: '24 Oct 2026',
      score: '10 / 10',
      comment: 'Clean component structure, great documentation and TypeScript types included.'
    }
  },
  // 6. HR Policy Research
  {
    order: 6,
    title: 'HR Policy Research',
    subtitle: 'Study and present HR policies',
    type: 'Assignment',
    course: 'HR Management',
    batch: 'HR-OCT-2026',
    assignedTo: {
      name: 'Meera Joshi',
      email: 'meera.joshi@gmail.com',
      avatarInitials: 'MJ',
      avatarColor: '#E11D48'
    },
    dueDate: '29 Oct 2026',
    dueDateRaw: new Date('2026-10-29T23:59:59'),
    status: 'In Progress',
    submissionsCount: 0,
    submissionsTotal: 1,
    points: 10,
    priority: 'Medium',
    description: 'Analyze contemporary remote-work HR policies, employee retention frameworks, and performance evaluation metrics in tech enterprises.',
    attachments: [
      { name: 'hr_case_study.pdf', size: '780 KB', type: 'pdf', url: '#' }
    ],
    submission: null,
    feedback: null
  },
  // 7. Machine Learning Model
  {
    order: 7,
    title: 'Machine Learning Model',
    subtitle: 'Build a prediction model',
    type: 'Project',
    course: 'AI & ML',
    batch: 'AIML-OCT-2026',
    assignedTo: {
      name: 'Aditya Patel',
      email: 'aditya.patel@gmail.com',
      avatarInitials: 'AP',
      avatarColor: '#7C3AED'
    },
    dueDate: '05 Nov 2026',
    dueDateRaw: new Date('2026-11-05T23:59:59'),
    status: 'Not Started',
    submissionsCount: 0,
    submissionsTotal: 1,
    points: 30,
    priority: 'High',
    description: 'Train, evaluate, and tune a Random Forest and XGBoost regression model to predict housing prices with RMSE under 0.15.',
    attachments: [
      { name: 'housing_features.csv', size: '5.2 MB', type: 'csv', url: '#' },
      { name: 'model_evaluation_criteria.pdf', size: '610 KB', type: 'pdf', url: '#' }
    ],
    submission: null,
    feedback: null
  },
  // 8. Sales Pitch Presentation
  {
    order: 8,
    title: 'Sales Pitch Presentation',
    subtitle: 'Create a sales pitch deck',
    type: 'Assignment',
    course: 'Sales & Marketing',
    batch: 'SM-OCT-2026',
    assignedTo: {
      name: 'Divya Singh',
      email: 'divya.singh@gmail.com',
      avatarInitials: 'DS',
      avatarColor: '#0284C7'
    },
    dueDate: '27 Oct 2026',
    dueDateRaw: new Date('2026-10-27T23:59:59'),
    status: 'Overdue',
    submissionsCount: 0,
    submissionsTotal: 1,
    points: 10,
    priority: 'Medium',
    description: 'Develop a 10-slide enterprise SaaS sales pitch deck addressing customer pain points, value proposition, ROI calculation, and call-to-action.',
    attachments: [
      { name: 'saas_product_overview.pdf', size: '1.1 MB', type: 'pdf', url: '#' }
    ],
    submission: null,
    feedback: null
  },
  // 9. Business Analysis Report
  {
    order: 9,
    title: 'Business Analysis Report',
    subtitle: 'Analyze business case',
    type: 'Project',
    course: 'Business Management',
    batch: 'BM-OCT-2026',
    assignedTo: {
      name: 'Manoj Gupta',
      email: 'manoj.gupta@gmail.com',
      avatarInitials: 'MG',
      avatarColor: '#059669'
    },
    dueDate: '02 Nov 2026',
    dueDateRaw: new Date('2026-11-02T23:59:59'),
    status: 'In Progress',
    submissionsCount: 0,
    submissionsTotal: 1,
    points: 20,
    priority: 'Medium',
    description: 'Conduct a thorough SWOT and financial break-even analysis for expanding an e-commerce retail platform into tier-2 Indian cities.',
    attachments: [
      { name: 'business_case_doc.pdf', size: '2.1 MB', type: 'pdf', url: '#' }
    ],
    submission: null,
    feedback: null
  },
  // 10. Cloud Setup Task
  {
    order: 10,
    title: 'Cloud Setup Task',
    subtitle: 'Setup AWS environment',
    type: 'Assignment',
    course: 'Cloud (AWS)',
    batch: 'AWS-OCT-2026',
    assignedTo: {
      name: 'Ishita Verma',
      email: 'ishita.verma@gmail.com',
      avatarInitials: 'IV',
      avatarColor: '#DC2626'
    },
    dueDate: '26 Oct 2026',
    dueDateRaw: new Date('2026-10-26T23:59:59'),
    status: 'Completed',
    submissionsCount: 1,
    submissionsTotal: 1,
    points: 10,
    priority: 'Low',
    description: 'Configure an AWS VPC with public and private subnets, NAT gateway, internet gateway, and deploy an EC2 instance behind an ALB.',
    attachments: [
      { name: 'aws_architecture_diagram.png', size: '1.4 MB', type: 'png', url: '#' },
      { name: 'setup_instructions.pdf', size: '850 KB', type: 'pdf', url: '#' }
    ],
    submission: {
      fileName: 'aws_vpc_terraform_ishita.zip',
      fileSize: '1.2 MB',
      submittedAt: '25 Oct 2026, 11:20 AM',
      fileUrl: '#'
    },
    feedback: {
      mentorName: 'Vikram Rao',
      mentorInitials: 'VR',
      date: '26 Oct 2026',
      score: '10 / 10',
      comment: 'Flawless VPC configuration and security group rules.'
    }
  }
];

// Student pool for generator
const students = [
  { name: 'Rohan Deshmukh', initials: 'RD', color: '#2563EB' },
  { name: 'Ananya Sharma', initials: 'AS', color: '#7C3AED' },
  { name: 'Siddharth Roy', initials: 'SR', color: '#059669' },
  { name: 'Neha Kulkarni', initials: 'NK', color: '#DC2626' },
  { name: 'Tanmay Kapoor', initials: 'TK', color: '#D97706' },
  { name: 'Pooja Hegde', initials: 'PH', color: '#E11D48' },
  { name: 'Akash Banerjee', initials: 'AB', color: '#0284C7' },
  { name: 'Shreya Sen', initials: 'SS', color: '#9333EA' },
  { name: 'Varun Nair', initials: 'VN', color: '#16A34A' },
  { name: 'Deepika Rao', initials: 'DR', color: '#EA580C' },
  { name: 'Gaurav Bhat', initials: 'GB', color: '#2563EB' },
  { name: 'Aishwarya Patil', initials: 'AP', color: '#7C3AED' },
  { name: 'Nikhil Jain', initials: 'NJ', color: '#059669' },
  { name: 'Kavya Pillai', initials: 'KP', color: '#DC2626' },
  { name: 'Manish Pandey', initials: 'MP', color: '#D97706' },
  { name: 'Swati Menon', initials: 'SM', color: '#E11D48' },
  { name: 'Arvind Swamy', initials: 'AS', color: '#0284C7' },
  { name: 'Bhavna Tiwari', initials: 'BT', color: '#9333EA' },
  { name: 'Harish Chandra', initials: 'HC', color: '#16A34A' },
  { name: 'Ritu Saxena', initials: 'RS', color: '#EA580C' }
];

const courses = [
  'Data Analytics',
  'Data Science',
  'Digital Marketing',
  'Full Stack',
  'HR Management',
  'AI & ML',
  'Sales & Marketing',
  'Business Management',
  'Cloud (AWS)',
  'Cybersecurity',
  'Finance & Accounting',
  'Product Management'
];

const taskTemplates = [
  { title: 'Power BI Dashboard Design', subtitle: 'Build interactive KPI dashboard', type: 'Project', points: 20 },
  { title: 'Google Analytics 4 Setup', subtitle: 'Configure custom events & tags', type: 'Assignment', points: 10 },
  { title: 'Customer Segmentation Analysis', subtitle: 'Apply K-Means clustering algorithm', type: 'Project', points: 25 },
  { title: 'Node.js REST API Architecture', subtitle: 'Implement JWT auth & rate limiting', type: 'Assignment', points: 15 },
  { title: 'Talent Acquisition Strategy', subtitle: 'Design recruitment pipeline & metrics', type: 'Assignment', points: 10 },
  { title: 'Docker Containerization Task', subtitle: 'Create multi-stage Dockerfiles', type: 'Assignment', points: 10 },
  { title: 'Deep Learning CNN Classification', subtitle: 'Image classification with PyTorch', type: 'Project', points: 30 },
  { title: 'SEO Keyword Competitor Gap', subtitle: 'Analyze keyword gaps & backlink profile', type: 'Assignment', points: 10 },
  { title: 'Financial Modeling & Valuation', subtitle: 'DCF & Comparable Company Analysis', type: 'Project', points: 25 },
  { title: 'Kubernetes Cluster Deployment', subtitle: 'Deploy microservices with Helm', type: 'Assignment', points: 15 },
  { title: 'Database Normalization Exercise', subtitle: 'Normalize tables to 3NF & BCNF', type: 'Assignment', points: 10 },
  { title: 'Brand Positioning Deck', subtitle: 'Craft brand narrative & USP matrix', type: 'Project', points: 20 },
  { title: 'CI/CD Pipeline with GitHub Actions', subtitle: 'Automate linting, testing, and deployment', type: 'Assignment', points: 15 },
  { title: 'A/B Testing Statistical Evaluation', subtitle: 'Evaluate conversion hypothesis with p-value', type: 'Project', points: 20 },
  { title: 'Payroll Compliance Audit', subtitle: 'Verify PF, ESI and tax computations', type: 'Assignment', points: 10 },
  { title: 'Time Series Forecasting', subtitle: 'Forecast sales demand using ARIMA/Prophet', type: 'Project', points: 25 }
];

// Target counts:
// Completed: 68
// In Progress: 32
// Overdue: 18
// Not Started: 10
// Total: 128

function generateRemainingTasks() {
  const tasks = [...baseTasks];
  
  // Base 10 tasks counts:
  // Completed: 3 (#1, #5, #10)
  // In Progress: 3 (#2, #6, #9)
  // Overdue: 2 (#3, #8)
  // Not Started: 2 (#4, #7)

  // Remaining needed:
  // Completed: 65
  // In Progress: 29
  // Overdue: 16
  // Not Started: 8
  // Total to generate: 65 + 29 + 16 + 8 = 118 tasks.

  const needed = [
    ...Array(65).fill('Completed'),
    ...Array(29).fill('In Progress'),
    ...Array(16).fill('Overdue'),
    ...Array(8).fill('Not Started')
  ];

  // Deterministic shuffle for nice variety
  let seed = 42;
  function random() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  for (let i = needed.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [needed[i], needed[j]] = [needed[j], needed[i]];
  }

  for (let i = 0; i < needed.length; i++) {
    const order = 11 + i;
    const status = needed[i];
    const tpl = taskTemplates[i % taskTemplates.length];
    const std = students[i % students.length];
    const course = courses[i % courses.length];
    const priority = ['High', 'Medium', 'Low'][i % 3];
    
    // Dates based on status
    let dueDateStr = '28 Oct 2026';
    let dueDateObj = new Date('2026-10-28T23:59:59');
    let submissionsCount = status === 'Completed' ? 1 : 0;
    
    if (status === 'Completed') {
      const day = 15 + (i % 12);
      dueDateStr = `${day} Oct 2026`;
      dueDateObj = new Date(`2026-10-${day}T23:59:59`);
    } else if (status === 'Overdue') {
      const day = 10 + (i % 12);
      dueDateStr = `${day} Oct 2026`;
      dueDateObj = new Date(`2026-10-${day}T23:59:59`);
    } else if (status === 'In Progress') {
      const day = 27 + (i % 5);
      dueDateStr = `${day < 32 ? day : day - 31} ${day < 32 ? 'Oct' : 'Nov'} 2026`;
      dueDateObj = new Date(`2026-11-02T23:59:59`);
    } else if (status === 'Not Started') {
      const day = 2 + (i % 10);
      dueDateStr = `0${day} Nov 2026`;
      dueDateObj = new Date(`2026-11-${day < 10 ? '0' + day : day}T23:59:59`);
    }

    const emailName = std.name.toLowerCase().replace(/\s+/g, '.');

    tasks.push({
      order,
      title: `${tpl.title} #${order}`,
      subtitle: tpl.subtitle,
      type: tpl.type,
      course,
      batch: `${course.split(' ')[0].toUpperCase()}-OCT-2026`,
      assignedTo: {
        name: std.name,
        email: `${emailName}@gmail.com`,
        avatarInitials: std.initials,
        avatarColor: std.color
      },
      dueDate: dueDateStr,
      dueDateRaw: dueDateObj,
      status,
      submissionsCount,
      submissionsTotal: 1,
      points: tpl.points,
      priority,
      description: `${tpl.subtitle}. Ensure comprehensive code/documentation is attached conforming to Edurup grading rubrics.`,
      attachments: [
        { name: `spec_doc_${order}.pdf`, size: '820 KB', type: 'pdf', url: '#' }
      ],
      submission: status === 'Completed' ? {
        fileName: `${emailName}_submission.zip`,
        fileSize: '2.1 MB',
        submittedAt: `${dueDateStr}, 03:45 PM`,
        fileUrl: '#'
      } : null,
      feedback: status === 'Completed' ? {
        mentorName: 'Priya Verma',
        mentorInitials: 'PV',
        date: dueDateStr,
        score: `${tpl.points} / ${tpl.points}`,
        comment: 'Comprehensive implementation matching all project requirements.'
      } : null
    });
  }

  return tasks;
}

async function seedTasks() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is missing in .env');
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000
    });
    console.log('Connected successfully to MongoDB Atlas.');

    console.log('Clearing existing tasks...');
    await Task.deleteMany({});

    const allTasks = generateRemainingTasks();
    console.log(`Inserting ${allTasks.length} tasks...`);
    await Task.insertMany(allTasks);

    const total = await Task.countDocuments();
    const completed = await Task.countDocuments({ status: 'Completed' });
    const inProgress = await Task.countDocuments({ status: 'In Progress' });
    const overdue = await Task.countDocuments({ status: 'Overdue' });
    const notStarted = await Task.countDocuments({ status: 'Not Started' });

    console.log('=== SEED VERIFICATION ===');
    console.log(`Total Tasks: ${total} (Target: 128)`);
    console.log(`Completed: ${completed} (${Math.round((completed/total)*100)}%) (Target: 68 - 53%)`);
    console.log(`In Progress: ${inProgress} (${Math.round((inProgress/total)*100)}%) (Target: 32 - 25%)`);
    console.log(`Overdue: ${overdue} (${Math.round((overdue/total)*100)}%) (Target: 18 - 14%)`);
    console.log(`Not Started: ${notStarted} (${Math.round((notStarted/total)*100)}%) (Target: 10 - 8%)`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding Tasks Error:', err);
    process.exit(1);
  }
}

seedTasks();
