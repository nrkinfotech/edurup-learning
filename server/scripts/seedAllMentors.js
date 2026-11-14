const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch(e) {}

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Mentor = require('../models/Mentor');

const topMentors = [
  // 1
  {
    order: 1,
    name: 'Rahul Sharma',
    avatarInitials: 'RS',
    avatarColor: '#2563EB',
    designation: 'Senior Data Analyst',
    company: 'Amazon',
    expertise: ['Data Analytics', 'Power BI', 'SQL', 'Excel', 'Data Visualization'],
    domains: ['Data Analytics', 'Power BI'],
    mentorType: 'Industry',
    assignedToText: '3 Batches',
    status: 'Active',
    email: 'rahul.sharma@amazon.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    linkedin: 'linkedin.com/in/rahul',
    experience: '7+ Years',
    isIndustryExpert: true,
    bio: 'Experienced data analytics professional at Amazon with expertise in BI, data visualization and business reporting. Passionate about mentoring and helping learners build industry-ready skills.',
    assignedBatches: [
      'Data Analytics - Oct 2026 Batch (32 Students)',
      'Data Analytics - Sep 2026 Batch (28 Students)',
      'Business Analytics - Oct 2026 Batch (24 Students)'
    ]
  },
  // 2
  {
    order: 2,
    name: 'Ananya Prasad',
    avatarInitials: 'AP',
    avatarColor: '#E11D48',
    designation: 'Data Scientist',
    company: 'Microsoft',
    expertise: ['Data Science', 'ML', 'Python', 'Statistics'],
    domains: ['Data Science', 'ML'],
    mentorType: 'Industry',
    assignedToText: '2 Batches',
    status: 'Active',
    email: 'ananya.prasad@microsoft.com',
    phone: '+91 98765 43211',
    location: 'Hyderabad, India',
    linkedin: 'linkedin.com/in/ananya',
    experience: '6+ Years',
    isIndustryExpert: true,
    bio: 'Data Scientist at Microsoft working on cloud-scale predictive AI systems. Mentors students on feature engineering and machine learning workflows.',
    assignedBatches: [
      'Data Science - Cohort 12 (30 Students)',
      'AI & ML - Cohort 8 (26 Students)'
    ]
  },
  // 3
  {
    order: 3,
    name: 'Vikram Kumar',
    avatarInitials: 'VK',
    avatarColor: '#16A34A',
    designation: 'Full Stack Developer',
    company: 'Infosys',
    expertise: ['Full Stack', 'React', 'Node.js', 'MongoDB'],
    domains: ['Full Stack', 'React'],
    mentorType: 'Industry',
    assignedToText: '4 Batches',
    status: 'Active',
    email: 'vikram.k@infosys.com',
    phone: '+91 98765 43212',
    location: 'Bengaluru, India',
    linkedin: 'linkedin.com/in/vikram-k',
    experience: '8+ Years',
    isIndustryExpert: true,
    bio: 'Lead Full Stack architect specialized in micro-frontends and distributed systems. Loves breaking down complex web concepts for beginners.',
    assignedBatches: [
      'Full Stack - Batch 18 (35 Students)',
      'Full Stack - Batch 19 (32 Students)',
      'MERN Stack Accelerated (28 Students)',
      'Backend Engineering (22 Students)'
    ]
  },
  // 4
  {
    order: 4,
    name: 'Sneha Mehta',
    avatarInitials: 'SM',
    avatarColor: '#9333EA',
    designation: 'Digital Marketing Lead',
    company: 'Deloitte',
    expertise: ['Digital Marketing', 'SEO', 'Google Ads', 'Content Strategy'],
    domains: ['Digital Marketing', 'SEO'],
    mentorType: 'Industry',
    assignedToText: '2 Batches',
    status: 'On Leave',
    email: 'sneha.m@deloitte.com',
    phone: '+91 98765 43213',
    location: 'Mumbai, India',
    linkedin: 'linkedin.com/in/sneha-mehta',
    experience: '5+ Years',
    isIndustryExpert: false,
    bio: 'Growth marketing specialist managing multi-million digital ad spends for Fortune 500 clients at Deloitte Digital.',
    assignedBatches: [
      'Digital Marketing - Cohort 6 (25 Students)',
      'Social Media & Performance Ads (20 Students)'
    ]
  },
  // 5
  {
    order: 5,
    name: 'Arjun K R',
    avatarInitials: 'AK',
    avatarColor: '#0284C7',
    designation: 'BI Consultant',
    company: 'TCS',
    expertise: ['Power BI', 'SQL', 'Tableau', 'Data Modeling'],
    domains: ['Power BI', 'SQL'],
    mentorType: 'External',
    assignedToText: '1 Batch',
    status: 'Active',
    email: 'arjun.kr@tcs.com',
    phone: '+91 98765 43214',
    location: 'Pune, India',
    linkedin: 'linkedin.com/in/arjun-kr',
    experience: '6+ Years',
    isIndustryExpert: true,
    bio: 'Principal BI Consultant building high-impact dashboards and enterprise data pipelines across banking clients.',
    assignedBatches: [
      'Business Intelligence Masterclass (34 Students)'
    ]
  },
  // 6
  {
    order: 6,
    name: 'Priya Desai',
    avatarInitials: 'PD',
    avatarColor: '#DC2626',
    designation: 'AI/ML Engineer',
    company: 'Wipro',
    expertise: ['AI/ML', 'Python', 'PyTorch', 'Computer Vision'],
    domains: ['AI/ML', 'Python'],
    mentorType: 'Industry',
    assignedToText: '2 Batches',
    status: 'Active',
    email: 'priya.desai@wipro.com',
    phone: '+91 98765 43215',
    location: 'Chennai, India',
    linkedin: 'linkedin.com/in/priya-desai',
    experience: '5+ Years',
    isIndustryExpert: true,
    bio: 'Computer vision researcher and deep learning practitioner with patents in defect recognition.',
    assignedBatches: [
      'AI/ML Foundation - Batch 5 (28 Students)',
      'Deep Learning Advanced (24 Students)'
    ]
  },
  // 7
  {
    order: 7,
    name: 'Naveen B',
    avatarInitials: 'NB',
    avatarColor: '#65A30D',
    designation: 'Frontend Architect',
    company: 'Accenture',
    expertise: ['React', 'JavaScript', 'TypeScript', 'Next.js'],
    domains: ['React', 'JavaScript'],
    mentorType: 'External',
    assignedToText: '3 Batches',
    status: 'Active',
    email: 'naveen.b@accenture.com',
    phone: '+91 98765 43216',
    location: 'Gurugram, India',
    linkedin: 'linkedin.com/in/naveen-b',
    experience: '9+ Years',
    isIndustryExpert: true,
    bio: 'Frontend architect and performance evangelist helping teams build zero-lag web experiences.',
    assignedBatches: [
      'Modern React Architecture (30 Students)',
      'TypeScript for Web Devs (26 Students)',
      'UI/UX Engineering (25 Students)'
    ]
  },
  // 8
  {
    order: 8,
    name: 'Rohit Verma',
    avatarInitials: 'RV',
    avatarColor: '#EA580C',
    designation: 'Cloud Engineer',
    company: 'HCL Technologies',
    expertise: ['Cloud (AWS)', 'DevOps', 'Docker', 'Kubernetes'],
    domains: ['Cloud (AWS)', 'DevOps'],
    mentorType: 'Industry',
    assignedToText: '1 Batch',
    status: 'Inactive',
    email: 'rohit.v@hcl.com',
    phone: '+91 98765 43217',
    location: 'Noida, India',
    linkedin: 'linkedin.com/in/rohit-verma',
    experience: '4+ Years',
    isIndustryExpert: false,
    bio: 'AWS certified Solutions Architect with deep expertise in container orchestration and Terraform automation.',
    assignedBatches: [
      'AWS Cloud Practitioner Track (22 Students)'
    ]
  },
  // 9
  {
    order: 9,
    name: 'Divya Singh',
    avatarInitials: 'DS',
    avatarColor: '#4F46E5',
    designation: 'HR & Career Coach',
    company: 'Independent',
    expertise: ['Career Guidance', 'Resume', 'Interview Prep', 'Soft Skills'],
    domains: ['Career Guidance', 'Resume'],
    mentorType: 'Internal',
    assignedToText: 'All Batches',
    status: 'Active',
    email: 'divya.singh@edurup.in',
    phone: '+91 98765 43218',
    location: 'Bengaluru, India',
    linkedin: 'linkedin.com/in/divya-coach',
    experience: '8+ Years',
    isIndustryExpert: false,
    bio: 'Dedicated career development counselor who has guided 2,500+ students to successful placements across MNCs.',
    assignedBatches: [
      'Campus-to-Corporate All Cohorts (300+ Students)'
    ]
  },
  // 10
  {
    order: 10,
    name: 'Manoj Kumar',
    avatarInitials: 'MK',
    avatarColor: '#0891B2',
    designation: 'Product Analyst',
    company: 'Flipkart',
    expertise: ['Business Analytics', 'Excel', 'SQL', 'A/B Testing'],
    domains: ['Business Analytics', 'Excel'],
    mentorType: 'Industry',
    assignedToText: '2 Batches',
    status: 'Active',
    email: 'manoj.k@flipkart.com',
    phone: '+91 98765 43219',
    location: 'Bengaluru, India',
    linkedin: 'linkedin.com/in/manoj-analytics',
    experience: '6+ Years',
    isIndustryExpert: true,
    bio: 'Product Analytics lead analyzing customer checkout funnels, basket conversion rates and pricing elasticity at Flipkart.',
    assignedBatches: [
      'Product Analytics Workshop (28 Students)',
      'E-commerce Data Modeling (24 Students)'
    ]
  }
];

