const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch(e) {}

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const PartnerRequest = require('../models/PartnerRequest');

const topRequests = [
  // 1 - Amazon
  {
    order: 1,
    companyName: 'Amazon',
    companyLogo: 'amazon',
    industry: 'IT Services',
    location: 'Bengaluru',
    fullLocation: 'Bengaluru, India',
    requestType: 'Partnership',
    domains: ['Data Analytics', 'AI/ML'],
    receivedOn: '12 Nov 2026',
    receivedOnTime: '12 Nov 2026, 11:20 AM',
    receivedDate: new Date('2026-11-12T11:20:00Z'),
    contactPerson: {
      name: 'Rahul Sharma',
      designation: 'Talent Manager',
      email: 'rahul.sharma@amazon.com',
      phone: '+91 98765 43210'
    },
    website: 'www.amazon.com',
    status: 'Approved',
    message: 'We would like to collaborate with Edurup Learning for internship opportunities, student hiring, and joint training initiatives in the Data Analytics and AI/ML domains.',
    attachments: [
      { name: 'Partnership_Proposal.pdf', size: '2.4 MB', type: 'pdf', url: '#' },
      { name: 'Company_Profile.pdf', size: '1.8 MB', type: 'pdf', url: '#' },
      { name: 'Internship_Guidelines.docx', size: '534 KB', type: 'docx', url: '#' }
    ],
    documentsCount: 3,
    notesCount: 2,
    notes: [
      { author: 'Admin Lead', text: 'Reviewed proposal with executive committee. Approved joint curriculum for Q1.', date: '12 Nov 2026' },
      { author: 'Rahul Sharma', text: 'Shared updated internship stipend guidelines and cohort schedule.', date: '12 Nov 2026' }
    ],
    activity: [
      { title: 'Status changed to Approved', date: '12 Nov 2026, 02:40 PM', user: 'Admin' },
      { title: 'Proposal documents downloaded by Academic Council', date: '12 Nov 2026, 01:15 PM', user: 'System' },
      { title: 'Partner request submitted by Rahul Sharma', date: '12 Nov 2026, 11:20 AM', user: 'Amazon Team' }
    ]
  },
  // 2 - Microsoft
  {
    order: 2,
    companyName: 'Microsoft',
    companyLogo: 'microsoft',
    industry: 'Cloud & Enterprise',
    location: 'Hyderabad',
    fullLocation: 'Hyderabad, India',
    requestType: 'Internship Collaboration',
    domains: ['Full Stack', 'Cloud'],
    receivedOn: '11 Nov 2026',
    receivedOnTime: '11 Nov 2026, 03:45 PM',
    receivedDate: new Date('2026-11-11T15:45:00Z'),
    contactPerson: {
      name: 'Priya Mehta',
      designation: 'Campus Lead',
      email: 'priya.mehta@microsoft.com',
      phone: '+91 98765 43211'
    },
    website: 'www.microsoft.com',
    status: 'Under Review',
    message: 'Looking to partner with Edurup Learning for our upcoming Azure & Full Stack Summer Internship program. We seek 40 top-performing engineers.',
    attachments: [
      { name: 'Azure_Internship_Brochure.pdf', size: '3.1 MB', type: 'pdf', url: '#' },
      { name: 'Selection_Criteria.pdf', size: '1.2 MB', type: 'pdf', url: '#' },
      { name: 'Campus_Agreement_Draft.docx', size: '420 KB', type: 'docx', url: '#' }
    ],
    documentsCount: 3,
    notesCount: 1,
    notes: [
      { author: 'Placement Team', text: 'Evaluating candidate pipeline against Microsoft CGPA cut-off of 7.5.', date: '11 Nov 2026' }
    ],
    activity: [
      { title: 'Request marked Under Review', date: '11 Nov 2026, 04:10 PM', user: 'Admin' },
      { title: 'Request submitted by Priya Mehta', date: '11 Nov 2026, 03:45 PM', user: 'Microsoft Lead' }
    ]
  },
  // 3 - Deloitte
  {
    order: 3,
    companyName: 'Deloitte',
    companyLogo: 'deloitte',
    industry: 'Consulting & Analytics',
    location: 'Mumbai',
    fullLocation: 'Mumbai, India',
    requestType: 'Hiring Partner',
    domains: ['Data Science', 'Analytics'],
    receivedOn: '10 Nov 2026',
    receivedOnTime: '10 Nov 2026, 10:15 AM',
    receivedDate: new Date('2026-11-10T10:15:00Z'),
    contactPerson: {
      name: 'Ankit Verma',
      designation: 'HR Manager',
      email: 'ankit.verma@deloitte.com',
      phone: '+91 98765 43212'
    },
    website: 'www.deloitte.com',
    status: 'Approved',
    message: 'Deloitte USI Analytics wing is conducting exclusive on-campus hiring drives for graduate trainees and Junior Data Scientists.',
    attachments: [
      { name: 'Deloitte_Hiring_Spec_2026.pdf', size: '1.9 MB', type: 'pdf', url: '#' },
      { name: 'Company_Overview.pdf', size: '2.5 MB', type: 'pdf', url: '#' },
      { name: 'JD_Data_Scientist.pdf', size: '890 KB', type: 'pdf', url: '#' }
    ],
    documentsCount: 3,
    notesCount: 2,
    notes: [
      { author: 'Corporate Relations', text: 'Onboarding approved. Slot 1 scheduled for Nov 28th.', date: '10 Nov 2026' }
    ],
    activity: [
      { title: 'Approved and added to Hiring Partners list', date: '10 Nov 2026, 02:00 PM', user: 'Admin' },
      { title: 'Submitted by Ankit Verma', date: '10 Nov 2026, 10:15 AM', user: 'Deloitte HR' }
    ]
  },
  // 4 - TCS
  {
    order: 4,
    companyName: 'TCS',
    companyLogo: 'tcs',
    industry: 'IT Services',
    location: 'Chennai',
    fullLocation: 'Chennai, India',
    requestType: 'Internship Collaboration',
    domains: ['Data Analytics', 'Python'],
    receivedOn: '09 Nov 2026',
    receivedOnTime: '09 Nov 2026, 09:30 AM',
    receivedDate: new Date('2026-11-09T09:30:00Z'),
    contactPerson: {
      name: 'Sneha Reddy',
      designation: 'Talent Acquisition',
      email: 'sneha.reddy@tcs.com',
      phone: '+91 98765 43213'
    },
    website: 'www.tcs.com',
    status: 'Awaiting Info',
    message: 'TCS Digital is looking for internship candidates versed in Python, ETL pipelines, and Data Analytics. Awaiting stipend sign-off from corporate.',
    attachments: [
      { name: 'TCS_Digital_Outline.pdf', size: '2.0 MB', type: 'pdf', url: '#' },
      { name: 'TCS_Compliance_Checklist.pdf', size: '750 KB', type: 'pdf', url: '#' }
    ],
    documentsCount: 2,
    notesCount: 2,
    notes: [
      { author: 'Admin', text: 'Requested updated stipend bracket and mentor contact details.', date: '09 Nov 2026' }
    ],
    activity: [
      { title: 'Status changed to Awaiting Info', date: '09 Nov 2026, 12:00 PM', user: 'Admin' },
      { title: 'Submitted by Sneha Reddy', date: '09 Nov 2026, 09:30 AM', user: 'TCS TA' }
    ]
  },
  // 5 - Infosys
  {
    order: 5,
    companyName: 'Infosys',
    companyLogo: 'infosys',
    industry: 'IT & Consulting',
    location: 'Bengaluru',
    fullLocation: 'Bengaluru, India',
    requestType: 'Partnership',
    domains: ['Training', 'Placements'],
    receivedOn: '08 Nov 2026',
    receivedOnTime: '08 Nov 2026, 02:20 PM',
    receivedDate: new Date('2026-11-08T14:20:00Z'),
    contactPerson: {
      name: 'Vikram Rao',
      designation: 'Engagement Lead',
      email: 'vikram.rao@infosys.com',
      phone: '+91 98765 43214'
    },
    website: 'www.infosys.com',
    status: 'Under Review',
    message: 'Infosys Springboard collaboration proposal for co-branded certification, faculty development, and pre-placement training modules.',
    attachments: [
      { name: 'Springboard_Partnership_MOU.pdf', size: '4.2 MB', type: 'pdf', url: '#' },
      { name: 'Course_Mapping.xlsx', size: '620 KB', type: 'docx', url: '#' }
    ],
    documentsCount: 2,
    notesCount: 1,
    notes: [
      { author: 'Curriculum Team', text: 'Matching Infosys curriculum with our Semester 6 & 7 modules.', date: '08 Nov 2026' }
    ],
    activity: [
      { title: 'Marked Under Review', date: '08 Nov 2026, 03:00 PM', user: 'Admin' },
      { title: 'Submitted by Vikram Rao', date: '08 Nov 2026, 02:20 PM', user: 'Infosys Lead' }
    ]
  },
  // 6 - Wipro
  {
    order: 6,
    companyName: 'Wipro',
    companyLogo: 'wipro',
    industry: 'Technology Services',
    location: 'Bengaluru',
    fullLocation: 'Bengaluru, India',
    requestType: 'Hiring Partner',
    domains: ['Full Stack', 'DevOps'],
    receivedOn: '07 Nov 2026',
    receivedOnTime: '07 Nov 2026, 11:00 AM',
    receivedDate: new Date('2026-11-07T11:00:00Z'),
    contactPerson: {
      name: 'Kavya Nair',
      designation: 'HR Specialist',
      email: 'kavya.nair@wipro.com',
      phone: '+91 98765 43215'
    },
    website: 'www.wipro.com',
    status: 'Approved',
    message: 'Wipro Turbo & Elite national hiring programs are seeking students trained in MERN stack and CI/CD pipelines.',
    attachments: [
      { name: 'Wipro_Turbo_JD.pdf', size: '1.5 MB', type: 'pdf', url: '#' },
      { name: 'Eligibility_Rules.pdf', size: '920 KB', type: 'pdf', url: '#' }
    ],
    documentsCount: 2,
    notesCount: 1,
    notes: [
      { author: 'Admin', text: 'Approved for virtual hiring slot on December 5th.', date: '07 Nov 2026' }
    ],
    activity: [
      { title: 'Approved as Hiring Partner', date: '07 Nov 2026, 01:30 PM', user: 'Admin' }
    ]
  },
  // 7 - Capgemini
  {
    order: 7,
    companyName: 'Capgemini',
    companyLogo: 'capgemini',
    industry: 'Digital Transformation',
    location: 'Pune',
    fullLocation: 'Pune, India',
    requestType: 'Internship Collaboration',
    domains: ['Cloud', 'Data Science'],
    receivedOn: '06 Nov 2026',
    receivedOnTime: '06 Nov 2026, 04:15 PM',
    receivedDate: new Date('2026-11-06T16:15:00Z'),
    contactPerson: {
      name: 'Arjun Menon',
      designation: 'Program Manager',
      email: 'arjun.menon@capgemini.com',
      phone: '+91 98765 43216'
    },
    website: 'www.capgemini.com',
    status: 'Awaiting Info',
    message: 'Capgemini Invent seeks collaboration for student live projects and 6-month internship credits. Awaiting project scope document.',
    attachments: [
      { name: 'Capgemini_Internship_Brief.pdf', size: '2.8 MB', type: 'pdf', url: '#' }
    ],
    documentsCount: 1,
    notesCount: 1,
    notes: [
      { author: 'Admin', text: 'Followed up via email regarding project mentors and stipend budget.', date: '06 Nov 2026' }
    ],
    activity: [
      { title: 'Marked Awaiting Info', date: '06 Nov 2026, 05:00 PM', user: 'Admin' }
    ]
  },
  // 8 - HCL
  {
    order: 8,
    companyName: 'HCL',
    companyLogo: 'hcl',
    industry: 'Enterprise Software',
    location: 'Noida',
    fullLocation: 'Noida, India',
    requestType: 'Partnership',
    domains: ['AI/ML', 'Automation'],
    receivedOn: '05 Nov 2026',
    receivedOnTime: '05 Nov 2026, 01:10 PM',
    receivedDate: new Date('2026-11-05T13:10:00Z'),
    contactPerson: {
      name: 'Rohit Singh',
      designation: 'Talent Lead',
      email: 'rohit.singh@hcltech.com',
      phone: '+91 98765 43217'
    },
    website: 'www.hcltech.com',
    status: 'Rejected',
    message: 'Partnership request for unpaid automation training. Did not meet our minimum stipend and placement assurance criteria.',
    attachments: [
      { name: 'HCL_Proposal_Rev1.pdf', size: '1.4 MB', type: 'pdf', url: '#' }
    ],
    documentsCount: 1,
    notesCount: 2,
    notes: [
      { author: 'Placement Committee', text: 'Rejected due to lack of paid stipend and mandatory bond clause.', date: '05 Nov 2026' }
    ],
    activity: [
      { title: 'Request Rejected', date: '05 Nov 2026, 03:20 PM', user: 'Admin' }
    ]
  },
  // 9 - Accenture
  {
    order: 9,
    companyName: 'Accenture',
    companyLogo: 'accenture',
    industry: 'Strategy & Consulting',
    location: 'Gurugram',
    fullLocation: 'Gurugram, India',
    requestType: 'Hiring Partner',
    domains: ['Data Analytics', 'Business Analyst'],
    receivedOn: '04 Nov 2026',
    receivedOnTime: '04 Nov 2026, 11:30 AM',
    receivedDate: new Date('2026-11-04T11:30:00Z'),
    contactPerson: {
      name: 'Meera Iyer',
      designation: 'Recruiter',
      email: 'meera.iyer@accenture.com',
      phone: '+91 98765 43218'
    },
    website: 'www.accenture.com',
    status: 'Under Review',
    message: 'Accenture Strategy & Consulting group requesting priority placement slot for Business Analyst and Functional Consulting roles.',
    attachments: [
      { name: 'Accenture_BA_Job_Spec.pdf', size: '2.1 MB', type: 'pdf', url: '#' },
      { name: 'Compensation_Structure.pdf', size: '840 KB', type: 'pdf', url: '#' }
    ],
    documentsCount: 2,
    notesCount: 1,
    notes: [
      { author: 'Admin', text: 'Scheduling call with Meera Iyer to finalize assessment platform integration.', date: '04 Nov 2026' }
    ],
    activity: [
      { title: 'Marked Under Review', date: '04 Nov 2026, 12:15 PM', user: 'Admin' }
    ]
  },
  // 10 - Flipkart
  {
    order: 10,
    companyName: 'Flipkart',
    companyLogo: 'flipkart',
    industry: 'E-Commerce & Tech',
    location: 'Bengaluru',
    fullLocation: 'Bengaluru, India',
    requestType: 'Internship Collaboration',
    domains: ['Product', 'Analytics'],
    receivedOn: '03 Nov 2026',
    receivedOnTime: '03 Nov 2026, 09:15 AM',
    receivedDate: new Date('2026-11-03T09:15:00Z'),
    contactPerson: {
      name: 'Deepak Kumar',
      designation: 'Program Lead',
      email: 'deepak.kumar@flipkart.com',
      phone: '+91 98765 43219'
    },
    website: 'www.flipkart.com',
    status: 'Approved',
    message: 'Flipkart WiRED and Runway internship programs seeking students skilled in Product Management, SQL, and Consumer Analytics.',
    attachments: [
      { name: 'Flipkart_Runway_Specs.pdf', size: '3.4 MB', type: 'pdf', url: '#' },
      { name: 'Assessment_Format.pdf', size: '1.1 MB', type: 'pdf', url: '#' },
      { name: 'Campus_Agreement.docx', size: '510 KB', type: 'docx', url: '#' }
    ],
    documentsCount: 3,
    notesCount: 2,
    notes: [
      { author: 'Admin', text: 'Agreement signed. Hackathon phase to commence late November.', date: '03 Nov 2026' }
    ],
    activity: [
      { title: 'Approved and MOU executed', date: '03 Nov 2026, 02:45 PM', user: 'Admin' }
    ]
  }
];

