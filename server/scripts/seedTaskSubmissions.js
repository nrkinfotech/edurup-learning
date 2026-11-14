const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const dns = require('dns');

// Atlas SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const TaskSubmission = require('../models/TaskSubmission');

const baseSubmissions = [
  // 1. Data Cleaning Assignment (Reviewed, 9/10)
  {
    order: 1,
    taskTitle: 'Data Cleaning Assignment',
    taskSubtitle: 'Clean and preprocess dataset',
    student: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@gmail.com',
      avatarInitials: 'RS',
      avatarColor: '#2563EB'
    },
    course: 'Data Analytics',
    submittedOn: '25 Oct 2026, 04:30 PM',
    submittedOnRaw: new Date('2026-10-25T16:30:00'),
    dueDate: '20 Oct 2026',
    status: 'Reviewed',
    marks: '9 / 10',
    score: 9,
    maxScore: 10,
    description: 'Clean and preprocess the provided dataset. Handle missing values, outliers and prepare final dataset for analysis.',
    files: [
      { name: 'data_cleaning.ipynb', size: '3.2 MB', type: 'notebook', url: '#' },
      { name: 'cleaned_dataset.csv', size: '1.8 MB', type: 'csv', url: '#' },
      { name: 'report.pdf', size: '520 KB', type: 'pdf', url: '#' }
    ],
    codePreview: {
      fileName: 'data_cleaning.ipynb',
      language: 'python',
      code: `import pandas as pd\n\n# load dataset\ndf = pd.read_csv('sales_data.csv')\n\n# Check missing values\ndf.isnull().sum()`
    },
    feedback: {
      reviewerName: 'Admin',
      reviewerInitials: 'AD',
      date: '25 Oct 2026, 06:10 PM',
      score: '9 / 10',
      comment: 'Good work! Data is cleaned properly. Consider handling outliers using IQR method.'
    }
  },
  // 2. EDA Project (Pending, -)
  {
    order: 2,
    taskTitle: 'EDA Project',
    taskSubtitle: 'Exploratory data analysis',
    student: {
      name: 'Priya Nair',
      email: 'priya.nair@gmail.com',
      avatarInitials: 'PN',
      avatarColor: '#EA580C'
    },
    course: 'Data Science',
    submittedOn: '24 Oct 2026, 11:20 AM',
    submittedOnRaw: new Date('2026-10-24T11:20:00'),
    dueDate: '22 Oct 2026',
    status: 'Pending',
    marks: '-',
    score: null,
    maxScore: 20,
    description: 'Perform exploratory data analysis on the customer churn dataset. Generate statistical summaries and correlation heatmaps.',
    files: [
      { name: 'eda_churn.ipynb', size: '4.5 MB', type: 'notebook', url: '#' },
      { name: 'churn_insights.pdf', size: '1.1 MB', type: 'pdf', url: '#' }
    ],
    codePreview: {
      fileName: 'eda_churn.ipynb',
      language: 'python',
      code: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Correlation heatmap\nplt.figure(figsize=(10, 6))\nsns.heatmap(df.corr(), annot=True, cmap='coolwarm')`
    },
    feedback: null
  },
  // 3. SQL Queries Assignment (Needs Revision, 6/10)
  {
    order: 3,
    taskTitle: 'SQL Queries Assignment',
    taskSubtitle: 'Solve 20 SQL queries',
    student: {
      name: 'Amit Kumar',
      email: 'amit.kumar@gmail.com',
      avatarInitials: 'AK',
      avatarColor: '#16A34A'
    },
    course: 'Data Analytics',
    submittedOn: '23 Oct 2026, 06:15 PM',
    submittedOnRaw: new Date('2026-10-23T18:15:00'),
    dueDate: '20 Oct 2026',
    status: 'Needs Revision',
    marks: '6 / 10',
    score: 6,
    maxScore: 10,
    description: 'Execute complex multi-table joins, subqueries, and window functions on an eCommerce database.',
    files: [
      { name: 'queries.sql', size: '120 KB', type: 'sql', url: '#' },
      { name: 'results_table.xlsx', size: '780 KB', type: 'excel', url: '#' }
    ],
    codePreview: {
      fileName: 'queries.sql',
      language: 'sql',
      code: `SELECT customer_id, SUM(order_total) as total_spent,\n       RANK() OVER (ORDER BY SUM(order_total) DESC) as spending_rank\nFROM orders\nGROUP BY customer_id;`
    },
    feedback: {
      reviewerName: 'Admin',
      reviewerInitials: 'AD',
      date: '24 Oct 2026, 10:00 AM',
      score: '6 / 10',
      comment: 'Query 14 and 18 failed on subquery performance. Please optimize joins and re-submit.'
    }
  },
  // 4. Marketing Campaign Plan (Reviewed, 18/20)
  {
    order: 4,
    taskTitle: 'Marketing Campaign Plan',
    taskSubtitle: 'Create a digital marketing plan',
    student: {
      name: 'Sneha Reddy',
      email: 'sneha.reddy@gmail.com',
      avatarInitials: 'SR',
      avatarColor: '#9333EA'
    },
    course: 'Digital Marketing',
    submittedOn: '22 Oct 2026, 01:10 PM',
    submittedOnRaw: new Date('2026-10-22T13:10:00'),
    dueDate: '20 Oct 2026',
    status: 'Reviewed',
    marks: '18 / 20',
    score: 18,
    maxScore: 20,
    description: 'Formulate an end-to-end multi-channel marketing campaign strategy with budget allocation.',
    files: [
      { name: 'campaign_pitch.pdf', size: '2.4 MB', type: 'pdf', url: '#' },
      { name: 'media_budget.xlsx', size: '340 KB', type: 'excel', url: '#' }
    ],
    codePreview: null,
    feedback: {
      reviewerName: 'Admin',
      reviewerInitials: 'AD',
      date: '23 Oct 2026, 02:45 PM',
      score: '18 / 20',
      comment: 'Exceptional buyer persona definitions and ROI projections.'
    }
  },
  // 5. React Component Task (Pending, -)
  {
    order: 5,
    taskTitle: 'React Component Task',
    taskSubtitle: 'Build a reusable component',
    student: {
      name: 'Karthik V',
      email: 'karthikv@gmail.com',
      avatarInitials: 'KV',
      avatarColor: '#D97706'
    },
    course: 'Full Stack',
    submittedOn: '21 Oct 2026, 03:45 PM',
    submittedOnRaw: new Date('2026-10-21T15:45:00'),
    dueDate: '19 Oct 2026',
    status: 'Pending',
    marks: '-',
    score: null,
    maxScore: 10,
    description: 'Build an accessible, responsive data table component in React with sorting and pagination props.',
    files: [
      { name: 'DataTable.tsx', size: '14 KB', type: 'code', url: '#' },
      { name: 'demo.gif', size: '1.6 MB', type: 'image', url: '#' }
    ],
    codePreview: {
      fileName: 'DataTable.tsx',
      language: 'typescript',
      code: `export const DataTable: React.FC<Props> = ({ data, columns }) => {\n  const [sortKey, setSortKey] = useState<string>('');\n  return <table>...</table>;\n};`
    },
    feedback: null
  },
  // 6. HR Policy Research (Reviewed, 8/10)
  {
    order: 6,
    taskTitle: 'HR Policy Research',
    taskSubtitle: 'Study and present HR policies',
    student: {
      name: 'Meera Joshi',
      email: 'meera.joshi@gmail.com',
      avatarInitials: 'MJ',
      avatarColor: '#E11D48'
    },
    course: 'HR Management',
    submittedOn: '20 Oct 2026, 02:30 PM',
    submittedOnRaw: new Date('2026-10-20T14:30:00'),
    dueDate: '18 Oct 2026',
    status: 'Reviewed',
    marks: '8 / 10',
    score: 8,
    maxScore: 10,
    description: 'Study contemporary remote-work HR policies and retention metrics in tech enterprises.',
    files: [
      { name: 'hr_remote_policy.pdf', size: '1.4 MB', type: 'pdf', url: '#' }
    ],
    feedback: {
      reviewerName: 'Admin',
      reviewerInitials: 'AD',
      date: '21 Oct 2026, 11:15 AM',
      score: '8 / 10',
      comment: 'Good presentation of attrition drivers and compensation benchmarking.'
    }
  },
  // 7. Machine Learning Model (Needs Revision, 12/20)
  {
    order: 7,
    taskTitle: 'Machine Learning Model',
    taskSubtitle: 'Build a prediction model',
    student: {
      name: 'Aditya Patel',
      email: 'aditya.patel@gmail.com',
      avatarInitials: 'AP',
      avatarColor: '#7C3AED'
    },
    course: 'AI & ML',
    submittedOn: '18 Oct 2026, 11:50 AM',
    submittedOnRaw: new Date('2026-10-18T11:50:00'),
    dueDate: '16 Oct 2026',
    status: 'Needs Revision',
    marks: '12 / 20',
    score: 12,
    maxScore: 20,
    description: 'Train and tune Random Forest and XGBoost regression models to predict housing prices.',
    files: [
      { name: 'house_price_model.ipynb', size: '2.8 MB', type: 'notebook', url: '#' }
    ],
    codePreview: {
      fileName: 'house_price_model.ipynb',
      language: 'python',
      code: `from xgboost import XGBRegressor\n\nmodel = XGBRegressor(n_estimators=100, learning_rate=0.05)\nmodel.fit(X_train, y_train)`
    },
    feedback: {
      reviewerName: 'Admin',
      reviewerInitials: 'AD',
      date: '19 Oct 2026, 04:30 PM',
      score: '12 / 20',
      comment: 'Model suffers from data leakage due to target variable in feature set. Please fix train-test split.'
    }
  },
  // 8. Sales Pitch Presentation (Reviewed, 19/20)
  {
    order: 8,
    taskTitle: 'Sales Pitch Presentation',
    taskSubtitle: 'Create a sales pitch deck',
    student: {
      name: 'Divya Singh',
      email: 'divya.singh@gmail.com',
      avatarInitials: 'DS',
      avatarColor: '#0284C7'
    },
    course: 'Sales & Marketing',
    submittedOn: '17 Oct 2026, 04:20 PM',
    submittedOnRaw: new Date('2026-10-17T16:20:00'),
    dueDate: '15 Oct 2026',
    status: 'Reviewed',
    marks: '19 / 20',
    score: 19,
    maxScore: 20,
    description: 'Develop a 10-slide enterprise SaaS sales pitch deck addressing customer pain points.',
    files: [
      { name: 'enterprise_pitch.pptx', size: '4.2 MB', type: 'presentation', url: '#' }
    ],
    feedback: {
      reviewerName: 'Admin',
      reviewerInitials: 'AD',
      date: '18 Oct 2026, 05:00 PM',
      score: '19 / 20',
      comment: 'Compelling narrative structure and ROI breakdown.'
    }
  },
  // 9. Business Analysis Report (Pending, -)
  {
    order: 9,
    taskTitle: 'Business Analysis Report',
    taskSubtitle: 'Analyze business case',
    student: {
      name: 'Manoj Gupta',
      email: 'manoj.gupta@gmail.com',
      avatarInitials: 'MG',
      avatarColor: '#059669'
    },
    course: 'Business Management',
    submittedOn: '16 Oct 2026, 10:15 AM',
    submittedOnRaw: new Date('2026-10-16T10:15:00'),
    dueDate: '14 Oct 2026',
    status: 'Pending',
    marks: '-',
    score: null,
    maxScore: 20,
    description: 'Conduct a thorough SWOT and financial break-even analysis for e-commerce expansion.',
    files: [
      { name: 'business_expansion_report.pdf', size: '2.1 MB', type: 'pdf', url: '#' }
    ],
    feedback: null
  },
  // 10. Cloud Setup Task (Not Submitted, -)
  {
    order: 10,
    taskTitle: 'Cloud Setup Task',
    taskSubtitle: 'Setup AWS environment',
    student: {
      name: 'Ishita Verma',
      email: 'ishita.verma@gmail.com',
      avatarInitials: 'IV',
      avatarColor: '#DC2626'
    },
    course: 'Cloud (AWS)',
    submittedOn: '15 Oct 2026, 05:40 PM',
    submittedOnRaw: new Date('2026-10-15T17:40:00'),
    dueDate: '15 Oct 2026',
    status: 'Not Submitted',
    marks: '-',
    score: null,
    maxScore: 10,
    description: 'Configure an AWS VPC with public and private subnets, NAT gateway, and deploy an EC2 instance.',
    files: [],
    feedback: null
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
  { name: 'Swati Menon', initials: 'SM', color: '#E11D48' }
];

const taskTitles = [
  { title: 'Power BI KPI Dashboard', subtitle: 'Design executive visual summaries', course: 'Data Analytics', max: 10 },
  { title: 'Customer Churn Classification', subtitle: 'Evaluate confusion matrix & ROC', course: 'Data Science', max: 20 },
  { title: 'Google Analytics 4 Tracking', subtitle: 'Configure GA4 events & tags', course: 'Digital Marketing', max: 10 },
  { title: 'Node.js Express API Auth', subtitle: 'JWT authorization & rate limiting', course: 'Full Stack', max: 15 },
  { title: 'Talent Sourcing Strategy', subtitle: 'Recruitment pipeline planning', course: 'HR Management', max: 10 },
  { title: 'Docker Microservices Deploy', subtitle: 'Containerize multi-tier app', course: 'Cloud (AWS)', max: 15 },
  { title: 'CNN Image Classifier', subtitle: 'PyTorch deep learning model', course: 'AI & ML', max: 20 },
  { title: 'Competitor SEO Audit', subtitle: 'Keyword gaps & backlink profile', course: 'Digital Marketing', max: 10 }
];

function generateRemainingSubmissions() {
  const submissions = [...baseSubmissions];

  // Remaining needed:
  // Reviewed: 48 (total 52)
  // Pending: 15 (total 18)
  // Needs Revision: 6 (total 8)
  // Not Submitted: 5 (total 6)
  // In Progress: 2 (total 2, makes total 86)
  // Total to generate: 48 + 15 + 6 + 5 + 2 = 76 submissions

  const needed = [
    ...Array(48).fill('Reviewed'),
    ...Array(15).fill('Pending'),
    ...Array(6).fill('Needs Revision'),
    ...Array(5).fill('Not Submitted'),
    ...Array(2).fill('In Progress')
  ];

  // Deterministic shuffle
  let seed = 77;
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
    const std = students[i % students.length];
    const tpl = taskTitles[i % taskTitles.length];

    const dayNum = 10 + (i % 15);
    const day = String(dayNum).padStart(2, '0');
    const hourNum = 10 + (i % 8);
    const hour = String(hourNum).padStart(2, '0');
    const minuteNum = (i * 7) % 60;
    const minute = String(minuteNum).padStart(2, '0');
    const ampm = hourNum < 12 ? 'AM' : 'PM';
    const dateStr = `${day} Oct 2026, ${hour}:${minute} ${ampm}`;
    const dateObj = new Date(`2026-10-${day}T${hour}:${minute}:00Z`);

    let marks = '-';
    let score = null;
    let feedback = null;
    let files = [];

    if (status === 'Reviewed') {
      score = tpl.max - (i % 3);
      marks = `${score} / ${tpl.max}`;
      files = [
        { name: `${tpl.title.toLowerCase().replace(/\s+/g, '_')}_solution.zip`, size: '2.4 MB', type: 'archive', url: '#' },
        { name: 'report.pdf', size: '480 KB', type: 'pdf', url: '#' }
      ];
      feedback = {
        reviewerName: 'Admin',
        reviewerInitials: 'AD',
        date: dateStr,
        score: marks,
        comment: 'Comprehensive implementation. All deliverables met according to rubric.'
      };
    } else if (status === 'Needs Revision') {
      score = Math.floor(tpl.max * 0.6);
      marks = `${score} / ${tpl.max}`;
      files = [
        { name: 'draft_submission.pdf', size: '1.2 MB', type: 'pdf', url: '#' }
      ];
      feedback = {
        reviewerName: 'Admin',
        reviewerInitials: 'AD',
        date: dateStr,
        score: marks,
        comment: 'Partial submission. Please complete the remaining questions and re-upload.'
      };
    } else if (status === 'Pending') {
      files = [
        { name: 'solution_file.zip', size: '3.1 MB', type: 'archive', url: '#' }
      ];
    } else if (status === 'In Progress') {
      files = [
        { name: 'wip_notes.txt', size: '12 KB', type: 'text', url: '#' }
      ];
    }

    submissions.push({
      order,
      taskTitle: tpl.title,
      taskSubtitle: tpl.subtitle,
      student: {
        name: std.name,
        email: `${std.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
        avatarInitials: std.initials,
        avatarColor: std.color
      },
      course: tpl.course,
      submittedOn: dateStr,
      submittedOnRaw: dateObj,
      dueDate: `${day - 2} Oct 2026`,
      status,
      marks,
      score,
      maxScore: tpl.max,
      description: `${tpl.subtitle}. Complete all requirements according to Edurup standards.`,
      files,
      codePreview: {
        fileName: 'solution_snippet.py',
        language: 'python',
        code: `# Solution script for ${tpl.title}\nprint("Evaluation in progress")`
      },
      feedback
    });
  }

  return submissions;
}

