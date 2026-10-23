const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Module = require('../models/Module');

const SEED_MODULES = [
  // Digital Marketing Modules (8 modules matching media_1792754678907.png)
  {
    courseTitle: 'Digital Marketing',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Introduction to Digital Marketing',
    lessonsCount: 5,
    totalDuration: '2h 30m',
    status: 'Published',
    lessons: [
      {
        lessonNumber: 1,
        lessonTitle: 'What is Digital Marketing?',
        type: 'Video',
        duration: '15 min',
        durationMinutes: 15,
        status: 'Published',
        description: 'In this lesson, you will learn what digital marketing is, why it is important, and how it helps businesses grow online.',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isAvailable: true,
        isFreePreview: false
      },
      {
        lessonNumber: 2,
        lessonTitle: 'Career Opportunities',
        type: 'Video',
        duration: '20 min',
        durationMinutes: 20,
        status: 'Published',
        description: 'Explore the high-growth roles in digital marketing including SEO Specialist, PPC Manager, and Growth Hacker.',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isAvailable: true,
        isFreePreview: false
      },
      {
        lessonNumber: 3,
        lessonTitle: 'Digital Marketing Channels',
        type: 'PDF',
        duration: '10 min',
        durationMinutes: 10,
        status: 'Published',
        description: 'Comprehensive overview of paid, owned, and earned media channels with handy infographics.',
        videoUrl: '',
        isAvailable: true,
        isFreePreview: false
      },
      {
        lessonNumber: 4,
        lessonTitle: 'Case Study: Real Brands',
        type: 'Video',
        duration: '25 min',
        durationMinutes: 25,
        status: 'Published',
        description: 'Deep dive into successful digital marketing campaigns from Nike, Spotify, and Airbnb.',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isAvailable: true,
        isFreePreview: false
      },
      {
        lessonNumber: 5,
        lessonTitle: 'Module 1 Quiz',
        type: 'Quiz',
        duration: '10 min',
        durationMinutes: 10,
        status: 'Published',
        description: 'Knowledge check assessment on digital marketing fundamentals and core channels.',
        videoUrl: '',
        isAvailable: true,
        isFreePreview: false
      }
    ]
  },
  {
    courseTitle: 'Digital Marketing',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Website Planning & Creation',
    lessonsCount: 6,
    totalDuration: '3h 15m',
    status: 'Published',
    lessons: [
      { lessonNumber: 1, lessonTitle: 'Domain, Hosting & SSL Setup', type: 'Video', duration: '20 min', durationMinutes: 20, status: 'Published' },
      { lessonNumber: 2, lessonTitle: 'WordPress Architecture & Themes', type: 'Video', duration: '35 min', durationMinutes: 35, status: 'Published' },
      { lessonNumber: 3, lessonTitle: 'Landing Page Optimization & UX', type: 'Video', duration: '30 min', durationMinutes: 30, status: 'Published' },
      { lessonNumber: 4, lessonTitle: 'Call-to-Action & Lead Forms', type: 'Video', duration: '25 min', durationMinutes: 25, status: 'Published' },
      { lessonNumber: 5, lessonTitle: 'Website Checklist & Audit Guide', type: 'PDF', duration: '15 min', durationMinutes: 15, status: 'Published' },
      { lessonNumber: 6, lessonTitle: 'Module 2 Hands-on Project', type: 'Quiz', duration: '50 min', durationMinutes: 50, status: 'Published' }
    ]
  },
  {
    courseTitle: 'Digital Marketing',
    moduleNumber: 3,
    moduleTitle: 'Module 3: SEO (Search Engine Optimization)',
    lessonsCount: 8,
    totalDuration: '4h 20m',
    status: 'Published',
    lessons: [
      { lessonNumber: 1, lessonTitle: 'How Search Engines Crawl & Index', type: 'Video', duration: '25 min', durationMinutes: 25, status: 'Published' },
      { lessonNumber: 2, lessonTitle: 'Keyword Research & Search Intent', type: 'Video', duration: '40 min', durationMinutes: 40, status: 'Published' },
      { lessonNumber: 3, lessonTitle: 'On-Page SEO & Meta Tags', type: 'Video', duration: '35 min', durationMinutes: 35, status: 'Published' },
      { lessonNumber: 4, lessonTitle: 'Technical SEO: Speed & Schema', type: 'Video', duration: '45 min', durationMinutes: 45, status: 'Published' },
      { lessonNumber: 5, lessonTitle: 'Off-Page SEO & High DA Backlinks', type: 'Video', duration: '30 min', durationMinutes: 30, status: 'Published' },
      { lessonNumber: 6, lessonTitle: 'Google Search Console Masterclass', type: 'Video', duration: '35 min', durationMinutes: 35, status: 'Published' },
      { lessonNumber: 7, lessonTitle: 'SEO Cheat Sheet & Template', type: 'PDF', duration: '10 min', durationMinutes: 10, status: 'Published' },
      { lessonNumber: 8, lessonTitle: 'Live Site SEO Audit Challenge', type: 'Quiz', duration: '40 min', durationMinutes: 40, status: 'Published' }
    ]
  },
  {
    courseTitle: 'Digital Marketing',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Google Ads (PPC)',
    lessonsCount: 6,
    totalDuration: '3h 10m',
    status: 'Published',
    lessons: [
      { lessonNumber: 1, lessonTitle: 'Google Ads Account & Structure', type: 'Video', duration: '25 min', durationMinutes: 25, status: 'Published' },
      { lessonNumber: 2, lessonTitle: 'Search Campaigns & Match Types', type: 'Video', duration: '35 min', durationMinutes: 35, status: 'Published' },
      { lessonNumber: 3, lessonTitle: 'Display & Remarketing Campaigns', type: 'Video', duration: '30 min', durationMinutes: 30, status: 'Published' },
      { lessonNumber: 4, lessonTitle: 'Performance Max (PMax) Campaigns', type: 'Video', duration: '30 min', durationMinutes: 30, status: 'Published' },
      { lessonNumber: 5, lessonTitle: 'Bidding Strategies & Quality Score', type: 'PDF', duration: '20 min', durationMinutes: 20, status: 'Published' },
      { lessonNumber: 6, lessonTitle: 'Module 4 PPC Quiz', type: 'Quiz', duration: '15 min', durationMinutes: 15, status: 'Published' }
    ]
  },
  {
    courseTitle: 'Digital Marketing',
    moduleNumber: 5,
    moduleTitle: 'Module 5: Social Media Marketing',
    lessonsCount: 7,
    totalDuration: '3h 45m',
    status: 'Published',
    lessons: [
      { lessonNumber: 1, lessonTitle: 'Meta Ads Manager & Pixels', type: 'Video', duration: '35 min', durationMinutes: 35, status: 'Published' },
      { lessonNumber: 2, lessonTitle: 'Audience Targeting & Custom Audiences', type: 'Video', duration: '30 min', durationMinutes: 30, status: 'Published' },
      { lessonNumber: 3, lessonTitle: 'Ad Creatives, Copywriting & Hooks', type: 'Video', duration: '35 min', durationMinutes: 35, status: 'Published' },
      { lessonNumber: 4, lessonTitle: 'LinkedIn B2B Lead Gen Campaigns', type: 'Video', duration: '30 min', durationMinutes: 30, status: 'Published' },
      { lessonNumber: 5, lessonTitle: 'Instagram Reels & Influencer Outreach', type: 'Video', duration: '25 min', durationMinutes: 25, status: 'Published' },
      { lessonNumber: 6, lessonTitle: 'Social Media Strategy Template', type: 'PDF', duration: '15 min', durationMinutes: 15, status: 'Published' },
      { lessonNumber: 7, lessonTitle: 'Module 5 Campaign Quiz', type: 'Quiz', duration: '15 min', durationMinutes: 15, status: 'Published' }
    ]
  },
  {
    courseTitle: 'Digital Marketing',
    moduleNumber: 6,
    moduleTitle: 'Module 6: Email Marketing',
    lessonsCount: 4,
    totalDuration: '2h 00m',
    status: 'Published',
    lessons: [
      { lessonNumber: 1, lessonTitle: 'Email Marketing Fundamentals & Deliverability', type: 'Video', duration: '30 min', durationMinutes: 30, status: 'Published' },
      { lessonNumber: 2, lessonTitle: 'Designing Automated Drip Sequences', type: 'Video', duration: '40 min', durationMinutes: 40, status: 'Published' },
      { lessonNumber: 3, lessonTitle: 'Subject Lines & A/B Testing Guide', type: 'PDF', duration: '20 min', durationMinutes: 20, status: 'Published' },
      { lessonNumber: 4, lessonTitle: 'Module 6 Assessment', type: 'Quiz', duration: '30 min', durationMinutes: 30, status: 'Published' }
    ]
  },
  {
    courseTitle: 'Digital Marketing',
    moduleNumber: 7,
    moduleTitle: 'Module 7: Analytics & Reporting',
    lessonsCount: 4,
    totalDuration: '2h 10m',
    status: 'Published',
    lessons: [
      { lessonNumber: 1, lessonTitle: 'Google Analytics 4 (GA4) Setup & Events', type: 'Video', duration: '35 min', durationMinutes: 35, status: 'Published' },
      { lessonNumber: 2, lessonTitle: 'Google Tag Manager (GTM) Triggers', type: 'Video', duration: '40 min', durationMinutes: 40, status: 'Published' },
      { lessonNumber: 3, lessonTitle: 'Looker Studio Client Dashboards', type: 'Video', duration: '40 min', durationMinutes: 40, status: 'Published' },
      { lessonNumber: 4, lessonTitle: 'GA4 Certification Quiz', type: 'Quiz', duration: '15 min', durationMinutes: 15, status: 'Published' }
    ]
  },
  {
    courseTitle: 'Digital Marketing',
    moduleNumber: 8,
    moduleTitle: 'Module 8: Final Project',
    lessonsCount: 2,
    totalDuration: '1h 30m',
    status: 'Published',
    lessons: [
      { lessonNumber: 1, lessonTitle: 'Capstone Project Brief & Industry Requirements', type: 'Video', duration: '30 min', durationMinutes: 30, status: 'Published' },
      { lessonNumber: 2, lessonTitle: 'Final Campaign Submission & Review Rubric', type: 'Link', duration: '60 min', durationMinutes: 60, status: 'Published' }
    ]
  },

  // Data Analytics Modules
  {
    courseTitle: 'Data Analytics',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Introduction to Data Analytics',
    lessonsCount: 5,
    totalDuration: '2h 15m',
    status: 'Published',
    lessons: [
      { lessonNumber: 1, lessonTitle: 'What is Data Analytics & Industry Roles', type: 'Video', duration: '20 min', durationMinutes: 20, status: 'Published' },
      { lessonNumber: 2, lessonTitle: 'Data Types, Formats and Lifecycle', type: 'Video', duration: '25 min', durationMinutes: 25, status: 'Published' },
      { lessonNumber: 3, lessonTitle: 'Analytical Thinking & Problem Framing', type: 'PDF', duration: '15 min', durationMinutes: 15, status: 'Published' },
      { lessonNumber: 4, lessonTitle: 'Tools Overview: Excel, SQL, Tableau & Python', type: 'Video', duration: '30 min', durationMinutes: 30, status: 'Published' },
      { lessonNumber: 5, lessonTitle: 'Module 1 Knowledge Check', type: 'Quiz', duration: '15 min', durationMinutes: 15, status: 'Published' }
    ]
  },
  {
    courseTitle: 'Data Analytics',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Advanced Excel for Analytics',
    lessonsCount: 6,
    totalDuration: '3h 30m',
    status: 'Published',
    lessons: [
      { lessonNumber: 1, lessonTitle: 'XLOOKUP, INDEX/MATCH & Logical Functions', type: 'Video', duration: '35 min', durationMinutes: 35, status: 'Published' },
      { lessonNumber: 2, lessonTitle: 'Pivot Tables & Dynamic Slicers', type: 'Video', duration: '40 min', durationMinutes: 40, status: 'Published' },
      { lessonNumber: 3, lessonTitle: 'Power Query for Data Transformation', type: 'Video', duration: '45 min', durationMinutes: 45, status: 'Published' },
      { lessonNumber: 4, lessonTitle: 'Interactive Executive KPI Dashboards', type: 'Video', duration: '40 min', durationMinutes: 40, status: 'Published' },
      { lessonNumber: 5, lessonTitle: 'Excel Shortcut & Formula Handbook', type: 'PDF', duration: '15 min', durationMinutes: 15, status: 'Published' },
      { lessonNumber: 6, lessonTitle: 'Hands-on Financial Modeling Case', type: 'Quiz', duration: '35 min', durationMinutes: 35, status: 'Published' }
    ]
  }
];

async function seedModules() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is missing');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas');

  for (const mod of SEED_MODULES) {
    await Module.findOneAndUpdate(
      { courseTitle: mod.courseTitle, moduleNumber: mod.moduleNumber },
      mod,
      { upsert: true, new: true }
    );
  }

  console.log(`✅ Successfully seeded/updated ${SEED_MODULES.length} modules in MongoDB Atlas!`);
  await mongoose.disconnect();
}

seedModules().catch(err => {
  console.error(err);
  process.exit(1);
});
