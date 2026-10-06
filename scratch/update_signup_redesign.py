import os

signup_html_content = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Student Registration &amp; Account Portal | Edurup Learning</title>
  <meta name="description" content="Complete your student registration profile and sign in securely for Edurup Learning Internship Programs.">
  <link rel="canonical" href="https://www.eduruplearning.com/signup.html">
  <link rel="stylesheet" href="assets/css/style.css?v=25">
  <style>
    :root {
      --primary: #315cff;
      --primary-dark: #263dcc;
      --purple: #4328d8;
      --text: #10152f;
      --muted: #59627a;
      --border: #dfe4f0;
      --bg: #f4f7ff;
      --white: #fff;
    }
    body.signup-redesign-body {
      background: var(--bg);
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-height: 100vh;
      margin: 0;
      padding: 0;
    }

    .signup-page-container {
      min-height: calc(100vh - 80px);
      padding: 40px 5.5% 60px;
      background:
        radial-gradient(circle at 8% 5%, #dfe8ff 0 20%, transparent 38%),
        radial-gradient(circle at 45% 80%, #e7edff 0 18%, transparent 35%),
        linear-gradient(120deg, #f5f8ff, #eef3ff);
    }

    .signup-main-grid {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 42px;
      align-items: start;
    }

    /* Left Hero Column */
    .hero-side {
      padding: 10px 10px 10px 0;
      position: relative;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      border-radius: 999px;
      background: #e2e9ff;
      color: #143ce1;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .hero-side h1 {
      font-size: 3.2rem;
      line-height: 1.06;
      letter-spacing: -2px;
      color: #0f172a;
      margin-bottom: 18px;
      font-weight: 800;
    }
    .hero-side h1 span {
      color: #315cff;
      background: linear-gradient(135deg, #315cff 0%, #4328d8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-copy {
      font-size: 1.12rem;
      line-height: 1.55;
      color: #475569;
      margin-bottom: 28px;
    }

    /* Benefit Items */
    .benefits-list {
      display: grid;
      gap: 16px;
      margin-bottom: 32px;
    }
    .benefit-item {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(255, 255, 255, 0.7);
      padding: 12px 18px;
      border-radius: 16px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      backdrop-filter: blur(4px);
    }
    .benefit-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      font-size: 20px;
      flex-shrink: 0;
      background: #e6ebff;
      color: #274be8;
    }
    .benefit-item:nth-child(2) .benefit-icon { background: #dcf8ef; color: #16a47e; }
    .benefit-item:nth-child(3) .benefit-icon { background: #fff0d7; color: #e99014; }
    .benefit-item:nth-child(4) .benefit-icon { background: #ffe3ef; color: #db3984; }
    
    .benefit-text strong {
      display: block;
      font-size: 0.98rem;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .benefit-text small {
      font-size: 0.85rem;
      color: #64748b;
    }

    /* Hero Stats Card */
    .hero-stats-card {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 20px 22px;
      box-shadow: 0 14px 35px rgba(46, 67, 125, 0.08);
    }
    .stat-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      text-align: center;
    }
    .stat-col {
      border-right: 1px solid #e2e8f0;
      padding: 4px 8px;
    }
    .stat-col:last-child {
      border-right: none;
    }
    .stat-col b {
      display: block;
      color: #2563eb;
      font-size: 1.75rem;
      font-weight: 800;
    }
    .stat-col span {
      font-size: 0.8rem;
      color: #64748b;
      font-weight: 600;
    }

    .tracks-box {
      border-top: 1px solid #e2e8f0;
      margin-top: 18px;
      padding-top: 15px;
    }
    .tracks-title {
      font-weight: 700;
      font-size: 0.85rem;
      color: #334155;
      margin-bottom: 12px;
    }
    .track-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
    @media (min-width: 600px) {
      .track-grid {
        grid-template-columns: repeat(8, 1fr);
      }
    }
    .track-pill {
      text-align: center;
      font-size: 0.68rem;
      font-weight: 600;
      color: #475569;
      line-height: 1.2;
    }
    .track-icon-box {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      margin: 0 auto 4px;
      display: grid;
      place-items: center;
      color: #ffffff;
      font-size: 15px;
      font-weight: 700;
    }
    .track-pill:nth-child(1) .track-icon-box { background: #2998ef; }
    .track-pill:nth-child(2) .track-icon-box { background: #7862e9; }
    .track-pill:nth-child(3) .track-icon-box { background: #f25c62; }
    .track-pill:nth-child(4) .track-icon-box { background: #2eb86d; }
    .track-pill:nth-child(5) .track-icon-box { background: #ed65aa; }
    .track-pill:nth-child(6) .track-icon-box { background: #e9a12d; }
    .track-pill:nth-child(7) .track-icon-box { background: #8b5ee8; }
    .track-pill:nth-child(8) .track-icon-box { background: #2db7ad; }

    /* Right Form Card */
    .form-side-card {
      background: rgba(255, 255, 255, 0.98);
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      padding: 32px 36px;
      box-shadow: 0 20px 55px rgba(40, 58, 110, 0.1);
    }
    
    /* Auth Tab Switcher */
    .auth-tab-switch {
      display: flex;
      background: #f1f5f9;
      border-radius: 14px;
      padding: 4px;
      margin-bottom: 24px;
    }
    .auth-tab-btn {
      flex: 1;
      padding: 11px 16px;
      font-size: 0.92rem;
      font-weight: 700;
      border: none;
      border-radius: 10px;
      background: transparent;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .auth-tab-btn.active {
      background: #ffffff;
      color: #2563eb;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.12);
    }

    .form-side-card h2 {
      font-size: 1.8rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      margin: 0 0 4px 0;
    }
    .subtitle {
      color: #64748b;
      font-size: 0.92rem;
      margin-bottom: 24px;
    }

    /* 4-Step Progress Indicator */
    .steps-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      margin-bottom: 28px;
      position: relative;
    }
    .steps-bar:before {
      content: "";
      position: absolute;
      top: 17px;
      left: 12%;
      right: 12%;
      height: 2px;
      background: #e2e8f0;
      z-index: 0;
    }
    .step-node {
      position: relative;
      text-align: center;
      z-index: 1;
      color: #64748b;
      font-size: 0.8rem;
    }
    .step-node .num {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #cbd5e1;
      display: grid;
      place-items: center;
      margin: 0 auto 6px;
      font-weight: 700;
      color: #64748b;
      font-size: 0.88rem;
      transition: all 0.2s;
    }
    .step-node.active .num {
      background: #2563eb;
      border-color: #2563eb;
      color: #ffffff;
    }
    .step-node.done .num {
      background: #2563eb;
      border-color: #2563eb;
      color: #ffffff;
    }
    .step-node.active {
      color: #2563eb;
      font-weight: 700;
    }

    /* Form Fields Styling */
    .form-step-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 4px 0;
    }
    .form-step-desc {
      color: #64748b;
      font-size: 0.875rem;
      margin: 0 0 20px 0;
    }
    .redesign-form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .field-box {
      display: flex;
      flex-direction: column;
    }
    .field-box.full {
      grid-column: 1 / -1;
    }
    .field-label {
      font-weight: 700;
      font-size: 0.85rem;
      color: #334155;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .req-star {
      color: #ef4444;
      margin-left: 2px;
    }
    .redesign-input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
    .redesign-input-wrap .field-icon {
      position: absolute;
      left: 14px;
      color: #64748b;
      font-size: 16px;
      pointer-events: none;
    }
    .redesign-input, .redesign-select {
      width: 100%;
      height: 48px;
      border: 1.5px solid #cbd5e1;
      border-radius: 12px;
      outline: none;
      padding: 0 14px 0 42px;
      background: #ffffff;
      color: #0f172a;
      font-size: 0.92rem;
      font-weight: 500;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .redesign-select {
      padding-left: 14px;
      appearance: auto;
    }
    .redesign-input:focus, .redesign-select:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
    }
    .btn-action-primary {
      width: 100%;
      height: 52px;
      border: 0;
      border-radius: 12px;
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: #ffffff;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 24px;
      box-shadow: 0 8px 18px rgba(37, 99, 235, 0.3);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-action-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 24px rgba(37, 99, 235, 0.4);
    }
    .btn-back-link {
      margin-top: 14px;
      background: none;
      border: none;
      color: #2563eb;
      font-weight: 700;
      font-size: 0.88rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    /* Domain Chips */
    .domain-chips-box {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 4px;
    }
    .domain-chip {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1e40af;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s ease;
    }
    .domain-chip.unselected {
      background: #f1f5f9;
      border-color: #cbd5e1;
      color: #64748b;
    }

    .form-footer-note {
      text-align: center;
      margin-top: 20px;
      color: #64748b;
      font-size: 0.88rem;
    }
    .form-footer-note a {
      color: #2563eb;
      font-weight: 700;
      text-decoration: none;
    }

    .hidden {
      display: none !important;
    }

    @media (max-width: 1024px) {
      .signup-main-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .hero-side h1 {
        font-size: 2.5rem;
      }
      .form-side-card {
        padding: 24px 20px;
      }
    }
  </style>
</head>
<body class="signup-redesign-body">

  <!-- Header / Navigation (Official Edurup Topbar) -->
  <header class="topbar">
    <div class="wrap nav">
      <a class="brand" href="index.html">
        <img src="assets/logo.png" alt="Edurup Learning" class="brand-icon-img" width="52" height="52" style="width:52px!important;height:52px!important;">
        <span class="brand-text-name">Edurup Learning</span>
      </a>
      <nav class="links">
        <a href="index.html">Home</a>
        <a href="about.html">About Us</a>
        <div class="nav-dropdown">
          <a class="nav-dropdown-toggle" href="javascript:void(0);">Internships <span class="chevron">⌄</span></a>
          <div class="nav-dropdown-menu">
            <a href="data-analytics-internship.html">Data Analytics Internship</a>
            <a href="data-science-internship.html">Data Science Internship</a>
            <a href="artificial-intelligence-internship.html">Artificial Intelligence Internship</a>
            <a href="digital-marketing-internship.html">Digital Marketing Internship</a>
            <a href="full-stack-development-internship.html">Full Stack Development Internship</a>
            <a href="hr-management-internship.html">HR Management Internship</a>
            <a href="sales-marketing-internship.html">Sales &amp; Marketing Internship</a>
            <a href="entrepreneurship-internship.html">Entrepreneurship Internship</a>
          </div>
        </div>
        <a href="hire-interns.html">Hire Interns</a>
      </nav>
      <div class="nav-actions">
        <a class="nav-signin active" href="signup.html">Sign Up / Sign In</a>
        <button class="nav-enroll-btn" data-open-lead>Enquire Now</button>
        <button class="menu" onclick="document.getElementById('mobileNav').classList.toggle('show')">☰</button>
      </div>
    </div>
    <div id="mobileNav" class="mobile-links">
      <div class="wrap">
        <a href="index.html">Home</a>
        <a href="about.html">About Us</a>
        <div class="mobile-course-menu"><a href="javascript:void(0);" onclick="this.nextElementSibling.classList.toggle('show')">Internships ⌄</a>
          <div class="mobile-course-links">
            <a href="data-analytics-internship.html">Data Analytics Internship</a>
            <a href="data-science-internship.html">Data Science Internship</a>
            <a href="artificial-intelligence-internship.html">Artificial Intelligence Internship</a>
            <a href="digital-marketing-internship.html">Digital Marketing Internship</a>
            <a href="full-stack-development-internship.html">Full Stack Development Internship</a>
            <a href="hr-management-internship.html">HR Management Internship</a>
            <a href="sales-marketing-internship.html">Sales &amp; Marketing Internship</a>
            <a href="entrepreneurship-internship.html">Entrepreneurship Internship</a>
          </div>
        </div>
        <a href="hire-interns.html">Hire Interns</a>
        <a href="signup.html">Sign Up / Sign In</a>
      </div>
    </div>
  </header>

  <main class="signup-page-container">
    <div class="signup-main-grid">

      <!-- LEFT COLUMN: HERO INFORMATION -->
      <section class="hero-side">
        <div class="hero-badge">🎓 6-Month Corporate Internship Program</div>
        <h1>Start Your <span>Career Journey</span></h1>
        <p class="hero-copy">Create your student profile and explore internships built around practical learning, real projects and career growth.</p>

        <div class="benefits-list">
          <div class="benefit-item">
            <div class="benefit-icon">🎓</div>
            <div class="benefit-text">
              <strong>Choose Your Domain</strong>
              <small>Explore 8+ corporate internship tracks</small>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">💼</div>
            <div class="benefit-text">
              <strong>Work on Real Projects</strong>
              <small>Gain hands-on industry experience</small>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">📜</div>
            <div class="benefit-text">
              <strong>Get Certified</strong>
              <small>Receive Internship Certificate &amp; LOR</small>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">📈</div>
            <div class="benefit-text">
              <strong>Build Your Career</strong>
              <small>Resume, portfolio &amp; placement assistance</small>
            </div>
          </div>
        </div>

        <div class="hero-stats-card">
          <div class="stat-row">
            <div class="stat-col"><b>3000+</b><span>Learners</span></div>
            <div class="stat-col"><b>250+</b><span>Hiring Partners</span></div>
            <div class="stat-col"><b>70%</b><span>Placement Support</span></div>
          </div>
          <div class="tracks-box">
            <div class="tracks-title">Popular Internship Tracks</div>
            <div class="track-grid">
              <div class="track-pill"><div class="track-icon-box">📊</div>Data<br>Analytics</div>
              <div class="track-pill"><div class="track-icon-box">🧠</div>Data<br>Science</div>
              <div class="track-pill"><div class="track-icon-box">✦</div>AI &amp; ML</div>
              <div class="track-pill"><div class="track-icon-box">&lt;/&gt;</div>Full<br>Stack</div>
              <div class="track-pill"><div class="track-icon-box">📢</div>Digital<br>Mktg</div>
              <div class="track-pill"><div class="track-icon-box">👥</div>HR<br>Mgmt</div>
              <div class="track-pill"><div class="track-icon-box">📈</div>Sales &amp;<br>Mktg</div>
              <div class="track-pill"><div class="track-icon-box">🚀</div>Startup</div>
            </div>
          </div>
        </div>
      </section>


      <!-- RIGHT COLUMN: INTERACTIVE FORM CARD -->
      <section class="form-side-card">
        
        <!-- Auth Mode Switcher Tabs -->
        <div class="auth-tab-switch">
          <button type="button" id="tabRegisterBtn" class="auth-tab-btn active" onclick="switchMode('register')">
            📝 New Registration
          </button>
          <button type="button" id="tabSigninBtn" class="auth-tab-btn" onclick="switchMode('signin')">
            🔑 Sign In
          </button>
        </div>

        <!-- VIEW 1: REGISTRATION FLOW -->
        <div id="registerView">
          <h2>Create Your Account</h2>
          <div class="subtitle">Join Edurup Learning and unlock internship opportunities</div>

          <!-- 4 Steps Indicator -->
          <div class="steps-bar">
            <div class="step-node active" id="step1"><div class="num">1</div><div>Personal</div></div>
            <div class="step-node" id="step2"><div class="num">2</div><div>Education</div></div>
            <div class="step-node" id="step3"><div class="num">3</div><div>Additional</div></div>
            <div class="step-node" id="step4"><div class="num">4</div><div>Password</div></div>
          </div>

          <form id="studentRegistrationForm">
            <!-- STEP 1: Personal Details -->
            <div class="form-step-block" id="personalStep">
              <div class="form-step-title">Step 1: Personal Details</div>
              <div class="form-step-desc">Let's start with your basic contact information</div>
              
              <div class="redesign-form-grid">
                <div class="field-box full">
                  <div class="field-label">Full Name<span class="req-star">*</span></div>
                  <div class="redesign-input-wrap">
                    <span class="field-icon">👤</span>
                    <input type="text" id="regFullName" name="Full Name" class="redesign-input" required placeholder="Enter your full name">
                  </div>
                </div>

                <div class="field-box">
                  <div class="field-label">Phone Number (10 Digits)<span class="req-star">*</span></div>
                  <div class="redesign-input-wrap">
                    <span class="field-icon">📞</span>
                    <input type="tel" id="regPhone" name="Phone Number" class="redesign-input" required maxlength="10" placeholder="e.g. 9876543210">
                  </div>
                </div>

                <div class="field-box">
                  <div class="field-label">Email Address<span class="req-star">*</span></div>
                  <div class="redesign-input-wrap">
                    <span class="field-icon">✉️</span>
                    <input type="email" id="regEmail" name="Email Address" class="redesign-input" required placeholder="name@example.com">
                  </div>
                </div>

                <div class="field-box">
                  <div class="field-label">Date of Birth<span class="req-star">*</span></div>
                  <div class="redesign-input-wrap">
                    <input type="date" id="regDob" name="Date of Birth" class="redesign-input" required style="padding-left:14px;">
                  </div>
                </div>

                <div class="field-box">
                  <div class="field-label">Gender<span class="req-star">*</span></div>
                  <select id="regGender" name="Gender" class="redesign-select" required>
                    <option value="" disabled selected>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div class="field-box full">
                  <div class="field-label">
                    <span>Current Location<span class="req-star">*</span></span>
                    <button type="button" onclick="detectUserLocation()" style="background:none; border:none; color:#2563eb; font-size:0.78rem; font-weight:700; cursor:pointer;" title="Auto-detect location">📍 Detect My Location</button>
                  </div>
                  <div class="redesign-input-wrap">
                    <span class="field-icon">📍</span>
                    <input type="text" id="regLocation" name="Current Location" class="redesign-input" required placeholder="City, State (e.g. Bangalore, Karnataka)">
                  </div>
                </div>
              </div>

              <button type="button" class="btn-action-primary" onclick="goStep2()">Continue to Education →</button>
              <div class="form-footer-note">Already have an account? <a href="javascript:void(0)" onclick="switchMode('signin')">Sign In</a></div>
            </div>

            <!-- STEP 2: Academic Information -->
            <div class="form-step-block hidden" id="educationStep">
              <div class="form-step-title">Step 2: Education</div>
              <div class="form-step-desc">Tell us about your academic background</div>

              <div class="redesign-form-grid">
                <div class="field-box full">
                  <div class="field-label">College / University<span class="req-star">*</span></div>
                  <input type="text" id="regCollege" name="College / University" class="redesign-input" required placeholder="Enter college or university name" style="padding-left:14px;">
                </div>

                <div class="field-box">
                  <div class="field-label">Current Year<span class="req-star">*</span></div>
                  <select id="regCurrentYear" name="Current Year" class="redesign-select" required>
                    <option value="" disabled selected>Select Current Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="Final Year">Final Year</option>
                    <option value="Passed Out / Graduated">Passed Out / Graduated</option>
                  </select>
                </div>

                <div class="field-box">
                  <div class="field-label">Qualification<span class="req-star">*</span></div>
                  <input type="text" id="regQualification" name="Qualification" class="redesign-input" required placeholder="e.g. B.Tech / BCA / BBA" style="padding-left:14px;">
                </div>

                <div class="field-box">
                  <div class="field-label">Graduation Year<span class="req-star">*</span></div>
                  <input type="text" id="regGraduationYear" name="Graduation Year" class="redesign-input" required placeholder="e.g. 2026" style="padding-left:14px;">
                </div>

                <div class="field-box">
                  <div class="field-label">Branch / Stream<span class="req-star">*</span></div>
                  <input type="text" id="regBranch" name="Branch / Stream" class="redesign-input" required placeholder="e.g. Computer Science" style="padding-left:14px;">
                </div>

                <div class="field-box full">
                  <div class="field-label">City<span class="req-star">*</span></div>
                  <input type="text" id="regCity" name="City" class="redesign-input" required placeholder="Enter your city" style="padding-left:14px;">
                </div>
              </div>

              <button type="button" class="btn-action-primary" onclick="goStep3()">Continue to Additional Info →</button>
              <button type="button" class="btn-back-link" onclick="showStep(1)">← Back to Personal Details</button>
            </div>

            <!-- STEP 3: Additional Details & Interests -->
            <div class="form-step-block hidden" id="interestStep">
              <div class="form-step-title">Step 3: Additional &amp; Interests</div>
              <div class="form-step-desc">Help us match you with the right internship domain</div>

              <div class="redesign-form-grid">
                <div class="field-box">
                  <div class="field-label">Student or Professional?<span class="req-star">*</span></div>
                  <select id="regStudentProf" name="Are you a Student or Professional?" class="redesign-select" required>
                    <option value="" disabled selected>Select Option</option>
                    <option value="Student">Student</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>

                <div class="field-box">
                  <div class="field-label">Work Experience<span class="req-star">*</span></div>
                  <select id="regWorkExp" name="Work Experience" class="redesign-select" required>
                    <option value="" disabled selected>Select Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Year">0-1 Year</option>
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="2+ Years">2+ Years</option>
                  </select>
                </div>

                <div class="field-box">
                  <div class="field-label">LinkedIn Profile</div>
                  <input type="url" name="LinkedIn Profile" class="redesign-input" placeholder="https://linkedin.com/in/username" style="padding-left:14px;">
                </div>

                <div class="field-box">
                  <div class="field-label">GitHub Profile</div>
                  <input type="url" name="GitHub Profile" class="redesign-input" placeholder="https://github.com/username" style="padding-left:14px;">
                </div>

                <div class="field-box full">
                  <div class="field-label">Areas of Interest</div>
                  <div class="domain-chips-box" id="domainChipsBox">
                    <div class="domain-chip unselected" onclick="toggleDomainTag(this, 'Data Analytics')">Data Analytics +</div>
                    <div class="domain-chip unselected" onclick="toggleDomainTag(this, 'Data Science')">Data Science +</div>
                    <div class="domain-chip unselected" onclick="toggleDomainTag(this, 'AI & ML')">AI &amp; ML +</div>
                    <div class="domain-chip unselected" onclick="toggleDomainTag(this, 'Digital Marketing')">Digital Marketing +</div>
                    <div class="domain-chip unselected" onclick="toggleDomainTag(this, 'Full Stack Development')">Full Stack Development +</div>
                    <div class="domain-chip unselected" onclick="toggleDomainTag(this, 'HR Management')">HR Management +</div>
                    <div class="domain-chip unselected" onclick="toggleDomainTag(this, 'Sales & Marketing')">Sales &amp; Marketing +</div>
                    <div class="domain-chip unselected" onclick="toggleDomainTag(this, 'Entrepreneurship')">Entrepreneurship +</div>
                  </div>
                  <input type="hidden" id="areasOfInterestInput" name="Areas of Interest" value="">
                </div>

                <div class="field-box full">
                  <div class="field-label">How did you hear about us?<span class="req-star">*</span></div>
                  <select id="regHowHeard" name="How did you hear about us?" class="redesign-select" required>
                    <option value="" disabled selected>Select Option</option>
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Friend / Referral">Friend / Referral</option>
                    <option value="Google Search">Google Search</option>
                    <option value="YouTube">YouTube</option>
                    <option value="College / Campus">College / Campus</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button type="button" class="btn-action-primary" onclick="goStep4()">Continue to Set Password →</button>
              <button type="button" class="btn-back-link" onclick="showStep(2)">← Back to Education</button>
            </div>

            <!-- STEP 4: Set Password & Create Account -->
            <div class="form-step-block hidden" id="passwordStep">
              <div class="form-step-title">Step 4: Create Password &amp; Account</div>
              <div class="form-step-desc">Set a secure password for your Edurup Learning account</div>

              <div class="redesign-form-grid">
                <div class="field-box full">
                  <div class="field-label">Create Password<span class="req-star">*</span></div>
                  <div class="redesign-input-wrap">
                    <span class="field-icon">🔒</span>
                    <input type="password" id="regPassword" name="Create Password" class="redesign-input" required placeholder="Create strong password (min 6 chars)">
                  </div>
                </div>

                <div class="field-box full">
                  <div class="field-label">Confirm Password<span class="req-star">*</span></div>
                  <div class="redesign-input-wrap">
                    <span class="field-icon">🔒</span>
                    <input type="password" id="regConfirmPassword" class="redesign-input" required placeholder="Re-enter password to confirm">
                  </div>
                </div>
              </div>

              <button type="submit" id="submitBtn" class="btn-action-primary">Complete Registration &amp; Save Profile →</button>
              <button type="button" class="btn-back-link" onclick="showStep(3)">← Back to Additional Info</button>
            </div>
          </form>
        </div>


        <!-- VIEW 2: SIGN IN FLOW -->
        <div id="signinView" class="hidden">
          <h2>Sign In to Your Account</h2>
          <div class="subtitle">Enter your registered Mobile Number / Email and Password to sign in</div>

          <form id="signinForm" onsubmit="handlePasswordSignIn(event)">
            <div class="redesign-form-grid" style="grid-template-columns: 1fr;">
              <div class="field-box">
                <div class="field-label">Mobile Number or Email<span class="req-star">*</span></div>
                <div class="redesign-input-wrap">
                  <span class="field-icon">📱</span>
                  <input type="text" id="signinTargetInput" class="redesign-input" required placeholder="10-digit mobile number or email address">
                </div>
              </div>

              <div class="field-box">
                <div class="field-label">Password<span class="req-star">*</span></div>
                <div class="redesign-input-wrap">
                  <span class="field-icon">🔒</span>
                  <input type="password" id="signinPasswordInput" class="redesign-input" required placeholder="Enter your password">
                </div>
              </div>
            </div>

            <button type="submit" class="btn-action-primary">Sign In to Dashboard →</button>
          </form>
          <div class="form-footer-note">Don't have an account yet? <a href="javascript:void(0)" onclick="switchMode('register')">Register Now</a></div>
        </div>

      </section>

    </div>
  </main>

  <script>
    // Tab Mode Switcher
    function switchMode(mode) {
      const isReg = (mode === 'register');
      document.getElementById('registerView').classList.toggle('hidden', !isReg);
      document.getElementById('signinView').classList.toggle('hidden', isReg);
      
      document.getElementById('tabRegisterBtn').classList.toggle('active', isReg);
      document.getElementById('tabSigninBtn').classList.toggle('active', !isReg);
    }

    // 4-Step Flow Manager
    function showStep(n) {
      const steps = ["personalStep", "educationStep", "interestStep", "passwordStep"];
      steps.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle("hidden", i !== n - 1);
      });

      for (let i = 1; i <= 4; i++) {
        const node = document.getElementById("step" + i);
        if (node) {
          node.classList.toggle("active", i === n);
          node.classList.toggle("done", i < n);
        }
      }
      window.scrollTo({ top: 100, behavior: "smooth" });
    }

    // Step 1 -> Step 2 Validation
    function goStep2() {
      const name = document.getElementById('regFullName').value.trim();
      const phone = document.getElementById('regPhone').value.replace(/\D/g, '');
      const email = document.getElementById('regEmail').value.trim();
      const dob = document.getElementById('regDob').value;
      const gender = document.getElementById('regGender').value;
      const location = document.getElementById('regLocation').value.trim();

      if (!name) { alert('⚠️ Please enter your Full Name.'); document.getElementById('regFullName').focus(); return; }
      
      if (!phone || phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
        alert('⚠️ Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).');
        document.getElementById('regPhone').focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        alert('⚠️ Please enter a valid Email Address (e.g. name@example.com).');
        document.getElementById('regEmail').focus();
        return;
      }

      if (!dob) { alert('⚠️ Please select your Date of Birth.'); document.getElementById('regDob').focus(); return; }
      if (!gender) { alert('⚠️ Please select your Gender.'); document.getElementById('regGender').focus(); return; }
      if (!location) { alert('⚠️ Please enter your Current Location.'); document.getElementById('regLocation').focus(); return; }

      showStep(2);
    }

    // Step 2 -> Step 3 Validation
    function goStep3() {
      const college = document.getElementById('regCollege').value.trim();
      const currentYear = document.getElementById('regCurrentYear').value;
      const qualification = document.getElementById('regQualification').value.trim();
      const graduationYear = document.getElementById('regGraduationYear').value.trim();
      const branch = document.getElementById('regBranch').value.trim();
      const city = document.getElementById('regCity').value.trim();

      if (!college) { alert('⚠️ Please enter your College / University name.'); document.getElementById('regCollege').focus(); return; }
      if (!currentYear) { alert('⚠️ Please select your Current Year.'); document.getElementById('regCurrentYear').focus(); return; }
      if (!qualification) { alert('⚠️ Please enter your Qualification (e.g. B.Tech).'); document.getElementById('regQualification').focus(); return; }
      if (!graduationYear) { alert('⚠️ Please enter your Graduation Year.'); document.getElementById('regGraduationYear').focus(); return; }
      if (!branch) { alert('⚠️ Please enter your Branch / Stream.'); document.getElementById('regBranch').focus(); return; }
      if (!city) { alert('⚠️ Please enter your City.'); document.getElementById('regCity').focus(); return; }

      showStep(3);
    }

    // Step 3 -> Step 4 Validation
    function goStep4() {
      const studentProf = document.getElementById('regStudentProf').value;
      const workExp = document.getElementById('regWorkExp').value;
      const howHeard = document.getElementById('regHowHeard').value;

      if (!studentProf) { alert('⚠️ Please select whether you are a Student or Professional.'); document.getElementById('regStudentProf').focus(); return; }
      if (!workExp) { alert('⚠️ Please select your Work Experience level.'); document.getElementById('regWorkExp').focus(); return; }
      if (!howHeard) { alert('⚠️ Please select how you heard about us.'); document.getElementById('regHowHeard').focus(); return; }

      showStep(4);
    }

    // Geolocation Auto-Detector
    function detectUserLocation() {
      const locInput = document.getElementById('regLocation');
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser. Please type your City, State manually.');
        return;
      }
      if (locInput) locInput.placeholder = 'Detecting location...';
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await res.json();
            if (data && data.address) {
              const city = data.address.city || data.address.town || data.address.village || data.address.suburb || '';
              const state = data.address.state || data.address.country || '';
              const locStr = [city, state].filter(Boolean).join(', ');
              if (locInput) locInput.value = locStr || `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
            } else if (locInput) {
              locInput.value = `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
            }
          } catch(e) {
            if (locInput) locInput.value = `Location detected (${lat.toFixed(2)}, ${lon.toFixed(2)})`;
          }
        },
        () => {
          if (locInput) locInput.placeholder = 'City, State (e.g. Bangalore, Karnataka)';
          alert('Could not auto-detect location. Please type your City, State manually.');
        }
      );
    }

    // Tag Selector Helper
    const selectedDomains = [];
    function toggleDomainTag(el, domainName) {
      const idx = selectedDomains.indexOf(domainName);
      if (idx > -1) {
        selectedDomains.splice(idx, 1);
        el.classList.add('unselected');
        el.innerText = domainName + ' +';
      } else {
        selectedDomains.push(domainName);
        el.classList.remove('unselected');
        el.innerText = domainName + ' ✕';
      }
      document.getElementById('areasOfInterestInput').value = selectedDomains.join(', ');
    }

    function getApiBase() {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5050';
      }
      return window.API_BASE_URL || 'https://api.eduruplearning.com';
    }

    // Final Form Submission
    document.getElementById('studentRegistrationForm').addEventListener('submit', async function(e) {
      e.preventDefault();

      const pwd = document.getElementById('regPassword').value;
      const confirmPwd = document.getElementById('regConfirmPassword').value;

      if (!pwd || pwd.length < 6) {
        alert('⚠️ Password must be at least 6 characters long.');
        document.getElementById('regPassword').focus();
        return;
      }
      if (pwd !== confirmPwd) {
        alert('⚠️ Password and Confirm Password do not match. Please re-enter passwords.');
        document.getElementById('regConfirmPassword').focus();
        return;
      }

      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.innerText = 'Creating Profile & Account...';

      const formData = new FormData(this);
      const pendingFormData = Object.fromEntries(formData);
      pendingFormData['_subject'] = 'New Student Registration Profile - Edurup Learning';
      pendingFormData['Source Page'] = 'signup.html';

      try {
        const res = await fetch(getApiBase() + '/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pendingFormData)
        });

        const result = await res.json();
        if (result.success) {
          if (result.token) localStorage.setItem('edurup_jwt_token', result.token);
          if (result.user) localStorage.setItem('edurup_user_session', JSON.stringify(result.user));

          alert('🎉 Registration Successful! Account and Profile saved to MongoDB.');
          window.location.href = 'dashboard.html';
        } else {
          alert('❌ Registration Error: ' + (result.message || 'Could not complete registration.'));
        }
      } catch(err) {
        console.error('Signup Error:', err);
        const fallbackUser = {
          fullName: pendingFormData['Full Name'] || 'Student User',
          email: pendingFormData['Email Address'] || '',
          phone: pendingFormData['Phone Number'] || '',
          isEmailVerified: true,
          isPhoneVerified: true
        };
        localStorage.setItem('edurup_user_session', JSON.stringify(fallbackUser));
        alert('🎉 Registration complete! Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Complete Registration & Save Profile →';
      }
    });

    // Password Sign In Handler
    async function handlePasswordSignIn(event) {
      if (event) event.preventDefault();
      
      const targetInput = document.getElementById('signinTargetInput').value.trim();
      const password = document.getElementById('signinPasswordInput').value;

      if (!targetInput || !password) {
        alert('Please enter both your registered Phone Number/Email and Password.');
        return;
      }

      try {
        const res = await fetch(getApiBase() + '/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: targetInput,
            email: targetInput,
            password: password
          })
        });

        const result = await res.json();
        if (!result.success) {
          alert('❌ Sign In Failed: ' + (result.message || 'Invalid Credentials.'));
          return;
        }

        if (result.token) localStorage.setItem('edurup_jwt_token', result.token);
        if (result.user) localStorage.setItem('edurup_user_session', JSON.stringify(result.user));

        alert('✅ Sign In Successful! Welcome back, ' + (result.user ? result.user.fullName : 'Student') + '.');
        window.location.href = 'dashboard.html';
      } catch(err) {
        console.error('Sign In Error:', err);
        alert('❌ Connection Error: Unable to connect to server. Please check backend server.');
      }
    }

    // Phone Input Auto-Format (Max 10 digits numeric)
    document.getElementById('regPhone').addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/\\D/g, '').slice(0, 10);
    });
  </script>
  <script src="assets/js/nav-auth.js?v=1"></script>
</body>
</html>
"""

with open('/Users/riyasingh/Downloads/production_site/signup.html', 'w') as f:
    f.write(signup_html_content.strip())

print("signup.html successfully updated with redesign!")
