const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch(e) {}

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Certificate = require('../models/Certificate');

const topFiveCertificates = [
  {
    order: 1,
    studentName: 'Ananya Kumar',
    studentEmail: 'ananya.kumar@gmail.com',
    avatarInitials: 'AK',
    avatarColor: '#2563EB',
    course: 'Data Analytics',
    certificateType: 'Course Certificate',
    certificateId: 'EDU-CC-2026-0891',
    issueDate: 'Nov 14, 2026',
    issueDateTime: new Date('2026-11-14T10:30:00Z'),
    duration: '4 Months',
    grade: 'A+',
    status: 'Issued',
    template: 'Classic Gold',
    directorName: 'Rupesh Kumar',
    signatoryName: 'Sirija Devi',
    verificationUrl: 'https://edurup.in/verify/EDU-CC-2026-0891'
  },
  {
    order: 2,
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@gmail.com',
    avatarInitials: 'RS',
    avatarColor: '#8B5CF6',
    course: 'Data Science',
    certificateType: 'Internship Certificate',
    certificateId: 'EDU-IC-2026-0312',
    issueDate: 'Nov 13, 2026',
    issueDateTime: new Date('2026-11-13T11:20:00Z'),
    duration: '6 Months',
    grade: 'Distinction',
    status: 'Issued',
    template: 'Classic Gold',
    directorName: 'Rupesh Kumar',
    signatoryName: 'Sirija Devi',
    verificationUrl: 'https://edurup.in/verify/EDU-IC-2026-0312'
  },
  {
    order: 3,
    studentName: 'Priya Verma',
    studentEmail: 'priya.verma@gmail.com',
    avatarInitials: 'PV',
    avatarColor: '#EC4899',
    course: 'Full Stack Developer',
    certificateType: 'Experience Letter',
    certificateId: 'EDU-EL-2026-0118',
    issueDate: 'Nov 12, 2026',
    issueDateTime: new Date('2026-11-12T14:15:00Z'),
    duration: '6 Months',
    grade: 'A',
    status: 'Issued',
    template: 'Executive Platinum',
    directorName: 'Rupesh Kumar',
    signatoryName: 'Sirija Devi',
    verificationUrl: 'https://edurup.in/verify/EDU-EL-2026-0118'
  },
  {
    order: 4,
    studentName: 'Vikram Kumar',
    studentEmail: 'vikram.kumar@gmail.com',
    avatarInitials: 'VK',
    avatarColor: '#10B981',
    course: 'Digital Marketing',
    certificateType: 'Course Certificate',
    certificateId: 'EDU-CC-2026-0890',
    issueDate: 'Nov 12, 2026',
    issueDateTime: new Date('2026-11-12T09:40:00Z'),
    duration: '3 Months',
    grade: 'A+',
    status: 'Issued',
    template: 'Classic Gold',
    directorName: 'Rupesh Kumar',
    signatoryName: 'Sirija Devi',
    verificationUrl: 'https://edurup.in/verify/EDU-CC-2026-0890'
  },
  {
    order: 5,
    studentName: 'Sneha Murthy',
    studentEmail: 'sneha.murthy@gmail.com',
    avatarInitials: 'SM',
    avatarColor: '#3B82F6',
    course: 'Python Full Stack',
    certificateType: 'Internship Certificate',
    certificateId: 'EDU-IC-2026-0311',
    issueDate: 'Nov 11, 2026',
    issueDateTime: new Date('2026-11-11T16:00:00Z'),
    duration: '4 Months',
    grade: 'A+',
    status: 'Issued',
    template: 'Classic Gold',
    directorName: 'Rupesh Kumar',
    signatoryName: 'Sirija Devi',
    verificationUrl: 'https://edurup.in/verify/EDU-IC-2026-0311'
  }
];

