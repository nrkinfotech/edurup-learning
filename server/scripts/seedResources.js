require('dotenv').config({ path: 'server/.env' });
const mongoose = require('mongoose');
const dns = require('dns');

// Atlas SRV fix
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const Resource = require('../models/Resource');

const resourcesData = [
  {
    title: "Digital Marketing Notes",
    course: "Digital Marketing",
    moduleName: "Module 1: Introduction",
    lessonName: "Overview of Modern Marketing Funnels",
    type: "PDF Document",
    fileSize: "2.4 MB",
    fileUrl: "https://eduruplearning.com/docs/digital-marketing-notes.pdf",
    status: "Published",
    description: "Comprehensive lecture notes covering fundamental marketing theories, funnel stages (TOFU, MOFU, BOFU), and modern consumer acquisition channels.",
    order: 1
  },
  {
    title: "SEO Checklist",
    course: "Digital Marketing",
    moduleName: "Module 2: SEO",
    lessonName: "On-Page & Technical SEO Audits",
    type: "PDF Document",
    fileSize: "1.1 MB",
    fileUrl: "https://eduruplearning.com/docs/seo-checklist.pdf",
    status: "Published",
    description: "42-point practical technical and on-page SEO audit checklist for indexing, meta titles, schema markup, and Core Web Vitals.",
    order: 2
  },
  {
    title: "Keyword Research Template",
    course: "Digital Marketing",
    moduleName: "Module 2: SEO",
    lessonName: "Search Intent & Keyword Mapping",
    type: "Template",
    fileSize: "450 KB",
    fileUrl: "https://eduruplearning.com/docs/keyword-research-template.xlsx",
    status: "Published",
    description: "Pre-formatted Excel sheet to categorize primary, secondary, and long-tail search queries with search volume and difficulty scoring.",
    order: 3
  },
  {
    title: "Google Ads Guide",
    course: "Digital Marketing",
    moduleName: "Module 3: Google Ads",
    lessonName: "Search & Display Campaign Architecture",
    type: "PDF Document",
    fileSize: "3.2 MB",
    fileUrl: "https://eduruplearning.com/docs/google-ads-guide.pdf",
    status: "Published",
    description: "Step-by-step PPC handbook covering bidding strategies (Target CPA, Max Conversions), ad copy extensions, and quality score optimization.",
    order: 4
  },
  {
    title: "Social Media Calendar",
    course: "Digital Marketing",
    moduleName: "Module 4: Social Media",
    lessonName: "Content Pillars & Publishing Schedule",
    type: "Template",
    fileSize: "620 KB",
    fileUrl: "https://eduruplearning.com/docs/social-media-calendar.xlsx",
    status: "Draft",
    description: "Editable content matrix organized by weekdays, target demographics, media formats (Reels, Carousels), and campaign hashtags.",
    order: 5
  },
  {
    title: "Useful Tools & Links",
    course: "Digital Marketing",
    moduleName: "Module 4: Tools",
    lessonName: "Creative & Analytics Toolkit",
    type: "External Link",
    fileSize: "-",
    externalUrl: "https://www.eduruplearning.com/tools/digital-marketing",
    status: "Published",
    description: "Curated directory of industry-standard tools including Google Trends, AnswerThePublic, Meta Ad Library, and design resources.",
    order: 6
  },
  {
    title: "Case Study: Brand Campaign",
    course: "Digital Marketing",
    moduleName: "Module 5: Case Studies",
    lessonName: "Full-Funnel Omnichannel Case Breakdown",
    type: "PDF Document",
    fileSize: "1.8 MB",
    fileUrl: "https://eduruplearning.com/docs/case-study-brand-campaign.pdf",
    status: "Published",
    description: "Real-world D2C case analysis detailing how an omnichannel rollout achieved 4.2x ROAS and scaled customer lifetime value.",
    order: 7
  },
  {
    title: "Practice Dataset",
    course: "Digital Marketing",
    moduleName: "Module 6: Analytics",
    lessonName: "Conversion Rate & Campaign Attribution",
    type: "Dataset",
    fileSize: "5.6 MB",
    fileUrl: "https://eduruplearning.com/data/marketing-campaign-dataset.csv",
    status: "Published",
    description: "Anonymized tabular dataset containing 25,000 ad impressions, clicks, CPC, conversion events, and customer retention metrics for analysis.",
    order: 8
  },
  {
    title: "Email Marketing Funnel Blueprint",
    course: "Digital Marketing",
    moduleName: "Module 5: Email Automation",
    lessonName: "Drip Campaigns & Segmentation",
    type: "PDF Document",
    fileSize: "2.1 MB",
    fileUrl: "https://eduruplearning.com/docs/email-marketing-blueprint.pdf",
    status: "Published",
    description: "Architecture breakdown of automated welcome series, abandoned cart triggers, and post-purchase customer retention funnels.",
    order: 9
  },
  {
    title: "Google Analytics 4 Setup Checklist",
    course: "Digital Marketing",
    moduleName: "Module 6: Analytics",
    lessonName: "Event Tracking & Custom Conversions",
    type: "PDF Document",
    fileSize: "1.5 MB",
    fileUrl: "https://eduruplearning.com/docs/ga4-setup-checklist.pdf",
    status: "Published",
    description: "Standard operating procedure for setting up custom dimensions, enhanced measurement, conversion events, and BigQuery link in GA4.",
    order: 10
  },
  {
    title: "Meta Ads ROAS Calculator",
    course: "Digital Marketing",
    moduleName: "Module 3: Google Ads",
    lessonName: "Budgeting & Ad Spend Planning",
    type: "Template",
    fileSize: "520 KB",
    fileUrl: "https://eduruplearning.com/docs/meta-ads-roas-calculator.xlsx",
    status: "Published",
    description: "Dynamic spreadsheet with formulas to compute break-even ROAS, CPA limits, and required traffic volume based on product margins.",
    order: 11
  },
  {
    title: "Influencer Outreach Template",
    course: "Digital Marketing",
    moduleName: "Module 4: Social Media",
    lessonName: "Influencer Negotiations & Briefs",
    type: "Template",
    fileSize: "380 KB",
    fileUrl: "https://eduruplearning.com/docs/influencer-outreach-template.docx",
    status: "Published",
    description: "Collection of cold email pitch templates, deliverable briefing contracts, and performance tracking sheets for creator collaborations.",
    order: 12
  },
  {
    title: "E-Commerce Customer Dataset",
    course: "Digital Marketing",
    moduleName: "Module 6: Analytics",
    lessonName: "Customer Lifetime Value (LTV) Modeling",
    type: "Dataset",
    fileSize: "8.4 MB",
    fileUrl: "https://eduruplearning.com/data/ecommerce-customer-behavior.csv",
    status: "Published",
    description: "Comprehensive dataset of 50,000 multi-touch attribution transactions for hands-on practice in Excel, Python, and Power BI.",
    order: 13
  },
  {
    title: "Competitor SEO Audit Guide",
    course: "Digital Marketing",
    moduleName: "Module 2: SEO",
    lessonName: "Competitive Gap Analysis",
    type: "PDF Document",
    fileSize: "2.8 MB",
    fileUrl: "https://eduruplearning.com/docs/competitor-seo-audit.pdf",
    status: "Published",
    description: "Tutorial on reverse-engineering top ranking competitor backlink profiles, domain rating, and organic content velocity.",
    order: 14
  },
  {
    title: "Content Repurposing SOP",
    course: "Digital Marketing",
    moduleName: "Module 1: Introduction",
    lessonName: "Omnichannel Distribution Workflows",
    type: "PDF Document",
    fileSize: "1.6 MB",
    fileUrl: "https://eduruplearning.com/docs/content-repurposing-sop.pdf",
    status: "Published",
    description: "Standard workflow to transform 1 long-form video or blog article into 15 micro-assets across LinkedIn, X, and Instagram.",
    order: 15
  },
  {
    title: "Marketing Attribution Model Whitepaper",
    course: "Digital Marketing",
    moduleName: "Module 6: Analytics",
    lessonName: "Multi-Touch & Data-Driven Attribution",
    type: "PDF Document",
    fileSize: "2.3 MB",
    fileUrl: "https://eduruplearning.com/docs/marketing-attribution-whitepaper.pdf",
    status: "Published",
    description: "In-depth guide comparing first-click, last-click, linear, time-decay, and algorithmic data-driven attribution models in enterprise media.",
    order: 16
  },
  {
    title: "Google Tag Manager Official Reference",
    course: "Digital Marketing",
    moduleName: "Module 6: Analytics",
    lessonName: "Tag Deployment & Trigger Rules",
    type: "External Link",
    fileSize: "-",
    externalUrl: "https://developers.google.com/tag-platform/tag-manager",
    status: "Published",
    description: "Official documentation and developer API guide for deploying tags, trigger variables, and client-side tracking containers.",
    order: 17
  },
  {
    title: "Canva Social Media Design Kit",
    course: "Digital Marketing",
    moduleName: "Module 4: Social Media",
    lessonName: "Visual Branding & Asset Creation",
    type: "External Link",
    fileSize: "-",
    externalUrl: "https://www.canva.com/templates/social-media",
    status: "Published",
    description: "Curated collection of professional Canva template kits optimized for high-engagement Instagram carousels and ad creatives.",
    order: 18
  },
  {
    title: "Ahrefs Free Keyword Generator Tool",
    course: "Digital Marketing",
    moduleName: "Module 2: SEO",
    lessonName: "Keyword Discovery & Search Trends",
    type: "External Link",
    fileSize: "-",
    externalUrl: "https://ahrefs.com/keyword-generator",
    status: "Published",
    description: "Free web utility to quickly discover trending search queries and search volume for Google, Bing, YouTube, and Amazon.",
    order: 19
  },
  {
    title: "Search Console Performance Guide",
    course: "Digital Marketing",
    moduleName: "Module 2: SEO",
    lessonName: "Index Coverage & CTR Optimization",
    type: "PDF Document",
    fileSize: "1.9 MB",
    fileUrl: "https://eduruplearning.com/docs/search-console-guide.pdf",
    status: "Published",
    description: "Manual on diagnosing indexing exclusions, crawl budget optimization, sitemap submissions, and snippet CTR enhancements.",
    order: 20
  },
  {
    title: "Copywriting Swipe File & Headline Bank",
    course: "Digital Marketing",
    moduleName: "Module 1: Introduction",
    lessonName: "Direct Response Copywriting",
    type: "PDF Document",
    fileSize: "3.5 MB",
    fileUrl: "https://eduruplearning.com/docs/copywriting-swipe-file.pdf",
    status: "Published",
    description: "100+ proven high-converting headlines, hooks, and call-to-action formulas for landing pages, ad creatives, and cold emails.",
    order: 21
  },
  {
    title: "UTM Campaign Builder Portal",
    course: "Digital Marketing",
    moduleName: "Module 6: Analytics",
    lessonName: "Campaign Tracking & Naming Conventions",
    type: "External Link",
    fileSize: "-",
    externalUrl: "https://ga-dev-tools.google/campaign-url-builder",
    status: "Published",
    description: "Google's official Campaign URL builder utility to generate custom campaign parameters for advertising and email URLs.",
    order: 22
  },
  {
    title: "Facebook Ad Policy Compliance Handbook",
    course: "Digital Marketing",
    moduleName: "Module 3: Google Ads",
    lessonName: "Policy Compliance & Ad Account Safety",
    type: "PDF Document",
    fileSize: "1.4 MB",
    fileUrl: "https://eduruplearning.com/docs/meta-ad-policy-handbook.pdf",
    status: "Published",
    description: "Essential dos and don'ts to prevent ad account restrictions, deceptive claim flags, and ensure 100% compliance with Meta advertising terms.",
    order: 23
  },
  {
    title: "HubSpot Inbound Marketing Guide",
    course: "Digital Marketing",
    moduleName: "Module 5: Email Automation",
    lessonName: "Inbound Lead Generation Strategies",
    type: "External Link",
    fileSize: "-",
    externalUrl: "https://www.hubspot.com/inbound-marketing",
    status: "Published",
    description: "Comprehensive industry benchmark guide on attracting, engaging, and delighting modern B2B and B2C consumers organically.",
    order: 24
  }
];

