# 🔦 Dark Mode Implementation Plan

## The Vision
A dangling lightbulb in the top-right corner. Pull the cord (or click), and watch as light either **radiates outward** to illuminate the page (light mode) or **gets sucked back into the bulb** leaving darkness (dark mode).

This is not a simple toggle — it's a **theatrical experience**.

---

## 1. Color Palette

### Light Mode (Current)
```css
--color-bg: #F5F5E9;         /* Warm cream */
--color-bg-card: #FFFFFF;     /* Pure white */
--color-accent: #D4FF00;      /* Lime green */
--color-text-primary: #1A1A1A;
--color-text-secondary: #666666;
--color-border: #E0E0D0;
```

### Dark Mode (New)
```css
--color-bg: #0D0D0D;          /* Deep black */
--color-bg-card: #1A1A1A;     /* Elevated dark */
--color-accent: #D4FF00;      /* Lime stays (pops beautifully on dark) */
--color-accent-glow: rgba(212, 255, 0, 0.3); /* Glow effect */
--color-text-primary: #F5F5E9; /* Inverted cream */
--color-text-secondary: #9A9A9A;
--color-border: #2A2A2A;
--color-shadow: rgba(0, 0, 0, 0.5);
```

### Semantic Additions
```css
/* Light radiance colors (for the animation) */
--light-color: #FFFBEA;       /* Warm white light */
--light-glow: rgba(255, 251, 234, 0.8);
--bulb-filament: #FFB800;     /* Warm orange filament */
--bulb-glass: rgba(255, 255, 255, 0.9);
--cord-color: #1A1A1A;
```

---

## 2. The Lightbulb Component

### HTML Structure
```html
<div class="lightbulb-toggle" id="theme-toggle">
  <!-- The cord you pull -->
  <div class="cord-container">
    <svg class="cord" viewBox="0 0 20 100">
      <path class="cord-path" d="M10,0 Q10,50 10,80" />
    </svg>
    <div class="pull-handle"></div>
  </div>
  
  <!-- The bulb itself -->
  <div class="bulb-container">
    <svg class="bulb" viewBox="0 0 60 100">
      <!-- Socket -->
      <rect class="socket" x="20" y="0" width="20" height="15" rx="2" />
      
      <!-- Glass bulb -->
      <ellipse class="glass" cx="30" cy="50" rx="25" ry="35" />
      
      <!-- Filament (glows when on) -->
      <path class="filament" d="M22,45 Q30,35 38,45 Q30,55 22,45" />
      
      <!-- Light rays (visible when on) -->
      <g class="rays">
        <line x1="30" y1="10" x2="30" y2="-10" />
        <line x1="50" y1="30" x2="70" y2="20" />
        <line x1="55" y1="50" x2="75" y2="50" />
        <line x1="50" y1="70" x2="70" y2="80" />
        <line x1="10" y1="30" x2="-10" y2="20" />
        <line x1="5" y1="50" x2="-15" y2="50" />
        <line x1="10" y1="70" x2="-10" y2="80" />
      </g>
    </svg>
    
    <!-- Glow overlay (expands/contracts) -->
    <div class="light-glow"></div>
  </div>
</div>

<!-- Full-page light overlay for the animation -->
<div class="light-overlay" id="light-overlay"></div>
```

### CSS Structure
```css
/* ===== Lightbulb Toggle ===== */
.lightbulb-toggle {
  position: fixed;
  top: 0;
  right: var(--spacing-xl);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

/* Cord */
.cord-container {
  position: relative;
  width: 20px;
  height: 80px;
}

.cord {
  width: 100%;
  height: 100%;
}

.cord-path {
  fill: none;
  stroke: var(--cord-color);
  stroke-width: 2;
  stroke-linecap: round;
}

.pull-handle {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Bulb Container */
.bulb-container {
  position: relative;
  width: 60px;
  height: 100px;
  transform-origin: top center;
}

.bulb {
  width: 100%;
  height: 100%;
}

.socket {
  fill: #2A2A2A;
}

.glass {
  fill: var(--bulb-glass);
  stroke: #E0E0E0;
  stroke-width: 1;
  transition: fill 0.3s ease;
}

.filament {
  fill: none;
  stroke: var(--bulb-filament);
  stroke-width: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.rays line {
  stroke: var(--light-color);
  stroke-width: 2;
  stroke-linecap: round;
  opacity: 0;
}

/* Light Glow around bulb */
.light-glow {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, var(--light-glow) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

/* ===== Light States ===== */

/* Light ON (light mode) */
[data-theme="light"] .filament {
  opacity: 1;
  animation: filament-glow 2s ease-in-out infinite;
}

[data-theme="light"] .rays line {
  opacity: 0.6;
  animation: ray-pulse 1.5s ease-in-out infinite;
}

[data-theme="light"] .light-glow {
  opacity: 1;
  animation: glow-pulse 2s ease-in-out infinite;
}

[data-theme="light"] .glass {
  fill: rgba(255, 251, 234, 0.95);
}

/* Light OFF (dark mode) */
[data-theme="dark"] .glass {
  fill: rgba(40, 40, 40, 0.8);
}

[data-theme="dark"] .filament {
  opacity: 0.2;
  stroke: #444;
}

/* ===== Full Page Light Overlay ===== */
.light-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  background: radial-gradient(circle, var(--light-color) 0%, var(--color-bg) 100%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 999;
  opacity: 0;
  transform: translate(50%, -50%);
}

/* ===== Animations ===== */
@keyframes filament-glow {
  0%, 100% { stroke: #FFB800; filter: drop-shadow(0 0 3px #FFB800); }
  50% { stroke: #FFCC00; filter: drop-shadow(0 0 8px #FFCC00); }
}

@keyframes ray-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.8; transform: translateX(-50%) scale(1); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
}

@keyframes swing {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(3deg); }
  75% { transform: rotate(-3deg); }
}
```