const studentNamesPool = [
  'Arjun Reddy', 'Kavya Nair', 'Rohan Gupta', 'Divya Patel', 'Aditya Joshi',
  'Meera Iyer', 'Naveen Rao', 'Swati Deshmukh', 'Manoj Kumar', 'Pooja Hegde',
  'Deepak Verma', 'Tanvi Saxena', 'Siddharth Sen', 'Ritika Kapoor', 'Varun Grover',
  'Ankit Sharma', 'Neha Singhal', 'Harish Babu', 'Shruti Agrawal', 'Gaurav Desai',
  'Juhi Chawla', 'Kartik Somani', 'Pallavi Rao', 'Mohan Sundaram', 'Aanchal Jain',
  'Rishabh Dixit', 'Prashant Nair', 'Bhavna Roy', 'Tarun Mathur', 'Aditi Chawla'
];

const coursesPool = [
  'Data Analytics', 'Data Science', 'Full Stack Developer', 'Digital Marketing',
  'Python Full Stack', 'AI/ML & Deep Learning', 'Cloud & DevOps', 'Cyber Security',
  'UI/UX Design', 'Java Spring Boot Full Stack'
];

const avatarColors = ['#2563EB', '#8B5CF6', '#EC4899', '#10B981', '#3B82F6', '#F59E0B', '#06B6D4'];

