const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Course = require('../models/Course');

const SEED_COURSES = [
  {
    courseTitle: 'Digital Marketing',
    shortDescription: 'Learn SEO, Google Ads, Social Media and more.',
    category: 'Marketing',
    duration: '4 Months',
    fee: 40000,
    installments: '3 Installments',
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=80',
    enrolledCount: 160,
    modulesCount: 6
  },
  {
    courseTitle: 'Data Analytics',
    shortDescription: 'Python, SQL, Power BI and real projects.',
    category: 'Data',
    duration: '5 Months',
    fee: 40000,
    installments: '4 Installments',
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&auto=format&fit=crop&q=80',
    enrolledCount: 180,
    modulesCount: 6
  },
  {
    courseTitle: 'Full Stack Developer',
    shortDescription: 'Frontend, Backend, Database and Deployment.',
    category: 'Development',
    duration: '4 Months',
    fee: 40000,
    installments: '3 Installments',
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&auto=format&fit=crop&q=80',
    enrolledCount: 320,
    modulesCount: 6
  },
  {
    courseTitle: 'AI / ML',
    shortDescription: 'Machine Learning with Python and projects.',
    category: 'AI / ML',
    duration: '4 Months',
    fee: 40000,
    installments: '3 Installments',
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&auto=format&fit=crop&q=80',
    enrolledCount: 120,
    modulesCount: 6
  },
  {
    courseTitle: 'HR Management',
    shortDescription: 'Learn modern HR tools and practices.',
    category: 'Management',
    duration: '2 Months',
    fee: 20000,
    installments: '2 Installments',
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&auto=format&fit=crop&q=80',
    enrolledCount: 90,
    modulesCount: 6
  },
  {
    courseTitle: 'Finance Analyst',
    shortDescription: 'Excel, Financial Modeling and Reporting.',
    category: 'Finance',
    duration: '2 Months',
    fee: 20000,
    installments: '2 Installments',
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&auto=format&fit=crop&q=80',
    enrolledCount: 70,
    modulesCount: 6
  },
  {
    courseTitle: 'UI/UX Design',
    shortDescription: 'Design tools, wireframing and real projects.',
    category: 'Design',
    duration: '4 Months',
    fee: 40000,
    installments: '3 Installments',
    status: 'Inactive',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&auto=format&fit=crop&q=80',
    enrolledCount: 45,
    modulesCount: 6
  },
  {
    courseTitle: 'Data Science',
    shortDescription: 'Statistics, Python, ML and real world projects.',
    category: 'Data',
    duration: '4 Months',
    fee: 40000,
    installments: '3 Installments',
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=300&auto=format&fit=crop&q=80',
    enrolledCount: 220,
    modulesCount: 6
  },
  {
    courseTitle: 'Cloud DevOps & AWS',
    shortDescription: 'CI/CD, Docker, Kubernetes and Cloud Infrastructure.',
    category: 'Development',
    duration: '4 Months',
    fee: 45000,
    installments: '3 Installments',
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&auto=format&fit=crop&q=80',
    enrolledCount: 85,
    modulesCount: 6
  },
  {
    courseTitle: 'Cybersecurity & Ethical Hacking',
    shortDescription: 'Network security, penetration testing and cryptography.',
    category: 'Security',
    duration: '5 Months',
    fee: 42000,
    installments: '4 Installments',
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&auto=format&fit=crop&q=80',
    enrolledCount: 65,
    modulesCount: 6
  },
  {
    courseTitle: 'Product Management',
    shortDescription: 'Agile, Product Roadmap, user stories and metrics.',
    category: 'Management',
    duration: '3 Months',
    fee: 35000,
    installments: '2 Installments',
    status: 'Active',
    thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&auto=format&fit=crop&q=80',
    enrolledCount: 50,
    modulesCount: 6
  },
  {
    courseTitle: 'Blockchain & Web3',
    shortDescription: 'Smart contracts, Solidity and decentralized apps.',
    category: 'Development',
    duration: '3 Months',
    fee: 38000,
    installments: '3 Installments',
    status: 'Inactive',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&auto=format&fit=crop&q=80',
    enrolledCount: 20,
    modulesCount: 6
  }
];

async function seedCourses() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is missing');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas');

  for (const course of SEED_COURSES) {
    await Course.findOneAndUpdate(
      { courseTitle: course.courseTitle },
      course,
      { upsert: true, new: true }
    );
  }

  console.log(`✅ Successfully seeded/updated ${SEED_COURSES.length} courses in MongoDB Atlas!`);
  await mongoose.disconnect();
}

seedCourses().catch(err => {
  console.error(err);
  process.exit(1);
});
