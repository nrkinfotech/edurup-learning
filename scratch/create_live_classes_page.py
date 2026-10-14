html_content = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Live Classes | Data Analytics Internship | Edurup Learning</title>
  <meta name="description" content="Attend live interactive sessions, ask questions and learn directly from industry experts.">
  <link rel="canonical" href="https://www.eduruplearning.com/live-classes.html">
  <link rel="icon" type="image/png" href="assets/logo.png">

  <style>
    /* -------------------------------------------------------------
       BASE & RESET
    -------------------------------------------------------------- */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --primary-light: #eff6ff;
      --primary-border: #bfdbfe;
      --bg-dark: #0b1329;
      --bg-body: #f8fafc;
      --card-bg: #ffffff;
      --border-color: #e2e8f0;
      --border-light: #f1f5f9;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --text-light: #94a3b8;
      --success: #10b981;
      --success-light: #dcfce7;
      --success-text: #166534;
      --danger: #ef4444;
      --danger-hover: #dc2626;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-xl: 20px;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-body);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    /* -------------------------------------------------------------
       LAYOUT STRUCTURE (SIDEBAR + MAIN)
    -------------------------------------------------------------- */
    .lc-layout {
      display: flex;
      min-height: 100vh;
      width: 100%;
    }

    /* SIDEBAR */
    .lc-sidebar {
      width: 250px;
      background-color: var(--bg-dark);
      color: #94a3b8;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      padding: 20px 14px;
      z-index: 100;
    }

    .lc-sidebar::-webkit-scrollbar {
      width: 5px;
    }
    .lc-sidebar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 4px;
    }

    .lc-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 4px 8px 20px 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      margin-bottom: 16px;
      text-decoration: none;
    }
    .lc-brand img {
      width: 34px;
      height: 34px;
      border-radius: 8px;
    }
    .lc-brand span {
      font-size: 1.05rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.2px;
    }

    .lc-nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }}

    .lc-nav-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      border-radius: 10px;
      color: #94a3b8;
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .lc-nav-item:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.06);
    }
    .lc-nav-item.active {
      background: #2563eb;
      color: #ffffff;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
    }

    .nav-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .nav-icon {
      font-size: 16px;
      width: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Submenu groups */
    .lc-nav-group {
      display: flex;
      flex-direction: column;
    }
    .lc-nav-group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      border-radius: 10px;
      color: #cbd5e1;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .lc-nav-group-header:hover {
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
    }
    .nav-chevron {
      font-size: 11px;
      transition: transform 0.2s ease;
    }
    .lc-nav-group.open .nav-chevron {
      transform: rotate(180deg);
    }

    .lc-nav-submenu {
      display: none;
      flex-direction: column;
      gap: 2px;
      padding-left: 28px;
      margin-top: 2px;
      margin-bottom: 6px;
    }
    .lc-nav-group.open .lc-nav-submenu {
      display: flex;
    }

    .lc-sub-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      border-radius: 8px;
      color: #94a3b8;
      font-size: 0.82rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.15s;
    }
    .lc-sub-item:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.06);
    }
    .lc-sub-item.active {
      background: #2563eb;
      color: #ffffff;
      font-weight: 700;
    }

    /* MAIN CONTAINER */
    .lc-main-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      max-width: calc(100% - 250px);
    }

    /* TOP SEARCH BAR (MATCHING MOCKUP) */
    .lc-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 32px;
      background-color: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
      gap: 20px;
    }
    .lc-search-box {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 8px 14px;
      width: 440px;
      max-width: 100%;
    }
    .lc-search-icon {
      font-size: 14px;
      color: #64748b;
    }
    .lc-search-input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 0.85rem;
      color: var(--text-main);
      width: 100%;
    }
    .lc-topbar-right {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .lc-notif-btn {
      position: relative;
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: #475569;
    }
    .lc-notif-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 7px;
      height: 7px;
      background: #ef4444;
      border-radius: 50%;
    }
    .lc-user-pill {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      cursor: pointer;
    }
    .lc-user-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #8b5cf6;
      color: #ffffff;
      font-size: 0.85rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .lc-user-info {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }
    .lc-user-name {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-main);
    }
    .lc-user-role {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    /* HEADER & BREADCRUMB */
    .lc-header {
      padding: 20px 32px 14px 32px;
      background-color: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }
    .lc-header-left {
      flex: 1;
      min-width: 280px;
    }
    .lc-breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-bottom: 8px;
    }
    .lc-breadcrumb a {
      color: var(--primary);
      text-decoration: none;
      font-weight: 600;
    }
    .lc-breadcrumb a:hover {
      text-decoration: underline;
    }
    .lc-breadcrumb-sep {
      color: #cbd5e1;
      font-size: 11px;
    }
    .lc-page-title {
      font-size: 1.65rem;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.4px;
      margin-bottom: 4px;
    }
    .lc-page-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
    }

    /* COURSE SELECTOR PILL (TOP RIGHT) */
    .course-selector-pill {
      background: #ffffff;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 8px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }
    .course-selector-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }
    .course-selector-name {
      font-size: 0.88rem;
      font-weight: 800;
      color: var(--text-main);
    }
    .course-selector-sub {
      font-size: 0.72rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    /* SUB TABS BAR */
    .lc-tabs-bar {
      display: flex;
      align-items: center;
      gap: 28px;
      padding: 0 32px;
      background: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
    }
    .lc-tab-item {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--text-muted);
      padding: 12px 4px 14px 4px;
      cursor: pointer;
      position: relative;
      text-decoration: none;
      transition: color 0.15s ease;
    }
    .lc-tab-item:hover {
      color: var(--text-main);
    }
    .lc-tab-item.active {
      color: var(--primary);
    }
    .lc-tab-item.active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--primary);
      border-radius: 2px 2px 0 0;
    }

    /* BODY WRAPPER */
    .lc-content-body {
      padding: 24px 32px 40px 32px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* -------------------------------------------------------------
       ROW 1: TOP 3 CARDS (NEXT CLASS, PROGRESS, UPCOMING)
    -------------------------------------------------------------- */
    .top-cards-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
    }
    .top-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* CARD 1: NEXT LIVE CLASS */
    .tc-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.88rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 12px;
    }
    .tc-header-icon {
      font-size: 16px;
      color: var(--primary);
    }
    .next-class-time {
      font-size: 0.88rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 4px;
    }
    .next-class-topic {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 2px;
    }
    .next-class-module {
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-bottom: 14px;
    }
    .next-class-mentor-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
    }
    .mentor-avatar-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
    .mentor-name {
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.2;
    }
    .mentor-role {
      font-size: 0.72rem;
      color: var(--text-muted);
    }
    .btn-join-live {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      background: var(--primary);
      color: #ffffff;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 10px;
      border-radius: var(--radius-sm);
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .btn-join-live:hover {
      background: var(--primary-hover);
    }

    /* CARD 2: COURSE PROGRESS */
    .cp-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .cp-link {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--primary);
      text-decoration: none;
    }
    .cp-link:hover {
      text-decoration: underline;
    }
    .cp-circle-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }
    .donut-progress-box {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      background: conic-gradient(#2563eb 0% 60%, #e2e8f0 60% 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .donut-inner {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.88rem;
      font-weight: 800;
      color: var(--text-main);
    }
    .cp-text-wrap {
      flex: 1;
    }
    .cp-text-main {
      font-size: 0.84rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 6px;
    }
    .cp-bar-wrap {
      width: 100%;
      height: 6px;
      background: #e2e8f0;
      border-radius: 10px;
      overflow: hidden;
    }
    .cp-bar-fill {
      width: 60%;
      height: 100%;
      background: #10b981;
      border-radius: 10px;
    }
    .cp-stats-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
    }
    .cp-stat-box {
      background: #f8fafc;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-sm);
      padding: 8px 4px;
      text-align: center;
    }
    .cp-stat-num {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 2px;
    }
    .cp-stat-label {
      font-size: 0.72rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    /* CARD 3: UPCOMING CLASSES (NEXT 7 DAYS) */
    .uc-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .uc-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-light);
    }
    .uc-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .uc-date-box {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      line-height: 1.1;
    }
    .uc-month {
      font-size: 0.62rem;
      font-weight: 800;
      color: #2563eb;
      text-transform: uppercase;
    }
    .uc-day {
      font-size: 0.85rem;
      font-weight: 800;
      color: #1e3a8a;
    }
    .uc-details {
      flex: 1;
      min-width: 0;
    }
    .uc-title {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-main);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .uc-time {
      font-size: 0.72rem;
      color: var(--text-muted);
    }
    .badge-today {
      background: #dcfce7;
      color: #166534;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .btn-uc-join {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #2563eb;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
    }
    .btn-uc-join:hover {
      background: #2563eb;
      color: #ffffff;
    }
    .badge-upcoming {
      background: #f1f5f9;
      color: #64748b;
      font-size: 0.72rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 6px;
    }

    /* -------------------------------------------------------------
       ROW 2: INTERACTIVE LIVE CLASSROOM + LIVE CHAT SIDEBAR
    -------------------------------------------------------------- */
    .classroom-split-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 20px;
      align-items: start;
    }

    /* LIVE CLASSROOM SCREEN (LEFT) */
    .classroom-box {
      background: #0b1329;
      border-radius: var(--radius-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    .classroom-top-header {
      background: rgba(15, 23, 42, 0.95);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #ffffff;
      font-size: 0.85rem;
    }
    .cr-title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 800;
    }
    .live-pulse-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #ef4444;
      color: #ffffff;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .live-dot {
      width: 6px;
      height: 6px;
      background: #ffffff;
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.3); }
      100% { opacity: 1; transform: scale(1); }
    }
    .cr-stats-row {
      display: flex;
      align-items: center;
      gap: 14px;
      color: #94a3b8;
      font-size: 0.78rem;
    }
    .cr-stat-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    /* Video stream area */
    .classroom-stream-area {
      position: relative;
      width: 100%;
      background: #000000;
      overflow: hidden;
    }
    .stream-img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }

    /* Bottom Meeting Controls Bar */
    .classroom-controls-bar {
      background: rgba(15, 23, 42, 0.95);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 10px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ctrl-group-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ctrl-group-center {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .ctrl-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #ffffff;
      padding: 7px 12px;
      border-radius: var(--radius-sm);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .ctrl-btn:hover {
      background: rgba(255, 255, 255, 0.16);
      transform: translateY(-1px);
    }
    .ctrl-btn.active {
      background: #2563eb;
      border-color: #3b82f6;
    }
    .btn-leave-class {
      background: #ef4444;
      border: 1px solid #ef4444;
      color: #ffffff;
      padding: 7px 16px;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s;
    }
    .btn-leave-class:hover {
      background: #dc2626;
    }

    /* LIVE CHAT SIDEBAR (RIGHT) */
    .chat-box {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      height: 100%;
      min-height: 400px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      overflow: hidden;
    }
    .chat-tabs-bar {
      display: flex;
      border-bottom: 1px solid var(--border-color);
      background: #fafafa;
    }
    .chat-tab-btn {
      flex: 1;
      background: none;
      border: none;
      padding: 12px 6px;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-muted);
      cursor: pointer;
      position: relative;
    }
    .chat-tab-btn.active {
      color: var(--primary);
      background: #ffffff;
    }
    .chat-tab-btn.active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--primary);
    }

    .chat-messages-container {
      flex: 1;
      padding: 14px 16px;
      overflow-y: auto;
      max-height: 300px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .chat-messages-container::-webkit-scrollbar {
      width: 4px;
    }
    .chat-messages-container::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }

    .chat-msg-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .chat-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #e0e7ff;
      color: #3730a3;
      font-size: 0.72rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      object-fit: cover;
    }
    .chat-msg-body {
      flex: 1;
    }
    .chat-author-line {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
    }
    .chat-author-name {
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--text-main);
    }
    .chat-author-name.mentor {
      color: #2563eb;
    }
    .chat-timestamp {
      font-size: 0.68rem;
      color: var(--text-muted);
    }
    .chat-text {
      font-size: 0.8rem;
      color: #334155;
      line-height: 1.35;
    }

    .chat-input-bar {
      border-top: 1px solid var(--border-color);
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: #ffffff;
    }
    .chat-text-input {
      flex: 1;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 0.82rem;
      outline: none;
      font-family: inherit;
    }
    .chat-text-input:focus {
      border-color: #3b82f6;
    }
    .btn-chat-send {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: var(--primary);
      border: none;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.15s;
      flex-shrink: 0;
    }
    .btn-chat-send:hover {
      background: var(--primary-hover);
    }

    /* -------------------------------------------------------------
       ROW 3: BOTTOM 3 CARDS (MATERIALS, DETAILS, NEXT CLASS)
    -------------------------------------------------------------- */
    .bottom-cards-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
    }
    .bottom-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Materials list */
    .materials-stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .mat-item-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 8px 10px;
      background: #f8fafc;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-sm);
    }
    .mat-item-left {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .mat-badge-icon {
      width: 26px;
      height: 26px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 800;
      flex-shrink: 0;
    }
    .mat-badge-pdf {
      background: #fee2e2;
      color: #dc2626;
    }
    .mat-badge-xlsx {
      background: #dcfce7;
      color: #166534;
    }
    .mat-details {
      min-width: 0;
    }
    .mat-title {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--text-main);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 170px;
    }
    .mat-size {
      font-size: 0.7rem;
      color: var(--text-muted);
    }
    .btn-mat-download {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #ffffff;
      border: 1px solid var(--primary-border);
      color: var(--primary);
      font-size: 0.74rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      text-decoration: none;
      cursor: pointer;
      white-space: nowrap;
    }
    .btn-mat-download:hover {
      background: #eff6ff;
    }

    /* Class Details Meta */
    .details-meta-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .dm-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.8rem;
    }
    .dm-icon {
      font-size: 14px;
      color: var(--primary);
      margin-top: 1px;
      flex-shrink: 0;
    }
    .dm-label {
      font-size: 0.72rem;
      color: var(--text-muted);
      font-weight: 600;
    }
    .dm-val {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-main);
    }

    /* Card 3: Next class + Have a question */
    .nc-top-part {
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-light);
      margin-bottom: 14px;
    }
    .nc-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 10px;
    }
    .btn-calendar {
      background: #ffffff;
      border: 1px solid var(--border-color);
      color: var(--primary);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      white-space: nowrap;
    }
    .btn-calendar:hover {
      background: #eff6ff;
      border-color: #bfdbfe;
    }

    .have-question-box {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: var(--radius-sm);
      padding: 10px 12px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s;
    }
    .have-question-box:hover {
      background: #dbeafe;
    }
    .hq-icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #2563eb;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
    }
    .hq-text h5 {
      font-size: 0.8rem;
      font-weight: 800;
      color: #1e3a8a;
      margin-bottom: 1px;
    }
    .hq-text p {
      font-size: 0.72rem;
      color: #1e40af;
      line-height: 1.25;
    }

    /* -------------------------------------------------------------
       RESPONSIVE BREAKPOINTS
    -------------------------------------------------------------- */
    @media (max-width: 1200px) {
      .classroom-split-grid {
        grid-template-columns: 1fr;
      }
      .top-cards-grid, .bottom-cards-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 1024px) {
      .lc-sidebar {
        display: none;
      }
      .lc-main-container {
        max-width: 100%;
      }
      .lc-topbar, .lc-header, .lc-tabs-bar, .lc-content-body {
        padding-left: 18px;
        padding-right: 18px;
      }
      .lc-search-box {
        width: 100%;
      }
    }
  </style>
