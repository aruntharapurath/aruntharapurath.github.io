const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.hidden = isOpen;
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.hidden = true;
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const input = document.getElementById('terminal-input');
const form = document.getElementById('terminal-form');
const output = document.getElementById('terminal-output');

const routes = {
  about: '#about',
  experience: '#experience',
  stack: '#stack',
  posts: '#posts',
  contact: '#contact'
};

function runCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();
  if (!command) return;

  const responses = {
    help: 'Available commands: about, experience, stack, posts, github, resume, contact, coffee',
    about: 'Senior Software Engineer focused on cloud-native and distributed systems.',
    experience: 'Experience section is next on the build list.',
    stack: 'Stack section is next on the build list.',
    posts: 'Posts section is next on the build list.',
    contact: 'Contact section is next on the build list.',
    coffee: 'Coffee dependency not found. System remains operational ☕'
  };

  if (command === 'github') {
    output.textContent = 'Opening GitHub…';
    window.open('https://github.com/aruntharapurath', '_blank', 'noopener,noreferrer');
    return;
  }

  if (command === 'resume') {
    output.textContent = 'Downloading resume…';
    const link = document.createElement('a');
    link.href = 'Arun_Thara_Purath_Resume.pdf';
    link.download = 'Arun_Thara_Purath_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    return;
  }

  output.textContent = responses[command] ?? `command not found: ${command}`;

  if (routes[command] && document.querySelector(routes[command])) {
    setTimeout(() => document.querySelector(routes[command]).scrollIntoView({ behavior: 'smooth' }), 180);
  }
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  runCommand(input.value);
  input.value = '';
});

document.querySelectorAll('[data-command]').forEach(button => {
  button.addEventListener('click', () => runCommand(button.dataset.command));
});

document.querySelector('.terminal')?.addEventListener('click', (event) => {
  if (!event.target.closest('button')) input?.focus();
});
