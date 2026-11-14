const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const ProjectSubmission = require('../models/ProjectSubmission');

// Base 5 rows from screenshot under October 2026 Batch
const baseOctoberRows = [
  // 1. Rahul Sharma (Selected row in screenshot)
  {
    order: 1,
    projectTitle: 'EDA Project - Retail Sales',
    projectSubtitle: 'Exploratory data analysis on retail transactions dataset',
    projectType: 'Course Project',
    batch: 'October 2026',
    course: 'Data Analytics',
    student: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@gmail.com',
      avatarInitials: 'RS',
      avatarColor: '#2563EB'
    },
    submittedOn: '25 Oct 2026, 04:30 PM',
    submittedOnRaw: new Date('2026-10-25T11:00:00Z'),
    dueDate: '25 Oct 2026',
    status: 'Reviewed',
    marks: '18 / 20',
    score: 18,
    maxScore: 20,
    description: 'Perform retail store sales analysis, discover seasonal purchase trends, calculate average order values, and visualize sales channels with clean visualizations.',
    files: [
      { name: 'eda_analysis.ipynb', size: '2.4 MB', type: 'notebook', url: '#' },
      { name: 'sales_data.csv', size: '1.8 MB', type: 'csv', url: '#' },
      { name: 'report.pdf', size: '520 KB', type: 'pdf', url: '#' }
    ],
    codePreview: {
      fileName: 'eda_analysis.ipynb',
      language: 'python',
      code: `import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("sales_data.csv")\ndf.head()`
    },
    feedback: {
      reviewerName: 'Admin',
      reviewerInitials: 'AD',
      date: '25 Oct 2026, 06:10 PM',
      score: '18 / 20',
      comment: 'Good analysis and visualizations. Please improve conclusions and add business recommendations.'
    },
    history: [
      { action: 'Reviewed', by: 'Admin', date: '25 Oct 2026, 06:10 PM', notes: 'Awarded 18/20 with feedback comments.' },
      { action: 'Submitted', by: 'Rahul Sharma', date: '25 Oct 2026, 04:30 PM', notes: 'Uploaded 3 deliverables.' }
    ]
  },
  // 2. Priya Nair
  {
    order: 2,
    projectTitle: 'Business Analysis Report',
    projectSubtitle: 'Comprehensive financial and operations report',
    projectType: 'Course Project',
    batch: 'October 2026',
    course: 'Data Analytics',
    student: {
      name: 'Priya Nair',
      email: 'priya.nair@gmail.com',
      avatarInitials: 'PN',
      avatarColor: '#EA580C'
    },
    submittedOn: '24 Oct 2026, 11:15 AM',
    submittedOnRaw: new Date('2026-10-24T05:45:00Z'),
    dueDate: '25 Oct 2026',
    status: 'Pending',
    marks: '-',
    score: null,
    maxScore: 20,
    description: 'Evaluate business key performance indicators, cost drivers, and operational bottle-necks with financial summaries.',
    files: [
      { name: 'business_analysis_report.pdf', size: '2.6 MB', type: 'pdf', url: '#' },
      { name: 'financial_model.xlsx', size: '1.4 MB', type: 'excel', url: '#' }
    ],
    codePreview: {
      fileName: 'analysis_pipeline.py',
      language: 'python',
      code: `import numpy as np\nimport pandas as pd\n\ndef calculate_roi(costs, revenue):\n    return ((revenue - costs) / costs) * 100`
    },
    feedback: null,
    history: [
      { action: 'Submitted', by: 'Priya Nair', date: '24 Oct 2026, 11:15 AM', notes: 'Initial submission uploaded.' }
    ]
  },
  // 3. Amit Kumar
  {
    order: 3,
    projectTitle: 'Dashboard using Power BI',
    projectSubtitle: 'Interactive multi-page Power BI executive dashboard',
    projectType: 'Course Project',
    batch: 'October 2026',
    course: 'Data Analytics',
    student: {
      name: 'Amit Kumar',
      email: 'amit.kumar@gmail.com',
      avatarInitials: 'AK',
      avatarColor: '#0D9488'
    },
    submittedOn: '24 Oct 2026, 09:20 PM',
    submittedOnRaw: new Date('2026-10-24T15:50:00Z'),
    dueDate: '25 Oct 2026',
    status: 'Reviewed',
    marks: '17 / 20',
    score: 17,
    maxScore: 20,
    description: 'Design interactive drill-down reports, DAX calculated measures, and slicers for enterprise marketing analytics.',
    files: [
      { name: 'marketing_kpi.pbix', size: '6.4 MB', type: 'powerbi', url: '#' },
      { name: 'dashboard_walkthrough.mp4', size: '14.2 MB', type: 'video', url: '#' },
      { name: 'readme.pdf', size: '420 KB', type: 'pdf', url: '#' }
    ],
    codePreview: {
      fileName: 'dax_measures.txt',
      language: 'dax',
      code: `Total Revenue = SUM(Sales[Amount])\nYoY Growth % = DIVIDE([Total Revenue] - [Last Year Revenue], [Last Year Revenue])`
    },
    feedback: {
      reviewerName: 'Admin',
      reviewerInitials: 'AD',
      date: '25 Oct 2026, 10:30 AM',
      score: '17 / 20',
      comment: 'Impressive DAX measures and clean dashboard palette. Navigation between pages is intuitive.'
    },
    history: [
      { action: 'Reviewed', by: 'Admin', date: '25 Oct 2026, 10:30 AM', notes: 'Graded 17/20.' },
      { action: 'Submitted', by: 'Amit Kumar', date: '24 Oct 2026, 09:20 PM', notes: 'Project uploaded.' }
    ]
  },
  // 4. Sneha Reddy
  {
    order: 4,
    projectTitle: 'Customer Segmentation',
    projectSubtitle: 'K-Means clustering and RFM analysis',
    projectType: 'Course Project',
    batch: 'October 2026',
    course: 'Data Analytics',
    student: {
      name: 'Sneha Reddy',
      email: 'sneha.reddy@gmail.com',
      avatarInitials: 'SR',
      avatarColor: '#8B5CF6'
    },
    submittedOn: '23 Oct 2026, 02:10 PM',
    submittedOnRaw: new Date('2026-10-23T08:40:00Z'),
    dueDate: '25 Oct 2026',
    status: 'Needs Revision',
    marks: '12 / 20',
    score: 12,
    maxScore: 20,
    description: 'Perform RFM segmentation and apply K-Means clustering algorithm on customer purchase records.',
    files: [
      { name: 'rfm_clustering.ipynb', size: '3.1 MB', type: 'notebook', url: '#' },
      { name: 'segmented_customers.csv', size: '1.2 MB', type: 'csv', url: '#' }
    ],
    codePreview: {
      fileName: 'rfm_clustering.ipynb',
      language: 'python',
      code: `from sklearn.cluster import KMeans\n\nkmeans = KMeans(n_clusters=4, random_state=42)\nrfm_df['Cluster'] = kmeans.fit_predict(scaled_features)`
    },
    feedback: {
      reviewerName: 'Admin',
      reviewerInitials: 'AD',
      date: '24 Oct 2026, 04:00 PM',
      score: '12 / 20',
      comment: 'Clustering elbow curve plot is missing justification for choosing k=4. Please add Silhouette score and resubmit.'
    },
    history: [
      { action: 'Revision Requested', by: 'Admin', date: '24 Oct 2026, 04:00 PM', notes: 'Silhouette analysis required.' },
      { action: 'Submitted', by: 'Sneha Reddy', date: '23 Oct 2026, 02:10 PM', notes: 'Draft submission.' }
    ]
  },
  // 5. Karthik V
  {
    order: 5,
    projectTitle: 'SQL End to End Project',
    projectSubtitle: 'Relational database schema, window functions & ETL',
    projectType: 'Course Project',
    batch: 'October 2026',
    course: 'Data Analytics',
    student: {
      name: 'Karthik V',
      email: 'karthik.v@gmail.com',
      avatarInitials: 'KV',
      avatarColor: '#D97706'
    },
    submittedOn: '22 Oct 2026, 05:45 PM',
    submittedOnRaw: new Date('2026-10-22T12:15:00Z'),
    dueDate: '25 Oct 2026',
    status: 'Reviewed',
    marks: '19 / 20',
    score: 19,
    maxScore: 20,
    description: 'Complex SQL queries using CTEs, window functions (ROW_NUMBER, DENSE_RANK), and stored procedures.',
    files: [
      { name: 'schema_and_queries.sql', size: '180 KB', type: 'sql', url: '#' },
      { name: 'query_execution_plan.pdf', size: '890 KB', type: 'pdf', url: '#' }
    ],
    codePreview: {
      fileName: 'schema_and_queries.sql',
      language: 'sql',
      code: `WITH MonthlyRanking AS (\n  SELECT customer_id, SUM(order_amount) AS total_spent,\n         DENSE_RANK() OVER (ORDER BY SUM(order_amount) DESC) as spending_rank\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT * FROM MonthlyRanking WHERE spending_rank <= 10;`
    },
    feedback: {
      reviewerName: 'Admin',
      reviewerInitials: 'AD',
      date: '23 Oct 2026, 01:20 PM',
      score: '19 / 20',
      comment: 'Excellent query optimization with indexes and well-structured CTEs. High quality work.'
    },
    history: [
      { action: 'Reviewed', by: 'Admin', date: '23 Oct 2026, 01:20 PM', notes: 'Awarded 19/20.' },
      { action: 'Submitted', by: 'Karthik V', date: '22 Oct 2026, 05:45 PM', notes: 'Uploaded SQL script.' }
    ]
  }
];

