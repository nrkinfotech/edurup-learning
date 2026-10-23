const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const StudentRecord = require('../models/StudentRecord');

const SEED_STUDENTS = [
  {
    studentName: 'Rohit Sharma',
    email: 'rohit.sharma@gmail.com',
    phone: '+91 98765 43210',
    course: 'Data Analytics',
    batch: 'DA-Aug 2026',
    learningStatus: 'In Progress',
    internshipStatus: 'Selected',
    placementStatus: 'Not Placed',
    joinDate: 'Oct 01, 2026',
    city: 'Bengaluru',
    overallProgress: 85,
    modulesCompleted: 12,
    totalModules: 14,
    assessmentsCompleted: 8,
    totalAssessments: 10,
    projectsCompleted: 3,
    totalProjects: 4,
    classesAttended: 18,
    totalClasses: 20,
    progressStatus: 'On Track',
    modules: [
      { name: 'Module 1: Introduction to Data Analytics', progress: 100, completed: true },
      { name: 'Module 2: Data Collection & Cleaning', progress: 100, completed: true },
      { name: 'Module 3: Data Analysis with Python', progress: 100, completed: true },
      { name: 'Module 4: Data Visualization', progress: 70, completed: false },
      { name: 'Module 5: SQL for Data Analytics', progress: 60, completed: false },
      { name: 'Module 6: Real Time Projects', progress: 0, completed: false }
    ],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Priya Nair',
    email: 'priya.nair@gmail.com',
    phone: '+91 98765 43211',
    course: 'Digital Marketing',
    batch: 'DM-Aug 2026',
    learningStatus: 'Completed',
    internshipStatus: 'On Internship',
    placementStatus: 'Placed',
    joinDate: 'Sep 15, 2026',
    city: 'Mumbai',
    overallProgress: 100,
    modulesCompleted: 14,
    totalModules: 14,
    assessmentsCompleted: 10,
    totalAssessments: 10,
    projectsCompleted: 4,
    totalProjects: 4,
    classesAttended: 20,
    totalClasses: 20,
    progressStatus: 'Completed',
    modules: [
      { name: 'Module 1: Fundamentals of Digital Marketing', progress: 100, completed: true },
      { name: 'Module 2: Search Engine Optimization (SEO)', progress: 100, completed: true },
      { name: 'Module 3: Social Media & Meta Ads', progress: 100, completed: true },
      { name: 'Module 4: Performance Marketing & SEM', progress: 100, completed: true },
      { name: 'Module 5: Email & Content Marketing', progress: 100, completed: true },
      { name: 'Module 6: Capstone Brand Campaign', progress: 100, completed: true }
    ],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Karan Mehta',
    email: 'karan.mehta@gmail.com',
    phone: '+91 91234 56789',
    course: 'Full Stack',
    batch: 'FS-Sep 2026',
    learningStatus: 'In Progress',
    internshipStatus: 'Interview',
    placementStatus: 'Not Placed',
    joinDate: 'Oct 10, 2026',
    city: 'Delhi',
    overallProgress: 65,
    modulesCompleted: 9,
    totalModules: 14,
    assessmentsCompleted: 6,
    totalAssessments: 10,
    projectsCompleted: 2,
    totalProjects: 4,
    classesAttended: 15,
    totalClasses: 20,
    progressStatus: 'On Track',
    modules: [
      { name: 'Module 1: HTML5, CSS3 & Modern JavaScript', progress: 100, completed: true },
      { name: 'Module 2: React.js & State Management', progress: 100, completed: true },
      { name: 'Module 3: Node.js & Express Architecture', progress: 80, completed: false },
      { name: 'Module 4: MongoDB & Database Modeling', progress: 60, completed: false },
      { name: 'Module 5: RESTful APIs & Authentication', progress: 30, completed: false },
      { name: 'Module 6: Full Stack Deployment & DevOps', progress: 0, completed: false }
    ],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Sneha Reddy',
    email: 'sneha.reddy@gmail.com',
    phone: '+91 91234 56788',
    course: 'Data Science',
    batch: 'DS-Aug 2026',
    learningStatus: 'In Progress',
    internshipStatus: 'Selected',
    placementStatus: 'Not Placed',
    joinDate: 'Aug 20, 2026',
    city: 'Hyderabad',
    overallProgress: 45,
    modulesCompleted: 6,
    totalModules: 14,
    assessmentsCompleted: 4,
    totalAssessments: 10,
    projectsCompleted: 2,
    totalProjects: 4,
    classesAttended: 12,
    totalClasses: 20,
    progressStatus: 'In Progress',
    modules: [
      { name: 'Module 1: Python for Data Science', progress: 100, completed: true },
      { name: 'Module 2: Probability & Applied Statistics', progress: 100, completed: true },
      { name: 'Module 3: Data Wrangling & Pandas', progress: 70, completed: false },
      { name: 'Module 4: Supervised Machine Learning', progress: 40, completed: false },
      { name: 'Module 5: Unsupervised Machine Learning', progress: 0, completed: false },
      { name: 'Module 6: Capstone Predictive Modeling', progress: 0, completed: false }
    ],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Aman Verma',
    email: 'aman.verma@gmail.com',
    phone: '+91 99887 66554',
    course: 'AI / ML',
    batch: 'AI-Sep 2026',
    learningStatus: 'In Progress',
    internshipStatus: 'Applied',
    placementStatus: 'Not Placed',
    joinDate: 'Oct 12, 2026',
    city: 'Pune',
    overallProgress: 20,
    modulesCompleted: 3,
    totalModules: 14,
    assessmentsCompleted: 2,
    totalAssessments: 10,
    projectsCompleted: 1,
    totalProjects: 4,
    classesAttended: 6,
    totalClasses: 20,
    progressStatus: 'At Risk',
    modules: [
      { name: 'Module 1: Foundations of Artificial Intelligence', progress: 100, completed: true },
      { name: 'Module 2: Advanced Mathematics & Linear Algebra', progress: 40, completed: false },
      { name: 'Module 3: Neural Networks & Deep Learning', progress: 0, completed: false },
      { name: 'Module 4: Computer Vision with OpenCV', progress: 0, completed: false },
      { name: 'Module 5: Natural Language Processing (NLP)', progress: 0, completed: false },
      { name: 'Module 6: Large Language Models & GenAI', progress: 0, completed: false }
    ],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Neha Gupta',
    email: 'neha.gupta@gmail.com',
    phone: '+91 99887 66553',
    course: 'HR Management',
    batch: 'HR-Aug 2026',
    learningStatus: 'In Progress',
    internshipStatus: 'On Internship',
    placementStatus: 'Placed',
    joinDate: 'Aug 18, 2026',
    city: 'Noida',
    overallProgress: 75,
    modulesCompleted: 11,
    totalModules: 14,
    assessmentsCompleted: 7,
    totalAssessments: 10,
    projectsCompleted: 3,
    totalProjects: 4,
    classesAttended: 16,
    totalClasses: 20,
    progressStatus: 'On Track',
    modules: [
      { name: 'Module 1: Strategic Human Resource Management', progress: 100, completed: true },
      { name: 'Module 2: Talent Acquisition & Recruitment Tech', progress: 100, completed: true },
      { name: 'Module 3: Performance Management & KPI Design', progress: 90, completed: false },
      { name: 'Module 4: HR Analytics & Workforce Planning', progress: 80, completed: false },
      { name: 'Module 5: Payroll & Statutory Compliance', progress: 50, completed: false },
      { name: 'Module 6: Employee Relations & Culture', progress: 0, completed: false }
    ],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Vikram Rao',
    email: 'vikram.rao@gmail.com',
    phone: '+91 98765 67890',
    course: 'Finance Analyst',
    batch: 'FA-Sep 2026',
    learningStatus: 'In Progress',
    internshipStatus: 'Not Applied',
    placementStatus: 'Not Placed',
    joinDate: 'Oct 05, 2026',
    city: 'Chennai',
    overallProgress: 50,
    modulesCompleted: 7,
    totalModules: 14,
    assessmentsCompleted: 5,
    totalAssessments: 10,
    projectsCompleted: 2,
    totalProjects: 4,
    classesAttended: 13,
    totalClasses: 20,
    progressStatus: 'In Progress',
    modules: [
      { name: 'Module 1: Financial Statements Analysis', progress: 100, completed: true },
      { name: 'Module 2: Corporate Finance & Capital Structure', progress: 100, completed: true },
      { name: 'Module 3: Financial Modeling in MS Excel', progress: 70, completed: false },
      { name: 'Module 4: Equity Research & DCF Valuation', progress: 50, completed: false },
      { name: 'Module 5: Mergers & Acquisitions Overview', progress: 0, completed: false },
      { name: 'Module 6: Capstone Valuation Pitch', progress: 0, completed: false }
    ],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Ananya Singh',
    email: 'ananya.singh@gmail.com',
    phone: '+91 98760 11223',
    course: 'UI/UX Design',
    batch: 'UI-Aug 2026',
    learningStatus: 'In Progress',
    internshipStatus: 'Applied',
    placementStatus: 'Not Placed',
    joinDate: 'Oct 08, 2026',
    city: 'Kolkata',
    overallProgress: 80,
    modulesCompleted: 11,
    totalModules: 14,
    assessmentsCompleted: 8,
    totalAssessments: 10,
    projectsCompleted: 3,
    totalProjects: 4,
    classesAttended: 17,
    totalClasses: 20,
    progressStatus: 'On Track',
    modules: [
      { name: 'Module 1: UX Research & User Personas', progress: 100, completed: true },
      { name: 'Module 2: Information Architecture & Wireframing', progress: 100, completed: true },
      { name: 'Module 3: Figma Advanced Components & Auto-layout', progress: 100, completed: true },
      { name: 'Module 4: Design Systems & Typography', progress: 80, completed: false },
      { name: 'Module 5: Interactive Prototyping & Micro-interactions', progress: 60, completed: false },
      { name: 'Module 6: Real-world SaaS App Redesign', progress: 20, completed: false }
    ],
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Sahil Khan',
    email: 'sahil.khan@gmail.com',
    phone: '+91 98760 33445',
    course: 'Digital Marketing',
    batch: 'DM-Jul 2026',
    learningStatus: 'In Progress',
    internshipStatus: 'Completed',
    placementStatus: 'Placed',
    joinDate: 'Aug 12, 2026',
    city: 'Ahmedabad',
    overallProgress: 90,
    modulesCompleted: 13,
    totalModules: 14,
    assessmentsCompleted: 9,
    totalAssessments: 10,
    projectsCompleted: 4,
    totalProjects: 4,
    classesAttended: 19,
    totalClasses: 20,
    progressStatus: 'On Track',
    modules: [
      { name: 'Module 1: Search Engine Optimization & Keyword Mapping', progress: 100, completed: true },
      { name: 'Module 2: Google Ads & Performance Max Campaigns', progress: 100, completed: true },
      { name: 'Module 3: Meta & LinkedIn Paid Ads Funnels', progress: 100, completed: true },
      { name: 'Module 4: Growth Hacking & Conversion Rate Optimization', progress: 100, completed: true },
      { name: 'Module 5: Web Analytics & GA4 Custom Tracking', progress: 80, completed: false },
      { name: 'Module 6: Capstone ROI Marketing Audit', progress: 40, completed: false }
    ],
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Kavya Iyer',
    email: 'kavya.iyer@gmail.com',
    phone: '+91 98760 55667',
    course: 'Full Stack',
    batch: 'FS-Jul 2026',
    learningStatus: 'In Progress',
    internshipStatus: 'On Internship',
    placementStatus: 'Not Placed',
    joinDate: 'Aug 25, 2026',
    city: 'Bengaluru',
    overallProgress: 30,
    modulesCompleted: 4,
    totalModules: 14,
    assessmentsCompleted: 3,
    totalAssessments: 10,
    projectsCompleted: 1,
    totalProjects: 4,
    classesAttended: 8,
    totalClasses: 20,
    progressStatus: 'At Risk',
    modules: [
      { name: 'Module 1: Web Fundamentals & Semantic HTML', progress: 100, completed: true },
      { name: 'Module 2: JavaScript Algorithms & Data Structures', progress: 60, completed: false },
      { name: 'Module 3: React Hooks & State Management', progress: 20, completed: false },
      { name: 'Module 4: Express.js Backend Architecture', progress: 0, completed: false },
      { name: 'Module 5: Database Modeling & Prisma ORM', progress: 0, completed: false },
      { name: 'Module 6: Full Stack Cloud Deployment', progress: 0, completed: false }
    ],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  }
];

async function seedStudents() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is missing');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas');

  for (const student of SEED_STUDENTS) {
    await StudentRecord.findOneAndUpdate(
      { email: student.email },
      student,
      { upsert: true, new: true }
    );
  }

  console.log(`✅ Successfully seeded/updated ${SEED_STUDENTS.length} students with progress in MongoDB Atlas!`);
  await mongoose.disconnect();
}

seedStudents().catch(err => {
  console.error(err);
  process.exit(1);
});
