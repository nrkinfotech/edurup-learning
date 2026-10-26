const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const InternshipApplication = require('../models/InternshipApplication');

const exactTenApplicants = [
  // 1. Rahul Sharma
  {
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@gmail.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, Karnataka',
    currentEducation: 'B.Tech Computer Science',
    graduationYear: '2026',
    domain: 'Data Analytics',
    internshipProgram: 'Data Analytics Internship',
    duration: '6 Months',
    batch: 'Nov 2025',
    appliedOn: '12 Oct 2025',
    appliedOnFull: '12 Oct 2025, 10:24 AM',
    status: 'Shortlisted',
    resume: { name: 'Rahul_Sharma_Resume.pdf', url: '#' },
    whyJoin: 'I am passionate about data analytics and want to gain practical experience through real-world projects and mentorship.',
    skills: ['Python', 'SQL', 'Excel', 'Power BI', 'Data Analysis'],
    adminNotes: 'Good profile. Strong skills. Shortlisted for interview.',
    avatarInitials: 'RS',
    avatarColor: '#2563EB',
    order: 1
  },
  // 2. Priya Nair
  {
    studentName: 'Priya Nair',
    studentEmail: 'priya.nair@gmail.com',
    phone: '+91 98234 56789',
    location: 'Kochi, Kerala',
    currentEducation: 'M.Sc Data Science',
    graduationYear: '2025',
    domain: 'Data Science',
    internshipProgram: 'Data Science Internship',
    duration: '6 Months',
    batch: 'Nov 2025',
    appliedOn: '11 Oct 2025',
    appliedOnFull: '11 Oct 2025, 03:15 PM',
    status: 'Under Review',
    resume: { name: 'Priya_Nair_CV.pdf', url: '#' },
    whyJoin: 'Looking forward to building practical predictive models and advancing my machine learning portfolio.',
    skills: ['Python', 'Pandas', 'Scikit-Learn', 'R', 'Statistics'],
    adminNotes: 'Academic background is strong. Reviewing past portfolio projects.',
    avatarInitials: 'PN',
    avatarColor: '#EC4899',
    order: 2
  },
  // 3. Amit Kumar
  {
    studentName: 'Amit Kumar',
    studentEmail: 'amit.kumar@gmail.com',
    phone: '+91 97112 34567',
    location: 'New Delhi, Delhi',
    currentEducation: 'B.Tech Artificial Intelligence',
    graduationYear: '2026',
    domain: 'AI & ML',
    internshipProgram: 'AI & ML Internship',
    duration: '6 Months',
    batch: 'Dec 2025',
    appliedOn: '10 Oct 2025',
    appliedOnFull: '10 Oct 2025, 11:40 AM',
    status: 'Shortlisted',
    resume: { name: 'Amit_Kumar_Resume.pdf', url: '#' },
    whyJoin: 'Eager to work on LLMs, computer vision systems, and deep learning pipelines under industry mentors.',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'NLP'],
    adminNotes: 'Impressive GitHub projects in computer vision. Shortlisted for technical round.',
    avatarInitials: 'AK',
    avatarColor: '#10B981',
    order: 3
  },
  // 4. Sneha Reddy
  {
    studentName: 'Sneha Reddy',
    studentEmail: 'sneha.reddy@gmail.com',
    phone: '+91 98451 23456',
    location: 'Hyderabad, Telangana',
    currentEducation: 'BBA Marketing',
    graduationYear: '2025',
    domain: 'Digital Marketing',
    internshipProgram: 'Digital Marketing Internship',
    duration: '6 Months',
    batch: 'Nov 2025',
    appliedOn: '09 Oct 2025',
    appliedOnFull: '09 Oct 2025, 02:10 PM',
    status: 'Rejected',
    resume: { name: 'Sneha_Reddy_Resume.pdf', url: '#' },
    whyJoin: 'Want to gain experience in paid ads management and social growth marketing.',
    skills: ['Social Media', 'Canva', 'Content Strategy'],
    adminNotes: 'Does not meet minimum prerequisites for current advanced cohort.',
    avatarInitials: 'SR',
    avatarColor: '#8B5CF6',
    order: 4
  },
  // 5. Karthik V
  {
    studentName: 'Karthik V',
    studentEmail: 'karthik.v@gmail.com',
    phone: '+91 96543 21098',
    location: 'Chennai, Tamil Nadu',
    currentEducation: 'B.E Information Technology',
    graduationYear: '2026',
    domain: 'Full Stack',
    internshipProgram: 'Full Stack Internship',
    duration: '6 Months',
    batch: 'Dec 2025',
    appliedOn: '08 Oct 2025',
    appliedOnFull: '08 Oct 2025, 09:50 AM',
    status: 'Under Review',
    resume: { name: 'Karthik_V_Portfolio.pdf', url: '#' },
    whyJoin: 'Desire to build full-stack web applications with React, Node.js, and modern cloud databases.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript'],
    adminNotes: 'Portfolio looks decent. Evaluating code samples on GitHub.',
    avatarInitials: 'KV',
    avatarColor: '#F59E0B',
    order: 5
  },
  // 6. Meera Joshi
  {
    studentName: 'Meera Joshi',
    studentEmail: 'meera.joshi@gmail.com',
    phone: '+91 97654 32109',
    location: 'Pune, Maharashtra',
    currentEducation: 'MBA Human Resources',
    graduationYear: '2025',
    domain: 'HR Management',
    internshipProgram: 'HR Management Internship',
    duration: '6 Months',
    batch: 'Dec 2025',
    appliedOn: '07 Oct 2025',
    appliedOnFull: '07 Oct 2025, 04:30 PM',
    status: 'Waitlisted',
    resume: { name: 'Meera_Joshi_Resume.pdf', url: '#' },
    whyJoin: 'Interested in tech talent acquisition, applicant screening, and employee engagement strategies.',
    skills: ['Recruitment', 'HR Analytics', 'Employee Relations', 'Communication'],
    adminNotes: 'Good candidate, but November cohort is full. Waitlisted for December batch.',
    avatarInitials: 'MJ',
    avatarColor: '#EF4444',
    order: 6
  },
  // 7. Aditya Patel
  {
    studentName: 'Aditya Patel',
    studentEmail: 'aditya.patel@gmail.com',
    phone: '+91 98987 65432',
    location: 'Ahmedabad, Gujarat',
    currentEducation: 'B.Com / MBA Marketing',
    graduationYear: '2025',
    domain: 'Sales & Marketing',
    internshipProgram: 'Sales & Marketing Internship',
    duration: '6 Months',
    batch: 'Dec 2025',
    appliedOn: '06 Oct 2025',
    appliedOnFull: '06 Oct 2025, 01:25 PM',
    status: 'Shortlisted',
    resume: { name: 'Aditya_Patel_Profile.pdf', url: '#' },
    whyJoin: 'Aspiring to master B2B sales development, consultative selling, and CRM operations.',
    skills: ['B2B Sales', 'HubSpot', 'Lead Gen', 'Cold Outreach', 'Negotiation'],
    adminNotes: 'Prior outbound internship experience. Recommended for interview.',
    avatarInitials: 'AP',
    avatarColor: '#7C3AED',
    order: 7
  },
  // 8. Divya Singh
  {
    studentName: 'Divya Singh',
    studentEmail: 'divya.singh@gmail.com',
    phone: '+91 98123 45678',
    location: 'Lucknow, Uttar Pradesh',
    currentEducation: 'BA Journalism',
    graduationYear: '2025',
    domain: 'Digital Marketing',
    internshipProgram: 'Digital Marketing Internship',
    duration: '6 Months',
    batch: 'Nov 2025',
    appliedOn: '05 Oct 2025',
    appliedOnFull: '05 Oct 2025, 11:10 AM',
    status: 'Rejected',
    resume: { name: 'Divya_Singh_Resume.pdf', url: '#' },
    whyJoin: 'Want to specialize in content marketing and digital brand awareness.',
    skills: ['Copywriting', 'Blogging', 'Social Media'],
    adminNotes: 'Incomplete application questionnaire and missing portfolio links.',
    avatarInitials: 'DS',
    avatarColor: '#0284C7',
    order: 8
  },
  // 9. Manoj Gupta
  {
    studentName: 'Manoj Gupta',
    studentEmail: 'manoj.gupta@gmail.com',
    phone: '+91 97234 56781',
    location: 'Jaipur, Rajasthan',
    currentEducation: 'B.Sc Statistics',
    graduationYear: '2026',
    domain: 'Data Analytics',
    internshipProgram: 'Data Analytics Internship',
    duration: '6 Months',
    batch: 'Nov 2025',
    appliedOn: '04 Oct 2025',
    appliedOnFull: '04 Oct 2025, 10:05 AM',
    status: 'Under Review',
    resume: { name: 'Manoj_Gupta_CV.pdf', url: '#' },
    whyJoin: 'Excited to apply statistical techniques to real-world business datasets and create BI dashboards.',
    skills: ['Excel', 'SQL', 'Tableau', 'R', 'Data Cleaning'],
    adminNotes: 'Solid statistical background. Reviewing submission test scores.',
    avatarInitials: 'MG',
    avatarColor: '#059669',
    order: 9
  },
  // 10. Ishita Verma
  {
    studentName: 'Ishita Verma',
    studentEmail: 'ishita.verma@gmail.com',
    phone: '+91 98345 67890',
    location: 'Chandigarh, Punjab',
    currentEducation: 'B.Tech CSE with AI Specialization',
    graduationYear: '2026',
    domain: 'AI & ML',
    internshipProgram: 'AI & ML Internship',
    duration: '6 Months',
    batch: 'Dec 2025',
    appliedOn: '03 Oct 2025',
    appliedOnFull: '03 Oct 2025, 05:45 PM',
    status: 'Shortlisted',
    resume: { name: 'Ishita_Verma_Resume.pdf', url: '#' },
    whyJoin: 'Keen to build end-to-end ML architectures and neural network systems on cloud infrastructure.',
    skills: ['Python', 'Deep Learning', 'PyTorch', 'FastAPI', 'Docker'],
    adminNotes: 'High GPA, published research paper in IEEE student conference. Top candidate.',
    avatarInitials: 'IV',
    avatarColor: '#EA580C',
    order: 10
  }
];

