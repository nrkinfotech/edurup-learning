const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch(e) {}

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Quiz = require('../models/Quiz');

const sampleQuizzes = [
  {
    courseTitle: 'Digital Marketing',
    moduleNumber: 1,
    moduleName: 'Module 1: Introduction to Digital Marketing',
    title: 'Digital Marketing Foundations Quiz',
    description: 'Add quiz details and create questions for this quiz.',
    durationMinutes: 30,
    totalMarks: 7,
    passingPercentage: 70,
    status: 'Published',
    attemptsAllowed: 2,
    questions: [
      {
        questionNumber: 1,
        questionType: 'Multiple Choice',
        questionText: 'What is digital marketing?',
        options: [
          { id: 'opt_1', text: 'Marketing using digital channels', isCorrect: true },
          { id: 'opt_2', text: 'Traditional print advertising', isCorrect: false },
          { id: 'opt_3', text: 'Television advertising', isCorrect: false },
          { id: 'opt_4', text: 'Direct mail marketing', isCorrect: false }
        ],
        correctAnswer: 'Marketing using digital channels',
        marks: 1,
        explanation: 'Digital marketing includes online channels like search engines, social media, email, etc.'
      },
      {
        questionNumber: 2,
        questionType: 'Multiple Select',
        questionText: 'Which of the following is a paid channel?',
        options: [
          { id: 'opt_1', text: 'Google Search Ads (PPC)', isCorrect: true },
          { id: 'opt_2', text: 'Organic SEO Blog Posts', isCorrect: false },
          { id: 'opt_3', text: 'Meta Sponsored Posts', isCorrect: true },
          { id: 'opt_4', text: 'Word of Mouth Referral', isCorrect: false }
        ],
        correctAnswer: 'Google Search Ads (PPC), Meta Sponsored Posts',
        marks: 2,
        explanation: 'Google Ads and Meta Sponsored Posts require media ad spend, whereas organic SEO is an unpaid channel.'
      },
      {
        questionNumber: 3,
        questionType: 'Fill in the Blank',
        questionText: 'SEO stands for?',
        options: [
          { id: 'opt_1', text: 'Search Engine Optimization', isCorrect: true }
        ],
        correctAnswer: 'Search Engine Optimization',
        marks: 1,
        explanation: 'SEO stands for Search Engine Optimization, the process of optimizing web pages to rank higher on search engines.'
      },
      {
        questionNumber: 4,
        questionType: 'True / False',
        questionText: 'Social media marketing is part of which type of marketing?',
        options: [
          { id: 'opt_1', text: 'Digital / Inbound Marketing (True)', isCorrect: true },
          { id: 'opt_2', text: 'Traditional Offline Media (False)', isCorrect: false }
        ],
        correctAnswer: 'Digital / Inbound Marketing (True)',
        marks: 1,
        explanation: 'Social media platforms are digital interactive channels designed for engagement and brand awareness.'
      },
      {
        questionNumber: 5,
        questionType: 'Ordering',
        questionText: 'Arrange the steps of a digital marketing campaign.',
        options: [
          { id: 'opt_1', text: '1. Define target audience & customer persona', isCorrect: true },
          { id: 'opt_2', text: '2. Select appropriate digital channels', isCorrect: true },
          { id: 'opt_3', text: '3. Create compelling copy & creative assets', isCorrect: true },
          { id: 'opt_4', text: '4. Launch, monitor, and optimize metrics', isCorrect: true }
        ],
        correctAnswer: '1, 2, 3, 4',
        marks: 2,
        explanation: 'A successful campaign begins with audience research, followed by channel selection, creative production, and live optimization.'
      }
    ]
  },
  {
    courseTitle: 'Digital Marketing',
    moduleNumber: 3,
    moduleName: 'Module 3: Search Engine Optimization',
    title: 'SEO & Keyword Strategy Assessment',
    description: 'Evaluate keyword intent, technical crawlability, and backlink strategies.',
    durationMinutes: 45,
    totalMarks: 10,
    passingPercentage: 75,
    status: 'Published',
    attemptsAllowed: 3,
    questions: [
      {
        questionNumber: 1,
        questionType: 'Multiple Choice',
        questionText: 'Which HTTP status code indicates a page has permanently moved?',
        options: [
          { id: 'opt_1', text: '301 Moved Permanently', isCorrect: true },
          { id: 'opt_2', text: '302 Temporary Redirect', isCorrect: false },
          { id: 'opt_3', text: '404 Not Found', isCorrect: false },
          { id: 'opt_4', text: '500 Internal Error', isCorrect: false }
        ],
        correctAnswer: '301 Moved Permanently',
        marks: 2,
        explanation: 'A 301 redirect passes the majority of link equity to the new target URL.'
      }
    ]
  },
  {
    courseTitle: 'Digital Marketing',
    moduleNumber: 4,
    moduleName: 'Module 4: Performance Marketing',
    title: 'Google & Meta Ads Mid-Term Quiz',
    description: 'Campaign architecture, bidding models, and conversion tracking.',
    durationMinutes: 40,
    totalMarks: 15,
    passingPercentage: 65,
    status: 'Draft',
    attemptsAllowed: 2,
    questions: [
      {
        questionNumber: 1,
        questionType: 'Multiple Choice',
        questionText: 'What metric determines ad rank on Google Search Ads?',
        options: [
          { id: 'opt_1', text: 'Quality Score multiplied by Max CPC Bid', isCorrect: true },
          { id: 'opt_2', text: 'Total account spend history', isCorrect: false },
          { id: 'opt_3', text: 'Domain age only', isCorrect: false }
        ],
        correctAnswer: 'Quality Score multiplied by Max CPC Bid',
        marks: 2,
        explanation: 'Ad Rank = Quality Score × Maximum Cost-Per-Click Bid.'
      }
    ]
  }
];

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB Atlas');

    await Quiz.deleteMany({});
    console.log('Cleared existing Quiz collection');

    const docs = await Quiz.insertMany(sampleQuizzes);
    console.log(`Successfully seeded ${docs.length} quizzes in MongoDB Atlas!`);
    process.exit(0);
  } catch (err) {
    console.error('Quiz Seeding Error:', err);
    process.exit(1);
  }
}

seed();