// Student Pool
const studentsPool = [
  { name: 'Meera Joshi', initials: 'MJ', color: '#E11D48' },
  { name: 'Aditya Patel', initials: 'AP', color: '#7C3AED' },
  { name: 'Rohan Deshmukh', initials: 'RD', color: '#2563EB' },
  { name: 'Ananya Sharma', initials: 'AS', color: '#059669' },
  { name: 'Manoj Gupta', initials: 'MG', color: '#DC2626' },
  { name: 'Ishita Verma', initials: 'IV', color: '#D97706' },
  { name: 'Siddharth Roy', initials: 'SR', color: '#0284C7' },
  { name: 'Neha Kulkarni', initials: 'NK', color: '#9333EA' },
  { name: 'Tanmay Kapoor', initials: 'TK', color: '#EA580C' },
  { name: 'Pooja Hegde', initials: 'PH', color: '#16A34A' },
  { name: 'Akash Banerjee', initials: 'AB', color: '#2563EB' },
  { name: 'Shreya Sen', initials: 'SS', color: '#7C3AED' },
  { name: 'Varun Nair', initials: 'VN', color: '#059669' },
  { name: 'Deepika Rao', initials: 'DR', color: '#DC2626' },
  { name: 'Gaurav Bhat', initials: 'GB', color: '#D97706' },
  { name: 'Aishwarya Patil', initials: 'AP', color: '#0284C7' }
];

