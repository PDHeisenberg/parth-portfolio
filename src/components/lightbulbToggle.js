// Lightbulb Theme Toggle - The Theatrical Experience
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

let isAnimating = false;
let isDark = false;
let draggableInstance = null;

// Generate the lightbulb HTML
export function createLightbulbHTML() {
  return `
    <div class="lightbulb-toggle" id="theme-toggle" tabindex="0" role="button" aria-label="Toggle dark mode">
      <!-- The cord you pull -->
      <div class="cord-container">
        <svg class="cord" viewBox="0 0 24 80" preserveAspectRatio="none">
          <path class="cord-path" d="M12,0 Q12,40 12,70" />
        </svg>
        <div class="pull-handle" id="pull-handle"></div>
      </div>
      
      <!-- The bulb itself -->
      <div class="bulb-container" id="bulb-container">
        <svg class="bulb" viewBox="0 0 50 70">
          <!-- Socket base -->
          <rect class="bulb-socket" x="17" y="0" width="16" height="8" rx="1" />
          <!-- Socket threads -->
          <rect class="bulb-socket-thread" x="18" y="8" width="14" height="3" />
          <rect class="bulb-socket-thread" x="19" y="11" width="12" height="2" />
          
          <!-- Glass bulb -->
          <ellipse class="bulb-glass" cx="25" cy="40" rx="20" ry="26" />
          
          <!-- Filament -->
          <path class="bulb-filament" d="M18,38 Q25,28 32,38 M20,42 Q25,35 30,42" />
          
          <!-- Light rays -->
          <g class="bulb-rays">
            <line x1="25" y1="12" x2="25" y2="2" />
            <line x1="42" y1="25" x2="52" y2="18" />
            <line x1="47" y1="40" x2="58" y2="40" />
            <line x1="42" y1="55" x2="52" y2="62" />
            <line x1="8" y1="25" x2="-2" y2="18" />
            <line x1="3" y1="40" x2="-8" y2="40" />
            <line x1="8" y1="55" x2="-2" y2="62" />
          </g>
        </svg>
        
        <!-- Glow effect -->
        <div class="light-glow"></div>
      </div>
    </div>

    <!-- Full-page overlays for theme transition -->
    <div class="light-overlay" id="light-overlay"></div>
    <div class="dark-overlay" id="dark-overlay"></div>
  `;
}

// Initialize the lightbulb toggle
export function initLightbulbToggle() {
  // Check stored theme or system preference
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  
  // Wait for DOM
  requestAnimationFrame(() => {
    setupDraggable();
    setupClickHandler();
    setupKeyboardHandler();
  });
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      // Only auto-switch if user hasn't manually set preference
      isDark = e.matches;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  });
}

// Setup draggable cord
function setupDraggable() {
  const pullHandle = document.getElementById('pull-handle');
  const cordPath = document.querySelector('.cord-path');
  const bulbContainer = document.getElementById('bulb-container');
  const toggle = document.getElementById('theme-toggle');
  
  if (!pullHandle) return;
  
  draggableInstance = Draggable.create(pullHandle, {
    type: 'y',
    bounds: { minY: 0, maxY: 50 },
    inertia: false,
    
    onDragStart: function() {
      toggle.classList.add('is-dragging');
    },
    
    onDrag: function() {
      const progress = this.y / 50;
      
      // Stretch the cord
      gsap.set(cordPath, {
        attr: { d: `M12,0 Q12,${40 + progress * 15} 12,${70 + this.y}` }
      });
      
      // Bulb follows slightly and tilts
      gsap.set(bulbContainer, {
        y: this.y * 0.6,
        rotation: this.y * 0.15
      });
    },
    
    onRelease: function() {
      toggle.classList.remove('is-dragging');
      const pullDistance = this.y;
      
      // Animate cord back with spring
      gsap.to(cordPath, {
        attr: { d: 'M12,0 Q12,40 12,70' },
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.4)'
      });
      
      // Animate handle back
      gsap.to(pullHandle, {
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.4)'
      });
      
      // If pulled far enough, toggle theme
      if (pullDistance > 25 && !isAnimating) {
        toggleTheme();
      } else {
        // Just reset bulb position
        gsap.to(bulbContainer, {
          y: 0,
          rotation: 0,
          duration: 0.5,
          ease: 'elastic.out(1.2, 0.4)'
        });
      }
    }
  });
}

// Click handler on bulb
function setupClickHandler() {
  const bulbContainer = document.getElementById('bulb-container');
  if (!bulbContainer) return;
  
  bulbContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!isAnimating) {
      // Quick pull animation then toggle
      simulatePull();
    }
  });
}

// Keyboard handler for accessibility
function setupKeyboardHandler() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  
  toggle.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isAnimating) {
      e.preventDefault();
      simulatePull();
    }
  });
}

