const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch(e) {}

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const RecordedClass = require('../models/RecordedClass');

const sampleThumbnails = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=160&auto=format&fit=crop&q=80'
];

const digitalMarketingClasses = [
  {
    classNumber: 1,
    classTitle: 'What is Digital Marketing?',
    moduleNumber: 1,
    moduleName: 'Module 1',
    lessonNumber: 1,
    lessonName: 'What is Digital Marketing?',
    type: 'Video',
    duration: '15 min',
    durationMinutes: 15,
    uploadDate: '10 Oct 2026',
    status: 'Published',
    description: 'An extensive introduction to the digital landscape, customer touchpoints, and how modern brands win attention.',
    fileSizeMB: 34.2,
    thumbnail: sampleThumbnails[0]
  },
  {
    classNumber: 2,
    classTitle: 'Keywords Research',
    moduleNumber: 3,
    moduleName: 'Module 3',
    lessonNumber: 1,
    lessonName: 'Keyword Research Masterclass',
    type: 'Video',
    duration: '22 min',
    durationMinutes: 22,
    uploadDate: '12 Oct 2026',
    status: 'Published',
    description: 'Learn how to discover high-intent keywords using SEMrush, Ahrefs, and Google Keyword Planner.',
    fileSizeMB: 48.0,
    thumbnail: sampleThumbnails[1]
  },
  {
    classNumber: 3,
    classTitle: 'Google Ads Overview',
    moduleNumber: 4,
    moduleName: 'Module 4',
    lessonNumber: 1,
    lessonName: 'Search Campaign Architecture',
    type: 'Video',
    duration: '28 min',
    durationMinutes: 28,
    uploadDate: '14 Oct 2026',
    status: 'Published',
    description: 'Architecture of Search campaigns, Quality Score metrics, bidding strategies, and ad copywriting.',
    fileSizeMB: 62.5,
    thumbnail: sampleThumbnails[2]
  },
  {
    classNumber: 4,
    classTitle: 'Social Media Strategy',
    moduleNumber: 5,
    moduleName: 'Module 5',
    lessonNumber: 2,
    lessonName: 'Multi-Channel Social Strategy Guide',
    type: 'PDF',
    duration: '-',
    durationMinutes: 0,
    uploadDate: '16 Oct 2026',
    status: 'Published',
    description: 'Comprehensive 48-page strategy guide covering organic reach, community building, and brand voice.',
    fileSizeMB: 12.4,
    thumbnail: sampleThumbnails[3]
  },
  {
    classNumber: 5,
    classTitle: 'Email Marketing Basics',
    moduleNumber: 6,
    moduleName: 'Module 6',
    lessonNumber: 1,
    lessonName: 'Email List Growth & Segmentation',
    type: 'Video',
    duration: '20 min',
    durationMinutes: 20,
    uploadDate: '18 Oct 2026',
    status: 'Draft',
    description: 'Setting up automated welcome series, segmentation by purchase behavior, and avoiding spam filters.',
    fileSizeMB: 44.1,
    thumbnail: sampleThumbnails[4]
  },
  {
    classNumber: 6,
    classTitle: 'Analytics & Reporting',
    moduleNumber: 7,
    moduleName: 'Module 7',
    lessonNumber: 1,
    lessonName: 'Google Analytics 4 Setup & Tracking',
    type: 'Video',
    duration: '25 min',
    durationMinutes: 25,
    uploadDate: '20 Oct 2026',
    status: 'Published',
    description: 'Setting up GA4 custom events, conversion funnels, and executive client reports in Looker Studio.',
    fileSizeMB: 54.8,
    thumbnail: sampleThumbnails[5]
  },
  {
    classNumber: 7,
    classTitle: 'Case Study: Real Brands',
    moduleNumber: 1,
    moduleName: 'Module 1',
    lessonNumber: 4,
    lessonName: 'Real Brand Case Studies Deck',
    type: 'PDF',
    duration: '-',
    durationMinutes: 0,
    uploadDate: '21 Oct 2026',
    status: 'Published',
    description: 'Deep-dive analysis into Airbnb, Spotify, and Zomato customer acquisition funnels and marketing playbooks.',
    fileSizeMB: 18.2,
    thumbnail: sampleThumbnails[6]
  },
  {
    classNumber: 8,
    classTitle: 'Final Project Guide',
    moduleNumber: 8,
    moduleName: 'Module 8',
    lessonNumber: 1,
    lessonName: 'Capstone Project Brief & Guidelines',
    type: 'Video',
    duration: '18 min',
    durationMinutes: 18,
    uploadDate: '22 Oct 2026',
    status: 'Draft',
    description: 'Step-by-step instructions for submitting your 360-degree digital marketing capstone project.',
    fileSizeMB: 39.0,
    thumbnail: sampleThumbnails[7]
  }
];