const projectTitlesPool = [
  { title: 'E-commerce Conversion Funnel', subtitle: 'Funnel drop-off and cart abandonment analysis', max: 20 },
  { title: 'Supply Chain Inventory Forecast', subtitle: 'Time series forecasting on stock levels', max: 20 },
  { title: 'HR Attrition Predictive Modeling', subtitle: 'Logistic regression on employee survey data', max: 20 },
  { title: 'Healthcare Readmission Analysis', subtitle: 'Clinical factors correlating with 30-day readmissions', max: 20 },
  { title: 'Bank Loan Risk Classification', subtitle: 'Credit risk scoring with decision trees', max: 20 },
  { title: 'Social Media Sentiment Dashboard', subtitle: 'Twitter & Reddit brand sentiment tracking', max: 20 },
  { title: 'Real Estate Price Valuation', subtitle: 'Multi-linear regression on property features', max: 20 },
  { title: 'Food Delivery Route Optimization', subtitle: 'GIS geospatial clustering of delivery routes', max: 20 }
];

function generateAllSubmissions() {
  const all = [...baseOctoberRows];

  // Target overall:
  // Total: 152
  // Reviewed: 98 (Base has 3: Rahul 18, Amit 17, Karthik 19 -> Remaining needed: 95)
  // Pending: 28 (Base has 1: Priya -> Remaining needed: 27)
  // Needs Revision: 16 (Base has 1: Sneha -> Remaining needed: 15)
  // Not Submitted: 10 (Base has 0 -> Remaining needed: 10)
  // Total remaining = 95 + 27 + 15 + 10 = 147 submissions. Base 5 + 147 = 152!

  // Batch quotas:
  // October 2026 (32 students): base has 5 (3 Reviewed, 1 Pending, 1 Revision).
  // Oct needs 27 more: 25 Reviewed (total 28), 1 Pending (total 2), 1 Revision (total 2), 0 Not Submitted = 32 total!
  // September 2026 (28 students): 22 Reviewed, 4 Pending, 2 Revision, 0 Not Submitted = 28 total!
  // August 2026 (24 students): 20 Reviewed, 3 Pending, 1 Revision, 0 Not Submitted = 24 total!
  // July 2026 (18 students): 18 Reviewed, 0 Pending, 0 Revision, 0 Not Submitted = 18 total!
  // June 2026 (16 students): 10 Reviewed, 0 Pending, 0 Revision, 6 Not Submitted = 16 total!
  // Other batches / courses (34 students):
  // 3 Reviewed (total 28+22+20+18+10+3 = 101... wait, let's adjust so total Reviewed is 98):
  // Let's ensure exact sum:
  // Reviewed: Oct (28), Sep (22), Aug (20), Jul (18), Jun (10) -> sum = 98! Exactly 98!
  // Pending: Oct (2), Sep (4), Aug (3), Jul (0), Jun (0), Other (19) -> sum = 28! Exactly 28!
  // Needs Revision: Oct (2), Sep (2), Aug (1), Jul (0), Jun (0), Other (11) -> sum = 16! Exactly 16!
  // Not Submitted: Oct (0), Sep (0), Aug (0), Jul (0), Jun (6), Other (4) -> sum = 10! Exactly 10!
  // Total across all batches: 98 + 28 + 16 + 10 = 152!

  const batchConfigs = [
    // 1. October 2026: 27 remaining
    {
      batchName: 'October 2026',
      course: 'Data Analytics',
      dueDate: '25 Oct 2026',
      counts: { Reviewed: 25, Pending: 1, 'Needs Revision': 1, 'Not Submitted': 0 }
    },
    // 2. September 2026: 28 total
    {
      batchName: 'September 2026',
      course: 'Data Analytics',
      dueDate: '25 Sep 2026',
      counts: { Reviewed: 22, Pending: 4, 'Needs Revision': 2, 'Not Submitted': 0 }
    },
    // 3. August 2026: 24 total
    {
      batchName: 'August 2026',
      course: 'Data Analytics',
      dueDate: '25 Aug 2026',
      counts: { Reviewed: 20, Pending: 3, 'Needs Revision': 1, 'Not Submitted': 0 }
    },
    // 4. July 2026: 18 total
    {
      batchName: 'July 2026',
      course: 'Data Analytics',
      dueDate: '25 Jul 2026',
      counts: { Reviewed: 18, Pending: 0, 'Needs Revision': 0, 'Not Submitted': 0 }
    },
    // 5. June 2026: 16 total
    {
      batchName: 'June 2026',
      course: 'Data Analytics',
      dueDate: '25 Jun 2026',
      counts: { Reviewed: 10, Pending: 0, 'Needs Revision': 0, 'Not Submitted': 6 }
    },
    // 6. Other Batches (Data Science & Full Stack Capstones to reach 152): 34 total
    {
      batchName: 'May 2026',
      course: 'Data Science',
      dueDate: '25 May 2026',
      counts: { Reviewed: 0, Pending: 19, 'Needs Revision': 11, 'Not Submitted': 4 }
    }
  ];

  let orderIndex = 6;

  batchConfigs.forEach(cfg => {
    const list = [];
    Object.keys(cfg.counts).forEach(status => {
      const count = cfg.counts[status];
      for (let c = 0; c < count; c++) {
        list.push(status);
      }
    });

    list.forEach((status, idx) => {
      const student = studentsPool[(idx + orderIndex) % studentsPool.length];
      const proj = projectTitlesPool[(idx + orderIndex) % projectTitlesPool.length];
      const day = String(10 + (idx % 14)).padStart(2, '0');
      const hour = String(10 + (idx % 8)).padStart(2, '0');
      const minute = String((idx * 11) % 60).padStart(2, '0');
      const ampm = parseInt(hour, 10) >= 12 ? 'PM' : 'AM';
      const monthPrefix = cfg.batchName.slice(0, 3);
      const year = '2026';
      const submittedOn = status === 'Not Submitted' ? '-' : `${day} ${monthPrefix} ${year}, ${hour}:${minute} ${ampm}`;
      const submittedRaw = status === 'Not Submitted' ? null : new Date(`${year}-10-${day}T${hour}:${minute}:00Z`);

      let marks = '-';
      let score = null;
      let feedback = null;
      let files = [];

      if (status === 'Reviewed') {
        score = 16 + (idx % 5);
        marks = `${score} / 20`;
        files = [
          { name: `${proj.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_solution.zip`, size: '3.4 MB', type: 'archive', url: '#' },
          { name: 'project_report.pdf', size: '1.2 MB', type: 'pdf', url: '#' }
        ];
        feedback = {
          reviewerName: 'Admin',
          reviewerInitials: 'AD',
          date: submittedOn,
          score: marks,
          comment: 'Solid execution. Insights well-supported with exploratory tables and visual charts.'
        };
      } else if (status === 'Needs Revision') {
        score = 11 + (idx % 3);
        marks = `${score} / 20`;
        files = [
          { name: 'draft_submission.pdf', size: '1.1 MB', type: 'pdf', url: '#' }
        ];
        feedback = {
          reviewerName: 'Admin',
          reviewerInitials: 'AD',
          date: submittedOn,
          score: marks,
          comment: 'Please refine business implications section and clarify model assumptions.'
        };
      } else if (status === 'Pending') {
        files = [
          { name: 'project_deliverables.zip', size: '4.2 MB', type: 'archive', url: '#' }
        ];
      }

      all.push({
        order: orderIndex++,
        projectTitle: proj.title,
        projectSubtitle: proj.subtitle,
        projectType: 'Course Project',
        batch: cfg.batchName,
        course: cfg.course,
        student: {
          name: `${student.name} ${cfg.batchName.slice(0, 3)}`,
          email: `${student.name.toLowerCase().replace(/\s+/g, '.')}.${cfg.batchName.slice(0, 3).toLowerCase()}@gmail.com`,
          avatarInitials: student.initials,
          avatarColor: student.color
        },
        submittedOn,
        submittedOnRaw: submittedRaw || new Date(),
        dueDate: cfg.dueDate,
        status,
        marks,
        score,
        maxScore: 20,
        description: `${proj.subtitle}. Submit full code notebook, processed data tables, and executive summary report.`,
        files,
        codePreview: {
          fileName: 'solution_script.py',
          language: 'python',
          code: `# Analysis script for ${proj.title}\nimport pandas as pd\nimport numpy as np\n\nprint("Evaluating pipeline for ${cfg.batchName}")`
        },
        feedback,
        history: [
          { action: status, by: 'System', date: submittedOn, notes: `Status set to ${status}` }
        ]
      });
    });
  });

  return all;
}

