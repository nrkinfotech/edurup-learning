const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Mentor = require('../models/Mentor');

const mentorsData = [
  // 1. Priya Verma (Matches Screenshot)
  {
    name: 'Priya Verma',
    email: 'priya.verma@edurup.in',
    phone: '+91 98765 43210',
    location: 'Bengaluru, Karnataka',
    role: 'Senior Data Analyst & Mentor',
    department: 'Data Analytics',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'PV',
    avatarColor: '#2563EB',
    skills: ['Data Analytics', 'Power BI', 'SQL', 'Excel', 'Python', 'Data Visualization', 'Business Intelligence'],
    assignedStudents: 48,
    ongoingSessions: 8,
    rating: 4.9,
    reviewsCount: 126,
    sessionCompletion: 92,
    status: 'Active',
    currentPrograms: [
      { programName: 'Data Analytics Internship', studentsCount: 22 },
      { programName: 'Business Analytics Internship', studentsCount: 16 },
      { programName: 'Data Science Internship', studentsCount: 10 }
    ],
    recentSessions: [
      { title: 'Weekly Mentorship - Data Cleaning', date: '28 Nov 2025', studentsCount: 12 },
      { title: 'Project Review - Power BI Dashboard', date: '25 Nov 2025', studentsCount: 8 },
      { title: 'Career Guidance Session', date: '22 Nov 2025', studentsCount: 15 }
    ],
    bio: 'Experienced data strategist with 7+ years mentoring 500+ students in BI architectures and predictive models.',
    order: 1
  },
  // 2. Rohit Singh (Matches Screenshot)
  {
    name: 'Rohit Singh',
    email: 'rohit.singh@edurup.in',
    phone: '+91 98112 34567',
    location: 'Bengaluru, Karnataka',
    role: 'Lead Data Scientist & AI Specialist',
    department: 'Data Science',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'RS',
    avatarColor: '#8B5CF6',
    skills: ['Python', 'Data Science', 'AI/ML', 'TensorFlow', 'Machine Learning'],
    assignedStudents: 42,
    ongoingSessions: 6,
    rating: 4.8,
    reviewsCount: 98,
    sessionCompletion: 95,
    status: 'Active',
    currentPrograms: [
      { programName: 'Data Science Internship', studentsCount: 24 },
      { programName: 'AI & ML Internship', studentsCount: 18 }
    ],
    recentSessions: [
      { title: 'Deep Learning & Computer Vision Workshop', date: '27 Nov 2025', studentsCount: 14 },
      { title: 'Model Deployment on Cloud', date: '23 Nov 2025', studentsCount: 10 }
    ],
    bio: 'Ex-Amazon ML researcher specializing in production transformers and recommendation systems.',
    order: 2
  },
  // 3. Sneha Reddy (Matches Screenshot)
  {
    name: 'Sneha Reddy',
    email: 'sneha.reddy@edurup.in',
    phone: '+91 98451 23456',
    location: 'Hyderabad, Telangana',
    role: 'Digital Marketing Strategist & Mentor',
    department: 'Digital Marketing',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'SR',
    avatarColor: '#EC4899',
    skills: ['Digital Marketing', 'SEO', 'Social Media', 'Google Ads', 'Meta Ads'],
    assignedStudents: 36,
    ongoingSessions: 5,
    rating: 4.7,
    reviewsCount: 84,
    sessionCompletion: 90,
    status: 'Active',
    currentPrograms: [
      { programName: 'Digital Marketing Internship', studentsCount: 36 }
    ],
    recentSessions: [
      { title: 'Campaign Performance & ROI Analysis', date: '26 Nov 2025', studentsCount: 11 },
      { title: 'SEO Technical Audit Masterclass', date: '21 Nov 2025', studentsCount: 9 }
    ],
    bio: 'Performance marketing leader managing 7-figure ad budgets across Google Ads, Meta, and LinkedIn.',
    order: 3
  },
  // 4. Amit Kumar (Matches Screenshot)
  {
    name: 'Amit Kumar',
    email: 'amit.kumar@edurup.in',
    phone: '+91 97112 34567',
    location: 'New Delhi, Delhi',
    role: 'Principal Full Stack Engineer',
    department: 'Full Stack',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'AK',
    avatarColor: '#10B981',
    skills: ['Full Stack', 'MERN', 'Web Development', 'React', 'Node.js'],
    assignedStudents: 40,
    ongoingSessions: 7,
    rating: 4.8,
    reviewsCount: 112,
    sessionCompletion: 94,
    status: 'Active',
    currentPrograms: [
      { programName: 'Full Stack Web Development Internship', studentsCount: 40 }
    ],
    recentSessions: [
      { title: 'Scalable System Architecture & Microservices', date: '27 Nov 2025', studentsCount: 16 },
      { title: 'React Performance Tuning', date: '24 Nov 2025', studentsCount: 12 }
    ],
    bio: 'Full-stack software architect with 8+ years experience building enterprise SaaS platforms.',
    order: 4
  },
  // 5. Karthik V (Matches Screenshot)
  {
    name: 'Karthik V',
    email: 'karthik.v@edurup.in',
    phone: '+91 96543 21098',
    location: 'Chennai, Tamil Nadu',
    role: 'Senior Cloud & DevOps Architect',
    department: 'Cloud / DevOps',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'KV',
    avatarColor: '#F59E0B',
    skills: ['Cloud', 'AWS', 'DevOps', 'Docker', 'Kubernetes', 'CI/CD'],
    assignedStudents: 28,
    ongoingSessions: 4,
    rating: 4.6,
    reviewsCount: 72,
    sessionCompletion: 88,
    status: 'Active',
    currentPrograms: [
      { programName: 'Cloud & DevOps Internship', studentsCount: 28 }
    ],
    recentSessions: [
      { title: 'Terraform Infrastructure Automation', date: '25 Nov 2025', studentsCount: 8 },
      { title: 'Kubernetes Cluster Setup', date: '20 Nov 2025', studentsCount: 10 }
    ],
    bio: 'AWS certified Solutions Architect with a passion for zero-downtime deployment workflows.',
    order: 5
  },
  // 6. Meera Joshi (Matches Screenshot)
  {
    name: 'Meera Joshi',
    email: 'meera.joshi@edurup.in',
    phone: '+91 97654 32109',
    location: 'Pune, Maharashtra',
    role: 'Head of People Operations & HR Mentor',
    department: 'HR Management',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'MJ',
    avatarColor: '#EF4444',
    skills: ['HR Management', 'Recruitment', 'Career Guidance', 'HR Analytics'],
    assignedStudents: 22,
    ongoingSessions: 3,
    rating: 4.7,
    reviewsCount: 65,
    sessionCompletion: 96,
    status: 'Active',
    currentPrograms: [
      { programName: 'HR Management Internship', studentsCount: 22 }
    ],
    recentSessions: [
      { title: 'Resume Screening & Mock Interviews', date: '26 Nov 2025', studentsCount: 8 },
      { title: 'Corporate Communication & Etiquette', date: '19 Nov 2025', studentsCount: 14 }
    ],
    bio: 'HR leader guiding aspiring executives in modern talent acquisition and performance review matrices.',
    order: 6
  },
  // 7. Aditya Patel (Matches Screenshot)
  {
    name: 'Aditya Patel',
    email: 'aditya.patel@edurup.in',
    phone: '+91 98987 65432',
    location: 'Ahmedabad, Gujarat',
    role: 'Lead Business Analyst & Consultant',
    department: 'Business Analysis',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'AP',
    avatarColor: '#0284C7',
    skills: ['Business Analysis', 'Excel', 'Finance', 'Tableau', 'Financial Modeling'],
    assignedStudents: 25,
    ongoingSessions: 5,
    rating: 4.5,
    reviewsCount: 58,
    sessionCompletion: 89,
    status: 'Active',
    currentPrograms: [
      { programName: 'Business Analytics Internship', studentsCount: 25 }
    ],
    recentSessions: [
      { title: 'Market Research & Business Case Studies', date: '24 Nov 2025', studentsCount: 7 },
      { title: 'Financial Valuation Modeling', date: '18 Nov 2025', studentsCount: 9 }
    ],
    bio: 'Consultant helping students turn ambiguous business problems into crisp quantitative financial models.',
    order: 7
  },
  // 8. Divya Singh (Matches Screenshot - On Leave)
  {
    name: 'Divya Singh',
    email: 'divya.singh@edurup.in',
    phone: '+91 98123 45678',
    location: 'Lucknow, Uttar Pradesh',
    role: 'Growth Lead & Sales Consultant',
    department: 'Sales & Marketing',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'DS',
    avatarColor: '#D97706',
    skills: ['Sales & Marketing', 'Growth', 'Strategy', 'B2B Sales', 'CRM'],
    assignedStudents: 18,
    ongoingSessions: 2,
    rating: 4.6,
    reviewsCount: 49,
    sessionCompletion: 86,
    status: 'On Leave',
    currentPrograms: [
      { programName: 'Sales & Marketing Internship', studentsCount: 18 }
    ],
    recentSessions: [
      { title: 'B2B Inbound Sales Pipeline', date: '15 Nov 2025', studentsCount: 6 }
    ],
    bio: 'Sales operations specialist with a focus on consultative sales cycles and CRM automation.',
    order: 8
  },
  // 9. Manoj Gupta (Matches Screenshot)
  {
    name: 'Manoj Gupta',
    email: 'manoj.gupta@edurup.in',
    phone: '+91 97234 56781',
    location: 'Jaipur, Rajasthan',
    role: 'Startup Founder & Venture Advisor',
    department: 'Entrepreneurship',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'MG',
    avatarColor: '#059669',
    skills: ['Entrepreneurship', 'Startup', 'Business Model', 'Pitch Deck', 'Fundraising'],
    assignedStudents: 20,
    ongoingSessions: 3,
    rating: 4.8,
    reviewsCount: 61,
    sessionCompletion: 93,
    status: 'Active',
    currentPrograms: [
      { programName: 'Entrepreneurship Internship', studentsCount: 20 }
    ],
    recentSessions: [
      { title: 'Lean Canvas & MVP Validation', date: '27 Nov 2025', studentsCount: 10 },
      { title: 'Investor Pitch Preparation', date: '22 Nov 2025', studentsCount: 8 }
    ],
    bio: 'Serial entrepreneur who has raised seed venture capital and coached 40+ early-stage collegiate startups.',
    order: 9
  },
  // 10. Ishita Verma (Matches Screenshot - Inactive)
  {
    name: 'Ishita Verma',
    email: 'ishita.verma@edurup.in',
    phone: '+91 98345 67890',
    location: 'Chandigarh, Punjab',
    role: 'Lead Product & UI/UX Designer',
    department: 'UI/UX',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'IV',
    avatarColor: '#EF4444',
    skills: ['UI/UX', 'Product Design', 'Figma', 'Prototyping', 'Design Systems'],
    assignedStudents: 15,
    ongoingSessions: 2,
    rating: 4.7,
    reviewsCount: 53,
    sessionCompletion: 91,
    status: 'Inactive',
    currentPrograms: [
      { programName: 'UI/UX Design Internship', studentsCount: 15 }
    ],
    recentSessions: [
      { title: 'Design Systems with Figma Variables', date: '12 Nov 2025', studentsCount: 7 }
    ],
    bio: 'Product designer focusing on accessible user journeys, high-fidelity prototypes, and component libraries.',
    order: 10
  },
  // 11 - 28: Additional realistic mentors (Total = 28, Active = 24, On Leave = 2, Inactive = 2)
  // Remaining needed students: 326 - 294 = 32
  // Remaining needed ongoing sessions: 48 - 45 = 3
  {
    name: 'Naveen Rao',
    email: 'naveen.rao@edurup.in',
    phone: '+91 98450 11223',
    location: 'Bengaluru, Karnataka',
    role: 'Senior SQL & Database Architect',
    department: 'Data Analytics',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'NR',
    avatarColor: '#2563EB',
    skills: ['PostgreSQL', 'Data Warehousing', 'ETL', 'SQL Server'],
    assignedStudents: 3,
    ongoingSessions: 1,
    rating: 4.9,
    reviewsCount: 42,
    sessionCompletion: 95,
    status: 'Active',
    currentPrograms: [{ programName: 'Data Analytics Internship', studentsCount: 3 }],
    recentSessions: [{ title: 'Advanced Window Functions', date: '21 Nov 2025', studentsCount: 3 }],
    order: 11
  },
  {
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@edurup.in',
    phone: '+91 97332 44556',
    location: 'Mumbai, Maharashtra',
    role: 'Computer Vision & Deep Learning Specialist',
    department: 'Data Science',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'AD',
    avatarColor: '#7C3AED',
    skills: ['PyTorch', 'OpenCV', 'YOLOv8', 'Deep Learning'],
    assignedStudents: 3,
    ongoingSessions: 1,
    rating: 4.8,
    reviewsCount: 38,
    sessionCompletion: 92,
    status: 'Active',
    currentPrograms: [{ programName: 'Data Science Internship', studentsCount: 3 }],
    recentSessions: [{ title: 'Object Detection Pipeline', date: '20 Nov 2025', studentsCount: 3 }],
    order: 12
  },
  {
    name: 'Vikram Chawla',
    email: 'vikram.chawla@edurup.in',
    phone: '+91 98109 88776',
    location: 'Gurugram, Haryana',
    role: 'Senior Backend Engineer',
    department: 'Full Stack',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'VC',
    avatarColor: '#10B981',
    skills: ['Node.js', 'Go', 'Microservices', 'Redis'],
    assignedStudents: 3,
    ongoingSessions: 1,
    rating: 4.9,
    reviewsCount: 45,
    sessionCompletion: 94,
    status: 'Active',
    currentPrograms: [{ programName: 'Full Stack Web Development Internship', studentsCount: 3 }],
    recentSessions: [{ title: 'Caching Strategies with Redis', date: '19 Nov 2025', studentsCount: 3 }],
    order: 13
  },
  {
    name: 'Pooja Bhatt',
    email: 'pooja.bhatt@edurup.in',
    phone: '+91 98220 33445',
    location: 'Bengaluru, Karnataka',
    role: 'Search Engine Optimization Specialist',
    department: 'Digital Marketing',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'PB',
    avatarColor: '#EA580C',
    skills: ['Technical SEO', 'Keyword Research', 'Ahrefs', 'Content Optimization'],
    assignedStudents: 2,
    ongoingSessions: 0,
    rating: 4.8,
    reviewsCount: 31,
    sessionCompletion: 90,
    status: 'Active',
    currentPrograms: [{ programName: 'Digital Marketing Internship', studentsCount: 2 }],
    recentSessions: [{ title: 'Core Web Vitals Audit', date: '17 Nov 2025', studentsCount: 2 }],
    order: 14
  },
  {
    name: 'Siddharth Nair',
    email: 'siddharth.nair@edurup.in',
    phone: '+91 97441 55667',
    location: 'Kochi, Kerala',
    role: 'Data Engineering Lead',
    department: 'Data Analytics',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'SN',
    avatarColor: '#2563EB',
    skills: ['Apache Spark', 'Databricks', 'Airflow', 'Python'],
    assignedStudents: 2,
    ongoingSessions: 0,
    rating: 4.9,
    reviewsCount: 50,
    sessionCompletion: 97,
    status: 'Active',
    currentPrograms: [{ programName: 'Data Analytics Internship', studentsCount: 3 }],
    recentSessions: [{ title: 'Airflow Pipeline Orchestration', date: '16 Nov 2025', studentsCount: 3 }],
    order: 15
  },
  {
    name: 'Tanvi Shah',
    email: 'tanvi.shah@edurup.in',
    phone: '+91 98980 77665',
    location: 'Mumbai, Maharashtra',
    role: 'Financial Analyst & Excel Modeler',
    department: 'Business Analysis',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'TS',
    avatarColor: '#0284C7',
    skills: ['Financial Modeling', 'DCF Valuation', 'Advanced Excel'],
    assignedStudents: 3,
    ongoingSessions: 0,
    rating: 4.7,
    reviewsCount: 29,
    sessionCompletion: 91,
    status: 'Active',
    currentPrograms: [{ programName: 'Business Analytics Internship', studentsCount: 3 }],
    recentSessions: [{ title: 'Three-Statement Financial Models', date: '15 Nov 2025', studentsCount: 3 }],
    order: 16
  },
  {
    name: 'Kunal Sen',
    email: 'kunal.sen@edurup.in',
    phone: '+91 98300 22334',
    location: 'Kolkata, West Bengal',
    role: 'Frontend Architect',
    department: 'Full Stack',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'KS',
    avatarColor: '#10B981',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    assignedStudents: 2,
    ongoingSessions: 0,
    rating: 4.8,
    reviewsCount: 34,
    sessionCompletion: 93,
    status: 'Active',
    currentPrograms: [{ programName: 'Full Stack Web Development Internship', studentsCount: 2 }],
    recentSessions: [{ title: 'Next.js Server Actions', date: '14 Nov 2025', studentsCount: 2 }],
    order: 17
  },
  {
    name: 'Rhea Kapoor',
    email: 'rhea.kapoor@edurup.in',
    phone: '+91 98110 99887',
    location: 'Delhi NCR',
    role: 'HR Business Partner & Leadership Coach',
    department: 'HR Management',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'RK',
    avatarColor: '#EF4444',
    skills: ['Organizational Design', 'Executive Hiring', 'HR Tech'],
    assignedStudents: 2,
    ongoingSessions: 0,
    rating: 4.8,
    reviewsCount: 40,
    sessionCompletion: 96,
    status: 'Active',
    currentPrograms: [{ programName: 'HR Management Internship', studentsCount: 2 }],
    recentSessions: [{ title: 'Behavioral Interview Techniques', date: '13 Nov 2025', studentsCount: 2 }],
    order: 18
  },
  {
    name: 'Arjun Mehta',
    email: 'arjun.mehta@edurup.in',
    phone: '+91 98200 44556',
    location: 'Bengaluru, Karnataka',
    role: 'Kubernetes & Site Reliability Specialist',
    department: 'Cloud / DevOps',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'AM',
    avatarColor: '#F59E0B',
    skills: ['Kubernetes', 'Prometheus', 'Grafana', 'Linux'],
    assignedStudents: 2,
    ongoingSessions: 0,
    rating: 4.9,
    reviewsCount: 46,
    sessionCompletion: 95,
    status: 'Active',
    currentPrograms: [{ programName: 'Cloud & DevOps Internship', studentsCount: 2 }],
    recentSessions: [{ title: 'Cluster Monitoring with Grafana', date: '12 Nov 2025', studentsCount: 2 }],
    order: 19
  },
  {
    name: 'Simran Gill',
    email: 'simran.gill@edurup.in',
    phone: '+91 98720 66778',
    location: 'Chandigarh, Punjab',
    role: 'Content Strategist & Copywriter',
    department: 'Digital Marketing',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'SG',
    avatarColor: '#EC4899',
    skills: ['Content Marketing', 'Copywriting', 'Email Drip Campaigns'],
    assignedStudents: 2,
    ongoingSessions: 0,
    rating: 4.8,
    reviewsCount: 28,
    sessionCompletion: 92,
    status: 'Active',
    currentPrograms: [{ programName: 'Digital Marketing Internship', studentsCount: 2 }],
    recentSessions: [{ title: 'High-Converting Copy Frameworks', date: '11 Nov 2025', studentsCount: 2 }],
    order: 20
  },
  {
    name: 'Harsh Vardhan',
    email: 'harsh.vardhan@edurup.in',
    phone: '+91 97180 88990',
    location: 'Noida, Uttar Pradesh',
    role: 'Natural Language Processing Specialist',
    department: 'Data Science',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'HV',
    avatarColor: '#7C3AED',
    skills: ['LangChain', 'HuggingFace', 'Transformers', 'Python'],
    assignedStudents: 1,
    ongoingSessions: 0,
    rating: 4.8,
    reviewsCount: 33,
    sessionCompletion: 94,
    status: 'Active',
    currentPrograms: [{ programName: 'Data Science Internship', studentsCount: 1 }],
    recentSessions: [{ title: 'RAG Architecture with Vector DBs', date: '10 Nov 2025', studentsCount: 1 }],
    order: 21
  },
  {
    name: 'Swati Kulkarni',
    email: 'swati.kulkarni@edurup.in',
    phone: '+91 98231 11223',
    location: 'Pune, Maharashtra',
    role: 'Business Intelligence & Tableau Designer',
    department: 'Data Analytics',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'SK',
    avatarColor: '#2563EB',
    skills: ['Tableau', 'Power BI', 'SQL', 'Storytelling with Data'],
    assignedStudents: 1,
    ongoingSessions: 0,
    rating: 4.9,
    reviewsCount: 39,
    sessionCompletion: 96,
    status: 'Active',
    currentPrograms: [{ programName: 'Data Analytics Internship', studentsCount: 1 }],
    recentSessions: [{ title: 'Tableau Dashboard Interactivity', date: '09 Nov 2025', studentsCount: 1 }],
    order: 22
  },
  {
    name: 'Gaurav Roy',
    email: 'gaurav.roy@edurup.in',
    phone: '+91 98310 55443',
    location: 'Kolkata, West Bengal',
    role: 'Mobile Apps & Cross-Platform Engineer',
    department: 'Full Stack',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'GR',
    avatarColor: '#10B981',
    skills: ['React Native', 'Flutter', 'TypeScript', 'REST APIs'],
    assignedStudents: 1,
    ongoingSessions: 0,
    rating: 4.7,
    reviewsCount: 27,
    sessionCompletion: 89,
    status: 'Active',
    currentPrograms: [{ programName: 'Full Stack Web Development Internship', studentsCount: 1 }],
    recentSessions: [{ title: 'Cross-Platform State Management', date: '08 Nov 2025', studentsCount: 1 }],
    order: 23
  },
  {
    name: 'Pallavi Rao',
    email: 'pallavi.rao@edurup.in',
    phone: '+91 98452 77889',
    location: 'Bengaluru, Karnataka',
    role: 'Interaction Designer & Researcher',
    department: 'UI/UX',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'PR',
    avatarColor: '#EF4444',
    skills: ['User Research', 'Wireframing', 'Usability Testing', 'Figma'],
    assignedStudents: 1,
    ongoingSessions: 0,
    rating: 4.8,
    reviewsCount: 35,
    sessionCompletion: 92,
    status: 'Active',
    currentPrograms: [{ programName: 'UI/UX Design Internship', studentsCount: 1 }],
    recentSessions: [{ title: 'Conducting User Interviews', date: '07 Nov 2025', studentsCount: 1 }],
    order: 24
  },
  // 25. Active
  {
    name: 'Nikhil Saxena',
    email: 'nikhil.saxena@edurup.in',
    phone: '+91 97550 33221',
    location: 'Bhopal, Madhya Pradesh',
    role: 'Growth Hacker & Paid Media Specialist',
    department: 'Digital Marketing',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'NS',
    avatarColor: '#D97706',
    skills: ['Google Ads', 'Funnel Optimization', 'Conversion Rate Optimization'],
    assignedStudents: 1,
    ongoingSessions: 0,
    rating: 4.8,
    reviewsCount: 30,
    sessionCompletion: 91,
    status: 'Active',
    currentPrograms: [{ programName: 'Digital Marketing Internship', studentsCount: 1 }],
    recentSessions: [{ title: 'Conversion Rate A/B Testing', date: '06 Nov 2025', studentsCount: 1 }],
    order: 25
  },
  // 26. Active
  {
    name: 'Preeti Menon',
    email: 'preeti.menon@edurup.in',
    phone: '+91 98460 88990',
    location: 'Kochi, Kerala',
    role: 'Strategic Consultant & Pitch Mentor',
    department: 'Entrepreneurship',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'PM',
    avatarColor: '#059669',
    skills: ['Business Strategy', 'Market Sizing', 'Pitch Decks'],
    assignedStudents: 1,
    ongoingSessions: 0,
    rating: 4.9,
    reviewsCount: 41,
    sessionCompletion: 95,
    status: 'Active',
    currentPrograms: [{ programName: 'Entrepreneurship Internship', studentsCount: 1 }],
    recentSessions: [{ title: 'TAM SAM SOM Market Sizing', date: '05 Nov 2025', studentsCount: 1 }],
    order: 26
  },
  // 27. On Leave (#2 On Leave)
  {
    name: 'Abhishek Jha',
    email: 'abhishek.jha@edurup.in',
    phone: '+91 98101 22334',
    location: 'Patna, Bihar',
    role: 'Senior Big Data Engineer',
    department: 'Data Analytics',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'AJ',
    avatarColor: '#2563EB',
    skills: ['Hadoop', 'Hive', 'PySpark', 'Kafka'],
    assignedStudents: 1,
    ongoingSessions: 0,
    rating: 4.7,
    reviewsCount: 32,
    sessionCompletion: 88,
    status: 'On Leave',
    currentPrograms: [{ programName: 'Data Analytics Internship', studentsCount: 1 }],
    recentSessions: [{ title: 'Streaming Data with Kafka', date: '01 Nov 2025', studentsCount: 1 }],
    order: 27
  },
  // 28. Inactive (#2 Inactive)
  {
    name: 'Sakshi Bhatnagar',
    email: 'sakshi.bhatnagar@edurup.in',
    phone: '+91 98290 55443',
    location: 'Jaipur, Rajasthan',
    role: 'Associate UX Researcher',
    department: 'UI/UX',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=160&auto=format&fit=crop&q=80',
    avatarInitials: 'SB',
    avatarColor: '#EF4444',
    skills: ['Usability Heuristics', 'Card Sorting', 'Information Architecture'],
    assignedStudents: 1,
    ongoingSessions: 0,
    rating: 4.6,
    reviewsCount: 25,
    sessionCompletion: 87,
    status: 'Inactive',
    currentPrograms: [{ programName: 'UI/UX Design Internship', studentsCount: 1 }],
    recentSessions: [{ title: 'Heuristic Evaluation Workshop', date: '25 Oct 2025', studentsCount: 1 }],
    order: 28
  }
];

