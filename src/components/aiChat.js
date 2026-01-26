// AI Chat Component for Case Studies
// Uses Anthropic Claude API to answer questions about projects

// Case study context data
const caseStudyContext = {
  'offerandmore': {
    title: 'Offers & More',
    company: 'Grab',
    role: 'Lead Product Designer',
    year: '2024',
    summary: `After the pandemic, as inflation rose, consumers in SEA prioritized affordability. Despite competitive pricing, GrabFood was perceived as 'not affordable.' This project created a dedicated landing page for all offers, budget meals, free delivery and more - addressing various user intents and helping them find the right restaurant.`,
    problem: `Promos were not visible and accessible. GrabFood had the lowest promo discoverability compared to competitors. The definition of 'affordability' varies based on age, income and culture. Merchants felt promotions barely affected sales, leading fewer to offer discounts.`,
    solution: `Created a new affordability-focused landing page with visual filters and improved merchant listings. Made promos more discoverable and accessible.`,
    impact: `Tile CTR: 12.3%. 58% of sessions involved clicking into a merchant, with ~15% conversion. Both savings-conscious and price-conscious users showed higher conversion rates. Visual filters were selected 31.12% of the time.`,
    challenges: `Balancing user needs (finding deals) with merchant needs (visibility for their promotions). Defining 'affordability' across different demographics and cultures in SEA.`,
    learnings: `User research was crucial in understanding that affordability means different things to different users. A/B testing visual filters showed significant engagement improvement.`
  },
  'grouporders': {
    title: 'Group Orders Tiered Promos',
    company: 'Grab',
    role: 'Lead Product Designer',
    year: '2024',
    summary: `A new, convenient way for big groups to order together and unlock bigger savings. The project made it easier for large groups to coordinate food orders while automatically handling bill splitting.`,
    problem: `Food ordering in big groups is hard! One person has to take all the ownership, pass their phone around, ask everyone for their preferences, pay for everyone and split the bill afterwards.`,
    solution: `No more phone passing. No need to chase people. Automatic bill-splitting built in. Tiered discounts unlock as more people join the group order.`,
    impact: `~35% conversion rate. 1% of total orders. 6.4% margin vs 10.8% standard margin.`,
    challenges: `Joined the project during a critical phase when the lead designer went on maternity leave. Had to quickly understand extensive cross-functional dependencies and steer the project to completion.`,
    learnings: `Clear communication with engineering and PM was essential. The tiered discount system needed careful balancing to be attractive to users while maintaining healthy margins.`
  },
  'trip-planning': {
    title: 'Cart & Trip Planning',
    company: 'Agoda',
    role: 'Senior Product Designer',
    year: '2021',
    summary: `Building a one-stop-shop trip planning and booking experience on Agoda. After 15 years of listing and selling hotels, Agoda expanded into flights, vacation rentals, and activities.`,
    problem: `Users had to use multiple apps/websites to plan a complete trip. No unified experience for booking hotels, flights, and activities together.`,
    solution: `Created a cart system that allows users to add multiple items (hotels, flights, activities) and book them together as a complete trip package.`,
    impact: `Enabled Agoda to retain customers by providing everything on a single platform. Allowed for bigger discounts for repeat customers. Made pre-made travel packages possible.`,
    challenges: `Agoda had been a hotel-only platform for 15 years. Had to research how people actually plan trips holistically, not just book hotels.`,
    learnings: `Taking a long-term perspective helped align stakeholders. Research was extremely helpful in understanding travelers' pain points. Moving quickly and involving developers early allowed for faster iteration.`
  }
};