// Target totals:
// Total: 58
// Approved: 22 (top 10 has 4 -> need 18)
// Under Review: 12 (top 10 has 3 -> need 9)
// Awaiting Info: 18 (top 10 has 2 -> need 16)
// Rejected: 6 (top 10 has 1 -> need 5)
// Sum needed: 18 + 9 + 16 + 5 = 48. Total = 10 + 48 = 58!

const remainingCompanies = [
  // 18 Approved
  { name: 'Google', logo: 'google', ind: 'Cloud & AI', loc: 'Hyderabad, India', type: 'Partnership', dom: ['AI/ML', 'Cloud'], contact: 'Sundar Narayanan', des: 'University Relations', status: 'Approved' },
  { name: 'IBM', logo: 'ibm', ind: 'Enterprise Software', loc: 'Bengaluru, India', type: 'Hiring Partner', dom: ['Cloud', 'DevOps'], contact: 'Naveen Swaminathan', des: 'Talent Partner', status: 'Approved' },
  { name: 'Oracle', logo: 'oracle', ind: 'Database & Cloud', loc: 'Bengaluru, India', type: 'Internship Collaboration', dom: ['Full Stack', 'Data Analytics'], contact: 'Siddharth Sen', des: 'Campus Recruiter', status: 'Approved' },
  { name: 'Adobe', logo: 'adobe', ind: 'Creative Tech', loc: 'Noida, India', type: 'Partnership', dom: ['UI/UX', 'Product'], contact: 'Ritu Kapoor', des: 'Lead Talent Partner', status: 'Approved' },
  { name: 'Salesforce', logo: 'salesforce', ind: 'SaaS Platform', loc: 'Hyderabad, India', type: 'Hiring Partner', dom: ['Cloud', 'DevOps'], contact: 'Tanvi Saxena', des: 'HR Business Partner', status: 'Approved' },
  { name: 'Goldman Sachs', logo: 'goldmansachs', ind: 'FinTech & Banking', loc: 'Bengaluru, India', type: 'Hiring Partner', dom: ['Data Science', 'Python'], contact: 'Karan Mehra', des: 'Campus Lead', status: 'Approved' },
  { name: 'JP Morgan Chase', logo: 'jpmorgan', ind: 'FinTech', loc: 'Mumbai, India', type: 'Partnership', dom: ['Full Stack', 'Data Analytics'], contact: 'Ananya Gupta', des: 'University Programs', status: 'Approved' },
  { name: 'Morgan Stanley', logo: 'morganstanley', ind: 'Investment Banking', loc: 'Mumbai, India', type: 'Internship Collaboration', dom: ['Python', 'Data Analytics'], contact: 'Abhishek Jha', des: 'Tech Talent Manager', status: 'Approved' },
  { name: 'Intel', logo: 'intel', ind: 'Semiconductor & AI', loc: 'Bengaluru, India', type: 'Partnership', dom: ['AI/ML', 'Automation'], contact: 'Pooja Hegde', des: 'Academic Relations', status: 'Approved' },
  { name: 'Cisco', logo: 'cisco', ind: 'Networking & Cloud', loc: 'Bengaluru, India', type: 'Hiring Partner', dom: ['DevOps', 'Cloud'], contact: 'Vijay Kulkarni', des: 'Recruiting Lead', status: 'Approved' },
  { name: 'Paytm', logo: 'paytm', ind: 'FinTech & Payments', loc: 'Noida, India', type: 'Internship Collaboration', dom: ['Full Stack', 'Product'], contact: 'Shreya Joshi', des: 'HR Specialist', status: 'Approved' },
  { name: 'PhonePe', logo: 'phonepe', ind: 'Digital Payments', loc: 'Bengaluru, India', type: 'Hiring Partner', dom: ['Full Stack', 'DevOps'], contact: 'Manish Pandey', des: 'Staffing Lead', status: 'Approved' },
  { name: 'Swiggy', logo: 'swiggy', ind: 'FoodTech & Logistics', loc: 'Bengaluru, India', type: 'Internship Collaboration', dom: ['Data Analytics', 'Python'], contact: 'Divya R', des: 'Talent Acquisition', status: 'Approved' },
  { name: 'Zomato', logo: 'zomato', ind: 'FoodTech', loc: 'Gurugram, India', type: 'Partnership', dom: ['Product', 'Analytics'], contact: 'Varun Grover', des: 'Campus Relations', status: 'Approved' },
  { name: 'Razorpay', logo: 'razorpay', ind: 'FinTech Infrastructure', loc: 'Bengaluru, India', type: 'Hiring Partner', dom: ['Full Stack', 'Cloud'], contact: 'Aditi Chawla', des: 'HR Manager', status: 'Approved' },
  { name: 'Tata Motors', logo: 'tatamotors', ind: 'Automotive & EV', loc: 'Pune, India', type: 'Partnership', dom: ['Automation', 'AI/ML'], contact: 'Suresh Patil', des: 'DGM HR', status: 'Approved' },
  { name: 'Reliance Jio', logo: 'jio', ind: 'Telecom & Tech', loc: 'Mumbai, India', type: 'Hiring Partner', dom: ['Cloud', 'DevOps'], contact: 'Rajesh Shah', des: 'Talent Partner', status: 'Approved' },
  { name: 'Bharti Airtel', logo: 'airtel', ind: 'Telecom & Digital', loc: 'Gurugram, India', type: 'Internship Collaboration', dom: ['Data Analytics', 'Full Stack'], contact: 'Simran Walia', des: 'Campus Specialist', status: 'Approved' },

  // 9 Under Review
  { name: 'Cognizant', logo: 'cognizant', ind: 'IT Services', loc: 'Chennai, India', type: 'Partnership', dom: ['Full Stack', 'Cloud'], contact: 'Harish Babu', des: 'Corporate Lead', status: 'Under Review' },
  { name: 'Tech Mahindra', logo: 'techmahindra', ind: 'IT Consulting', loc: 'Pune, India', type: 'Hiring Partner', dom: ['AI/ML', 'DevOps'], contact: 'Pankaj Vats', des: 'Talent Acquisition', status: 'Under Review' },
  { name: 'L&T Technology', logo: 'lnt', ind: 'Engineering Services', loc: 'Vadodara, India', type: 'Internship Collaboration', dom: ['Automation', 'Python'], contact: 'Gaurav Desai', des: 'Campus Head', status: 'Under Review' },
  { name: 'Siemens', logo: 'siemens', ind: 'Industrial Automation', loc: 'Bengaluru, India', type: 'Partnership', dom: ['AI/ML', 'Automation'], contact: 'Bhavna Roy', des: 'University Lead', status: 'Under Review' },
  { name: 'Dell Technologies', logo: 'dell', ind: 'Enterprise Hardware & Cloud', loc: 'Bengaluru, India', type: 'Hiring Partner', dom: ['Cloud', 'Full Stack'], contact: 'Tarun Mathur', des: 'HR Specialist', status: 'Under Review' },
  { name: 'HP Inc', logo: 'hp', ind: 'Personal Systems', loc: 'Bengaluru, India', type: 'Internship Collaboration', dom: ['Product', 'UI/UX'], contact: 'Akanksha Sen', des: 'University Recruiter', status: 'Under Review' },
  { name: 'Nutanix', logo: 'nutanix', ind: 'Cloud Infrastructure', loc: 'Bengaluru, India', type: 'Partnership', dom: ['Cloud', 'DevOps'], contact: 'Kishore J', des: 'Staffing Director', status: 'Under Review' },
  { name: 'Atlassian', logo: 'atlassian', ind: 'Productivity Software', loc: 'Bengaluru, India', type: 'Hiring Partner', dom: ['Full Stack', 'DevOps'], contact: 'Pallavi Rao', des: 'Lead Campus Recruiter', status: 'Under Review' },
  { name: 'ServiceNow', logo: 'servicenow', ind: 'Enterprise Cloud', loc: 'Hyderabad, India', type: 'Internship Collaboration', dom: ['Cloud', 'Full Stack'], contact: 'Vivek Sharma', des: 'University Relations', status: 'Under Review' },

  // 16 Awaiting Info
  { name: 'Uber', logo: 'uber', ind: 'Mobility & Tech', loc: 'Hyderabad, India', type: 'Internship Collaboration', dom: ['Data Analytics', 'Python'], contact: 'Nidhi Singhal', des: 'Talent Acquisition', status: 'Awaiting Info' },
  { name: 'Ola', logo: 'ola', ind: 'EV & Mobility', loc: 'Bengaluru, India', type: 'Hiring Partner', dom: ['Full Stack', 'Automation'], contact: 'Rohan Deshmukh', des: 'HR Partner', status: 'Awaiting Info' },
  { name: 'MakeMyTrip', logo: 'makemytrip', ind: 'Travel Tech', loc: 'Gurugram, India', type: 'Partnership', dom: ['UI/UX', 'Product'], contact: 'Swati Seth', des: 'People Operations', status: 'Awaiting Info' },
  { name: 'Nykaa', logo: 'nykaa', ind: 'Beauty & E-Commerce', loc: 'Mumbai, India', type: 'Internship Collaboration', dom: ['Data Analytics', 'Marketing'], contact: 'Aanchal Jain', des: 'Campus Partner', status: 'Awaiting Info' },
  { name: 'Cred', logo: 'cred', ind: 'FinTech', loc: 'Bengaluru, India', type: 'Hiring Partner', dom: ['Full Stack', 'UI/UX'], contact: 'Gautam Trivedi', des: 'Talent Lead', status: 'Awaiting Info' },
  { name: 'Groww', logo: 'groww', ind: 'Investment Tech', loc: 'Bengaluru, India', type: 'Partnership', dom: ['Data Science', 'Analytics'], contact: 'Vandana Mishra', des: 'HR Specialist', status: 'Awaiting Info' },
  { name: 'Zerodha', logo: 'zerodha', ind: 'FinTech Broking', loc: 'Bengaluru, India', type: 'Internship Collaboration', dom: ['Python', 'Full Stack'], contact: 'Mohan S', des: 'Lead Engineer & Recruiter', status: 'Awaiting Info' },
  { name: 'Meesho', logo: 'meesho', ind: 'Social Commerce', loc: 'Bengaluru, India', type: 'Hiring Partner', dom: ['Product', 'Analytics'], contact: 'Juhi Chawla', des: 'Talent Partner', status: 'Awaiting Info' },
  { name: 'Urban Company', logo: 'urbancompany', ind: 'Services Marketplace', loc: 'Gurugram, India', type: 'Partnership', dom: ['Full Stack', 'DevOps'], contact: 'Kartik Somani', des: 'HR Lead', status: 'Awaiting Info' },
  { name: 'PolicyBazaar', logo: 'policybazaar', ind: 'InsurTech', loc: 'Gurugram, India', type: 'Internship Collaboration', dom: ['Data Analytics', 'Python'], contact: 'Shruti Agrawal', des: 'Recruiter', status: 'Awaiting Info' },
  { name: 'Freshworks', logo: 'freshworks', ind: 'SaaS Customer Engagement', loc: 'Chennai, India', type: 'Hiring Partner', dom: ['Full Stack', 'Cloud'], contact: 'Murali Krishnan', des: 'Lead TA', status: 'Awaiting Info' },
  { name: 'Zoho Corporation', logo: 'zoho', ind: 'Cloud Office Suites', loc: 'Chennai, India', type: 'Partnership', dom: ['Full Stack', 'Training'], contact: 'Selvam R', des: 'Zoho Schools Lead', status: 'Awaiting Info' },
  { name: 'Postman', logo: 'postman', ind: 'API Platform', loc: 'Bengaluru, India', type: 'Internship Collaboration', dom: ['Full Stack', 'DevOps'], contact: 'Deepali Sen', des: 'Staffing Manager', status: 'Awaiting Info' },
  { name: 'BrowserStack', logo: 'browserstack', ind: 'Testing Infrastructure', loc: 'Mumbai, India', type: 'Hiring Partner', dom: ['DevOps', 'Automation'], contact: 'Jayant Vohra', des: 'Campus Lead', status: 'Awaiting Info' },
  { name: 'InMobi', logo: 'inmobi', ind: 'AdTech & AI', loc: 'Bengaluru, India', type: 'Partnership', dom: ['AI/ML', 'Data Analytics'], contact: 'Prachi Saxena', des: 'HR Partner', status: 'Awaiting Info' },
  { name: 'Mindtree', logo: 'mindtree', ind: 'IT Consulting', loc: 'Bengaluru, India', type: 'Internship Collaboration', dom: ['Cloud', 'DevOps'], contact: 'Alok Nanda', des: 'Talent Partner', status: 'Awaiting Info' },

  // 5 Rejected
  { name: 'Unacademy', logo: 'unacademy', ind: 'EdTech', loc: 'Bengaluru, India', type: 'Partnership', dom: ['Full Stack', 'Training'], contact: 'Rishabh Dixit', des: 'Corporate Partnerships', status: 'Rejected' },
  { name: 'Byju’s', logo: 'byjus', ind: 'EdTech', loc: 'Bengaluru, India', type: 'Hiring Partner', dom: ['Sales', 'Business Development'], contact: 'Prashant Nair', des: 'Recruitment Lead', status: 'Rejected' },
  { name: 'CryptoHub India', logo: 'cryptohub', ind: 'Blockchain', loc: 'Mumbai, India', type: 'Partnership', dom: ['Web3', 'Blockchain'], contact: 'Arman Mallik', des: 'Partnership Manager', status: 'Rejected' },
  { name: 'FastTrack Placement', logo: 'fasttrack', ind: 'Staffing Agency', loc: 'Delhi, India', type: 'Hiring Partner', dom: ['Placements', 'Training'], contact: 'Sanjay Aggarwal', des: 'Director', status: 'Rejected' },
  { name: 'Global Skill Ventures', logo: 'globalskill', ind: 'Third-party Training', loc: 'Noida, India', type: 'Partnership', dom: ['Training', 'Automation'], contact: 'Ashok Tyagi', des: 'Managing Partner', status: 'Rejected' }
];

