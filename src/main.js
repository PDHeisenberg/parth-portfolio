// Main entry point - imports and initializes the app
import { renderHomePage, renderCaseStudyPage } from './components/pages.js';
import { initRouter } from './router.js';

// Initialize the application
function init() {
  // Set up client-side routing
  initRouter();
  
  // Initial render based on current URL
  handleRoute();
}

// Handle route changes
function handleRoute() {
  const path = window.location.pathname;
  const app = document.getElementById('app');
  
  if (path === '/' || path === '/index.html') {
    app.innerHTML = renderHomePage();
    initHomePageInteractions();
  } else if (path.startsWith('/work/')) {
    const slug = path.replace('/work/', '');
    app.innerHTML = renderCaseStudyPage(slug);
  } else if (path === '/Readinglist') {
    app.innerHTML = renderReadingListPage();
  } else if (path === '/chat') {
    app.innerHTML = renderChatPage();
  } else {
    // 404
    app.innerHTML = render404Page();
  }
}

// Initialize home page interactions
function initHomePageInteractions() {
  // Add click handlers for case study cards
  document.querySelectorAll('.case-study-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const href = card.getAttribute('href');
      if (href && !href.startsWith('http')) {
        e.preventDefault();
        navigateTo(href);
      }
    });
  });
}

// Navigation helper
function navigateTo(path) {
  window.history.pushState({}, '', path);
  handleRoute();
  window.scrollTo(0, 0);
}

// Make navigateTo available globally for links
window.navigateTo = navigateTo;
window.handleRoute = handleRoute;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
