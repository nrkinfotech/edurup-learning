const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Project = require('../models/Project');

const projectsData = [
  // 1. Exact row 1 from screenshot
  {
    title: 'E-commerce Sales Analysis',
    subtitle: 'Analyze e-commerce data and create insights using Python and Power BI.',
    track: 'Data Analytics',
    difficulty: 'Beginner',
    projectType: 'Analytics',
    status: 'Published',
    description: 'Analyze e-commerce data and create insights using Python and Power BI.',
    objectives: '• Understand e-commerce data\n• Perform data cleaning and analysis\n• Create interactive dashboards\n• Present actionable insights',
    resources: [
      { title: 'Project Brief.pdf', type: 'pdf', url: '#' },
      { title: 'Sample Dataset.xlsx', type: 'excel', url: '#' },
      { title: 'Reference Article', type: 'link', url: '#' }
    ],
    instructions: 'Follow the steps in the project brief. Use the sample dataset and create a Power BI dashboard with key insights.',
    usedInInternship: true,
    order: 1
  },
  // 2. Exact row 2 from screenshot
  {
    title: 'Customer Churn Prediction',
    subtitle: 'Build a machine learning model to predict customer churn in telecommunications.',
    track: 'Data Science',
    difficulty: 'Intermediate',
    projectType: 'ML',
    status: 'Published',
    description: 'Build a machine learning model to predict customer churn in telecommunications.',
    objectives: '• Preprocess customer demographic and usage data\n• Perform exploratory data analysis (EDA)\n• Train classification models (Random Forest, XGBoost)\n• Evaluate accuracy, precision, and recall metrics',
    resources: [
      { title: 'Customer_Churn_PRD.pdf', type: 'pdf', url: '#' },
      { title: 'Telecom_Customer_Data.xlsx', type: 'excel', url: '#' },
      { title: 'ML_Best_Practices_Doc', type: 'link', url: '#' }
    ],
    instructions: 'Follow the steps in the project brief. Clean missing values, encode categoricals, and evaluate model F1 scores.',
    usedInInternship: true,
    order: 2
  },
  // 3. Exact row 3 from screenshot
  {
    title: 'Social Media Campaign',
    subtitle: 'Plan and execute a digital marketing campaign with measurable ROI.',
    track: 'Digital Marketing',
    difficulty: 'Beginner',
    projectType: 'Marketing',
    status: 'Published',
    description: 'Plan and execute a digital marketing campaign with measurable ROI.',
    objectives: '• Formulate 30-day social media content calendar\n• Write compelling ad copy and creative briefs\n• Plan ad spend budget across Meta and Google Ads\n• Track CTR, CAC, and conversion rate metrics',
    resources: [
      { title: 'Campaign_Brief.pdf', type: 'pdf', url: '#' },
      { title: 'Content_Calendar_Template.xlsx', type: 'excel', url: '#' }
    ],
    instructions: 'Create an integrated social strategy with target personas, hashtag research, and simulated ad budget allocation.',
    usedInInternship: true,
    order: 3
  },
  // 4. Exact row 4 from screenshot
  {
    title: 'Portfolio Website Development',
    subtitle: 'Build a personal portfolio using HTML, CSS, JavaScript and responsive design.',
    track: 'Full Stack',
    difficulty: 'Intermediate',
    projectType: 'Web Development',
    status: 'Published',
    description: 'Build a personal portfolio using HTML, CSS, JavaScript and responsive design.',
    objectives: '• Design mobile-responsive layout and UI components\n• Build interactive project showcase and skill badges\n• Implement contact form with client-side validation\n• Deploy to Netlify or GitHub Pages with custom domain',
    resources: [
      { title: 'Figma_Design_Spec.pdf', type: 'pdf', url: '#' },
      { title: 'Starter_Assets.zip', type: 'doc', url: '#' }
    ],
    instructions: 'Achieve 95+ score on Google Lighthouse for performance, accessibility, best practices, and SEO.',
    usedInInternship: true,
    order: 4
  },
  // 5. Exact row 5 from screenshot
  {
    title: 'HR Analytics Dashboard',
    subtitle: 'Create an HR analytics dashboard using Power BI to evaluate retention.',
    track: 'HR Management',
    difficulty: 'Intermediate',
    projectType: 'Analytics',
    status: 'Draft',
    description: 'Create an HR analytics dashboard using Power BI to evaluate retention and employee satisfaction.',
    objectives: '• Clean employee attrition and tenure records\n• Calculate department turnover and satisfaction indices\n• Build visual Power BI charts for headcount trend\n• Present actionable retention strategies to leadership',
    resources: [
      { title: 'HR_Dataset_Guide.pdf', type: 'pdf', url: '#' },
      { title: 'Employee_Attrition_Data.xlsx', type: 'excel', url: '#' }
    ],
    instructions: 'Examine key drivers of voluntary turnover across job roles, salary bands, and commute distances.',
    usedInInternship: false,
    order: 5
  },
  // 6. Exact row 6 from screenshot
  {
    title: 'Cloud Infrastructure Setup',
    subtitle: 'Deploy a web application on AWS with high availability and load balancing.',
    track: 'Cloud / DevOps',
    difficulty: 'Advanced',
    projectType: 'DevOps',
    status: 'Published',
    description: 'Deploy a web application on AWS with high availability and load balancing.',
    objectives: '• Configure custom VPC, public/private subnets, and NAT Gateway\n• Launch EC2 instances with Auto Scaling Group & ALB\n• Provision managed RDS MySQL database instance\n• Integrate S3 storage and CloudFront CDN distribution',
    resources: [
      { title: 'AWS_Architecture_Diagram.pdf', type: 'pdf', url: '#' },
      { title: 'Terraform_Scripts.zip', type: 'doc', url: '#' }
    ],
    instructions: 'Follow IAM least privilege principles and configure strict security groups for tier isolation.',
    usedInInternship: true,
    order: 6
  },
  // 7. Exact row 7 from screenshot
  {
    title: 'AI Resume Analyzer',
    subtitle: 'Build an AI tool to analyze resumes and rank candidates against job descriptions.',
    track: 'AI/ML',
    difficulty: 'Advanced',
    projectType: 'AI Application',
    status: 'Published',
    description: 'Build an AI tool to analyze resumes and rank candidates against job descriptions.',
    objectives: '• Parse PDF/DOCX resumes and extract skill entities\n• Compute semantic embeddings using transformer models\n• Calculate cosine similarity against job descriptions\n• Generate detailed candidate ranking and strengths summary',
    resources: [
      { title: 'Resume_Analyzer_Doc.pdf', type: 'pdf', url: '#' },
      { title: 'Sample_Resumes_Dataset.zip', type: 'doc', url: '#' }
    ],
    instructions: 'Use NLP techniques to highlight missing keywords and recommend tailored resume improvements.',
    usedInInternship: true,
    order: 7
  },
  // 8. Exact row 8 from screenshot
  {
    title: 'Email Marketing Automation',
    subtitle: 'Create automated email campaigns using drip sequences and segmentation.',
    track: 'Digital Marketing',
    difficulty: 'Beginner',
    projectType: 'Marketing',
    status: 'Published',
    description: 'Create automated email campaigns using drip sequences and segmentation.',
    objectives: '• Build 5-step automated drip welcome sequence\n• Segment subscriber lists based on behavioral triggers\n• Conduct A/B testing on subject lines and preview text\n• Analyze open rates, CTR, and unsubscribe patterns',
    resources: [
      { title: 'Email_Templates_Guide.pdf', type: 'pdf', url: '#' },
      { title: 'Subscriber_Segmentation.xlsx', type: 'excel', url: '#' }
    ],
    instructions: 'Design responsive HTML templates and optimize send times for higher open engagement.',
    usedInInternship: true,
    order: 8
  },
  // 9. Exact row 9 from screenshot
  {
    title: 'Inventory Management System',
    subtitle: 'Develop a full-stack inventory management application with real-time alerts.',
    track: 'Full Stack',
    difficulty: 'Intermediate',
    projectType: 'Web Development',
    status: 'Draft',
    description: 'Develop a full-stack inventory management application with real-time stock alerts.',
    objectives: '• Build RESTful CRUD endpoints for products and categories\n• Implement stock decrement logic upon checkout\n• Trigger low-stock automated email notifications\n• Implement role-based access control (Admin, Manager, Staff)',
    resources: [
      { title: 'System_Requirements.pdf', type: 'pdf', url: '#' },
      { title: 'Database_Schema.png', type: 'doc', url: '#' }
    ],
    instructions: 'Ensure ACID compliance and lock management for concurrent stock reservations.',
    usedInInternship: false,
    order: 9
  },
  // 10. Exact row 10 from screenshot
  {
    title: 'HR Recruitment Portal',
    subtitle: 'Build a recruitment portal with job posting, candidate tracking and scheduling.',
    track: 'HR Management',
    difficulty: 'Advanced',
    projectType: 'Web Development',
    status: 'Published',
    description: 'Build a recruitment portal with job posting, candidate tracking and interview scheduling.',
    objectives: '• Design public job board and application form\n• Create recruiter Kanban candidate tracking board\n• Implement interview scheduling with calendar sync\n• Send automated interview invitation and rejection emails',
    resources: [
      { title: 'Recruitment_Portal_PRD.pdf', type: 'pdf', url: '#' },
      { title: 'Interview_Scorecard.xlsx', type: 'excel', url: '#' }
    ],
    instructions: 'Build responsive views for both applicants and recruiters with live status badges.',
    usedInInternship: true,
    order: 10
  },
  // 11. Used in internship #7 (Total used in internships will be exactly 12)
  {
    title: 'Financial Sentiment Analysis',
    subtitle: 'Analyze stock market sentiment using news articles and Twitter feeds.',
    track: 'Data Science',
    difficulty: 'Intermediate',
    projectType: 'ML',
    status: 'Published',
    description: 'Analyze stock market sentiment using financial news and social media feeds.',
    objectives: '• Scrape financial headlines using BeautifulSoup\n• Apply VADER and FinBERT models for sentiment classification\n• Correlate daily sentiment polarity with price fluctuations\n• Visualize sentiment trends alongside stock candlestick charts',
    resources: [{ title: 'Finance_Sentiment_Brief.pdf', type: 'pdf', url: '#' }],
    instructions: 'Evaluate sentiment accuracy against market volatility over 90 trading days.',
    usedInInternship: true,
    order: 11
  },
  // 12. Used in internship #8
  {
    title: 'Kubernetes Microservices Deployment',
    subtitle: 'Containerize multi-tier web application and deploy on Kubernetes cluster.',
    track: 'Cloud / DevOps',
    difficulty: 'Advanced',
    projectType: 'DevOps',
    status: 'Published',
    description: 'Containerize multi-tier web application and orchestrate with Kubernetes.',
    objectives: '• Write production multi-stage Dockerfiles\n• Create Kubernetes Deployments, Services, and Ingress\n• Configure ConfigMaps and Secrets for environment configs\n• Set up Horizontal Pod Autoscaler (HPA)',
    resources: [{ title: 'K8s_Architecture.pdf', type: 'pdf', url: '#' }],
    instructions: 'Test rolling updates and zero-downtime deployment strategies.',
    usedInInternship: true,
    order: 12
  },
  // 13.
  {
    title: 'Customer Segmentation with K-Means',
    subtitle: 'Segment retail customers into target groups using unsupervised clustering.',
    track: 'Data Analytics',
    difficulty: 'Beginner',
    projectType: 'Analytics',
    status: 'Published',
    description: 'Segment retail customers into target groups using RFM and K-Means clustering.',
    objectives: '• Compute Recency, Frequency, and Monetary (RFM) metrics\n• Normalize metrics and determine optimal K via Elbow Method\n• Profile cluster characteristics and customer personas\n• Suggest targeted marketing actions for each cluster',
    resources: [{ title: 'RFM_Clustering_Brief.pdf', type: 'pdf', url: '#' }],
    instructions: 'Generate 2D and 3D cluster visualizations using Matplotlib and Seaborn.',
    usedInInternship: false,
    order: 13
  },
  // 14.
  {
    title: 'Real-Time Chat Application',
    subtitle: 'Build a real-time messaging application using Node.js, Socket.io, and React.',
    track: 'Full Stack',
    difficulty: 'Intermediate',
    projectType: 'Web Development',
    status: 'Published',
    description: 'Build a real-time messaging application using Node.js, Socket.io, and React.',
    objectives: '• Implement WebSockets for real-time bi-directional messaging\n• Build group chat rooms and direct private messaging\n• Show online/offline presence and typing indicators\n• Store message history in MongoDB with pagination',
    resources: [{ title: 'Socket_Chat_Spec.pdf', type: 'pdf', url: '#' }],
    instructions: 'Ensure messages are delivered reliably with read receipt acknowledgments.',
    usedInInternship: false,
    order: 14
  },
  // 15.
  {
    title: 'Search Engine Optimization Audit',
    subtitle: 'Perform technical SEO audit and competitive benchmark for an e-commerce brand.',
    track: 'Digital Marketing',
    difficulty: 'Beginner',
    projectType: 'Marketing',
    status: 'Published',
    description: 'Perform technical SEO audit and competitive benchmark for an e-commerce brand.',
    objectives: '• Crawl site structure with Screaming Frog\n• Identify broken links, 404s, and duplicate meta tags\n• Analyze Core Web Vitals (LCP, FID, CLS)\n• Build keyword gap matrix against top 3 competitors',
    resources: [{ title: 'SEO_Audit_Framework.pdf', type: 'pdf', url: '#' }],
    instructions: 'Present executive summary with prioritized quick wins vs long-term fixes.',
    usedInInternship: false,
    order: 15
  },
  // 16.
  {
    title: 'Employee Performance Review System',
    subtitle: 'Design a 360-degree feedback and KPI appraisal tracking tool.',
    track: 'HR Management',
    difficulty: 'Intermediate',
    projectType: 'Web Development',
    status: 'Published',
    description: 'Design a 360-degree feedback and KPI appraisal tracking tool.',
    objectives: '• Build customizable appraisal forms with rating scales\n• Allow peer, manager, and self evaluations\n• Generate consolidated performance review summary\n• Track goal completion milestones quarterly',
    resources: [{ title: 'Performance_Review_Doc.pdf', type: 'pdf', url: '#' }],
    instructions: 'Include anonymity controls for peer review submissions.',
    usedInInternship: false,
    order: 16
  },
  // 17.
  {
    title: 'Healthcare Disease Risk Classifier',
    subtitle: 'Train a medical diagnostic classifier for early diabetes risk detection.',
    track: 'Data Science',
    difficulty: 'Intermediate',
    projectType: 'ML',
    status: 'Published',
    description: 'Train a medical diagnostic classifier for early diabetes risk detection.',
    objectives: '• Handle class imbalance using SMOTE oversampling\n• Train Logistic Regression, SVM, and Gradient Boosting\n• Interpret model features using SHAP values\n• Deploy prediction API using FastAPI',
    resources: [{ title: 'Diabetes_Dataset_Brief.pdf', type: 'pdf', url: '#' }],
    instructions: 'Prioritize recall to minimize false negative diagnoses.',
    usedInInternship: false,
    order: 17
  },
  // 18.
  {
    title: 'CI/CD Pipeline with GitHub Actions',
    subtitle: 'Automate build, test, linting, and automated cloud deployments.',
    track: 'Cloud / DevOps',
    difficulty: 'Intermediate',
    projectType: 'DevOps',
    status: 'Published',
    description: 'Automate build, test, linting, and automated cloud deployments.',
    objectives: '• Create GitHub Actions workflow for pull request triggers\n• Run Jest test suites and ESLint syntax verification\n• Build Docker image and push to Amazon ECR\n• Deploy automatically to ECS or Kubernetes cluster',
    resources: [{ title: 'CICD_Workflow_Guide.pdf', type: 'pdf', url: '#' }],
    instructions: 'Add branch protection rules requiring all status checks to pass.',
    usedInInternship: false,
    order: 18
  },
  // 19.
  {
    title: 'Conversational Customer Support Bot',
    subtitle: 'Build an intelligent FAQ chatbot using LangChain and OpenAI embeddings.',
    track: 'AI/ML',
    difficulty: 'Advanced',
    projectType: 'AI Application',
    status: 'Published',
    description: 'Build an intelligent FAQ chatbot using LangChain and OpenAI embeddings.',
    objectives: '• Ingest product manuals and documentation into vector DB\n• Implement Retrieval-Augmented Generation (RAG)\n• Maintain conversational memory across user turns\n• Implement fallback to human agent when confidence is low',
    resources: [{ title: 'RAG_Chatbot_Guide.pdf', type: 'pdf', url: '#' }],
    instructions: 'Evaluate answer hallucination rate across 50 test user queries.',
    usedInInternship: false,
    order: 19
  },
  // 20.
  {
    title: 'B2B Sales Pipeline Dashboard',
    subtitle: 'Visualize sales funnel stages, conversion rates, and revenue forecasting.',
    track: 'Sales & Marketing',
    difficulty: 'Beginner',
    projectType: 'Analytics',
    status: 'Published',
    description: 'Visualize sales funnel stages, conversion rates, and revenue forecasting.',
    objectives: '• Calculate lead-to-opportunity and opportunity-to-deal win rates\n• Track average deal size and sales cycle duration\n• Create monthly revenue projections based on pipeline weighting\n• Design interactive executive summary view in Tableau',
    resources: [{ title: 'Sales_Funnel_Data.xlsx', type: 'excel', url: '#' }],
    instructions: 'Identify the primary bottleneck stage causing deal drop-offs.',
    usedInInternship: false,
    order: 20
  },
  // 21.
  {
    title: 'Startup Pitch Deck & Financial Model',
    subtitle: 'Create a 5-year pro-forma financial model and investor pitch deck.',
    track: 'Business & Innovation',
    difficulty: 'Intermediate',
    projectType: 'Analytics',
    status: 'Published',
    description: 'Create a 5-year pro-forma financial model and investor pitch deck.',
    objectives: '• Model unit economics: CAC, LTV, payback period\n• Build 5-year revenue projection and cash flow forecast\n• Design 12-slide compelling investor pitch deck\n• Estimate pre-money and post-money valuation scenarios',
    resources: [{ title: 'Financial_Model_Template.xlsx', type: 'excel', url: '#' }],
    instructions: 'Include sensitivity analysis for key pricing and churn assumptions.',
    usedInInternship: false,
    order: 21
  },
  // 22.
  {
    title: 'Supply Chain Route Optimizer',
    subtitle: 'Optimize delivery routes and fleet scheduling using linear programming.',
    track: 'Data Science',
    difficulty: 'Advanced',
    projectType: 'Analytics',
    status: 'Published',
    description: 'Optimize delivery routes and fleet scheduling using linear programming.',
    objectives: '• Formulate Vehicle Routing Problem (VRP) constraints\n• Implement PuLP / OR-Tools optimization solvers\n• Minimize total fleet fuel consumption and transit time\n• Plot optimized routes on interactive Folium map',
    resources: [{ title: 'Logistics_Data_Brief.pdf', type: 'pdf', url: '#' }],
    instructions: 'Benchmark solution against traditional heuristic dispatching.',
    usedInInternship: false,
    order: 22
  },
  // 23.
  {
    title: 'Google Ads PPC Campaign Optimization',
    subtitle: 'Restructure search campaigns for higher Quality Score and lower CPA.',
    track: 'Digital Marketing',
    difficulty: 'Intermediate',
    projectType: 'Marketing',
    status: 'Published',
    description: 'Restructure search campaigns for higher Quality Score and lower CPA.',
    objectives: '• Conduct negative keyword mining to reduce ad waste\n• Restructure ad groups into single-theme clusters\n• Write high-performing responsive search ads (RSAs)\n• Configure conversion tracking and target CPA bidding',
    resources: [{ title: 'PPC_Audit_Checklist.pdf', type: 'pdf', url: '#' }],
    instructions: 'Demonstrate at least 20% estimated reduction in Cost Per Acquisition.',
    usedInInternship: false,
    order: 23
  },
  // 24.
  {
    title: 'Blogging Platform with Markdown CMS',
    subtitle: 'Build a developer blog with Next.js, Tailwind CSS, and MDX support.',
    track: 'Full Stack',
    difficulty: 'Beginner',
    projectType: 'Web Development',
    status: 'Published',
    description: 'Build a developer blog with Next.js, Tailwind CSS, and MDX support.',
    objectives: '• Render markdown and MDX posts with syntax highlighting\n• Generate dynamic sitemap and RSS feed\n• Add dark mode toggle with local storage persistence\n• Implement search by tags and keywords',
    resources: [{ title: 'NextJS_Blog_Spec.pdf', type: 'pdf', url: '#' }],
    instructions: 'Utilize Next.js Server Components for lightning-fast page loads.',
    usedInInternship: false,
    order: 24
  },
  // 25.
  {
    title: 'Terraform Multi-Cloud Provisioning',
    subtitle: 'Write modular Infrastructure-as-Code for AWS and Azure environments.',
    track: 'Cloud / DevOps',
    difficulty: 'Advanced',
    projectType: 'DevOps',
    status: 'Published',
    description: 'Write modular Infrastructure-as-Code for AWS and Azure environments.',
    objectives: '• Structure reusable Terraform modules for networking and compute\n• Manage remote state with S3 and DynamoDB state locking\n• Enforce security compliance with tfsec and tflint\n• Implement automated terraform plan in pull requests',
    resources: [{ title: 'Terraform_Modules_Doc.pdf', type: 'pdf', url: '#' }],
    instructions: 'Ensure zero hardcoded credentials using environment secrets.',
    usedInInternship: false,
    order: 25
  },
  // 26.
  {
    title: 'Computer Vision Defect Detection',
    subtitle: 'Detect manufacturing defects on assembly line using YOLOv8.',
    track: 'AI/ML',
    difficulty: 'Advanced',
    projectType: 'ML',
    status: 'Published',
    description: 'Detect manufacturing defects on assembly line using YOLOv8.',
    objectives: '• Annotate surface crack and anomaly dataset with Roboflow\n• Fine-tune YOLOv8 model on custom manufacturing images\n• Benchmark mAP@0.5 and inference FPS on edge device\n• Build real-time webcam alert overlay with OpenCV',
    resources: [{ title: 'YOLO_Defect_Guide.pdf', type: 'pdf', url: '#' }],
    instructions: 'Achieve minimum 90% mAP on unseen factory test images.',
    usedInInternship: false,
    order: 26
  },
  // 27.
  {
    title: 'Payroll & Benefits Calculator',
    subtitle: 'Automate tax deductions, provident fund, and net pay computation.',
    track: 'HR Management',
    difficulty: 'Beginner',
    projectType: 'Analytics',
    status: 'Published',
    description: 'Automate tax deductions, provident fund, and net pay computation.',
    objectives: '• Incorporate tax brackets and standard deductions\n• Compute employer and employee PF contributions\n• Generate itemized monthly salary slips\n• Build variance report comparing monthly payroll costs',
    resources: [{ title: 'Payroll_Tax_Slabs.pdf', type: 'pdf', url: '#' }],
    instructions: 'Include automated validation for tax regime selection.',
    usedInInternship: false,
    order: 27
  },
  // 28.
  {
    title: 'Credit Card Fraud Detection',
    subtitle: 'Classify fraudulent transactions with highly imbalanced financial data.',
    track: 'Data Science',
    difficulty: 'Intermediate',
    projectType: 'ML',
    status: 'Published',
    description: 'Classify fraudulent transactions with highly imbalanced financial data.',
    objectives: '• Analyze PCA-transformed transaction features\n• Apply Isolation Forest and Autoencoder anomaly detection\n• Compare ROC-AUC and Precision-Recall AUC scores\n• Implement cost-sensitive classification matrix',
    resources: [{ title: 'Fraud_Detection_PRD.pdf', type: 'pdf', url: '#' }],
    instructions: 'Minimize false positives while capturing 95%+ of fraudulent charges.',
    usedInInternship: false,
    order: 28
  },
  // 29.
  {
    title: 'Influencer Marketing ROI Tracker',
    subtitle: 'Track affiliate links, promo codes, and influencer campaign conversions.',
    track: 'Digital Marketing',
    difficulty: 'Beginner',
    projectType: 'Marketing',
    status: 'Published',
    description: 'Track affiliate links, promo codes, and influencer campaign conversions.',
    objectives: '• Map UTM parameters to specific influencer partnerships\n• Calculate Earned Media Value (EMV) and return on ad spend\n• Compare micro-influencer vs macro-influencer engagement\n• Generate partner payout statements based on tiers',
    resources: [{ title: 'Influencer_Metrics_Doc.pdf', type: 'pdf', url: '#' }],
    instructions: 'Deliver clean visual dashboard showing revenue per dollar spent.',
    usedInInternship: false,
    order: 29
  },
  // 30.
  {
    title: 'Video Streaming Platform Prototype',
    subtitle: 'Build HLS video streaming service with adaptive bitrate playback.',
    track: 'Full Stack',
    difficulty: 'Advanced',
    projectType: 'Web Development',
    status: 'Published',
    description: 'Build HLS video streaming service with adaptive bitrate playback.',
    objectives: '• Transcode MP4 uploads into multi-resolution HLS streams\n• Implement video.js player with quality selector\n• Secure video segments using signed URLs and tokens\n• Implement watch progress resume and bookmarking',
    resources: [{ title: 'Video_Streaming_PRD.pdf', type: 'pdf', url: '#' }],
    instructions: 'Use FFmpeg for background video segment transcoding.',
    usedInInternship: false,
    order: 30
  },
  // 31.
  {
    title: 'Serverless REST API with AWS Lambda',
    subtitle: 'Build and deploy serverless endpoints with API Gateway and DynamoDB.',
    track: 'Cloud / DevOps',
    difficulty: 'Intermediate',
    projectType: 'DevOps',
    status: 'Published',
    description: 'Build and deploy serverless endpoints with API Gateway and DynamoDB.',
    objectives: '• Define serverless functions using Serverless Framework\n• Implement JWT authorization lambda authorizer\n• Query DynamoDB using single-table design principles\n• Monitor execution latency and cold starts with CloudWatch',
    resources: [{ title: 'Serverless_API_Guide.pdf', type: 'pdf', url: '#' }],
    instructions: 'Keep p99 response times under 200ms for warm requests.',
    usedInInternship: false,
    order: 31
  },
  // 32.
  {
    title: 'Customer Feedback Sentiment Dashboard',
    subtitle: 'Aggregate App Store and Play Store reviews and extract key themes.',
    track: 'Data Analytics',
    difficulty: 'Beginner',
    projectType: 'Analytics',
    status: 'Published',
    description: 'Aggregate App Store and Play Store reviews and extract key themes.',
    objectives: '• Scrape reviews using google-play-scraper\n• Tag reviews by product category (UI, Speed, Billing)\n• Calculate Net Promoter Score (NPS) proxy\n• Track sentiment shift following new app releases',
    resources: [{ title: 'App_Reviews_Dataset.xlsx', type: 'excel', url: '#' }],
    instructions: 'Highlight top 5 recurring user complaints for engineering prioritization.',
    usedInInternship: false,
    order: 32
  },
  // 33.
  {
    title: 'Audio Speech-to-Text Transcriber',
    subtitle: 'Transcribe meeting recordings into action items using Whisper.',
    track: 'AI/ML',
    difficulty: 'Advanced',
    projectType: 'AI Application',
    status: 'Published',
    description: 'Transcribe meeting recordings into action items using Whisper.',
    objectives: '• Convert audio stream to WAV chunks\n• Perform speech transcription using OpenAI Whisper\n• Summarize transcripts into bulleted action items\n• Export notes directly to Notion or PDF',
    resources: [{ title: 'Whisper_Integration_Doc.pdf', type: 'pdf', url: '#' }],
    instructions: 'Handle background noise cancellation using PyDub.',
    usedInInternship: false,
    order: 33
  },
  // 34.
  {
    title: 'Sales Compensation & Commission Plan',
    subtitle: 'Model quota attainment, tier accelerators, and sales rep commission payouts.',
    track: 'Sales & Marketing',
    difficulty: 'Intermediate',
    projectType: 'Analytics',
    status: 'Published',
    description: 'Model quota attainment, tier accelerators, and sales rep commission payouts.',
    objectives: '• Set up baseline quotas and target earning models\n• Implement accelerated commission tiers for overachievement\n• Calculate monthly and quarterly payout schedules\n• Create individual rep attainment scorecards',
    resources: [{ title: 'Sales_Commission_Template.xlsx', type: 'excel', url: '#' }],
    instructions: 'Simulate revenue outcomes under conservative and bullish sales scenarios.',
    usedInInternship: false,
    order: 34
  },
  // 35.
  {
    title: 'Campus Ambassador Program Strategy',
    subtitle: 'Design college outreach program to drive youth brand adoption.',
    track: 'Business & Innovation',
    difficulty: 'Beginner',
    projectType: 'Marketing',
    status: 'Published',
    description: 'Design college outreach program to drive youth brand adoption.',
    objectives: '• Create tiered incentive and gamification structure\n• Formulate campus workshop and webinar roadmap\n• Track student sign-ups per ambassador with referral links\n• Measure cost per student acquisition vs standard channels',
    resources: [{ title: 'Ambassador_Playbook.pdf', type: 'pdf', url: '#' }],
    instructions: 'Present onboarding kit and weekly challenge calendar.',
    usedInInternship: false,
    order: 35
  },
  // 36. (36th Published project!)
  {
    title: 'Employee Onboarding Portal',
    subtitle: 'Guide new hires through document submission, IT setup, and training checklist.',
    track: 'HR Management',
    difficulty: 'Beginner',
    projectType: 'Web Development',
    status: 'Published',
    description: 'Guide new hires through document submission, IT setup, and training checklist.',
    objectives: '• Create interactive 7-day onboarding timeline\n• Enable secure upload of identity and bank proofs\n• Automate email triggers to IT and team managers\n• Track onboarding survey satisfaction score',
    resources: [{ title: 'Onboarding_Process_Doc.pdf', type: 'pdf', url: '#' }],
    instructions: 'Ensure all personal documents are securely encrypted in cloud storage.',
    usedInInternship: false,
    order: 36
  },

  // 8 DRAFTS (Draft count = 8. Note: rows 5 and 9 are drafts, so we need 6 more drafts to total 8!)
  {
    title: 'Real Estate Price Predictor',
    subtitle: 'Predict residential property prices using regression and geospatial features.',
    track: 'Data Science',
    difficulty: 'Intermediate',
    projectType: 'ML',
    status: 'Draft',
    description: 'Predict residential property prices using regression and geospatial features.',
    objectives: '• Feature engineering: price per sqft, proximity to transit\n• Handle outliers and skewed price distributions\n• Train ensemble regression models (LightGBM, CatBoost)\n• Deploy interactive price estimator web app',
    resources: [{ title: 'Housing_Dataset_Brief.pdf', type: 'pdf', url: '#' }],
    instructions: 'Validate predictions against recent actual deed registry records.',
    usedInInternship: false,
    order: 37
  },
  {
    title: 'B2B Content Marketing Whitepaper',
    subtitle: 'Research and author an authoritative industry whitepaper for lead capture.',
    track: 'Digital Marketing',
    difficulty: 'Intermediate',
    projectType: 'Marketing',
    status: 'Draft',
    description: 'Research and author an authoritative industry whitepaper for lead capture.',
    objectives: '• Conduct survey with 50 industry professionals\n• Synthesize trends into comprehensive 15-page whitepaper\n• Create gated download landing page\n• Set up lead nurture follow-up series',
    resources: [{ title: 'Whitepaper_Draft_Outline.pdf', type: 'pdf', url: '#' }],
    instructions: 'Design high-converting lead magnet landing page copy.',
    usedInInternship: false,
    order: 38
  },
  {
    title: 'Microservices API Gateway',
    subtitle: 'Implement rate limiting, authentication, and routing with Kong.',
    track: 'Cloud / DevOps',
    difficulty: 'Advanced',
    projectType: 'DevOps',
    status: 'Draft',
    description: 'Implement rate limiting, authentication, and routing with Kong.',
    objectives: '• Configure route proxies for upstream microservices\n• Enable Redis-backed sliding window rate limiting\n• Validate OAuth2 and JWT bearer tokens at gateway\n• Stream request access logs to ELK Stack',
    resources: [{ title: 'API_Gateway_Spec.pdf', type: 'pdf', url: '#' }],
    instructions: 'Benchmark latency overhead added by gateway plugins.',
    usedInInternship: false,
    order: 39
  },
  {
    title: 'Automated Code Review Assistant',
    subtitle: 'Analyze GitHub pull requests for style, bugs, and security risks with LLMs.',
    track: 'AI/ML',
    difficulty: 'Advanced',
    projectType: 'AI Application',
    status: 'Draft',
    description: 'Analyze GitHub pull requests for style, bugs, and security risks with LLMs.',
    objectives: '• Listen to GitHub PR webhook events\n• Parse git diff chunks and extract context\n• Prompt LLM with AST and security rules\n• Post inline review comments on GitHub PR',
    resources: [{ title: 'Code_Review_Bot_PRD.pdf', type: 'pdf', url: '#' }],
    instructions: 'Filter out low-confidence hallucinations before publishing comments.',
    usedInInternship: false,
    order: 40
  },
  {
    title: 'Cold Outreach Lead Scraper',
    subtitle: 'Automate prospect list building and email verification for outbound sales.',
    track: 'Sales & Marketing',
    difficulty: 'Beginner',
    projectType: 'Analytics',
    status: 'Draft',
    description: 'Automate prospect list building and email verification for outbound sales.',
    objectives: '• Scrape company websites and directories for prospect contacts\n• Verify email deliverability using SMTP handshake checks\n• Enrich records with LinkedIn profiles and company headcount\n• Format clean CSV for upload into CRM',
    resources: [{ title: 'Scraping_Ethics_Guide.pdf', type: 'pdf', url: '#' }],
    instructions: 'Adhere to rate limits and anti-scraping policies.',
    usedInInternship: false,
    order: 41
  },
  {
    title: 'Peer-to-Peer Car Sharing Web App',
    subtitle: 'Build marketplace for peer-to-peer car rentals with payment integration.',
    track: 'Full Stack',
    difficulty: 'Advanced',
    projectType: 'Web Development',
    status: 'Draft',
    description: 'Build marketplace for peer-to-peer car rentals with payment integration.',
    objectives: '• Vehicle listing with photo upload and calendar availability\n• Stripe payment hold and release upon vehicle return\n• Geolocation search for cars nearby\n• User reviews and driver rating system',
    resources: [{ title: 'Car_Sharing_PRD.pdf', type: 'pdf', url: '#' }],
    instructions: 'Implement ID verification verification step prior to reservation.',
    usedInInternship: false,
    order: 42
  },

  // 4 ARCHIVED (So total = 36 Published + 8 Drafts + 4 Archived = 48 Total Projects!)
  {
    title: 'Legacy Monolith Migration to Docker',
    subtitle: 'Containerize legacy PHP and Apache application stack.',
    track: 'Cloud / DevOps',
    difficulty: 'Intermediate',
    projectType: 'DevOps',
    status: 'Archived',
    description: 'Containerize legacy PHP and Apache application stack.',
    objectives: '• Create Dockerfile with required PHP extensions\n• Mount volume configurations and persistent logs\n• Run with Docker Compose alongside MySQL\n• Document deployment runbook for ops team',
    resources: [{ title: 'Legacy_Migration_Doc.pdf', type: 'pdf', url: '#' }],
    instructions: 'Archived after complete cloud native rewrite.',
    usedInInternship: false,
    order: 43
  },
  {
    title: 'Simple Static HTML Company Site',
    subtitle: 'Basic 5-page company brochure site built with pure HTML and CSS.',
    track: 'Full Stack',
    difficulty: 'Beginner',
    projectType: 'Web Development',
    status: 'Archived',
    description: 'Basic 5-page company brochure site built with pure HTML and CSS.',
    objectives: '• Build homepage, about, services, team, and contact\n• Implement basic CSS flexbox grid\n• Test cross-browser compatibility',
    resources: [{ title: 'Archived_Brief.pdf', type: 'pdf', url: '#' }],
    instructions: 'Replaced by React framework portfolio projects.',
    usedInInternship: false,
    order: 44
  },
  {
    title: 'Print Ad & Billboard Campaign',
    subtitle: 'Design offline print billboards and magazine spreads for event.',
    track: 'Digital Marketing',
    difficulty: 'Beginner',
    projectType: 'Marketing',
    status: 'Archived',
    description: 'Design offline print billboards and magazine spreads for event.',
    objectives: '• Create CMYK vector print assets\n• Configure bleed lines and high-resolution specs\n• Coordinate proof approvals with print house',
    resources: [{ title: 'Print_Specs.pdf', type: 'pdf', url: '#' }],
    instructions: 'Archived as curriculum shifted completely to digital performance marketing.',
    usedInInternship: false,
    order: 45
  },
  {
    title: 'Excel VBA Macro Automation',
    subtitle: 'Automate weekly report generation using Visual Basic for Applications.',
    track: 'Data Analytics',
    difficulty: 'Beginner',
    projectType: 'Analytics',
    status: 'Archived',
    description: 'Automate weekly report generation using Visual Basic for Applications.',
    objectives: '• Write VBA modules to combine multiple workbook sheets\n• Format pivot tables and auto-generate summary email\n• Bind macros to custom ribbon buttons',
    resources: [{ title: 'VBA_Guide.pdf', type: 'pdf', url: '#' }],
    instructions: 'Archived in favor of Python and Power BI automated pipelines.',
    usedInInternship: false,
    order: 46
  },
  // Ensure we have exact 48 projects
  {
    title: 'Customer Lifetime Value Prediction',
    subtitle: 'Forecast future revenue per customer using BG/NBD and Gamma-Gamma models.',
    track: 'Data Science',
    difficulty: 'Advanced',
    projectType: 'ML',
    status: 'Published',
    description: 'Forecast future revenue per customer using probabilistic statistical models.',
    objectives: '• Estimate transaction frequency and drop-out rates\n• Predict monetary value of future purchases\n• Identify top 5% high-value customer cohort\n• Recommend retention spend thresholds by cohort',
    resources: [{ title: 'CLV_Modeling_Guide.pdf', type: 'pdf', url: '#' }],
    instructions: 'Evaluate prediction accuracy over a 6-month holdout window.',
    usedInInternship: false,
    order: 47
  },
  {
    title: 'Omnichannel Attribution Modeling',
    subtitle: 'Evaluate multi-touch attribution (First, Last, Linear, Time-Decay, Markov).',
    track: 'Digital Marketing',
    difficulty: 'Advanced',
    projectType: 'Marketing',
    status: 'Published',
    description: 'Evaluate multi-touch attribution models to allocate marketing budget accurately.',
    objectives: '• Track multi-session touchpoint journeys across organic, paid, and email\n• Implement Markov Chain removal effect in Python\n• Compare revenue credit assigned across 5 attribution models\n• Rebalance channel ad spend based on findings',
    resources: [{ title: 'Attribution_Framework.pdf', type: 'pdf', url: '#' }],
    instructions: 'Demonstrate the impact of assisted conversions on top-of-funnel channels.',
    usedInInternship: false,
    order: 48
  }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/edurup_learning';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    // Adjust statuses so that published = 36, drafts = 8, archived = 4 (total 48)
    // and usedInInternship = 12
    let publishedCount = 0;
    let draftCount = 0;
    let usedInInternshipCount = 0;

    projectsData.forEach((p, idx) => {
      if (p.status === 'Published') publishedCount++;
      if (p.status === 'Draft') draftCount++;
      if (p.usedInInternship) usedInInternshipCount++;
    });

    console.log(`Pre-seed stats: Total=${projectsData.length}, Published=${publishedCount}, Drafts=${draftCount}, UsedInInternships=${usedInInternshipCount}`);

    // If counts differ, balance them to exactly match screenshot:
    // Screenshot KPIs: 48 Total, 36 Published, 8 Drafts, 12 Used in Internships
    // Let's ensure exact counts:
    let pubTarget = 36;
    let draftTarget = 8;
    let usedTarget = 12;

    // Reset counts by enforcing
    let currentPub = 0;
    let currentDraft = 0;
    let currentUsed = 0;

    // First 10 must keep exact screenshot values:
    // #1 Pub (used: true)
    // #2 Pub (used: true)
    // #3 Pub (used: true)
    // #4 Pub (used: true)
    // #5 Draft (used: false)
    // #6 Pub (used: true)
    // #7 Pub (used: true)
    // #8 Pub (used: true)
    // #9 Draft (used: false)
    // #10 Pub (used: true)

    // Now balance remaining
    projectsData.forEach((p, idx) => {
      if (idx < 10) return; // Keep exact screenshot rows
      if (p.status === 'Published') {
        currentPub++;
      } else if (p.status === 'Draft') {
        currentDraft++;
      }
    });

    // Wipe existing Project collection
    await Project.deleteMany({});
    console.log('Cleared existing projects collection.');

    // Ensure exactly 48 items
    const truncatedData = projectsData.slice(0, 48);

    // Ensure exactly 12 usedInInternship: true
    let usedSoFar = 0;
    truncatedData.forEach((p, i) => {
      if (i < 10) {
        if (p.usedInInternship) usedSoFar++;
      } else {
        if (usedSoFar < 12 && p.status === 'Published') {
          p.usedInInternship = true;
          usedSoFar++;
        } else {
          p.usedInInternship = false;
        }
      }
    });

    // Ensure exactly 36 Published and 8 Drafts
    let pubs = 0;
    let drafts = 0;
    truncatedData.forEach((p, i) => {
      if (i < 10) {
        if (p.status === 'Published') pubs++;
        if (p.status === 'Draft') drafts++;
      } else {
        if (pubs < 36) {
          p.status = 'Published';
          pubs++;
        } else if (drafts < 8) {
          p.status = 'Draft';
          drafts++;
        } else {
          p.status = 'Archived';
        }
      }
    });

    const inserted = await Project.insertMany(truncatedData);
    console.log(`Successfully seeded ${inserted.length} projects!`);

    const finalTotal = await Project.countDocuments();
    const finalPublished = await Project.countDocuments({ status: 'Published' });
    const finalDrafts = await Project.countDocuments({ status: 'Draft' });
    const finalUsedInInternships = await Project.countDocuments({ usedInInternship: true });

    console.log('Final KPI Summary in DB:');
    console.log(`- Total Projects: ${finalTotal}`);
    console.log(`- Published: ${finalPublished}`);
    console.log(`- Drafts: ${finalDrafts}`);
    console.log(`- Used in Internships: ${finalUsedInInternships}`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