---

## 3. The Animation Sequence

### Light ON → OFF (Going Dark)

```javascript
function turnOffLight() {
  const tl = gsap.timeline();
  
  // 1. Pull animation (user interaction feedback)
  tl.to('.bulb-container', {
    y: 15,
    duration: 0.15,
    ease: 'power2.in'
  })
  
  // 2. Release and swing
  .to('.bulb-container', {
    y: 0,
    duration: 0.4,
    ease: 'elastic.out(1, 0.5)'
  }, '-=0.05')
  
  // 3. Filament dims
  .to('.filament', {
    opacity: 0.2,
    stroke: '#444',
    duration: 0.3
  }, '-=0.3')
  
  // 4. Rays retract
  .to('.rays line', {
    attr: { x2: (i, t) => t.getAttribute('x1'), y2: (i, t) => t.getAttribute('y1') },
    opacity: 0,
    duration: 0.4,
    stagger: 0.03
  }, '-=0.3')
  
  // 5. Glow shrinks and disappears
  .to('.light-glow', {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in'
  }, '-=0.4')
  
  // 6. Light overlay appears and CONTRACTS (sucking light into bulb)
  .fromTo('#light-overlay', 
    { 
      width: '300vmax', 
      height: '300vmax',
      opacity: 1 
    },
    { 
      width: 0, 
      height: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.in'
    }, 
    '-=0.3'
  )
  
  // 7. Apply dark theme
  .add(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, '-=0.4')
  
  // 8. Bulb glass darkens
  .to('.glass', {
    fill: 'rgba(40, 40, 40, 0.8)',
    duration: 0.3
  }, '-=0.3');
  
  return tl;
}
```

### Light OFF → ON (Illuminating)

```javascript
function turnOnLight() {
  const tl = gsap.timeline();
  
  // 1. Pull animation
  tl.to('.bulb-container', {
    y: 15,
    duration: 0.15,
    ease: 'power2.in'
  })
  
  // 2. Release and swing
  .to('.bulb-container', {
    y: 0,
    duration: 0.4,
    ease: 'elastic.out(1, 0.5)'
  }, '-=0.05')
  
  // 3. Filament ignites
  .to('.filament', {
    opacity: 1,
    stroke: '#FFB800',
    duration: 0.1
  }, '-=0.3')
  
  // 4. Light overlay EXPANDS from bulb
  .fromTo('#light-overlay',
    {
      width: 0,
      height: 0,
      opacity: 1
    },
    {
      width: '300vmax',
      height: '300vmax',
      duration: 0.8,
      ease: 'power2.out'
    },
    '-=0.2'
  )
  
  // 5. Apply light theme midway through expansion
  .add(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }, '-=0.4')
  
  // 6. Rays extend outward
  .to('.rays line', {
    attr: { 
      x2: (i, t) => {
        const x1 = parseFloat(t.getAttribute('x1'));
        return x1 + (x1 - 30) * 1.5;
      },
      y2: (i, t) => {
        const y1 = parseFloat(t.getAttribute('y1'));
        return y1 + (y1 - 50) * 0.5;
      }
    },
    opacity: 0.6,
    duration: 0.4,
    stagger: 0.03
  }, '-=0.6')
  
  // 7. Glow expands
  .to('.light-glow', {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.5')
  
  // 8. Fade out overlay
  .to('#light-overlay', {
    opacity: 0,
    duration: 0.3
  })
  
  // 9. Bulb glass brightens
  .to('.glass', {
    fill: 'rgba(255, 251, 234, 0.95)',
    duration: 0.2
  }, '-=0.4');
  
  return tl;
}
```

---

## 4. Draggable Cord Interaction