async function seedResources() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://nrkinfotech10:yO4c4Qc64bUaKqjT@cluster0.zcrjmxk.mongodb.net/edurup_learning?retryWrites=true&w=majority&appName=Cluster0';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully!');

    // Remove existing resources for Digital Marketing
    const delResult = await Resource.deleteMany({ course: "Digital Marketing" });
    console.log(`Cleared ${delResult.deletedCount} existing resources.`);

    // Insert new resources
    const inserted = await Resource.insertMany(resourcesData);
    console.log(`Successfully seeded ${inserted.length} resources for Digital Marketing!`);

    // Verify counts
    const total = await Resource.countDocuments({ course: "Digital Marketing" });
    const pdfCount = await Resource.countDocuments({ course: "Digital Marketing", type: "PDF Document" });
    const linkCount = await Resource.countDocuments({ course: "Digital Marketing", type: "External Link" });
    const templateCount = await Resource.countDocuments({ course: "Digital Marketing", type: "Template" });
    const datasetCount = await Resource.countDocuments({ course: "Digital Marketing", type: "Dataset" });
    const publishedCount = await Resource.countDocuments({ course: "Digital Marketing", status: "Published" });
    const draftCount = await Resource.countDocuments({ course: "Digital Marketing", status: "Draft" });

    console.log('--- VERIFICATION SUMMARY ---');
    console.log(`Total Resources: ${total} (Target: 24)`);
    console.log(`PDF Documents: ${pdfCount} (Target: 12)`);
    console.log(`External Links: ${linkCount} (Target: 6)`);
    console.log(`Templates: ${templateCount} (Target: 4)`);
    console.log(`Datasets: ${datasetCount} (Target: 2)`);
    console.log(`Published: ${publishedCount}, Draft: ${draftCount}`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding Resources Error:', err);
    process.exit(1);
  }
}

seedResources();
