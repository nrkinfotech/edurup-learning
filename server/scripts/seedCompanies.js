const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch(e) {}

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Company = require('../models/Company');

const primaryCompanies = [
  // 1
  {
    order: 1,
    name: 'Amazon',
    logo: 'amazon',
    industry: 'IT Services',
    location: 'Bengaluru',
    partnershipType: 'Hiring Partner',
    openRoles: 12,
    status: 'Active',
    contactPerson: {
      name: 'Mr. Rajiv Sharma',
      title: 'Talent Acquisition Manager'
    },
    email: 'rajiv.sharma@amazon.com',
    phone: '+91 98765 43210',
    website: 'www.amazon.in',
    since: 'Jan 2024',
    about: 'Amazon is a global technology company focused on e-commerce, cloud computing, digital streaming and artificial intelligence.',
    hiringFocus: ['Data Analyst', 'Data Scientist', 'Software Developer', 'Business Analyst'],
    recentActivity: [
      { icon: 'fa-circle-check', iconColor: 'green', title: 'Hiring Drive – Data Analyst (Oct 2026)', date: '10 Oct 2026' },
      { icon: 'fa-comment-dots', iconColor: 'blue', title: 'Interaction Call – Partnership Review', date: '28 Sep 2026' },
      { icon: 'fa-users', iconColor: 'purple', title: 'New Roles Shared (5)', date: '20 Sep 2026' }
    ],
    openRolesList: [
      { title: 'Data Analytics Intern', domain: 'Data Analytics', openings: 10, stipend: '₹15,000', deadline: '10 Nov 2026' },
      { title: 'Product Growth Analyst', domain: 'Analytics', openings: 4, stipend: '₹22,000', deadline: '16 Nov 2026' },
      { title: 'AWS Infrastructure Intern', domain: 'Cloud / DevOps', openings: 5, stipend: '₹25,000', deadline: '02 Dec 2026' }
    ],
    interactionsList: [
      { type: 'Call', title: 'Quarterly Partnership Review', date: '28 Sep 2026', attendees: 'Rajiv Sharma, Placement Team', notes: 'Agreed on 25 intern allocations for next cohort.' },
      { type: 'Drive', title: 'On-campus Online Assessment', date: '10 Oct 2026', attendees: '48 candidates', notes: 'Online coding and aptitude tests completed.' }
    ],
    notes: [
      { author: 'Super Admin', text: 'Amazon expressed interest in taking top 10% students directly into AWS SDE pipelines.', date: '15 Oct 2026' }
    ]
  },
  // 2
  {
    order: 2,
    name: 'Microsoft',
    logo: 'microsoft',
    industry: 'IT Services',
    location: 'Bengaluru',
    partnershipType: 'Hiring Partner',
    openRoles: 8,
    status: 'Active',
    contactPerson: {
      name: 'Ms. Pooja Narang',
      title: 'Campus Recruitment Lead'
    },
    email: 'pooja.narang@microsoft.com',
    phone: '+91 98765 43211',
    website: 'www.microsoft.com',
    since: 'Mar 2023',
    about: 'Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.',
    hiringFocus: ['Frontend Developer', 'Full Stack Developer', 'Cloud Engineer'],
    recentActivity: [
      { icon: 'fa-circle-check', iconColor: 'green', title: 'Campus Drive – Frontend React (Sep 2026)', date: '15 Sep 2026' },
      { icon: 'fa-comment-dots', iconColor: 'blue', title: 'Curriculum Alignment Meeting', date: '02 Aug 2026' }
    ]
  },
  // 3
  {
    order: 3,
    name: 'Deloitte',
    logo: 'deloitte',
    industry: 'Consulting',
    location: 'Bengaluru',
    partnershipType: 'Placement Partner',
    openRoles: 15,
    status: 'Active',
    contactPerson: {
      name: 'Mr. Vikram Sen',
      title: 'Head of Strategy & Hiring'
    },
    email: 'vikram.sen@deloitte.com',
    phone: '+91 98765 43212',
    website: 'www.deloitte.com',
    since: 'Aug 2023',
    about: 'Deloitte provides industry-leading audit and assurance, tax and legal, consulting, and risk advisory services.',
    hiringFocus: ['Management Consultant', 'Digital Marketer', 'Risk Analyst', 'Business Analyst'],
    recentActivity: [
      { icon: 'fa-users', iconColor: 'purple', title: 'Annual Consulting Hiring Drive', date: '05 Oct 2026' },
      { icon: 'fa-circle-check', iconColor: 'green', title: '12 Students Placed', date: '25 Sep 2026' }
    ]
  },
  // 4
  {
    order: 4,
    name: 'Accenture',
    logo: 'accenture',
    industry: 'IT Services',
    location: 'Bengaluru',
    partnershipType: 'Hiring Partner',
    openRoles: 10,
    status: 'Active',
    contactPerson: {
      name: 'Ms. Shalini Roy',
      title: 'Workforce Engagement Partner'
    },
    email: 'shalini.roy@accenture.com',
    phone: '+91 98765 43213',
    website: 'www.accenture.com',
    since: 'Nov 2023',
    about: 'Accenture is a leading global professional services company, providing a broad range of services and solutions.',
    hiringFocus: ['Marketing Analytics', 'Data Analyst', 'Cloud Associate'],
    recentActivity: [
      { icon: 'fa-comment-dots', iconColor: 'blue', title: 'Tech Stack Strategy Session', date: '18 Sep 2026' }
    ]
  },
  // 5
  {
    order: 5,
    name: 'TCS',
    logo: 'tcs',
    industry: 'IT Services',
    location: 'Bengaluru',
    partnershipType: 'Hiring Partner',
    openRoles: 18,
    status: 'Active',
    contactPerson: {
      name: 'Mr. Rajesh Kumar',
      title: 'National Campus Hiring Manager'
    },
    email: 'rajesh.k@tcs.com',
    phone: '+91 98765 43214',
    website: 'www.tcs.com',
    since: 'Feb 2023',
    about: 'Tata Consultancy Services is an IT services, consulting and business solutions organization.',
    hiringFocus: ['Data Science', 'Machine Learning', 'Java Developer', 'DevOps'],
    recentActivity: [
      { icon: 'fa-circle-check', iconColor: 'green', title: 'TCS National Qualifier Drive', date: '08 Oct 2026' }
    ]
  },
  // 6
  {
    order: 6,
    name: 'Infosys',
    logo: 'infosys',
    industry: 'IT Services',
    location: 'Bengaluru',
    partnershipType: 'Placement Partner',
    openRoles: 14,
    status: 'Active',
    contactPerson: {
      name: 'Ms. Deepa Menon',
      title: 'University Relations Specialist'
    },
    email: 'deepa.menon@infosys.com',
    phone: '+91 98765 43215',
    website: 'www.infosys.com',
    since: 'May 2023',
    about: 'Infosys is a global leader in next-generation digital services and consulting.',
    hiringFocus: ['Business Analyst', 'Statistical Modeler', 'Full Stack MERN', 'SEO Specialist'],
    recentActivity: [
      { icon: 'fa-users', iconColor: 'purple', title: 'Infosys Springboard Hackathon', date: '22 Sep 2026' }
    ]
  },
  // 7
  {
    order: 7,
    name: 'Capgemini',
    logo: 'capgemini',
    industry: 'Consulting',
    location: 'Bengaluru',
    partnershipType: 'Hiring Partner',
    openRoles: 9,
    status: 'Active',
    contactPerson: {
      name: 'Mr. Amit Saxena',
      title: 'Talent Acquisition Lead'
    },
    email: 'amit.saxena@capgemini.com',
    phone: '+91 98765 43216',
    website: 'www.capgemini.com',
    since: 'Jun 2023',
    about: 'Capgemini is a global leader in partnering with companies to transform and manage their business by harnessing technology.',
    hiringFocus: ['UI/UX Design', 'Product Design', 'Tableau BI Developer', 'Snowflake Engineer'],
    recentActivity: [
      { icon: 'fa-circle-check', iconColor: 'green', title: 'Design Sprint Evaluations', date: '12 Oct 2026' }
    ]
  },
  // 8
  {
    order: 8,
    name: 'Wipro',
    logo: 'wipro',
    industry: 'IT Services',
    location: 'Bengaluru',
    partnershipType: 'Placement Partner',
    openRoles: 11,
    status: 'Active',
    contactPerson: {
      name: 'Mr. Suresh Iyer',
      title: 'Campus Program Director'
    },
    email: 'suresh.iyer@wipro.com',
    phone: '+91 98765 43217',
    website: 'www.wipro.com',
    since: 'Sep 2023',
    about: 'Wipro is a leading technology services and consulting company focused on building innovative solutions.',
    hiringFocus: ['Python Developer', 'DevOps & CI/CD', 'Operations Analyst'],
    recentActivity: [
      { icon: 'fa-comment-dots', iconColor: 'blue', title: 'Wipro Elite NTH Kickoff Call', date: '01 Oct 2026' }
    ]
  },
  // 9
  {
    order: 9,
    name: 'HCL Technologies',
    logo: 'hcl',
    industry: 'IT Services',
    location: 'Bengaluru',
    partnershipType: 'Hiring Partner',
    openRoles: 7,
    status: 'Active',
    contactPerson: {
      name: 'Ms. Kavita Das',
      title: 'Strategic Partnership Manager'
    },
    email: 'kavita.das@hcl.com',
    phone: '+91 98765 43218',
    website: 'www.hcltech.com',
    since: 'Oct 2023',
    about: 'HCLTech is a global technology company, home to 220,000+ people across 60 countries.',
    hiringFocus: ['Cloud Operations', 'Power BI Financial Analytics', 'Kubernetes Cluster Admin'],
    recentActivity: [
      { icon: 'fa-users', iconColor: 'purple', title: 'Cloud Infrastructure Orientation', date: '29 Sep 2026' }
    ]
  },
  // 10
  {
    order: 10,
    name: 'Mindtree',
    logo: 'mindtree',
    industry: 'IT Services',
    location: 'Bengaluru',
    partnershipType: 'Hiring Partner',
    openRoles: 6,
    status: 'Inactive',
    contactPerson: {
      name: 'Mr. Anand Krishnan',
      title: 'Talent Partner'
    },
    email: 'anand.k@mindtree.com',
    phone: '+91 98765 43219',
    website: 'www.mindtree.com',
    since: 'Dec 2023',
    about: 'Mindtree is a global technology consulting and services company helping enterprises marry scale with agility.',
    hiringFocus: ['AI/ML Intern', 'Full Stack MERN', 'Computer Vision OCR'],
    recentActivity: [
      { icon: 'fa-comment-dots', iconColor: 'blue', title: 'MOU Renewal Discussion', date: '14 Oct 2026' }
    ]
  }
];

