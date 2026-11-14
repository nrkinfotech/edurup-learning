import re
import os

PAGES_CONFIG = {
    'admin-dashboard.html': 'dashboard',
    'admin-students.html': 'students-all',
    'admin-add-student.html': 'students-add',
    'admin-batches.html': 'students-batches',
    'admin-progress.html': 'students-progress',
    'admin-active-dropped.html': 'students-active-dropped',
    'admin-courses.html': 'learning-courses',
    'admin-modules.html': 'learning-modules',
    'admin-recorded-classes.html': 'learning-recorded',
    'admin-quizzes.html': 'learning-quizzes',
    'admin-resources.html': 'learning-resources',
    'admin-internships.html': 'internships-all',
    'admin-projects.html': 'internships-projects',
    'admin-mentors.html': 'internships-mentors',
    'admin-applications.html': 'internships-applications',
    'admin-tasks.html': 'tasks-all',
    'admin-all-projects.html': 'tasks-projects',
    'admin-task-submissions.html': 'tasks-submissions',
    'admin-project-submissions.html': 'tasks-project-submissions',
    'admin-recurring-tasks.html': 'tasks-recurring',
    'admin-assign-tasks.html': 'tasks-assign',
}

SIDEBAR_CSS = """
    /* ---------------- UNIFIED ADMIN SIDEBAR ---------------- */
    aside.sidebar {
      width: 260px;
      background: #0B132B !important;
      color: #cbd5e1 !important;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      min-height: 100vh;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      z-index: 100;
      transition: all 0.3s ease;
    }

    aside.sidebar::-webkit-scrollbar {
      width: 4px;
    }
    aside.sidebar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    .sidebar-header {
      padding: 24px 20px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .brand-logo-badge {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-weight: 800;
      font-size: 20px;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
      flex-shrink: 0;
    }

    .brand-info h2 {
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
    }

    .brand-info span {
      font-size: 11px;
      color: #94a3b8;
      font-weight: 500;
    }

    .sidebar-nav {
      padding: 16px 12px 30px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }

    .nav-item-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #94a3b8;
      background: transparent;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .nav-item-btn:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }

    .nav-item-btn.active {
      background: #2563eb !important;
      color: #ffffff !important;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3) !important;
    }

    .nav-item-btn.active-category {
      color: #ffffff !important;
      background: rgba(37, 99, 235, 0.15) !important;
    }

    .nav-item-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .nav-item-left i {
      font-size: 14px;
      width: 18px;
      text-align: center;
    }

    .nav-chevron {
      font-size: 10px;
      transition: transform 0.2s ease;
      color: #64748b;
    }

    .nav-group.open .nav-chevron {
      transform: rotate(180deg);
    }

    .nav-sublist {
      display: none;
      flex-direction: column;
      gap: 2px;
      padding-left: 36px;
      padding-top: 4px;
      padding-bottom: 6px;
    }

    .nav-group.open .nav-sublist {
      display: flex;
    }

    .nav-subitem {
      padding: 7px 10px;
      font-size: 12.5px;
      color: #94a3b8;
      text-decoration: none;
      border-radius: 6px;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-subitem:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }

    .nav-subitem.active-subitem {
      color: #ffffff !important;
      font-weight: 700 !important;
      background: #2563eb !important;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3) !important;
    }

    .nav-subitem::before {
      content: "•";
      font-size: 14px;
      color: #475569;
    }

    .nav-subitem.active-subitem::before {
      color: #ffffff !important;
    }
    .nav-subitem:hover::before {
      color: #60a5fa;
    }

    /* Toast Notification */
    .toast-msg {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 9999;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
    }

    .toast-msg.show {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }

    @media (max-width: 900px) {
      aside.sidebar {
        position: fixed;
        left: -260px;
      }
      aside.sidebar.mobile-open {
        left: 0;
      }
    }
"""