// Complementary mentors 11 to 186
const namesList = [
  'Aarav Nambiar', 'Aditi Rao', 'Kavita Iyer', 'Siddharth Joshi', 'Meera Nair', 'Rohan Gupta',
  'Pooja Kulkarni', 'Tanvi Reddy', 'Karan Singhal', 'Swati Deshpande', 'Harish Nair', 'Deepak Sen',
  'Sunita Bhatt', 'Rajiv Chopra', 'Pallavi Ghosh', 'Nitin Saxena', 'Kiran Bedi', 'Varun Kapoor',
  'Shweta Roy', 'Gaurav Jain', 'Ankita Mitra', 'Abhishek Das', 'Tarun Sethi', 'Preeti Menon',
  'Bhavna Bajaj', 'Mayank Agarwal', 'Richa Sharma', 'Alok Verma', 'Monika Varma', 'Manish Tyagi'
];

const companiesList = ['Amazon', 'Microsoft', 'Google', 'TCS', 'Infosys', 'Wipro', 'Capgemini', 'HCL', 'Accenture', 'Cognizant', 'Deloitte', 'IBM'];
const domainsList = [
  ['Data Analytics', 'Power BI'],
  ['Data Science', 'Python'],
  ['Full Stack', 'React'],
  ['Digital Marketing', 'SEO'],
  ['Cloud (AWS)', 'DevOps'],
  ['AI/ML', 'Deep Learning'],
  ['Business Analytics', 'SQL']
];
const typesList = ['Industry', 'External', 'Internal'];

