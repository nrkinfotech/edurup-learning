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
    batch: 'DA-SEP-2026',
    learningStatus: 'In Progress',
    internshipStatus: 'Selected',
    placementStatus: 'Not Placed',
    joinDate: 'Oct 01, 2026',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Priya Nair',
    email: 'priya.nair@gmail.com',
    phone: '+91 98765 43211',
    course: 'Digital Marketing',
    batch: 'DM-AUG-2026',
    learningStatus: 'Completed',
    internshipStatus: 'On Internship',
    placementStatus: 'Placed',
    joinDate: 'Sep 15, 2026',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Karan Mehta',
    email: 'karan.mehta@gmail.com',
    phone: '+91 91234 56789',
    course: 'Full Stack Developer',
    batch: 'FS-SEP-2026',
    learningStatus: 'In Progress',
    internshipStatus: 'Interview',
    placementStatus: 'Not Placed',
    joinDate: 'Oct 10, 2026',
    city: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Sneha Reddy',
    email: 'sneha.reddy@gmail.com',
    phone: '+91 91234 56788',
    course: 'Data Science',
    batch: 'DS-AUG-2026',
    learningStatus: 'Completed',
    internshipStatus: 'Selected',
    placementStatus: 'Not Placed',
    joinDate: 'Aug 20, 2026',
    city: 'Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Aman Verma',
    email: 'aman.verma@gmail.com',
    phone: '+91 99887 66554',
    course: 'AI / ML',
    batch: 'AI-SEP-2026',
    learningStatus: 'In Progress',
    internshipStatus: 'Applied',
    placementStatus: 'Not Placed',
    joinDate: 'Oct 12, 2026',
    city: 'Pune',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Neha Gupta',
    email: 'neha.gupta@gmail.com',
    phone: '+91 99887 66553',
    course: 'HR Management',
    batch: 'HR-AUG-2026',
    learningStatus: 'Completed',
    internshipStatus: 'On Internship',
    placementStatus: 'Placed',
    joinDate: 'Aug 18, 2026',
    city: 'Noida',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Vikram Rao',
    email: 'vikram.rao@gmail.com',
    phone: '+91 98765 67890',
    course: 'Finance Analyst',
    batch: 'FA-SEP-2026',
    learningStatus: 'In Progress',
    internshipStatus: 'Not Applied',
    placementStatus: 'Not Placed',
    joinDate: 'Oct 05, 2026',
    city: 'Chennai',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Ananya Singh',
    email: 'ananya.singh@gmail.com',
    phone: '+91 98760 11223',
    course: 'Digital Marketing',
    batch: 'DM-SEP-2026',
    learningStatus: 'In Progress',
    internshipStatus: 'Applied',
    placementStatus: 'Not Placed',
    joinDate: 'Oct 08, 2026',
    city: 'Kolkata',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Sahil Khan',
    email: 'sahil.khan@gmail.com',
    phone: '+91 98760 33445',
    course: 'Data Analytics',
    batch: 'DA-AUG-2026',
    learningStatus: 'Completed',
    internshipStatus: 'Completed',
    placementStatus: 'Placed',
    joinDate: 'Aug 12, 2026',
    city: 'Ahmedabad',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Kavya Iyer',
    email: 'kavya.iyer@gmail.com',
    phone: '+91 98760 55667',
    course: 'Full Stack Developer',
    batch: 'FS-AUG-2026',
    learningStatus: 'In Progress',
    internshipStatus: 'On Internship',
    placementStatus: 'Not Placed',
    joinDate: 'Aug 25, 2026',
    city: 'Bengaluru',
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

  console.log(`✅ Successfully seeded/updated ${SEED_STUDENTS.length} students in MongoDB Atlas!`);
  await mongoose.disconnect();
}

seedStudents().catch(err => {
  console.error(err);
  process.exit(1);
});
