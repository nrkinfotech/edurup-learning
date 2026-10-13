import re

with open('dashboard.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add CSS for View Switcher and Pre-Payment Catalog
extra_css = """
    /* View Switcher Toggle Button in Topbar */
    .view-switch-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1d4ed8;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .view-switch-btn:hover {
      background: #dbeafe;
      border-color: #93c5fd;
      transform: translateY(-1px);
    }
    .toggle-pill-tag {
      background: #2563eb;
      color: #ffffff;
      font-size: 10px;
      padding: 2px 7px;
      border-radius: 10px;
      font-weight: 600;
    }

    /* Pre-Payment Unenrolled Catalog Styles */
    .db-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 32px;
    }
    .db-hero-card {
      background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
      border: 1px solid #c7d2fe;
      border-radius: 20px;
      padding: 32px;
      margin-bottom: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .db-hero-text h1 {
      font-size: 1.8rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 8px;
    }
    .db-hero-text p {
      font-size: 0.95rem;
      color: #475569;
      margin-bottom: 20px;
    }
    .db-hero-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 24px;
    }
    .db-stat-pill {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 8px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .db-stat-icon {
      font-size: 18px;
    }
    .db-stat-val {
      font-size: 0.92rem;
      font-weight: 800;
      color: #0f172a;
    }
    .db-stat-lbl {
      font-size: 0.75rem;
      color: #64748b;
    }
    .db-hero-btn {
      background: #2563eb;
      color: #ffffff;
      font-weight: 700;
      font-size: 0.92rem;
      padding: 12px 24px;
      border-radius: 10px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .db-section-header {
      margin-bottom: 20px;
    }
    .db-section-header h2 {
      font-size: 1.3rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .db-section-header p {
      font-size: 0.88rem;
      color: #64748b;
      margin: 0;
    }
    .journey-steps-row {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
      margin-bottom: 36px;
    }
    .journey-step-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 16px 14px;
      position: relative;
    }
    .journey-step-icon-badge {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
    }
    .journey-lock-icon {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 12px;
      color: #94a3b8;
    }
    .journey-step-card h4 {
      font-size: 0.85rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .journey-step-card p {
      font-size: 0.74rem;
      color: #64748b;
      line-height: 1.35;
      margin: 0;
    }
    .programs-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .programs-view-all {
      color: #2563eb;
      font-size: 0.88rem;
      font-weight: 700;
      text-decoration: none;
    }
    .programs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .program-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .program-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);
    }
    .program-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }
    .program-icon-badge {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .program-duration-badge {
      background: #eff6ff;
      color: #1e40af;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 10px;
    }
    .program-card h3 {
      font-size: 1.05rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 12px;
    }
    .program-features-list {
      list-style: none;
      padding: 0;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .program-features-list li {
      font-size: 0.78rem;
      color: #475569;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .program-features-list li span {
      color: #16a34a;
      font-weight: bold;
    }
    .program-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 14px;
      border-top: 1px solid #f1f5f9;
    }
    .program-price {
      font-size: 1.15rem;
      font-weight: 800;
      color: #0f172a;
    }
    .program-details-btn {
      background: #2563eb;
      color: #ffffff;
      font-size: 0.82rem;
      font-weight: 700;
      padding: 8px 16px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: background 0.2s;
    }
    .program-details-btn:hover {
      background: #1d4ed8;
    }
    .widget-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 22px;
      margin-bottom: 24px;
    }
    .enroll-widget {
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      border: 1px solid #bfdbfe;
    }
    .enroll-widget-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .enroll-widget h3 {
      font-size: 1rem;
      font-weight: 800;
      color: #1e3a8a;
      margin: 0;
    }
    .enroll-widget p {
      font-size: 0.82rem;
      color: #1e40af;
      margin-bottom: 16px;
      line-height: 1.4;
    }
    .enroll-btn-full {
      display: block;
      width: 100%;
      background: #2563eb;
      color: #ffffff;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 10px;
      border-radius: 8px;
      text-align: center;
      text-decoration: none;
    }
    .counselor-widget {
      background: #fffbebf0;
      border: 1px solid #fef3c7;
    }
    .counselor-box {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .counselor-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
    }
    .counselor-text h4 {
      font-size: 0.9rem;
      font-weight: 800;
      color: #92400e;
      margin: 0 0 2px 0;
    }
    .counselor-text p {
      font-size: 0.75rem;
      color: #78350f;
      margin: 0;
    }
    .counselor-btn {
      display: block;
      width: 100%;
      border: 1px solid #d97706;
      color: #b45309;
      background: #ffffff;
      font-weight: 700;
      font-size: 0.82rem;
      padding: 8px;
      border-radius: 8px;
      text-align: center;
      text-decoration: none;
    }
"""

# Insert extra_css right before </style>
html = html.replace('</style>', extra_css + '\n  </style>')

# 2. Add Switcher Button in topbar
switcher_button_html = """          <!-- View State Switcher Button (Demo & Toggle) -->
          <button type="button" class="view-switch-btn" onclick="toggleDashboardState()" title="Click to switch between Pre-Payment & Post-Payment views">
            <span id="toggleBtnIcon">🎓</span>
            <span id="toggleBtnText">Enrolled View</span>
            <span class="toggle-pill-tag">Switch View ⇄</span>
          </button>
"""

topbar_pattern = r'(<div class="db-topbar-right">)'
html = re.sub(topbar_pattern, r'\1\n' + switcher_button_html, html, count=1)

# 3. Wrap Enrolled content in <div id="enrolledDashboardView">
start_tag = '<main class="db-content">'
enrolled_wrapper_start = '<main class="db-content">\n\n        <!-- ================= POST-PAYMENT ENROLLED VIEW ================= -->\n        <div id="enrolledDashboardView">'
html = html.replace(start_tag, enrolled_wrapper_start, 1)

# Find where the main content ends right before </main>
end_tag = '</main>'
unenrolled_view_html = """        </div> <!-- End enrolledDashboardView -->

        <!-- ================= PRE-PAYMENT UNENROLLED CATALOG VIEW ================= -->
        <div id="unenrolledDashboardView" style="display:none;">
          <div class="db-grid">
            <!-- Left Column -->
            <div class="db-left-col">
              
              <!-- Hero Banner Card -->
              <div class="db-hero-card">
                <div class="db-hero-text">
                  <h1 id="dbPreWelcomeHeading">Welcome, Student! 👋</h1>
                  <p>Start your journey with real-world skills and corporate internship experience.</p>

                  <div class="db-hero-stats">
                    <div class="db-stat-pill">
                      <span class="db-stat-icon">🎓</span>
                      <div>
                        <div class="db-stat-val">8</div>
                        <div class="db-stat-lbl">Internship Domains</div>
                      </div>
                    </div>
                    <div class="db-stat-pill">
                      <span class="db-stat-icon">⏱️</span>
                      <div>
                        <div class="db-stat-val">6 Months</div>
                        <div class="db-stat-lbl">Program Duration</div>
                      </div>
                    </div>
                    <div class="db-stat-pill">
                      <span class="db-stat-icon">💼</span>
                      <div>
                        <div class="db-stat-val">10+</div>
                        <div class="db-stat-lbl">Real-World Projects</div>
                      </div>
                    </div>
                    <div class="db-stat-pill">
                      <span class="db-stat-icon">🏢</span>
                      <div>
                        <div class="db-stat-val">250+</div>
                        <div class="db-stat-lbl">Hiring Partners</div>
                      </div>
                    </div>
                  </div>

                  <a href="#explore-programs-pre" class="db-hero-btn">Explore Internship Programs →</a>
                </div>
              </div>

              <!-- Your Internship Journey (5-step process) -->
              <div class="db-section-header">
                <h2>Your Internship Journey</h2>
                <p>These features will be available after you enroll in an internship program.</p>
              </div>

              <div class="journey-steps-row">
                <div class="journey-step-card">
                  <span class="journey-lock-icon">🔒</span>
                  <div class="journey-step-icon-badge" style="background:#f3e8ff; color:#9333ea;">📖</div>
                  <h4>1. Learn Skills</h4>
                  <p>Access recorded videos, live classes and learning resources.</p>
                </div>

                <div class="journey-step-card">
                  <span class="journey-lock-icon">🔒</span>
                  <div class="journey-step-icon-badge" style="background:#dcfce7; color:#166534;">💻</div>
                  <h4>2. Build Projects</h4>
                  <p>Work on real-world projects with mentor guidance.</p>
                </div>

                <div class="journey-step-card">
                  <span class="journey-lock-icon">🔒</span>
                  <div class="journey-step-icon-badge" style="background:#ffedd5; color:#c2410c;">📄</div>
                  <h4>3. Apply for Internship</h4>
                  <p>Apply for corporate internship opportunities.</p>
                </div>

                <div class="journey-step-card">
                  <span class="journey-lock-icon">🔒</span>
                  <div class="journey-step-icon-badge" style="background:#eff6ff; color:#1d4ed8;">💼</div>
                  <h4>4. Internship Work</h4>
                  <p>Get assigned tasks and work with project lead.</p>
                </div>

                <div class="journey-step-card">
                  <span class="journey-lock-icon">🔒</span>
                  <div class="journey-step-icon-badge" style="background:#fce7f3; color:#be185d;">🎖️</div>
                  <h4>5. Get Certified</h4>
                  <p>Receive internship certificate and Letter of Recommendation.</p>
                </div>
              </div>

              <!-- Explore Internship Programs Grid (ALL 8 INTERNSHIPS LISTED!) -->
              <div class="programs-header" id="explore-programs-pre">
                <div class="db-section-header" style="margin-bottom:0;">
                  <h2>Explore Internship Programs</h2>
                  <p>Choose a domain to start your learning and internship journey.</p>
                </div>
                <a href="explore-internships.html" class="programs-view-all">View All Programs →</a>
              </div>

              <div class="programs-grid">
                <!-- Program 1: Data Analytics -->
                <div class="program-card">
                  <div>
                    <div class="program-card-top">
                      <div class="program-icon-badge" style="background:#eff6ff; color:#2563eb;">📊</div>
                      <span class="program-duration-badge">6 Months</span>
                    </div>
                    <h3>Data Analytics Internship</h3>
                    <ul class="program-features-list">
                      <li><span>✓</span> 10+ Real-World Projects</li>
                      <li><span>✓</span> Live Classes</li>
                      <li><span>✓</span> Mentor Support</li>
                      <li><span>✓</span> Certificate + LOR</li>
                    </ul>
                  </div>
                  <div class="program-card-footer">
                    <div class="program-price">₹9,999</div>
                    <button type="button" class="program-details-btn" onclick="initiateRazorpayPayment('Data Analytics Internship', 9999)">
                      Pay &amp; Enroll ₹9,999 →
                    </button>
                  </div>
                </div>

                <!-- Program 2: Data Science -->
                <div class="program-card">
                  <div>
                    <div class="program-card-top">
                      <div class="program-icon-badge" style="background:#f3e8ff; color:#9333ea;">🧬</div>
                      <span class="program-duration-badge">6 Months</span>
                    </div>
                    <h3>Data Science Internship</h3>
                    <ul class="program-features-list">
                      <li><span>✓</span> 10+ Real-World Projects</li>
                      <li><span>✓</span> Live Classes</li>
                      <li><span>✓</span> Mentor Support</li>
                      <li><span>✓</span> Certificate + LOR</li>
                    </ul>
                  </div>
                  <div class="program-card-footer">
                    <div class="program-price">₹9,999</div>
                    <button type="button" class="program-details-btn" onclick="initiateRazorpayPayment('Data Science Internship', 9999)">
                      Pay &amp; Enroll ₹9,999 →
                    </button>
                  </div>
                </div>

                <!-- Program 3: Artificial Intelligence -->
                <div class="program-card">
                  <div>
                    <div class="program-card-top">
                      <div class="program-icon-badge" style="background:#dcfce7; color:#15803d;">🤖</div>
                      <span class="program-duration-badge">6 Months</span>
                    </div>
                    <h3>Artificial Intelligence Internship</h3>
                    <ul class="program-features-list">
                      <li><span>✓</span> 10+ Real-World Projects</li>
                      <li><span>✓</span> Live Classes</li>
                      <li><span>✓</span> Mentor Support</li>
                      <li><span>✓</span> Certificate + LOR</li>
                    </ul>
                  </div>
                  <div class="program-card-footer">
                    <div class="program-price">₹9,999</div>
                    <button type="button" class="program-details-btn" onclick="initiateRazorpayPayment('Artificial Intelligence Internship', 9999)">
                      Pay &amp; Enroll ₹9,999 →
                    </button>
                  </div>
                </div>

                <!-- Program 4: Digital Marketing -->
                <div class="program-card">
                  <div>
                    <div class="program-card-top">
                      <div class="program-icon-badge" style="background:#fce7f3; color:#be185d;">📣</div>
                      <span class="program-duration-badge">6 Months</span>
                    </div>
                    <h3>Digital Marketing Internship</h3>
                    <ul class="program-features-list">
                      <li><span>✓</span> 10+ Real-World Projects</li>
                      <li><span>✓</span> Live Classes</li>
                      <li><span>✓</span> Mentor Support</li>
                      <li><span>✓</span> Certificate + LOR</li>
                    </ul>
                  </div>
                  <div class="program-card-footer">
                    <div class="program-price">₹9,999</div>
                    <button type="button" class="program-details-btn" onclick="initiateRazorpayPayment('Digital Marketing Internship', 9999)">
                      Pay &amp; Enroll ₹9,999 →
                    </button>
                  </div>
                </div>

                <!-- Program 5: Full Stack Development -->
                <div class="program-card">
                  <div>
                    <div class="program-card-top">
                      <div class="program-icon-badge" style="background:#e0f2fe; color:#0369a1;">&lt;/&gt;</div>
                      <span class="program-duration-badge">6 Months</span>
                    </div>
                    <h3>Full Stack Development Internship</h3>
                    <ul class="program-features-list">
                      <li><span>✓</span> 10+ Real-World Projects</li>
                      <li><span>✓</span> Live Classes</li>
                      <li><span>✓</span> Mentor Support</li>
                      <li><span>✓</span> Certificate + LOR</li>
                    </ul>
                  </div>
                  <div class="program-card-footer">
                    <div class="program-price">₹9,999</div>
                    <button type="button" class="program-details-btn" onclick="initiateRazorpayPayment('Full Stack Development Internship', 9999)">
                      Pay &amp; Enroll ₹9,999 →
                    </button>
                  </div>
                </div>

                <!-- Program 6: HR Management -->
                <div class="program-card">
                  <div>
                    <div class="program-card-top">
                      <div class="program-icon-badge" style="background:#ffedd5; color:#c2410c;">👥</div>
                      <span class="program-duration-badge">6 Months</span>
                    </div>
                    <h3>HR Management Internship</h3>
                    <ul class="program-features-list">
                      <li><span>✓</span> 10+ Real-World Projects</li>
                      <li><span>✓</span> Live Classes</li>
                      <li><span>✓</span> Mentor Support</li>
                      <li><span>✓</span> Certificate + LOR</li>
                    </ul>
                  </div>
                  <div class="program-card-footer">
                    <div class="program-price">₹9,999</div>
                    <button type="button" class="program-details-btn" onclick="initiateRazorpayPayment('HR Management Internship', 9999)">
                      Pay &amp; Enroll ₹9,999 →
                    </button>
                  </div>
                </div>

                <!-- Program 7: Sales & Marketing -->
                <div class="program-card">
                  <div>
                    <div class="program-card-top">
                      <div class="program-icon-badge" style="background:#f3e8ff; color:#7e22ce;">🎯</div>
                      <span class="program-duration-badge">6 Months</span>
                    </div>
                    <h3>Sales &amp; Marketing Internship</h3>
                    <ul class="program-features-list">
                      <li><span>✓</span> 10+ Real-World Projects</li>
                      <li><span>✓</span> Live Classes</li>
                      <li><span>✓</span> Mentor Support</li>
                      <li><span>✓</span> Certificate + LOR</li>
                    </ul>
                  </div>
                  <div class="program-card-footer">
                    <div class="program-price">₹9,999</div>
                    <button type="button" class="program-details-btn" onclick="initiateRazorpayPayment('Sales & Marketing Internship', 9999)">
                      Pay &amp; Enroll ₹9,999 →
                    </button>
                  </div>
                </div>

                <!-- Program 8: Entrepreneurship -->
                <div class="program-card">
                  <div>
                    <div class="program-card-top">
                      <div class="program-icon-badge" style="background:#fef3c7; color:#b45309;">💡</div>
                      <span class="program-duration-badge">6 Months</span>
                    </div>
                    <h3>Entrepreneurship Internship</h3>
                    <ul class="program-features-list">
                      <li><span>✓</span> 10+ Real-World Projects</li>
                      <li><span>✓</span> Live Classes</li>
                      <li><span>✓</span> Mentor Support</li>
                      <li><span>✓</span> Certificate + LOR</li>
                    </ul>
                  </div>
                  <div class="program-card-footer">
                    <div class="program-price">₹9,999</div>
                    <button type="button" class="program-details-btn" onclick="initiateRazorpayPayment('Entrepreneurship Internship', 9999)">
                      Pay &amp; Enroll ₹9,999 →
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <!-- Right Column Widgets -->
            <div class="db-right-col">
              
              <!-- Widget 1: Complete Your Enrollment -->
              <div class="widget-card enroll-widget">
                <div class="enroll-widget-header">
                  <span style="font-size:22px;">🚀</span>
                  <h3>Complete Your Enrollment</h3>
                </div>
                <p>Choose your internship domain and get instant access to learning, projects, mentor support and certification.</p>
                <a href="#explore-programs-pre" class="enroll-btn-full">View Internship Programs →</a>
              </div>

              <!-- Widget 2: Need Help Choosing? -->
              <div class="widget-card counselor-widget">
                <div class="counselor-box">
                  <img src="assets/ananya-avatar.jpg" class="counselor-avatar" alt="Career Counselor">
                  <div class="counselor-text">
                    <h4>Need Help Choosing?</h4>
                    <p>Talk to our career counselor and get personalized guidance.</p>
                  </div>
                </div>
                <a href="contact.html" class="counselor-btn">Talk to Counselor →</a>
              </div>

            </div>
          </div>
        </div> <!-- End unenrolledDashboardView -->
"""

html = html.replace(end_tag, unenrolled_view_html + '\n      </main>', 1)

# 4. Update JS logic for switching states and payment
js_helpers = """
    // --- DASHBOARD STATE SWITCHER (PRE-PAYMENT VS ENROLLED) ---
    function switchDashboardState(state) {
      const enrolledEl = document.getElementById('enrolledDashboardView');
      const unenrolledEl = document.getElementById('unenrolledDashboardView');
      const toggleBtnText = document.getElementById('toggleBtnText');
      const toggleBtnIcon = document.getElementById('toggleBtnIcon');

      if (state === 'enrolled') {
        if (enrolledEl) enrolledEl.style.display = 'block';
        if (unenrolledEl) unenrolledEl.style.display = 'none';
        if (toggleBtnText) toggleBtnText.innerText = 'Enrolled View (Post-Payment)';
        if (toggleBtnIcon) toggleBtnIcon.innerText = '🎓';
        renderActiveModuleLessons();
      } else {
        if (enrolledEl) enrolledEl.style.display = 'none';
        if (unenrolledEl) unenrolledEl.style.display = 'block';
        if (toggleBtnText) toggleBtnText.innerText = 'Pre-Payment Catalog View';
        if (toggleBtnIcon) toggleBtnIcon.innerText = '🛒';
      }
    }

    function toggleDashboardState() {
      const enrolledEl = document.getElementById('enrolledDashboardView');
      const isEnrolledVisible = (enrolledEl && enrolledEl.style.display !== 'none');
      switchDashboardState(isEnrolledVisible ? 'prepayment' : 'enrolled');
    }

    // Razorpay Payment Handler for Pre-Payment Catalog
    async function initiateRazorpayPayment(programName, price) {
      const sessionStr = localStorage.getItem('edurup_user_session');
      let user = {};
      if (sessionStr) {
        try { user = JSON.parse(sessionStr); } catch(e) {}
      }

      let razorpayKey = localStorage.getItem('edurup_razorpay_key_id') || 'rzp_live_TkeiDdCJIZzmpX';
      let orderId = null;

      try {
        const res = await fetch(getApiBase() + '/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: price || 9999, programName })
        });
        const data = await res.json();
        if (data.keyId) razorpayKey = data.keyId.trim();
        if (data.success && data.order && data.order.id) orderId = data.order.id;
      } catch(e) {
        console.warn('Backend order notice:', e);
      }

      if (typeof Razorpay === 'undefined') {
        alert('Razorpay Checkout SDK is loading. Please check internet connection.');
        return;
      }

      const options = {
        key: razorpayKey,
        amount: (price || 9999) * 100,
        currency: "INR",
        name: "Edurup Learning",
        description: "6-Month Internship Program - " + programName,
        image: "assets/logo.png",
        prefill: {
          name: user.fullName || user.name || "",
          email: user.email || "",
          contact: user.phone || ""
        },
        theme: { color: "#2563eb" },
        handler: function (response) {
          alert("🎉 Payment Successful!\\n\\nTransaction ID: " + response.razorpay_payment_id + "\\nProgram: " + programName);
          const activeEnrollment = {
            programName,
            price,
            paymentId: response.razorpay_payment_id,
            status: 'Active',
            date: new Date().toLocaleDateString()
          };
          localStorage.setItem('edurup_active_enrollment', JSON.stringify(activeEnrollment));
          switchDashboardState('enrolled');
        }
      };

      if (orderId) options.order_id = orderId;
      const rzp = new Razorpay(options);
      rzp.open();
    }
"""

# Replace DOMContentLoaded in html
dom_content_pattern = r'document\.addEventListener\(\'DOMContentLoaded\', \(\) => \{'
replacement_dom = js_helpers + """
    document.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const viewParam = urlParams.get('view');
      const hasActiveEnrollment = localStorage.getItem('edurup_active_enrollment');

      // Check URL query param first: ?view=prepayment vs ?view=enrolled
      if (viewParam === 'prepayment' || viewParam === 'catalog') {
        switchDashboardState('prepayment');
      } else if (viewParam === 'enrolled') {
        switchDashboardState('enrolled');
      } else if (hasActiveEnrollment) {
        switchDashboardState('enrolled');
      } else {
        // Default to enrolled view for preview, or switch to prepayment if unset
        switchDashboardState('enrolled');
      }
"""

html = re.sub(dom_content_pattern, replacement_dom, html, count=1)

with open('dashboard.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated dashboard.html successfully!')