// Generate complementary 240 partners for total 250
const extraNames = [
  'Google', 'Meta', 'IBM', 'Oracle', 'Cisco', 'Adobe', 'Intel', 'Uber', 'Swiggy', 'Zomato',
  'Flipkart', 'Paytm', 'Razorpay', 'PhonePe', 'Nykaa', 'Zerodha', 'CRED', 'Meesho', 'Groww', 'Lenskart',
  'JPMorgan Chase', 'Goldman Sachs', 'Morgan Stanley', 'Citi', 'Standard Chartered', 'HSBC', 'Barclays', 'Wells Fargo',
  'SAP', 'Salesforce', 'ServiceNow', 'Snowflake', 'Palantir', 'Databricks', 'Atlassian', 'Twilio', 'Stripe', 'HubSpot',
  'Zoho', 'Freshworks', 'Postman', 'BrowserStack', 'Hasura', 'Chargebee', 'InMobi', 'Pine Labs', 'BillDesk', 'PolicyBazaar',
  'Cognizant', 'Tech Mahindra', 'LTIMindtree', 'Persistent Systems', 'Coforge', 'Mphasis', 'Birlasoft', 'KPIT Technologies',
  'Tata Elxsi', 'Cyient', 'Happiest Minds', 'Zensar', 'Hexaware', 'Sonata Software', 'Intellect Design', 'Ramco Systems',
  'Bajaj Finserv', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'State Bank of India', 'IndusInd Bank',
  'Reliance Jio', 'Bharti Airtel', 'Tata Communications', 'Vodafone Idea', 'Ericsson', 'Nokia', 'Qualcomm', 'Broadcom',
  'Dell Technologies', 'HP Enterprise', 'Lenovo', 'VMware', 'NetApp', 'NVIDIA', 'AMD', 'Texas Instruments', 'Analog Devices',
  'PwC', 'EY', 'KPMG', 'McKinsey & Company', 'Boston Consulting Group', 'Bain & Company', 'Oliver Wyman', 'Roland Berger'
];

