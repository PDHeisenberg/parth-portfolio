// Page rendering components
import { profile, experience, caseStudies, services, socialLinks, additionalLinks, readingList } from '../data/content.js';
import { renderIcons } from './icons.js';

// Render the home page
export function renderHomePage() {
  return `
    <h1 class="name">${profile.name}</h1>
    
    <div class="bento-grid">
      <!-- About Card -->
      <div class="card about-card">
        <span class="section-label">About</span>
        <p>${profile.tagline}</p>
      </div>
      
      <!-- Profile Photo Card -->
      <div class="card profile-card">
        <a href="/chat" class="ai-button">
          <span>Chat with my</span>
          <strong>AI Assistant</strong>
        </a>
        <div class="profile-photo-wrapper">
          <img src="${profile.rotatingText ? '/src/assets/images/rotating-badge.png' : ''}" class="rotating-text" alt="">
          <img src="/src/assets/images/profile.png" class="profile-photo" alt="${profile.name}">
        </div>
      </div>
      
      <!-- Case Study 1: Offers & More -->
      ${renderCaseStudyCard(caseStudies[0])}
      
      <!-- LinkedIn Card -->
      <a href="https://www.linkedin.com/in/parthdhawan/" target="_blank" rel="noopener" class="card linkedin-card">
        ${renderIcons.linkedin()}
        <span class="arrow">${renderIcons.arrow()}</span>
      </a>
      
      <!-- Experience Card -->
      <div class="card experience-card">
        <span class="section-label">Experience</span>
        <ul class="experience-list">
          ${experience.map(exp => `
            <li class="experience-item">
              <div>
                <h4>${exp.title}</h4>
                <span class="company">${exp.company}</span>
              </div>
              <span class="period">${exp.period}</span>
            </li>
          `).join('')}
        </ul>
        <a href="${profile.resumeUrl}" target="_blank" rel="noopener" class="resume-link">
          View resume ${renderIcons.arrow()}
        </a>
      </div>
      
      <!-- Services Card -->
      <div class="card services-card">
        <span class="section-label">Services</span>
        <div class="services-carousel">
          ${services.map(service => `
            <div class="service-item">
              <h3>${service.title}</h3>
              <p>${service.description}</p>
            </div>
          `).join('')}
          <!-- Duplicate for infinite scroll effect -->
          ${services.map(service => `
            <div class="service-item">
              <h3>${service.title}</h3>
              <p>${service.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- Case Study 2: Group Orders -->
      ${renderCaseStudyCard(caseStudies[1])}
      
      <!-- Reading List Card -->
      <a href="${readingList.url}" class="card reading-card">
        <div>
          <span class="section-label">Reading list</span>
        </div>
        <img src="/src/assets/images/book-cover.png" class="book-cover" alt="${readingList.featuredBook.title}">
      </a>
      
      <!-- Case Study 3: Cart & Trip Planning -->
      ${renderCaseStudyCard(caseStudies[2])}
      
      <!-- Social Links -->
      <div class="card card--span-2">
        <div class="social-grid">
          ${socialLinks.map(social => `
            <a href="${social.url}" target="_blank" rel="noopener" class="card social-card">
              ${renderIcons[social.icon]()}
              <h5>${social.handle}</h5>
            </a>
          `).join('')}
          ${additionalLinks.map(link => `
            <a href="${link.url.startsWith('http') ? link.url : link.url}" ${link.url.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} class="card social-card">
              ${renderIcons[link.icon] ? renderIcons[link.icon]() : ''}
              <h5>${link.title}</h5>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <p>Built with ⚡ by Parth Dhawan</p>
    </footer>
  `;
}

// Render a case study card
function renderCaseStudyCard(study) {
  const mockupImage = study.id === 'offerandmore' 
    ? '/src/assets/images/offers-mockup.png'
    : study.id === 'grouporders'
    ? '/src/assets/images/grouporders-mockup.png'
    : '/src/assets/images/tripplanning-mockup.png';
    
  return `
    <a href="${study.slug}" class="card case-study-card">
      <div class="card-content">
        <span class="section-label">Case Study</span>
        <h3>${study.title}</h3>
        <span class="company">${study.company}</span>
      </div>
      <div class="mockup">
        <img src="${mockupImage}" alt="${study.title} mockup">
      </div>
    </a>
  `;
}

// Render case study page
export function renderCaseStudyPage(slug) {
  const study = caseStudies.find(s => s.slug.includes(slug) || s.id === slug);
  
  if (!study) {
    return render404Page();
  }
  
  return `
    <div class="case-study-page">
      <a href="/" class="back-button">
        ${renderIcons.arrowLeft()} Back
      </a>
      
      <header class="case-study-header">
        <h1>${study.title}</h1>
        <p class="description">${study.description}</p>
        
        <div class="case-study-meta">
          <div class="case-study-meta-item">
            <h4>Role</h4>
            <p>${study.role}</p>
          </div>
          <div class="case-study-meta-item">
            <h4>Company</h4>
            <p>${study.company}</p>
          </div>
          <div class="case-study-meta-item">
            <h4>Year</h4>
            <p>${study.year}</p>
          </div>
          <a href="${study.fullPresentationSlug}" class="presentation-link">
            Full Presentation ${renderIcons.arrow()}
          </a>
        </div>
      </header>
      
      ${study.context ? `
        <section class="case-study-section">
          <h2>Context</h2>
          <p>${study.context}</p>
        </section>
      ` : ''}
      
      ${study.background ? `
        <section class="case-study-section">
          <h2>Background</h2>
          <p>${study.background}</p>
        </section>
      ` : ''}
      
      ${study.overview ? `
        <section class="case-study-section">
          <h2>Overview</h2>
          <p>${study.overview}</p>
        </section>
      ` : ''}
      
      ${study.insights ? `
        <section class="case-study-section">
          <h2>Insights</h2>
          <p><em>Based on our diary study research, Food Brandhealth, and NPS.</em></p>
          <h3>As an eater:</h3>
          <ul>
            ${study.insights.eater.map(i => `<li>${i}</li>`).join('')}
          </ul>
          <h3>As a Merchant:</h3>
          <ul>
            ${study.insights.merchant.map(i => `<li>${i}</li>`).join('')}
          </ul>
        </section>
      ` : ''}
      
      ${study.problem ? `
        <section class="case-study-section">
          <h2>The Problem</h2>
          <p>Food ordering in big groups is Hard!</p>
          <ul>
            ${study.problem.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </section>
      ` : ''}
      
      ${study.solution ? `
        <section class="case-study-section">
          <h2>Introducing ${study.title}</h2>
          <p>${study.description}</p>
          <ul>
            ${study.solution.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </section>
      ` : ''}
      
      ${study.businessReasons ? `
        <section class="case-study-section">
          <h2>The Business of Travel</h2>
          <ul>
            ${study.businessReasons.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </section>
      ` : ''}
      
      ${study.launch ? `
        <section class="case-study-section">
          <h2>Launch</h2>
          <p>${study.launch.description}</p>
          <ul>
            ${study.launch.results.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </section>
      ` : ''}
      
      ${study.results ? `
        <section class="case-study-section">
          <h2>Results</h2>
          <ul>
            <li>Conversion Rate: ${study.results.conversionRate}</li>
            <li>Order Percentage: ${study.results.orderPercentage} of orders</li>
            <li>Margin: ${study.results.marginComparison}</li>
          </ul>
        </section>
      ` : ''}
      
      ${study.learnings ? `
        <section class="case-study-section">
          <h2>Learnings</h2>
          <ul>
            ${study.learnings.map(l => `<li>${l}</li>`).join('')}
          </ul>
        </section>
      ` : ''}
      
      <a href="/" class="back-button">
        ${renderIcons.arrowLeft()} Back to Home
      </a>
    </div>
  `;
}

// Render reading list page
export function renderReadingListPage() {
  return `
    <div class="case-study-page">
      <a href="/" class="back-button">
        ${renderIcons.arrowLeft()} Back
      </a>
      <h1>Reading List</h1>
      <p>Coming soon...</p>
    </div>
  `;
}

// Render chat page
export function renderChatPage() {
  return `
    <div class="case-study-page">
      <a href="/" class="back-button">
        ${renderIcons.arrowLeft()} Back
      </a>
      <h1>AI Assistant</h1>
      <p>Chat with my AI assistant coming soon...</p>
    </div>
  `;
}

// Render 404 page
export function render404Page() {
  return `
    <div class="case-study-page" style="text-align: center; padding: 4rem;">
      <h1 style="font-size: 6rem; margin-bottom: 1rem;">404</h1>
      <p style="font-size: 1.25rem; margin-bottom: 2rem;">It seems like this page doesn't exist, or it's gone.</p>
      <p>But don't worry! I'll get you back on track :)</p>
      <a href="/" class="back-button" style="margin-top: 2rem; display: inline-flex;">
        ${renderIcons.arrowLeft()} Back home
      </a>
    </div>
  `;
}