async function seed() {
  try {
    await connectDB();
    console.log('Clearing existing mentors collection...');
    await Mentor.deleteMany({});

    console.log(`Inserting ${mentorsData.length} mentors...`);
    const inserted = await Mentor.insertMany(mentorsData);
    console.log(`Successfully seeded ${inserted.length} mentors!`);

    const totalMentors = await Mentor.countDocuments();
    const activeMentors = await Mentor.countDocuments({ status: 'Active' });
    const onLeaveMentors = await Mentor.countDocuments({ status: 'On Leave' });
    const inactiveMentors = await Mentor.countDocuments({ status: 'Inactive' });

    const agg = await Mentor.aggregate([
      {
        $group: {
          _id: null,
          totalAssigned: { $sum: '$assignedStudents' },
          totalOngoingSessions: { $sum: '$ongoingSessions' },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

    const stats = agg[0] || {};

    console.log('\n=== FINAL KPI SUMMARY IN DB ===');
    console.log(`- Total Mentors: ${totalMentors}`);
    console.log(`- Active Mentors: ${activeMentors}`);
    console.log(`- On Leave Mentors: ${onLeaveMentors}`);
    console.log(`- Inactive Mentors: ${inactiveMentors}`);
    console.log(`- Total Assigned Students: ${stats.totalAssigned}`);
    console.log(`- Total Ongoing Sessions: ${stats.totalOngoingSessions}`);
    console.log(`- Average Rating: ${stats.avgRating ? stats.avgRating.toFixed(1) : 4.8}`);

    await mongoose.disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding Mentors Error:', err);
    process.exit(1);
  }
}

seed();
