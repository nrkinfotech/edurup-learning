/**
 * Edurup Learning - Dynamic Navigation Auth Status & Sign Out Manager
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

    // Add Sign Out link to mobile nav drawer if logged in
    let mobileSignout = document.getElementById('mobileSignoutBtn');
    if (isLoggedIn && !mobileSignout) {
      const signoutLink = document.createElement('a');
      signoutLink.id = 'mobileSignoutBtn';
      signoutLink.href = 'javascript:void(0);';
      signoutLink.style.color = '#ef4444';
      signoutLink.style.fontWeight = '700';
      signoutLink.innerHTML = '🚪 Sign Out';
      signoutLink.onclick = signOutUser;
      mobileNav.querySelector('.wrap').appendChild(signoutLink);
    }
  }
}

// Global Sign Out Helper Function
function signOutUser() {
  localStorage.removeItem('edurup_user_session');
  localStorage.removeItem('edurup_jwt_token');
  alert('You have signed out successfully.');
  window.location.href = 'signup.html';
}
