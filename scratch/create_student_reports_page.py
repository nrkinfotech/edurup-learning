import os

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Reports | Edurup Learning</title>
  <link rel="icon" type="image/png" href="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <!-- Chart.js for smooth interactive rendering -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <style>
    :root {
      --bg-sidebar: #0B132B;
      --sidebar-hover: #1C2541;
      --sidebar-active: #2563EB;
      --bg-body: #F8FAFC;
      --card-bg: #FFFFFF;
      --border: #E2E8F0;
      --border-light: #F1F5F9;
      --text-main: #0F172A;
      --text-muted: #64748B;
      --text-sub: #94A3B8;
      --primary: #2563EB;
      --primary-hover: #1D4ED8;
      --primary-light: #EFF6FF;
      --success: #10B981;
      --success-light: #ECFDF5;
      --warning: #F59E0B;
      --warning-light: #FFFBEB;
      --danger: #EF4444;
      --danger-light: #FEF2F2;
      --purple: #8B5CF6;
      --purple-light: #F5F3FF;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    body {
      background: var(--bg-body);
      color: var(--text-main);
      display: flex;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* ---------------- MAIN CONTENT ---------------- */
    main.main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      background: #F8FAFC;
    }

    /* Top Bar */
    header.topbar {
      height: 70px;
      background: #ffffff;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      position: sticky;
      top: 0;
      z-index: 90;
    }

    .top-search-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 9px 16px;
      width: 440px;
      transition: all 0.2s;
    }

    .top-search-wrap:focus-within {
      background: #ffffff;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }

    .top-search-wrap i {
      color: #94a3b8;
      font-size: 14px;
    }

    .top-search-wrap input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 13.5px;
      color: var(--text-main);
      width: 100%;
    }

    .top-right-actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .notification-btn {
      position: relative;
      background: transparent;
      border: none;
      color: #64748b;
      font-size: 17px;
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      transition: color 0.15s;
    }

    .notification-btn:hover {
      color: var(--text-main);
    }

    .notif-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 8px;
      height: 8px;
      background: #ef4444;
      border-radius: 50%;
      border: 2px solid #ffffff;
    }

    .admin-profile-chip {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 10px;
      transition: background 0.15s;
    }

    .admin-profile-chip:hover {
      background: #f1f5f9;
    }

    .admin-avatar-initials {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #8b5cf6;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
    }

    .admin-chip-info {
      display: flex;
      flex-direction: column;
    }

    .admin-chip-name {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.2;
    }

    .admin-chip-role {
      font-size: 11px;
      color: var(--text-muted);
    }

    /* ---------------- PAGE BODY CONTAINER ---------------- */
    .page-container {
      padding: 24px 32px 60px;
      max-width: 1440px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Breadcrumbs */
    .breadcrumb-nav {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      color: var(--text-muted);
      font-weight: 500;
    }

    .breadcrumb-nav a {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.15s;
    }

    .breadcrumb-nav a:hover {
      color: var(--primary);
    }

    .breadcrumb-nav i {
      font-size: 10px;
      color: #cbd5e1;
    }

    .breadcrumb-nav span.current {
      color: var(--text-main);
      font-weight: 600;
    }

    /* Page Header */
    .page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }

    .header-titles h1 {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.02em;
      margin-bottom: 4px;
    }

    .header-titles p {
      font-size: 13.5px;
      color: var(--text-muted);
      font-weight: 400;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .date-range-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 14px;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-main);
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
      transition: all 0.15s;
    }

    .date-range-badge:hover {
      border-color: #cbd5e1;
      background: #f8fafc;
    }

    .date-range-badge i.fa-calendar {
      color: #64748b;
    }

    .date-range-badge i.fa-chevron-down {
      font-size: 10px;
      color: #94a3b8;
    }

    .btn-export {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 16px;
      background: var(--primary);
      border: 1px solid var(--primary);
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);
      transition: all 0.2s;
    }

    .btn-export:hover {
      background: var(--primary-hover);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
    }

    /* Subnav Tabs */
    .subnav-tabs {
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 12px;
      overflow-x: auto;
    }

    .tab-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      background: transparent;
      border: none;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      transition: all 0.15s;
    }

    .tab-pill i {
      font-size: 12px;
    }

    .tab-pill:hover {
      color: var(--text-main);
      background: #f1f5f9;
    }

    .tab-pill.active {
      background: var(--primary);
      color: #ffffff;
      box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);
    }

    /* Filter Bar */
    .filter-bar {
      display: flex;
      align-items: center;
      gap: 16px;
      background: #ffffff;
      padding: 12px 18px;
      border: 1px solid var(--border);
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
      flex-wrap: wrap;
    }

    .filter-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .filter-label {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-muted);
      white-space: nowrap;
    }

    .filter-select {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-main);
      outline: none;
      cursor: pointer;
      transition: all 0.15s;
    }

    .filter-select:focus {
      background: #ffffff;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12);
    }

    .btn-reset-link {
      margin-left: auto;
      background: transparent;
      border: none;
      color: var(--primary);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 6px;
      transition: all 0.15s;
    }

    .btn-reset-link:hover {
      background: #eff6ff;
    }

    /* ---------------- 6 KPI CARDS ---------------- */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 14px;
    }

    @media (max-width: 1200px) {
      .kpi-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 768px) {
      .kpi-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .kpi-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 14px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .kpi-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .kpi-icon-box {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }

    .kpi-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .kpi-val {
      font-size: 20px;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .kpi-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      line-height: 1.2;
    }

    .kpi-subtext {
      font-size: 11px;
      font-weight: 700;
      margin-top: 2px;
    }

    .kpi-subtext.sub-green {
      color: #16A34A;
      background: #DCFCE7;
      padding: 1px 6px;
      border-radius: 6px;
      display: inline-block;
      width: fit-content;
    }

    .kpi-subtext.sub-growth {
      color: #16A34A;
    }

    /* ---------------- MIDDLE ROW (3 PANELS) ---------------- */
    .middle-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 1080px) {
      .middle-grid {
        grid-template-columns: 1fr;
      }
    }

    .analytics-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    }

    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .card-head h3 {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
      letter-spacing: -0.01em;
    }

    /* Panel 1: Progress Trend Chart */
    .trend-chart-wrap {
      position: relative;
      flex: 1;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Panel 2: Student Status Donut & Legend */
    .donut-layout {
      display: flex;
      align-items: center;
      gap: 20px;
      flex: 1;
    }

    .donut-chart-container {
      position: relative;
      width: 135px;
      height: 135px;
      flex-shrink: 0;
    }

    .donut-center-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      pointer-events: none;
    }

    .donut-center-text .pct {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1;
    }

    .donut-center-text .lbl {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .donut-legend {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }

    .donut-legend-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12.5px;
    }

    .legend-left {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text-main);
      font-weight: 600;
    }

    .legend-square {
      width: 10px;
      height: 10px;
      border-radius: 3px;
    }

    .legend-right {
      font-weight: 600;
      color: var(--text-muted);
      font-size: 12px;
    }

    /* Panel 3: Course Completion Horizontal Bars */
    .course-comp-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex: 1;
      justify-content: center;
    }

    .course-comp-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12.5px;
    }

    .course-comp-name {
      width: 130px;
      font-weight: 600;
      color: var(--text-main);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .course-comp-bar-track {
      flex: 1;
      height: 7px;
      background: #f1f5f9;
      border-radius: 4px;
      overflow: hidden;
    }

    .course-comp-bar-fill {
      height: 100%;
      background: #2563EB;
      border-radius: 4px;
    }

    .course-comp-val {
      width: 32px;
      text-align: right;
      font-weight: 700;
      color: var(--text-main);
      font-size: 12px;
    }

    /* ---------------- LOWER SPLIT ROW: TABLE & RIGHT PANEL ---------------- */
    .lower-grid {
      display: grid;
      grid-template-columns: 2.2fr 1fr;
      gap: 16px;
    }

    @media (max-width: 1080px) {
      .lower-grid {
        grid-template-columns: 1fr;
      }
    }

    .table-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    }

    .table-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 12px;
    }

    .table-top-bar h3 {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
    }

    .table-search-input {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 7px 12px;
      width: 250px;
    }

    .table-search-input input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 12.5px;
      color: var(--text-main);
      width: 100%;
    }

    .table-search-input i {
      color: #94a3b8;
      font-size: 12px;
    }

    .table-responsive {
      overflow-x: auto;
      margin: 0 -20px;
      padding: 0 20px;
    }

    table.data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    table.data-table th {
      padding: 10px 12px;
      font-size: 11.5px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid #e2e8f0;
      background: #f8fafc;
      white-space: nowrap;
    }

    table.data-table td {
      padding: 12px 12px;
      font-size: 12.5px;
      color: var(--text-main);
      border-bottom: 1px solid #f1f5f9;
      vertical-align: middle;
      white-space: nowrap;
    }

    table.data-table tr:hover td {
      background: #f8fafc;
    }

    .student-cell {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .student-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-weight: 700;
      font-size: 11px;
      flex-shrink: 0;
    }

    .student-name-bold {
      font-weight: 700;
      color: var(--text-main);
    }

    .student-id-txt {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-muted);
    }

    .course-badge-pill {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 600;
      background: #eff6ff;
      color: #2563eb;
    }

    .num-pill-green {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 700;
      background: #ecfdf5;
      color: #059669;
    }

    .status-badge-excellent {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      background: #dcfce7;
      color: #16a34a;
    }

    .status-badge-good {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      background: #ecfdf5;
      color: #059669;
    }

    .status-badge-attention {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      background: #fffbeb;
      color: #d97706;
    }

    .action-icons-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .action-icon-btn {
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: transparent;
      border: 1px solid transparent;
      color: #64748b;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 0.15s;
    }

    .action-icon-btn:hover {
      background: #eff6ff;
      color: #2563eb;
      border-color: #bfdbfe;
    }

    .table-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid #f1f5f9;
      font-size: 12.5px;
      color: var(--text-muted);
    }

    .pagination-bar {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .pag-btn {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      color: var(--text-main);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }

    .pag-btn:hover:not(:disabled) {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }

    .pag-btn.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #ffffff;
    }

    .pag-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ---------------- RIGHT COLUMN: INSIGHTS & QUICK ACTIONS ---------------- */
    .right-cards-col {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Student Insights Card */
    .insights-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    }

    .insights-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .insights-title-row i {
      color: #2563EB;
      font-size: 15px;
    }

    .insights-title-row h3 {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
    }

    .insights-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .insight-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 13px;
      color: var(--text-main);
      line-height: 1.4;
    }

    .insight-check-icon {
      color: #16A34A;
      font-size: 13px;
      margin-top: 2px;
      flex-shrink: 0;
    }

    /* Quick Actions Card */
    .quick-actions-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    }

    .qa-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .qa-title-row i {
      color: #2563EB;
      font-size: 15px;
    }

    .qa-title-row h3 {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
    }

    .qa-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .qa-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 16px 10px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      text-decoration: none;
      color: var(--text-main);
      font-size: 11.5px;
      font-weight: 700;
      text-align: center;
      cursor: pointer;
      transition: all 0.15s;
    }

    .qa-btn:hover {
      background: #eff6ff;
      border-color: #bfdbfe;
      color: #2563eb;
      transform: translateY(-2px);
    }

    .qa-btn i {
      font-size: 18px;
      color: #2563eb;
    }

    /* ---------------- MODALS ---------------- */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-backdrop.open {
      display: flex;
    }

    .modal-box {
      background: #ffffff;
      border-radius: 16px;
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      animation: modalFadeIn 0.2s ease-out;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-header h3 {
      font-size: 17px;
      font-weight: 800;
      color: var(--text-main);
    }

    .modal-close-btn {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 18px;
      cursor: pointer;
      transition: color 0.15s;
    }

    .modal-close-btn:hover {
      color: var(--text-main);
    }

    .modal-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      background: #f8fafc;
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
    }

    /* Toast Notification */
    #toastBox {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      z-index: 2000;
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
      transition: all 0.25s ease;
    }

    #toastBox.show {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    #toastBox i {
      color: #10B981;
    }
  </style>