```javascript
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

function initLightbulbToggle() {
  let isAnimating = false;
  let isDark = localStorage.getItem('theme') === 'dark';
  
  // Set initial state
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  
  // Create draggable cord
  Draggable.create('.pull-handle', {
    type: 'y',
    bounds: { minY: 0, maxY: 40 },
    inertia: true,
    
    onDrag: function() {
      // Stretch the cord SVG as you pull
      const progress = this.y / 40;
      gsap.set('.cord-path', {
        attr: { d: `M10,0 Q10,${50 + progress * 20} 10,${80 + this.y}` }
      });
      
      // Bulb tilts slightly
      gsap.set('.bulb-container', {
        y: this.y * 0.5,
        rotation: this.y * 0.1
      });
    },
    
    onRelease: function() {
      if (isAnimating) return;
      
      const pullDistance = this.y;
      
      // Snap cord back
      gsap.to('.cord-path', {
        attr: { d: 'M10,0 Q10,50 10,80' },
        duration: 0.4,
        ease: 'elastic.out(1, 0.3)'
      });
      
      gsap.to('.pull-handle', {
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.3)'
      });
      
      // If pulled enough, toggle the light
      if (pullDistance > 20) {
        isAnimating = true;
        
        if (isDark) {
          turnOnLight().then(() => {
            isDark = false;
            isAnimating = false;
          });
        } else {
          turnOffLight().then(() => {
            isDark = true;
            isAnimating = false;
          });
        }
      } else {
        // Not pulled enough, just reset bulb position
        gsap.to('.bulb-container', {
          y: 0,
          rotation: 0,
          duration: 0.4,
          ease: 'elastic.out(1, 0.3)'
        });
      }
    }
  });
  
  // Also allow click to toggle
  document.querySelector('.bulb-container').addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    
    if (isDark) {
      turnOnLight().then(() => {
        isDark = false;
        isAnimating = false;
      });
    } else {
      turnOffLight().then(() => {
        isDark = true;
        isAnimating = false;
      });
    }
  });
}
```

---

## 5. Element-by-Element Dark Mode

### Cards
```css
[data-theme="dark"] .card {
  background-color: var(--color-bg-card);
  box-shadow: 0 4px 20px var(--color-shadow);
}
```

### Case Study Cards
```css
[data-theme="dark"] .case-study-card {
  /* Subtle glow on hover in dark mode */
}

[data-theme="dark"] .case-study-card:hover {
  box-shadow: 0 0 30px var(--color-accent-glow);
}
```

### Mockup Phone Frames
```css
[data-theme="dark"] .case-study-card .mockup::before {
  background: #2A2A2A;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}
```

### Section Labels
```css
[data-theme="dark"] .section-label {
  /* Accent stays bright - pops beautifully */
  box-shadow: 0 0 10px var(--color-accent-glow);
}
```

### Links & Buttons
```css
[data-theme="dark"] .resume-link,
[data-theme="dark"] .ai-chat-trigger {
  background: var(--color-bg-card);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

[data-theme="dark"] .resume-link:hover {
  background: var(--color-border);
}
```

### Profile Card
```css
[data-theme="dark"] .rotating-text-path {
  fill: var(--color-text-primary);
}
```

### LinkedIn Icon
```css
[data-theme="dark"] .linkedin-card svg {
  /* LinkedIn blue stays - brand colors don't change */
  filter: drop-shadow(0 0 5px rgba(10, 102, 194, 0.3));
}
```

### Experience List
```css
[data-theme="dark"] .experience-item {
  border-color: var(--color-border);
}
```

### Scrollbars
```css
[data-theme="dark"] ::-webkit-scrollbar-track {
  background: var(--color-bg);
}

[data-theme="dark"] ::-webkit-scrollbar-thumb {
  background: var(--color-border);
}
```

---

## 6. Performance & Polish

### Prefers Color Scheme Detection
```javascript
// Respect system preference on first visit
if (!localStorage.getItem('theme')) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
}

// Listen for system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Optional: auto-switch if user hasn't manually toggled
});
```

### Transition Smoothness
```css
/* Global transition for theme changes */
html.theme-transitioning,
html.theme-transitioning *,
html.theme-transitioning *::before,
html.theme-transitioning *::after {
  transition: 
    background-color 0.5s ease,
    color 0.5s ease,
    border-color 0.5s ease,
    box-shadow 0.5s ease,
    fill 0.5s ease !important;
}
```

### GPU Acceleration
```css
.light-overlay,
.bulb-container,
.light-glow {
  will-change: transform, opacity;
}
```

---

## 7. File Structure

```
src/
├── components/
│   └── lightbulbToggle.js    # New file
├── styles/
│   ├── main.css              # Updated with dark mode variables
│   └── lightbulb.css         # New file
└── main.js                   # Import and init lightbulb
```

---

## 8. Implementation Order

1. **Add dark mode CSS variables** to main.css
2. **Create lightbulb.css** with all toggle styles
3. **Create lightbulbToggle.js** with component + animations
4. **Add Draggable plugin** to dependencies
5. **Update index.html** with toggle HTML
6. **Initialize in main.js**
7. **Test and polish** animations
8. **Add mobile responsiveness** (smaller bulb, touch-friendly)

---

## 9. Mobile Considerations

```css
@media (max-width: 600px) {
  .lightbulb-toggle {
    right: var(--spacing-md);
    transform: scale(0.8);
    transform-origin: top right;
  }
  
  .cord-container {
    height: 60px;
  }
}
```

Touch events work naturally with GSAP Draggable.

---

## 10. Easter Egg Ideas

1. **Double-tap** the bulb = rapid flicker animation
2. **Long press** = bulb slowly dims then pops back (like a real bulb warming up)
3. **Shake on mobile** = toggle theme
4. **Konami code** = disco mode (rapid cycling)

---

This is the blueprint. Ready to implement? ⚡