async function seedPartnerRequests() {
  try {
    await connectDB();
    console.log('Connected to MongoDB. Seeding Partner Requests...');

    await PartnerRequest.deleteMany({});
    console.log('Cleared existing Partner Requests.');

    const allRequests = [...topRequests];

    let orderNum = 11;
    for (let c of remainingCompanies) {
      const dayOffset = Math.floor(Math.random() * 25) + 1; // Nov 1 - 25
      const dayStr = dayOffset < 10 ? `0${dayOffset}` : `${dayOffset}`;
      const recDate = new Date(`2026-11-${dayStr}T10:30:00Z`);

      allRequests.push({
        order: orderNum++,
        companyName: c.name,
        companyLogo: c.logo,
        industry: c.ind,
        location: c.loc.split(',')[0].trim(),
        fullLocation: c.loc,
        requestType: c.type,
        domains: c.dom,
        receivedOn: `${dayStr} Nov 2026`,
        receivedOnTime: `${dayStr} Nov 2026, 10:30 AM`,
        receivedDate: recDate,
        contactPerson: {
          name: c.contact,
          designation: c.des,
          email: `${c.contact.toLowerCase().replace(/[^a-z]/g, '')}@${c.name.toLowerCase().replace(/[^a-z]/g, '')}.com`,
          phone: `+91 ${Math.floor(7000000000 + Math.random() * 2999999999)}`
        },
        website: `www.${c.name.toLowerCase().replace(/[^a-z]/g, '')}.com`,
        status: c.status,
        message: `Inquiry from ${c.name} regarding prospective ${c.type} collaboration for Edurup students in ${c.dom.join(', ')}.`,
        attachments: [
          { name: `${c.name.replace(/[^a-zA-Z]/g, '_')}_Collaboration_Doc.pdf`, size: '2.1 MB', type: 'pdf', url: '#' },
          { name: `Company_Profile_${c.name.replace(/[^a-zA-Z]/g, '')}.pdf`, size: '1.4 MB', type: 'pdf', url: '#' }
        ],
        documentsCount: 2,
        notesCount: 1,
        notes: [
          { author: 'Admin', text: `Profile received and logged under status: ${c.status}.`, date: `${dayStr} Nov 2026` }
        ],
        activity: [
          { title: `Request status set to ${c.status}`, date: `${dayStr} Nov 2026`, user: 'System' }
        ]
      });
    }

    const inserted = await PartnerRequest.insertMany(allRequests);
    console.log(`Successfully seeded ${inserted.length} Partner Requests!`);

    const total = await PartnerRequest.countDocuments();
    const approved = await PartnerRequest.countDocuments({ status: 'Approved' });
    const underReview = await PartnerRequest.countDocuments({ status: 'Under Review' });
    const awaitingInfo = await PartnerRequest.countDocuments({ status: 'Awaiting Info' });
    const rejected = await PartnerRequest.countDocuments({ status: 'Rejected' });

    console.log(`Summary Verification:`);
    console.log(`Total Requests: ${total}`);
    console.log(`Approved: ${approved} (${Math.round((approved/total)*100)}%)`);
    console.log(`Under Review: ${underReview} (${Math.round((underReview/total)*100)}%)`);
    console.log(`Awaiting Info: ${awaitingInfo} (${Math.round((awaitingInfo/total)*100)}%)`);
    console.log(`Rejected: ${rejected} (${Math.round((rejected/total)*100)}%)`);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding Partner Requests:', err);
    process.exit(1);
  }
}

seedPartnerRequests();
