/**
 * Edurup Learning - Dynamic Navigation Auth Status Manager
 * Shows "Sign Up / Sign In" when logged out, and a sleek Profile Icon next to "Enquire Now" when logged in.
 */
document.addEventListener('DOMContentLoaded', updateNavAuthStatus);

function updateNavAuthStatus() {
  const sessionStr = localStorage.getItem('edurup_user_session');
  const token = localStorage.getItem('edurup_jwt_token');

  const isLoggedIn = !!(sessionStr || token);
  let userName = 'Student';
  let initial = '👤';

  if (sessionStr) {
    try {
      const u = JSON.parse(sessionStr);
      userName = u.fullName || u.name || 'Student';
      if (userName && userName !== 'Student') {
        initial = userName.trim().charAt(0).toUpperCase();
      }
    } catch(e) {}
  }

  // Update topbar nav-signin elements across all pages
  const signinBtns = document.querySelectorAll('.nav-signin, .nav-profile-btn, [data-nav-auth]');
  signinBtns.forEach(btn => {
    const navActions = btn.closest('.nav-actions');
    const enrollBtn = navActions ? navActions.querySelector('.nav-enroll-btn') : null;

    if (isLoggedIn) {
      btn.href = 'dashboard.html';
      btn.className = 'nav-profile-btn';
      btn.innerHTML = `<span class="nav-avatar-icon">${initial}</span>`;
      btn.title = `Profile Dashboard (${userName})`;
      btn.setAttribute('aria-label', `Profile Dashboard (${userName})`);

      // Position profile icon next to Enquire Now button
      if (enrollBtn && enrollBtn.nextElementSibling !== btn) {
        enrollBtn.after(btn);
      }
    } else {
      btn.href = 'signup.html';
      btn.className = 'nav-signin';
      btn.innerHTML = 'Sign Up / Sign In';
      btn.title = 'Sign Up or Sign In';

      // Position Sign Up / Sign In link before Enquire Now button
      if (enrollBtn && enrollBtn.previousElementSibling !== btn) {
        enrollBtn.before(btn);
      }
    }
  });

  // Mobile navigation drawer links
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) {
    const mobileAuthLinks = mobileNav.querySelectorAll('a[href="signup.html"], a[href="dashboard.html"], a[href="profile.html"]');
    mobileAuthLinks.forEach(link => {
      if (isLoggedIn) {
        link.href = 'dashboard.html';
        link.innerHTML = `👤 My Profile Dashboard`;
      } else {
        link.href = 'signup.html';
        link.innerHTML = `🔑 Sign Up / Sign In`;
      }
    });
  }
}