const industries = ['IT Services', 'Consulting', 'FinTech', 'E-Commerce', 'EdTech', 'Healthcare', 'Banking'];
const locations = ['Bengaluru', 'Hyderabad', 'Mumbai', 'Pune', 'Noida', 'Gurugram', 'Chennai', 'Delhi NCR'];
const types = ['Hiring Partner', 'Placement Partner', 'Training Partner'];

for (let i = 11; i <= 250; i++) {
  const nameBase = extraNames[(i - 11) % extraNames.length];
  const name = i > 100 ? `${nameBase} ${Math.floor(i / 100) + 1}` : nameBase;
  const ind = industries[(i * 3) % industries.length];
  const loc = locations[(i * 7) % locations.length];
  const pt = types[(i * 5) % types.length];
  const roles = (i % 7) + 2;
  // Ensure exactly 186 Active partners out of 250 (186 / 250 = ~74%)
  const isAct = (i <= 186);
  const status = isAct ? 'Active' : (i % 3 === 0 ? 'In Discussion' : 'Inactive');

  primaryCompanies.push({
    order: i,
    name,
    logo: 'default',
    industry: ind,
    location: loc,
    partnershipType: pt,
    openRoles: roles,
    status,
    contactPerson: {
      name: `Mr./Ms. Partner Rep ${i}`,
      title: 'Talent Acquisition Team'
    },
    email: `careers@${nameBase.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    phone: `+91 98${(10000000 + i).toString().slice(0, 8)}`,
    website: `www.${nameBase.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    since: `${['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'][i % 6]} 202${(i % 3) + 2}`,
    about: `${name} is an enterprise leader in ${ind} partnering with Edurup for campus and lateral internship placement programs.`,
    hiringFocus: ['Software Engineer', 'Data Analyst', 'Cloud Associate'],
    recentActivity: [
      { icon: 'fa-circle-check', iconColor: 'green', title: `Hiring Drive (${ind})`, date: 'Sep 2026' }
    ]
  });
}

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB Atlas...');
    await Company.deleteMany({});
    console.log('Cleared existing companies.');

    const docs = await Company.insertMany(primaryCompanies);
    console.log(`Successfully seeded ${docs.length} companies!`);

    const total = await Company.countDocuments();
    const active = await Company.countDocuments({ status: 'Active' });
    const inactive = await Company.countDocuments({ status: 'Inactive' });
    const inDiscussion = await Company.countDocuments({ status: 'In Discussion' });

    console.log(`Summary: Total Companies: ${total}, Active: ${active}, Inactive: ${inactive}, In Discussion: ${inDiscussion}`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding companies:', err);
    process.exit(1);
  }
}

seed();
