// Simple client-side router

export function initRouter() {
  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    window.handleRoute();
  });
  
  // Intercept link clicks for client-side navigation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && !link.href.startsWith('http') && !link.href.startsWith('mailto:')) {
      const url = new URL(link.href);
      if (url.origin === window.location.origin) {
        e.preventDefault();
        window.navigateTo(url.pathname);
      }
    }
  });
}