// Render AI Chat UI
export function renderAIChat(caseStudyId) {
  const context = caseStudyContext[caseStudyId];
  if (!context) return '';
  
  return `
    <div class="ai-chat-container" id="aiChatContainer">
      <div class="ai-chat-header">
        <div class="ai-chat-title">
          <span class="ai-icon">🤖</span>
          <span>Ask AI about this project</span>
        </div>
        <button class="ai-chat-close" onclick="closeAIChat()">×</button>
      </div>
      
      <div class="ai-chat-quick-actions">
        <button class="quick-action" onclick="askAI('summary', '${caseStudyId}')">
          📝 Summary
        </button>
        <button class="quick-action" onclick="askAI('impact', '${caseStudyId}')">
          📈 Impact Created
        </button>
        <button class="quick-action" onclick="askAI('challenges', '${caseStudyId}')">
          🎯 Challenges
        </button>
        <button class="quick-action" onclick="askAI('learnings', '${caseStudyId}')">
          💡 Learnings
        </button>
      </div>
      
      <div class="ai-chat-messages" id="aiChatMessages">
        <div class="ai-message">
          <div class="ai-avatar">🤖</div>
          <div class="ai-bubble">
            Hi! I'm Parth's AI assistant. Ask me anything about the <strong>${context.title}</strong> project, or use the quick actions above!
          </div>
        </div>
      </div>
      
      <form class="ai-chat-input-form" onsubmit="handleAISubmit(event, '${caseStudyId}')">
        <input 
          type="text" 
          id="aiChatInput" 
          class="ai-chat-input-field"
          placeholder="Ask about the design process, decisions, impact..."
          autocomplete="off"
        />
        <button type="submit" class="ai-chat-send">
          <span>→</span>
        </button>
      </form>
    </div>
  `;
}

// Render the AI chat trigger button
export function renderAIChatTrigger(caseStudyId) {
  return `
    <button class="ai-chat-trigger-btn" onclick="openAIChat('${caseStudyId}')">
      <span class="ai-icon">🤖</span>
      <span>Ask AI about this project</span>
    </button>
  `;
}

// Initialize AI Chat functionality
export function initAIChat() {
  // Make functions globally available
  window.openAIChat = openAIChat;
  window.closeAIChat = closeAIChat;
  window.askAI = askAI;
  window.handleAISubmit = handleAISubmit;
  window.caseStudyContext = caseStudyContext;
}

function openAIChat(caseStudyId) {
  // Remove existing chat if any
  const existing = document.getElementById('aiChatOverlay');
  if (existing) existing.remove();
  
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'aiChatOverlay';
  overlay.className = 'ai-chat-overlay';
  overlay.innerHTML = renderAIChat(caseStudyId);
  overlay.onclick = (e) => {
    if (e.target === overlay) closeAIChat();
  };
  
  document.body.appendChild(overlay);
  
  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.add('active');
    document.getElementById('aiChatInput')?.focus();
  });
}