// Additional realistic names & data to reach exactly 125 total applications
const firstNames = [
  'Rohan', 'Ananya', 'Varun', 'Pooja', 'Vikram', 'Tanvi', 'Siddharth', 'Nisha', 'Kunal', 'Rhea',
  'Arjun', 'Simran', 'Akash', 'Shreya', 'Deepak', 'Kavita', 'Manish', 'Bhavna', 'Harsh', 'Swati',
  'Gaurav', 'Pallavi', 'Nikhil', 'Anjali', 'Mayank', 'Preeti', 'Abhishek', 'Sakshi', 'Karan', 'Ritu',
  'Alok', 'Nehal', 'Pranav', 'Rashmi', 'Vivek', 'Monika', 'Rajesh', 'Shikha', 'Yash', 'Meghna',
  'Sunil', 'Garima', 'Saurabh', 'Jyoti', 'Tarun', 'Archana', 'Naveen', 'Payal', 'Chetan', 'Asha',
  'Rakesh', 'Aarti', 'Mukesh', 'Sheetal', 'Hemant', 'Sunita', 'Dinesh', 'Komal', 'Ashish', 'Vandana'
];

const lastNames = [
  'Verma', 'Sharma', 'Patel', 'Reddy', 'Singh', 'Nair', 'Kumar', 'Joshi', 'Gupta', 'Mehta',
  'Chopra', 'Bansal', 'Agarwal', 'Iyer', 'Deshmukh', 'Mishra', 'Pandey', 'Saxena', 'Kapoor', 'Bhatia',
  'Rao', 'Bose', 'Chatterjee', 'Kulkarni', 'Sengupta', 'Pillai', 'Tripathi', 'Choudhury', 'Dubey', 'Yadav'
];

