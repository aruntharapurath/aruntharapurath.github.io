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

const resumeDialog = document.getElementById('resume-dialog');
const resumePreview = document.getElementById('resume-preview');
let resumeTrigger;

function openResume(trigger = document.activeElement) {
  if (resumeDialog.open) return;
  resumeTrigger = mobileMenu?.contains(trigger) ? menuToggle : trigger;
  if (!resumePreview.getAttribute('src')) {
    resumePreview.src = 'Arun_Thara_Purath_Resume.pdf';
  }
  resumeDialog.showModal();
  document.documentElement.classList.add('resume-open');
}

document.querySelectorAll('[data-resume]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openResume(link);
  });
});

document.getElementById('resume-close').addEventListener('click', () => resumeDialog.close());
const resumeDownload = document.getElementById('resume-download');
const resumeDownloadStatus = document.getElementById('resume-download-status');
resumeDownload.addEventListener('click', async () => {
  if (resumeDownload.disabled) return;
  resumeDownload.disabled = true;
  resumeDownload.textContent = 'Preparing download…';
  resumeDownloadStatus.hidden = true;
  try {
    const response = await fetch('Arun_Thara_Purath_Resume.pdf');
    if (!response.ok) throw new Error('Resume download failed');
    const file = new Blob([await response.blob()], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Arun_Thara_Purath_Resume.pdf';
    link.hidden = true;
    resumeDialog.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch {
    resumeDownloadStatus.textContent = 'Could not download the resume. Please try again.';
    resumeDownloadStatus.hidden = false;
  } finally {
    resumeDownload.disabled = false;
    resumeDownload.textContent = 'Download resume ↓';
  }
});
resumeDialog.addEventListener('click', event => {
  const bounds = resumeDialog.getBoundingClientRect();
  if (event.target === resumeDialog &&
      (event.clientX < bounds.left || event.clientX > bounds.right ||
       event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    resumeDialog.close();
  }
});
resumeDialog.addEventListener('close', () => {
  document.documentElement.classList.remove('resume-open');
  resumeTrigger?.focus({ preventScroll: true });
});

function resizeInput() {
  input.style.width = input.value ? `${input.value.length + 1}ch` : '0ch';
}

input?.addEventListener('input', resizeInput);

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

  help: `
Available commands:

  about        Who I am
  experience   My work experience
  stack        Technologies I work with
  posts        Things I write about
  github       Open my GitHub
  resume       View or download my resume
  contact      Get in touch
  coffee       ???
  `,

  coffee: '☕ Coffee ready.',

  about: `
Hi, I'm Arun 👋

Senior Software Engineer with 10+ years of experience
building scalable backend systems and cloud-native applications.

I work primarily with .NET, C#, Azure, microservices
and distributed systems, with experience across the
full stack.

I enjoy solving complex engineering problems and
building reliable systems that scale.
  `,

  experience: `
10+ years of building software.

2023 → Present
Intelex Technologies
Senior Software Engineer
Cloud SaaS · .NET · Azure · AI · Angular · GraphQL

2016 → 2023
Tata Elxsi
Specialist
Microservices · .NET · Kubernetes · Kafka · Redis · MongoDB

2014 → 2016
Peepal Software
Software Engineer
Linux · Python · Monitoring · Automation
  `,

  stack: `
Backend
  C# · .NET · ASP.NET Core · REST · GraphQL

Architecture
  Microservices · Distributed Systems · Serverless

Cloud & DevOps
  Azure · AWS · Docker · Kubernetes · Terraform · CI/CD

Data & Messaging
  SQL Server · MongoDB · CosmosDB · Redis · Kafka · MQTT

Frontend
  Angular · React · TypeScript · JavaScript

AI & Automation
  Microsoft Prompt Flow · Prompt Engineering
  `,

  posts: `
I write about things I learn and build:

  → .NET & backend engineering
  → Distributed systems
  → Microservices architecture
  → Kafka & messaging
  → Kubernetes & cloud
  → AI & Prompt Flow
  → Developer tools & productivity

Explore the Posts section to read more.
  `,

  contact: `
Let's connect.

Email
  arun.tharapurath@gmail.com

LinkedIn
  linkedin.com/in/aruntharapurath

GitHub
  github.com/aruntharapurath

Open to Senior / Staff Software Engineering
opportunities and interesting engineering problems.
  `
};

  if (command === 'github') {
    output.textContent = 'Opening GitHub…';
    window.open('https://github.com/aruntharapurath', '_blank', 'noopener,noreferrer');
    return;
  }

  if (command === 'resume') {
    openResume();
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
  resizeInput();
});

document.querySelectorAll('[data-command]').forEach(button => {
  button.addEventListener('click', () => runCommand(button.dataset.command));
});

document.querySelector('.terminal')?.addEventListener('click', (event) => {
  if (!event.target.closest('button')) input?.focus();
});