function closeAIChat() {
  const overlay = document.getElementById('aiChatOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
}

async function askAI(type, caseStudyId) {
  const context = caseStudyContext[caseStudyId];
  if (!context) return;
  
  const messagesContainer = document.getElementById('aiChatMessages');
  
  // Quick action responses (instant, no API needed)
  const quickResponses = {
    summary: context.summary,
    impact: context.impact,
    challenges: context.challenges,
    learnings: context.learnings
  };
  
  // Add user message
  const userQuestions = {
    summary: "Give me a summary of this project",
    impact: "What impact did this project create?",
    challenges: "What were the main challenges?",
    learnings: "What did you learn from this project?"
  };
  
  addMessage(messagesContainer, userQuestions[type], 'user');
  
  // Add AI response with typing effect
  const response = quickResponses[type] || "I don't have that information.";
  await addMessageWithTyping(messagesContainer, response, 'ai');
}

async function handleAISubmit(event, caseStudyId) {
  event.preventDefault();
  
  const input = document.getElementById('aiChatInput');
  const question = input.value.trim();
  if (!question) return;
  
  const messagesContainer = document.getElementById('aiChatMessages');
  const context = caseStudyContext[caseStudyId];
  
  // Add user message
  addMessage(messagesContainer, question, 'user');
  input.value = '';
  
  // Show typing indicator
  const typingId = showTypingIndicator(messagesContainer);
  
  try {
    // Call Anthropic API
    const response = await callAnthropicAPI(question, context);
    removeTypingIndicator(typingId);
    await addMessageWithTyping(messagesContainer, response, 'ai');
  } catch (error) {
    removeTypingIndicator(typingId);
    // Fallback to context-based response
    const fallbackResponse = generateFallbackResponse(question, context);
    await addMessageWithTyping(messagesContainer, fallbackResponse, 'ai');
  }
}

async function callAnthropicAPI(question, context) {
  // API key should be set in environment or config
  const apiKey = window.ANTHROPIC_API_KEY || '';
  
  if (!apiKey) {
    // Return context-based response if no API key
    return generateFallbackResponse(question, context);
  }
  
  const systemPrompt = `You are Parth Dhawan's AI assistant, helping visitors understand his design work. 
You're answering questions about the "${context.title}" project at ${context.company}.

Project Context:
- Role: ${context.role}
- Year: ${context.year}
- Summary: ${context.summary}
- Problem: ${context.problem}
- Solution: ${context.solution}
- Impact: ${context.impact}
- Challenges: ${context.challenges}
- Learnings: ${context.learnings}

Respond in first person as if you are Parth. Be concise, friendly, and insightful.
If asked something not covered in the context, politely say you'd be happy to discuss it in person.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: 'user', content: question }]
    })
  });
  
  if (!response.ok) {
    throw new Error('API request failed');
  }
  
  const data = await response.json();
  return data.content[0].text;
}

function generateFallbackResponse(question, context) {
  const q = question.toLowerCase();
  
  if (q.includes('summary') || q.includes('about') || q.includes('what is')) {
    return context.summary;
  }
  if (q.includes('impact') || q.includes('result') || q.includes('metric') || q.includes('success')) {
    return context.impact;
  }
  if (q.includes('challenge') || q.includes('difficult') || q.includes('hard') || q.includes('problem')) {
    return `The main challenges were: ${context.challenges}`;
  }
  if (q.includes('learn') || q.includes('takeaway') || q.includes('insight')) {
    return `Key learnings: ${context.learnings}`;
  }
  if (q.includes('solution') || q.includes('solve') || q.includes('approach')) {
    return `My approach: ${context.solution}`;
  }
  if (q.includes('role') || q.includes('responsible') || q.includes('contribution')) {
    return `As ${context.role} at ${context.company} in ${context.year}, I led the design for this project. ${context.summary}`;
  }
  
  return `Great question! For ${context.title}, ${context.summary} If you'd like to dive deeper into any specific aspect, feel free to ask or reach out to me directly!`;
}

function addMessage(container, text, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = type === 'user' ? 'user-message' : 'ai-message';
  
  if (type === 'user') {
    messageDiv.innerHTML = `
      <div class="user-bubble">${text}</div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="ai-avatar">🤖</div>
      <div class="ai-bubble">${text}</div>
    `;
  }
  
  container.appendChild(messageDiv);
  container.scrollTop = container.scrollHeight;
}

async function addMessageWithTyping(container, text, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = type === 'user' ? 'user-message' : 'ai-message';
  
  const bubbleClass = type === 'user' ? 'user-bubble' : 'ai-bubble';
  
  if (type === 'ai') {
    messageDiv.innerHTML = `
      <div class="ai-avatar">🤖</div>
      <div class="${bubbleClass}"></div>
    `;
  } else {
    messageDiv.innerHTML = `<div class="${bubbleClass}"></div>`;
  }
  
  container.appendChild(messageDiv);
  
  const bubble = messageDiv.querySelector(`.${bubbleClass}`);
  
  // Typing effect
  for (let i = 0; i < text.length; i++) {
    bubble.textContent += text[i];
    container.scrollTop = container.scrollHeight;
    await sleep(10); // Adjust speed here
  }
}

function showTypingIndicator(container) {
  const id = 'typing-' + Date.now();
  const typingDiv = document.createElement('div');
  typingDiv.id = id;
  typingDiv.className = 'ai-message typing-indicator';
  typingDiv.innerHTML = `
    <div class="ai-avatar">🤖</div>
    <div class="ai-bubble">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  `;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const element = document.getElementById(id);
  if (element) element.remove();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