const programsList = [
  { name: 'Data Analytics Internship', domain: 'Data Analytics', batch: 'Nov 2025' },
  { name: 'Data Science Internship', domain: 'Data Science', batch: 'Nov 2025' },
  { name: 'AI & ML Internship', domain: 'AI & ML', batch: 'Dec 2025' },
  { name: 'Digital Marketing Internship', domain: 'Digital Marketing', batch: 'Nov 2025' },
  { name: 'Full Stack Internship', domain: 'Full Stack', batch: 'Dec 2025' },
  { name: 'HR Management Internship', domain: 'HR Management', batch: 'Dec 2025' },
  { name: 'Sales & Marketing Internship', domain: 'Sales & Marketing', batch: 'Dec 2025' },
  { name: 'Cloud & DevOps Internship', domain: 'Cloud / DevOps', batch: 'Jan 2026' }
];

const cities = [
  'Bengaluru, Karnataka', 'Mumbai, Maharashtra', 'Delhi NCR', 'Hyderabad, Telangana',
  'Pune, Maharashtra', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan', 'Chandigarh, Punjab', 'Kochi, Kerala', 'Indore, Madhya Pradesh'
];

const educations = [
  'B.Tech Computer Science', 'B.Tech Information Technology', 'BCA / MCA',
  'B.Sc Data Science', 'BBA / MBA', 'M.Sc Statistics', 'B.E Electronics'
];

