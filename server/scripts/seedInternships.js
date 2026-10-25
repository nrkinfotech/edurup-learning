const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch(e) {}

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Internship = require('../models/Internship');

const initialInternships = [
  {
    title: 'Data Analytics Internship',
    track: 'Data Analytics',
    duration: '6 Months',
    startDate: '01 Nov 2025',
    enrolled: 28,
    status: 'Published',
    description: 'Hands-on internship in Data Analytics with real-world projects, mentor support and industry exposure.',
    highlights: '• Real-world industry projects\n• Mentor guidance\n• Certificates on completion\n• Placement assistance',
    projects: [
      'E-commerce Sales Analysis',
      'Customer Churn Prediction',
      'Dashboard using Power BI'
    ],
    enrollmentLimit: 50,
    showToStudents: true
  },
  {
    title: 'Data Science Internship',
    track: 'Data Science',
    duration: '6 Months',
    startDate: '15 Nov 2025',
    enrolled: 32,
    status: 'Published',
    description: 'Comprehensive Data Science program covering Python, statistical analysis, machine learning algorithms, and deep learning.',
    highlights: '• Live dataset modeling\n• 1-on-1 Senior Data Scientist mentorship\n• Portfolio capstones\n• Interview prep',
    projects: [
      'Fraud Detection System',
      'Stock Market Trend Forecasting',
      'Healthcare Patient Survival Classifier'
    ],
    enrollmentLimit: 45,
    showToStudents: true
  },
  {
    title: 'AI & ML Internship',
    track: 'AI / ML',
    duration: '6 Months',
    startDate: '01 Dec 2025',
    enrolled: 21,
    status: 'Upcoming',
    description: 'Work on cutting-edge Artificial Intelligence & Machine Learning architectures, LLM fine-tuning, and computer vision pipelines.',
    highlights: '• Computer vision & NLP projects\n• PyTorch & TensorFlow training\n• Hugging Face deployments\n• Verified credential',
    projects: [
      'Autonomous Object Detector',
      'LLM Customer Support Chatbot',
      'Facial Emotion Recognition'
    ],
    enrollmentLimit: 40,
    showToStudents: true
  },
  {
    title: 'Digital Marketing Internship',
    track: 'Digital Marketing',
    duration: '6 Months',
    startDate: '15 Dec 2025',
    enrolled: 18,
    status: 'Published',
    description: 'Master SEO, Google Search & Display Ads, Meta Ad campaigns, content marketing funnels, and performance analytics.',
    highlights: '• Live ad campaign budget handling\n• Real brand case studies\n• Agency client pitching\n• Google Certification assistance',
    projects: [
      'E-commerce Multi-Channel Ad Campaign',
      'Complete Technical SEO Audit',
      'B2B Lead Generation Funnel'
    ],
    enrollmentLimit: 35,
    showToStudents: true
  },
  {
    title: 'Full Stack Development Internship',
    track: 'Full Stack',
    duration: '6 Months',
    startDate: '02 Jan 2026',
    enrolled: 12,
    status: 'Draft',
    description: 'Build production-ready web applications using modern MERN stack, TypeScript, Docker, and RESTful APIs.',
    highlights: '• Full-stack agile development\n• GitHub CI/CD workflows\n• Code reviews by Lead Engineers\n• Live cloud deployment',
    projects: [
      'SaaS Subscription Platform',
      'Real-Time Collaboration Tool',
      'Payment Gateway Microservice'
    ],
    enrollmentLimit: 30,
    showToStudents: false
  },
  {
    title: 'HR Management Internship',
    track: 'HR',
    duration: '6 Months',
    startDate: '15 Jan 2026',
    enrolled: 8,
    status: 'Upcoming',
    description: 'Hands-on exposure to human resources operations, talent acquisition pipelines, employee engagement, and HR analytics.',
    highlights: '• End-to-end recruitment lifecycle\n• HRMS portal training\n• Labor compliance & policies\n• Performance appraisal frameworks',
    projects: [
      'Talent Sourcing Strategy',
      'Employee Onboarding Workflow',
      'HR Analytics Retention Model'
    ],
    enrollmentLimit: 25,
    showToStudents: true
  },
  {
    title: 'Sales & Marketing Internship',
    track: 'Sales & Marketing',
    duration: '6 Months',
    startDate: '01 Feb 2026',
    enrolled: 5,
    status: 'Draft',
    description: 'Gain practical exposure to B2B enterprise sales, lead nurturing, cold outreach frameworks, and CRM pipeline management.',
    highlights: '• Inbound & outbound sales playbooks\n• CRM software training\n• Objection handling workshops\n• Commission structures',
    projects: [
      'Outbound Cold Email Playbook',
      'CRM Pipeline Optimization',
      'Competitor Win-Loss Analysis'
    ],
    enrollmentLimit: 20,
    showToStudents: false
  },
  {
    title: 'Entrepreneurship Internship',
    track: 'Entrepreneurship',
    duration: '6 Months',
    startDate: '15 Feb 2026',
    enrolled: 0,
    status: 'Draft',
    description: 'Experience the 0-to-1 startup journey: market validation, business model canvas, unit economics, and investor pitch preparation.',
    highlights: '• Lean startup methodology\n• Venture capital pitching workshops\n• Founder mentoring sessions\n• Prototype validation sprints',
    projects: [
      'Market Sizing & TAM Analysis',
      'Startup Business Plan & Model',
      'MVP Prototype Validation'
    ],
    enrollmentLimit: 20,
    showToStudents: false
  }
];

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB Atlas');

    await Internship.deleteMany({});
    console.log('Cleared existing Internship collection');

    const docs = await Internship.insertMany(initialInternships);
    console.log(`Successfully seeded ${docs.length} internship programs in MongoDB Atlas!`);
    process.exit(0);
  } catch (err) {
    console.error('Internship Seeding Error:', err);
    process.exit(1);
  }
}

seed();
