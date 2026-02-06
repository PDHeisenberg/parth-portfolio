// Page rendering components
import { profile, experience, caseStudies, services, socialLinks, additionalLinks, readingList } from '../data/content.js';
import { renderIcons } from './icons.js';

// Render the home page
// Layout matches Framer: 3-column grid
// Row 1: About(2col) | Profile(1col) | Offers Case Study(1col, 2rows TALL)
// Row 2: LinkedIn(1col) | Experience(2col) | [continues]
// Row 3: Services(1col) | Cart&Trip(2col) | Group Orders(1col, 2rows TALL)  
// Row 4: Reading List(2col) | [continues]
// Row 5: Twitter | Instagram | Email | AI Assistant | FREE Icon (lime bg)

export function renderHomePage() {
  return `
    <div class="bento-grid">
      <!-- ROW 1 -->
      <!-- About Card - 2 columns -->
      <div class="card card-medium about-card">
        <span class="section-label">About</span>
        <p>Designer based in Singapore 🇸🇬, driven by curiosity and a knack for building cool stuff. Designing isn't just my job—it's a lens through which I view everything.</p>
      </div>
      
      <!-- Profile Photo Card - 1 column -->
      <div class="card card-small profile-card">
        <div class="profile-photo-wrapper">
          <svg class="rotating-text-svg" viewBox="0 0 200 200">
            <defs>
              <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"/>
            </defs>
            <text>
              <textPath href="#circlePath" class="rotating-text-path">
                PRODUCT DESIGNER • WORKING ON COOL STUFF • 
              </textPath>
            </text>
          </svg>
          <img src="/images/profile.png" class="profile-photo" alt="${profile.name}">
        </div>
      </div>
      
      <!-- Case Study: Offers & More - 1 column, 2 rows (TALL) - positioned col 3, rows 1-2 -->
      ${renderCaseStudyCardTall(caseStudies[0], 'accent', 'tall-pos-1')}
      
      <!-- ROW 2 -->
      <!-- LinkedIn Card - 1 column -->
      <a href="https://www.linkedin.com/in/parthdhawan/" target="_blank" rel="noopener" class="card card-small linkedin-card">
        ${renderIcons.linkedin()}
        <span class="arrow-icon-small">↗</span>
      </a>
      
      <!-- Experience Card - 2 columns -->
      <div class="card card-medium experience-card">
        <span class="section-label">Experience</span>
        <ul class="experience-list">
          ${experience.map(exp => `
            <li class="experience-item">
              <div class="exp-left">
                <span class="exp-title">${exp.title}</span>
                <span class="exp-company">${exp.company}</span>
              </div>
              <span class="exp-period">${exp.period}</span>
            </li>
          `).join('')}
        </ul>
        <a href="${profile.resumeUrl}" target="_blank" rel="noopener" class="resume-link">
          View resume <span class="arrow">↗</span>
        </a>
      </div>
      
      <!-- ROW 3 -->
      <!-- Services Card - 1 column -->
      <div class="card card-small service-card">
        <span class="section-label">Services</span>
        <h3>Mobile/Web Designs</h3>
        <p>Crafting intuitive and engaging designs for both mobile and web platforms.</p>
      </div>
      
      <!-- Case Study: Cart & Trip Planning - 2 columns -->
      ${renderCaseStudyCard(caseStudies[2], 'card-medium')}
      
      <!-- Case Study: Group Orders - 1 column, 2 rows (TALL) - positioned col 3, rows 3-4 -->
      ${renderCaseStudyCardTall(caseStudies[1], 'accent', 'tall-pos-2')}
      
      <!-- ROW 4 -->
      <!-- Reading List Card - 2 columns -->
      <div class="card card-medium reading-list-card">
        <span class="section-label">Reading list</span>
        <div class="books-grid">
          <img src="/images/book-beginning.jpg" alt="The Beginning of Infinity" class="book-cover">
          <img src="/images/book-fabric.jpg" alt="The Fabric of Reality" class="book-cover">
          <img src="/images/book-cease.jpg" alt="When We Cease to Understand the World" class="book-cover">
        </div>
      </div>
      
      <!-- ROW 5 - Social links -->
      <a href="https://x.com/wwheisenbergeth" target="_blank" rel="noopener" class="card card-small social-link-card">
        ${renderIcons.twitter()}
        <span>@wwheisenbergeth</span>
      </a>
      
      <a href="https://www.instagram.com/parth_dhawan/" target="_blank" rel="noopener" class="card card-small social-link-card">
        ${renderIcons.instagram()}
        <span>@parth_dhawan</span>
      </a>
      
      <a href="mailto:parthdhawan28@gmail.com" class="card card-small social-link-card">
        ${renderIcons.email()}
        <span>parthdhawan28</span>
      </a>
      
      <!-- Talk to AI Assistant - 1 column -->
      <a href="/chat" class="card card-small ai-link-card">
        <span>Talk to my AI assistant</span>
      </a>
      
      <!-- Free Icon Set - 1 column with accent background -->
      <a href="https://www.figma.com/community/file/1275092859040896934/free-editable-icon-set-with-animations" target="_blank" rel="noopener" class="card card-small icon-set-card card-accent">
        <span class="free-badge">FREE</span>
        <span>Icon set</span>
      </a>
    </div>
    
    <footer class="footer">
      <p>vibecoded with claude code</p>
    </footer>
    
    <!-- Floating AI Chat Widget -->
    <div class="ai-chat-floating" id="aiChat">
      <div class="ai-chat-popup" id="aiChatPopup">
        <div class="ai-chat-bubble">
          <img src="/images/profile.png" class="ai-avatar" alt="AI">
          <div class="ai-message">
            <p>Hi, I'm an AI version of Parth! I can answer questions about his experience and skills. Feel free to ask me anything!</p>
          </div>
        </div>
        <a href="/chat" class="ai-chat-input">
          <span>Ask me anything...</span>
          <span class="send-icon">→</span>
        </a>
      </div>
      <button class="ai-chat-trigger" onclick="document.getElementById('aiChatPopup').classList.toggle('show')">
        <span>Chat with my</span>
        <strong>AI Assistant</strong>
      </button>
    </div>
  `;
}