def build_sidebar_html(page_key):
    is_dashboard = (page_key == 'dashboard')
    is_students = page_key.startswith('students-')
    is_learning = page_key.startswith('learning-')
    is_internships = page_key.startswith('internships-')
    is_tasks = page_key.startswith('tasks-')

    # Dashboard active class
    dashboard_active = ' active' if is_dashboard else ''

    # Students Management classes
    students_open = ' open' if is_students else ''
    students_cat_active = ' active-category' if is_students else ''
    all_students_active = ' active-subitem' if page_key == 'students-all' else ''
    add_student_active = ' active-subitem' if page_key == 'students-add' else ''
    batches_active = ' active-subitem' if page_key == 'students-batches' else ''
    progress_active = ' active-subitem' if page_key == 'students-progress' else ''
    active_dropped_active = ' active-subitem' if page_key == 'students-active-dropped' else ''

    # Learning Management classes
    learning_open = ' open' if is_learning else ''
    learning_cat_active = ' active-category' if is_learning else ''
    courses_active = ' active-subitem' if page_key == 'learning-courses' else ''
    modules_active = ' active-subitem' if page_key == 'learning-modules' else ''
    recorded_active = ' active-subitem' if page_key == 'learning-recorded' else ''
    quizzes_active = ' active-subitem' if page_key == 'learning-quizzes' else ''
    resources_active = ' active-subitem' if page_key == 'learning-resources' else ''

    # Internship Management classes
    internships_open = ' open' if is_internships else ''
    internships_cat_active = ' active-category' if is_internships else ''
    internships_sub_active = ' active-subitem' if page_key == 'internships-all' else ''
    projects_active = ' active-subitem' if page_key == 'internships-projects' else ''
    mentors_active = ' active-subitem' if page_key == 'internships-mentors' else ''
    applications_active = ' active-subitem' if page_key == 'internships-applications' else ''

    # Tasks & Projects classes
    tasks_open = ' open' if is_tasks else ''
    tasks_cat_active = ' active-category' if is_tasks else ''
    tasks_all_active = ' active-subitem' if page_key == 'tasks-all' else ''
    tasks_projects_active = ' active-subitem' if page_key == 'tasks-projects' else ''
    tasks_submissions_active = ' active-subitem' if page_key == 'tasks-submissions' else ''
    tasks_proj_submissions_active = ' active-subitem' if page_key == 'tasks-project-submissions' else ''
    tasks_assign_active = ' active-subitem' if page_key == 'tasks-assign' else ''
    tasks_recurring_active = ' active-subitem' if page_key == 'tasks-recurring' else ''

    return f"""  <!-- ================= SIDEBAR ================= -->
  <aside class="sidebar" id="adminSidebar">
    <div class="sidebar-header">
      <div class="brand-logo-badge">E</div>
      <div class="brand-info">
        <h2>Edurup Learning</h2>
        <span>Admin Panel</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <!-- Dashboard -->
      <a href="admin-dashboard.html" class="nav-item-btn{dashboard_active}">
        <div class="nav-item-left">
          <i class="fa-solid fa-house"></i>
          <span>Dashboard</span>
        </div>
      </a>

      <!-- Students Management -->
      <div class="nav-group{students_open}" id="navGroupStudents">
        <button type="button" class="nav-item-btn{students_cat_active}" onclick="toggleNavGroup('navGroupStudents')">
          <div class="nav-item-left">
            <i class="fa-solid fa-users"></i>
            <span>Students Management</span>
          </div>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </button>
        <div class="nav-sublist">
          <a href="admin-students.html" class="nav-subitem{all_students_active}">All Students</a>
          <a href="admin-add-student.html" class="nav-subitem{add_student_active}">Add Student</a>
          <a href="admin-batches.html" class="nav-subitem{batches_active}">Student Batches</a>
          <a href="admin-progress.html" class="nav-subitem{progress_active}">Student Progress</a>
          <a href="admin-active-dropped.html" class="nav-subitem{active_dropped_active}">Active / Dropped</a>
        </div>
      </div>

      <!-- Learning Management -->
      <div class="nav-group{learning_open}" id="navGroupLearning">
        <button type="button" class="nav-item-btn{learning_cat_active}" onclick="toggleNavGroup('navGroupLearning')">
          <div class="nav-item-left">
            <i class="fa-solid fa-graduation-cap"></i>
            <span>Learning Management</span>
          </div>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </button>
        <div class="nav-sublist">
          <a href="admin-courses.html" class="nav-subitem{courses_active}">Courses</a>
          <a href="admin-modules.html" class="nav-subitem{modules_active}">Modules & Content</a>
          <a href="admin-recorded-classes.html" class="nav-subitem{recorded_active}">Recorded Classes</a>
          <a href="live-classes.html" class="nav-subitem">Live Classes</a>
          <a href="admin-quizzes.html" class="nav-subitem{quizzes_active}">Quizzes & Assessments</a>
          <a href="admin-resources.html" class="nav-subitem{resources_active}">Learning Resources</a>
        </div>
      </div>

      <!-- Internship Management -->
      <div class="nav-group{internships_open}" id="navGroupInternships">
        <button type="button" class="nav-item-btn{internships_cat_active}" onclick="toggleNavGroup('navGroupInternships')">
          <div class="nav-item-left">
            <i class="fa-solid fa-briefcase"></i>
            <span>Internship Management</span>
          </div>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </button>
        <div class="nav-sublist">
          <a href="admin-internships.html" class="nav-subitem{internships_sub_active}">Internships</a>
          <a href="admin-projects.html" class="nav-subitem{projects_active}">Projects</a>
          <a href="admin-mentors.html" class="nav-subitem{mentors_active}">Mentors</a>
          <a href="admin-applications.html" class="nav-subitem{applications_active}">Applications</a>
          <a href="admin-progress.html" class="nav-subitem">Student Progress</a>
          <a href="javascript:void(0)" onclick="showToast('Certificates section opening soon')" class="nav-subitem">Certificates</a>
        </div>
      </div>

      <!-- Tasks & Projects -->
      <div class="nav-group{tasks_open}" id="navGroupTasks">
        <button type="button" class="nav-item-btn{tasks_cat_active}" onclick="toggleNavGroup('navGroupTasks')">
          <div class="nav-item-left">
            <i class="fa-solid fa-list-check"></i>
            <span>Tasks & Projects</span>
          </div>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </button>
        <div class="nav-sublist">
          <a href="admin-tasks.html" class="nav-subitem{tasks_all_active}">All Tasks</a>
          <a href="admin-all-projects.html" class="nav-subitem{tasks_projects_active}">All Projects</a>
          <a href="admin-task-submissions.html" class="nav-subitem{tasks_submissions_active}">Task Submissions</a>
          <a href="admin-project-submissions.html" class="nav-subitem{tasks_proj_submissions_active}">Project Submissions</a>
          <a href="admin-assign-tasks.html" class="nav-subitem{tasks_assign_active}">Assign Tasks</a>
          <a href="javascript:void(0)" onclick="showToast('Task Templates library opening soon')" class="nav-subitem">Task Templates</a>
          <a href="admin-recurring-tasks.html" class="nav-subitem{tasks_recurring_active}">Recurring Tasks</a>
        </div>
      </div>

      <!-- Companies & Mentors -->
      <div class="nav-group" id="navGroupCompanies">
        <button type="button" class="nav-item-btn" onclick="toggleNavGroup('navGroupCompanies')">
          <div class="nav-item-left">
            <i class="fa-solid fa-building"></i>
            <span>Companies & Mentors</span>
          </div>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </button>
        <div class="nav-sublist">
          <a href="javascript:void(0)" onclick="showToast('Partner Companies desk opening soon')" class="nav-subitem">Partner Companies</a>
          <a href="admin-mentors.html" class="nav-subitem">Mentors</a>
          <a href="admin-mentors.html" class="nav-subitem">Mentor Assignments</a>
        </div>
      </div>

      <!-- Attendance & Reports -->
      <div class="nav-group" id="navGroupAttendance">
        <button type="button" class="nav-item-btn" onclick="toggleNavGroup('navGroupAttendance')">
          <div class="nav-item-left">
            <i class="fa-solid fa-calendar-check"></i>
            <span>Attendance & Reports</span>
          </div>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </button>
        <div class="nav-sublist">
          <a href="javascript:void(0)" onclick="showToast('Attendance: 87% (612 present, 68 absent)')" class="nav-subitem">Attendance</a>
          <a href="javascript:void(0)" onclick="showToast('Weekly Reports: 46 submitted, 42 approved')" class="nav-subitem">Weekly Reports</a>
        </div>
      </div>

      <!-- Certificates & LOR -->
      <div class="nav-group" id="navGroupCertificates">
        <button type="button" class="nav-item-btn" onclick="toggleNavGroup('navGroupCertificates')">
          <div class="nav-item-left">
            <i class="fa-solid fa-award"></i>
            <span>Certificates & LOR</span>
          </div>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </button>
        <div class="nav-sublist">
          <a href="javascript:void(0)" onclick="showToast('Generate Certificate desk opening soon')" class="nav-subitem">Generate Certificate</a>
          <a href="javascript:void(0)" onclick="showToast('Letter of Recommendation desk ready')" class="nav-subitem">Letter of Recommendation</a>
        </div>
      </div>

      <!-- Reports & Analytics -->
      <div class="nav-group" id="navGroupReports">
        <button type="button" class="nav-item-btn" onclick="toggleNavGroup('navGroupReports')">
          <div class="nav-item-left">
            <i class="fa-solid fa-chart-pie"></i>
            <span>Reports & Analytics</span>
          </div>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </button>
        <div class="nav-sublist">
          <a href="javascript:void(0)" onclick="showToast('Exporting system reports...')" class="nav-subitem">Export Excel / PDF</a>
          <a href="javascript:void(0)" onclick="showToast('Placement Metrics: 71% placement success rate')" class="nav-subitem">Placement Metrics</a>
        </div>
      </div>

      <!-- Finance -->
      <div class="nav-group" id="navGroupFinance">
        <button type="button" class="nav-item-btn" onclick="toggleNavGroup('navGroupFinance')">
          <div class="nav-item-left">
            <i class="fa-solid fa-wallet"></i>
            <span>Finance</span>
          </div>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </button>
        <div class="nav-sublist">
          <a href="javascript:void(0)" onclick="showToast('Total Revenue: ₹12,40,000 recorded')" class="nav-subitem">Payments</a>
          <a href="javascript:void(0)" onclick="showToast('Refund Requests: 0 active')" class="nav-subitem">Refunds</a>
          <a href="javascript:void(0)" onclick="showToast('Revenue statement ready for download')" class="nav-subitem">Revenue Reports</a>
        </div>
      </div>

      <!-- Communications -->
      <div class="nav-group" id="navGroupComms">
        <button type="button" class="nav-item-btn" onclick="toggleNavGroup('navGroupComms')">
          <div class="nav-item-left">
            <i class="fa-solid fa-comments"></i>
            <span>Communications</span>
          </div>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </button>
        <div class="nav-sublist">
          <a href="javascript:void(0)" onclick="showToast('Announcements center opening soon')" class="nav-subitem">Announcements</a>
          <a href="javascript:void(0)" onclick="showToast('Broadcast center: SMS & Email ready')" class="nav-subitem">Email / WhatsApp</a>
        </div>
      </div>

      <!-- Settings & Access -->
      <div class="nav-group" id="navGroupSettings">
        <button type="button" class="nav-item-btn" onclick="toggleNavGroup('navGroupSettings')">
          <div class="nav-item-left">
            <i class="fa-solid fa-gear"></i>
            <span>Settings & Access</span>
          </div>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </button>
        <div class="nav-sublist">
          <a href="javascript:void(0)" onclick="showToast('Admin Roles: Super Admin (Active)')" class="nav-subitem">Roles & Permissions</a>
        </div>
      </div>
    </nav>
  </aside>"""

