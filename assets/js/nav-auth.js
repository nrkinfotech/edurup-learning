/**
 * Edurup Learning - Dynamic Navigation Auth Status Manager
 * Toggles between "Sign Up / Sign In" and "My Profile" badge based on user login session.
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

  // Update all nav-signin elements across pages
  const signinBtns = document.querySelectorAll('.nav-signin, .nav-profile-btn, [data-nav-auth]');
  signinBtns.forEach(btn => {
    if (isLoggedIn) {
      btn.href = 'dashboard.html';
      btn.className = 'nav-profile-btn';
      btn.innerHTML = `<span class="nav-avatar-circle">${initial}</span><span style="font-weight:700;">My Profile</span>`;
      btn.title = 'View Student Profile Dashboard';
    } else {
      btn.href = 'signup.html';
      btn.className = 'nav-signin';
      btn.innerHTML = 'Sign Up / Sign In';
      btn.title = 'Sign Up or Sign In';
    }
  });

  // Update mobile navigation links
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