for (let i = 11; i <= 186; i++) {
  const n = namesList[(i - 11) % namesList.length];
  const fullName = i > 40 ? `${n} ${Math.floor(i / 30)}` : n;
  const inits = fullName.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  const comp = companiesList[(i * 3) % companiesList.length];
  const doms = domainsList[(i * 5) % domainsList.length];
  const tp = typesList[(i * 7) % typesList.length];

  // Active: 142 total (top 10 has 8 active, so 11 to 144 are active -> 8 + 134 = 142)
  // On Leave: 18 total (top 10 has 1 on leave, so 145 to 161 are on leave -> 1 + 17 = 18)
  // Inactive: 26 total (top 10 has 1 inactive, so 162 to 186 are inactive -> 1 + 25 = 26)
  let status = 'Active';
  if (i >= 145 && i <= 161) {
    status = 'On Leave';
  } else if (i >= 162) {
    status = 'Inactive';
  }

  const isExpert = (i <= 16 && (i % 2 === 0)); // total 12 industry experts

  topMentors.push({
    order: i,
    name: fullName,
    avatarInitials: inits,
    avatarColor: ['#2563EB', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899'][i % 7],
    designation: `${doms[0]} Specialist`,
    company: comp,
    expertise: [...doms, 'Mentoring', 'Problem Solving'],
    domains: doms,
    mentorType: tp,
    assignedToText: `${(i % 3) + 1} Batches`,
    status,
    email: `${n.toLowerCase().replace(/[^a-z]/g, '')}${i}@${comp.toLowerCase().replace(/[^a-z]/g, '')}.com`,
    phone: `+91 98${(20000000 + i).toString().slice(0, 8)}`,
    location: ['Bengaluru, India', 'Hyderabad, India', 'Pune, India', 'Mumbai, India', 'Noida, India'][i % 5],
    linkedin: `linkedin.com/in/${n.toLowerCase().replace(/[^a-z]/g, '-')}-${i}`,
    experience: `${(i % 6) + 4}+ Years`,
    isIndustryExpert: isExpert,
    bio: `Passionate ${doms[0]} practitioner at ${comp} offering personalized mentorship to budding tech aspirants.`,
    assignedBatches: [
      `${doms[0]} Cohort ${i % 10 + 1} (30 Students)`
    ]
  });
}

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB Atlas...');
    await Mentor.deleteMany({});
    console.log('Cleared existing mentors.');

    const docs = await Mentor.insertMany(topMentors);
    console.log(`Successfully seeded ${docs.length} mentors!`);

    const total = await Mentor.countDocuments();
    const active = await Mentor.countDocuments({ status: 'Active' });
    const onLeave = await Mentor.countDocuments({ status: 'On Leave' });
    const inactive = await Mentor.countDocuments({ status: 'Inactive' });

    console.log(`Summary: Total: ${total}, Active: ${active} (${Math.round((active/total)*100)}%), On Leave: ${onLeave} (${Math.round((onLeave/total)*100)}%), Inactive: ${inactive}`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding mentors:', err);
    process.exit(1);
  }
}

seed();
