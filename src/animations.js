// Scroll-linked animations using GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAnimations);
  } else {
    setupAnimations();
  }
}

function setupAnimations() {
  // Respect reduced motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // 1. Fade in + slide up for cards
  animateCardsOnScroll();
  
  // 2. Phone mockup 3D tilt effect
  animatePhoneMockups();
  
  // 3. Section labels pop in
  animateSectionLabels();
  
  // 4. Parallax backgrounds
  animateParallax();
  
  // 5. Text reveal animations
  animateTextReveal();
  
  // 6. Profile photo subtle animation
  animateProfilePhoto();
  
  // 7. Staggered list items
  animateExperienceList();
}

// Cards fade in and slide up when entering viewport
function animateCardsOnScroll() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach((card, index) => {
    // Set initial state
    gsap.set(card, {
      opacity: 0,
      y: 50,
    });
    
    // Animate on scroll
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
      delay: (index % 4) * 0.1, // Stagger based on grid position
    });
  });
}

// Phone mockups tilt and float based on scroll
function animatePhoneMockups() {
  const mockups = document.querySelectorAll('.case-study-card .mockup');
  
  mockups.forEach((mockup) => {
    // Floating animation
    gsap.to(mockup, {
      y: -15,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
    
    // 3D tilt on scroll
    gsap.to(mockup, {
      rotateY: 8,
      rotateX: -5,
      scale: 1.02,
      scrollTrigger: {
        trigger: mockup.closest('.case-study-card'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });
}

// Section labels pop in with scale
function animateSectionLabels() {
  const labels = document.querySelectorAll('.section-label');
  
  labels.forEach((label) => {
    gsap.set(label, {
      opacity: 0,
      scale: 0.8,
    });
    
    gsap.to(label, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: label,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

// Subtle parallax on case study cards
function animateParallax() {
  const caseStudyCards = document.querySelectorAll('.case-study-card');
  
  caseStudyCards.forEach((card) => {
    const mockup = card.querySelector('.mockup');
    if (!mockup) return;
    
    // Mockup moves slightly faster than card (parallax)
    gsap.to(mockup, {
      yPercent: -10,
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  });
}

// Text reveal animation for headings
function animateTextReveal() {
  const headings = document.querySelectorAll('.case-study-card h3, .about-card p');
  
  headings.forEach((heading) => {
    gsap.set(heading, {
      opacity: 0,
      y: 20,
    });
    
    gsap.to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

// Profile photo subtle zoom on scroll
function animateProfilePhoto() {
  const profilePhoto = document.querySelector('.profile-photo');
  const rotatingText = document.querySelector('.rotating-text-svg');
  
  if (profilePhoto) {
    gsap.to(profilePhoto, {
      scale: 1.05,
      scrollTrigger: {
        trigger: '.profile-card',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
  
  // Speed up rotating text when scrolling
  if (rotatingText) {
    gsap.to(rotatingText, {
      rotation: '+=180',
      scrollTrigger: {
        trigger: '.profile-card',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });
  }
}

// Experience list items stagger in
function animateExperienceList() {
  const experienceItems = document.querySelectorAll('.experience-item');
  
  experienceItems.forEach((item, index) => {
    gsap.set(item, {
      opacity: 0,
      x: -30,
    });
    
    gsap.to(item, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item.closest('.experience-card'),
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      delay: index * 0.1,
    });
  });
}

// Smooth scroll for anchor links
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: 'power2.inOut',
        });
      }
    });
  });
}
