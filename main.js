import './style.css'

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  updateActiveNavLink();
  revealOnScroll();
});

mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }

      mobileMenu.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateStats() {
  if (hasAnimated) return;

  const statsSection = document.getElementById('why-choose');
  const rect = statsSection.getBoundingClientRect();

  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    hasAnimated = true;

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCount = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      };

      updateCount();
    });
  }
}

window.addEventListener('scroll', animateStats);

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.classList.remove('hidden');
        setTimeout(() => {
          item.style.animation = 'fadeInUp 0.5s ease-out';
        }, 100);
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

const projectData = [
  
];

const modal = document.getElementById('portfolio-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.view-project').forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const projectIndex = parseInt(btn.getAttribute('data-project'));
    showProjectModal(projectIndex);
  });
});

function showProjectModal(index) {
  const project = projectData[index];

  modalBody.innerHTML = `
    <h3>${project.title}</h3>
    <p><strong>Category:</strong> ${project.category}</p>
    <p>${project.description}</p>
    <h4>Key Features:</h4>
    <ul style="list-style: none; padding: 0;">
      ${project.features.map(feature => `
        <li style="padding: 8px 0; color: #666;">
          <span style="color: #FFB400; margin-right: 8px;">✓</span> ${feature}
        </li>
      `).join('')}
    </ul>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

const testimonialsSlider = document.getElementById('testimonials-slider');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const sliderDots = document.getElementById('slider-dots');

let currentSlide = 0;
const slideCount = testimonialSlides.length;

for (let i = 0; i < slideCount; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  sliderDots.appendChild(dot);
}

function showSlide(n) {
  testimonialSlides.forEach(slide => slide.classList.remove('active'));
  document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

  currentSlide = (n + slideCount) % slideCount;

  testimonialSlides[currentSlide].classList.add('active');
  document.querySelectorAll('.dot')[currentSlide].classList.add('active');
}

function goToSlide(n) {
  showSlide(n);
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

testimonialSlides[0].classList.add('active');

setInterval(nextSlide, 5000);

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  await new Promise(resolve => setTimeout(resolve, 2000));

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  console.log('Form submitted:', formData);

  submitBtn.classList.remove('loading');
  submitBtn.disabled = false;

  alert('Thank you for your message! We will get back to you soon.');
  contactForm.reset();
});

revealOnScroll();