const colors = ['#2563EB', '#7C3AED', '#059669', '#D97706', '#DC2626', '#DB2777', '#0891B2', '#4F46E5'];

async function seed() {
  try {
    const connectDB = require('../config/db');
    await connectDB();

    // Desired exact KPIs:
    // Total Applications: 125
    // Shortlisted: 68 (54%)
    // Under Review: 32 (26%)
    // Rejected: 18 (14%)
    // Waitlisted: 7 (6%)
    const targetTotal = 125;
    const targetShortlisted = 68;
    const targetUnderReview = 32;
    const targetRejected = 18;
    const targetWaitlisted = 7;

    const allApps = [...exactTenApplicants];

    // Current counts from the exact 10:
    let currShortlisted = exactTenApplicants.filter(a => a.status === 'Shortlisted').length; // 4
    let currUnderReview = exactTenApplicants.filter(a => a.status === 'Under Review').length; // 3
    let currRejected = exactTenApplicants.filter(a => a.status === 'Rejected').length;       // 2
    let currWaitlisted = exactTenApplicants.filter(a => a.status === 'Waitlisted').length;   // 1

    console.log(`First 10 counts: Shortlisted=${currShortlisted}, UnderReview=${currUnderReview}, Rejected=${currRejected}, Waitlisted=${currWaitlisted}`);

    // Generate remaining 115 applicants
    for (let i = 11; i <= targetTotal; i++) {
      let status = 'Shortlisted';
      if (currShortlisted < targetShortlisted) {
        status = 'Shortlisted';
        currShortlisted++;
      } else if (currUnderReview < targetUnderReview) {
        status = 'Under Review';
        currUnderReview++;
      } else if (currRejected < targetRejected) {
        status = 'Rejected';
        currRejected++;
      } else if (currWaitlisted < targetWaitlisted) {
        status = 'Waitlisted';
        currWaitlisted++;
      }

      const fn = firstNames[(i * 3 + 7) % firstNames.length];
      const ln = lastNames[(i * 5 + 3) % lastNames.length];
      const name = `${fn} ${ln}`;
      const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@gmail.com`;
      const prog = programsList[i % programsList.length];
      const city = cities[i % cities.length];
      const edu = educations[i % educations.length];
      const color = colors[i % colors.length];
      const initials = `${fn[0]}${ln[0]}`;

      const day = String(Math.max(1, 30 - Math.floor(i / 4))).padStart(2, '0');
      const month = i > 60 ? 'Sep 2025' : 'Oct 2025';
      const appliedOn = `${day} ${month}`;
      const hour = String(9 + (i % 9)).padStart(2, '0');
      const minute = String((i * 7) % 60).padStart(2, '0');
      const appliedOnFull = `${appliedOn}, ${hour}:${minute} ${i % 2 === 0 ? 'AM' : 'PM'}`;

      let skills = ['Python', 'SQL', 'Data Analytics', 'Excel'];
      if (prog.domain === 'Full Stack') skills = ['React', 'Node.js', 'Express', 'MongoDB'];
      if (prog.domain === 'Digital Marketing') skills = ['SEO', 'Google Ads', 'Content Marketing', 'Meta Ads'];
      if (prog.domain === 'AI & ML') skills = ['Python', 'PyTorch', 'TensorFlow', 'Machine Learning'];
      if (prog.domain === 'HR Management') skills = ['Talent Acquisition', 'HRIS', 'Employee Relations'];
      if (prog.domain === 'Cloud / DevOps') skills = ['AWS', 'Docker', 'Kubernetes', 'CI/CD'];

      allApps.push({
        studentName: name,
        studentEmail: email,
        phone: `+91 ${98000 + i} ${10000 + (i * 123) % 90000}`,
        location: city,
        currentEducation: edu,
        graduationYear: String(2025 + (i % 3)),
        domain: prog.domain,
        internshipProgram: prog.name,
        duration: '6 Months',
        batch: prog.batch,
        appliedOn: appliedOn,
        appliedOnFull: appliedOnFull,
        status: status,
        resume: { name: `${fn}_${ln}_Resume.pdf`, url: '#' },
        whyJoin: `Passionate about ${prog.domain} and enthusiastic to contribute to enterprise-grade products and internships.`,
        skills: skills,
        adminNotes: status === 'Shortlisted' ? 'Profile evaluated. Suitable for technical screening.' : (status === 'Waitlisted' ? 'Kept on waitlist for upcoming cohort.' : ''),
        avatarInitials: initials,
        avatarColor: color,
        order: i
      });
    }

    console.log(`Generated ${allApps.length} total applications.`);

    // Wipe existing InternshipApplication collection
    await InternshipApplication.deleteMany({});
    console.log('Cleared existing applications collection.');

    const inserted = await InternshipApplication.insertMany(allApps);
    console.log(`Successfully seeded ${inserted.length} applications!`);

    const finalTotal = await InternshipApplication.countDocuments();
    const finalShortlisted = await InternshipApplication.countDocuments({ status: 'Shortlisted' });
    const finalUnderReview = await InternshipApplication.countDocuments({ status: 'Under Review' });
    const finalRejected = await InternshipApplication.countDocuments({ status: 'Rejected' });
    const finalWaitlisted = await InternshipApplication.countDocuments({ status: 'Waitlisted' });

    console.log('Final KPI Summary in DB:');
    console.log(`- Total Applications: ${finalTotal}`);
    console.log(`- Shortlisted: ${finalShortlisted} (${Math.round(finalShortlisted / finalTotal * 100)}%)`);
    console.log(`- Under Review: ${finalUnderReview} (${Math.round(finalUnderReview / finalTotal * 100)}%)`);
    console.log(`- Rejected: ${finalRejected} (${Math.round(finalRejected / finalTotal * 100)}%)`);
    console.log(`- Waitlisted: ${finalWaitlisted} (${Math.round(finalWaitlisted / finalTotal * 100)}%)`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