// Render a case study card
function renderCaseStudyCard(study, sizeClass = 'card-medium') {
  const mockupImage = study.id === 'offerandmore' 
    ? '/images/offers-mockup.png'
    : study.id === 'grouporders'
    ? '/images/grouporders-mockup.png'
    : '/images/tripplanning-mockup.png';
    
  return `
    <a href="${study.slug}" class="card ${sizeClass} case-study-card">
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

// Render a tall case study card (spans 2 rows)
// accent: 'accent' adds lime green background
// posClass: positioning class for grid placement
function renderCaseStudyCardTall(study, accent = '', posClass = '') {
  const mockupImage = study.id === 'offerandmore' 
    ? '/images/offers-mockup.png'
    : study.id === 'grouporders'
    ? '/images/grouporders-mockup.png'
    : '/images/tripplanning-mockup.png';
  
  const accentClass = accent === 'accent' ? 'card-accent' : '';
    
  return `
    <a href="${study.slug}" class="card card-tall case-study-card case-study-tall ${accentClass} ${posClass}">
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
      <a href="/" class="close-button" aria-label="Close">
        ${renderIcons.close()}
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
        
        <!-- AI Chat Trigger -->
        <button class="ai-chat-trigger-btn" onclick="openAIChat('${study.id}')">
          <span class="ai-icon">🤖</span>
          <span>Ask AI about this project</span>
        </button>
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
      
    </div>
  `;
}

// Render reading list page
export function renderReadingListPage() {
  return `
    <div class="case-study-page">
      <a href="/" class="close-button" aria-label="Close">
        ${renderIcons.close()}
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
      <a href="/" class="close-button" aria-label="Close">
        ${renderIcons.close()}
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
      <a href="/" class="close-button" aria-label="Close">
        ${renderIcons.close()}
      </a>
      <h1 style="font-size: 6rem; margin-bottom: 1rem;">404</h1>
      <p style="font-size: 1.25rem; margin-bottom: 2rem;">It seems like this page doesn't exist, or it's gone.</p>
      <p>But don't worry! I'll get you back on track :)</p>
    </div>
  `;
}
