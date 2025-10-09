const toggleBtn = document.getElementById('darkToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '🌙' : '🌙';
});

const typingElement = document.getElementById('typing-text');
const sentences = [
  'I am a frontend developer |',
  'I love❤️ to build things |'
];
let sentenceIndex = 0;
let charIndex = 0;
let typing = true;

function type() {
  const currentSentence = sentences[sentenceIndex];
  if (typing) {
    typingElement.textContent = currentSentence.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentSentence.length) {
      typing = false;
      setTimeout(type, 1500);
      return;
    }
  } else {
    typingElement.textContent = currentSentence.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      typing = true;
      sentenceIndex = (sentenceIndex + 1) % sentences.length;
    }
  }
  setTimeout(type, typing ? 100 : 50);
}
type();

const projectCards = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  },
  { threshold: 0.2 }
);
projectCards.forEach((card) => observer.observe(card));

const navButtons = document.querySelectorAll('.bottom-nav button');
const sections = [
  document.querySelector('main'), 
  document.querySelector('.skills-section'), 
  document.querySelector('.projects-section') 
];

navButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    sections[index].scrollIntoView({ behavior: 'smooth' });
  });
});

const scrollSpyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = sections.indexOf(entry.target);
        navButtons.forEach(b => b.classList.remove('active'));
        navButtons[index].classList.add('active');
      }
    });
  },
  { threshold: 0.3 } 
);

sections.forEach(section => scrollSpyObserver.observe(section));

window.addEventListener('scroll', () => {
  if (window.scrollY < sections[1].offsetTop * 0.3) {
    navButtons.forEach(b => b.classList.remove('active'));
    navButtons[0].classList.add('active');
  }
});