async function seedTaskSubmissions() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGO_URI is missing');

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to Atlas.');

    console.log('Clearing old task submissions...');
    await TaskSubmission.deleteMany({});

    const allSubmissions = generateRemainingSubmissions();
    console.log(`Inserting ${allSubmissions.length} task submissions...`);
    await TaskSubmission.insertMany(allSubmissions);

    const total = await TaskSubmission.countDocuments();
    const reviewed = await TaskSubmission.countDocuments({ status: 'Reviewed' });
    const pending = await TaskSubmission.countDocuments({ status: 'Pending' });
    const needsRev = await TaskSubmission.countDocuments({ status: 'Needs Revision' });
    const notSubmitted = await TaskSubmission.countDocuments({ status: 'Not Submitted' });

    console.log('=== VERIFICATION SUMMARY ===');
    console.log(`Total Submissions: ${total} (Target: 86)`);
    console.log(`Reviewed: ${reviewed} (${Math.round((reviewed/total)*100)}%) (Target: 52 - 60%)`);
    console.log(`Pending: ${pending} (${Math.round((pending/total)*100)}%) (Target: 18 - 21%)`);
    console.log(`Needs Revision: ${needsRev} (${Math.round((needsRev/total)*100)}%) (Target: 8 - 9%)`);
    console.log(`Not Submitted: ${notSubmitted} (${Math.round((notSubmitted/total)*100)}%) (Target: 6 - 7%)`);

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedTaskSubmissions();