HELPER_JS = """
  <!-- Standard Sidebar and Toast Helper Scripts -->
  <script>
    if (typeof toggleNavGroup !== 'function') {
      window.toggleNavGroup = function(id) {
        const group = document.getElementById(id);
        if (group) group.classList.toggle('open');
      };
    }
    if (typeof showToast !== 'function') {
      window.showToast = function(text) {
        let toast = document.getElementById('toastMsg');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = 'toastMsg';
          toast.className = 'toast-msg';
          toast.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #22c55e;"></i><span id="toastText"></span>';
          document.body.appendChild(toast);
        }
        const textElem = toast.querySelector('#toastText') || toast;
        textElem.textContent = text;
        toast.classList.add('show');
        clearTimeout(window.__toastTimer);
        window.__toastTimer = setTimeout(() => {
          toast.classList.remove('show');
        }, 3200);
      };
    }
    if (typeof toggleSidebarMobile !== 'function') {
      window.toggleSidebarMobile = function() {
        const sb = document.getElementById('adminSidebar');
        if (sb) sb.classList.toggle('mobile-open');
      };
    }
  </script>
"""

def update_file(filename, page_key):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace the entire <aside class="sidebar"> ... </aside>
    new_sidebar = build_sidebar_html(page_key)
    sidebar_pattern = r'<aside[^>]*class=[\'"][^\'"]*sidebar[^\'"]*[\'"][^>]*>[\s\S]*?</aside>'
    
    if not re.search(sidebar_pattern, content):
        print(f"ERROR: Could not find <aside class='sidebar'> in {filename}")
        return False
        
    content = re.sub(sidebar_pattern, new_sidebar, content, count=1)

    # 2. Ensure unified sidebar CSS is present before </style>
    if '/* ---------------- UNIFIED ADMIN SIDEBAR ---------------- */' not in content:
        content = content.replace('</style>', f"{SIDEBAR_CSS}\n  </style>", 1)

    # 3. Ensure helper script is present before </body>
    if 'window.toggleNavGroup' not in content:
        content = content.replace('</body>', f"{HELPER_JS}\n</body>", 1)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Updated {filename} successfully for {page_key}!")
    return True

if __name__ == '__main__':
    for fname, pkey in PAGES_CONFIG.items():
        if os.path.exists(fname):
            update_file(fname, pkey)
        else:
            print(f"File {fname} not found!")