async function seedCertificates() {
  try {
    await connectDB();
    console.log('Connected to MongoDB. Seeding Certificates...');

    await Certificate.deleteMany({});
    console.log('Cleared existing Certificates collection.');

    const certificatesList = [...topFiveCertificates];

    // Total target: 892 certificates
    // Course Certificates: 648 (top 5 has 2 -> need 646)
    // Internship Certificates: 312 (or remaining balance)
    // Experience Letters: 126
    // In our total 892:
    // Let's create exact distribution:
    // 648 Course Certificates
    // 126 Internship Certificates (matching donut 14%) or let's create 892 total
    // 118 Experience Letters (matching donut 13%)
    // Sum: 648 + 126 + 118 = 892 exact!

    let courseCount = 2; // already 2 in top 5
    let internCount = 2; // already 2 in top 5
    let expCount = 1;    // already 1 in top 5

    let order = 6;
    let ccNum = 889;
    let icNum = 310;
    let elNum = 117;

    for (let i = 6; i <= 892; i++) {
      const name = studentNamesPool[i % studentNamesPool.length] + (i > 35 ? ` ${Math.floor(i / 30)}` : '');
      const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
      const color = avatarColors[i % avatarColors.length];
      const course = coursesPool[i % coursesPool.length];

      let type = 'Course Certificate';
      let certId = '';
      if (courseCount < 648) {
        type = 'Course Certificate';
        certId = `EDU-CC-2026-${String(ccNum).padStart(4, '0')}`;
        ccNum--;
        courseCount++;
      } else if (internCount < 126) {
        type = 'Internship Certificate';
        certId = `EDU-IC-2026-${String(icNum).padStart(4, '0')}`;
        icNum--;
        internCount++;
      } else {
        type = 'Experience Letter';
        certId = `EDU-EL-2026-${String(elNum).padStart(4, '0')}`;
        elNum--;
        expCount++;
      }

      const day = Math.floor(Math.random() * 28) + 1;
      const month = i % 2 === 0 ? 'Nov' : 'Oct';
      const dateStr = `${month} ${day < 10 ? '0' + day : day}, 2026`;

      certificatesList.push({
        order: i,
        studentName: name,
        studentEmail: `${name.toLowerCase().replace(/[^a-z]/g, '')}${i}@gmail.com`,
        avatarInitials: initials,
        avatarColor: color,
        course: course,
        certificateType: type,
        certificateId: certId,
        issueDate: dateStr,
        issueDateTime: new Date(`2026-11-${day < 10 ? '0' + day : day}T10:00:00Z`),
        duration: type === 'Experience Letter' ? '6 Months' : (i % 3 === 0 ? '6 Months' : (i % 2 === 0 ? '4 Months' : '3 Months')),
        grade: i % 4 === 0 ? 'Distinction' : (i % 3 === 0 ? 'A+' : 'A'),
        status: 'Issued',
        template: 'Classic Gold',
        directorName: 'Rupesh Kumar',
        signatoryName: 'Sirija Devi',
        verificationUrl: `https://edurup.in/verify/${certId}`
      });
    }

    // Also add 34 Pending Requests
    for (let p = 1; p <= 34; p++) {
      const name = studentNamesPool[(p + 5) % studentNamesPool.length];
      certificatesList.push({
        order: 900 + p,
        studentName: name,
        studentEmail: `${name.toLowerCase().replace(/[^a-z]/g, '')}.req${p}@gmail.com`,
        avatarInitials: name.split(' ').map(w => w[0]).join('').substring(0, 2),
        avatarColor: avatarColors[p % avatarColors.length],
        course: coursesPool[p % coursesPool.length],
        certificateType: p % 2 === 0 ? 'Course Certificate' : 'Internship Certificate',
        certificateId: `REQ-CERT-2026-${String(p).padStart(3, '0')}`,
        issueDate: `Nov ${10 + (p % 5)}, 2026`,
        issueDateTime: new Date(),
        duration: '4 Months',
        grade: 'A',
        status: 'Pending',
        template: 'Classic Gold',
        directorName: 'Rupesh Kumar',
        signatoryName: 'Sirija Devi'
      });
    }

    // Also add 12 Drafts
    for (let d = 1; d <= 12; d++) {
      const name = studentNamesPool[(d + 12) % studentNamesPool.length];
      certificatesList.push({
        order: 950 + d,
        studentName: name,
        studentEmail: `${name.toLowerCase().replace(/[^a-z]/g, '')}.draft${d}@gmail.com`,
        avatarInitials: name.split(' ').map(w => w[0]).join('').substring(0, 2),
        avatarColor: avatarColors[d % avatarColors.length],
        course: coursesPool[d % coursesPool.length],
        certificateType: d % 3 === 0 ? 'Experience Letter' : 'Course Certificate',
        certificateId: `DFT-CERT-2026-${String(d).padStart(3, '0')}`,
        issueDate: `Nov ${1 + (d % 10)}, 2026`,
        issueDateTime: new Date(),
        duration: '4 Months',
        grade: 'A',
        status: 'Draft',
        template: 'Modern Tech Blue',
        directorName: 'Rupesh Kumar',
        signatoryName: 'Sirija Devi'
      });
    }

    const inserted = await Certificate.insertMany(certificatesList);
    console.log(`Successfully seeded ${inserted.length} Certificates (892 Issued, 34 Pending, 12 Drafts)!`);

    const totalIssued = await Certificate.countDocuments({ status: 'Issued' });
    const courseIssued = await Certificate.countDocuments({ status: 'Issued', certificateType: 'Course Certificate' });
    const internIssued = await Certificate.countDocuments({ status: 'Issued', certificateType: 'Internship Certificate' });
    const expIssued = await Certificate.countDocuments({ status: 'Issued', certificateType: 'Experience Letter' });
    const pendingTotal = await Certificate.countDocuments({ status: 'Pending' });
    const draftTotal = await Certificate.countDocuments({ status: 'Draft' });

    console.log(`\nVerification Summary:`);
    console.log(`Total Issued: ${totalIssued}`);
    console.log(`Course Certificates: ${courseIssued} (${Math.round((courseIssued/totalIssued)*100)}%)`);
    console.log(`Internship Certificates: ${internIssued} (${Math.round((internIssued/totalIssued)*100)}%)`);
    console.log(`Experience Letters: ${expIssued} (${Math.round((expIssued/totalIssued)*100)}%)`);
    console.log(`Pending Requests: ${pendingTotal}`);
    console.log(`Drafts: ${draftTotal}`);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding Certificates:', err);
    process.exit(1);
  }
}

seedCertificates();
