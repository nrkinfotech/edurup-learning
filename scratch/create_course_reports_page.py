import os

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Reports | Edurup Learning</title>
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
      --cyan: #06B6D4;
      --cyan-light: #ECFEFF;
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

    /* ---------------- MAIN WRAPPER ---------------- */
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

    /* Header Section */
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

    .btn-export i.fa-chevron-down {
      font-size: 10px;
      opacity: 0.85;
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
      padding: 8px 18px;
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
      gap: 12px;
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

    .btn-reset {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      color: #64748b;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }

    .btn-reset:hover {
      background: #f1f5f9;
      color: var(--text-main);
      border-color: #cbd5e1;
    }

    /* ---------------- 7 KPI CARDS ---------------- */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 14px;
    }

    @media (max-width: 1200px) {
      .kpi-grid {
        grid-template-columns: repeat(4, 1fr);
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
      flex-direction: column;
      gap: 10px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .kpi-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .kpi-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .kpi-icon-box {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }

    .kpi-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }

    .kpi-pill-green {
      background: #DCFCE7;
      color: #16A34A;
    }

    .kpi-pill-blue {
      background: #DBEAFE;
      color: #2563EB;
    }

    .kpi-pill-purple {
      background: #EDE9FE;
      color: #7C3AED;
    }

    .kpi-val {
      font-size: 22px;
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

    /* ---------------- MIDDLE ROW (3 PANELS) ---------------- */
    .middle-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
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

    .card-head span.head-sub {
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 500;
    }

    /* Chart 1: Enrollment Trend */
    .trend-chart-wrap {
      position: relative;
      flex: 1;
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Chart 2: Completion Donut */
    .donut-chart-container {
      position: relative;
      width: 160px;
      height: 160px;
      margin: 0 auto;
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
      font-size: 26px;
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
      gap: 8px;
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid #f1f5f9;
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
      font-weight: 500;
    }

    .legend-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
    }

    .legend-right {
      font-weight: 700;
      color: var(--text-main);
    }

    .legend-right span {
      color: var(--text-muted);
      font-weight: 500;
    }

    /* Chart 3: Assessment Performance Bars */
    .assessment-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      flex: 1;
      justify-content: center;
    }

    .assessment-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .assessment-label-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12.5px;
    }

    .assessment-tier {
      font-weight: 600;
      color: var(--text-main);
    }

    .assessment-nums {
      font-weight: 700;
      color: var(--text-main);
      font-size: 12px;
    }

    .assessment-nums span {
      color: var(--text-muted);
      font-weight: 500;
    }

    .progress-track {
      height: 8px;
      background: #f1f5f9;
      border-radius: 6px;
      overflow: hidden;
      width: 100%;
    }

    .progress-fill {
      height: 100%;
      border-radius: 6px;
      transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* ---------------- SPLIT ROW: TABLE & INSIGHTS ---------------- */
    .split-grid {
      display: grid;
      grid-template-columns: 2.1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 1080px) {
      .split-grid {
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

    .table-search-input {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 6px 12px;
      width: 240px;
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
      padding: 10px 14px;
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
      padding: 14px 14px;
      font-size: 13px;
      color: var(--text-main);
      border-bottom: 1px solid #f1f5f9;
      vertical-align: middle;
      white-space: nowrap;
    }

    table.data-table tr:hover td {
      background: #f8fafc;
    }

    .course-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .course-avatar-box {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
    }

    .course-meta {
      display: flex;
      flex-direction: column;
    }

    .course-title {
      font-weight: 700;
      color: var(--text-main);
      font-size: 13px;
    }

    .course-sub {
      font-size: 11px;
      color: var(--text-muted);
    }

    .num-bold {
      font-weight: 700;
      color: var(--text-main);
    }

    .active-badge-sm {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      color: #2563eb;
      background: #eff6ff;
      padding: 2px 6px;
      border-radius: 6px;
      margin-left: 6px;
    }

    .mini-progress-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100px;
    }

    .mini-progress-track {
      flex: 1;
      height: 6px;
      background: #f1f5f9;
      border-radius: 4px;
      overflow: hidden;
    }

    .mini-progress-fill {
      height: 100%;
      background: #10B981;
      border-radius: 4px;
    }

    .mini-progress-val {
      font-size: 12px;
      font-weight: 700;
      color: var(--text-main);
      min-width: 28px;
    }

    .score-badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
    }

    .score-badge-green {
      background: #ECFDF5;
      color: #059669;
    }

    .score-badge-blue {
      background: #EFF6FF;
      color: #2563EB;
    }

    .score-badge-amber {
      background: #FFFBEB;
      color: #D97706;
    }

    .status-badge-active {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 11.5px;
      font-weight: 700;
      background: #DCFCE7;
      color: #16A34A;
    }

    .action-icon-btn {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      color: #64748b;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 0.15s;
    }

    .action-icon-btn:hover {
      background: #2563eb;
      color: #ffffff;
      border-color: #2563eb;
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

    .pagination-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-pag {
      padding: 4px 10px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-main);
      cursor: pointer;
      transition: all 0.15s;
    }

    .btn-pag:hover:not(:disabled) {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }

    .btn-pag:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Course Insights Card */
    .insights-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    }

    .insights-title-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
    }

    .insights-bulb {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: #FEF3C7;
      color: #D97706;
      display: flex;
      align-items: center;
      justify-content: center;
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
      gap: 14px;
      flex: 1;
    }

    .insight-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 13px;
      color: var(--text-main);
      line-height: 1.4;
    }

    .insight-check {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #DCFCE7;
      color: #16A34A;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .insights-footer-note {
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid #f1f5f9;
      font-size: 11.5px;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* ---------------- BOTTOM ROW (2 PANELS) ---------------- */
    .bottom-grid {
      display: grid;
      grid-template-columns: 1.8fr 1.2fr;
      gap: 16px;
    }

    @media (max-width: 1080px) {
      .bottom-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Course Engagement Metrics */
    .engagement-metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-top: 8px;
    }

    @media (max-width: 768px) {
      .engagement-metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .engagement-tile {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-align: center;
    }

    .engagement-tile-val {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-main);
    }

    .engagement-tile-lbl {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-muted);
      line-height: 1.2;
    }

    .engagement-bar {
      height: 5px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
      margin-top: 4px;
    }

    .engagement-bar-fill {
      height: 100%;
      border-radius: 3px;
    }

    /* Quick Actions */
    .quick-actions-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 4px;
    }

    .quick-action-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      color: var(--text-main);
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }

    .quick-action-item:hover {
      background: #EFF6FF;
      border-color: #BFDBFE;
      color: #2563EB;
      transform: translateX(2px);
    }

    .qa-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .qa-left i {
      font-size: 14px;
      color: var(--primary);
    }

    .quick-action-item i.fa-chevron-right {
      font-size: 11px;
      color: #94a3b8;
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
  <!-- Will be unified by unify_admin_sidebar.py -->
  <aside class="sidebar" id="adminSidebar"></aside>

  <!-- ================= MAIN CONTENT ================= -->
  <main class="main-content">
    <!-- Topbar -->
    <header class="topbar">
      <div class="top-search-wrap">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="globalCourseSearch" placeholder="Search courses, modules, assessments, metrics..." oninput="onGlobalSearch(this.value)">
      </div>

      <div class="top-right-actions">
        <button class="notification-btn" title="Notifications" onclick="showToast('No new notifications')">
          <i class="fa-regular fa-bell"></i>
          <span class="notif-badge"></span>
        </button>

        <div class="admin-profile-chip" onclick="showToast('Logged in as Edurup Administrator')">
          <div class="admin-avatar-initials">RK</div>
          <div class="admin-chip-info">
            <span class="admin-chip-name">Rupesh Kumar</span>
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
        <span class="current">Course Reports</span>
      </nav>

      <!-- Page Header -->
      <div class="page-header">
        <div class="header-titles">
          <h1>Course Reports</h1>
          <p>Track course performance, enrollments, learning progress, assessments and placement outcomes.</p>
        </div>

        <div class="header-actions">
          <div class="date-range-badge" onclick="openDatePickerModal()">
            <i class="fa-regular fa-calendar"></i>
            <span id="dateRangeText">Nov 01, 2026 - Nov 14, 2026</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>

          <button class="btn-export" onclick="openExportModal()">
            <i class="fa-solid fa-download"></i>
            <span>Export Report</span>
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
      </div>

      <!-- Subnav Tabs -->
      <div class="subnav-tabs">
        <button class="tab-pill active" onclick="switchReportTab('overview', this)">Overview</button>
        <button class="tab-pill" onclick="switchReportTab('performance', this)">Course Performance</button>
        <button class="tab-pill" onclick="switchReportTab('trends', this)">Enrollment Trends</button>
        <button class="tab-pill" onclick="switchReportTab('progress', this)">Learning Progress</button>
        <button class="tab-pill" onclick="switchReportTab('assessment', this)">Assessment</button>
        <button class="tab-pill" onclick="switchReportTab('placement', this)">Placement & Internship</button>
      </div>

      <!-- Filters Bar -->
      <div class="filter-bar">
        <div class="filter-item">
          <span class="filter-label">Course:</span>
          <select id="filterCourseSelect" class="filter-select" onchange="applyFilters()">
            <option value="All">All Courses</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Data Science">Data Science</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Python Full Stack">Python Full Stack</option>
            <option value="AI/ML & Deep Learning">AI/ML & Deep Learning</option>
            <option value="Cloud & DevOps">Cloud & DevOps</option>
            <option value="Cyber Security">Cyber Security</option>
          </select>
        </div>

        <div class="filter-item">
          <span class="filter-label">Subscription Month:</span>
          <select id="filterMonthSelect" class="filter-select" onchange="applyFilters()">
            <option value="Nov 2026">Nov 2026</option>
            <option value="Oct 2026">Oct 2026</option>
            <option value="Sep 2026">Sep 2026</option>
            <option value="All">All Months</option>
          </select>
        </div>

        <div class="filter-item">
          <span class="filter-label">Mode:</span>
          <select id="filterModeSelect" class="filter-select" onchange="applyFilters()">
            <option value="All">All</option>
            <option value="Online Live">Online Live</option>
            <option value="Recorded">Recorded</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div class="filter-item">
          <span class="filter-label">Status:</span>
          <select id="filterStatusSelect" class="filter-select" onchange="applyFilters()">
            <option value="Active">Active</option>
            <option value="Archived">Archived</option>
            <option value="Draft">Draft</option>
            <option value="All">All Statuses</option>
          </select>
        </div>

        <button class="btn-reset" onclick="resetFilters()">
          <i class="fa-solid fa-rotate-left"></i>
          <span>Reset</span>
        </button>
      </div>

      <!-- 7 KPI Cards -->
      <div class="kpi-grid">
        <!-- Card 1: Total Courses -->
        <div class="kpi-card">
          <div class="kpi-card-top">
            <div class="kpi-icon-box" style="background: #F3E8FF; color: #7E22CE;">
              <i class="fa-solid fa-graduation-cap"></i>
            </div>
          </div>
          <div>
            <div class="kpi-val" id="kpiTotalCourses">8</div>
            <div class="kpi-label">Total Courses</div>
          </div>
        </div>

        <!-- Card 2: Total Enrollments -->
        <div class="kpi-card">
          <div class="kpi-card-top">
            <div class="kpi-icon-box" style="background: #DCFCE7; color: #16A34A;">
              <i class="fa-solid fa-users"></i>
            </div>
            <span class="kpi-pill kpi-pill-green" id="kpiEnrollmentsGrowth">↑ +6%</span>
          </div>
          <div>
            <div class="kpi-val" id="kpiTotalEnrollments">1,248</div>
            <div class="kpi-label">Total Enrollments</div>
          </div>
        </div>

        <!-- Card 3: Active Learners -->
        <div class="kpi-card">
          <div class="kpi-card-top">
            <div class="kpi-icon-box" style="background: #DBEAFE; color: #2563EB;">
              <i class="fa-solid fa-user-check"></i>
            </div>
            <span class="kpi-pill kpi-pill-blue" id="kpiActivePct">82.0%</span>
          </div>
          <div>
            <div class="kpi-val" id="kpiActiveLearners">1,023</div>
            <div class="kpi-label">Active Learners</div>
          </div>
        </div>

        <!-- Card 4: Avg. Course Completion -->
        <div class="kpi-card">
          <div class="kpi-card-top">
            <div class="kpi-icon-box" style="background: #EDE9FE; color: #7C3AED;">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <span class="kpi-pill kpi-pill-purple" id="kpiCompletionGrowth">↑ +4%</span>
          </div>
          <div>
            <div class="kpi-val" id="kpiAvgCompletion">88%</div>
            <div class="kpi-label">Avg. Course Completion</div>
          </div>
        </div>

        <!-- Card 5: Avg. Assessment Score -->
        <div class="kpi-card">
          <div class="kpi-card-top">
            <div class="kpi-icon-box" style="background: #FEF3C7; color: #D97706;">
              <i class="fa-solid fa-clipboard-check"></i>
            </div>
          </div>
          <div>
            <div class="kpi-val" id="kpiAvgAssessment">86%</div>
            <div class="kpi-label">Avg. Assessment Score</div>
          </div>
        </div>

        <!-- Card 6: Placement Rate -->
        <div class="kpi-card">
          <div class="kpi-card-top">
            <div class="kpi-icon-box" style="background: #FFEDD5; color: #EA580C;">
              <i class="fa-solid fa-briefcase"></i>
            </div>
          </div>
          <div>
            <div class="kpi-val" id="kpiPlacementRate">70%</div>
            <div class="kpi-label">Placement Rate</div>
          </div>
        </div>

        <!-- Card 7: Internships -->
        <div class="kpi-card">
          <div class="kpi-card-top">
            <div class="kpi-icon-box" style="background: #E0F2FE; color: #0284C7;">
              <i class="fa-solid fa-building"></i>
            </div>
          </div>
          <div>
            <div class="kpi-val" id="kpiInternships">462</div>
            <div class="kpi-label">Internships</div>
          </div>
        </div>
      </div>

      <!-- Middle Row: 3 Panels -->
      <div class="middle-grid">
        <!-- Panel 1: Enrollment Trend -->
        <div class="analytics-card">
          <div class="card-head">
            <h3>Enrollment Trend (All Courses)</h3>
            <span class="head-sub">Nov 01 - Nov 13, 2026</span>
          </div>
          <div class="trend-chart-wrap">
            <canvas id="enrollmentTrendChart"></canvas>
          </div>
        </div>

        <!-- Panel 2: Course Completion (Overall) -->
        <div class="analytics-card">
          <div class="card-head">
            <h3>Course Completion (Overall)</h3>
          </div>
          <div class="donut-chart-container">
            <canvas id="completionDonutChart"></canvas>
            <div class="donut-center-text">
              <div class="pct" id="donutCenterPct">88%</div>
              <div class="lbl">Completion</div>
            </div>
          </div>
          <div class="donut-legend">
            <div class="donut-legend-item">
              <div class="legend-left">
                <span class="legend-dot" style="background: #10B981;"></span>
                <span>Completed</span>
              </div>
              <div class="legend-right">88% <span>(1,098)</span></div>
            </div>
            <div class="donut-legend-item">
              <div class="legend-left">
                <span class="legend-dot" style="background: #3B82F6;"></span>
                <span>In Progress</span>
              </div>
              <div class="legend-right">8% <span>(100)</span></div>
            </div>
            <div class="donut-legend-item">
              <div class="legend-left">
                <span class="legend-dot" style="background: #F59E0B;"></span>
                <span>Not Started</span>
              </div>
              <div class="legend-right">4% <span>(50)</span></div>
            </div>
          </div>
        </div>

        <!-- Panel 3: Assessment Performance -->
        <div class="analytics-card">
          <div class="card-head">
            <h3>Assessment Performance</h3>
          </div>
          <div class="assessment-list">
            <!-- Row 1 -->
            <div class="assessment-item">
              <div class="assessment-label-row">
                <span class="assessment-tier">Excellent (≥ 90%)</span>
                <span class="assessment-nums">52% <span>(648)</span></span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: 52%; background: #10B981;"></div>
              </div>
            </div>

            <!-- Row 2 -->
            <div class="assessment-item">
              <div class="assessment-label-row">
                <span class="assessment-tier">Good (80%-89%)</span>
                <span class="assessment-nums">24% <span>(299)</span></span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: 24%; background: #2563EB;"></div>
              </div>
            </div>

            <!-- Row 3 -->
            <div class="assessment-item">
              <div class="assessment-label-row">
                <span class="assessment-tier">Average (70%-79%)</span>
                <span class="assessment-nums">15% <span>(187)</span></span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: 15%; background: #F59E0B;"></div>
              </div>
            </div>

            <!-- Row 4 -->
            <div class="assessment-item">
              <div class="assessment-label-row">
                <span class="assessment-tier">Below 70%</span>
                <span class="assessment-nums">9% <span>(114)</span></span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: 9%; background: #EF4444;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Split Row: Course-wise Performance & Course Insights -->
      <div class="split-grid">
        <!-- Left: Course-wise Performance Table -->
        <div class="table-card">
          <div class="table-top-bar">
            <div>
              <h3 style="font-size: 15px; font-weight: 700; color: var(--text-main);">Course-wise Performance</h3>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Detailed metrics across all active courses</p>
            </div>
            <div class="table-search-input">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" id="courseTableSearch" placeholder="Search courses..." oninput="filterCourseTable(this.value)">
            </div>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Enrollments</th>
                  <th>Active</th>
                  <th>Completion</th>
                  <th>Assessment</th>
                  <th>Placement</th>
                  <th>Internships</th>
                  <th>Status</th>
                  <th style="text-align: center;">Action</th>
                </tr>
              </thead>
              <tbody id="courseTableBody">
                <!-- Dynamically rendered rows -->
              </tbody>
            </table>
          </div>

          <div class="table-footer">
            <div id="tableRecordCountText">Showing 1 to 5 of 8 courses</div>
            <div class="pagination-actions">
              <button class="btn-pag" id="btnPrevPage" onclick="changeTablePage(-1)" disabled><i class="fa-solid fa-chevron-left"></i> Prev</button>
              <button class="btn-pag" id="btnToggleAllCourses" onclick="toggleShowAllCourses()">Show All 8</button>
              <button class="btn-pag" id="btnNextPage" onclick="changeTablePage(1)">Next <i class="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>
        </div>

        <!-- Right: Course Insights -->
        <div class="insights-card">
          <div class="insights-title-row">
            <div class="insights-bulb">
              <i class="fa-solid fa-lightbulb"></i>
            </div>
            <h3>Course Insights</h3>
          </div>

          <div class="insights-list" id="insightsListContainer">
            <div class="insight-item">
              <div class="insight-check"><i class="fa-solid fa-check"></i></div>
              <span>Data Analytics has the highest enrollment (322)</span>
            </div>
            <div class="insight-item">
              <div class="insight-check"><i class="fa-solid fa-check"></i></div>
              <span>Digital Marketing has the highest completion rate (94%)</span>
            </div>
            <div class="insight-item">
              <div class="insight-check"><i class="fa-solid fa-check"></i></div>
              <span>Data Science has the highest placement rate (74%)</span>
            </div>
            <div class="insight-item">
              <div class="insight-check"><i class="fa-solid fa-check"></i></div>
              <span>Overall course completion is 88% (↑ +4%)</span>
            </div>
            <div class="insight-item">
              <div class="insight-check"><i class="fa-solid fa-check"></i></div>
              <span>462 students are in active internships</span>
            </div>
          </div>

          <div class="insights-footer-note">
            <i class="fa-regular fa-clock"></i>
            <span>Updated today at 11:30 AM</span>
          </div>
        </div>
      </div>

      <!-- Bottom Row: Course Engagement Metrics & Quick Actions -->
      <div class="bottom-grid">
        <!-- Left: Course Engagement Metrics -->
        <div class="analytics-card">
          <div class="card-head">
            <div>
              <h3>Course Engagement Metrics</h3>
              <span class="head-sub">Average platform participation across all courses</span>
            </div>
          </div>

          <div class="engagement-metrics-grid">
            <!-- Tile 1 -->
            <div class="engagement-tile">
              <div class="engagement-tile-val" style="color: #2563EB;" id="tileClassViews">82%</div>
              <div class="engagement-tile-lbl">Avg. Class Views</div>
              <div class="engagement-bar">
                <div class="engagement-bar-fill" style="width: 82%; background: #2563EB;"></div>
              </div>
            </div>

            <!-- Tile 2 -->
            <div class="engagement-tile">
              <div class="engagement-tile-val" style="color: #8B5CF6;" id="tileAssignmentSub">78%</div>
              <div class="engagement-tile-lbl">Avg. Assignment Submission</div>
              <div class="engagement-bar">
                <div class="engagement-bar-fill" style="width: 78%; background: #8B5CF6;"></div>
              </div>
            </div>

            <!-- Tile 3 -->
            <div class="engagement-tile">
              <div class="engagement-tile-val" style="color: #F59E0B;" id="tileQuizScore">86%</div>
              <div class="engagement-tile-lbl">Avg. Quiz Score</div>
              <div class="engagement-bar">
                <div class="engagement-bar-fill" style="width: 86%; background: #F59E0B;"></div>
              </div>
            </div>

            <!-- Tile 4 -->
            <div class="engagement-tile">
              <div class="engagement-tile-val" style="color: #10B981;" id="tileProjectComp">70%</div>
              <div class="engagement-tile-lbl">Project Completion</div>
              <div class="engagement-bar">
                <div class="engagement-bar-fill" style="width: 70%; background: #10B981;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Quick Actions -->
        <div class="analytics-card">
          <div class="card-head">
            <h3>Quick Actions</h3>
          </div>

          <div class="quick-actions-list">
            <a href="javascript:void(0)" class="quick-action-item" onclick="openExportModal()">
              <div class="qa-left">
                <i class="fa-solid fa-file-arrow-down"></i>
                <span>Download Course Report</span>
              </div>
              <i class="fa-solid fa-chevron-right"></i>
            </a>

            <a href="admin-students.html" class="quick-action-item">
              <div class="qa-left">
                <i class="fa-solid fa-users-viewfinder"></i>
                <span>Course-wise Student List</span>
              </div>
              <i class="fa-solid fa-chevron-right"></i>
            </a>

            <a href="javascript:void(0)" class="quick-action-item" onclick="openCompareModal()">
              <div class="qa-left">
                <i class="fa-solid fa-scale-balanced"></i>
                <span>Compare Courses</span>
              </div>
              <i class="fa-solid fa-chevron-right"></i>
            </a>

            <a href="javascript:void(0)" class="quick-action-item" onclick="openShareModal()">
              <div class="qa-left">
                <i class="fa-solid fa-share-nodes"></i>
                <span>Share Report</span>
              </div>
              <i class="fa-solid fa-chevron-right"></i>
            </a>

            <a href="javascript:void(0)" class="quick-action-item" onclick="openReviewModal()">
              <div class="qa-left">
                <i class="fa-solid fa-calendar-check"></i>
                <span>Schedule Review</span>
              </div>
              <i class="fa-solid fa-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>

    </div>
  </main>

  <!-- ================= MODALS ================= -->
  <!-- Export Report Modal -->
  <div class="modal-backdrop" id="exportModal">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Export Course Performance Report</h3>
        <button class="modal-close-btn" onclick="closeModal('exportModal')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <p style="font-size: 13.5px; color: var(--text-muted);">Choose format and data scope to generate the official course report.</p>
        <div>
          <label style="font-size: 12.5px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 6px;">Report Format</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <label style="border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer; text-align: center;">
              <input type="radio" name="exportFmt" value="excel" checked style="margin-bottom: 4px;"><br>
              <i class="fa-solid fa-file-excel" style="color: #10B981; font-size: 20px; margin: 4px 0;"></i><br>
              <strong style="font-size: 12px;">Excel (.xlsx)</strong>
            </label>
            <label style="border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer; text-align: center;">
              <input type="radio" name="exportFmt" value="csv" style="margin-bottom: 4px;"><br>
              <i class="fa-solid fa-file-csv" style="color: #2563EB; font-size: 20px; margin: 4px 0;"></i><br>
              <strong style="font-size: 12px;">CSV (.csv)</strong>
            </label>
            <label style="border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer; text-align: center;">
              <input type="radio" name="exportFmt" value="pdf" style="margin-bottom: 4px;"><br>
              <i class="fa-solid fa-file-pdf" style="color: #EF4444; font-size: 20px; margin: 4px 0;"></i><br>
              <strong style="font-size: 12px;">PDF Summary</strong>
            </label>
          </div>
        </div>
        <div>
          <label style="font-size: 12.5px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 6px;">Included Information</label>
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px;">
            <label><input type="checkbox" checked> KPI Metrics & Executive Summary</label>
            <label><input type="checkbox" checked> Course-wise Enrollments & Completion</label>
            <label><input type="checkbox" checked> Assessment Grade Breakdown</label>
            <label><input type="checkbox" checked> Placement & Active Internships</label>
            <label><input type="checkbox" checked> Platform Engagement Statistics</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-pag" onclick="closeModal('exportModal')">Cancel</button>
        <button class="btn-export" onclick="executeExport()"><i class="fa-solid fa-download"></i> Download File</button>
      </div>
    </div>
  </div>

  <!-- Course Details Modal -->
  <div class="modal-backdrop" id="courseDetailsModal">
    <div class="modal-box" style="max-width: 680px;">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div id="modalCourseIconBox" style="width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px;"></div>
          <div>
            <h3 id="modalCourseTitle">Course Details</h3>
            <span id="modalCourseCode" style="font-size: 12px; color: var(--text-muted);">DA-101</span>
          </div>
        </div>
        <button class="modal-close-btn" onclick="closeModal('courseDetailsModal')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body" id="modalCourseContent">
        <!-- Rendered dynamically -->
      </div>
      <div class="modal-footer">
        <button class="btn-pag" onclick="closeModal('courseDetailsModal')">Close</button>
        <button class="btn-export" onclick="exportSingleCourse()"><i class="fa-solid fa-file-pdf"></i> Course Dossier</button>
      </div>
    </div>
  </div>

  <!-- Compare Modal -->
  <div class="modal-backdrop" id="compareModal">
    <div class="modal-box" style="max-width: 720px;">
      <div class="modal-header">
        <h3>Course Comparison Matrix</h3>
        <button class="modal-close-btn" onclick="closeModal('compareModal')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">Key metrics comparison across top registered disciplines:</p>
        <div class="table-responsive">
          <table class="data-table" style="font-size: 12.5px;">
            <thead>
              <tr>
                <th>Course</th>
                <th>Enrollments</th>
                <th>Completion</th>
                <th>Assessment</th>
                <th>Placement</th>
                <th>Internships</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Data Analytics</strong></td>
                <td>322</td>
                <td><span class="score-badge score-badge-green">93%</span></td>
                <td>86%</td>
                <td>72%</td>
                <td>118</td>
              </tr>
              <tr>
                <td><strong>Data Science</strong></td>
                <td>186</td>
                <td><span class="score-badge score-badge-green">91%</span></td>
                <td>88%</td>
                <td>74%</td>
                <td>72</td>
              </tr>
              <tr>
                <td><strong>Full Stack Dev</strong></td>
                <td>178</td>
                <td><span class="score-badge score-badge-blue">87%</span></td>
                <td>85%</td>
                <td>68%</td>
                <td>60</td>
              </tr>
              <tr>
                <td><strong>Digital Marketing</strong></td>
                <td>165</td>
                <td><span class="score-badge score-badge-green">94%</span></td>
                <td>90%</td>
                <td>76%</td>
                <td>66</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-pag" onclick="closeModal('compareModal')">Close</button>
        <button class="btn-export" onclick="showToast('Comparison report exported'); closeModal('compareModal')"><i class="fa-solid fa-download"></i> Export Comparison</button>
      </div>
    </div>
  </div>

  <!-- Share Modal -->
  <div class="modal-backdrop" id="shareModal">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Share Course Report</h3>
        <button class="modal-close-btn" onclick="closeModal('shareModal')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <p style="font-size: 13.5px; color: var(--text-muted);">Share view access to this live analytics report with trainers or executives.</p>
        <div>
          <label style="font-size: 12px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 6px;">Report Link</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="shareLinkInput" value="https://edurup.in/admin-course-reports.html?range=nov2026" readonly style="flex: 1; padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 12.5px; background: #f8fafc;">
            <button class="btn-pag" onclick="copyShareLink()"><i class="fa-solid fa-copy"></i> Copy</button>
          </div>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 6px;">Send directly via Email</label>
          <input type="email" id="shareEmailInput" placeholder="recipient@edurup.in" style="width: 100%; padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 12.5px;">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-pag" onclick="closeModal('shareModal')">Cancel</button>
        <button class="btn-export" onclick="sendShareEmail()"><i class="fa-solid fa-paper-plane"></i> Send Email</button>
      </div>
    </div>
  </div>

  <!-- Schedule Review Modal -->
  <div class="modal-backdrop" id="reviewModal">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Schedule Curriculum & Performance Review</h3>
        <button class="modal-close-btn" onclick="closeModal('reviewModal')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <div>
          <label style="font-size: 12px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 6px;">Review Type</label>
          <select style="width: 100%; padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px;">
            <option>Monthly Course Completion Review</option>
            <option>Trainer Evaluation & Assessment Check</option>
            <option>Placement & Internship Handoff</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 6px;">Date & Time</label>
          <input type="datetime-local" value="2026-11-20T11:00" style="width: 100%; padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px;">
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 6px;">Attendees</label>
          <input type="text" value="Academic Director, Lead Trainers, Placement Cell" style="width: 100%; padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px;">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-pag" onclick="closeModal('reviewModal')">Cancel</button>
        <button class="btn-export" onclick="showToast('Review meeting scheduled'); closeModal('reviewModal')"><i class="fa-solid fa-calendar-check"></i> Confirm Schedule</button>
      </div>
    </div>
  </div>

  <!-- Toast Notification Container -->
  <div id="toastBox">
    <i class="fa-solid fa-circle-check"></i>
    <span id="toastMessage">Success</span>
  </div>

  <script>
    // Global State
    let coursesData = [];
    let currentTablePage = 1;
    let pageSize = 5;
    let showAllCourses = false;
    let filteredCourses = [];
    let enrollmentChart = null;
    let completionChart = null;
    let activeSelectedCourse = null;

    // Default Fallback Data (Exact screenshot data)
    const defaultCourses = [
      {
        order: 1,
        courseName: 'Data Analytics',
        code: 'DA-101',
        category: 'Data Analytics',
        icon: 'fa-chart-pie',
        iconColor: '#2563EB',
        enrollments: 322,
        active: 268,
        completion: 93,
        assessment: 86,
        placement: 72,
        internships: 118,
        status: 'Active',
        mode: 'Hybrid',
        subscriptionMonth: 'Nov 2026',
        batchCount: 12,
        trainerName: 'Dr. Amit Trivedi'
      },
      {
        order: 2,
        courseName: 'Data Science',
        code: 'DS-201',
        category: 'Data Science',
        icon: 'fa-brain',
        iconColor: '#8B5CF6',
        enrollments: 186,
        active: 155,
        completion: 91,
        assessment: 88,
        placement: 74,
        internships: 72,
        status: 'Active',
        mode: 'Hybrid',
        subscriptionMonth: 'Nov 2026',
        batchCount: 8,
        trainerName: 'Dr. Sanya Kapoor'
      },
      {
        order: 3,
        courseName: 'Full Stack Developer',
        code: 'FSD-301',
        category: 'Full Stack Development',
        icon: 'fa-laptop-code',
        iconColor: '#10B981',
        enrollments: 178,
        active: 149,
        completion: 87,
        assessment: 85,
        placement: 68,
        internships: 60,
        status: 'Active',
        mode: 'Online Live',
        subscriptionMonth: 'Nov 2026',
        batchCount: 8,
        trainerName: 'Vikram Sen'
      },
      {
        order: 4,
        courseName: 'Digital Marketing',
        code: 'DM-401',
        category: 'Digital Marketing',
        icon: 'fa-bullhorn',
        iconColor: '#F59E0B',
        enrollments: 165,
        active: 138,
        completion: 94,
        assessment: 90,
        placement: 76,
        internships: 66,
        status: 'Active',
        mode: 'Recorded',
        subscriptionMonth: 'Nov 2026',
        batchCount: 7,
        trainerName: 'Rohit Mehra'
      },
      {
        order: 5,
        courseName: 'Python Full Stack',
        code: 'PFS-501',
        category: 'Development',
        icon: 'fa-brands fa-python',
        iconColor: '#3B82F6',
        enrollments: 128,
        active: 104,
        completion: 88,
        assessment: 84,
        placement: 69,
        internships: 48,
        status: 'Active',
        mode: 'Hybrid',
        subscriptionMonth: 'Nov 2026',
        batchCount: 5,
        trainerName: 'Neha Sharma'
      },
      {
        order: 6,
        courseName: 'AI/ML & Deep Learning',
        code: 'AIML-601',
        category: 'AI / ML',
        icon: 'fa-robot',
        iconColor: '#6366F1',
        enrollments: 110,
        active: 90,
        completion: 85,
        assessment: 87,
        placement: 71,
        internships: 42,
        status: 'Active',
        mode: 'Online Live',
        subscriptionMonth: 'Nov 2026',
        batchCount: 4,
        trainerName: 'Arjun Rao'
      },
      {
        order: 7,
        courseName: 'Cloud & DevOps',
        code: 'CDO-701',
        category: 'Cloud & DevOps',
        icon: 'fa-cloud',
        iconColor: '#06B6D4',
        enrollments: 95,
        active: 75,
        completion: 83,
        assessment: 83,
        placement: 65,
        internships: 34,
        status: 'Active',
        mode: 'Online Live',
        subscriptionMonth: 'Nov 2026',
        batchCount: 4,
        trainerName: 'Pooja Nair'
      },
      {
        order: 8,
        courseName: 'Cyber Security',
        code: 'CS-801',
        category: 'Cyber Security',
        icon: 'fa-shield-halved',
        iconColor: '#EF4444',
        enrollments: 64,
        active: 44,
        completion: 82,
        assessment: 82,
        placement: 63,
        internships: 22,
        status: 'Active',
        mode: 'Recorded',
        subscriptionMonth: 'Nov 2026',
        batchCount: 3,
        trainerName: 'Karan Varma'
      }
    ];

    // Initialize Page
    document.addEventListener('DOMContentLoaded', () => {
      fetchCourseReports();
    });

    // Fetch reports from backend API or fallback
    async function fetchCourseReports() {
      try {
        const res = await fetch('/api/admin/reports/courses');
        const json = await res.json();
        if (json.success && json.courses && json.courses.length > 0) {
          coursesData = json.courses;
          updateKPICards(json.kpis);
        } else {
          coursesData = defaultCourses;
        }
      } catch (err) {
        console.warn('Using default course reports data:', err);
        coursesData = defaultCourses;
      }
      filteredCourses = [...coursesData];
      renderCourseTable();
      initEnrollmentTrendChart();
      initCompletionDonutChart();
    }

    // Update KPI UI
    function updateKPICards(kpis) {
      if (!kpis) return;
      document.getElementById('kpiTotalCourses').textContent = kpis.totalCourses;
      document.getElementById('kpiTotalEnrollments').textContent = Number(kpis.totalEnrollments).toLocaleString();
      document.getElementById('kpiEnrollmentsGrowth').textContent = `↑ ${kpis.enrollmentsGrowth}`;
      document.getElementById('kpiActiveLearners').textContent = Number(kpis.activeLearners).toLocaleString();
      document.getElementById('kpiActivePct').textContent = kpis.activeLearnersPercentage;
      document.getElementById('kpiAvgCompletion').textContent = kpis.avgCompletion;
      document.getElementById('kpiCompletionGrowth').textContent = `↑ ${kpis.avgCompletionGrowth}`;
      document.getElementById('kpiAvgAssessment').textContent = kpis.avgAssessmentScore;
      document.getElementById('kpiPlacementRate').textContent = kpis.placementRate;
      document.getElementById('kpiInternships').textContent = Number(kpis.internships).toLocaleString();
    }

    // Render Table
    function renderCourseTable() {
      const tbody = document.getElementById('courseTableBody');
      tbody.innerHTML = '';

      if (filteredCourses.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 24px; color: #94a3b8;">No matching courses found.</td></tr>`;
        document.getElementById('tableRecordCountText').textContent = 'Showing 0 of 0 courses';
        return;
      }

      let displayItems = [];
      if (showAllCourses) {
        displayItems = filteredCourses;
        document.getElementById('tableRecordCountText').textContent = `Showing all ${filteredCourses.length} courses`;
        document.getElementById('btnPrevPage').disabled = true;
        document.getElementById('btnNextPage').disabled = true;
        document.getElementById('btnToggleAllCourses').textContent = 'Show 5 per page';
      } else {
        const startIdx = (currentTablePage - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        displayItems = filteredCourses.slice(startIdx, endIdx);
        const actualEnd = Math.min(endIdx, filteredCourses.length);
        document.getElementById('tableRecordCountText').textContent = `Showing ${startIdx + 1} to ${actualEnd} of ${filteredCourses.length} courses`;
        document.getElementById('btnPrevPage').disabled = (currentTablePage === 1);
        document.getElementById('btnNextPage').disabled = (endIdx >= filteredCourses.length);
        document.getElementById('btnToggleAllCourses').textContent = `Show All ${filteredCourses.length}`;
      }

      displayItems.forEach(c => {
        const activePct = Math.round((c.active / c.enrollments) * 100);
        const assessClass = c.assessment >= 88 ? 'score-badge-green' : (c.assessment >= 84 ? 'score-badge-blue' : 'score-badge-amber');
        const placeClass = c.placement >= 72 ? 'score-badge-green' : (c.placement >= 68 ? 'score-badge-blue' : 'score-badge-amber');

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <div class="course-cell">
              <div class="course-avatar-box" style="background: ${c.iconColor}18; color: ${c.iconColor};">
                <i class="fa-solid ${c.icon}"></i>
              </div>
              <div class="course-meta">
                <span class="course-title">${c.courseName}</span>
                <span class="course-sub">${c.code || 'CRS'} • ${c.mode || 'Hybrid'}</span>
              </div>
            </div>
          </td>
          <td><span class="num-bold">${c.enrollments}</span></td>
          <td>
            <span class="num-bold">${c.active}</span>
            <span class="active-badge-sm">${activePct}%</span>
          </td>
          <td>
            <div class="mini-progress-wrap">
              <div class="mini-progress-track">
                <div class="mini-progress-fill" style="width: ${c.completion}%;"></div>
              </div>
              <span class="mini-progress-val">${c.completion}%</span>
            </div>
          </td>
          <td>
            <span class="score-badge ${assessClass}">${c.assessment}%</span>
          </td>
          <td>
            <span class="score-badge ${placeClass}">${c.placement}%</span>
          </td>
          <td><span class="num-bold">${c.internships}</span></td>
          <td>
            <span class="status-badge-active"><i class="fa-solid fa-circle" style="font-size: 6px;"></i> ${c.status || 'Active'}</span>
          </td>
          <td style="text-align: center;">
            <button class="action-icon-btn" title="View Course Drilldown" onclick="openCourseDetails('${c.courseName}')">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Table Pagination
    function changeTablePage(delta) {
      currentTablePage += delta;
      renderCourseTable();
    }

    function toggleShowAllCourses() {
      showAllCourses = !showAllCourses;
      currentTablePage = 1;
      renderCourseTable();
    }

    // Search Course Table
    function filterCourseTable(query) {
      const q = query.toLowerCase().trim();
      if (!q) {
        filteredCourses = [...coursesData];
      } else {
        filteredCourses = coursesData.filter(c => 
          c.courseName.toLowerCase().includes(q) ||
          (c.code && c.code.toLowerCase().includes(q)) ||
          (c.category && c.category.toLowerCase().includes(q)) ||
          (c.trainerName && c.trainerName.toLowerCase().includes(q))
        );
      }
      currentTablePage = 1;
      renderCourseTable();
    }

    // Top Filter Bar Actions
    function applyFilters() {
      const courseVal = document.getElementById('filterCourseSelect').value;
      const monthVal = document.getElementById('filterMonthSelect').value;
      const modeVal = document.getElementById('filterModeSelect').value;
      const statusVal = document.getElementById('filterStatusSelect').value;

      filteredCourses = coursesData.filter(c => {
        let match = true;
        if (courseVal !== 'All' && c.courseName !== courseVal) match = false;
        if (monthVal !== 'All' && c.subscriptionMonth && c.subscriptionMonth !== monthVal) match = false;
        if (modeVal !== 'All' && c.mode && c.mode !== modeVal) match = false;
        if (statusVal !== 'All' && c.status && c.status !== statusVal) match = false;
        return match;
      });

      currentTablePage = 1;
      renderCourseTable();
      showToast(`Filters applied: ${filteredCourses.length} courses match`);
    }

    function resetFilters() {
      document.getElementById('filterCourseSelect').value = 'All';
      document.getElementById('filterMonthSelect').value = 'Nov 2026';
      document.getElementById('filterModeSelect').value = 'All';
      document.getElementById('filterStatusSelect').value = 'Active';
      document.getElementById('courseTableSearch').value = '';
      filteredCourses = [...coursesData];
      currentTablePage = 1;
      showAllCourses = false;
      renderCourseTable();
      showToast('Filters reset to default');
    }

    // Subnav Tab Switching
    function switchReportTab(tabKey, btnElement) {
      document.querySelectorAll('.tab-pill').forEach(b => b.classList.remove('active'));
      btnElement.classList.add('active');

      if (tabKey === 'performance') {
        document.querySelector('.table-card').scrollIntoView({ behavior: 'smooth' });
        showToast('Viewing Course Performance Table');
      } else if (tabKey === 'trends') {
        document.querySelector('.trend-chart-wrap').scrollIntoView({ behavior: 'smooth' });
        showToast('Viewing Enrollment Trends');
      } else if (tabKey === 'progress') {
        document.querySelector('.donut-chart-container').scrollIntoView({ behavior: 'smooth' });
        showToast('Viewing Completion & Progress Breakdown');
      } else if (tabKey === 'assessment') {
        document.querySelector('.assessment-list').scrollIntoView({ behavior: 'smooth' });
        showToast('Viewing Assessment Performance');
      } else if (tabKey === 'placement') {
        document.querySelector('.table-card').scrollIntoView({ behavior: 'smooth' });
        showToast('Viewing Placement & Internship Outcomes');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('Viewing Executive Overview');
      }
    }

    // Global Search
    function onGlobalSearch(query) {
      filterCourseTable(query);
    }

    // Line Chart: Enrollment Trend
    function initEnrollmentTrendChart() {
      const ctx = document.getElementById('enrollmentTrendChart').getContext('2d');
      if (enrollmentChart) enrollmentChart.destroy();

      // Custom plugin to draw floating peak badge "1,248" on Nov 13
      const peakBadgePlugin = {
        id: 'peakBadgePlugin',
        afterDatasetsDraw(chart) {
          const { ctx } = chart;
          const meta = chart.getDatasetMeta(0);
          const lastPoint = meta.data[meta.data.length - 1];
          if (!lastPoint) return;

          const x = lastPoint.x;
          const y = lastPoint.y;

          // Draw floating pill
          ctx.save();
          ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
          const text = '1,248';
          const textWidth = ctx.measureText(text).width;
          const pillWidth = textWidth + 16;
          const pillHeight = 24;
          const pillX = x - pillWidth / 2;
          const pillY = y - pillHeight - 8;

          // Pill Background
          ctx.fillStyle = '#2563EB';
          ctx.beginPath();
          ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 6);
          ctx.fill();

          // Small triangle pointer
          ctx.beginPath();
          ctx.moveTo(x - 5, pillY + pillHeight);
          ctx.lineTo(x + 5, pillY + pillHeight);
          ctx.lineTo(x, pillY + pillHeight + 5);
          ctx.closePath();
          ctx.fill();

          // Text
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, x, pillY + (pillHeight / 2));
          ctx.restore();
        }
      };

      // Create gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, 'rgba(37, 99, 235, 0.22)');
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0.00)');

      enrollmentChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Nov 01', 'Nov 03', 'Nov 05', 'Nov 07', 'Nov 09', 'Nov 11', 'Nov 13'],
          datasets: [{
            label: 'Total Enrollments',
            data: [850, 920, 980, 1040, 1110, 1190, 1248],
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
                label: (ctx) => ` Enrollments: ${ctx.parsed.y.toLocaleString()}`
              }
            }
          },
          scales: {
            y: {
              min: 800,
              max: 1400,
              ticks: {
                stepSize: 200,
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

    // Donut Chart: Completion (Overall)
    function initCompletionDonutChart() {
      const ctx = document.getElementById('completionDonutChart').getContext('2d');
      if (completionChart) completionChart.destroy();

      completionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'In Progress', 'Not Started'],
          datasets: [{
            data: [88, 8, 4],
            backgroundColor: ['#10B981', '#3B82F6', '#F59E0B'],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '76%',
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

    // Open Drilldown Modal for Single Course
    function openCourseDetails(courseName) {
      const course = coursesData.find(c => c.courseName === courseName) || defaultCourses[0];
      activeSelectedCourse = course;

      document.getElementById('modalCourseTitle').textContent = course.courseName;
      document.getElementById('modalCourseCode').textContent = `${course.code || 'CRS'} • ${course.category || 'Discipline'} • ${course.mode || 'Hybrid'}`;

      const iconBox = document.getElementById('modalCourseIconBox');
      iconBox.style.background = `${course.iconColor}20`;
      iconBox.style.color = course.iconColor;
      iconBox.innerHTML = `<i class="fa-solid ${course.icon}"></i>`;

      const activePct = Math.round((course.active / course.enrollments) * 100);

      document.getElementById('modalCourseContent').innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
          <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 11px; color: #64748b; font-weight: 600;">Total Enrolled</div>
            <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 4px;">${course.enrollments}</div>
          </div>
          <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 11px; color: #64748b; font-weight: 600;">Active (${activePct}%)</div>
            <div style="font-size: 18px; font-weight: 800; color: #2563eb; margin-top: 4px;">${course.active}</div>
          </div>
          <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 11px; color: #64748b; font-weight: 600;">Completion Rate</div>
            <div style="font-size: 18px; font-weight: 800; color: #10b981; margin-top: 4px;">${course.completion}%</div>
          </div>
          <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 11px; color: #64748b; font-weight: 600;">Interns Placed</div>
            <div style="font-size: 18px; font-weight: 800; color: #7c3aed; margin-top: 4px;">${course.internships}</div>
          </div>
        </div>

        <div style="margin-top: 10px;">
          <h4 style="font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Key Performance Breakdown</h4>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12.5px;">
            <div style="display: flex; justify-content: space-between;">
              <span>Average Assessment Score</span>
              <strong style="color: #2563eb;">${course.assessment}%</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Placement Conversion Rate</span>
              <strong style="color: #10b981;">${course.placement}%</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Lead Instructor</span>
              <strong>${course.trainerName || 'Senior Faculty'}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Active Learning Batches</span>
              <strong>${course.batchCount || 6} Batches</strong>
            </div>
          </div>
        </div>
      `;

      openModal('courseDetailsModal');
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

    function openCompareModal() {
      openModal('compareModal');
    }

    function openShareModal() {
      openModal('shareModal');
    }

    function openReviewModal() {
      openModal('reviewModal');
    }

    function openDatePickerModal() {
      showToast('Date range: Nov 01, 2026 - Nov 14, 2026');
    }

    function executeExport() {
      const fmt = document.querySelector('input[name="exportFmt"]:checked').value;
      closeModal('exportModal');

      if (fmt === 'csv') {
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'Course Name,Code,Enrollments,Active,Completion Rate,Assessment Avg,Placement Rate,Internships,Status\\n';
        coursesData.forEach(c => {
          csvContent += `"${c.courseName}","${c.code || ''}",${c.enrollments},${c.active},${c.completion}%,${c.assessment}%,${c.placement}%,${c.internships},"${c.status}"\\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Edurup_Course_Report_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('CSV Report downloaded successfully!');
      } else {
        showToast(`${fmt.toUpperCase()} Report generated and downloaded!`);
      }
    }

    function exportSingleCourse() {
      if (activeSelectedCourse) {
        showToast(`Dossier for ${activeSelectedCourse.courseName} downloaded`);
        closeModal('courseDetailsModal');
      }
    }

    function copyShareLink() {
      const copyText = document.getElementById('shareLinkInput');
      copyText.select();
      navigator.clipboard.writeText(copyText.value);
      showToast('Report link copied to clipboard!');
    }

    function sendShareEmail() {
      const email = document.getElementById('shareEmailInput').value;
      if (!email) {
        showToast('Please enter an email address');
        return;
      }
      closeModal('shareModal');
      showToast(`Report shared with ${email}`);
    }

    // Toast Function
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

with open('/Users/riyasingh/Downloads/production_site/admin-course-reports.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Created admin-course-reports.html successfully!")