// Generate additional classes to reach exactly 42 classes matching total classes = 42
const additionalTitles = [
  { title: 'Career Opportunities in Digital Marketing', mod: 1, type: 'Video', dur: '18 min', mins: 18, size: 38 },
  { title: 'Digital Marketing Channels & Flywheel', mod: 1, type: 'Video', dur: '24 min', mins: 24, size: 52 },
  { title: 'Module 1 Knowledge Check & Quiz Review', mod: 1, type: 'Video', dur: '12 min', mins: 12, size: 26 },
  { title: 'Website Architecture for SEO', mod: 2, type: 'Video', dur: '30 min', mins: 30, size: 68 },
  { title: 'On-Page SEO Optimization Checklist', mod: 2, type: 'PDF', dur: '-', mins: 0, size: 14 },
  { title: 'Technical SEO: Crawlability & Indexing', mod: 2, type: 'Video', dur: '26 min', mins: 26, size: 58 },
  { title: 'Schema Markup and Structured Data', mod: 2, type: 'Video', dur: '21 min', mins: 21, size: 46 },
  { title: 'Competitor Backlink Audit & Outreach', mod: 3, type: 'Video', dur: '25 min', mins: 25, size: 55 },
  { title: 'Long-Tail Keyword Clustering Technique', mod: 3, type: 'Video', dur: '19 min', mins: 19, size: 42 },
  { title: 'Local SEO & Google Business Profile', mod: 3, type: 'Video', dur: '23 min', mins: 23, size: 50 },
  { title: 'Display Network & Smart Bidding', mod: 4, type: 'Video', dur: '27 min', mins: 27, size: 60 },
  { title: 'YouTube Video Ad Campaign Setup', mod: 4, type: 'Video', dur: '32 min', mins: 32, size: 70 },
  { title: 'Performance Max Campaigns Deep Dive', mod: 4, type: 'Video', dur: '29 min', mins: 29, size: 64 },
  { title: 'Meta Ads Manager Setup & Pixel Tracking', mod: 5, type: 'Video', dur: '35 min', mins: 35, size: 78 },
  { title: 'Creating High-Converting Ad Creatives', mod: 5, type: 'Video', dur: '22 min', mins: 22, size: 48 },
  { title: 'Instagram Reel & TikTok Growth Strategies', mod: 5, type: 'Video', dur: '26 min', mins: 26, size: 56 },
  { title: 'LinkedIn B2B Lead Gen Campaigns', mod: 5, type: 'Video', dur: '24 min', mins: 24, size: 53 },
  { title: 'Email Copywriting Frameworks (AIDA / PAS)', mod: 6, type: 'PDF', dur: '-', mins: 0, size: 9 },
  { title: 'Marketing Automation with Mailchimp & Klaviyo', mod: 6, type: 'Video', dur: '28 min', mins: 28, size: 62, draft: true },
  { title: 'Lead Magnet Funnel Architecture', mod: 6, type: 'Video', dur: '21 min', mins: 21, size: 47 },
  { title: 'Setting Up Custom UTM Parameters', mod: 7, type: 'Video', dur: '16 min', mins: 16, size: 35 },
  { title: 'Looker Studio Executive Dashboard Template', mod: 7, type: 'PDF', dur: '-', mins: 0, size: 16 },
  { title: 'Attribution Modeling: First Touch vs Data-Driven', mod: 7, type: 'Video', dur: '22 min', mins: 22, size: 49 },
  { title: 'Conversion Rate Optimization (CRO) & Heatmaps', mod: 7, type: 'Video', dur: '25 min', mins: 25, size: 55 },
  { title: 'A/B Testing Landing Pages with Unbounce', mod: 8, type: 'Video', dur: '27 min', mins: 27, size: 59 },
  { title: 'Freelancing: Client Pitch Deck & Contracts', mod: 8, type: 'PDF', dur: '-', mins: 0, size: 15, draft: true },
  { title: 'Mock Interview: Digital Marketing Specialist', mod: 8, type: 'Video', dur: '34 min', mins: 34, size: 75 },
  { title: 'Building a Showcase Portfolio on Behance / Web', mod: 8, type: 'Video', dur: '20 min', mins: 20, size: 44 },
  { title: 'Brand Identity & Tone of Voice Blueprint', mod: 1, type: 'PDF', dur: '-', mins: 0, size: 11 },
  { title: 'E-Commerce Growth Hacks & Abandoned Cart Recovery', mod: 6, type: 'Video', dur: '23 min', mins: 23, size: 51 },
  { title: 'Influencer Marketing Sourcing & Rate Cards', mod: 5, type: 'Video', dur: '25 min', mins: 25, size: 55 },
  { title: 'Affiliate Marketing Setup for Digital Products', mod: 4, type: 'Video', dur: '20 min', mins: 20, size: 44 },
  { title: 'Podcasting & Audio Sponsorships 101', mod: 3, type: 'Link', dur: '15 min', mins: 15, size: 5 },
  { title: 'AI Tools for Marketers: ChatGPT, Midjourney, Claude', mod: 2, type: 'Video', dur: '31 min', mins: 31, size: 68 }
];

let classCounter = 9;
for (const item of additionalTitles) {
  const isDraft = item.draft === true;
  digitalMarketingClasses.push({
    classNumber: classCounter,
    classTitle: item.title,
    moduleNumber: item.mod,
    moduleName: `Module ${item.mod}`,
    lessonNumber: (classCounter % 5) + 1,
    lessonName: item.title,
    type: item.type,
    duration: item.dur,
    durationMinutes: item.mins,
    uploadDate: `${(10 + (classCounter % 15))} Oct 2026`,
    status: isDraft ? 'Draft' : 'Published',
    description: `Detailed practical walkthrough for ${item.title} covering actionable frameworks and live demonstrations.`,
    fileSizeMB: item.size,
    thumbnail: sampleThumbnails[(classCounter - 1) % sampleThumbnails.length]
  });
  classCounter++;
}

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB Atlas');

    await RecordedClass.deleteMany({});
    console.log('Cleared existing RecordedClass collection');

    const docs = await RecordedClass.insertMany(digitalMarketingClasses);
    console.log(`Successfully seeded ${docs.length} recorded classes for Digital Marketing!`);

    const publishedCount = docs.filter(d => d.status === 'Published').length;
    const draftCount = docs.filter(d => d.status === 'Draft').length;
    const totalStorage = (docs.reduce((sum, d) => sum + (d.fileSizeMB || 0), 0) / 1024).toFixed(1);

    console.log(`Summary: Total: ${docs.length}, Published: ${publishedCount}, Drafts: ${draftCount}, Storage: ${totalStorage} GB`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