// Simulate a pull animation for click/keyboard
function simulatePull() {
  const pullHandle = document.getElementById('pull-handle');
  const cordPath = document.querySelector('.cord-path');
  const bulbContainer = document.getElementById('bulb-container');
  
  isAnimating = true;
  
  const tl = gsap.timeline({
    onComplete: () => toggleTheme()
  });
  
  // Pull down
  tl.to(pullHandle, {
    y: 30,
    duration: 0.15,
    ease: 'power2.in'
  })
  .to(cordPath, {
    attr: { d: 'M12,0 Q12,50 12,100' },
    duration: 0.15,
    ease: 'power2.in'
  }, '<')
  .to(bulbContainer, {
    y: 18,
    rotation: 1,
    duration: 0.15,
    ease: 'power2.in'
  }, '<')
  
  // Release
  .to(pullHandle, {
    y: 0,
    duration: 0.5,
    ease: 'elastic.out(1.2, 0.4)'
  })
  .to(cordPath, {
    attr: { d: 'M12,0 Q12,40 12,70' },
    duration: 0.5,
    ease: 'elastic.out(1.2, 0.4)'
  }, '<')
  .to(bulbContainer, {
    y: 0,
    rotation: 0,
    duration: 0.5,
    ease: 'elastic.out(1.2, 0.4)'
  }, '<');
}

// The main toggle function
function toggleTheme() {
  if (isDark) {
    turnOnLight();
  } else {
    turnOffLight();
  }
}

// Turn OFF the light (go dark)
function turnOffLight() {
  const darkOverlay = document.getElementById('dark-overlay');
  const bulbContainer = document.getElementById('bulb-container');
  const filament = document.querySelector('.bulb-filament');
  const rays = document.querySelectorAll('.bulb-rays line');
  const glow = document.querySelector('.light-glow');
  const glass = document.querySelector('.bulb-glass');
  
  document.documentElement.classList.add('theme-transitioning');
  
  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
      document.documentElement.classList.remove('theme-transitioning');
      gsap.set(darkOverlay, { width: 0, height: 0, opacity: 0 });
    }
  });
  
  // Calculate diagonal for full coverage
  const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 2.5;
  
  // 1. Filament starts dimming
  tl.to(filament, {
    opacity: 0.3,
    duration: 0.2,
    ease: 'power2.in'
  })
  
  // 2. Rays retract quickly
  .to(rays, {
    opacity: 0,
    duration: 0.3,
    stagger: 0.02,
    ease: 'power2.in'
  }, '<')
  
  // 3. Glow shrinks into bulb
  .to(glow, {
    scale: 0,
    opacity: 0,
    duration: 0.4,
    ease: 'power3.in'
  }, '<')
  
  // 4. Dark overlay expands FROM the bulb (darkness spreading)
  .set(darkOverlay, {
    width: 0,
    height: 0,
    opacity: 1,
    top: '70px', // Position of bulb
    right: '50px'
  })
  .to(darkOverlay, {
    width: diagonal,
    height: diagonal,
    duration: 0.7,
    ease: 'power2.out'
  }, '-=0.3')
  
  // 5. Apply dark theme when overlay covers most of screen
  .add(() => {
    isDark = true;
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, '-=0.4')
  
  // 6. Fade out overlay
  .to(darkOverlay, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out'
  });
  
  return tl;
}

// Turn ON the light (illuminate)
function turnOnLight() {
  const lightOverlay = document.getElementById('light-overlay');
  const filament = document.querySelector('.bulb-filament');
  const rays = document.querySelectorAll('.bulb-rays line');
  const glow = document.querySelector('.light-glow');
  
  document.documentElement.classList.add('theme-transitioning');
  
  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
      document.documentElement.classList.remove('theme-transitioning');
      gsap.set(lightOverlay, { width: 0, height: 0, opacity: 0 });
    }
  });
  
  const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 2.5;
  
  // 1. Filament ignites
  tl.to(filament, {
    opacity: 1,
    duration: 0.1,
    ease: 'power2.out'
  })
  
  // 2. Light overlay expands FROM the bulb
  .set(lightOverlay, {
    width: 0,
    height: 0,
    opacity: 1,
    top: '70px',
    right: '50px'
  })
  .to(lightOverlay, {
    width: diagonal,
    height: diagonal,
    duration: 0.7,
    ease: 'power2.out'
  }, '-=0.05')
  
  // 3. Apply light theme when overlay covers most of screen
  .add(() => {
    isDark = false;
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }, '-=0.4')
  
  // 4. Rays extend outward
  .to(rays, {
    opacity: 0.7,
    duration: 0.4,
    stagger: 0.02,
    ease: 'power2.out'
  }, '-=0.5')
  
  // 5. Glow expands
  .to(glow, {
    scale: 1,
    opacity: 0.9,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.4')
  
  // 6. Fade out overlay
  .to(lightOverlay, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out'
  });
  
  return tl;
}

// Cleanup function
export function destroyLightbulbToggle() {
  if (draggableInstance && draggableInstance[0]) {
    draggableInstance[0].kill();
  }
}
