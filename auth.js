/* ORYNT account prototype
   This file provides a local browser-only preview until a real auth backend is connected.
   Do not use real passwords here. No credentials are sent to a server.
*/
(function () {
  const KEY = 'orynt_demo_user';

  function getUser() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
    catch (_) { return null; }
  }

  function saveUser(user) {
    localStorage.setItem(KEY, JSON.stringify(user));
  }

  function initials(name, email) {
    const source = (name || email || 'O').trim();
    return source.split(/\s+/).slice(0, 2).map(x => x[0]).join('').toUpperCase();
  }

  window.ORYNT_AUTH = {
    getUser,
    saveUser,
    logout() {
      localStorage.removeItem(KEY);
      window.location.href = 'login.html';
    },
    initials
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-auth-link]').forEach(function (link) {
      const user = getUser();
      if (user) {
        link.textContent = 'Account';
        link.href = 'account.html';
      }
    });

    document.querySelectorAll('[data-logout]').forEach(function (button) {
      button.addEventListener('click', function () {
        window.ORYNT_AUTH.logout();
      });
    });
  });
})();
