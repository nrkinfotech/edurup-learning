const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Batch = require('../models/Batch');

const INITIAL_BATCHES = [
  {
    batchName: 'Data Analytics - Aug 2026',
    batchCode: 'DA-AUG-2026',
    badgeText: 'DA',
    badgeColor: '#8b5cf6',
    course: 'Data Analytics',
    startDate: 'Aug 05, 2026',
    endDate: 'Nov 05, 2026',
    enrolledStudents: 28,
    capacity: 35,
    status: 'Active',
    createdBy: {
      name: 'Rohit Sharma',
      date: 'Aug 01, 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    batchName: 'Digital Marketing - Aug 2026',
    batchCode: 'DM-AUG-2026',
    badgeText: 'DM',
    badgeColor: '#3b82f6',
    course: 'Digital Marketing',
    startDate: 'Aug 10, 2026',
    endDate: 'Nov 10, 2026',
    enrolledStudents: 32,
    capacity: 35,
    status: 'Active',
    createdBy: {
      name: 'Priya Nair',
      date: 'Aug 02, 2026',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    batchName: 'Full Stack - Sep 2026',
    batchCode: 'FS-SEP-2026',
    badgeText: 'FS',
    badgeColor: '#6366f1',
    course: 'Full Stack Developer',
    startDate: 'Sep 01, 2026',
    endDate: 'Dec 01, 2026',
    enrolledStudents: 25,
    capacity: 35,
    status: 'Active',
    createdBy: {
      name: 'Karan Mehta',
      date: 'Aug 15, 2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    batchName: 'Data Science - Aug 2026',
    batchCode: 'DS-AUG-2026',
    badgeText: 'DS',
    badgeColor: '#ef4444',
    course: 'Data Science',
    startDate: 'Aug 12, 2026',
    endDate: 'Nov 12, 2026',
    enrolledStudents: 30,
    capacity: 35,
    status: 'Active',
    createdBy: {
      name: 'Sneha Reddy',
      date: 'Aug 05, 2026',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    batchName: 'AI / ML - Sep 2026',
    batchCode: 'AI-SEP-2026',
    badgeText: 'AI',
    badgeColor: '#06b6d4',
    course: 'AI / ML',
    startDate: 'Sep 05, 2026',
    endDate: 'Dec 05, 2026',
    enrolledStudents: 18,
    capacity: 30,
    status: 'Active',
    createdBy: {
      name: 'Aman Verma',
      date: 'Aug 10, 2026',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    batchName: 'HR Internship Batch 1',
    batchCode: 'HR-AUG-2026',
    badgeText: 'HR',
    badgeColor: '#ec4899',
    course: 'HR Management',
    startDate: 'Aug 20, 2026',
    endDate: 'Oct 20, 2026',
    enrolledStudents: 20,
    capacity: 25,
    status: 'Active',
    createdBy: {
      name: 'Neha Gupta',
      date: 'Aug 18, 2026',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    batchName: 'Finance Analyst - Sep 2026',
    batchCode: 'FA-SEP-2026',
    badgeText: 'FA',
    badgeColor: '#a855f7',
    course: 'Finance Analyst',
    startDate: 'Sep 12, 2026',
    endDate: 'Dec 12, 2026',
    enrolledStudents: 14,
    capacity: 30,
    status: 'Upcoming',
    createdBy: {
      name: 'Vikram Rao',
      date: 'Aug 25, 2026',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    batchName: 'UI/UX Design - Oct 2026',
    batchCode: 'UI-OCT-2026',
    badgeText: 'UI',
    badgeColor: '#f43f5e',
    course: 'UI/UX Design',
    startDate: 'Oct 01, 2026',
    endDate: 'Dec 31, 2026',
    enrolledStudents: 8,
    capacity: 30,
    status: 'Upcoming',
    createdBy: {
      name: 'Ananya Singh',
      date: 'Aug 28, 2026',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    batchName: 'Digital Marketing - Jul 2026',
    batchCode: 'DM-JUL-2026',
    badgeText: 'DM',
    badgeColor: '#10b981',
    course: 'Digital Marketing',
    startDate: 'Jul 01, 2026',
    endDate: 'Sep 30, 2026',
    enrolledStudents: 35,
    capacity: 35,
    status: 'Completed',
    createdBy: {
      name: 'Sahil Khan',
      date: 'Jul 01, 2026',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    batchName: 'Full Stack - Jul 2026',
    batchCode: 'FS-JUL-2026',
    badgeText: 'FS',
    badgeColor: '#8b5cf6',
    course: 'Full Stack Developer',
    startDate: 'Jul 05, 2026',
    endDate: 'Sep 30, 2026',
    enrolledStudents: 30,
    capacity: 30,
    status: 'Completed',
    createdBy: {
      name: 'Kavya Iyer',
      date: 'Jul 05, 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    }
  }
];

async function seedBatches() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is missing');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas');

  for (const batch of INITIAL_BATCHES) {
    await Batch.findOneAndUpdate(
      { batchName: batch.batchName },
      batch,
      { upsert: true, new: true }
    );
  }

  console.log(`✅ Successfully seeded ${INITIAL_BATCHES.length} batches in MongoDB Atlas!`);
  await mongoose.disconnect();
}

seedBatches().catch(err => {
  console.error(err);
  process.exit(1);
});