</head>
<body>

  <!-- ================= SIDEBAR ================= -->
  <!-- Unified automatically by unify_admin_sidebar.py -->
  <aside class="sidebar" id="adminSidebar"></aside>

  <!-- ================= MAIN CONTENT ================= -->
  <main class="main-content">
    <!-- Topbar -->
    <header class="topbar">
      <div class="top-search-wrap">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="globalReportSearch" placeholder="Search students, courses, batches, reports..." oninput="onGlobalSearch(this.value)">
      </div>

      <div class="top-right-actions">
        <button class="notification-btn" title="Notifications" onclick="showToast('No new notifications')">
          <i class="fa-regular fa-bell"></i>
          <span class="notif-badge"></span>
        </button>

        <div class="admin-profile-chip" onclick="showToast('Logged in as Super Admin')">
          <div class="admin-avatar-initials">AD</div>
          <div class="admin-chip-info">
            <span class="admin-chip-name">Admin</span>
            <span class="admin-chip-role">Super Admin</span>
          </div>
          <i class="fa-solid fa-chevron-down" style="font-size: 11px; color: #94a3b8; margin-left: 4px;"></i>
        </div>
      </div>
    </header>

    <!-- Page Body -->
    <div class="page-container">
      <!-- Breadcrumbs -->
      <nav class="breadcrumb-nav">
        <a href="admin-dashboard.html">Dashboard</a>
        <i class="fa-solid fa-chevron-right"></i>
        <span>Attendance & Reports</span>
        <i class="fa-solid fa-chevron-right"></i>
        <span class="current">Student Reports</span>
      </nav>

      <!-- Page Header -->
      <div class="page-header">
        <div class="header-titles">
          <h1>Student Reports</h1>
          <p>Track individual student performance, learning progress, assessments, attendance and placement readiness.</p>
        </div>

        <div class="header-actions">
          <div class="date-range-badge" onclick="showToast('Date Range: Nov 01, 2026 - Nov 14, 2026')">
            <i class="fa-regular fa-calendar"></i>
            <span id="dateRangeLabel">Nov 01, 2026 - Nov 14, 2026</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>

          <button class="btn-export" onclick="openExportModal()">
            <i class="fa-solid fa-download"></i>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <!-- Subnav Tabs -->
      <div class="subnav-tabs">
        <button class="tab-pill active" onclick="switchReportTab('overview', this)">
          <i class="fa-solid fa-chart-simple"></i>
          <span>Overview</span>
        </button>
        <button class="tab-pill" onclick="switchReportTab('performance', this)">
          <i class="fa-solid fa-user"></i>
          <span>Student Performance</span>
        </button>
        <button class="tab-pill" onclick="switchReportTab('progress', this)">
          <i class="fa-solid fa-star"></i>
          <span>Learning Progress</span>
        </button>
        <button class="tab-pill" onclick="switchReportTab('assessment', this)">
          <i class="fa-solid fa-clipboard-check"></i>
          <span>Assessment</span>
        </button>
        <button class="tab-pill" onclick="switchReportTab('attendance', this)">
          <i class="fa-solid fa-calendar-check"></i>
          <span>Attendance</span>
        </button>
        <button class="tab-pill" onclick="switchReportTab('assignments', this)">
          <i class="fa-solid fa-file-lines"></i>
          <span>Assignments</span>
        </button>
        <button class="tab-pill" onclick="switchReportTab('placement', this)">
          <i class="fa-solid fa-id-card"></i>
          <span>Placement Readiness</span>
        </button>
      </div>

      <!-- Filters Bar -->
      <div class="filter-bar">
        <div class="filter-item">
          <span class="filter-label">Course</span>
          <select id="filterCourseSelect" class="filter-select" onchange="applyFilters()">
            <option value="All">All Courses</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Data Science">Data Science</option>
            <option value="Full Stack Dev">Full Stack Dev</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Python Full Stack">Python Full Stack</option>
            <option value="AI/ML & Deep Learning">AI/ML & Deep Learning</option>
            <option value="Cloud & DevOps">Cloud & DevOps</option>
            <option value="Cyber Security">Cyber Security</option>
          </select>
        </div>

        <div class="filter-item">
          <span class="filter-label">Subscription Month</span>
          <select id="filterMonthSelect" class="filter-select" onchange="applyFilters()">
            <option value="Nov 2026">Nov 2026</option>
            <option value="Oct 2026">Oct 2026</option>
            <option value="Sep 2026">Sep 2026</option>
            <option value="All">All Months</option>
          </select>
        </div>

        <div class="filter-item">
          <span class="filter-label">Batch</span>
          <select id="filterBatchSelect" class="filter-select" onchange="applyFilters()">
            <option value="All">All Batches</option>
            <option value="Batch A - Nov 2026">Batch A - Nov 2026</option>
            <option value="Batch B - Nov 2026">Batch B - Nov 2026</option>
            <option value="Batch C - Nov 2026">Batch C - Nov 2026</option>
          </select>
        </div>

        <div class="filter-item">
          <span class="filter-label">Status</span>
          <select id="filterStatusSelect" class="filter-select" onchange="applyFilters()">
            <option value="All">All Students</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Needs Attention">Needs Attention</option>
            <option value="Active">Active</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        <button class="btn-reset-link" onclick="resetFilters()">Reset</button>
      </div>

      <!-- 6 KPI Cards -->
      <div class="kpi-grid">
        <!-- Card 1: Total Students -->
        <div class="kpi-card">
          <div class="kpi-icon-box" style="background: #F3E8FF; color: #7E22CE;">
            <i class="fa-solid fa-users"></i>
          </div>
          <div class="kpi-info">
            <div class="kpi-val" id="kpiTotalStudents">1,248</div>
            <div class="kpi-label">Total Students</div>
          </div>
        </div>

        <!-- Card 2: Active Students -->
        <div class="kpi-card">
          <div class="kpi-icon-box" style="background: #DCFCE7; color: #16A34A;">
            <i class="fa-solid fa-laptop"></i>
          </div>
          <div class="kpi-info">
            <div class="kpi-val" id="kpiActiveStudents">1,023</div>
            <div class="kpi-label">Active Students</div>
            <span class="kpi-subtext sub-green" id="kpiActivePct">82.0%</span>
          </div>
        </div>

        <!-- Card 3: Avg. Course Completion -->
        <div class="kpi-card">
          <div class="kpi-icon-box" style="background: #DBEAFE; color: #2563EB;">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <div class="kpi-info">
            <div class="kpi-val" id="kpiAvgCompletion">88%</div>
            <div class="kpi-label">Avg. Course Completion</div>
            <span class="kpi-subtext sub-growth" id="kpiCompletionGrowth">↑ +4%</span>
          </div>
        </div>

        <!-- Card 4: Avg. Assessment Score -->
        <div class="kpi-card">
          <div class="kpi-icon-box" style="background: #FEF3C7; color: #D97706;">
            <i class="fa-solid fa-clipboard-check"></i>
          </div>
          <div class="kpi-info">
            <div class="kpi-val" id="kpiAvgAssessment">86%</div>
            <div class="kpi-label">Avg. Assessment Score</div>
          </div>
        </div>

        <!-- Card 5: Placement Rate -->
        <div class="kpi-card">
          <div class="kpi-icon-box" style="background: #FEE2E2; color: #DC2626;">
            <i class="fa-solid fa-briefcase"></i>
          </div>
          <div class="kpi-info">
            <div class="kpi-val" id="kpiPlacementRate">70%</div>
            <div class="kpi-label">Placement Rate</div>
          </div>
        </div>

        <!-- Card 6: Internships -->
        <div class="kpi-card">
          <div class="kpi-icon-box" style="background: #EDE9FE; color: #8B5CF6;">
            <i class="fa-solid fa-user-graduate"></i>
          </div>
          <div class="kpi-info">
            <div class="kpi-val" id="kpiInternships">462</div>
            <div class="kpi-label">Internships</div>
          </div>
        </div>
      </div>

      <!-- Middle Row: 3 Panels -->
      <div class="middle-grid">
        <!-- Panel 1: Learning Progress Trend -->
        <div class="analytics-card">
          <div class="card-head">
            <h3>Learning Progress Trend</h3>
          </div>
          <div class="trend-chart-wrap">
            <canvas id="progressTrendChart"></canvas>
          </div>
        </div>

        <!-- Panel 2: Student Status Donut -->
        <div class="analytics-card">
          <div class="card-head">
            <h3>Student Status</h3>
          </div>
          <div class="donut-layout">
            <div class="donut-chart-container">
              <canvas id="studentStatusDonutChart"></canvas>
              <div class="donut-center-text">
                <div class="pct">1,248</div>
                <div class="lbl">Students</div>
              </div>
            </div>
            <div class="donut-legend">
              <div class="donut-legend-item">
                <div class="legend-left">
                  <span class="legend-square" style="background: #10B981;"></span>
                  <span>Active</span>
                </div>
                <div class="legend-right">82% (1,023)</div>
              </div>
              <div class="donut-legend-item">
                <div class="legend-left">
                  <span class="legend-square" style="background: #3B82F6;"></span>
                  <span>On Hold</span>
                </div>
                <div class="legend-right">7% (87)</div>
              </div>
              <div class="donut-legend-item">
                <div class="legend-left">
                  <span class="legend-square" style="background: #F59E0B;"></span>
                  <span>Completed</span>
                </div>
                <div class="legend-right">9% (112)</div>
              </div>
              <div class="donut-legend-item">
                <div class="legend-left">
                  <span class="legend-square" style="background: #EF4444;"></span>
                  <span>Dropped</span>
                </div>
                <div class="legend-right">2% (26)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel 3: Course Completion by Course -->
        <div class="analytics-card">
          <div class="card-head">
            <h3>Course Completion by Course</h3>
          </div>
          <div class="course-comp-list">
            <!-- Row 1 -->
            <div class="course-comp-item">
              <span class="course-comp-name">Data Analytics</span>
              <div class="course-comp-bar-track">
                <div class="course-comp-bar-fill" style="width: 93%;"></div>
              </div>
              <span class="course-comp-val">93%</span>
            </div>

            <!-- Row 2 -->
            <div class="course-comp-item">
              <span class="course-comp-name">Data Science</span>
              <div class="course-comp-bar-track">
                <div class="course-comp-bar-fill" style="width: 91%;"></div>
              </div>
              <span class="course-comp-val">91%</span>
            </div>

            <!-- Row 3 -->
            <div class="course-comp-item">
              <span class="course-comp-name">Full Stack Dev</span>
              <div class="course-comp-bar-track">
                <div class="course-comp-bar-fill" style="width: 87%;"></div>
              </div>
              <span class="course-comp-val">87%</span>
            </div>

            <!-- Row 4 -->
            <div class="course-comp-item">
              <span class="course-comp-name">Digital Marketing</span>
              <div class="course-comp-bar-track">
                <div class="course-comp-bar-fill" style="width: 94%;"></div>
              </div>
              <span class="course-comp-val">94%</span>
            </div>

            <!-- Row 5 -->
            <div class="course-comp-item">
              <span class="course-comp-name">Python Full Stack</span>
              <div class="course-comp-bar-track">
                <div class="course-comp-bar-fill" style="width: 88%;"></div>
              </div>
              <span class="course-comp-val">88%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Lower Split Row: Student Performance & Right Column -->
      <div class="lower-grid">
        <!-- Left: Student Performance Table -->
        <div class="table-card">
          <div class="table-top-bar">
            <h3>Student Performance (1,248)</h3>
            <div class="table-search-input">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" id="studentTableSearch" placeholder="Search by name, email or ID..." oninput="filterStudentTable(this.value)">
            </div>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 30px;">#</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Course</th>
                  <th>Attendance</th>
                  <th>Completion</th>
                  <th>Assessment</th>
                  <th>Status</th>
                  <th style="text-align: center;">Actions</th>
                </tr>
              </thead>
              <tbody id="studentTableBody">
                <!-- Dynamically populated rows -->
              </tbody>
            </table>
          </div>

          <div class="table-footer">
            <div id="tableCountText">Showing 1 to 10 of 1,248 students</div>
            <div class="pagination-bar">
              <button class="pag-btn" id="btnPrevPag" onclick="changePage(-1)" disabled><i class="fa-solid fa-chevron-left"></i></button>
              <button class="pag-btn active" id="btnPag1" onclick="goToPage(1)">1</button>
              <button class="pag-btn" id="btnPag2" onclick="goToPage(2)">2</button>
              <button class="pag-btn" id="btnPag3" onclick="goToPage(3)">3</button>
              <button class="pag-btn" id="btnPag4" onclick="goToPage(4)">4</button>
              <button class="pag-btn" id="btnPag5" onclick="goToPage(5)">5</button>
              <span style="font-size: 11px; color: #94a3b8; padding: 0 4px;">...</span>
              <button class="pag-btn" id="btnPag125" onclick="goToPage(125)">125</button>
              <button class="pag-btn" id="btnNextPag" onclick="changePage(1)"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>
        </div>

        <!-- Right Column: Insights & Quick Actions -->
        <div class="right-cards-col">
          <!-- Student Insights Card -->
          <div class="insights-card">
            <div class="insights-title-row">
              <i class="fa-solid fa-chart-line"></i>
              <h3>Student Insights</h3>
            </div>
            <div class="insights-list">
              <div class="insight-item">
                <i class="fa-solid fa-check insight-check-icon"></i>
                <span>88% average course completion (+4%)</span>
              </div>
              <div class="insight-item">
                <i class="fa-solid fa-check insight-check-icon"></i>
                <span>86% average assessment score</span>
              </div>
              <div class="insight-item">
                <i class="fa-solid fa-check insight-check-icon"></i>
                <span>70% placement rate (873/1,248)</span>
              </div>
              <div class="insight-item">
                <i class="fa-solid fa-check insight-check-icon"></i>
                <span>462 students in active internships</span>
              </div>
              <div class="insight-item">
                <i class="fa-solid fa-check insight-check-icon"></i>
                <span>26 students are at risk (low engagement)</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions Card -->
          <div class="quick-actions-card">
            <div class="qa-title-row">
              <i class="fa-solid fa-bolt"></i>
              <h3>Quick Actions</h3>
            </div>
            <div class="qa-grid">
              <button class="qa-btn" onclick="openExportModal()">
                <i class="fa-solid fa-download"></i>
                <span>Download Student Report</span>
              </button>

              <button class="qa-btn" onclick="openShareModal()">
                <i class="fa-solid fa-paper-plane"></i>
                <span>Share Report</span>
              </button>

              <button class="qa-btn" onclick="openReminderModal()">
                <i class="fa-solid fa-bell"></i>
                <span>Send Reminder</span>
              </button>

              <a href="admin-students.html" class="qa-btn">
                <i class="fa-solid fa-users"></i>
                <span>View Student List</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>

  <!-- ================= MODALS ================= -->
  <!-- Student Detail / Report Card Modal -->
  <div class="modal-backdrop" id="studentDetailModal">
    <div class="modal-box">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div id="modalAvatar" class="student-avatar" style="width: 38px; height: 38px; font-size: 13px;">AK</div>
          <div>
            <h3 id="modalStudentName">Student Performance Dossier</h3>
            <span id="modalStudentId" style="font-size: 12px; color: var(--text-muted);">EDU001234</span>
          </div>
        </div>
        <button class="modal-close-btn" onclick="closeModal('studentDetailModal')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body" id="modalStudentBody">
        <!-- Rendered dynamically -->
      </div>
      <div class="modal-footer">
        <button class="pag-btn" style="width: auto; padding: 6px 14px;" onclick="closeModal('studentDetailModal')">Close</button>
        <button class="btn-export" onclick="downloadSingleStudentReport()"><i class="fa-solid fa-file-pdf"></i> Download Dossier</button>
      </div>
    </div>
  </div>

  <!-- Export Modal -->
  <div class="modal-backdrop" id="exportModal">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Export Student Performance Report</h3>
        <button class="modal-close-btn" onclick="closeModal('exportModal')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <p style="font-size: 13.5px; color: var(--text-muted);">Select format and scope for the 1,248 student reports dataset.</p>
        <div>
          <label style="font-size: 12px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 6px;">Format</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <label style="border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer; text-align: center;">
              <input type="radio" name="expFmt" value="excel" checked style="margin-bottom: 4px;"><br>
              <i class="fa-solid fa-file-excel" style="color: #10B981; font-size: 20px; margin: 4px 0;"></i><br>
              <strong style="font-size: 12px;">Excel (.xlsx)</strong>
            </label>
            <label style="border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer; text-align: center;">
              <input type="radio" name="expFmt" value="csv" style="margin-bottom: 4px;"><br>
              <i class="fa-solid fa-file-csv" style="color: #2563EB; font-size: 20px; margin: 4px 0;"></i><br>
              <strong style="font-size: 12px;">CSV (.csv)</strong>
            </label>
            <label style="border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer; text-align: center;">
              <input type="radio" name="expFmt" value="pdf" style="margin-bottom: 4px;"><br>
              <i class="fa-solid fa-file-pdf" style="color: #EF4444; font-size: 20px; margin: 4px 0;"></i><br>
              <strong style="font-size: 12px;">PDF Summary</strong>
            </label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="pag-btn" style="width: auto; padding: 6px 14px;" onclick="closeModal('exportModal')">Cancel</button>
        <button class="btn-export" onclick="executeExport()"><i class="fa-solid fa-download"></i> Download Export</button>
      </div>
    </div>
  </div>

  <!-- Share Modal -->
  <div class="modal-backdrop" id="shareModal">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Share Student Report</h3>
        <button class="modal-close-btn" onclick="closeModal('shareModal')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <div>
          <label style="font-size: 12px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 6px;">Shareable Link</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="shareLinkInput" value="https://edurup.in/admin-student-reports.html?month=Nov2026" readonly style="flex: 1; padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 12.5px; background: #f8fafc;">
            <button class="pag-btn" style="width: auto; padding: 6px 12px;" onclick="copyShareLink()"><i class="fa-solid fa-copy"></i> Copy</button>
          </div>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 6px;">Send directly via Email</label>
          <input type="email" id="shareEmailInput" placeholder="recipient@edurup.in" style="width: 100%; padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 12.5px;">
        </div>
      </div>
      <div class="modal-footer">
        <button class="pag-btn" style="width: auto; padding: 6px 14px;" onclick="closeModal('shareModal')">Cancel</button>
        <button class="btn-export" onclick="sendShareEmail()"><i class="fa-solid fa-paper-plane"></i> Send Email</button>
      </div>
    </div>
  </div>

  <!-- Send Reminder Modal -->
  <div class="modal-backdrop" id="reminderModal">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Broadcast Student Reminder</h3>
        <button class="modal-close-btn" onclick="closeModal('reminderModal')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <div>
          <label style="font-size: 12px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 6px;">Target Group</label>
          <select style="width: 100%; padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 12.5px;">
            <option>All Students with Attendance < 85% (114 students)</option>
            <option>Students with Pending Project Submissions (78 students)</option>
            <option>Students with Incomplete Assessments (92 students)</option>
            <option>All Active Learners (1,023 students)</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 6px;">Reminder Message</label>
          <textarea rows="4" style="width: 100%; padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 12.5px; resize: none;">Dear Student, this is a reminder from Edurup Learning to complete your scheduled modules and assessment before the upcoming weekly deadline.</textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="pag-btn" style="width: auto; padding: 6px 14px;" onclick="closeModal('reminderModal')">Cancel</button>
        <button class="btn-export" onclick="sendReminderBroadcast()"><i class="fa-solid fa-bell"></i> Send Broadcast</button>
      </div>
    </div>
  </div>

  <!-- Toast Notification Container -->
  <div id="toastBox">
    <i class="fa-solid fa-circle-check"></i>
    <span id="toastMessage">Action completed successfully</span>
  </div>

  <script>
    // State
    let studentsData = [];
    let filteredStudents = [];
    let currentPage = 1;
    let pageSize = 10;
    let progressChart = null;
    let donutChart = null;
    let activeStudent = null;

    // Default Fallback Data (Exact 10 rows from screenshot)
    const defaultStudents = [
      { order: 1, studentName: 'Ananya Kumar', email: 'ananya.kumar@gmail.com', studentId: 'EDU001234', avatarInitials: 'AK', avatarColor: '#2563EB', course: 'Data Analytics', batch: 'Batch A - Nov 2026', attendance: 96, completion: 100, assessment: 94, status: 'Excellent', studentStatus: 'Active' },
      { order: 2, studentName: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', studentId: 'EDU001235', avatarInitials: 'RS', avatarColor: '#8B5CF6', course: 'Data Science', batch: 'Batch A - Nov 2026', attendance: 92, completion: 98, assessment: 92, status: 'Excellent', studentStatus: 'Active' },
      { order: 3, studentName: 'Priya Verma', email: 'priya.verma@gmail.com', studentId: 'EDU001236', avatarInitials: 'PV', avatarColor: '#EC4899', course: 'Full Stack Dev', batch: 'Batch B - Nov 2026', attendance: 100, completion: 98, assessment: 91, status: 'Excellent', studentStatus: 'Active' },
      { order: 4, studentName: 'Vikram Kumar', email: 'vikram.kumar@gmail.com', studentId: 'EDU001237', avatarInitials: 'VK', avatarColor: '#10B981', course: 'Digital Marketing', batch: 'Batch A - Nov 2026', attendance: 78, completion: 86, assessment: 84, status: 'Good', studentStatus: 'Active' },
      { order: 5, studentName: 'Sneha Murthy', email: 'sneha.murthy@gmail.com', studentId: 'EDU001238', avatarInitials: 'SM', avatarColor: '#3B82F6', course: 'Python Full Stack', batch: 'Batch C - Nov 2026', attendance: 94, completion: 95, assessment: 90, status: 'Good', studentStatus: 'Active' },
      { order: 6, studentName: 'Arjun Das', email: 'arjun.das@gmail.com', studentId: 'EDU001239', avatarInitials: 'AD', avatarColor: '#06B6D4', course: 'Data Analytics', batch: 'Batch B - Nov 2026', attendance: 98, completion: 96, assessment: 93, status: 'Excellent', studentStatus: 'Active' },
      { order: 7, studentName: 'Neha Kulkarni', email: 'neha.kulkarni@gmail.com', studentId: 'EDU001240', avatarInitials: 'NK', avatarColor: '#F59E0B', course: 'Data Science', batch: 'Batch B - Nov 2026', attendance: 82, completion: 84, assessment: 78, status: 'Needs Attention', studentStatus: 'Active' },
      { order: 8, studentName: 'Rohit Singh', email: 'rohit.singh@gmail.com', studentId: 'EDU001241', avatarInitials: 'RS', avatarColor: '#6366F1', course: 'Full Stack Dev', batch: 'Batch A - Nov 2026', attendance: 91, completion: 92, assessment: 88, status: 'Good', studentStatus: 'Active' },
      { order: 9, studentName: 'Megha Dutta', email: 'megha.dutta@gmail.com', studentId: 'EDU001242', avatarInitials: 'MD', avatarColor: '#10B981', course: 'Digital Marketing', batch: 'Batch B - Nov 2026', attendance: 96, completion: 95, assessment: 92, status: 'Excellent', studentStatus: 'Active' },
      { order: 10, studentName: 'Sanjay Kumar', email: 'sanjay.kumar@gmail.com', studentId: 'EDU001243', avatarInitials: 'SK', avatarColor: '#8B5CF6', course: 'Data Analytics', batch: 'Batch C - Nov 2026', attendance: 88, completion: 90, assessment: 86, status: 'Good', studentStatus: 'Active' },
      { order: 11, studentName: 'Aditi Rao', email: 'aditi.rao@gmail.com', studentId: 'EDU001244', avatarInitials: 'AR', avatarColor: '#EC4899', course: 'AI/ML & Deep Learning', batch: 'Batch A - Nov 2026', attendance: 95, completion: 94, assessment: 91, status: 'Excellent', studentStatus: 'Active' },
      { order: 12, studentName: 'Kunal Patil', email: 'kunal.patil@gmail.com', studentId: 'EDU001245', avatarInitials: 'KP', avatarColor: '#3B82F6', course: 'Cloud & DevOps', batch: 'Batch A - Nov 2026', attendance: 89, completion: 88, assessment: 85, status: 'Good', studentStatus: 'Active' },
      { order: 13, studentName: 'Divya Nambiar', email: 'divya.nambiar@gmail.com', studentId: 'EDU001246', avatarInitials: 'DN', avatarColor: '#10B981', course: 'Cyber Security', batch: 'Batch A - Nov 2026', attendance: 86, completion: 85, assessment: 83, status: 'Good', studentStatus: 'Active' },
      { order: 14, studentName: 'Manish Tiwari', email: 'manish.tiwari@gmail.com', studentId: 'EDU001247', avatarInitials: 'MT', avatarColor: '#F59E0B', course: 'Full Stack Dev', batch: 'Batch B - Nov 2026', attendance: 74, completion: 78, assessment: 72, status: 'Needs Attention', studentStatus: 'On Hold' },
      { order: 15, studentName: 'Ritu Menon', email: 'ritu.menon@gmail.com', studentId: 'EDU001248', avatarInitials: 'RM', avatarColor: '#6366F1', course: 'Data Science', batch: 'Batch C - Nov 2026', attendance: 97, completion: 100, assessment: 96, status: 'Excellent', studentStatus: 'Completed' }
    ];

    document.addEventListener('DOMContentLoaded', () => {
      fetchStudentReports();
    });

    // Fetch reports data from backend or fallback
    async function fetchStudentReports() {
      try {
        const res = await fetch('/api/admin/reports/students');
        const json = await res.json();
        if (json.success && json.students && json.students.length > 0) {
          studentsData = json.students;
          updateKPIs(json.kpis);
        } else {
          studentsData = defaultStudents;
        }
      } catch (err) {
        console.warn('Using default student reports:', err);
        studentsData = defaultStudents;
      }
      filteredStudents = [...studentsData];
      renderStudentTable();
      initProgressTrendChart();
      initStudentStatusDonut();
    }

    // Update KPI numbers
    function updateKPIs(kpis) {
      if (!kpis) return;
      document.getElementById('kpiTotalStudents').textContent = Number(kpis.totalStudents).toLocaleString();
      document.getElementById('kpiActiveStudents').textContent = Number(kpis.activeStudents).toLocaleString();
      document.getElementById('kpiActivePct').textContent = kpis.activePercentage;
      document.getElementById('kpiAvgCompletion').textContent = kpis.avgCompletion;
      document.getElementById('kpiCompletionGrowth').textContent = `↑ ${kpis.avgCompletionGrowth}`;
      document.getElementById('kpiAvgAssessment').textContent = kpis.avgAssessmentScore;
      document.getElementById('kpiPlacementRate').textContent = kpis.placementRate;
      document.getElementById('kpiInternships').textContent = Number(kpis.internships).toLocaleString();
    }

    // Render Table
    function renderStudentTable() {
      const tbody = document.getElementById('studentTableBody');
      tbody.innerHTML = '';

      if (filteredStudents.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 24px; color: #94a3b8;">No matching student reports found.</td></tr>`;
        document.getElementById('tableCountText').textContent = 'Showing 0 of 0 students';
        return;
      }

      const startIdx = (currentPage - 1) * pageSize;
      const endIdx = startIdx + pageSize;
      const displayItems = filteredStudents.slice(startIdx, endIdx);
      const actualEnd = Math.min(endIdx, filteredStudents.length);

      document.getElementById('tableCountText').textContent = `Showing ${startIdx + 1} to ${actualEnd} of 1,248 students`;
      document.getElementById('btnPrevPag').disabled = (currentPage === 1);
      document.getElementById('btnNextPag').disabled = (endIdx >= filteredStudents.length);

      displayItems.forEach((s, idx) => {
        let statusBadge = '';
        if (s.status === 'Excellent') {
          statusBadge = `<span class="status-badge-excellent">Excellent</span>`;
        } else if (s.status === 'Needs Attention') {
          statusBadge = `<span class="status-badge-attention">Needs Attention</span>`;
        } else {
          statusBadge = `<span class="status-badge-good">Good</span>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="font-weight: 600; color: #64748b;">${s.order || (startIdx + idx + 1)}</td>
          <td>
            <div class="student-cell">
              <div class="student-avatar" style="background: ${s.avatarColor || '#2563EB'};">
                ${s.avatarInitials || 'ST'}
              </div>
              <span class="student-name-bold">${s.studentName}</span>
            </div>
          </td>
          <td><span class="student-id-txt">${s.studentId}</span></td>
          <td><span class="course-badge-pill">${s.course}</span></td>
          <td><span class="num-pill-green">${s.attendance}%</span></td>
          <td><span class="num-pill-green">${s.completion}%</span></td>
          <td><span style="font-weight: 700; color: #0F172A;">${s.assessment}%</span></td>
          <td>${statusBadge}</td>
          <td style="text-align: center;">
            <div class="action-icons-wrap" style="justify-content: center;">
              <button class="action-icon-btn" title="View Report Dossier" onclick="viewStudentDetail('${s.studentId}')">
                <i class="fa-solid fa-eye" style="color: #2563EB;"></i>
              </button>
              <button class="action-icon-btn" title="Options" onclick="openStudentOptions('${s.studentId}')">
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Pagination
    function changePage(delta) {
      currentPage += delta;
      renderStudentTable();
      updatePagBtns();
    }

    function goToPage(page) {
      currentPage = page;
      renderStudentTable();
      updatePagBtns();
    }

    function updatePagBtns() {
      [1, 2, 3, 4, 5].forEach(num => {
        const btn = document.getElementById(`btnPag${num}`);
        if (btn) {
          if (currentPage === num) btn.classList.add('active');
          else btn.classList.remove('active');
        }
      });
    }

    // Table Filter & Search
    function filterStudentTable(query) {
      const q = query.toLowerCase().trim();
      if (!q) {
        filteredStudents = [...studentsData];
      } else {
        filteredStudents = studentsData.filter(s =>
          s.studentName.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q) ||
          s.course.toLowerCase().includes(q) ||
          (s.email && s.email.toLowerCase().includes(q))
        );
      }
      currentPage = 1;
      renderStudentTable();
    }

    function applyFilters() {
      const courseVal = document.getElementById('filterCourseSelect').value;
      const monthVal = document.getElementById('filterMonthSelect').value;
      const batchVal = document.getElementById('filterBatchSelect').value;
      const statusVal = document.getElementById('filterStatusSelect').value;

      filteredStudents = studentsData.filter(s => {
        let match = true;
        if (courseVal !== 'All' && s.course !== courseVal) match = false;
        if (monthVal !== 'All' && s.subscriptionMonth && s.subscriptionMonth !== monthVal) match = false;
        if (batchVal !== 'All' && s.batch && s.batch !== batchVal) match = false;
        if (statusVal !== 'All' && s.status !== statusVal && s.studentStatus !== statusVal) match = false;
        return match;
      });

      currentPage = 1;
      renderStudentTable();
      showToast(`Filter applied: ${filteredStudents.length} matching students`);
    }

    function resetFilters() {
      document.getElementById('filterCourseSelect').value = 'All';
      document.getElementById('filterMonthSelect').value = 'Nov 2026';
      document.getElementById('filterBatchSelect').value = 'All';
      document.getElementById('filterStatusSelect').value = 'All';
      document.getElementById('studentTableSearch').value = '';
      filteredStudents = [...studentsData];
      currentPage = 1;
      renderStudentTable();
      showToast('Filters reset to default');
    }

    // Subnav Tab Switching
    function switchReportTab(tabKey, btnElement) {
      document.querySelectorAll('.tab-pill').forEach(b => b.classList.remove('active'));
      btnElement.classList.add('active');

      if (tabKey === 'performance') {
        document.querySelector('.table-card').scrollIntoView({ behavior: 'smooth' });
        showToast('Viewing Individual Student Performance');
      } else if (tabKey === 'progress') {
        document.querySelector('.trend-chart-wrap').scrollIntoView({ behavior: 'smooth' });
        showToast('Viewing Learning Progress Trend');
      } else if (tabKey === 'assessment') {
        document.querySelector('.table-card').scrollIntoView({ behavior: 'smooth' });
        showToast('Viewing Assessment Outcomes');
      } else if (tabKey === 'attendance') {
        document.querySelector('.table-card').scrollIntoView({ behavior: 'smooth' });
        showToast('Viewing Student Attendance');
      } else if (tabKey === 'assignments') {
        document.querySelector('.table-card').scrollIntoView({ behavior: 'smooth' });
        showToast('Viewing Student Assignments & Submissions');
      } else if (tabKey === 'placement') {
        document.querySelector('.table-card').scrollIntoView({ behavior: 'smooth' });
        showToast('Viewing Placement Readiness & Active Internships');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('Viewing Student Reports Overview');
      }
    }

    function onGlobalSearch(query) {
      filterStudentTable(query);
    }

    // Line Chart: Learning Progress Trend
    function initProgressTrendChart() {
      const ctx = document.getElementById('progressTrendChart').getContext('2d');
      if (progressChart) progressChart.destroy();

      // Peak Badge Plugin on Nov 13
      const peakBadgePlugin = {
        id: 'peakBadgePlugin',
        afterDatasetsDraw(chart) {
          const { ctx } = chart;
          const meta = chart.getDatasetMeta(0);
          const lastPoint = meta.data[meta.data.length - 1];
          if (!lastPoint) return;

          const x = lastPoint.x;
          const y = lastPoint.y;

          ctx.save();
          ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
          const text = '88%';
          const pillWidth = 38;
          const pillHeight = 22;
          const pillX = x - pillWidth / 2;
          const pillY = y - pillHeight - 8;

          ctx.fillStyle = '#2563EB';
          ctx.beginPath();
          ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 5);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(x - 4, pillY + pillHeight);
          ctx.lineTo(x + 4, pillY + pillHeight);
          ctx.lineTo(x, pillY + pillHeight + 4);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, x, pillY + (pillHeight / 2));
          ctx.restore();
        }
      };

      const gradient = ctx.createLinearGradient(0, 0, 0, 180);
      gradient.addColorStop(0, 'rgba(37, 99, 235, 0.20)');
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0.00)');

      progressChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Nov 01', 'Nov 03', 'Nov 05', 'Nov 07', 'Nov 09', 'Nov 11', 'Nov 13'],
          datasets: [{
            label: 'Avg. Progress',
            data: [82, 85, 88, 86, 87, 86, 88],
            borderColor: '#2563EB',
            borderWidth: 2.5,
            pointBackgroundColor: '#2563EB',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4.5,
            pointHoverRadius: 6,
            tension: 0.35,
            fill: true,
            backgroundColor: gradient
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0F172A',
              padding: 10,
              titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: '700' },
              bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
              callbacks: {
                label: (ctx) => ` Progress: ${ctx.parsed.y}%`
              }
            }
          },
          scales: {
            y: {
              min: 75,
              max: 100,
              ticks: {
                stepSize: 5,
                callback: (val) => val + '%',
                color: '#94A3B8',
                font: { family: 'Plus Jakarta Sans', size: 11 }
              },
              grid: {
                color: '#F1F5F9',
                borderDash: [3, 3]
              },
              border: { display: false }
            },
            x: {
              ticks: {
                color: '#94A3B8',
                font: { family: 'Plus Jakarta Sans', size: 11 }
              },
              grid: { display: false },
              border: { display: false }
            }
          }
        },
        plugins: [peakBadgePlugin]
      });
    }

    // Donut Chart: Student Status
    function initStudentStatusDonut() {
      const ctx = document.getElementById('studentStatusDonutChart').getContext('2d');
      if (donutChart) donutChart.destroy();

      donutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Active', 'On Hold', 'Completed', 'Dropped'],
          datasets: [{
            data: [82, 7, 9, 2],
            backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '74%',
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0F172A',
              padding: 10,
              titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: '700' },
              bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
              callbacks: {
                label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`
              }
            }
          }
        }
      });
    }

    // Modal Details for Student
    function viewStudentDetail(studentId) {
      const s = studentsData.find(item => item.studentId === studentId) || defaultStudents[0];
      activeStudent = s;

      document.getElementById('modalStudentName').textContent = s.studentName;
      document.getElementById('modalStudentId').textContent = `${s.studentId} • ${s.course} • ${s.batch || 'Batch A'}`;

      const avatar = document.getElementById('modalAvatar');
      avatar.style.background = s.avatarColor || '#2563EB';
      avatar.textContent = s.avatarInitials || 'ST';

      document.getElementById('modalStudentBody').innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
          <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 11px; color: #64748b; font-weight: 600;">Attendance</div>
            <div style="font-size: 18px; font-weight: 800; color: #059669; margin-top: 4px;">${s.attendance}%</div>
          </div>
          <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 11px; color: #64748b; font-weight: 600;">Completion</div>
            <div style="font-size: 18px; font-weight: 800; color: #2563eb; margin-top: 4px;">${s.completion}%</div>
          </div>
          <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 11px; color: #64748b; font-weight: 600;">Assessment</div>
            <div style="font-size: 18px; font-weight: 800; color: #7c3aed; margin-top: 4px;">${s.assessment}%</div>
          </div>
          <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 11px; color: #64748b; font-weight: 600;">Rating</div>
            <div style="font-size: 14px; font-weight: 800; color: #0f172a; margin-top: 6px;">${s.status}</div>
          </div>
        </div>

        <div style="margin-top: 6px;">
          <h4 style="font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Academic & Placement Profile</h4>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12.5px;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b;">Registered Email:</span>
              <strong>${s.email || 'student@edurup.in'}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b;">Learner Status:</span>
              <strong style="color: #16a34a;">${s.studentStatus || 'Active'}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b;">Placement Readiness:</span>
              <strong style="color: #2563eb;">${s.placementStatus || 'Placed'}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b;">Internship Assignment:</span>
              <strong style="color: #8b5cf6;">${s.internshipStatus || 'Active Internship'}</strong>
            </div>
          </div>
        </div>
      `;

      openModal('studentDetailModal');
    }

    function openStudentOptions(studentId) {
      viewStudentDetail(studentId);
    }

    // Modal Helpers
    function openModal(id) {
      document.getElementById(id).classList.add('open');
    }

    function closeModal(id) {
      document.getElementById(id).classList.remove('open');
    }

    function openExportModal() {
      openModal('exportModal');
    }

    function openShareModal() {
      openModal('shareModal');
    }

    function openReminderModal() {
      openModal('reminderModal');
    }

    function executeExport() {
      const fmt = document.querySelector('input[name="expFmt"]:checked').value;
      closeModal('exportModal');

      if (fmt === 'csv') {
        let csv = 'data:text/csv;charset=utf-8,';
        csv += 'Order,Student Name,Student ID,Course,Attendance,Completion,Assessment,Status\\n';
        studentsData.forEach(s => {
          csv += `${s.order},"${s.studentName}","${s.studentId}","${s.course}",${s.attendance}%,${s.completion}%,${s.assessment}%,"${s.status}"\\n`;
        });
        const uri = encodeURI(csv);
        const link = document.createElement('a');
        link.href = uri;
        link.download = `Edurup_Student_Reports_${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('CSV Report exported successfully!');
      } else {
        showToast(`${fmt.toUpperCase()} Report generated and downloaded!`);
      }
    }

    function downloadSingleStudentReport() {
      if (activeStudent) {
        showToast(`Dossier for ${activeStudent.studentName} downloaded`);
        closeModal('studentDetailModal');
      }
    }

    function copyShareLink() {
      const input = document.getElementById('shareLinkInput');
      input.select();
      navigator.clipboard.writeText(input.value);
      showToast('Share link copied to clipboard!');
    }

    function sendShareEmail() {
      const email = document.getElementById('shareEmailInput').value;
      if (!email) {
        showToast('Please enter a recipient email');
        return;
      }
      closeModal('shareModal');
      showToast(`Student report shared with ${email}`);
    }

    function sendReminderBroadcast() {
      closeModal('reminderModal');
      showToast('Reminder sent successfully to selected students');
    }

    // Toast
    function showToast(msg) {
      const toast = document.getElementById('toastBox');
      const msgSpan = document.getElementById('toastMessage');
      msgSpan.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  </script>
</body>
</html>
"""

with open('/Users/riyasingh/Downloads/production_site/admin-student-reports.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Created admin-student-reports.html successfully!")
