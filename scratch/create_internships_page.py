import os

HTML_CONTENT = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Internship Postings | Companies & Mentors | Edurup Learning</title>
  <link rel="icon" type="image/png" href="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <style>
    :root {
      --bg-sidebar: #0B132B;
      --sidebar-hover: #1C2541;
      --sidebar-active: #2563EB;
      --bg-body: #F4F7FC;
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
      --success-badge-bg: #DCFCE7;
      --success-badge-text: #15803D;
      --warning: #F59E0B;
      --warning-light: #FFFBEB;
      --warning-badge-bg: #FEF3C7;
      --warning-badge-text: #B45309;
      --info: #0284C7;
      --info-badge-bg: #E0F2FE;
      --info-badge-text: #0369A1;
      --danger: #EF4444;
      --danger-light: #FEF2F2;
      --purple: #8B5CF6;
      --purple-badge-bg: #F3E8FF;
      --purple-badge-text: #7E22CE;
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
      background: #f8fafc;
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
      width: 480px;
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
      position: relative;
    }

    .admin-profile-chip:hover {
      background: #f1f5f9;
    }

    .avatar-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #8b5cf6, #6d28d9);
      color: #ffffff;
      font-weight: 700;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .admin-meta {
      display: flex;
      flex-direction: column;
    }

    .admin-name {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.2;
    }

    .admin-role {
      font-size: 11px;
      color: var(--text-muted);
    }

    /* ---------------- PAGE LAYOUT ---------------- */
    .page-layout-wrap {
      display: flex;
      padding: 24px 32px 40px;
      gap: 24px;
      align-items: flex-start;
      width: 100%;
    }

    .page-left-main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 18px;
      transition: all 0.3s ease;
    }

    /* Breadcrumbs */
    .breadcrumb-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      color: var(--text-muted);
    }

    .breadcrumb-row a {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.15s;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .breadcrumb-row a:hover {
      color: var(--primary);
    }

    .breadcrumb-row .sep {
      color: #cbd5e1;
      font-size: 11px;
    }

    .breadcrumb-current {
      color: var(--primary);
      font-weight: 600;
    }

    /* Page Header */
    .page-header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .page-title-block h1 {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.02em;
    }

    .page-title-block p {
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .header-actions-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-header-secondary {
      background: #ffffff;
      color: #475569;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 9px 16px;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .btn-header-secondary:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: var(--primary);
    }

    .btn-header-primary {
      background: var(--primary);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 9px 18px;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
    }

    .btn-header-primary:hover {
      background: var(--primary-hover);
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
      transform: translateY(-1px);
    }

    /* ---------------- SUB-NAV PILL ROW ---------------- */
    .subnav-pill-row {
      display: flex;
      align-items: center;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 2px;
    }

    .subnav-pill-row::-webkit-scrollbar {
      height: 4px;
    }

    .subnav-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12.5px;
      font-weight: 600;
      color: #475569;
      background: #ffffff;
      border: 1px solid var(--border);
      text-decoration: none;
      transition: all 0.15s ease;
      white-space: nowrap;
      cursor: pointer;
    }

    .subnav-pill:hover {
      color: var(--primary);
      border-color: #cbd5e1;
      background: #f8fafc;
    }

    .subnav-pill.active {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
    }

    .subnav-pill i {
      font-size: 13px;
    }

    /* ---------------- KPI STATS GRID (5 CARDS) ---------------- */
    .kpi-stats-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 14px;
    }

    .kpi-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px 18px;
      display: flex;
      align-items: center;
      gap: 14px;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.02);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .kpi-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    }

    .kpi-icon-box {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }

    .kpi-icon-box.purple {
      background: #F3E8FF;
      color: #9333EA;
    }

    .kpi-icon-box.green {
      background: #DCFCE7;
      color: #16A34A;
    }

    .kpi-icon-box.amber {
      background: #FEF3C7;
      color: #D97706;
    }

    .kpi-icon-box.pink {
      background: #FFE4E6;
      color: #E11D48;
    }

    .kpi-icon-box.blue {
      background: #DBEAFE;
      color: #2563EB;
    }

    .kpi-content {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .kpi-num-row {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }

    .kpi-num {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.1;
    }

    .kpi-sub-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }

    .kpi-sub-pill.green {
      background: #DCFCE7;
      color: #15803D;
    }

    .kpi-sub-pill.amber {
      background: #FEF3C7;
      color: #B45309;
    }

    .kpi-desc {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      margin-top: 3px;
    }

    /* ---------------- FILTERS & SEARCH ROW ---------------- */
    .filters-row {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .search-input-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 14px;
      width: 270px;
      transition: border 0.2s;
    }

    .search-input-wrap:focus-within {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .search-input-wrap i {
      color: #94a3b8;
      font-size: 13px;
    }

    .search-input-wrap input {
      border: none;
      outline: none;
      font-size: 12.5px;
      color: var(--text-main);
      width: 100%;
    }

    .filter-select {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 12.5px;
      font-weight: 600;
      color: #475569;
      outline: none;
      cursor: pointer;
      transition: border 0.15s;
    }

    .filter-select:hover {
      border-color: #cbd5e1;
    }

    .date-range-btn {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 12.5px;
      font-weight: 600;
      color: #475569;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s;
    }

    .date-range-btn:hover {
      border-color: #cbd5e1;
      color: var(--primary);
    }

    .btn-reset {
      background: transparent;
      border: none;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--primary);
      cursor: pointer;
      padding: 6px 10px;
      transition: opacity 0.15s;
    }

    .btn-reset:hover {
      text-decoration: underline;
    }

    /* ---------------- TABS ROW ---------------- */
    .status-tabs-row {
      display: flex;
      align-items: center;
      gap: 20px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 2px;
    }

    .status-tab {
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      font-size: 13px;
      font-weight: 600;
      color: #64748b;
      padding: 8px 4px 10px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: -1px;
    }

    .status-tab:hover {
      color: var(--text-main);
    }

    .status-tab.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
      font-weight: 700;
    }

    /* ---------------- TABLE CONTAINER ---------------- */
    .table-container {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.02);
    }

    table.postings-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    table.postings-table th {
      background: #f8fafc;
      padding: 12px 14px;
      font-size: 11.5px;
      font-weight: 700;
      color: #64748b;
      border-bottom: 1px solid var(--border);
      white-space: nowrap;
    }

    table.postings-table td {
      padding: 13px 14px;
      font-size: 12.5px;
      color: var(--text-main);
      border-bottom: 1px solid #f1f5f9;
      vertical-align: middle;
    }

    table.postings-table tr:hover td {
      background: #fafcff;
    }

    table.postings-table tr.selected-row td {
      background: #eff6ff !important;
    }

    .col-check {
      width: 36px;
      text-align: center;
    }

    .col-num {
      width: 32px;
      font-weight: 600;
      color: #64748b;
    }

    .posting-title-cell {
      font-weight: 700;
      color: var(--text-main);
      cursor: pointer;
      transition: color 0.15s;
    }

    .posting-title-cell:hover {
      color: var(--primary);
    }

    /* Company Logo Badge */
    .company-cell {
      display: flex;
      align-items: center;
      gap: 9px;
      font-weight: 600;
      color: var(--text-main);
      white-space: nowrap;
    }

    .company-logo-badge {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* Domain Badges */
    .domain-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 6px;
      display: inline-block;
      white-space: nowrap;
    }

    .domain-badge.data-analytics { background: #EFF6FF; color: #2563EB; }
    .domain-badge.full-stack { background: #F5F3FF; color: #7C3AED; }
    .domain-badge.digital-marketing { background: #FDF2F8; color: #DB2777; }
    .domain-badge.data-science { background: #EDE9FE; color: #6D28D9; }
    .domain-badge.business-analyst { background: #E0F2FE; color: #0284C7; }
    .domain-badge.python---ml { background: #EEF2FF; color: #4F46E5; }
    .domain-badge.design--ui-ux- { background: #F3E8FF; color: #9333EA; }
    .domain-badge.cloud---devops { background: #ECFEFF; color: #0891B2; }
    .domain-badge.analytics { background: #E0F2FE; color: #0369A1; }
    .domain-badge.ai---ml { background: #FAF5FF; color: #7E22CE; }

    /* Mode Badge */
    .mode-cell {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #475569;
      white-space: nowrap;
    }

    .mode-cell i {
      font-size: 11px;
      color: #64748b;
    }

    /* Apps count badge */
    .apps-count-badge {
      background: #EFF6FF;
      color: #2563EB;
      font-size: 11.5px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 12px;
      display: inline-block;
      text-align: center;
    }

    /* Status Pill Badges */
    .status-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 12px;
      display: inline-block;
      white-space: nowrap;
    }

    .status-pill.active { background: #DCFCE7; color: #15803D; }
    .status-pill.in-review { background: #FEF3C7; color: #B45309; }
    .status-pill.closed { background: #F1F5F9; color: #64748B; }
    .status-pill.draft { background: #E2E8F0; color: #475569; }

    /* Action Buttons */
    .actions-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .act-btn {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      color: #64748b;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 0.15s;
    }

    .act-btn:hover {
      background: #eff6ff;
      color: var(--primary);
      border-color: #bfdbfe;
    }

    /* Table Footer */
    .table-footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 18px;
      background: #ffffff;
      border-top: 1px solid var(--border);
    }

    .footer-count-text {
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
    }

    .pagination-wrap {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .pg-box {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      font-size: 12px;
      font-weight: 600;
      color: #475569;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }

    .pg-box:hover:not(:disabled) {
      background: #f1f5f9;
      color: var(--primary);
    }

    .pg-box.active {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
    }

    .pg-box:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* ---------------- RIGHT SIDE DETAILS DRAWER ---------------- */
    .details-drawer-side {
      width: 410px;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      overflow: hidden;
      position: sticky;
      top: 90px;
      max-height: calc(100vh - 110px);
      transition: all 0.3s ease;
    }

    .details-drawer-side.collapsed {
      display: none;
    }

    .drawer-top-header {
      padding: 16px 20px 14px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .drawer-top-header h3 {
      font-size: 16px;
      font-weight: 800;
      color: var(--text-main);
    }

    .btn-close-drawer {
      background: transparent;
      border: none;
      font-size: 16px;
      color: #94a3b8;
      cursor: pointer;
      padding: 4px;
      transition: color 0.15s;
    }

    .btn-close-drawer:hover {
      color: var(--text-main);
    }

    .drawer-scroll-body {
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .drawer-scroll-body::-webkit-scrollbar {
      width: 4px;
    }
    .drawer-scroll-body::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }

    /* Company Card inside Drawer */
    .drawer-company-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .drawer-company-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .drawer-company-logo {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
    }

    .drawer-company-meta h4 {
      font-size: 15px;
      font-weight: 800;
      color: var(--text-main);
    }

    .drawer-company-meta span {
      font-size: 12px;
      color: #64748b;
    }

    .drawer-posting-title {
      font-size: 19px;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.25;
    }

    /* Drawer Inner Tabs */
    .drawer-inner-tabs {
      display: flex;
      align-items: center;
      gap: 18px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 2px;
    }

    .drawer-inner-tab {
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      font-size: 13px;
      font-weight: 600;
      color: #64748b;
      padding: 6px 2px 8px;
      cursor: pointer;
      margin-bottom: -1px;
      transition: all 0.15s;
    }

    .drawer-inner-tab:hover {
      color: var(--text-main);
    }

    .drawer-inner-tab.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
      font-weight: 700;
    }

    /* Drawer Content Sections */
    .drawer-section-title {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .drawer-section-title i {
      color: var(--primary);
      font-size: 13px;
    }

    .drawer-desc-p {
      font-size: 12.5px;
      color: #475569;
      line-height: 1.55;
    }

    /* 2x3 Details Grid */
    .drawer-specs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      background: #f8fafc;
      padding: 14px;
      border-radius: 10px;
      border: 1px solid #f1f5f9;
    }

    .spec-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .spec-item i {
      color: #64748b;
      font-size: 14px;
      margin-top: 2px;
      width: 16px;
      text-align: center;
    }

    .spec-meta {
      display: flex;
      flex-direction: column;
    }

    .spec-label {
      font-size: 11px;
      color: #94a3b8;
      font-weight: 600;
    }

    .spec-val {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--text-main);
      margin-top: 1px;
    }

    /* Skills Pill Tags */
    .skills-pill-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .skill-tag {
      background: #eff6ff;
      color: #2563eb;
      font-size: 11.5px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid #dbeafe;
    }

    /* Eligibility list */
    .eligibility-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .eligibility-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 12.5px;
      color: #475569;
      line-height: 1.4;
    }

    .eligibility-item i {
      color: #10b981;
      font-size: 12px;
      margin-top: 3px;
    }

    /* Drawer Actions Footer */
    .drawer-actions-footer {
      padding: 16px 20px;
      border-top: 1px solid var(--border);
      background: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .btn-view-apps-primary {
      width: 100%;
      background: var(--primary);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 11px;
      font-size: 13.5px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
      transition: all 0.2s;
    }

    .btn-view-apps-primary:hover {
      background: var(--primary-hover);
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
    }

    .drawer-bottom-3btn {
      display: grid;
      grid-template-columns: 1fr 1fr 1.3fr;
      gap: 8px;
    }

    .drawer-sec-btn {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 12.5px;
      font-weight: 700;
      color: #475569;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s;
    }

    .drawer-sec-btn:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: var(--primary);
    }

    .drawer-sec-btn.danger {
      color: #ef4444;
      border-color: #fecaca;
    }

    .drawer-sec-btn.danger:hover {
      background: #fef2f2;
      border-color: #fca5a5;
    }

    /* Floating button to reopen drawer if closed */
    .btn-reopen-drawer {
      display: none;
      position: fixed;
      right: 20px;
      bottom: 24px;
      background: var(--primary);
      color: #ffffff;
      border: none;
      border-radius: 30px;
      padding: 10px 18px;
      font-size: 13px;
      font-weight: 700;
      box-shadow: 0 4px 16px rgba(37, 99, 235, 0.35);
      cursor: pointer;
      z-index: 80;
      align-items: center;
      gap: 8px;
    }

    .btn-reopen-drawer.show {
      display: flex;
    }

    /* ---------------- MODALS ---------------- */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.55);
      backdrop-filter: blur(3px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }

    .modal-overlay.show {
      display: flex;
    }

    .modal-card {
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      width: 600px;
      max-width: 95vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: modalFadeIn 0.25s ease;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: translateY(14px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .modal-header {
      padding: 18px 24px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-header h3 {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-main);
    }

    .modal-close-btn {
      background: transparent;
      border: none;
      font-size: 18px;
      color: #94a3b8;
      cursor: pointer;
      transition: color 0.15s;
    }

    .modal-close-btn:hover {
      color: var(--text-main);
    }

    .modal-body {
      padding: 20px 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border);
      background: #f8fafc;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-row-two {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .form-label {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--text-main);
    }

    .form-input, .form-select, .form-textarea {
      width: 100%;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 9px 12px;
      font-size: 13px;
      color: var(--text-main);
      outline: none;
      transition: border 0.15s, box-shadow 0.15s;
    }

    .form-input:focus, .form-select:focus, .form-textarea:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
    }

    .form-textarea {
      resize: vertical;
      min-height: 70px;
    }
  </style>
</head>
<body>

  <!-- SIDEBAR PLACEHOLDER (Synchronized automatically) -->
  <aside class="sidebar" id="adminSidebar">
    <!-- Populated by unify_admin_sidebar.py -->
  </aside>

  <!-- MAIN CONTENT -->
  <main class="main-content">
    <!-- Topbar -->
    <header class="topbar">
      <div class="top-search-wrap">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="globalTopSearch" placeholder="Search students, internships, companies, mentors..." onkeyup="handleGlobalSearch(event)">
      </div>
      <div class="top-right-actions">
        <button class="notification-btn" title="Notifications" onclick="showToast('No new notifications')">
          <i class="fa-regular fa-bell"></i>
          <span class="notif-badge"></span>
        </button>
        <div class="admin-profile-chip" title="Admin Profile">
          <div class="avatar-circle">AD</div>
          <div class="admin-meta">
            <span class="admin-name">Admin</span>
            <span class="admin-role">Super Admin</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Page Body -->
    <div class="page-layout-wrap">
      <!-- Left Main Section -->
      <section class="page-left-main" id="pageLeftMain">
        <!-- Breadcrumbs -->
        <div class="breadcrumb-row">
          <a href="admin-dashboard.html"><i class="fa-solid fa-house"></i> Dashboard</a>
          <span class="sep"><i class="fa-solid fa-chevron-right"></i></span>
          <a href="javascript:void(0)">Companies & Mentors</a>
          <span class="sep"><i class="fa-solid fa-chevron-right"></i></span>
          <span class="breadcrumb-current">Internship Postings</span>
        </div>

        <!-- Page Header -->
        <div class="page-header-row">
          <div class="page-title-block">
            <h1>Internship Postings</h1>
            <p>Manage internship opportunities from partner companies, review applications and track selections.</p>
          </div>
          <div class="header-actions-group">
            <button class="btn-header-secondary" onclick="exportPostingsToCSV()">
              <i class="fa-solid fa-arrow-up-from-bracket"></i> Export
            </button>
            <button class="btn-header-primary" onclick="openCreateModal()">
              <i class="fa-solid fa-plus"></i> Add Internship
            </button>
          </div>
        </div>

        <!-- Sub-Nav Pill Row -->
        <div class="subnav-pill-row">
          <a href="javascript:void(0)" class="subnav-pill" onclick="showToast('Partner Companies directory')">
            <i class="fa-solid fa-building"></i> Companies
          </a>
          <a href="admin-mentors.html" class="subnav-pill">
            <i class="fa-solid fa-chalkboard-user"></i> Mentors
          </a>
          <a href="admin-internships.html" class="subnav-pill active">
            <i class="fa-solid fa-briefcase"></i> Internship Postings
          </a>
          <a href="admin-applications.html" class="subnav-pill">
            <i class="fa-solid fa-file-lines"></i> Applications
          </a>
          <a href="javascript:void(0)" class="subnav-pill" onclick="filterBySelectedTab()">
            <i class="fa-solid fa-user-check"></i> Selections
          </a>
          <a href="javascript:void(0)" class="subnav-pill" onclick="showToast('Internship Tracking dashboard')">
            <i class="fa-solid fa-clock-rotate-left"></i> Internship Tracking
          </a>
        </div>

        <!-- 5 KPI Cards Grid -->
        <div class="kpi-stats-grid">
          <!-- 1. Total Internships -->
          <div class="kpi-card">
            <div class="kpi-icon-box purple">
              <i class="fa-solid fa-briefcase"></i>
            </div>
            <div class="kpi-content">
              <div class="kpi-num-row">
                <span class="kpi-num" id="kpiTotal">42</span>
              </div>
              <span class="kpi-desc">Total Internships</span>
            </div>
          </div>

          <!-- 2. Active -->
          <div class="kpi-card">
            <div class="kpi-icon-box green">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <div class="kpi-content">
              <div class="kpi-num-row">
                <span class="kpi-num" id="kpiActive">18</span>
                <span class="kpi-sub-pill green" id="kpiActivePercent">43%</span>
              </div>
              <span class="kpi-desc">Active</span>
            </div>
          </div>

          <!-- 3. In Review -->
          <div class="kpi-card">
            <div class="kpi-icon-box amber">
              <i class="fa-regular fa-clock"></i>
            </div>
            <div class="kpi-content">
              <div class="kpi-num-row">
                <span class="kpi-num" id="kpiInReview">12</span>
                <span class="kpi-sub-pill amber" id="kpiInReviewPercent">29%</span>
              </div>
              <span class="kpi-desc">In Review</span>
            </div>
          </div>

          <!-- 4. Total Applications -->
          <div class="kpi-card">
            <div class="kpi-icon-box pink">
              <i class="fa-solid fa-users"></i>
            </div>
            <div class="kpi-content">
              <div class="kpi-num-row">
                <span class="kpi-num" id="kpiTotalApps">286</span>
              </div>
              <span class="kpi-desc">Total Applications</span>
            </div>
          </div>

          <!-- 5. Selected Interns -->
          <div class="kpi-card">
            <div class="kpi-icon-box blue">
              <i class="fa-solid fa-handshake"></i>
            </div>
            <div class="kpi-content">
              <div class="kpi-num-row">
                <span class="kpi-num" id="kpiSelected">36</span>
              </div>
              <span class="kpi-desc">Selected Interns</span>
            </div>
          </div>
        </div>

        <!-- Search and Filters Row -->
        <div class="filters-row">
          <div class="search-input-wrap">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="searchInput" placeholder="Search by title, company or skills..." oninput="handleSearch()">
          </div>

          <select class="filter-select" id="companyFilter" onchange="applyFilters()">
            <option value="All Companies">All Companies</option>
            <option value="Amazon">Amazon</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Deloitte">Deloitte</option>
            <option value="TCS">TCS</option>
            <option value="Infosys">Infosys</option>
            <option value="Wipro">Wipro</option>
            <option value="Capgemini">Capgemini</option>
            <option value="HCL">HCL</option>
            <option value="Accenture">Accenture</option>
            <option value="Mindtree">Mindtree</option>
          </select>

          <select class="filter-select" id="domainFilter" onchange="applyFilters()">
            <option value="All Domains">All Domains</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Data Science">Data Science</option>
            <option value="Business Analyst">Business Analyst</option>
            <option value="Python / ML">Python / ML</option>
            <option value="Design (UI/UX)">Design (UI/UX)</option>
            <option value="Cloud / DevOps">Cloud / DevOps</option>
            <option value="Analytics">Analytics</option>
            <option value="AI / ML">AI / ML</option>
          </select>

          <select class="filter-select" id="statusFilter" onchange="applyFilters()">
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="In Review">In Review</option>
            <option value="Closed">Closed</option>
            <option value="Draft">Draft</option>
          </select>

          <button class="date-range-btn" onclick="openDateRangeModal()">
            <i class="fa-regular fa-calendar-days"></i> Select Date Range
          </button>

          <button class="btn-reset" onclick="resetAllFilters()">Reset</button>
        </div>

        <!-- Status Filter Tabs -->
        <div class="status-tabs-row">
          <button class="status-tab active" id="tabAll" onclick="setTab('All Internships')">
            All Internships (42)
          </button>
          <button class="status-tab" id="tabActive" onclick="setTab('Active')">
            Active (18)
          </button>
          <button class="status-tab" id="tabInReview" onclick="setTab('In Review')">
            In Review (12)
          </button>
          <button class="status-tab" id="tabClosed" onclick="setTab('Closed')">
            Closed (10)
          </button>
          <button class="status-tab" id="tabDrafts" onclick="setTab('Draft')">
            Drafts (2)
          </button>
        </div>

        <!-- Table Container -->
        <div class="table-container">
          <table class="postings-table">
            <thead>
              <tr>
                <th class="col-check"><input type="checkbox" id="selectAllCheckbox" onchange="toggleSelectAll(this)"></th>
                <th class="col-num">#</th>
                <th>Internship Title</th>
                <th>Company</th>
                <th>Domain</th>
                <th>Mode</th>
                <th>Duration</th>
                <th>Stipend</th>
                <th>Applications</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="postingsTableBody">
              <!-- Dynamically rendered via renderTable() -->
            </tbody>
          </table>

          <!-- Table Footer -->
          <div class="table-footer-row">
            <span class="footer-count-text" id="showingCountText">Showing 1 to 10 of 42 internships</span>
            <div class="pagination-wrap" id="paginationBar">
              <!-- Rendered via renderPagination() -->
            </div>
          </div>
        </div>
      </section>

      <!-- Right Docked Details Drawer (Selected Internship Details) -->
      <aside class="details-drawer-side" id="detailsDrawer">
        <!-- Top Header -->
        <div class="drawer-top-header">
          <h3>Internship Details</h3>
          <button class="btn-close-drawer" onclick="toggleDrawer(false)" title="Close Panel">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Scrollable Body -->
        <div class="drawer-scroll-body" id="drawerBody">
          <!-- Company Card -->
          <div class="drawer-company-card">
            <div class="drawer-company-left">
              <div class="drawer-company-logo" id="dCompanyLogo">
                <!-- SVG Logo -->
              </div>
              <div class="drawer-company-meta">
                <h4 id="dCompanyName">Amazon</h4>
                <span id="dCompanySub">IT Services | Bengaluru</span>
              </div>
            </div>
            <span class="status-pill active" id="dStatusPill">Active</span>
          </div>

          <!-- Big Title -->
          <h2 class="drawer-posting-title" id="dTitle">Data Analytics Intern</h2>

          <!-- Inner Tabs -->
          <div class="drawer-inner-tabs">
            <button class="drawer-inner-tab active" id="dTabOverview" onclick="setDrawerTab('overview')">Overview</button>
            <button class="drawer-inner-tab" id="dTabApps" onclick="setDrawerTab('apps')">Applications (<span id="dAppsTabCount">48</span>)</button>
            <button class="drawer-inner-tab" id="dTabSelected" onclick="setDrawerTab('selected')">Selected (<span id="dSelectedTabCount">5</span>)</button>
          </div>

          <!-- Tab Content 1: Overview -->
          <div id="drawerTabOverviewContent" style="display:flex; flex-direction:column; gap:18px;">
            <!-- About the Internship -->
            <div>
              <div class="drawer-section-title">
                <i class="fa-regular fa-file-lines"></i> About the Internship
              </div>
              <p class="drawer-desc-p" id="dDescription">
                Work on real business datasets, build interactive dashboards, and support the analytics team with data preparation and reporting.
              </p>
            </div>

            <!-- 2x3 Specs Grid -->
            <div class="drawer-specs-grid">
              <!-- Domain -->
              <div class="spec-item">
                <i class="fa-solid fa-chart-column"></i>
                <div class="spec-meta">
                  <span class="spec-label">Domain</span>
                  <span class="spec-val" id="dDomain">Data Analytics</span>
                </div>
              </div>
              <!-- Duration -->
              <div class="spec-item">
                <i class="fa-regular fa-calendar-days"></i>
                <div class="spec-meta">
                  <span class="spec-label">Duration</span>
                  <span class="spec-val" id="dDuration">6 Months</span>
                </div>
              </div>
              <!-- Mode -->
              <div class="spec-item">
                <i class="fa-solid fa-wifi"></i>
                <div class="spec-meta">
                  <span class="spec-label">Mode</span>
                  <span class="spec-val" id="dMode">Remote</span>
                </div>
              </div>
              <!-- Stipend -->
              <div class="spec-item">
                <i class="fa-solid fa-wallet"></i>
                <div class="spec-meta">
                  <span class="spec-label">Stipend</span>
                  <span class="spec-val" id="dStipend">₹15,000 / month</span>
                </div>
              </div>
              <!-- Openings -->
              <div class="spec-item">
                <i class="fa-solid fa-users"></i>
                <div class="spec-meta">
                  <span class="spec-label">Openings</span>
                  <span class="spec-val" id="dOpenings">10</span>
                </div>
              </div>
              <!-- Application Deadline -->
              <div class="spec-item">
                <i class="fa-regular fa-calendar-check"></i>
                <div class="spec-meta">
                  <span class="spec-label">Application Deadline</span>
                  <span class="spec-val" id="dDeadline">10 Nov 2026</span>
                </div>
              </div>
            </div>

            <!-- Required Skills -->
            <div>
              <div class="drawer-section-title">
                <i class="fa-solid fa-code"></i> Required Skills
              </div>
              <div class="skills-pill-wrap" id="dSkillsWrap">
                <span class="skill-tag">Excel</span>
                <span class="skill-tag">SQL</span>
                <span class="skill-tag">Power BI</span>
                <span class="skill-tag">Python (Basic)</span>
                <span class="skill-tag">Data Visualization</span>
              </div>
            </div>

            <!-- Eligibility -->
            <div>
              <div class="drawer-section-title">
                <i class="fa-solid fa-graduation-cap"></i> Eligibility
              </div>
              <div class="eligibility-list" id="dEligibilityList">
                <div class="eligibility-item">
                  <i class="fa-solid fa-check"></i>
                  <span>Enrolled in Data Analytics / Data Science program</span>
                </div>
                <div class="eligibility-item">
                  <i class="fa-solid fa-check"></i>
                  <span>Basic understanding of data analysis and SQL</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab Content 2: Applications List -->
          <div id="drawerTabAppsContent" style="display:none; flex-direction:column; gap:12px;">
            <div style="font-size:12.5px; font-weight:700; color:#64748b; margin-bottom:4px;">Recent Applicants</div>
            <div id="drawerAppsList" style="display:flex; flex-direction:column; gap:8px;"></div>
          </div>

          <!-- Tab Content 3: Selected List -->
          <div id="drawerTabSelectedContent" style="display:none; flex-direction:column; gap:12px;">
            <div style="font-size:12.5px; font-weight:700; color:#64748b; margin-bottom:4px;">Shortlisted / Selected Candidates</div>
            <div id="drawerSelectedList" style="display:flex; flex-direction:column; gap:8px;"></div>
          </div>
        </div>

        <!-- Drawer Actions Footer -->
        <div class="drawer-actions-footer">
          <button class="btn-view-apps-primary" id="btnViewAppsPrimary" onclick="navigateToApplications()">
            <i class="fa-solid fa-users"></i> View Applications (<span id="dBtnAppsCount">48</span>)
          </button>
          <div class="drawer-bottom-3btn">
            <button class="drawer-sec-btn" onclick="openEditModalFromSelected()">
              <i class="fa-solid fa-pen"></i> Edit
            </button>
            <button class="drawer-sec-btn" onclick="duplicateSelectedPosting()">
              <i class="fa-regular fa-copy"></i> Duplicate
            </button>
            <button class="drawer-sec-btn danger" id="btnToggleClosePosting" onclick="toggleCloseSelectedPosting()">
              <i class="fa-solid fa-ban"></i> Close Internship
            </button>
          </div>
        </div>
      </aside>
    </div>

    <!-- Reopen Drawer Floating Button -->
    <button class="btn-reopen-drawer" id="btnReopenDrawer" onclick="toggleDrawer(true)">
      <i class="fa-solid fa-chevron-left"></i> View Internship Details
    </button>
  </main>

  <!-- ADD / EDIT INTERNSHIP MODAL -->
  <div class="modal-overlay" id="postingModal">
    <div class="modal-card">
      <div class="modal-header">
        <h3 id="modalTitle">Create Internship Posting</h3>
        <button class="modal-close-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form id="postingForm" onsubmit="handlePostingFormSubmit(event)">
        <div class="modal-body">
          <input type="hidden" id="formPostingId">
          <div class="form-group">
            <label class="form-label">Internship Title</label>
            <input type="text" class="form-input" id="formTitle" placeholder="e.g. Data Analytics Intern" required>
          </div>

          <div class="form-row-two">
            <div class="form-group">
              <label class="form-label">Company Name</label>
              <select class="form-select" id="formCompany" onchange="autoFillCompanyMeta()">
                <option value="Amazon">Amazon</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Deloitte">Deloitte</option>
                <option value="TCS">TCS</option>
                <option value="Infosys">Infosys</option>
                <option value="Wipro">Wipro</option>
                <option value="Capgemini">Capgemini</option>
                <option value="HCL">HCL</option>
                <option value="Accenture">Accenture</option>
                <option value="Mindtree">Mindtree</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Domain</label>
              <select class="form-select" id="formDomain">
                <option value="Data Analytics">Data Analytics</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Data Science">Data Science</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Python / ML">Python / ML</option>
                <option value="Design (UI/UX)">Design (UI/UX)</option>
                <option value="Cloud / DevOps">Cloud / DevOps</option>
                <option value="Analytics">Analytics</option>
                <option value="AI / ML">AI / ML</option>
              </select>
            </div>
          </div>

          <div class="form-row-two">
            <div class="form-group">
              <label class="form-label">Industry & Location</label>
              <input type="text" class="form-input" id="formCompanyIndustryLocation" placeholder="e.g. IT Services | Bengaluru" required>
            </div>
            <div class="form-group">
              <label class="form-label">Work Mode</label>
              <select class="form-select" id="formMode">
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          <div class="form-row-two">
            <div class="form-group">
              <label class="form-label">Duration</label>
              <select class="form-select" id="formDuration">
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Month">1 Month</option>
                <option value="2 Months">2 Months</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Monthly Stipend</label>
              <input type="text" class="form-input" id="formStipend" placeholder="e.g. ₹15,000" required>
            </div>
          </div>

          <div class="form-row-two">
            <div class="form-group">
              <label class="form-label">Openings</label>
              <input type="number" class="form-input" id="formOpenings" value="5" min="1" required>
            </div>
            <div class="form-group">
              <label class="form-label">Application Deadline</label>
              <input type="text" class="form-input" id="formDeadline" placeholder="e.g. 10 Nov 2026" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Status</label>
            <select class="form-select" id="formStatus">
              <option value="Active">Active</option>
              <option value="In Review">In Review</option>
              <option value="Closed">Closed</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">About the Internship</label>
            <textarea class="form-textarea" id="formDescription" placeholder="Provide overview of duties and project responsibilities..."></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Required Skills (comma separated)</label>
            <input type="text" class="form-input" id="formSkills" placeholder="e.g. Excel, SQL, Power BI, Python">
          </div>

          <div class="form-group">
            <label class="form-label">Eligibility Criteria (one per line)</label>
            <textarea class="form-textarea" id="formEligibility" placeholder="Enrolled in program...&#10;Basic knowledge of..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-header-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn-header-primary" id="btnSubmitForm">Save Internship</button>
        </div>
      </form>
    </div>
  </div>

  <!-- DATE RANGE MODAL -->
  <div class="modal-overlay" id="dateRangeModal">
    <div class="modal-card" style="width:420px;">
      <div class="modal-header">
        <h3>Select Date Range</h3>
        <button class="modal-close-btn" onclick="closeDateModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Start Date</label>
          <input type="date" class="form-input" id="dateStart">
        </div>
        <div class="form-group">
          <label class="form-label">End Date</label>
          <input type="date" class="form-input" id="dateEnd">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-header-secondary" onclick="closeDateModal()">Cancel</button>
        <button class="btn-header-primary" onclick="applyDateRange()">Apply Range</button>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION -->
  <div class="toast-msg" id="toastMsg">
    <i class="fa-solid fa-circle-check"></i>
    <span id="toastText">Action successful!</span>
  </div>

  <script>
    // Global State
    let currentTab = 'All Internships';
    let currentPage = 1;
    const limitPerPage = 10;
    let allPostings = [];
    let selectedPostingId = null;

    // Company Logo SVG Mapping
    function getCompanyLogoSvg(company) {
      const c = (company || '').toLowerCase();
      if (c.includes('amazon')) {
        return `<svg viewBox="0 0 100 32" width="36" height="18"><path fill="#FF9900" d="M12.5 24.5c9.2 4.1 22.3 4.8 33.1.2.5-.2 1 .3.6.7-3.1 3.2-12.8 5.7-22 5.7-9.5 0-18.1-3.2-22.3-6.1-.4-.3-.1-.9.4-.8.7.2 9.2.3 10.2.3z"/><path fill="#FF9900" d="M46.7 20.8c-.4-.5-2.6-.2-3.6 0-.3 0-.3-.3 0-.5 1.8-1.3 4.8-1.4 5.3-.8.5.6.1 3.6-1.5 5.1-.3.2-.5.1-.4-.2.4-.9.6-3.1.2-3.6z"/><text x="4" y="16" font-family="'Plus Jakarta Sans',sans-serif" font-weight="900" font-size="16" fill="#111827">amazon</text></svg>`;
      } else if (c.includes('microsoft')) {
        return `<svg viewBox="0 0 24 24" width="18" height="18"><rect x="1" y="1" width="10" height="10" fill="#F25022"/><rect x="13" y="1" width="10" height="10" fill="#7FBA00"/><rect x="1" y="13" width="10" height="10" fill="#00A4EF"/><rect x="13" y="13" width="10" height="10" fill="#FFB900"/></svg>`;
      } else if (c.includes('deloitte')) {
        return `<span style="font-weight:900;font-size:15px;color:#000;letter-spacing:-0.5px;line-height:1;">D<span style="color:#86BC25;">.</span></span>`;
      } else if (c.includes('tcs')) {
        return `<span style="font-weight:900;font-size:13px;color:#E91E63;letter-spacing:-0.5px;">tcs</span>`;
      } else if (c.includes('infosys')) {
        return `<span style="font-weight:800;font-size:12px;color:#007CC3;">Infosys</span>`;
      } else if (c.includes('wipro')) {
        return `<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" stroke-width="2"/><circle cx="8" cy="10" r="2.5" fill="#EF4444"/><circle cx="15" cy="10" r="2.5" fill="#F59E0B"/><circle cx="12" cy="15" r="2.5" fill="#10B981"/></svg>`;
      } else if (c.includes('capgemini')) {
        return `<svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 2C7 6 4 10 4 14a8 8 0 0 0 16 0c0-4-3-8-8-12z" fill="#0070AD"/><circle cx="12" cy="14" r="3" fill="#ffffff"/></svg>`;
      } else if (c.includes('hcl')) {
        return `<span style="font-weight:900;font-size:12.5px;color:#005691;letter-spacing:0.5px;">HCL</span>`;
      } else if (c.includes('accenture')) {
        return `<span style="font-weight:900;font-size:16px;color:#A100FF;line-height:1;">&gt;</span>`;
      } else if (c.includes('mindtree')) {
        return `<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="8" fill="#E11D48"/><path d="M12 4a8 8 0 0 1 8 8h-4a4 4 0 0 0-4-4V4z" fill="#ffffff"/></svg>`;
      }
      return `<i class="fa-solid fa-building" style="color:#64748b; font-size:13px;"></i>`;
    }

    // Domain Class Helper
    function getDomainClass(domain) {
      const d = (domain || '').toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '-');
      return d || 'data-analytics';
    }

    // Mode Icon Helper
    function getModeIcon(mode) {
      if (mode === 'Remote') return '<i class="fa-solid fa-wifi"></i> Remote';
      if (mode === 'Hybrid') return '<i class="fa-solid fa-building"></i> Hybrid';
      return '<i class="fa-solid fa-location-dot"></i> On-site';
    }

    // Status Class Helper
    function getStatusClass(status) {
      if (status === 'Active') return 'active';
      if (status === 'In Review') return 'in-review';
      if (status === 'Closed') return 'closed';
      return 'draft';
    }

    // Fetch and Load Postings
    async function fetchPostings() {
      try {
        const searchVal = document.getElementById('searchInput').value.trim();
        const companyVal = document.getElementById('companyFilter').value;
        const domainVal = document.getElementById('domainFilter').value;
        const statusVal = document.getElementById('statusFilter').value;

        let queryStatus = statusVal;
        if (currentTab !== 'All Internships' && statusVal === 'All Status') {
          queryStatus = currentTab;
        }

        const params = new URLSearchParams({
          page: currentPage,
          limit: limitPerPage
        });

        if (searchVal) params.append('search', searchVal);
        if (companyVal && companyVal !== 'All Companies') params.append('company', companyVal);
        if (domainVal && domainVal !== 'All Domains') params.append('domain', domainVal);
        if (queryStatus && queryStatus !== 'All Status' && queryStatus !== 'All Internships') params.append('status', queryStatus);

        const res = await fetch(`/api/admin/internship-postings?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          updateKPIs(data.kpis);
          allPostings = data.postings;
          renderTable(data.postings, data.pagination);
          renderPagination(data.pagination);

          // Select first item by default if nothing selected or currently selected not in view
          if (!selectedPostingId && allPostings.length > 0) {
            selectPosting(allPostings[0]._id);
          } else if (selectedPostingId) {
            const found = allPostings.find(p => p._id === selectedPostingId);
            if (found) renderDetailsDrawer(found);
          }
        }
      } catch (err) {
        console.error('Fetch postings error:', err);
      }
    }

    // Update KPI UI
    function updateKPIs(kpis) {
      if (!kpis) return;
      document.getElementById('kpiTotal').innerText = kpis.total || 42;
      document.getElementById('kpiActive').innerText = kpis.active || 18;
      document.getElementById('kpiActivePercent').innerText = `${kpis.activePercent || 43}%`;
      document.getElementById('kpiInReview').innerText = kpis.inReview || 12;
      document.getElementById('kpiInReviewPercent').innerText = `${kpis.inReviewPercent || 29}%`;
      document.getElementById('kpiTotalApps').innerText = kpis.totalApplications || 286;
      document.getElementById('kpiSelected').innerText = kpis.selectedInterns || 36;

      // Update tab badge numbers
      document.getElementById('tabAll').innerText = `All Internships (${kpis.total || 42})`;
      document.getElementById('tabActive').innerText = `Active (${kpis.active || 18})`;
      document.getElementById('tabInReview').innerText = `In Review (${kpis.inReview || 12})`;
      document.getElementById('tabClosed').innerText = `Closed (${kpis.closed || 10})`;
      document.getElementById('tabDrafts').innerText = `Drafts (${kpis.drafts || 2})`;
    }

    // Render Table
    function renderTable(postings, pagination) {
      const tbody = document.getElementById('postingsTableBody');
      if (!postings || postings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding:36px; color:#64748b;">No internship postings match your filters.</td></tr>`;
        document.getElementById('showingCountText').innerText = `Showing 0 to 0 of 0 internships`;
        return;
      }

      const startIndex = (pagination.page - 1) * pagination.limit + 1;
      const endIndex = Math.min(startIndex + postings.length - 1, pagination.totalItems);
      document.getElementById('showingCountText').innerText = `Showing ${startIndex} to ${endIndex} of ${pagination.totalItems} internships`;

      tbody.innerHTML = postings.map((p, idx) => {
        const rowNum = (p.order !== undefined) ? p.order : (startIndex + idx);
        const isSelected = (p._id === selectedPostingId) ? ' selected-row' : '';
        const domainClass = getDomainClass(p.domain);
        const statusClass = getStatusClass(p.status);
        const modeHtml = getModeIcon(p.mode);
        const logoSvg = getCompanyLogoSvg(p.company);

        return `
          <tr class="${isSelected}" id="row-${p._id}" onclick="selectPosting('${p._id}')">
            <td class="col-check" onclick="event.stopPropagation()">
              <input type="checkbox" class="row-checkbox" value="${p._id}">
            </td>
            <td class="col-num">${rowNum}</td>
            <td class="posting-title-cell">${p.title}</td>
            <td>
              <div class="company-cell">
                <span class="company-logo-badge">${logoSvg}</span>
                <span>${p.company}</span>
              </div>
            </td>
            <td><span class="domain-badge ${domainClass}">${p.domain}</span></td>
            <td><div class="mode-cell">${modeHtml}</div></td>
            <td style="color:#475569; font-weight:500;">${p.duration}</td>
            <td style="font-weight:700; color:#0f172a;">${p.stipend}</td>
            <td><span class="apps-count-badge">${p.applicationsCount}</span></td>
            <td><span class="status-pill ${statusClass}">${p.status}</span></td>
            <td onclick="event.stopPropagation()">
              <div class="actions-wrap">
                <button class="act-btn" title="View Details" onclick="selectPosting('${p._id}')">
                  <i class="fa-regular fa-eye"></i>
                </button>
                <button class="act-btn" title="Edit Posting" onclick="openEditModalById('${p._id}')">
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button class="act-btn" title="More Actions" onclick="showRowMoreMenu('${p._id}', event)">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Render Pagination
    function renderPagination(pagination) {
      const container = document.getElementById('paginationBar');
      if (!pagination || pagination.totalPages <= 1) {
        container.innerHTML = '';
        return;
      }

      const { page, totalPages } = pagination;
      let html = '';

      // Prev Button
      html += `<button class="pg-box" onclick="changePage(${page - 1})" ${page <= 1 ? 'disabled' : ''}><i class="fa-solid fa-chevron-left" style="font-size:10px;"></i></button>`;

      // Page numbers
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
          html += `<button class="pg-box ${i === page ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        } else if (i === page - 2 || i === page + 2) {
          html += `<span style="padding:0 4px; color:#94a3b8; font-size:12px;">...</span>`;
        }
      }

      // Next Button
      html += `<button class="pg-box" onclick="changePage(${page + 1})" ${page >= totalPages ? 'disabled' : ''}><i class="fa-solid fa-chevron-right" style="font-size:10px;"></i></button>`;

      container.innerHTML = html;
    }

    function changePage(p) {
      if (p < 1) return;
      currentPage = p;
      fetchPostings();
    }

    // Select Posting to View in Drawer
    function selectPosting(id) {
      selectedPostingId = id;

      // Update highlighted row in table
      document.querySelectorAll('.postings-table tbody tr').forEach(r => r.classList.remove('selected-row'));
      const activeRow = document.getElementById(`row-${id}`);
      if (activeRow) activeRow.classList.add('selected-row');

      // Make sure drawer is open
      toggleDrawer(true);

      const found = allPostings.find(p => p._id === id);
      if (found) {
        renderDetailsDrawer(found);
      } else {
        // Fetch single if not in current page
        fetch(`/api/admin/internship-postings/${id}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.posting) renderDetailsDrawer(data.posting);
          });
      }
    }

    // Render Details in Drawer
    function renderDetailsDrawer(p) {
      document.getElementById('dCompanyLogo').innerHTML = getCompanyLogoSvg(p.company);
      document.getElementById('dCompanyName').innerText = p.company;
      document.getElementById('dCompanySub').innerText = `${p.companyIndustry || 'IT Services'} | ${p.location || 'Bengaluru'}`;

      const statusPill = document.getElementById('dStatusPill');
      statusPill.className = `status-pill ${getStatusClass(p.status)}`;
      statusPill.innerText = p.status;

      document.getElementById('dTitle').innerText = p.title;
      document.getElementById('dAppsTabCount').innerText = p.applicationsCount || 0;
      document.getElementById('dSelectedTabCount').innerText = p.selectedCount || 0;
      document.getElementById('dBtnAppsCount').innerText = p.applicationsCount || 0;

      document.getElementById('dDescription').innerText = p.description || 'Hands-on corporate internship program with mentor support and live project deliverables.';
      document.getElementById('dDomain').innerText = p.domain;
      document.getElementById('dDuration').innerText = p.duration;
      document.getElementById('dMode').innerText = p.mode;
      document.getElementById('dStipend').innerText = `${p.stipend} / month`;
      document.getElementById('dOpenings').innerText = p.openings || 5;
      document.getElementById('dDeadline').innerText = p.deadline || '10 Nov 2026';

      // Required Skills tags
      const skillsWrap = document.getElementById('dSkillsWrap');
      if (p.skills && p.skills.length > 0) {
        skillsWrap.innerHTML = p.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
      } else {
        skillsWrap.innerHTML = `<span class="skill-tag">General Analytics</span><span class="skill-tag">Problem Solving</span>`;
      }

      // Eligibility
      const eligList = document.getElementById('dEligibilityList');
      if (p.eligibility && p.eligibility.length > 0) {
        eligList.innerHTML = p.eligibility.map(e => `
          <div class="eligibility-item">
            <i class="fa-solid fa-check"></i>
            <span>${e}</span>
          </div>
        `).join('');
      } else {
        eligList.innerHTML = `
          <div class="eligibility-item"><i class="fa-solid fa-check"></i><span>Enrolled in domain-relevant study track</span></div>
          <div class="eligibility-item"><i class="fa-solid fa-check"></i><span>Basic understanding of project requirements</span></div>
        `;
      }

      // Toggle Close Button Text
      const btnClose = document.getElementById('btnToggleClosePosting');
      if (p.status === 'Closed') {
        btnClose.innerHTML = `<i class="fa-solid fa-rotate-left"></i> Reopen Internship`;
        btnClose.classList.remove('danger');
      } else {
        btnClose.innerHTML = `<i class="fa-solid fa-ban"></i> Close Internship`;
        btnClose.classList.add('danger');
      }

      // Populate applications sub-list
      renderApplicationsSubList(p);
      renderSelectedSubList(p);
    }

    // Mock Applications Sub-list inside Drawer
    function renderApplicationsSubList(p) {
      const list = document.getElementById('drawerAppsList');
      const mockApplicants = [
        { name: 'Riya Sharma', email: 'riya.s@example.com', applied: '2 days ago', status: 'Under Review' },
        { name: 'Arjun Mehta', email: 'arjun.m@example.com', applied: '3 days ago', status: 'Shortlisted' },
        { name: 'Sneha Patil', email: 'sneha.p@example.com', applied: '4 days ago', status: 'Selected' },
        { name: 'Vikram Malhotra', email: 'vikram.m@example.com', applied: '5 days ago', status: 'Interview' },
        { name: 'Ananya Roy', email: 'ananya.r@example.com', applied: '6 days ago', status: 'Under Review' }
      ];

      list.innerHTML = mockApplicants.map(app => `
        <div style="background:#f8fafc; border:1px solid #f1f5f9; border-radius:8px; padding:10px 12px; display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; flex-direction:column;">
            <span style="font-size:12.5px; font-weight:700; color:#0f172a;">${app.name}</span>
            <span style="font-size:11px; color:#64748b;">${app.email} • ${app.applied}</span>
          </div>
          <span style="font-size:11px; font-weight:700; padding:2px 8px; border-radius:10px; background:${app.status === 'Selected' ? '#dcfce7' : (app.status === 'Shortlisted' ? '#dbeafe' : '#fef3c7')}; color:${app.status === 'Selected' ? '#15803d' : (app.status === 'Shortlisted' ? '#2563eb' : '#b45309')};">${app.status}</span>
        </div>
      `).join('');
    }

    // Mock Selected Sub-list inside Drawer
    function renderSelectedSubList(p) {
      const list = document.getElementById('drawerSelectedList');
      const mockSelected = [
        { name: 'Sneha Patil', email: 'sneha.p@example.com', date: 'Selected on 04 Nov 2026', batch: 'Batch DA-24' },
        { name: 'Rahul Varma', email: 'rahul.v@example.com', date: 'Selected on 02 Nov 2026', batch: 'Batch DA-24' },
        { name: 'Pooja Iyer', email: 'pooja.i@example.com', date: 'Selected on 01 Nov 2026', batch: 'Batch DA-23' }
      ];

      list.innerHTML = mockSelected.map(s => `
        <div style="background:#f8fafc; border:1px solid #f1f5f9; border-radius:8px; padding:10px 12px; display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; flex-direction:column;">
            <span style="font-size:12.5px; font-weight:700; color:#0f172a;">${s.name}</span>
            <span style="font-size:11px; color:#64748b;">${s.email} • ${s.batch}</span>
          </div>
          <span style="font-size:11px; font-weight:700; color:#15803d; background:#dcfce7; padding:2px 8px; border-radius:10px;"><i class="fa-solid fa-check"></i> Offer Accepted</span>
        </div>
      `).join('');
    }

    // Drawer Tabs switching
    function setDrawerTab(tab) {
      document.getElementById('dTabOverview').classList.toggle('active', tab === 'overview');
      document.getElementById('dTabApps').classList.toggle('active', tab === 'apps');
      document.getElementById('dTabSelected').classList.toggle('active', tab === 'selected');

      document.getElementById('drawerTabOverviewContent').style.display = tab === 'overview' ? 'flex' : 'none';
      document.getElementById('drawerTabAppsContent').style.display = tab === 'apps' ? 'flex' : 'none';
      document.getElementById('drawerTabSelectedContent').style.display = tab === 'selected' ? 'flex' : 'none';
    }

    // Toggle Drawer visibility
    function toggleDrawer(show) {
      const drawer = document.getElementById('detailsDrawer');
      const reopenBtn = document.getElementById('btnReopenDrawer');
      if (show) {
        drawer.classList.remove('collapsed');
        reopenBtn.classList.remove('show');
      } else {
        drawer.classList.add('collapsed');
        reopenBtn.classList.add('show');
      }
    }

    // Filter Tab Switching
    function setTab(tabName) {
      currentTab = tabName;
      document.querySelectorAll('.status-tab').forEach(b => b.classList.remove('active'));

      if (tabName === 'All Internships') document.getElementById('tabAll').classList.add('active');
      else if (tabName === 'Active') document.getElementById('tabActive').classList.add('active');
      else if (tabName === 'In Review') document.getElementById('tabInReview').classList.add('active');
      else if (tabName === 'Closed') document.getElementById('tabClosed').classList.add('active');
      else if (tabName === 'Draft') document.getElementById('tabDrafts').classList.add('active');

      // Reset status dropdown to All Status when tab is clicked
      document.getElementById('statusFilter').value = 'All Status';
      currentPage = 1;
      fetchPostings();
    }

    // Search and Dropdown Filter Trigger
    let searchTimeout = null;
    function handleSearch() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentPage = 1;
        fetchPostings();
      }, 250);
    }

    function applyFilters() {
      currentPage = 1;
      fetchPostings();
    }

    function resetAllFilters() {
      document.getElementById('searchInput').value = '';
      document.getElementById('companyFilter').value = 'All Companies';
      document.getElementById('domainFilter').value = 'All Domains';
      document.getElementById('statusFilter').value = 'All Status';
      setTab('All Internships');
    }

    function filterBySelectedTab() {
      showToast('Filtering selected interns across corporate programs...');
      setDrawerTab('selected');
    }

    // Modal Create / Edit
    function openCreateModal() {
      document.getElementById('modalTitle').innerText = 'Create Internship Posting';
      document.getElementById('btnSubmitForm').innerText = 'Save Internship';
      document.getElementById('formPostingId').value = '';
      document.getElementById('formTitle').value = '';
      document.getElementById('formCompany').value = 'Amazon';
      document.getElementById('formDomain').value = 'Data Analytics';
      document.getElementById('formCompanyIndustryLocation').value = 'IT Services | Bengaluru';
      document.getElementById('formMode').value = 'Remote';
      document.getElementById('formDuration').value = '6 Months';
      document.getElementById('formStipend').value = '₹15,000';
      document.getElementById('formOpenings').value = '5';
      document.getElementById('formDeadline').value = '30 Nov 2026';
      document.getElementById('formStatus').value = 'Active';
      document.getElementById('formDescription').value = '';
      document.getElementById('formSkills').value = '';
      document.getElementById('formEligibility').value = '';

      document.getElementById('postingModal').classList.add('show');
    }

    function openEditModalById(id) {
      const p = allPostings.find(item => item._id === id);
      if (!p) return;

      document.getElementById('modalTitle').innerText = 'Edit Internship Posting';
      document.getElementById('btnSubmitForm').innerText = 'Update Internship';
      document.getElementById('formPostingId').value = p._id;
      document.getElementById('formTitle').value = p.title || '';
      document.getElementById('formCompany').value = p.company || 'Amazon';
      document.getElementById('formDomain').value = p.domain || 'Data Analytics';
      document.getElementById('formCompanyIndustryLocation').value = `${p.companyIndustry || 'IT Services'} | ${p.location || 'Bengaluru'}`;
      document.getElementById('formMode').value = p.mode || 'Remote';
      document.getElementById('formDuration').value = p.duration || '6 Months';
      document.getElementById('formStipend').value = p.stipend || '₹15,000';
      document.getElementById('formOpenings').value = p.openings || 5;
      document.getElementById('formDeadline').value = p.deadline || '10 Nov 2026';
      document.getElementById('formStatus').value = p.status || 'Active';
      document.getElementById('formDescription').value = p.description || '';
      document.getElementById('formSkills').value = (p.skills || []).join(', ');
      document.getElementById('formEligibility').value = (p.eligibility || []).join('\\n');

      document.getElementById('postingModal').classList.add('show');
    }

    function openEditModalFromSelected() {
      if (selectedPostingId) openEditModalById(selectedPostingId);
    }

    function closeModal() {
      document.getElementById('postingModal').classList.remove('show');
    }

    // Auto-fill industry & location on company change
    function autoFillCompanyMeta() {
      const comp = document.getElementById('formCompany').value;
      const metaMap = {
        'Amazon': 'IT Services | Bengaluru',
        'Microsoft': 'Technology | Hyderabad',
        'Deloitte': 'Consulting | Mumbai',
        'TCS': 'IT Services | Pune',
        'Infosys': 'IT Services | Bengaluru',
        'Wipro': 'IT Services | Chennai',
        'Capgemini': 'IT Consulting | Noida',
        'HCL': 'IT Services | Noida',
        'Accenture': 'Consulting | Gurugram',
        'Mindtree': 'Technology | Bengaluru'
      };
      if (metaMap[comp]) {
        document.getElementById('formCompanyIndustryLocation').value = metaMap[comp];
      }
    }

    // Form Submit Handler
    async function handlePostingFormSubmit(e) {
      e.preventDefault();
      const id = document.getElementById('formPostingId').value;
      const parts = document.getElementById('formCompanyIndustryLocation').value.split('|');
      const companyIndustry = parts[0] ? parts[0].trim() : 'IT Services';
      const location = parts[1] ? parts[1].trim() : 'Bengaluru';

      const payload = {
        title: document.getElementById('formTitle').value.trim(),
        company: document.getElementById('formCompany').value,
        companyIndustry,
        location,
        domain: document.getElementById('formDomain').value,
        mode: document.getElementById('formMode').value,
        duration: document.getElementById('formDuration').value,
        stipend: document.getElementById('formStipend').value.trim(),
        openings: parseInt(document.getElementById('formOpenings').value, 10) || 5,
        deadline: document.getElementById('formDeadline').value.trim(),
        status: document.getElementById('formStatus').value,
        description: document.getElementById('formDescription').value.trim(),
        skills: document.getElementById('formSkills').value.split(',').map(s => s.trim()).filter(Boolean),
        eligibility: document.getElementById('formEligibility').value.split('\\n').map(s => s.trim()).filter(Boolean)
      };

      try {
        let res;
        if (id) {
          res = await fetch(`/api/admin/internship-postings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } else {
          res = await fetch('/api/admin/internship-postings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }

        const data = await res.json();
        if (data.success) {
          closeModal();
          showToast(id ? 'Internship posting updated!' : 'New internship posting created!');
          fetchPostings();
        } else {
          showToast(data.message || 'Error saving posting');
        }
      } catch (err) {
        console.error('Submit error:', err);
        showToast('Server connection error');
      }
    }

    // Duplicate Selected Posting
    async function duplicateSelectedPosting() {
      if (!selectedPostingId) return;
      try {
        const res = await fetch(`/api/admin/internship-postings/${selectedPostingId}/duplicate`, {
          method: 'POST'
        });
        const data = await res.json();
        if (data.success) {
          showToast('Internship duplicated successfully!');
          fetchPostings();
        } else {
          showToast(data.message || 'Duplicate error');
        }
      } catch (err) {
        showToast('Server error during duplication');
      }
    }

    // Toggle Close / Reopen Posting
    async function toggleCloseSelectedPosting() {
      if (!selectedPostingId) return;
      const current = allPostings.find(p => p._id === selectedPostingId);
      const newStatus = (current && current.status === 'Closed') ? 'Active' : 'Closed';

      try {
        const res = await fetch(`/api/admin/internship-postings/${selectedPostingId}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        const data = await res.json();
        if (data.success) {
          showToast(`Internship marked as ${newStatus}!`);
          fetchPostings();
        }
      } catch (err) {
        showToast('Server error updating status');
      }
    }

    // Navigate to Applications
    function navigateToApplications() {
      const p = allPostings.find(item => item._id === selectedPostingId);
      const title = p ? encodeURIComponent(p.title) : '';
      window.location.href = `admin-applications.html?internship=${title}`;
    }

    // Row More Menu Dropdown
    function showRowMoreMenu(id, e) {
      e.stopPropagation();
      const p = allPostings.find(item => item._id === id);
      if (!p) return;

      const act = confirm(`Internship: "${p.title}"\\n\\nClick OK to Duplicate, or Cancel to Delete.`);
      if (act) {
        fetch(`/api/admin/internship-postings/${id}/duplicate`, { method: 'POST' })
          .then(r => r.json())
          .then(data => {
            showToast('Posting duplicated!');
            fetchPostings();
          });
      }
    }

    // Export Postings to CSV
    function exportPostingsToCSV() {
      if (!allPostings || allPostings.length === 0) {
        showToast('No postings to export');
        return;
      }
      let csv = 'ID,Order,Title,Company,Domain,Mode,Duration,Stipend,Applications,Selected,Status,Deadline\\n';
      allPostings.forEach(p => {
        csv += `"${p._id}","${p.order}","${p.title}","${p.company}","${p.domain}","${p.mode}","${p.duration}","${p.stipend}","${p.applicationsCount}","${p.selectedCount}","${p.status}","${p.deadline}"\\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edurup-internship-postings-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      showToast('Exported internship postings to CSV!');
    }

    // Date Range Modal
    function openDateRangeModal() {
      document.getElementById('dateRangeModal').classList.add('show');
    }
    function closeDateModal() {
      document.getElementById('dateRangeModal').classList.remove('show');
    }
    function applyDateRange() {
      const s = document.getElementById('dateStart').value;
      const e = document.getElementById('dateEnd').value;
      closeDateModal();
      showToast(`Filtered date range: ${s || 'Start'} to ${e || 'End'}`);
    }

    // Select all checkboxes
    function toggleSelectAll(cb) {
      document.querySelectorAll('.row-checkbox').forEach(box => {
        box.checked = cb.checked;
      });
    }

    // Global Top Search
    function handleGlobalSearch(e) {
      if (e.key === 'Enter') {
        document.getElementById('searchInput').value = e.target.value;
        handleSearch();
      }
    }

    // Toast message trigger
    function showToast(msg) {
      const toast = document.getElementById('toastMsg');
      document.getElementById('toastText').innerText = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    // Initial Load
    document.addEventListener('DOMContentLoaded', () => {
      fetchPostings();
    });
  </script>
</body>
</html>
"""

with open('/Users/riyasingh/Downloads/production_site/admin-internships.html', 'w') as f:
    f.write(HTML_CONTENT)

print("Created admin-internships.html successfully!")
