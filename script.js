const words = ['student', 'developer', 'coach', 'team player', 'hard worker'];
const typewriterText = document.querySelector('.typewriter-text');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    if (!typewriterText) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {
        typewriterText.textContent = currentWord.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeLoop, 1200);
            return;
        }
    } else {
        typewriterText.textContent = currentWord.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    const speed = isDeleting ? 70 : 100;
    setTimeout(typeLoop, speed);
}

function openMenu() {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.classList.add('active');
    }
}

function closeMenu() {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburg');
    const closeButton = document.querySelector('.cancel');

    if (hamburger) {
        hamburger.addEventListener('click', (event) => {
            event.stopPropagation();
            openMenu();
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            closeMenu();
        });
    }

    document.querySelectorAll('.dropdown .links a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        const dropdown = document.querySelector('.dropdown');
        if (!dropdown || !dropdown.classList.contains('active')) {
            return;
        }

        if (!dropdown.contains(event.target) && event.target !== hamburger) {
            closeMenu();
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 995) {
        closeMenu();
    }
});

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function applyTheme(theme) {
    body.classList.toggle('light-theme', theme === 'light');
    body.classList.toggle('dark-theme', theme === 'dark');

    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
        themeToggle.setAttribute('aria-label', theme === 'light' ? 'Toggle dark mode' : 'Toggle light mode');
    }

    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
        applyTheme(nextTheme);
    });
}

document.querySelectorAll('.language-card').forEach((card) => {
    card.addEventListener('click', () => {
        const language = card.getAttribute('data-language');
        const projectCards = document.querySelectorAll('.project-card');
        let matched = false;

        projectCards.forEach((projectCard) => {
            const languages = projectCard.getAttribute('data-language') || '';
            const languageList = languages.toLowerCase().split(/\s+/);
            const matches = languageList.includes(language.toLowerCase());

            if (matches) {
                matched = true;
                projectCard.classList.add('highlighted');
                setTimeout(() => projectCard.classList.remove('highlighted'), 1500);
                projectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        if (matched) {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

typeLoop();