async function seed() {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGO_URI is missing');

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected.');

    console.log('Clearing old project submissions...');
    await ProjectSubmission.deleteMany({});

    const data = generateAllSubmissions();
    console.log(`Inserting ${data.length} project submissions...`);
    await ProjectSubmission.insertMany(data);

    const total = await ProjectSubmission.countDocuments();
    const reviewed = await ProjectSubmission.countDocuments({ status: 'Reviewed' });
    const pending = await ProjectSubmission.countDocuments({ status: 'Pending' });
    const needsRev = await ProjectSubmission.countDocuments({ status: 'Needs Revision' });
    const notSub = await ProjectSubmission.countDocuments({ status: 'Not Submitted' });

    console.log('=== VERIFICATION SUMMARY ===');
    console.log(`Total: ${total} (Target: 152)`);
    console.log(`Reviewed: ${reviewed} (${Math.round((reviewed/total)*100)}%) (Target: 98 - 64%)`);
    console.log(`Pending: ${pending} (${Math.round((pending/total)*100)}%) (Target: 28 - 18%)`);
    console.log(`Needs Revision: ${needsRev} (${Math.round((needsRev/total)*100)}%) (Target: 16 - 11%)`);
    console.log(`Not Submitted: ${notSub} (${Math.round((notSub/total)*100)}%) (Target: 10 - 7%)`);

    // Verify October 2026 count
    const octTotal = await ProjectSubmission.countDocuments({ batch: 'October 2026' });
    const octReviewed = await ProjectSubmission.countDocuments({ batch: 'October 2026', status: 'Reviewed' });
    const octPending = await ProjectSubmission.countDocuments({ batch: 'October 2026', status: 'Pending' });
    const octNeedsRev = await ProjectSubmission.countDocuments({ batch: 'October 2026', status: 'Needs Revision' });
    const octNotSub = await ProjectSubmission.countDocuments({ batch: 'October 2026', status: 'Not Submitted' });

    console.log(`October Batch: Total=${octTotal} (28 Submitted/Reviewed, 2 Pending, 2 Revision, 0 Not Submitted) -> [Rev:${octReviewed}, Pend:${octPending}, Rev:${octNeedsRev}, NotSub:${octNotSub}]`);

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