</head>
<body>

  <div class="lc-layout">
    
    <!-- -----------------------------------------------------------
         LEFT SIDEBAR NAVIGATION
    ------------------------------------------------------------ -->
    <aside class="lc-sidebar">
      <a href="dashboard.html" class="lc-brand">
        <img src="assets/logo.png" alt="Edurup Learning">
        <span>Edurup Learning</span>
      </a>

      <nav class="lc-nav">
        <!-- 1. Dashboard -->
        <a href="dashboard.html" class="lc-nav-item">
          <div class="nav-left">
            <span class="nav-icon">🏠</span>
            <span>Dashboard</span>
          </div>
        </a>

        <!-- 2. Learning Dropdown (Expanded) -->
        <div class="lc-nav-group open">
          <div class="lc-nav-group-header" onclick="toggleNavGroup(this)">
            <div class="nav-left">
              <span class="nav-icon">📖</span>
              <span>Learning</span>
            </div>
            <span class="nav-chevron">⌄</span>
          </div>
          <div class="lc-nav-submenu">
            <a href="recorded-classes.html" class="lc-sub-item">
              <span>📹</span> Recorded Classes
            </a>
            <a href="live-classes.html" class="lc-sub-item active">
              <span>🔴</span> Live Classes
            </a>
            <a href="javascript:void(0);" onclick="alert('Quizzes are updated after each live session!')" class="lc-sub-item">
              <span>📝</span> Quizzes
            </a>
            <a href="javascript:void(0);" onclick="alert('Course resources, datasets and code files are ready for download.')" class="lc-sub-item">
              <span>📁</span> Resources
            </a>
          </div>
        </div>

        <!-- 3. Projects Dropdown -->
        <div class="lc-nav-group">
          <div class="lc-nav-group-header" onclick="toggleNavGroup(this)">
            <div class="nav-left">
              <span class="nav-icon">💼</span>
              <span>Projects</span>
            </div>
            <span class="nav-chevron">⌄</span>
          </div>
          <div class="lc-nav-submenu">
            <a href="dashboard.html#my-projects-section" class="lc-sub-item"><span>📁</span> My Projects</a>
            <a href="dashboard.html#my-projects-section" class="lc-sub-item"><span>📤</span> Project Submissions</a>
            <a href="javascript:void(0);" onclick="alert('Mentor Feedback: Clean data cleaning queries submitted!')" class="lc-sub-item"><span>💬</span> Feedback</a>
          </div>
        </div>

        <!-- 4. Internship Dropdown -->
        <div class="lc-nav-group">
          <div class="lc-nav-group-header" onclick="toggleNavGroup(this)">
            <div class="nav-left">
              <span class="nav-icon">📄</span>
              <span>Internship</span>
            </div>
            <span class="nav-chevron">⌄</span>
          </div>
          <div class="lc-nav-submenu">
            <a href="javascript:void(0);" onclick="alert('Corporate Internship Allocation in progress.')" class="lc-sub-item"><span>📄</span> Application</a>
            <a href="javascript:void(0);" onclick="alert('Internship Details: 6 Months with Certificate & LOR.')" class="lc-sub-item"><span>📋</span> Internship Details</a>
            <a href="dashboard.html#my-tasks-section" class="lc-sub-item"><span>📌</span> My Tasks</a>
            <a href="javascript:void(0);" onclick="alert('Weekly Reports portal opens upon corporate internship allocation.')" class="lc-sub-item"><span>📊</span> Weekly Reports</a>
            <a href="javascript:void(0);" onclick="alert('Live Class Attendance: 92% active.')" class="lc-sub-item"><span>📅</span> Attendance</a>
          </div>
        </div>

        <!-- 5. Certificates Dropdown -->
        <div class="lc-nav-group">
          <div class="lc-nav-group-header" onclick="toggleNavGroup(this)">
            <div class="nav-left">
              <span class="nav-icon">🎖️</span>
              <span>Certificates</span>
            </div>
            <span class="nav-chevron">⌄</span>
          </div>
          <div class="lc-nav-submenu">
            <a href="dashboard.html#certificates-progress-section" class="lc-sub-item"><span>🎖️</span> My Certificates</a>
            <a href="javascript:void(0);" onclick="alert('Offer Letter available in your student portal.')" class="lc-sub-item"><span>📄</span> Offer Letter</a>
            <a href="javascript:void(0);" onclick="alert('Letter of Recommendation (LOR) issued after capstone evaluation.')" class="lc-sub-item"><span>📜</span> Letter of Recommendation</a>
          </div>
        </div>

        <!-- 6. Messages -->
        <a href="javascript:void(0);" onclick="alert('Live Class Chat is active! Type your question in the chat box on the right.')" class="lc-nav-item">
          <div class="nav-left">
            <span class="nav-icon">💬</span>
            <span>Messages</span>
          </div>
        </a>

        <!-- 7. Support -->
        <a href="support.html" class="lc-nav-item">
          <div class="nav-left">
            <span class="nav-icon">❓</span>
            <span>Support</span>
          </div>
        </a>

        <!-- 8. My Profile -->
        <a href="profile.html" class="lc-nav-item">
          <div class="nav-left">
            <span class="nav-icon">👤</span>
            <span>My Profile</span>
          </div>
        </a>

        <!-- 9. Sign Out -->
        <a href="javascript:void(0);" onclick="signOutUser()" class="lc-nav-item" style="color:#ef4444; font-weight:700; margin-top:8px;">
          <div class="nav-left">
            <span class="nav-icon">🚪</span>
            <span>Sign Out</span>
          </div>
        </a>
      </nav>
    </aside>

    <!-- -----------------------------------------------------------
         MAIN CONTAINER
    ------------------------------------------------------------ -->
    <main class="lc-main-container">
      
      <!-- Top Search & User Bar -->
      <header class="lc-topbar">
        <div class="lc-search-box">
          <span class="lc-search-icon">🔍</span>
          <input type="text" class="lc-search-input" placeholder="Search for videos, projects, tasks, resources..." onkeyup="handleLiveSearch(this.value)">
        </div>

        <div class="lc-topbar-right">
          <button type="button" class="lc-notif-btn" title="Notifications" onclick="alert('Live Class Notification: Arjun Kumar started Data Cleaning Techniques session!')">
            🔔
            <span class="lc-notif-badge"></span>
          </button>

          <a href="profile.html" class="lc-user-pill">
            <div class="lc-user-avatar" id="topAvatar">RK</div>
            <div class="lc-user-info">
              <span class="lc-user-name" id="topUserName">Rahul Kumar</span>
              <span class="lc-user-role">Student ⌄</span>
            </div>
          </a>
        </div>
      </header>

      <!-- Page Header & Course Selector -->
      <div class="lc-header">
        <div class="lc-header-left">
          <div class="lc-breadcrumb">
            <a href="dashboard.html">🏠 Dashboard</a>
            <span class="lc-breadcrumb-sep">></span>
            <span>Learning</span>
            <span class="lc-breadcrumb-sep">></span>
            <span style="color:var(--text-main); font-weight:700;">Live Classes</span>
          </div>
          <h1 class="lc-page-title">Live Classes</h1>
          <p class="lc-page-desc">Attend live interactive sessions, ask questions and learn directly from industry experts.</p>
        </div>

        <div class="course-selector-pill" onclick="alert('Current Program: Data Analytics with Excel & Power BI (6 Months)')">
          <div class="course-selector-icon">📊</div>
          <div>
            <div class="course-selector-name">Data Analytics with Excel &amp; Power BI</div>
            <div class="course-selector-sub">6 Months | Live + Recorded | Beginner</div>
          </div>
          <span style="color:#64748b; font-size:12px;">⌄</span>
        </div>
      </div>

      <!-- Sub Tabs Bar -->
      <div class="lc-tabs-bar">
        <a href="javascript:void(0);" class="lc-tab-item active" onclick="switchNavTab(this, 'upcoming')">Upcoming Classes</a>
        <a href="javascript:void(0);" class="lc-tab-item" onclick="switchNavTab(this, 'schedule')">Class Schedule</a>
        <a href="javascript:void(0);" class="lc-tab-item" onclick="switchNavTab(this, 'attendance')">My Attendance</a>
        <a href="recorded-classes.html" class="lc-tab-item">Recordings</a>
        <a href="javascript:void(0);" class="lc-tab-item" onclick="switchNavTab(this, 'resources')">Class Resources</a>
      </div>

      <!-- Main Content Body -->
      <div class="lc-content-body">
        
        <!-- ================= ROW 1: TOP 3 CARDS ================= -->
        <div class="top-cards-grid">
          
          <!-- Card 1: Next Live Class -->
          <div class="top-card">
            <div>
              <div class="tc-header">
                <span class="tc-header-icon">📅</span>
                <span>Next Live Class</span>
              </div>
              <div class="next-class-time">Today, 7:00 PM - 8:00 PM</div>
              <div class="next-class-topic">Data Cleaning Techniques</div>
              <div class="next-class-module">Module 2: Data Analysis with Excel</div>
              
              <div class="next-class-mentor-row">
                <img src="assets/arjun_avatar.png" class="mentor-avatar-img" alt="Arjun Kumar">
                <div>
                  <div class="mentor-name">Arjun Kumar</div>
                  <div class="mentor-role">Data Analytics Mentor</div>
                </div>
              </div>
            </div>

            <button type="button" class="btn-join-live" onclick="focusClassroom()">
              <span>📹</span> Join Live Class
            </button>
          </div>

          <!-- Card 2: Course Progress -->
          <div class="top-card">
            <div>
              <div class="cp-top-row">
                <div class="tc-header" style="margin-bottom:0;">
                  <span class="tc-header-icon">🛡️</span>
                  <span>Course Progress</span>
                </div>
                <a href="javascript:void(0);" onclick="alert('Live Class Attendance History: 12 Attended, 3 Missed, 5 Upcoming.')" class="cp-link">View Attendance →</a>
              </div>

              <div class="cp-circle-row">
                <div class="donut-progress-box">
                  <div class="donut-inner">60%</div>
                </div>
                <div class="cp-text-wrap">
                  <div class="cp-text-main">12 of 20 Live Classes Attended</div>
                  <div class="cp-bar-wrap">
                    <div class="cp-bar-fill"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="cp-stats-row">
              <div class="cp-stat-box">
                <div class="cp-stat-num">12</div>
                <div class="cp-stat-label">Attended</div>
              </div>
              <div class="cp-stat-box">
                <div class="cp-stat-num">3</div>
                <div class="cp-stat-label">Missed</div>
              </div>
              <div class="cp-stat-box">
                <div class="cp-stat-num">5</div>
                <div class="cp-stat-label">Upcoming</div>
              </div>
            </div>
          </div>

          <!-- Card 3: Upcoming Classes (Next 7 Days) -->
          <div class="top-card">
            <div class="cp-top-row">
              <div class="tc-header" style="margin-bottom:0;">
                <span class="tc-header-icon">📅</span>
                <span>Upcoming Classes (Next 7 Days)</span>
              </div>
              <a href="javascript:void(0);" onclick="alert('Full 6-Month Live Class Schedule: Mon, Wed, Fri & Sat batches available.')" class="cp-link">View All →</a>
            </div>

            <div class="uc-list">
              <!-- Class 1 -->
              <div class="uc-item">
                <div class="uc-date-box">
                  <span class="uc-month">OCT</span>
                  <span class="uc-day">10</span>
                </div>
                <img src="assets/arjun_avatar.png" class="mentor-avatar-img" alt="Arjun Kumar">
                <div class="uc-details">
                  <div class="uc-title" title="Data Cleaning Techniques">Data Cleaning Techniques</div>
                  <div class="uc-time">7:00 PM - 8:00 PM • Arjun Kumar</div>
                </div>
                <span class="badge-today">Today</span>
              </div>

              <!-- Class 2 -->
              <div class="uc-item">
                <div class="uc-date-box">
                  <span class="uc-month">OCT</span>
                  <span class="uc-day">12</span>
                </div>
                <img src="assets/priya_mentor_avatar.jpg" class="mentor-avatar-img" alt="Priya Sharma">
                <div class="uc-details">
                  <div class="uc-title" title="SQL for Data Analysis">SQL for Data Analysis</div>
                  <div class="uc-time">7:00 PM - 8:00 PM • Priya Sharma</div>
                </div>
                <button type="button" class="btn-uc-join" onclick="alert('Class starts on Oct 12 at 7:00 PM.')">Join</button>
              </div>

              <!-- Class 3 -->
              <div class="uc-item">
                <div class="uc-date-box">
                  <span class="uc-month">OCT</span>
                  <span class="uc-day">15</span>
                </div>
                <img src="assets/neeraj_mentor_avatar.png" class="mentor-avatar-img" alt="Neeraj Singh">
                <div class="uc-details">
                  <div class="uc-title" title="Power BI Dashboard Creation">Power BI Dashboard Creation</div>
                  <div class="uc-time">7:00 PM - 8:00 PM • Neeraj Singh</div>
                </div>
                <span class="badge-upcoming">Upcoming</span>
              </div>
            </div>
          </div>

        </div>

        <!-- ================= ROW 2: LIVE CLASSROOM + CHAT ================= -->
        <div class="classroom-split-grid" id="classroomSection">
          
          <!-- LIVE CLASSROOM CONTAINER (LEFT) -->
          <div class="classroom-box" id="liveClassroomBox">
            
            <!-- Classroom Top Bar -->
            <div class="classroom-top-header">
              <div class="cr-title-row">
                <span>Live Class: Data Cleaning Techniques</span>
                <span class="live-pulse-badge">
                  <span class="live-dot"></span> LIVE
                </span>
              </div>

              <div class="cr-stats-row">
                <div class="cr-stat-item">
                  <span>👥</span> <span id="studentCount">102 Students</span>
                </div>
                <div class="cr-stat-item">
                  <span>⏱</span> <span id="liveTimer">00:32:15</span>
                </div>
                <button type="button" style="background:none; border:none; color:#ffffff; font-weight:700; cursor:pointer;" onclick="alert('Stream Quality: 1080p 60fps HD')">HD</button>
                <button type="button" style="background:none; border:none; color:#ffffff; font-size:14px; cursor:pointer;" onclick="toggleRoomFullscreen()">⛶</button>
              </div>
            </div>

            <!-- Live Video Stream Area -->
            <div class="classroom-stream-area" id="streamArea">
              <img src="assets/live_class_screen_stream.png" class="stream-img" alt="Live Stream with Mentor Arjun Kumar and Data Cleaning Screen">
            </div>

            <!-- Bottom Meeting Controls Bar -->
            <div class="classroom-controls-bar">
              <div class="ctrl-group-left">
                <button type="button" class="ctrl-btn" id="btnMic" onclick="toggleMic()">
                  <span id="micIcon">🎙️</span> <span id="micText">Unmute</span>
                </button>
                <button type="button" class="ctrl-btn" id="btnCam" onclick="toggleCam()">
                  <span id="camIcon">📹</span> <span id="camText">Start Video</span>
                </button>
              </div>

              <div class="ctrl-group-center">
                <button type="button" class="ctrl-btn" onclick="alert('Screen sharing is active by Mentor Arjun Kumar.')">
                  <span>🖥️</span> <span>Share</span>
                </button>
                <button type="button" class="ctrl-btn" id="btnHand" onclick="toggleRaiseHand()">
                  <span>✋</span> <span id="handText">Raise Hand</span>
                </button>
                <button type="button" class="ctrl-btn" onclick="alert('Meeting Options:\\n• Switch Layout (Grid / Spotlight)\\n• Audio Settings\\n• Report Issue')">
                  <span>···</span> <span>More</span>
                </button>
              </div>

              <button type="button" class="btn-leave-class" onclick="confirmLeaveClass()">
                Leave Class
              </button>
            </div>

          </div>

          <!-- LIVE CHAT SIDEBAR (RIGHT) -->
          <div class="chat-box">
            
            <!-- Chat Tabs -->
            <div class="chat-tabs-bar">
              <button type="button" class="chat-tab-btn active" onclick="switchChatTab(this, 'chat')">Live Chat</button>
              <button type="button" class="chat-tab-btn" onclick="switchChatTab(this, 'qa')">Q&amp;A</button>
              <button type="button" class="chat-tab-btn" onclick="switchChatTab(this, 'participants')">Participants (102)</button>
            </div>

            <!-- Messages List -->
            <div class="chat-messages-container" id="chatFeed">
              
              <!-- Message 1 -->
              <div class="chat-msg-item">
                <div class="chat-avatar" style="background:#dbeafe; color:#1e40af;">PS</div>
                <div class="chat-msg-body">
                  <div class="chat-author-line">
                    <span class="chat-author-name">Priya Sharma</span>
                    <span class="chat-timestamp">7:15 PM</span>
                  </div>
                  <div class="chat-text">Can you please explain forward fill with an example?</div>
                </div>
              </div>

              <!-- Message 2 (Mentor Reply) -->
              <div class="chat-msg-item">
                <img src="assets/arjun_avatar.png" class="chat-avatar" alt="Arjun Kumar">
                <div class="chat-msg-body">
                  <div class="chat-author-line">
                    <span class="chat-author-name mentor">Arjun Kumar (Mentor)</span>
                    <span class="chat-timestamp">7:16 PM</span>
                  </div>
                  <div class="chat-text">Sure, I will show it in the next example.</div>
                </div>
              </div>

              <!-- Message 3 -->
              <div class="chat-msg-item">
                <div class="chat-avatar" style="background:#fce7f3; color:#be185d;">SK</div>
                <div class="chat-msg-body">
                  <div class="chat-author-line">
                    <span class="chat-author-name">Suresh K</span>
                    <span class="chat-timestamp">7:18 PM</span>
                  </div>
                  <div class="chat-text">Can we use median for income column?</div>
                </div>
              </div>

              <!-- Message 4 (Mentor Reply) -->
              <div class="chat-msg-item">
                <img src="assets/arjun_avatar.png" class="chat-avatar" alt="Arjun Kumar">
                <div class="chat-msg-body">
                  <div class="chat-author-line">
                    <span class="chat-author-name mentor">Arjun Kumar (Mentor)</span>
                    <span class="chat-timestamp">7:19 PM</span>
                  </div>
                  <div class="chat-text">Yes, median is better for numerical columns with outliers.</div>
                </div>
              </div>

            </div>

            <!-- Chat Input -->
            <div class="chat-input-bar">
              <input type="text" class="chat-text-input" id="chatInput" placeholder="Type your question..." onkeypress="handleChatKey(event)">
              <button type="button" class="btn-chat-send" onclick="sendChatMessage()" title="Send">➤</button>
            </div>

          </div>

        </div>

        <!-- ================= ROW 3: BOTTOM 3 CARDS ================= -->
        <div class="bottom-cards-grid">
          
          <!-- Card 1: Class Materials -->
          <div class="bottom-card">
            <div>
              <div class="tc-header">
                <span class="tc-header-icon">📁</span>
                <span>Class Materials</span>
              </div>

              <div class="materials-stack">
                <div class="mat-item-row">
                  <div class="mat-item-left">
                    <div class="mat-badge-icon mat-badge-pdf">PDF</div>
                    <div class="mat-details">
                      <div class="mat-title">Session Slides - Data Cleaning Techniques</div>
                      <div class="mat-size">2.4 MB</div>
                    </div>
                  </div>
                  <a href="javascript:void(0);" onclick="downloadMaterial('Session Slides - Data Cleaning Techniques.pdf')" class="btn-mat-download">
                    <span>⬇</span> Download
                  </a>
                </div>

                <div class="mat-item-row">
                  <div class="mat-item-left">
                    <div class="mat-badge-icon mat-badge-xlsx">XLS</div>
                    <div class="mat-details">
                      <div class="mat-title">Practice Dataset (Sales Data)</div>
                      <div class="mat-size">320 KB</div>
                    </div>
                  </div>
                  <a href="javascript:void(0);" onclick="downloadMaterial('Practice Dataset - Sales Data.xlsx')" class="btn-mat-download">
                    <span>⬇</span> Download
                  </a>
                </div>

                <div class="mat-item-row">
                  <div class="mat-item-left">
                    <div class="mat-badge-icon mat-badge-pdf">PY</div>
                    <div class="mat-details">
                      <div class="mat-title">Code Examples (Python &amp; Excel)</div>
                      <div class="mat-size">1.1 MB</div>
                    </div>
                  </div>
                  <a href="javascript:void(0);" onclick="downloadMaterial('Code Examples - Python and Excel.zip')" class="btn-mat-download">
                    <span>⬇</span> Download
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 2: Class Details -->
          <div class="bottom-card">
            <div>
              <div class="tc-header">
                <span class="tc-header-icon">📋</span>
                <span>Class Details</span>
              </div>

              <div class="details-meta-list">
                <div class="dm-item">
                  <span class="dm-icon">📅</span>
                  <div>
                    <div class="dm-label">Date &amp; Time</div>
                    <div class="dm-val">10 Oct 2026, 7:00 PM - 8:00 PM</div>
                  </div>
                </div>

                <div class="dm-item">
                  <span class="dm-icon">📖</span>
                  <div>
                    <div class="dm-label">Module</div>
                    <div class="dm-val">Module 2: Data Analysis with Excel</div>
                  </div>
                </div>

                <div class="dm-item">
                  <span class="dm-icon">🎯</span>
                  <div>
                    <div class="dm-label">Topic</div>
                    <div class="dm-val">Data Cleaning Techniques</div>
                  </div>
                </div>

                <div class="dm-item">
                  <span class="dm-icon">👤</span>
                  <div>
                    <div class="dm-label">Mentor</div>
                    <div class="dm-val">Arjun Kumar (Data Analytics Expert)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 3: Next Class & Have a Question? -->
          <div class="bottom-card">
            <div>
              <div class="nc-top-part">
                <div class="cp-top-row">
                  <div class="tc-header" style="margin-bottom:0;">
                    <span class="tc-header-icon">📅</span>
                    <span>Next Class</span>
                  </div>
                  <a href="javascript:void(0);" onclick="alert('Viewing all scheduled live classes for October 2026.')" class="cp-link">View All →</a>
                </div>

                <div class="nc-row">
                  <div style="display:flex; align-items:center; gap:10px;">
                    <div class="uc-date-box">
                      <span class="uc-month">OCT</span>
                      <span class="uc-day">12</span>
                    </div>
                    <img src="assets/priya_mentor_avatar.jpg" class="mentor-avatar-img" alt="Priya Sharma">
                    <div>
                      <div style="font-size:0.84rem; font-weight:800; color:#0f172a;">SQL for Data Analysis</div>
                      <div style="font-size:0.72rem; color:#64748b;">7:00 PM - 8:00 PM • Priya Sharma</div>
                    </div>
                  </div>
                  <button type="button" class="btn-calendar" onclick="alert('📅 Added SQL for Data Analysis with Priya Sharma to Google Calendar!')">
                    Add to Calendar
                  </button>
                </div>
              </div>

              <!-- Have a question box -->
              <div class="have-question-box" onclick="focusChat()">
                <div class="hq-icon">❓</div>
                <div class="hq-text">
                  <h5>Have a Question?</h5>
                  <p>Post your doubt here and get answers from mentors during the live class. →</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  </div>

  <!-- SCRIPT -->
  <script>
    // Toggle Nav Group
    function toggleNavGroup(el) {
      const group = el.parentElement;
      group.classList.toggle('open');
    }

    // Live Timer Counter
    let seconds = 1935; // 00:32:15
    setInterval(() => {
      seconds++;
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      const fmt = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      const timerEl = document.getElementById('liveTimer');
      if (timerEl) timerEl.innerText = fmt;
    }, 1000);

    // Meeting Controls
    let isMicOn = false;
    let isCamOn = false;
    let isHandRaised = false;

    function toggleMic() {
      isMicOn = !isMicOn;
      const btn = document.getElementById('btnMic');
      const icon = document.getElementById('micIcon');
      const txt = document.getElementById('micText');
      if (isMicOn) {
        btn.classList.add('active');
        icon.innerText = '🔊';
        txt.innerText = 'Mute';
        alert('Microphone unmuted. You can speak to Mentor Arjun Kumar.');
      } else {
        btn.classList.remove('active');
        icon.innerText = '🎙️';
        txt.innerText = 'Unmute';
      }
    }

    function toggleCam() {
      isCamOn = !isCamOn;
      const btn = document.getElementById('btnCam');
      const icon = document.getElementById('camIcon');
      const txt = document.getElementById('camText');
      if (isCamOn) {
        btn.classList.add('active');
        icon.innerText = '⏹';
        txt.innerText = 'Stop Video';
        alert('Your camera is turned ON for the live class.');
      } else {
        btn.classList.remove('active');
        icon.innerText = '📹';
        txt.innerText = 'Start Video';
      }
    }

    function toggleRaiseHand() {
      isHandRaised = !isHandRaised;
      const btn = document.getElementById('btnHand');
      const txt = document.getElementById('handText');
      if (isHandRaised) {
        btn.classList.add('active');
        txt.innerText = 'Hand Raised (1)';
        alert('✋ Hand Raised! Arjun Kumar will call on you shortly.');
      } else {
        btn.classList.remove('active');
        txt.innerText = 'Raise Hand';
      }
    }

    function confirmLeaveClass() {
      if (confirm('Are you sure you want to leave the live class session?')) {
        alert('You have left the live class. The recording will be available in Recorded Classes within 2 hours.');
        window.location.href = 'dashboard.html';
      }
    }

    function toggleRoomFullscreen() {
      const box = document.getElementById('liveClassroomBox');
      if (!document.fullscreenElement) {
        if (box.requestFullscreen) box.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    }

    // Focus / Scroll Helpers
    function focusClassroom() {
      const box = document.getElementById('classroomSection');
      if (box) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function focusChat() {
      const input = document.getElementById('chatInput');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Live Chat Functions
    function handleChatKey(e) {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    }

    function sendChatMessage() {
      const input = document.getElementById('chatInput');
      const text = input.value.trim();
      if (!text) return;

      const feed = document.getElementById('chatFeed');
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const timeStr = `${hours}:${minutes} ${ampm}`;

      // Get user name from session
      let studentName = 'Rahul Kumar';
      let initials = 'RK';
      const sessionStr = localStorage.getItem('edurup_user_session');
      if (sessionStr) {
        try {
          const u = JSON.parse(sessionStr);
          studentName = u.fullName || u.name || 'Student';
          const p = studentName.split(' ');
          initials = p.length > 1 ? (p[0][0] + p[1][0]).toUpperCase() : p[0].slice(0, 2).toUpperCase();
        } catch(e) {}
      }

      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-msg-item';
      msgDiv.innerHTML = `
        <div class="chat-avatar" style="background:#8b5cf6; color:#ffffff;">${initials}</div>
        <div class="chat-msg-body">
          <div class="chat-author-line">
            <span class="chat-author-name">${studentName}</span>
            <span class="chat-timestamp">${timeStr}</span>
          </div>
          <div class="chat-text">${text}</div>
        </div>
      `;
      feed.appendChild(msgDiv);
      feed.scrollTop = feed.scrollHeight;
      input.value = '';

      // Simulated mentor reply after 3 seconds
      setTimeout(() => {
        const replyDiv = document.createElement('div');
        replyDiv.className = 'chat-msg-item';
        replyDiv.innerHTML = `
          <img src="assets/arjun_avatar.png" class="chat-avatar" alt="Arjun Kumar">
          <div class="chat-msg-body">
            <div class="chat-author-line">
              <span class="chat-author-name mentor">Arjun Kumar (Mentor)</span>
              <span class="chat-timestamp">${timeStr}</span>
            </div>
            <div class="chat-text">Great question, ${studentName.split(' ')[0]}! I've noted this down and will address it on screen.</div>
          </div>
        `;
        feed.appendChild(replyDiv);
        feed.scrollTop = feed.scrollHeight;
      }, 3000);
    }

    // Switch Chat Tab
    function switchChatTab(btn, tab) {
      document.querySelectorAll('.chat-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const feed = document.getElementById('chatFeed');
      if (tab === 'qa') {
        feed.innerHTML = `
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:12px; font-size:0.8rem; color:#1e40af;">
            <strong>Live Q&A Queue:</strong> Ask questions that require detailed coding demonstrations.
          </div>
          <div class="chat-msg-item">
            <div class="chat-avatar" style="background:#dbeafe; color:#1e40af;">PS</div>
            <div class="chat-msg-body">
              <div class="chat-author-line"><span class="chat-author-name">Priya Sharma</span><span class="chat-timestamp">7:20 PM</span></div>
              <div class="chat-text">How do we handle missing values in time-series data with seasonal gaps?</div>
              <span style="font-size:0.7rem; color:#10b981; font-weight:700;">✓ Answered live by Arjun Kumar</span>
            </div>
          </div>
        `;
      } else if (tab === 'participants') {
        feed.innerHTML = `
          <div style="font-size:0.82rem; font-weight:800; color:#0f172a; margin-bottom:8px;">Online Mentors &amp; Students (102)</div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px; font-size:0.8rem;">
              <img src="assets/arjun_avatar.png" style="width:24px; height:24px; border-radius:50%;">
              <strong>Arjun Kumar (Host • Mentor)</strong> <span style="font-size:10px; color:#10b981;">🟢 Live</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px; font-size:0.8rem;">
              <div style="width:24px; height:24px; border-radius:50%; background:#dbeafe; color:#1e40af; font-size:10px; font-weight:800; display:flex; align-items:center; justify-content:center;">PS</div>
              <span>Priya Sharma (Teaching Assistant)</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px; font-size:0.8rem;">
              <div style="width:24px; height:24px; border-radius:50%; background:#8b5cf6; color:#ffffff; font-size:10px; font-weight:800; display:flex; align-items:center; justify-content:center;">RK</div>
              <span>Rahul Kumar (You)</span>
            </div>
            <div style="font-size:0.74rem; color:#64748b;">+ 99 other active students online</div>
          </div>
        `;
      } else {
        location.reload(); // restore chat
      }
    }

    // Switch Navigation Tabs
    function switchNavTab(el, tabKey) {
      document.querySelectorAll('.lc-tab-item').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
      if (tabKey === 'schedule') {
        alert('📅 Live Class Schedule: Classes are held Mon, Wed, Fri & Sat from 7:00 PM to 8:00 PM IST.');
      } else if (tabKey === 'attendance') {
        alert('📊 Attendance: 12 Attended, 3 Missed, 5 Upcoming. Overall attendance rate: 80% (Above 75% required for certificate).');
      } else if (tabKey === 'resources') {
        alert('📁 Class Resources: Download session slides, datasets, and Jupyter notebooks from the Class Materials card below.');
      }
    }

    function downloadMaterial(name) {
      alert(`📥 Downloading: ${name}\\nYour download will begin immediately.`);
    }

    // Search filter
    function handleLiveSearch(val) {
      val = (val || '').toLowerCase();
      const topic = document.querySelector('.next-class-topic');
      if (topic && topic.innerText.toLowerCase().includes(val)) {
        focusClassroom();
      }
    }

    // Sync logged in user profile
    document.addEventListener('DOMContentLoaded', () => {
      const sessionStr = localStorage.getItem('edurup_user_session');
      if (sessionStr) {
        try {
          const user = JSON.parse(sessionStr);
          const name = user.fullName || user.name || 'Rahul Kumar';
          const parts = name.split(' ');
          const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].slice(0, 2).toUpperCase();
          const topUserName = document.getElementById('topUserName');
          const topAvatar = document.getElementById('topAvatar');
          if (topUserName) topUserName.innerText = name;
          if (topAvatar) topAvatar.innerText = initials;
        } catch(e) {}
      }
    });
  </script>
  <script src="assets/js/nav-auth.js?v=2"></script>
</body>
</html>
"""

with open('live-classes.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print('live-classes.html generated successfully!')
