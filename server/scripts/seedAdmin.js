const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const InternshipApplication = require('../models/InternshipApplication');
const OngoingInternship = require('../models/OngoingInternship');

const ADMIN_CREDENTIALS = {
  fullName: 'Super Admin',
  email: 'admin@eduruplearning.com',
  phone: '9999999999',
  password: 'Admin@Edurup2026',
  role: 'admin',
  isEmailVerified: true,
  isPhoneVerified: true,
  isStudentOrProfessional: 'Admin'
};

const INITIAL_APPLICATIONS = [
  {
    studentName: 'Rohit Sharma',
    studentEmail: 'rohit.sharma@example.com',
    domain: 'Data Analytics',
    appliedOn: 'Oct 18, 2026',
    status: 'New',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Priya Nair',
    studentEmail: 'priya.nair@example.com',
    domain: 'Digital Marketing',
    appliedOn: 'Oct 17, 2026',
    status: 'Shortlisted',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Karan Mehta',
    studentEmail: 'karan.mehta@example.com',
    domain: 'Full Stack',
    appliedOn: 'Oct 16, 2026',
    status: 'Interview',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Sneha Reddy',
    studentEmail: 'sneha.reddy@example.com',
    domain: 'Data Science',
    appliedOn: 'Oct 16, 2026',
    status: 'Selected',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Aman Verma',
    studentEmail: 'aman.verma@example.com',
    domain: 'AI / ML',
    appliedOn: 'Oct 15, 2026',
    status: 'Rejected',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  }
];

const INITIAL_ONGOING = [
  {
    studentName: 'Rahul Kumar',
    company: 'Google',
    companyLogo: 'https://www.google.com/favicon.ico',
    startDate: 'Oct 01, 2026',
    endDate: 'Apr 01, 2027',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Priya Nair',
    company: 'Microsoft',
    companyLogo: 'https://www.microsoft.com/favicon.ico',
    startDate: 'Sep 15, 2026',
    endDate: 'Mar 15, 2027',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Karan Mehta',
    company: 'TCS',
    companyLogo: 'https://www.tcs.com/favicon.ico',
    startDate: 'Oct 05, 2026',
    endDate: 'Apr 05, 2027',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Sneha Reddy',
    company: 'Amazon',
    companyLogo: 'https://www.amazon.com/favicon.ico',
    startDate: 'Sep 20, 2026',
    endDate: 'Mar 20, 2027',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80'
  },
  {
    studentName: 'Aman Verma',
    company: 'Flipkart',
    companyLogo: 'https://www.flipkart.com/favicon.ico',
    startDate: 'Oct 10, 2026',
    endDate: 'Apr 10, 2027',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  }
];

async function seedAdmin() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGO_URI is not defined in environment');
    process.exit(1);
  }

  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas!');

  // 1. Seed or Update Super Admin User
  const hashedPassword = await bcrypt.hash(ADMIN_CREDENTIALS.password, 10);
  let admin = await User.findOne({ email: ADMIN_CREDENTIALS.email });

  if (admin) {
    admin.fullName = ADMIN_CREDENTIALS.fullName;
    admin.phone = ADMIN_CREDENTIALS.phone;
    admin.password = hashedPassword;
    admin.role = 'admin';
    admin.isEmailVerified = true;
    admin.isPhoneVerified = true;
    await admin.save();
    console.log('✅ Updated existing Admin account in MongoDB Atlas:', admin.email);
  } else {
    admin = await User.create({
      ...ADMIN_CREDENTIALS,
      password: hashedPassword
    });
    console.log('✅ Created new Admin account in MongoDB Atlas:', admin.email);
  }

  // 2. Seed Initial Applications if empty
  const appCount = await InternshipApplication.countDocuments();
  if (appCount === 0) {
    await InternshipApplication.insertMany(INITIAL_APPLICATIONS);
    console.log('✅ Seeded initial Internship Applications in MongoDB Atlas');
  } else {
    console.log(`ℹ️ Internship Applications already exist: ${appCount} records`);
  }

  // 3. Seed Initial Ongoing Internships if empty
  const ongoingCount = await OngoingInternship.countDocuments();
  if (ongoingCount === 0) {
    await OngoingInternship.insertMany(INITIAL_ONGOING);
    console.log('✅ Seeded initial Ongoing Internships in MongoDB Atlas');
  } else {
    console.log(`ℹ️ Ongoing Internships already exist: ${ongoingCount} records`);
  }

  console.log('==================================================');
  console.log('🎉 Admin account setup complete!');
  console.log('📧 Email:   ', ADMIN_CREDENTIALS.email);
  console.log('🔑 Password:', ADMIN_CREDENTIALS.password);
  console.log('👤 Role:    ', 'admin');
  console.log('==================================================');

  await mongoose.disconnect();
}

seedAdmin().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
