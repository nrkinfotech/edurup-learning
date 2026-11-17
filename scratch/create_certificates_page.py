import os

HTML_CONTENT = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certificates | Certificates & LOR | Edurup Learning</title>
  <link rel="icon" type="image/png" href="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Great+Vibes&display=swap" rel="stylesheet">
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
      --warning: #F59E0B;
      --warning-light: #FFFBEB;
      --danger: #EF4444;
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

    /* ---------------- MAIN WRAPPER ---------------- */
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
    }

    .admin-chip-role {
      font-size: 11px;
      color: var(--text-muted);
    }

    /* Page Container */
    .page-container {
      padding: 24px 32px 48px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 1700px;
      width: 100%;
      margin: 0 auto;
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
      gap: 16px;
      flex-wrap: wrap;
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

    .btn-header-primary {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      background: var(--primary);
      border: none;
      border-radius: 8px;
      color: #ffffff;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);
      transition: all 0.15s ease;
    }

    .btn-header-primary:hover {
      background: var(--primary-hover);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
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
      padding: 8px 18px;
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

    /* ---------------- 5 KPI STAT CARDS ---------------- */
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
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      transition: transform 0.15s, box-shadow 0.15s;
    }

    .kpi-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
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
      background: #F5F3FF;
      color: #8B5CF6;
    }

    .kpi-icon-box.green {
      background: #ECFDF5;
      color: #10B981;
    }

    .kpi-icon-box.blue {
      background: #EFF6FF;
      color: #2563EB;
    }

    .kpi-icon-box.amber {
      background: #FFFBEB;
      color: #F59E0B;
    }

    .kpi-icon-box.red {
      background: #FEF2F2;
      color: #EF4444;
    }

    .kpi-content {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
    }

    .kpi-val {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.1;
    }

    .kpi-label {
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 500;
      white-space: nowrap;
    }

    .kpi-trend-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 10px;
      background: #DCFCE7;
      color: #15803D;
      display: inline-block;
      margin-top: 4px;
      width: fit-content;
    }

    /* ---------------- MIDDLE ROW: 3 CARDS ---------------- */
    .middle-analytics-grid {
      display: grid;
      grid-template-columns: 1.5fr 1.2fr 0.9fr;
      gap: 16px;
    }

    .analytics-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 18px 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-header-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    /* Trend Chart */
    .trend-chart-box {
      width: 100%;
      height: 160px;
      position: relative;
    }

    /* Donut Chart Layout */
    .donut-layout {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      height: 100%;
    }

    .donut-svg-wrap {
      position: relative;
      width: 130px;
      height: 130px;
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

    .donut-center-val {
      font-size: 20px;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1;
    }

    .donut-center-lbl {
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .donut-legend-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    .donut-legend-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
    }

    .donut-legend-label {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #475569;
      font-weight: 500;
    }

    .donut-dot {
      width: 10px;
      height: 10px;
      border-radius: 2px;
    }

    .donut-legend-stat {
      font-weight: 700;
      color: var(--text-main);
    }

    /* Quick Actions */
    .quick-actions-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .quick-act-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 8px;
      color: #334155;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s ease;
    }

    .quick-act-btn:hover {
      background: #eff6ff;
      border-color: #bfdbfe;
      color: var(--primary);
      transform: translateX(2px);
    }

    .quick-act-btn i {
      color: var(--primary);
      font-size: 14px;
      width: 16px;
      text-align: center;
    }

    /* ---------------- FILTER / STATUS ROW ---------------- */
    .filter-status-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    .status-tab-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .status-tab-btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 600;
      border: 1px solid var(--border);
      background: #ffffff;
      color: #475569;
      cursor: pointer;
      transition: all 0.15s;
    }

    .status-tab-btn:hover {
      background: #f8fafc;
      color: var(--text-main);
    }

    .status-tab-btn.active {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
      box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);
    }

    .filter-right-inputs {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .table-search-input {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 14px;
      width: 280px;
      transition: all 0.2s;
    }

    .table-search-input:focus-within {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
    }

    .table-search-input i {
      color: #94a3b8;
      font-size: 13px;
    }

    .table-search-input input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 12.5px;
      color: var(--text-main);
      width: 100%;
    }

    .btn-filter-funnel {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      color: #334155;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }

    .btn-filter-funnel:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }

    /* ---------------- SPLIT VIEW: TABLE + PREVIEW ---------------- */
    .split-content-layout {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 20px;
      align-items: flex-start;
    }

    /* Table Container */
    .table-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .table-scroll-wrapper {
      width: 100%;
      overflow-x: auto;
    }

    table.certs-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 12.5px;
      min-width: 680px;
    }

    table.certs-table thead tr {
      background: #f8fafc;
      border-bottom: 1px solid var(--border);
    }

    table.certs-table th {
      padding: 12px 14px;
      color: #64748b;
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    table.certs-table td {
      padding: 12px 14px;
      border-bottom: 1px solid var(--border-light);
      color: #334155;
      vertical-align: middle;
      transition: background 0.15s;
    }

    table.certs-table tbody tr {
      cursor: pointer;
      transition: background 0.15s;
    }

    table.certs-table tbody tr:hover td {
      background: #f8fafc;
    }

    table.certs-table tbody tr.row-selected td {
      background: #EFF6FF !important;
    }

    table.certs-table tbody tr.row-selected {
      border-left: 3px solid var(--primary);
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
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .student-name {
      font-weight: 700;
      color: #0f172a;
      white-space: nowrap;
    }

    /* Course Badge */
    .course-badge {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 6px;
      background: #F1F5F9;
      color: #475569;
      display: inline-block;
      white-space: nowrap;
    }

    /* Certificate Type Tag */
    .cert-type-tag {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      font-weight: 600;
      white-space: nowrap;
    }

    .cert-type-tag.course {
      color: #2563EB;
    }

    .cert-type-tag.internship {
      color: #10B981;
    }

    .cert-type-tag.experience {
      color: #F59E0B;
    }

    .cert-id-text {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 11.5px;
      font-weight: 600;
      color: #475569;
      white-space: nowrap;
    }

    .status-badge-issued {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 12px;
      background: #DCFCE7;
      color: #15803D;
      display: inline-block;
      white-space: nowrap;
    }

    .actions-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .act-btn {
      width: 26px;
      height: 26px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      color: #64748b;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 11.5px;
      transition: all 0.15s;
    }

    .act-btn:hover {
      background: #f1f5f9;
      color: var(--primary);
    }

    .act-btn.blue {
      color: var(--primary);
    }

    /* Table Footer */
    .table-footer {
      padding: 12px 18px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .footer-page-info {
      font-size: 12px;
      color: var(--text-muted);
    }

    .page-controls {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .page-num-btn {
      min-width: 28px;
      height: 28px;
      padding: 0 6px;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: #ffffff;
      color: #475569;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }

    .page-num-btn:hover {
      background: #f8fafc;
      color: var(--text-main);
    }

    .page-num-btn.active {
      background: var(--primary);
      color: #ffffff;
      border-color: var(--primary);
    }

    /* ---------------- RIGHT: CERTIFICATE PREVIEW CARD ---------------- */
    .preview-card-wrap {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      position: sticky;
      top: 90px;
    }

    .preview-header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .preview-header-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .preview-header-title i {
      color: var(--primary);
    }

    .preview-btn-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-preview-act {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 600;
      border: 1px solid var(--border);
      background: #ffffff;
      color: #334155;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }

    .btn-preview-act:hover {
      background: #f8fafc;
      color: var(--primary);
    }

    /* Actual Rendered Certificate Canvas */
    .certificate-canvas {
      width: 100%;
      background: #ffffff;
      border: 8px double #D4AF37;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      padding: 30px 24px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      background-image: 
        radial-gradient(circle at top left, rgba(212, 175, 55, 0.08), transparent 40%),
        radial-gradient(circle at bottom right, rgba(37, 99, 235, 0.06), transparent 40%);
    }

    /* Ornamental Corners */
    .cert-corner {
      position: absolute;
      width: 24px;
      height: 24px;
      border: 3px solid #D4AF37;
    }
    .cert-corner.top-left { top: 6px; left: 6px; border-right: none; border-bottom: none; }
    .cert-corner.top-right { top: 6px; right: 6px; border-left: none; border-bottom: none; }
    .cert-corner.bottom-left { bottom: 6px; left: 6px; border-right: none; border-top: none; }
    .cert-corner.bottom-right { bottom: 6px; right: 6px; border-left: none; border-top: none; }

    .cert-brand-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .cert-logo-box {
      width: 24px;
      height: 24px;
      background: #2563EB;
      color: #ffffff;
      border-radius: 6px;
      font-weight: 800;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cert-brand-text {
      font-weight: 800;
      color: #0F172A;
      font-size: 14px;
      letter-spacing: -0.01em;
    }

    .cert-title-big {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22px;
      font-weight: 700;
      color: #0F172A;
      margin-top: 4px;
      margin-bottom: 8px;
      letter-spacing: 0.02em;
    }

    .cert-certify-line {
      font-size: 11px;
      color: #64748B;
      font-style: italic;
      margin-bottom: 8px;
    }

    .cert-student-name {
      font-size: 24px;
      font-weight: 800;
      color: #1E40AF;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
      text-transform: capitalize;
    }

    .cert-desc-text {
      font-size: 12px;
      color: #334155;
      max-width: 340px;
      line-height: 1.5;
      margin-bottom: 6px;
    }

    .cert-duration-text {
      font-size: 11px;
      font-weight: 700;
      color: #475569;
      margin-bottom: 24px;
    }

    /* Signatures & Seal */
    .cert-footer-row {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: 0 10px;
      margin-top: 10px;
    }

    .cert-sig-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 100px;
    }

    .cert-sig-script {
      font-family: 'Great Vibes', cursive;
      font-size: 24px;
      color: #1E293B;
      line-height: 1;
      margin-bottom: 4px;
    }

    .cert-sig-name {
      font-size: 11px;
      font-weight: 800;
      color: #0F172A;
      border-top: 1px solid #CBD5E1;
      padding-top: 4px;
      width: 100%;
      text-align: center;
    }

    .cert-sig-role {
      font-size: 9.5px;
      color: #64748B;
    }

    /* Gold Medal Seal */
    .cert-seal-box {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: radial-gradient(circle, #FFE259 0%, #FFA751 100%);
      box-shadow: 0 4px 10px rgba(255, 167, 81, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border: 2px dashed #B8860B;
    }

    .cert-seal-box i {
      color: #7A5200;
      font-size: 20px;
    }

    .cert-ribbon-tail {
      position: absolute;
      bottom: -10px;
      width: 12px;
      height: 16px;
      background: #FFA751;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%);
    }
    .cert-ribbon-tail.left { left: 10px; transform: rotate(-15deg); }
    .cert-ribbon-tail.right { right: 10px; transform: rotate(15deg); }

    /* Verification Badge below cert */
    .preview-verify-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #F8FAFC;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 11px;
      color: #64748B;
    }

    .verify-badge-pill {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #15803D;
      font-weight: 700;
    }

    /* ---------------- MODALS ---------------- */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.5);
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

    .modal-card {
      background: #ffffff;
      border-radius: 14px;
      width: 100%;
      max-width: 580px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      overflow: hidden;
      animation: modalFadeIn 0.2s ease;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-header h3 {
      font-size: 15px;
      font-weight: 800;
      color: var(--text-main);
    }

    .modal-close-btn {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 16px;
      cursor: pointer;
    }

    .modal-body {
      padding: 20px 22px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .modal-footer {
      padding: 14px 22px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      background: #f8fafc;
    }

    .form-group-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .form-label {
      font-size: 11.5px;
      font-weight: 700;
      color: #334155;
    }

    .form-input, .form-select {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 12.5px;
      color: var(--text-main);
      outline: none;
      transition: border 0.15s;
    }

    .form-input:focus, .form-select:focus {
      border-color: var(--primary);
    }

    /* Print styles */
    @media print {
      body * {
        visibility: hidden;
      }
      .certificate-canvas, .certificate-canvas * {
        visibility: visible;
      }
      .certificate-canvas {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        box-shadow: none;
      }
    }

    /* Responsive */
    @media (max-width: 1200px) {
      .kpi-stats-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      .middle-analytics-grid {
        grid-template-columns: 1fr;
      }
      .split-content-layout {
        grid-template-columns: 1fr;
      }
      .preview-card-wrap {
        position: static;
      }
    }

    @media (max-width: 768px) {
      header.topbar {
        padding: 0 16px;
      }
      .page-container {
        padding: 16px;
      }
      .kpi-stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .top-search-wrap {
        width: 220px;
      }
    }
  </style>
</head>
<body>

  <!-- ================= SIDEBAR PLACEHOLDER ================= -->
  <aside class="sidebar" id="adminSidebar">
    <div class="sidebar-header">
      <div class="brand-logo-badge">E</div>
      <div class="brand-info">
        <h2>Edurup Learning</h2>
        <span>Admin Panel</span>
      </div>
    </div>
  </aside>

  <!-- ================= MAIN CONTENT ================= -->
  <main class="main-content">
    
    <!-- Top Bar -->
    <header class="topbar">
      <div class="top-search-wrap">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="globalTopSearch" placeholder="Search students, certificate ID, course..." onkeyup="handleGlobalSearch(event)">
      </div>

      <div class="top-right-actions">
        <button class="notification-btn" title="Notifications" onclick="showToast('No new unread notifications')">
          <i class="fa-regular fa-bell"></i>
          <span class="notif-badge"></span>
        </button>

        <div class="admin-profile-chip" onclick="showToast('Logged in as Super Admin')">
          <div class="admin-avatar-initials">AD</div>
          <div class="admin-chip-info">
            <span class="admin-chip-name">Admin</span>
            <span class="admin-chip-role">Super Admin</span>
          </div>
          <i class="fa-solid fa-chevron-down" style="font-size: 10px; color: #94a3b8; margin-left: 4px;"></i>
        </div>
      </div>
    </header>

    <!-- Page Container -->
    <div class="page-container">
      
      <!-- Breadcrumb -->
      <div class="breadcrumb-row">
        <a href="admin-dashboard.html"><i class="fa-solid fa-house"></i> Dashboard</a>
        <span class="sep">></span>
        <a href="javascript:void(0)">Certificates & LOR</a>
        <span class="sep">></span>
        <span class="breadcrumb-current">Certificates</span>
      </div>

      <!-- Page Header -->
      <div class="page-header-row">
        <div class="page-title-block">
          <h1>Certificates</h1>
          <p>Issue and manage course completion, internship and experience certificates for students.</p>
        </div>

        <button class="btn-header-primary" onclick="openIssueModal()">
          <i class="fa-solid fa-plus"></i> Issue Certificate <i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 2px;"></i>
        </button>
      </div>

      <!-- Subnav Horizontal Pills -->
      <div class="subnav-pill-row">
        <a href="javascript:void(0)" class="subnav-pill active" onclick="filterByCertType('All', this)">
          <i class="fa-solid fa-certificate"></i> All Certificates
        </a>
        <a href="javascript:void(0)" class="subnav-pill" onclick="filterByCertType('Course Certificate', this)">
          <i class="fa-solid fa-graduation-cap"></i> Course Certificates
        </a>
        <a href="javascript:void(0)" class="subnav-pill" onclick="filterByCertType('Internship Certificate', this)">
          <i class="fa-solid fa-briefcase"></i> Internship Certificates
        </a>
        <a href="javascript:void(0)" class="subnav-pill" onclick="filterByCertType('Experience Letter', this)">
          <i class="fa-regular fa-address-card"></i> Experience Letters
        </a>
        <a href="javascript:void(0)" class="subnav-pill" onclick="openBulkIssueModal()">
          <i class="fa-solid fa-layer-group"></i> Bulk Issue
        </a>
      </div>

      <!-- 5 KPI Cards -->
      <div class="kpi-stats-grid">
        <!-- Total Certificates -->
        <div class="kpi-card">
          <div class="kpi-icon-box purple">
            <i class="fa-solid fa-award"></i>
          </div>
          <div class="kpi-content">
            <span class="kpi-val" id="kpiTotal">892</span>
            <span class="kpi-label">Total Certificates</span>
            <span class="kpi-trend-pill">↑ +9%</span>
          </div>
        </div>

        <!-- Course Certificates -->
        <div class="kpi-card">
          <div class="kpi-icon-box green">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <div class="kpi-content">
            <span class="kpi-val" id="kpiCourse">648</span>
            <span class="kpi-label">Course Certificates</span>
          </div>
        </div>

        <!-- Internship Certificates -->
        <div class="kpi-card">
          <div class="kpi-icon-box blue">
            <i class="fa-solid fa-briefcase"></i>
          </div>
          <div class="kpi-content">
            <span class="kpi-val" id="kpiIntern">312</span>
            <span class="kpi-label">Internship Certificates</span>
          </div>
        </div>

        <!-- Experience Letters -->
        <div class="kpi-card">
          <div class="kpi-icon-box amber">
            <i class="fa-solid fa-address-card"></i>
          </div>
          <div class="kpi-content">
            <span class="kpi-val" id="kpiExp">126</span>
            <span class="kpi-label">Experience Letters</span>
          </div>
        </div>

        <!-- Pending Requests -->
        <div class="kpi-card">
          <div class="kpi-icon-box red">
            <i class="fa-regular fa-clock"></i>
          </div>
          <div class="kpi-content">
            <span class="kpi-val" id="kpiPending">34</span>
            <span class="kpi-label">Pending Requests</span>
          </div>
        </div>
      </div>

      <!-- Middle Analytics Row (3 Columns) -->
      <div class="middle-analytics-grid">
        
        <!-- Column 1: Trend Chart -->
        <div class="analytics-card">
          <div class="card-header-title">Certificates Issuance Trend (Last 30 Days)</div>
          <div class="trend-chart-box">
            <svg viewBox="0 0 450 140" style="width: 100%; height: 100%; overflow: visible;">
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.35"/>
                  <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0.0"/>
                </linearGradient>
              </defs>
              <!-- Y Axis Lines & Ticks -->
              <line x1="30" y1="15" x2="430" y2="15" stroke="#f1f5f9" stroke-width="1"/>
              <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="600">50</text>

              <line x1="30" y1="40" x2="430" y2="40" stroke="#f1f5f9" stroke-width="1"/>
              <text x="15" y="43" fill="#94a3b8" font-size="10" font-weight="600">40</text>

              <line x1="30" y1="65" x2="430" y2="65" stroke="#f1f5f9" stroke-width="1"/>
              <text x="15" y="68" fill="#94a3b8" font-size="10" font-weight="600">30</text>

              <line x1="30" y1="90" x2="430" y2="90" stroke="#f1f5f9" stroke-width="1"/>
              <text x="15" y="93" fill="#94a3b8" font-size="10" font-weight="600">20</text>

              <line x1="30" y1="115" x2="430" y2="115" stroke="#f1f5f9" stroke-width="1"/>
              <text x="15" y="118" fill="#94a3b8" font-size="10" font-weight="600">10</text>

              <line x1="30" y1="125" x2="430" y2="125" stroke="#e2e8f0" stroke-width="1"/>
              <text x="20" y="132" fill="#94a3b8" font-size="10" font-weight="600">0</text>

              <!-- Area Fill -->
              <path d="M 40 115 Q 85 90, 110 75 T 160 88 T 210 65 T 260 78 T 320 68 T 370 55 T 415 35 L 415 125 L 40 125 Z" fill="url(#purpleGrad)"/>
              
              <!-- Curve Stroke -->
              <path d="M 40 115 Q 85 90, 110 75 T 160 88 T 210 65 T 260 78 T 320 68 T 370 55 T 415 35" fill="none" stroke="#8B5CF6" stroke-width="2.5" stroke-linecap="round"/>

              <!-- Peak Dot & Badge at Nov 14 (x=415, y=35) -->
              <circle cx="415" cy="35" r="4.5" fill="#8B5CF6" stroke="#ffffff" stroke-width="2"/>
              <rect x="403" y="15" width="24" height="16" rx="4" fill="#8B5CF6"/>
              <text x="415" y="27" fill="#ffffff" font-size="10" font-weight="800" text-anchor="middle">42</text>

              <!-- X Axis Labels -->
              <text x="40" y="138" fill="#94a3b8" font-size="9.5" text-anchor="middle">Oct 16</text>
              <text x="95" y="138" fill="#94a3b8" font-size="9.5" text-anchor="middle">Oct 20</text>
              <text x="150" y="138" fill="#94a3b8" font-size="9.5" text-anchor="middle">Oct 24</text>
              <text x="200" y="138" fill="#94a3b8" font-size="9.5" text-anchor="middle">Oct 28</text>
              <text x="255" y="138" fill="#94a3b8" font-size="9.5" text-anchor="middle">Nov 01</text>
              <text x="310" y="138" fill="#94a3b8" font-size="9.5" text-anchor="middle">Nov 05</text>
              <text x="365" y="138" fill="#94a3b8" font-size="9.5" text-anchor="middle">Nov 09</text>
              <text x="415" y="138" fill="#94a3b8" font-size="9.5" text-anchor="middle">Nov 14</text>
            </svg>
          </div>
        </div>

        <!-- Column 2: Donut Chart -->
        <div class="analytics-card">
          <div class="card-header-title">Certificates by Type</div>
          <div class="donut-layout">
            <div class="donut-svg-wrap">
              <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; transform: rotate(-90deg);">
                <!-- 73% Course (Blue #2563EB) -->
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#2563EB" stroke-width="15" stroke-dasharray="174 238" stroke-dashoffset="0"/>
                <!-- 14% Internship (Green #10B981) -->
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#10B981" stroke-width="15" stroke-dasharray="33 238" stroke-dashoffset="-174"/>
                <!-- 13% Experience (Amber #F59E0B) -->
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F59E0B" stroke-width="15" stroke-dasharray="31 238" stroke-dashoffset="-207"/>
              </svg>
              <div class="donut-center-text">
                <div class="donut-center-val">892</div>
                <div class="donut-center-lbl">Issued</div>
              </div>
            </div>

            <div class="donut-legend-list">
              <div class="donut-legend-item">
                <div class="donut-legend-label">
                  <span class="donut-dot" style="background: #2563EB;"></span>
                  <span>Course Certificate</span>
                </div>
                <span class="donut-legend-stat">73% (648)</span>
              </div>
              <div class="donut-legend-item">
                <div class="donut-legend-label">
                  <span class="donut-dot" style="background: #10B981;"></span>
                  <span>Internship Certificate</span>
                </div>
                <span class="donut-legend-stat">14% (126)</span>
              </div>
              <div class="donut-legend-item">
                <div class="donut-legend-label">
                  <span class="donut-dot" style="background: #F59E0B;"></span>
                  <span>Experience Letter</span>
                </div>
                <span class="donut-legend-stat">13% (118)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 3: Quick Actions -->
        <div class="analytics-card">
          <div class="card-header-title">
            <i class="fa-solid fa-bolt" style="color: #2563eb;"></i> Quick Actions
          </div>
          <div class="quick-actions-list">
            <button class="quick-act-btn" onclick="openIssueModal()">
              <i class="fa-solid fa-plus"></i> Issue Certificate
            </button>
            <button class="quick-act-btn" onclick="openBulkIssueModal()">
              <i class="fa-solid fa-layer-group"></i> Bulk Issue
            </button>
            <button class="quick-act-btn" onclick="openTemplatesModal()">
              <i class="fa-regular fa-file-lines"></i> Manage Templates
            </button>
            <button class="quick-act-btn" onclick="openVerificationModal()">
              <i class="fa-solid fa-shield-halved"></i> Verification Portal
            </button>
          </div>
        </div>

      </div>

      <!-- Filter / Status Row -->
      <div class="filter-status-row">
        <div class="status-tab-group">
          <button class="status-tab-btn active" onclick="filterByStatus('Issued', this)">Issued Certificates</button>
          <button class="status-tab-btn" onclick="filterByStatus('Pending', this)">Pending Requests (34)</button>
          <button class="status-tab-btn" onclick="filterByStatus('Draft', this)">Drafts (12)</button>
        </div>

        <div class="filter-right-inputs">
          <div class="table-search-input">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="certSearchInput" placeholder="Search by student, certificate ID..." oninput="handleSearch()">
          </div>

          <button class="btn-filter-funnel" onclick="openFilterOptions()">
            <i class="fa-solid fa-filter"></i> Filter
          </button>
        </div>
      </div>

      <!-- Split View: Table + Certificate Preview -->
      <div class="split-content-layout">
        
        <!-- Left Table -->
        <div class="table-card">
          <div class="table-scroll-wrapper">
            <table class="certs-table" id="certsTable">
              <thead>
                <tr>
                  <th style="width: 35px;">#</th>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Certificate Type</th>
                  <th>Certificate ID</th>
                  <th>Issue Date</th>
                  <th>Status</th>
                  <th style="text-align: right; width: 85px;">Actions</th>
                </tr>
              </thead>
              <tbody id="certsTableBody">
                <!-- Injected via JS -->
              </tbody>
            </table>
          </div>

          <!-- Table Pagination Footer -->
          <div class="table-footer">
            <span class="footer-page-info" id="paginationInfo">Showing 1 to 5 of 892 certificates</span>
            <div class="page-controls" id="paginationControls">
              <!-- Injected via JS -->
            </div>
          </div>
        </div>

        <!-- Right: Certificate Preview Card -->
        <div class="preview-card-wrap">
          <div class="preview-header-bar">
            <div class="preview-header-title">
              <i class="fa-solid fa-award"></i> Certificate Preview
            </div>
            <div class="preview-btn-group">
              <button class="btn-preview-act" onclick="printCertificate()" title="Print Certificate">
                <i class="fa-solid fa-print"></i> Print / PDF
              </button>
              <button class="btn-preview-act" onclick="shareVerificationLink()" title="Copy Verification Link">
                <i class="fa-solid fa-share-nodes"></i> Share
              </button>
            </div>
          </div>

          <!-- Rendered Authentic Certificate -->
          <div class="certificate-canvas" id="printableCertificate">
            <!-- Ornamental Corners -->
            <div class="cert-corner top-left"></div>
            <div class="cert-corner top-right"></div>
            <div class="cert-corner bottom-left"></div>
            <div class="cert-corner bottom-right"></div>

            <!-- Brand Logo Header -->
            <div class="cert-brand-row">
              <div class="cert-logo-box">E</div>
              <span class="cert-brand-text">Edurup Learning</span>
            </div>

            <!-- Certificate Title -->
            <h2 class="cert-title-big" id="previewCertTitle">Certificate of Completion</h2>
            <p class="cert-certify-line">This is to certify that</p>

            <!-- Student Name -->
            <h1 class="cert-student-name" id="previewStudentName">Ananya Kumar</h1>

            <!-- Completion Body -->
            <p class="cert-desc-text" id="previewDescText">
              has successfully completed the <b>Data Analytics</b> Course
            </p>
            <p class="cert-duration-text" id="previewDurationText">
              Duration: 4 Months
            </p>

            <!-- Signatures & Gold Seal -->
            <div class="cert-footer-row">
              <div class="cert-sig-block">
                <div class="cert-sig-script">Rupesh</div>
                <div class="cert-sig-name">Rupesh Kumar</div>
                <div class="cert-sig-role">Director</div>
              </div>

              <!-- Embossed Gold Seal -->
              <div class="cert-seal-box">
                <i class="fa-solid fa-star"></i>
                <div class="cert-ribbon-tail left"></div>
                <div class="cert-ribbon-tail right"></div>
              </div>

              <div class="cert-sig-block">
                <div class="cert-sig-script">Sirija Devi</div>
                <div class="cert-sig-name">Sirija Devi</div>
                <div class="cert-sig-role">Authorized Signatory</div>
              </div>
            </div>
          </div>

          <!-- Live Verification Pill -->
          <div class="preview-verify-footer">
            <span>ID: <b id="previewCertId">EDU-CC-2026-0891</b></span>
            <div class="verify-badge-pill">
              <i class="fa-solid fa-circle-check"></i> Verified Digital Credential
            </div>
          </div>
        </div>

      </div>

    </div>
  </main>

  <!-- ================= MODALS ================= -->

  <!-- Modal 1: + Issue Certificate -->
  <div class="modal-backdrop" id="modalIssueCert">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Issue New Certificate</h3>
        <button class="modal-close-btn" onclick="closeModal('modalIssueCert')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form id="issueCertForm" onsubmit="handleIssueCertificate(event)">
        <div class="modal-body">
          <div class="form-group-grid-2">
            <div class="form-group">
              <label class="form-label">Student Full Name *</label>
              <input type="text" class="form-input" id="newCertName" required placeholder="e.g. Ananya Kumar">
            </div>
            <div class="form-group">
              <label class="form-label">Student Email *</label>
              <input type="email" class="form-input" id="newCertEmail" required placeholder="student@gmail.com">
            </div>
          </div>

          <div class="form-group-grid-2">
            <div class="form-group">
              <label class="form-label">Course / Specialization *</label>
              <select class="form-select" id="newCertCourse" required>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Data Science">Data Science</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Python Full Stack">Python Full Stack</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="AI/ML & Deep Learning">AI/ML & Deep Learning</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Certificate Type</label>
              <select class="form-select" id="newCertType">
                <option value="Course Certificate">Course Certificate</option>
                <option value="Internship Certificate">Internship Certificate</option>
                <option value="Experience Letter">Experience Letter</option>
              </select>
            </div>
          </div>

          <div class="form-group-grid-2">
            <div class="form-group">
              <label class="form-label">Duration</label>
              <input type="text" class="form-input" id="newCertDuration" value="4 Months">
            </div>
            <div class="form-group">
              <label class="form-label">Grade / Performance</label>
              <input type="text" class="form-input" id="newCertGrade" value="A+">
            </div>
          </div>

          <div class="form-group-grid-2">
            <div class="form-group">
              <label class="form-label">Template Design</label>
              <select class="form-select" id="newCertTemplate">
                <option value="Classic Gold">Classic Gold (Ornamental)</option>
                <option value="Modern Tech Blue">Modern Tech Blue</option>
                <option value="Executive Platinum">Executive Platinum</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Issue Date</label>
              <input type="text" class="form-input" id="newCertDate" value="Nov 14, 2026">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-preview-act" onclick="closeModal('modalIssueCert')">Cancel</button>
          <button type="submit" class="btn-header-primary">Generate & Issue</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal 2: Bulk Issue Modal -->
  <div class="modal-backdrop" id="modalBulkIssue">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Bulk Issue Certificates</h3>
        <button class="modal-close-btn" onclick="closeModal('modalBulkIssue')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form onsubmit="handleBulkIssue(event)">
        <div class="modal-body">
          <p style="font-size: 12.5px; color: #475569;">
            Batch-issue credentials to an entire cohort or student list with verified digital signatures and unique certificate IDs.
          </p>
          <div class="form-group">
            <label class="form-label">Target Batch / Cohort</label>
            <select class="form-select" id="bulkBatchSelect">
              <option value="Data Analytics Nov 2026 Batch">Data Analytics Nov 2026 Batch (28 Students)</option>
              <option value="Full Stack Engineering Cohort 4">Full Stack Engineering Cohort 4 (32 Students)</option>
              <option value="Python & AI/ML Masterclass">Python & AI/ML Masterclass (25 Students)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Certificate Type</label>
            <select class="form-select" id="bulkCertType">
              <option value="Course Certificate">Course Certificate</option>
              <option value="Internship Certificate">Internship Certificate</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Student Names (One per line or comma-separated)</label>
            <textarea class="form-input" id="bulkStudentsList" style="min-height: 80px;" placeholder="Ananya Kumar&#10;Rahul Sharma&#10;Priya Verma&#10;Vikram Kumar&#10;Sneha Murthy"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-preview-act" onclick="closeModal('modalBulkIssue')">Cancel</button>
          <button type="submit" class="btn-header-primary">Issue to Cohort</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal 3: Verification Portal -->
  <div class="modal-backdrop" id="modalVerification">
    <div class="modal-card" style="max-width: 500px;">
      <div class="modal-header">
        <h3>Certificate Verification Portal</h3>
        <button class="modal-close-btn" onclick="closeModal('modalVerification')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <p style="font-size: 12.5px; color: #475569;">
          Enter any Edurup Certificate ID to instantly verify its authenticity against MongoDB credentials registry.
        </p>
        <div class="form-group">
          <label class="form-label">Certificate ID</label>
          <input type="text" class="form-input" id="verifyInputId" placeholder="e.g. EDU-CC-2026-0891" value="EDU-CC-2026-0891">
        </div>
        <button class="btn-header-primary" style="justify-content: center; width: 100%;" onclick="runCertificateVerify()">
          <i class="fa-solid fa-magnifying-glass"></i> Verify Credential
        </button>

        <div id="verifyResultBox" style="display: none; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 14px; margin-top: 10px;">
          <div style="display: flex; align-items: center; gap: 8px; color: #065F46; font-weight: 700; font-size: 13px; margin-bottom: 6px;">
            <i class="fa-solid fa-circle-check" style="color: #10B981;"></i> Credential Authenticated & Valid
          </div>
          <div id="verifyResultDetails" style="font-size: 12px; color: #047857; line-height: 1.5;"></div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-preview-act" onclick="closeModal('modalVerification')">Close</button>
      </div>
    </div>
  </div>

  <!-- Modal 4: Manage Templates -->
  <div class="modal-backdrop" id="modalTemplates">
    <div class="modal-card" style="max-width: 620px;">
      <div class="modal-header">
        <h3>Certificate Design Templates</h3>
        <button class="modal-close-btn" onclick="closeModal('modalTemplates')"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="modal-body">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
          <div style="border: 2px solid #2563EB; border-radius: 8px; padding: 12px; text-align: center; background: #eff6ff;">
            <div style="height: 80px; border: 2px double #D4AF37; background: #fff; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #B8860B;">Classic Gold (Active)</div>
            <span style="font-size: 11px; font-weight: 700; color: #2563EB;">Default Primary</span>
          </div>
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; text-align: center; background: #fff; cursor: pointer;" onclick="showToast('Modern Tech Blue template applied')">
            <div style="height: 80px; border: 2px solid #2563EB; background: #F8FAFC; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #1E40AF;">Modern Tech Blue</div>
            <span style="font-size: 11px; font-weight: 600; color: #64748B;">Select</span>
          </div>
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; text-align: center; background: #fff; cursor: pointer;" onclick="showToast('Executive Platinum template applied')">
            <div style="height: 80px; border: 2px solid #64748B; background: #F8FAFC; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #334155;">Executive Platinum</div>
            <span style="font-size: 11px; font-weight: 600; color: #64748B;">Select</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-preview-act" onclick="closeModal('modalTemplates')">Close</button>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div class="toast-msg" id="toastMsg">
    <i class="fa-solid fa-circle-check" style="color: #22c55e;"></i>
    <span id="toastText">Action successful</span>
  </div>

  <!-- ================= CLIENT JAVASCRIPT ================= -->
  <script>
    let certificates = [];
    let selectedCertId = null;
    let currentCertType = 'All';
    let currentStatus = 'Issued';
    let currentPage = 1;
    let totalPages = 179;
    let totalCount = 892;
    const limit = 5;

    // Helper: Certificate Type Icon
    function getCertTypeIcon(type) {
      if (type === 'Course Certificate') {
        return '<i class="fa-solid fa-graduation-cap"></i>';
      }
      if (type === 'Internship Certificate') {
        return '<i class="fa-solid fa-briefcase"></i>';
      }
      return '<i class="fa-regular fa-address-card"></i>';
    }

    function getCertTypeClass(type) {
      if (type === 'Course Certificate') return 'course';
      if (type === 'Internship Certificate') return 'internship';
      return 'experience';
    }

    // Fetch Certificates from API
    async function fetchCertificates() {
      const search = document.getElementById('certSearchInput').value;
      let url = `/api/admin/certificates?page=${currentPage}&limit=${limit}&status=${currentStatus}`;

      if (currentCertType && currentCertType !== 'All') {
        url += `&certificateType=${encodeURIComponent(currentCertType)}`;
      }
      if (search && search.trim() !== '') {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          certificates = data.certificates;
          totalCount = data.total;
          totalPages = data.totalPages;

          // Update KPI counts if present
          if (data.kpis) {
            document.getElementById('kpiTotal').innerText = data.kpis.totalCertificates;
            document.getElementById('kpiCourse').innerText = data.kpis.courseCertificates;
            document.getElementById('kpiIntern').innerText = data.kpis.internshipCertificates;
            document.getElementById('kpiExp').innerText = data.kpis.experienceLetters;
            document.getElementById('kpiPending').innerText = data.kpis.pendingRequests;
          }

          renderTable();
          renderPagination();

          // Auto-select first row or currently selected
          if (certificates.length > 0) {
            const match = certificates.find(c => c._id === selectedCertId);
            selectCertificateRow(match ? match._id : certificates[0]._id);
          }
        }
      } catch (err) {
        console.error('Fetch Certificates Error:', err);
      }
    }

    // Render Table Rows
    function renderTable() {
      const tbody = document.getElementById('certsTableBody');
      if (!certificates || certificates.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="8" style="text-align:center; padding: 36px; color: #64748b;">
              <i class="fa-solid fa-award" style="font-size: 28px; color: #cbd5e1; margin-bottom: 6px;"></i>
              <p>No certificates found.</p>
            </td>
          </tr>
        `;
        return;
      }

      let html = '';
      certificates.forEach((c, idx) => {
        const isSelected = (c._id === selectedCertId);
        const rowClass = isSelected ? 'row-selected' : '';
        const orderNum = (currentPage - 1) * limit + idx + 1;
        const typeClass = getCertTypeClass(c.certificateType);
        const icon = getCertTypeIcon(c.certificateType);

        html += `
          <tr class="${rowClass}" onclick="selectCertificateRow('${c._id}')">
            <td style="font-weight: 700; color: #64748b;">${orderNum}</td>
            <td>
              <div class="student-cell">
                <div class="student-avatar" style="background: ${c.avatarColor || '#2563EB'};">
                  ${c.avatarInitials || 'ST'}
                </div>
                <span class="student-name">${c.studentName}</span>
              </div>
            </td>
            <td>
              <span class="course-badge">${c.course}</span>
            </td>
            <td>
              <span class="cert-type-tag ${typeClass}">
                ${icon} ${c.certificateType}
              </span>
            </td>
            <td>
              <span class="cert-id-text">${c.certificateId}</span>
            </td>
            <td style="white-space: nowrap; color: #475569; font-weight: 500;">
              ${c.issueDate || 'Nov 14, 2026'}
            </td>
            <td>
              <span class="status-badge-issued">${c.status || 'Issued'}</span>
            </td>
            <td style="text-align: right;" onclick="event.stopPropagation()">
              <div class="actions-wrap" style="justify-content: flex-end;">
                <button class="act-btn blue" title="View Preview" onclick="selectCertificateRow('${c._id}')">
                  <i class="fa-regular fa-eye"></i>
                </button>
                <button class="act-btn" title="Download / Print" onclick="downloadSingleCert('${c.certificateId}')">
                  <i class="fa-solid fa-download"></i>
                </button>
                <button class="act-btn" title="More Options" onclick="openCertOptions('${c._id}')">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      });

      tbody.innerHTML = html;
    }

    // Select Certificate Row & Load into Preview
    function selectCertificateRow(id) {
      selectedCertId = id;
      const cert = certificates.find(c => c._id === id);
      if (!cert) return;

      // Update table highlighted row
      document.querySelectorAll('#certsTableBody tr').forEach(tr => {
        tr.classList.remove('row-selected');
      });
      const selectedTr = Array.from(document.querySelectorAll('#certsTableBody tr')).find(tr => {
        return tr.innerHTML.includes(`selectCertificateRow('${id}')`);
      });
      if (selectedTr) selectedTr.classList.add('row-selected');

      // Update Certificate Preview Canvas
      let title = 'Certificate of Completion';
      if (cert.certificateType === 'Internship Certificate') title = 'Certificate of Internship';
      if (cert.certificateType === 'Experience Letter') title = 'Experience Letter';

      document.getElementById('previewCertTitle').innerText = title;
      document.getElementById('previewStudentName').innerText = cert.studentName;
      document.getElementById('previewDescText').innerHTML = `has successfully completed the <b>${cert.course}</b> Course`;
      document.getElementById('previewDurationText').innerText = `Duration: ${cert.duration || '4 Months'}`;
      document.getElementById('previewCertId').innerText = cert.certificateId;
    }

    // Render Pagination
    function renderPagination() {
      const start = (currentPage - 1) * limit + 1;
      const end = Math.min(currentPage * limit, totalCount);
      document.getElementById('paginationInfo').innerText = `Showing ${totalCount > 0 ? start : 0} to ${end} of ${totalCount} certificates`;

      let btns = `
        <button class="page-num-btn ${currentPage === 1 ? 'disabled' : ''}" onclick="changePage(${currentPage - 1})">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
      `;

      for (let p = 1; p <= Math.min(totalPages, 5); p++) {
        btns += `
          <button class="page-num-btn ${currentPage === p ? 'active' : ''}" onclick="changePage(${p})">${p}</button>
        `;
      }

      if (totalPages > 5) {
        btns += `<span style="padding: 0 4px; color: #94a3b8; font-size: 11px;">...</span>`;
        btns += `
          <button class="page-num-btn ${currentPage === totalPages ? 'active' : ''}" onclick="changePage(${totalPages})">${totalPages}</button>
        `;
      }

      btns += `
        <button class="page-num-btn ${currentPage === totalPages ? 'disabled' : ''}" onclick="changePage(${currentPage + 1})">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      `;

      document.getElementById('paginationControls').innerHTML = btns;
    }

    function changePage(p) {
      if (p < 1 || p > totalPages || p === currentPage) return;
      currentPage = p;
      fetchCertificates();
    }

    // Filter by Type
    function filterByCertType(type, btnElem) {
      document.querySelectorAll('.subnav-pill').forEach(b => b.classList.remove('active'));
      btnElem.classList.add('active');
      currentCertType = type;
      currentPage = 1;
      fetchCertificates();
    }

    // Filter by Status Tab
    function filterByStatus(status, btnElem) {
      document.querySelectorAll('.status-tab-btn').forEach(b => b.classList.remove('active'));
      btnElem.classList.add('active');
      currentStatus = status;
      currentPage = 1;
      fetchCertificates();
    }

    // Real-time search
    let searchDebounce;
    function handleSearch() {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        currentPage = 1;
        fetchCertificates();
      }, 250);
    }

    function openFilterOptions() {
      const course = prompt('Filter by Course (leave blank for all):\\n- Data Analytics\\n- Data Science\\n- Full Stack Developer\\n- Python Full Stack');
      if (course !== null) {
        document.getElementById('certSearchInput').value = course.trim();
        handleSearch();
      }
    }

    // Issue Certificate Modal & Submit
    function openIssueModal() {
      document.getElementById('issueCertForm').reset();
      document.getElementById('modalIssueCert').classList.add('open');
    }

    async function handleIssueCertificate(e) {
      e.preventDefault();
      const payload = {
        studentName: document.getElementById('newCertName').value.trim(),
        studentEmail: document.getElementById('newCertEmail').value.trim(),
        course: document.getElementById('newCertCourse').value,
        certificateType: document.getElementById('newCertType').value,
        duration: document.getElementById('newCertDuration').value,
        grade: document.getElementById('newCertGrade').value,
        template: document.getElementById('newCertTemplate').value,
        issueDate: document.getElementById('newCertDate').value
      };

      try {
        const res = await fetch('/api/admin/certificates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          closeModal('modalIssueCert');
          showToast(`Certificate ${data.certificate.certificateId} issued to ${payload.studentName}!`);
          fetchCertificates();
        } else {
          showToast(data.message || 'Issuance failed');
        }
      } catch (err) {
        console.error('Issue Cert Error:', err);
      }
    }

    // Bulk Issue Modal & Submit
    function openBulkIssueModal() {
      document.getElementById('modalBulkIssue').classList.add('open');
    }

    async function handleBulkIssue(e) {
      e.preventDefault();
      const rawList = document.getElementById('bulkStudentsList').value.split(/\\n|,/).map(s => s.trim()).filter(Boolean);
      const course = document.getElementById('bulkBatchSelect').value.split('(')[0].trim();
      const certType = document.getElementById('bulkCertType').value;

      if (!rawList.length) {
        showToast('Please specify at least one student name');
        return;
      }

      try {
        const res = await fetch('/api/admin/certificates/bulk-issue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            students: rawList,
            course,
            certificateType: certType,
            duration: '4 Months'
          })
        });
        const data = await res.json();
        if (data.success) {
          closeModal('modalBulkIssue');
          showToast(`Successfully issued ${data.count} certificates in bulk!`);
          fetchCertificates();
        }
      } catch (err) {
        console.error('Bulk Issue Error:', err);
      }
    }

    // Verification Portal
    function openVerificationModal() {
      document.getElementById('verifyResultBox').style.display = 'none';
      document.getElementById('modalVerification').classList.add('open');
    }

    async function runCertificateVerify() {
      const id = document.getElementById('verifyInputId').value.trim();
      if (!id) return;

      try {
        const res = await fetch(`/api/admin/certificates/verify/${encodeURIComponent(id)}`);
        const data = await res.json();
        const box = document.getElementById('verifyResultBox');
        const details = document.getElementById('verifyResultDetails');

        if (data.success && data.certificate) {
          box.style.display = 'block';
          details.innerHTML = `
            <b>Recipient:</b> ${data.certificate.studentName}<br>
            <b>Course:</b> ${data.certificate.course}<br>
            <b>Credential Type:</b> ${data.certificate.certificateType}<br>
            <b>Issue Date:</b> ${data.certificate.issueDate}<br>
            <b>Status:</b> ${data.certificate.status} (Verified Authentic)
          `;
        } else {
          box.style.display = 'block';
          box.style.background = '#FEF2F2';
          box.style.borderColor = '#FECACA';
          details.innerHTML = `<span style="color:#DC2626;">Certificate ID '${id}' could not be verified in registry.</span>`;
        }
      } catch (err) {
        console.error('Verify error:', err);
      }
    }

    // Templates Modal
    function openTemplatesModal() {
      document.getElementById('modalTemplates').classList.add('open');
    }

    function closeModal(id) {
      document.getElementById(id).classList.remove('open');
    }

    // Print & Download
    function printCertificate() {
      window.print();
    }

    function downloadSingleCert(certId) {
      showToast(`Generating and downloading PDF for ${certId}...`);
    }

    function shareVerificationLink() {
      const cert = certificates.find(c => c._id === selectedCertId);
      const url = cert ? `https://edurup.in/verify/${cert.certificateId}` : window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        showToast('Verification URL copied to clipboard!');
      }).catch(() => {
        showToast(`Verification Link: ${url}`);
      });
    }

    function openCertOptions(id) {
      const cert = certificates.find(c => c._id === id);
      if (!cert) return;
      const choice = prompt(`Certificate: ${cert.certificateId} (${cert.studentName})\\n1. Print / Download\\n2. Copy Verification URL\\n3. Delete Certificate\\n(Enter 1-3):`);
      if (choice === '1') printCertificate();
      else if (choice === '2') shareVerificationLink();
      else if (choice === '3') {
        if (confirm(`Are you sure you want to delete certificate ${cert.certificateId}?`)) {
          deleteCertificate(id);
        }
      }
    }

    async function deleteCertificate(id) {
      try {
        const res = await fetch(`/api/admin/certificates/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          showToast('Certificate deleted');
          fetchCertificates();
        }
      } catch (err) {
        console.error('Delete error:', err);
      }
    }

    // Global Top Search
    function handleGlobalSearch(e) {
      if (e.key === 'Enter') {
        document.getElementById('certSearchInput').value = e.target.value;
        handleSearch();
      }
    }

    // Toast Notification
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
      fetchCertificates();
    });
  </script>
</body>
</html>
"""

with open('/Users/riyasingh/Downloads/production_site/admin-certificates.html', 'w') as f:
    f.write(HTML_CONTENT)

print("Created admin-certificates.html successfully!")
